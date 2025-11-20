"use client";

import { useForm } from "react-hook-form";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { LogIn, ShieldCheck, Sparkles } from "lucide-react";
import { useState } from "react";

type LoginInputs = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInputs>();

  const onSubmit = async (data: LoginInputs) => {
    setError("");

    try {
      await login(data.email, data.password);
      router.push("/dashboard/opportunities");
    } catch (err: any) {
      setError(err.message || "Credenciales incorrectas.");
    }
  };

  return (
    <main className="min-h-screen w-full flex items-center justify-center px-6 relative bg-gradient-to-br from-white via-green-50 to-gray-100">
      <div className="absolute inset-0 opacity-[0.12] bg-[url('/patterns/dots.svg')] bg-repeat pointer-events-none" />

      <div className="relative z-10 max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 py-12">
        {/* LEFT SIDE */}
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

        {/* RIGHT SIDE (FORM) */}
        <div className="w-full max-w-md mx-auto px-2">
          <h2 className="text-4xl font-semibold text-gray-900 mb-10">
            Iniciar sesión
          </h2>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-8"
          >
            {error && (
              <p className="text-red-600 text-sm text-center">{error}</p>
            )}

            {/* EMAIL */}
            <div className="flex flex-col gap-1">
              <Label className="text-gray-600 text-sm">Email</Label>
              <input
                type="email"
                {...register("email", { required: "El email es obligatorio" })}
                className="bg-transparent border-b border-gray-300 focus:border-gray-800 py-2 text-gray-900 text-lg"
              />
              {errors.email && (
                <span className="text-red-600 text-sm">
                  {errors.email.message}
                </span>
              )}
            </div>

            {/* PASSWORD */}
            <div className="flex flex-col gap-1">
              <Label className="text-gray-600 text-sm">Contraseña</Label>
              <input
                type="password"
                {...register("password", {
                  required: "La contraseña es obligatoria",
                })}
                className="bg-transparent border-b border-gray-300 focus:border-gray-800 py-2 text-gray-900 text-lg"
              />
              {errors.password && (
                <span className="text-red-600 text-sm">
                  {errors.password.message}
                </span>
              )}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-md text-lg font-medium"
            >
              {isSubmitting ? "Ingresando..." : "Entrar"}
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
