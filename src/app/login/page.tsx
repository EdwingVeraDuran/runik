"use client";

import { LoginForm } from "@/features/auth/components/LoginForm";
import { useSession } from "@/features/auth/hooks/useSession";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.replace("/dashboard");
    }
  }, [session, router]);

  return (
    <main className="min-w-screen min-h-screen flex items-center justify-center">
      <LoginForm />
    </main>
  );
}
