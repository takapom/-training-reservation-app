// src/app/mypage/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import styles from "./page.module.css"; // 🔥 追加
import "@/app/globals.css";

export default function MyPageIndex() {
  const router = useRouter();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user?.uid) {//「？」はuserが空じゃなければ
        router.replace(`/mypage/${user.uid}`);
      } else {
        router.replace("/login");
      }
    });
    return () => unsub();
  }, [router]);

  return (
    <div className={styles.loadingContainer}>
      <div className={styles.spinner}></div>
      <p className={styles.loadingText}>Loading your page…</p>
    </div>
  );
}

