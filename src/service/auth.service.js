import { supabase } from "../lib/supabase/client";

export const AuthLogin = async (payload) => {
  const { email, password } = payload;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return {
      status: false,
      message: error.message || "Terjadi Kesalahan",
    };
  }

  return {
    status: true,
    message: "Berhasil Login Ke Akun Anda",
    data: data,
  };
};

export const AuthMe = async () => {
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    return {
      status: false,
      message: error.message || "Terjadi Kesalahan",
    };
  }

  const { data: userProfile, error: userError } = await supabase
    .from("profile")
    .select("*")
    .eq("id", data.user.id)
    .single();

  if (userError) {
    return {
      status: false,
      message: userError.message || "Terjadi Kesalahan",
    };
  }

  return {
    status: true,
    message: "Berhasil Mendapatkan Akun User",
    data: {
      auth: data.user,
      profile: userProfile,
    },
  };
};

// export const AuthRegister = async (payload) => {};

export const AuthLogout = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    return {
      status: false,
      message: error.message || "Terjadi Kesalahan",
    };
  }

  return {
    status: true,
    message: "Berhasil Keluar",
  };
};
