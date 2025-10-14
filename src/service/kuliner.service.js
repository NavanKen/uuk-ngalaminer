import { environment } from "../lib/config/environment";
import { supabase } from "../lib/supabase/client";

export const subscribeKuliner = (callback) => {
  const channel = supabase
    .channel("kuliner-changes")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "kuliner" },
      (payload) => {
        callback(payload);
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
};

export const getKulinerPaginate = async ({
  search = "",
  limit = 10,
  offset = 0,
  userId = null,
  role = null,
}) => {
  let query = supabase
    .from("kuliner")
    .select(
      `
      *,
      category:id_category(id_category, nama_category),
      lokasi:id_lokasi(id_lokasi, nama_daerah),
      profile:id_profile(id, username, avatar_url)
    `,
      { count: "exact" }
    )
    .ilike("nama_kuliner", `%${search}%`);

  if (role !== "admin" && userId) {
    query = query.eq("id_profile", userId);
  }

  query = query.range(offset, offset + limit - 1);

  const { data, error, count } = await query;

  if (error) {
    return { status: false, error };
  }
  return { status: true, data, count };
};

export const KulinerCreate = async (payload) => {
  const {
    nama_kuliner,
    id_category,
    id_lokasi,
    harga,
    deskripsi,
    file,
    id_profile,
    detail_address,
    jam_buka,
    jam_tutup,
  } = payload;

  const gambar = await uploadFile(file);

  if (!gambar) {
    return { status: false, pesan: "Gagal upload File" };
  }

  const { error } = await supabase.from("kuliner").insert({
    nama_kuliner,
    id_category,
    id_lokasi,
    harga,
    deskripsi,
    gambar,
    jam_buka,
    jam_tutup,
    detail_address,
    id_profile,
  });

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

export const KulinerEdit = async (payload) => {
  const {
    nama_kuliner,
    id_category,
    id_lokasi,
    harga,
    deskripsi,
    gambar,
    id_kuliner,
    detail_address,
    jam_buka,
    jam_tutup,
  } = payload;
  const { error } = await supabase
    .from("kuliner")
    .update({
      nama_kuliner,
      id_category,
      id_lokasi,
      harga,
      deskripsi,
      gambar,
      detail_address,
      jam_buka,
      jam_tutup,
    })
    .eq("id_kuliner", id_kuliner)
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

export const KulinerDelete = async (id) => {
  const { data: imageData } = await supabase
    .from("kuliner")
    .select("gambar")
    .eq("id_kuliner", id)
    .single();

  const img = imageData?.gambar;
  const supabaseUrl = environment.SUPABASE_URL;

  const oldImage = img.replace(
    `${supabaseUrl}/storage/v1/object/public/ngalaminer-buckets/`,
    ""
  );

  await supabase.storage.from("ngalaminer-buckets").remove([oldImage]);

  const { error } = await supabase
    .from("kuliner")
    .delete()
    .eq("id_kuliner", id);

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
  const filePath = `images/kuliner/${fileName}`;

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

export const getAllKategori = async () => {
  const { data, error } = await supabase
    .from("category")
    .select("id_category, nama_category")
    .eq("is_active", true);

  if (error) {
    return { status: false, error };
  }
  return { status: true, data };
};

export const getAllKategoriPublic = async () => {
  const { data, error } = await supabase
    .from("category")
    .select("id_category, nama_category, icon")
    .eq("is_active", true)
    .order("nama_category", { ascending: true });

  if (error) {
    return { status: false, error };
  }
  return { status: true, data };
};

export const getAllLokasi = async () => {
  const { data, error } = await supabase
    .from("lokasi")
    .select("id_lokasi, nama_daerah");

  if (error) {
    return { status: false, error };
  }
  return { status: true, data };
};

export const getKulinerById = async (id) => {
  const { data, error } = await supabase
    .from("kuliner")
    .select(
      `
      *,
      category:id_category(id_category, nama_category, icon),
      lokasi:id_lokasi(id_lokasi, nama_daerah, alamat_lengkap),
      profile:id_profile(id, username, avatar_url)
    `
    )
    .eq("id_kuliner", id)
    .single();

  if (error) {
    return { status: false, error };
  }
  return { status: true, data };
};

export const getAllKulinerPublic = async ({
  search = "",
  limit = 12,
  offset = 0,
  categoryId = null,
}) => {
  let query = supabase
    .from("kuliner")
    .select(
      `
      *,
      category:id_category(id_category, nama_category, icon),
      lokasi:id_lokasi(id_lokasi, nama_daerah),
      profile:id_profile(id, username, avatar_url)
    `,
      { count: "exact" }
    )
    .order("tanggal_ditambahkan", { ascending: false });

  if (search) {
    query = query.ilike("nama_kuliner", `%${search}%`);
  }

  if (categoryId) {
    query = query.eq("id_category", categoryId);
  }

  query = query.range(offset, offset + limit - 1);

  const { data, error, count } = await query;

  if (error) {
    return { status: false, error };
  }
  return { status: true, data, count };
};

export const getKulinerByLokasi = async (lokasiId, limit = 6) => {
  const { data, error } = await supabase
    .from("kuliner")
    .select(
      `
      *,
      category:id_category(id_category, nama_category),
      profile:id_profile(id, username, avatar_url)
    `
    )
    .eq("id_lokasi", lokasiId)
    .order("tanggal_ditambahkan", { ascending: false })
    .limit(limit);

  if (error) {
    return { status: false, error };
  }
  return { status: true, data };
};
