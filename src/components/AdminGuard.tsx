"use client";

import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminGuard({
  children,
}: {
  children: React.ReactNode;
}) {

  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {

    if (!user) {

      router.push("/login");
      return;

    }

    if (user.role !== "admin") {

      router.push("/");

    }

  }, [user, router]);

  if (!user || user.role !== "admin") {

    return null;

  }

  return children;

}