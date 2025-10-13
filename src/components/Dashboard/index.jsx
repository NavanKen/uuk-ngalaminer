import { useState, useEffect } from "react";
import { User, Mail, Phone, MapPin, Upload, X, Lock, Key } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Separator } from "../../components/ui/separator";
import { useAuthStore } from "../../store/useAuthStore";
import { toast } from "sonner";
import {
  updateProfile,
  uploadAvatar,
  updatePassword,
  updateEmail,
} from "../../service/profile.service";
import { supabase } from "../../lib/supabase/client";

const Dashboard = () => {
  const { authUser: user, setUser } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    phone: "",
    address: "",
  });
  const [passwordData, setPasswordData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [emailData, setEmailData] = useState({
    newEmail: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || "",
        phone: user.phone || "",
        address: user.address || "",
      });
      setAvatarPreview(user.avatar_url);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("Ukuran file maksimal 2MB");
        return;
      }
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const removeAvatar = () => {
    setAvatarFile(null);
    setAvatarPreview(null);
  };

  // const handleUpdateProfile = async (e) => {
  //   e.preventDefault();
  //   setIsLoading(true);

  //   try {
  //     let avatarUrl = user.avatar_url;

  //     if (avatarFile) {
  //       avatarUrl = await uploadAvatar(avatarFile, user.avatar_url);
  //     } else if (!avatarPreview) {
  //       avatarUrl = null;
  //     }

  //     const res = await updateProfile(user.id, {
  //       ...formData,
  //       avatar_url: avatarUrl,
  //       role: user.role,
  //     });

  //     if (res.status) {
  //       setUser({ ...user, ...res.data });
  //       toast.success("Profile berhasil diupdate");
  //       setAvatarFile(null);
  //     } else {
  //       toast.error(res.error?.message || "Gagal mengupdate profile");
  //     }
  //   } catch (error) {
  //     toast.error("Terjadi kesalahan");
  //     console.error(error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let avatarUrl = user.avatar_url;

      if (avatarFile) {
        avatarUrl = await uploadAvatar(avatarFile, user.avatar_url);
      } else if (!avatarPreview && user.avatar_url) {
        const oldPath = user.avatar_url.replace(
          `${
            import.meta.env.VITE_SUPABASE_URL
          }/storage/v1/object/public/ngalaminer-buckets/`,
          ""
        );

        const { error: deleteError } = await supabase.storage
          .from("ngalaminer-buckets")
          .remove([oldPath]);

        if (deleteError) {
          console.error("Gagal menghapus avatar lama:", deleteError);
        }

        avatarUrl = null;
      }

      const res = await updateProfile(user.id, {
        ...formData,
        avatar_url: avatarUrl,
        role: user.role,
      });

      if (res.status) {
        setUser({ ...user, ...res.data });
        toast.success("Profile berhasil diupdate");
        setAvatarFile(null);
      } else {
        toast.error(res.error?.message || "Gagal mengupdate profile");
      }
    } catch (error) {
      console.error(error);
      toast.error("Terjadi kesalahan");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("Password tidak cocok");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast.error("Password minimal 6 karakter");
      return;
    }

    setIsLoading(true);

    try {
      const res = await updatePassword(user.id, passwordData.newPassword);

      if (res.status) {
        toast.success("Password berhasil diupdate");
        setPasswordData({ newPassword: "", confirmPassword: "" });
      } else {
        toast.error(res.error?.message || "Gagal mengupdate password");
      }
    } catch (error) {
      toast.error("Terjadi kesalahan");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateEmail = async (e) => {
    e.preventDefault();

    if (!emailData.newEmail) {
      toast.error("Email tidak boleh kosong");
      return;
    }

    setIsLoading(true);

    try {
      const res = await updateEmail(user.id, emailData.newEmail);

      if (res.status) {
        setUser({ ...user, email: emailData.newEmail });
        toast.success("Email berhasil diupdate");
        setEmailData({ newEmail: "" });
      } else {
        toast.error(res.error?.message || "Gagal mengupdate email");
      }
    } catch (error) {
      toast.error("Terjadi kesalahan");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Selamat Datang</h1>
        <p className="text-muted-foreground">
          Kelola informasi profile dan keamanan akun Anda
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>Update informasi profile Anda</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div className="flex flex-col items-center gap-4 pb-4">
                {avatarPreview ? (
                  <div className="relative">
                    <img
                      src={avatarPreview}
                      alt="Avatar"
                      className="h-24 w-24 rounded-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={removeAvatar}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ) : (
                  <div className="h-24 w-24 rounded-full bg-[#FF6B35] flex items-center justify-center text-white font-semibold text-3xl">
                    {user?.username?.charAt(0).toUpperCase() || "?"}
                  </div>
                )}
                <div className="text-center">
                  <Label
                    htmlFor="avatar-upload"
                    className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors"
                  >
                    <Upload className="h-4 w-4" />
                    Upload Avatar
                  </Label>
                  <Input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    Max 2MB (JPG, PNG)
                  </p>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Username"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="08123456789"
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Alamat lengkap"
                    className="pl-10 resize-none"
                    rows={3}
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-br from-orange-400 to-orange-600"
              >
                {isLoading ? "Menyimpan..." : "Update Profile"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Update Email</CardTitle>
              <CardDescription>
                Email saat ini: <strong>{user?.email}</strong>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpdateEmail} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="newEmail">Email Baru</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="newEmail"
                      type="email"
                      value={emailData.newEmail}
                      onChange={(e) =>
                        setEmailData({ newEmail: e.target.value })
                      }
                      placeholder="email@example.com"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  variant="outline"
                  className="w-full"
                >
                  {isLoading ? "Menyimpan..." : "Update Email"}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Update Password</CardTitle>
              <CardDescription>
                Ubah password untuk keamanan akun Anda
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpdatePassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="newPassword">Password Baru</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="newPassword"
                      type="password"
                      value={passwordData.newPassword}
                      onChange={(e) =>
                        setPasswordData((prev) => ({
                          ...prev,
                          newPassword: e.target.value,
                        }))
                      }
                      placeholder="Min. 6 karakter"
                      className="pl-10"
                      required
                      minLength={6}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Konfirmasi Password</Label>
                  <div className="relative">
                    <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={(e) =>
                        setPasswordData((prev) => ({
                          ...prev,
                          confirmPassword: e.target.value,
                        }))
                      }
                      placeholder="Konfirmasi password"
                      className="pl-10"
                      required
                      minLength={6}
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  variant="outline"
                  className="w-full"
                >
                  {isLoading ? "Menyimpan..." : "Update Password"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
