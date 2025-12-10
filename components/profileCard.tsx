"use client";

import { useState } from "react";

interface ProfileCardProps {
  firstName: string;
  lastName: string;
  email: string;
  onSave: (data: {
    firstName: string;
    lastName: string;
    email: string;
  }) => void;
}

export default function ProfileCard({
  firstName,
  lastName,
  email,
  onSave,
}: ProfileCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    firstName,
    lastName,
    email,
  });

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSave = () => {
    onSave(form);
    setIsEditing(false);
  };

  return (
    <div className="max-w-3xl bg-white shadow-lg rounded-xl p-8 ">
      <div className="flex items-center gap-6 mb-8">
        <div className="h-20 w-20 rounded-full bg-gray-200"></div>

        {!isEditing ? (
          <div className="flex flex-col">
            <h1 className="text-2xl font-semibold text-gray-800">
              {firstName} {lastName}
            </h1>
            <h2 className="text-gray-600">{email}</h2>
          </div>
        ) : (
          <div className="flex flex-col gap-2 w-full max-w-xs">
            <input
              type="text"
              name="firstname"
              value={form.firstName}
              onChange={handleChange}
              className="border rounded-md p-2 text-sm"
              placeholder="Nombre"
            />

            <input
              type="text"
              name="lastname"
              value={form.lastName}
              onChange={handleChange}
              className="border rounded-md p-2 text-sm"
              placeholder="Apellido"
            />

            <input
              type="text"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="border rounded-md p-2 text-sm"
              placeholder=""
            />
          </div>
        )}

        {!isEditing ? (
          <button
            className="ml-auto bg-[#00A857] hover:bg-[#00924C] text-white text-sm font-medium px-3 py-1.5 rounded-md"
            onClick={() => setIsEditing(true)}
          >
            Editar
          </button>
        ) : (
          <div className="ml-auto flex gap-2">
            <button
              className="bg-gray-300 text-gray-800 text-sm font-medium px-3 py-1.5 rounded-md"
              onClick={() => setIsEditing(false)}
            >
              Cancelar
            </button>

            {/* <button
              className="bg-[#00A857] hover:bg-[#00924C] text-white text-sm font-medium px-3 py-1.5 rounded-md"
              onClick={handleSave}
            >
              Guardar
            </button> */}
          </div>
        )}
      </div>
    </div>
  );
}
