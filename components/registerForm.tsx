"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { authService } from "@/services/authServices/authServices";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Briefcase, Bot, Target } from "lucide-react";
import { useState } from "react";

type RegisterInputs = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function RegisterForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInputs>();

  const onSubmit = async (data: RegisterInputs) => {
    setServerError(null);
    setSuccess(null);

    try {
      await authService.register(data);

      setSuccess("Usuario creado correctamente. Redirigiendo…");

      setTimeout(() => router.push("/login"), 1500);
    } catch (err: any) {
      const message =
        err?.message || "No se pudo completar el registro. Intentá nuevamente.";

      if (message.includes("ya está registrado")) {
        setServerError("El email ya está registrado. Probá iniciando sesión.");
      } else {
        setServerError(message);
      }
    }
  };

  return (
    <main className="min-h-screen w-full flex items-center justify-center px-6 relative bg-gradient-to-br from-white via-green-50 to-gray-100">
      <div className="absolute inset-0 opacity-[0.12] bg-[url('/patterns/dots.svg')] bg-repeat pointer-events-none" />

      <div className="relative z-10 max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 py-12">
        {/* LEFT SIDE */}
        <div className="flex flex-col justify-center px-4 md:px-0">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Construí tu camino laboral con herramientas inteligentes.
          </h1>

          <p className="mt-4 text-lg text-gray-700 max-w-md">
            Gestioná tus postulaciones y practicá entrevistas con IA diseñada
            para ayudarte a conseguir tu próximo trabajo.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-6">
            <div className="flex items-center gap-3">
              <Briefcase className="w-6 h-6 text-green-700" />
              <span className="text-gray-800">
                Organizá tus oportunidades laborales
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Bot className="w-6 h-6 text-green-700" />
              <span className="text-gray-800">
                Simulá entrevistas reales con IA
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Target className="w-6 h-6 text-green-700" />
              <span className="text-gray-800">
                Mejorá tu estrategia de búsqueda
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE – FORM */}
        <div className="w-full max-w-md mx-auto px-2">
          <h2 className="text-4xl font-semibold text-gray-900 mb-10">
            Crear cuenta
          </h2>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-8"
          >
            {/* FIRST NAME */}
            <div className="flex flex-col gap-1">
              <Label className="text-gray-600 text-sm">First Name</Label>
              <input
                {...register("firstName", {
                  required: "Este campo es obligatorio",
                })}
                className="bg-transparent border-b border-gray-300 focus:border-gray-800 py-2 text-gray-900 text-lg"
              />
              {errors.firstName && (
                <span className="text-red-600 text-sm">
                  {errors.firstName.message}
                </span>
              )}
            </div>

            {/* LAST NAME */}
            <div className="flex flex-col gap-1">
              <Label className="text-gray-600 text-sm">Last Name</Label>
              <input
                {...register("lastName", {
                  required: "Este campo es obligatorio",
                })}
                className="bg-transparent border-b border-gray-300 focus:border-gray-800 py-2 text-gray-900 text-lg"
              />
              {errors.lastName && (
                <span className="text-red-600 text-sm">
                  {errors.lastName.message}
                </span>
              )}
            </div>

            {/* EMAIL */}
            <div className="flex flex-col gap-1">
              <Label className="text-gray-600 text-sm">Email</Label>
              <input
                type="email"
                {...register("email", {
                  required: "El email es obligatorio",
                  pattern: { value: /\S+@\S+\.\S+/, message: "Email inválido" },
                })}
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
              <Label className="text-gray-600 text-sm">Password</Label>
              <input
                type="password"
                {...register("password", {
                  required: "La contraseña es obligatoria",
                  minLength: { value: 6, message: "Mínimo 6 caracteres" },
                })}
                className="bg-transparent border-b border-gray-300 focus:border-gray-800 py-2 text-gray-900 text-lg"
              />
              {errors.password && (
                <span className="text-red-600 text-sm">
                  {errors.password.message}
                </span>
              )}
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="flex flex-col gap-1">
              <Label className="text-gray-600 text-sm">Confirm Password</Label>
              <input
                type="password"
                {...register("confirmPassword", {
                  required: "Repetí tu contraseña",
                  validate: (value) =>
                    value === watch("password") ||
                    "Las contraseñas no coinciden",
                })}
                className="bg-transparent border-b border-gray-300 focus:border-gray-800 py-2 text-gray-900 text-lg"
              />
              {errors.confirmPassword && (
                <span className="text-red-600 text-sm">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>

            {/* Server messages */}
            {serverError && (
              <p className="text-red-600 text-sm text-center">{serverError}</p>
            )}
            {success && (
              <p className="text-green-600 text-sm text-center">{success}</p>
            )}

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-md text-lg font-medium"
            >
              {isSubmitting ? "Registrando…" : "Registrarse"}
            </Button>
          </form>

          <p className="text-sm text-gray-700 text-center mt-8">
            ¿Ya tenés cuenta?{" "}
            <Link
              href="/login"
              className="text-green-700 font-medium hover:underline"
            >
              Iniciar sesión
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
