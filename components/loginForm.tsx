"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/authContext";
import { loginUser } from "@/services/authServices/authServices";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LogIn, ShieldCheck, Sparkles } from "lucide-react";

export default function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await loginUser({ email, password });
      console.log("LOGIN RESPONSE:", res);

      if (res?.access_token) {
        // 🔥 Solo este cambio — compatible con refresh token
        login(res.access_token, res.refresh_token, res.user);

        router.push("/dashboard/opportunities");
      }
    } catch (err: any) {
      setError("Credenciales incorrectas. Intentá nuevamente.");
    }
  };

  return (
    <main className="min-h-screen w-full flex items-center justify-center px-6 relative bg-gradient-to-br from-white via-green-50 to-gray-100">
      <div className="absolute inset-0 opacity-[0.12] bg-[url('/patterns/dots.svg')] bg-repeat pointer-events-none" />

      <div className="relative z-10 max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 py-12">
        <div className="flex flex-col justify-center px-4 md:px-0">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Bienvenido nuevamente.
          </h1>

          <p className="mt-4 text-lg text-gray-700 max-w-md">
            Accedé a tus postulaciones, métricas y entrevistas simuladas con IA.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-6">
            <div className="flex items-center gap-3">
              <LogIn className="w-6 h-6 text-green-700" />
              <span className="text-gray-800">
                Ingresá rápido y continuá donde estabas
              </span>
            </div>

            <div className="flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-green-700" />
              <span className="text-gray-800">Autenticación segura</span>
            </div>

            <div className="flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-green-700" />
              <span className="text-gray-800">
                Acceso al simulador de entrevistas IA
              </span>
            </div>
          </div>
        </div>

        <div className="w-full max-w-md mx-auto px-2">
          <h2 className="text-4xl font-semibold text-gray-900 mb-10">
            Iniciar sesión
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            {error && (
              <p className="text-red-600 text-sm text-center">{error}</p>
            )}

            <div className="flex flex-col gap-1">
              <Label className="text-gray-600 text-sm">Email</Label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-transparent border-b border-gray-300 focus:border-gray-800 py-2 text-gray-900 text-lg"
              />
            </div>

            <div className="flex flex-col gap-1">
              <Label className="text-gray-600 text-sm">Contraseña</Label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-transparent border-b border-gray-300 focus:border-gray-800 py-2 text-gray-900 text-lg"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-md text-lg font-medium"
            >
              Entrar
            </Button>
          </form>

          <p className="text-sm text-gray-700 text-center mt-8">
            ¿No tenés cuenta?{" "}
            <Link
              href="/register"
              className="text-green-700 font-medium hover:underline"
            >
              Crear cuenta
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
