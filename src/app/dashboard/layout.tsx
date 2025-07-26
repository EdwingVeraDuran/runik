"use client";

import DashboardSidebar from "@/components/dashboard/dashboard-sidebar";
import DashboardSiteHeader from "@/components/dashboard/dashboard-site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useSession } from "@/features/auth/hooks/useSession";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { session, isLoading } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !session) {
      router.replace("/login");
    }
  }, [session, isLoading, router]);

  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset>
        <DashboardSiteHeader />
        <section>{children}</section>
      </SidebarInset>
    </SidebarProvider>
  );
}
