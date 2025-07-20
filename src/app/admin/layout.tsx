"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function AdminLayout({
  children,
}: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; // Do nothing while loading
    if (!session) {
      router.push("/login");
    }
  }, [session, status, router]);

  if (status === "loading" || !session) {
    return <div>Loading...</div>; // Or a spinner component
  }

  return (
    <div>
      <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl">Admin Panel</h1>
        <Button onClick={() => signOut({ callbackUrl: "/" })}>Sign Out</Button>
      </header>
      <main className="p-4">{children}</main>
    </div>
  );
}
