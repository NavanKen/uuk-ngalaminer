import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, User, Lock, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link } from "react-router";
import { toast } from "sonner";
import { useAuthStore } from "../../store/useAuthStore";
import { useNavigate } from "react-router";

const RegisterPages = () => {
  const [credential, setCredential] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const { signUp, isSigningUp } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!credential.username) return toast.error("Harap Isi Username");
    if (!credential.email) return toast.error("Harap Isi Email");
    if (!credential.password) return toast.error("Harap Isi Password");
    if (!credential.confirmPassword)
      return toast.error("Harap Isi Konfirmasi Password");
    if (credential.password !== credential.confirmPassword)
      return toast.error("Password Dan Konfirmasi Password");

    const payload = {
      username: credential.username,
      email: credential.email,
      password: credential.password,
    };

    const user = await signUp(payload);

    if (user) navigate("/auth/login");
  };

  return (
    <>
      <div className="min-h-screen w-full bg-gradient-to-br from-blue-100 via-orange-50 to-blue-100 flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="px-7 py-7 bg-white rounded-2xl mb-4 mt-12">
            <div className="flex justify-center">
              <div className="bg-gradient-to-br from-orange-400 to-orange-600 rounded-full p-4 mb-4">
                <User className="text-white w-10 h-10" />
              </div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <div className="mb-4 space-y-2">
                <h1 className="text-slate-700 text-3xl text-center   font-bold">
                  Buat Akun Baru
                </h1>
                <p className="text-gray-500 text-md text-center">
                  Masukkan Data untuk mendaftar
                </p>
              </div>
              <form className="w-full space-y-5" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <Label
                    htmlFor="username"
                    className="text-sm font-medium text-slate-700"
                  >
                    Username
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="username"
                      type="username"
                      name="identifier"
                      placeholder="Masukkan Alamat Username"
                      value={credential.username}
                      onChange={(e) =>
                        setCredential({
                          ...credential,
                          username: e.target.value,
                        })
                      }
                      className="pl-12 h-12 bg-gray-50 border-0 text-card-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-sm font-medium text-slate-700"
                  >
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      name="identifier"
                      placeholder="Masukkan Alamat Email"
                      value={credential.email}
                      onChange={(e) =>
                        setCredential({
                          ...credential,
                          email: e.target.value,
                        })
                      }
                      className="pl-12 h-12 bg-gray-50 border-0 text-card-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="password"
                    className="text-sm font-medium text-slate-700"
                  >
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      name="password"
                      placeholder="Masukkan Password"
                      value={credential.password}
                      onChange={(e) =>
                        setCredential({
                          ...credential,
                          password: e.target.value,
                        })
                      }
                      className="pl-12 h-12 bg-gray-50 border-0 text-card-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="confirmPassword"
                    className="text-sm font-medium text-slate-700"
                  >
                    Konfirmasi Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type="password"
                      name="confirmPassword"
                      placeholder="Masukkan Password"
                      value={credential.confirmPassword}
                      onChange={(e) =>
                        setCredential({
                          ...credential,
                          confirmPassword: e.target.value,
                        })
                      }
                      className="pl-12 h-12 bg-gray-50 border-0 text-card-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <Button
                    type="submit"
                    disabled={isSigningUp ? true : false}
                    className="bg-gradient-to-br from-orange-400 to-orange-600 w-full py-5 rounded-xl text-md text-neutral-100 cursor-pointer hover:bg-gradient-to-br hover:from-orange-400 hover:to-orange-600 transition duration-200"
                  >
                    {isSigningUp ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                        Membuat Akun...
                      </>
                    ) : (
                      "Daftar"
                    )}
                  </Button>
                </div>
                <p className="text-center text-gray-500 text-sm">
                  Sudah Punya Akun ?{" "}
                  <Link to={"/auth/login"} className="text-orange-500">
                    Masuk Sekarang
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPages;
