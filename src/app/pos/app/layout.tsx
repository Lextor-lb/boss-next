import Sidebar from "@/components/pos/dashboard/sidebar.dashboard";
import { Button } from "@/components/ui/button";

export default function BackofficeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-12">
      <div className=" col-span-2">
        <div className="p-5 h-screen">
          <div className="flex h-full justify-between flex-col">
            <Sidebar />
            <Button variant="outline" size="sm">
              Log Out
            </Button>
          </div>
        </div>
      </div>
      <div className="col-span-10">
        <div className="p-5 min-h-screen bg-secondary">
          <div className=" w-full h-full">{children}</div>
        </div>
      </div>
    </div>
  );
}
