// import ClientSessionProvider from "@/components/pos/ClientSessionProvider";

export default function POSLayout({ children }: { children: React.ReactNode }) {
    <ClientSessionProvider>
      <div>
        <div className=" w-full h-full">{children}</div>
      </div>
    </ClientSessionProvider>
  );

