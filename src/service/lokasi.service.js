import { environment } from "../lib/config/environment";
import { supabase } from "../lib/supabase/client";

export const subscribeLokasi = (callback) => {
  const channel = supabase
    .channel("lokasi-changes")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "lokasi" },
      (payload) => {
        callback(payload);
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
};

export const getLokasiPaginate = async ({
  search = "",
  limit = 10,
  offset = 0,
}) => {
  const query = supabase
    .from("lokasi")
    .select("*", { count: "exact" })
    .ilike("nama_daerah", `%${search}%`)
    .range(offset, offset + limit - 1);

  const { data, error, count } = await query;

  if (error) {
    return { status: false, error };
  }
  return { status: true, data, count };
};

export const LokasiCreate = async (payload) => {
  const { nama_daerah, alamat_lengkap, deskripsi_daerah, file } = payload;

  const gambar = await uploadFile(file);

  if (!gambar) {
    return { status: false, pesan: "Gagal upload File" };
  }

  const { error } = await supabase
    .from("lokasi")
    .insert({ nama_daerah, alamat_lengkap, deskripsi_daerah, gambar });

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

export const LokasiEdit = async (payload) => {
  const { nama_daerah, alamat_lengkap, deskripsi_daerah, gambar, id_lokasi } =
    payload;
  const { error } = await supabase
    .from("lokasi")
    .update({ nama_daerah, alamat_lengkap, deskripsi_daerah, gambar })
    .eq("id_lokasi", id_lokasi)
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

export const LokasiDelete = async (id) => {
  const { data: imageData } = await supabase
    .from("lokasi")
    .select("gambar")
    .eq("id_lokasi", id)
    .single();

  const img = imageData?.gambar;
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
  const filePath = `images/lokasi/${fileName}`;

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
