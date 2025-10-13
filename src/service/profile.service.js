import { supabase } from "../lib/supabase/client";
import { supabaseAdmin } from "../lib/supabase/admin";
import { environment } from "../lib/config/environment";

// Real-time subscription
export const subscribeProfile = (callback) => {
  const channel = supabase
    .channel("profile-changes")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "profile",
      },
      callback
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
};

// Get all profiles with pagination and filters
export const getProfilePaginate = async ({
  search = "",
  limit = 10,
  offset = 0,
  role = null,
}) => {
  let query = supabase
    .from("profile")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false });

  if (search) {
    query = query.or(`username.ilike.%${search}%,phone.ilike.%${search}%`);
  }

  if (role) {
    query = query.eq("role", role);
  }

  query = query.range(offset, offset + limit - 1);

  const { data, error, count } = await query;

  if (error) {
    return { status: false, error };
  }
  return { status: true, data, count };
};

// Get profile by ID
export const getProfileById = async (id) => {
  const { data, error } = await supabase
    .from("profile")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    return { status: false, error };
  }
  return { status: true, data };
};

// Create profile with auth user (using admin client)
export const createProfile = async (profileData) => {
  try {
    // 1. Create auth user
    const { data: authData, error: authError } =
      await supabaseAdmin.auth.admin.createUser({
        email: profileData.email,
        password: profileData.password,
        email_confirm: true,
        user_metadata: {
          username: profileData.username,
        },
      });

    if (authError) {
      return { status: false, error: authError };
    }

    // 2. Create profile
    const { data: profile, error: profileError } = await supabase
      .from("profile")
      .insert({
        id: authData.user.id,
        username: profileData.username,
        phone: profileData.phone || null,
        address: profileData.address || null,
        avatar_url: profileData.avatar_url || null,
        role: profileData.role || "user",
      })
      .select()
      .single();

    if (profileError) {
      // Rollback: delete auth user if profile creation fails
      await supabaseAdmin.auth.admin.deleteUser(authData.user.id);
      return { status: false, error: profileError };
    }

    return { status: true, data: profile };
  } catch (error) {
    return { status: false, error };
  }
};

// Update profile
export const updateProfile = async (id, profileData) => {
  const { data, error } = await supabase
    .from("profile")
    .update({
      username: profileData.username,
      phone: profileData.phone,
      address: profileData.address,
      avatar_url: profileData.avatar_url,
      role: profileData.role,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return { status: false, error };
  }
  return { status: true, data };
};

export const deleteProfile = async (id) => {
  try {
    const { data: imageData } = await supabase
      .from("profile")
      .select("avatar_url")
      .eq("id", id)
      .single();

    const img = imageData?.avatar_url;
    const supabaseUrl = environment.SUPABASE_URL;

    if (img) {
      const oldImage = img.replace(
        `${supabaseUrl}/storage/v1/object/public/ngalaminer-buckets/`,
        ""
      );
      await supabase.storage.from("ngalaminer-buckets").remove([oldImage]);
    }

    const { error: profileError } = await supabase
      .from("profile")
      .delete()
      .eq("id", id);

    if (profileError) {
      return { status: false, error: profileError };
    }

    const { error: authError } = await supabaseAdmin.auth.admin.deleteUser(id);

    if (authError) {
      console.error("Failed to delete auth user:", authError);
    }

    return { status: true };
  } catch (error) {
    return { status: false, error };
  }
};

export const updatePassword = async (userId, newPassword) => {
  try {
    const { error } = await supabaseAdmin.auth.admin.updateUserById(userId, {
      password: newPassword,
    });

    if (error) {
      return { status: false, error };
    }

    return { status: true };
  } catch (error) {
    return { status: false, error };
  }
};

export const updateEmail = async (userId, newEmail) => {
  try {
    const { error } = await supabaseAdmin.auth.admin.updateUserById(userId, {
      email: newEmail,
      email_confirm: true,
    });

    if (error) {
      return { status: false, error };
    }

    return { status: true };
  } catch (error) {
    return { status: false, error };
  }
};

export const uploadAvatar = async (file, oldAvatar) => {
  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}.${fileExt}`;
  const filePath = `avatars/${fileName}`;

  if (oldAvatar) {
    console.log("iki onok");
    const oldPath = oldAvatar.replace(
      `${
        import.meta.env.VITE_SUPABASE_URL
      }/storage/v1/object/public/ngalaminer-buckets/`,
      ""
    );
    await supabase.storage.from("ngalaminer-buckets").remove([oldPath]);
  }

  const { error } = await supabase.storage
    .from("ngalaminer-buckets")
    .upload(filePath, file, { upsert: true });

  if (error) throw error;

  const {
    data: { publicUrl },
  } = supabase.storage.from("ngalaminer-buckets").getPublicUrl(filePath);

  return publicUrl;
};

export const removeAvatar = async (id) => {
  try {
    const { data: profile, error: profileError } = await supabase
      .from("profile")
      .select("avatar_url")
      .eq("id", id)
      .single();

    if (profileError) throw profileError;

    const img = profile?.avatar_url;
    if (!img) {
      await supabase.from("profile").update({ avatar_url: null }).eq("id", id);
      return { status: true };
    }

    const supabaseUrl = environment.SUPABASE_URL;
    const filePath = img.replace(
      `${supabaseUrl}/storage/v1/object/public/ngalaminer-buckets/`,
      ""
    );

    const { error: storageError } = await supabase.storage
      .from("ngalaminer-buckets")
      .remove([filePath]);

    if (storageError) throw storageError;

    const { error: updateError } = await supabase
      .from("profile")
      .update({ avatar_url: null })
      .eq("id", id);

    if (updateError) throw updateError;

    return { status: true };
  } catch (error) {
    console.error("Gagal menghapus avatar:", error);
    return { status: false, error };
  }
};
