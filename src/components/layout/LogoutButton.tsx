"use client";

import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import styles from "./logout.module.css"

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("ログアウト成功");
      router.push("/"); // ログアウト後にログインページへ
    } catch (error) {
      console.error("ログアウト失敗:", error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>You have been logged out.</h1>
        <p className={styles.subtitle}>Thank you for visiting.</p>
        <button className={styles.button} onClick={handleLogout}>
          Back to Home
        </button>
      </div>
    </div>
  );
}
