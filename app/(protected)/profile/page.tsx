import NavbarProfile from "@/components/navbarProfile";

function ProfileView() {
  return (
    <main className="min-h-screen w-full bg-[#F2FFF4] py-10 px-4">
      <NavbarProfile />
      <div className="max-w-3xl  bg-white shadow-lg rounded-xl p-8">
        <div className="flex items-center gap-6 mb-8">
          <div className="h-20 w-20 rounded-full bg-gray-200"></div>
          <div className="flex flex-col">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6 ">
              Alejandro Fernandez
            </h1>
            <h2>0236154548569</h2>
          </div>
          <button className="ml-auto bg-[#00A857]  hover:bg-[#00924C] text-white text-sm font-medium px-3 py-1.5 rounded-md">
            Editar
          </button>
        </div>
      </div>

      <div className=" mt-6 ">
        <button className="w-full bg-[#00A857] hover:bg-[#00924C] text-white font-medium py-2 rounded-lg">
          Guardar Cambios
        </button>
      </div>
    </main>
  );
}
export default ProfileView;
