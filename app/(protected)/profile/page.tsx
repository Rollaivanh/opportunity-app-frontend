import NavbarProfile from "@/components/navbarProfile";
import ProfileCard from "@/components/profileCard";
import { Button } from "@/components/ui/button";

function ProfileView() {
  return (
    <main className="min-h-screen w-full bg-[#F2FFF4] py-10 px-4">
      <NavbarProfile />
      <ProfileCard />
      <Button>click me</Button>
    </main>
  );
}
export default ProfileView;
