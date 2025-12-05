function NavbarProfile() {
  return (
    <div className="w-full bg-white shadow-lg rounded-xl p-6 mb-7">
      <div className="flex items-center justify-between">
        {/* IZQUIERDA */}
        <div className="text-xl font-semibold text-gray-800">
          OpportunityApp
        </div>

        {/* DERECHA */}
        <div className="flex items-center gap-6">
          <button className="text-gray-700 hover:text-gray-900 text-sm font-medium">
            Mis Empleos
          </button>

          {/* Campanita (usando Heroicons o cualquier icon pack) */}
          <button className="text-gray-700 hover:text-gray-900">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M14.25 18.75H9.75m8.25 0h-12m.75-9a6.75 6.75 0 1113.5 0c0 2.022.48 3.89 1.17 5.25H4.83c.69-1.36 1.17-3.228 1.17-5.25z"
              />
            </svg>
          </button>

          <button className="text-red-600 hover:text-red-800 text-sm font-medium">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default NavbarProfile;
