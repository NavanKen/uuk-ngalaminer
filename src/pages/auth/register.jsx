import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, User, Lock, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
// import { useAuthStore } from "@/store/authStore";
import { useState } from "react";
import { Link } from "react-router";

const RegisterPages = () => {
  const [credential, setCredential] = useState({
    identifier: "",
    password: "",
  });

  const [isLoggingIn, setIsLogin] = useState();
  //   const { signIn, isLoggingIn } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    // signIn(credential);
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
                  Masukkan email dan password anda untuk membuat akun
                </p>
              </div>
              <form className="w-full space-y-5" onSubmit={handleSubmit}>
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
                      value={credential.identifier}
                      onChange={(e) =>
                        setCredential({
                          ...credential,
                          identifier: e.target.value,
                        })
                      }
                      className="pl-12 h-12 bg-gray-50 border-0 text-card-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
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
                      required
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <Button
                    type="submit"
                    className="bg-gradient-to-br from-orange-400 to-orange-600 w-full py-5 rounded-xl text-md text-neutral-100 cursor-pointer hover:bg-gradient-to-br hover:from-orange-400 hover:to-orange-600 transition duration-200"
                  >
                    {isLoggingIn ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                        Loading...
                      </>
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                </div>
                <p className="text-center text-gray-500 text-sm">
                  Sudah Punya Akun ?{" "}
                  <Link to={"/auth/register"} className="text-orange-500">
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
