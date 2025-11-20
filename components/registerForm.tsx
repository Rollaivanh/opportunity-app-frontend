"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { registerUser } from "@/services/authServices/authServices";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Briefcase, Bot, Target } from "lucide-react";

export default function RegisterForm() {
  const router = useRouter();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setLoading(true);

    try {
      await registerUser(form);

      setSuccessMessage("Usuario creado correctamente. Redirigiendo…");

      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (error: any) {
      if (error.message.includes("registrado")) {
        setErrorMessage("El email ya está registrado. Probá iniciando sesión.");
      } else if (error?.response?.status === 400) {
        setErrorMessage("Las contraseñas no coinciden.");
      } else {
        setErrorMessage("No se pudo completar el registro.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      className="
        min-h-screen w-full flex items-center justify-center px-6 relative
        bg-gradient-to-br from-white via-green-50 to-gray-100
      "
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.12] bg-[url('/patterns/dots.svg')] bg-repeat pointer-events-none" />

      <div className="relative z-10 max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 py-12">
        {/* LEFT TEXT SECTION */}
        <div className="flex flex-col justify-center px-4 md:px-0">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Construí tu camino laboral con herramientas inteligentes.
          </h1>

          <p className="mt-4 text-lg text-gray-700 max-w-md">
            Gestioná tus postulaciones y practicá entrevistas con IA diseñada
            para ayudarte a conseguir tu próximo trabajo.
          </p>

          {/* Icons list */}
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

        {/* RIGHT FORM – MATCHING NOTION/LINEAR STYLE */}
        <div className="w-full max-w-md mx-auto px-2">
          <h2 className="text-4xl font-semibold text-gray-900 mb-10">
            Crear cuenta
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            {/* First Name */}
            <div className="flex flex-col gap-1">
              <Label className="text-gray-600 text-sm">First Name</Label>
              <input
                name="firstName"
                onChange={handleChange}
                required
                className="
                  bg-transparent border-b border-gray-300
                  focus:border-gray-800 focus:outline-none
                  py-2 text-gray-900 text-lg
                "
              />
            </div>

            {/* Last Name */}
            <div className="flex flex-col gap-1">
              <Label className="text-gray-600 text-sm">Last Name</Label>
              <input
                name="lastName"
                onChange={handleChange}
                required
                className="
                  bg-transparent border-b border-gray-300
                  focus:border-gray-800 focus:outline-none
                  py-2 text-gray-900 text-lg
                "
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1">
              <Label className="text-gray-600 text-sm">Email</Label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                required
                className="
                  bg-transparent border-b border-gray-300
                  focus:border-gray-800 focus:outline-none
                  py-2 text-gray-900 text-lg
                "
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1">
              <Label className="text-gray-600 text-sm">Password</Label>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                required
                className="
                  bg-transparent border-b border-gray-300
                  focus:border-gray-800 focus:outline-none
                  py-2 text-gray-900 text-lg
                "
              />
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col gap-1">
              <Label className="text-gray-600 text-sm">Confirm Password</Label>
              <input
                type="password"
                name="confirmPassword"
                onChange={handleChange}
                required
                className="
                  bg-transparent border-b border-gray-300
                  focus:border-gray-800 focus:outline-none
                  py-2 text-gray-900 text-lg
                "
              />
            </div>

            {/* Messages */}
            {errorMessage && (
              <p className="text-red-600 text-sm text-center">{errorMessage}</p>
            )}
            {successMessage && (
              <p className="text-green-600 text-sm text-center">
                {successMessage}
              </p>
            )}

            {/* Button */}
            <Button
              type="submit"
              disabled={loading}
              className="
                w-full bg-green-600 hover:bg-green-700 
                text-white py-3 rounded-md text-lg font-medium
              "
            >
              {loading ? "Registrando..." : "Registrarse"}
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
