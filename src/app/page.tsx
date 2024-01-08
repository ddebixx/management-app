"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react";

export default function Home() {
  const router = useRouter()
  const location = typeof window !== 'undefined' ? window.location : undefined;

  useEffect(() => {
    router.push("home");
  })

  return (
    <>
      
    </>
  )
}
