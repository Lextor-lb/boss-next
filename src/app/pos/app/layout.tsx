"use client";
import Sidebar from "@/components/pos/dashboard/Sidebar.dashboard";
import { Button } from "@/components/ui/button";
import { logout } from "@/lib/lib";
import { useRouter } from "next/navigation";

export default function BackofficeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const handleSubmit = async () => {
    const result = await logout();
    router.push("/pos/login");
  };

  return (
    <div className="grid grid-cols-12 h-screen overflow-hidden">
      <div className=" col-span-2 ">
        <div className="p-5 h-screen overflow-hidden">
          <div className="flex h-full justify-between flex-col">
            <Sidebar />
            <Button variant="outline" size="sm" onClick={handleSubmit}>
              Log Out
            </Button>
          </div>
        </div>
      </div>
      <div className="col-span-10 h-screen overflow-auto">
        <div className="py-5 min-h-screen bg-secondary">
          <div className=" w-full h-full">{children}</div>
        </div>
      </div>
    </div>
  );
}
