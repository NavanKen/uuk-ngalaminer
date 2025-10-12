import { environment } from "../lib/config/environment";
import { supabase } from "../lib/supabase/client";

export const subscribeKategori = (callback) => {
  const channel = supabase
    .channel("kategori-changes")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "category" },
      (payload) => {
        callback(payload);
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
};

export const getKategoriPaginate = async ({
  search = "",
  limit = 10,
  offset = 0,
}) => {
  const query = supabase
    .from("category")
    .select("*", { count: "exact" })
    .ilike("nama_category", `%${search}%`)
    .range(offset, offset + limit - 1);

  const { data, error, count } = await query;

  if (error) {
    return { status: false, error };
  }
  return { status: true, data, count };
};

export const KategoriCreate = async (payload) => {
  const { nama_category, keterangan, is_active, file } = payload;

  const icon = await uploadFile(file);

  if (!icon) {
    return { status: false, pesan: "Gagal upload File" };
  }

  const { error } = await supabase
    .from("category")
    .insert({ nama_category, keterangan, is_active, icon });

  if (error) {
    return {
      status: false,
      pesan: error?.message || "Gagal Memasukkan data",
    };
  }

  return {
    status: true,
    pesan: "Berhasil Memasukkan Data",
  };
};

export const KategoriEdit = async (payload) => {
  const { nama_category, keterangan, is_active, icon, id_category } = payload;
  const { error } = await supabase
    .from("category")
    .update({ nama_category, keterangan, is_active, icon })
    .eq("id_category", id_category)
    .select()
    .single();

  if (error) {
    return {
      status: false,
      pesan: error?.message || "Terjadi Kesalahan",
    };
  }

  return {
    status: true,
    pesan: "Data Berhasil Di Update",
  };
};

export const KategoriDelete = async (id) => {
  const { data: imageData } = await supabase
    .from("category")
    .select("icon")
    .eq("id_category", id)
    .single();

  const img = imageData?.icon;
  const supabaseUrl = environment.SUPABASE_URL;

  const oldImage = img.replace(
    `${supabaseUrl}/storage/v1/object/public/ngalaminer-buckets/`
  );

  await supabase.storage.from("ngalaminer-buckets").remove([oldImage]);

  const { error } = await supabase.from("lokasi").delete().eq("id_lokasi", id);

  if (error) {
    return {
      status: false,
      pesan: error?.message || "Terjadi Kesalahan",
    };
  }
  return {
    status: true,
    pesan: "Data Berhasil Di Hapus",
  };
};

export const uploadFile = async (file, oldImage) => {
  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}.${fileExt}`;
  const filePath = `images/kategori/${fileName}`;

  if (oldImage) {
    const oldPath = oldImage.replace(
      `${environment.SUPABASE_URL}/storage/v1/object/public/ngalaminer-buckets/`,
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
