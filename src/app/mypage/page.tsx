// "use client";

// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { onAuthStateChanged } from "firebase/auth";
// import { auth } from "@/lib/firebase";

// export default function MyPageIndex() {
//   const router = useRouter();

//   useEffect(() => {
//     const unsub = onAuthStateChanged(auth, (user) => {
//       if (user?.uid) {
//         // 認証済みならユーザー固有ページへ
//         router.replace(`/mypage/${user.uid}`);
//       } else {
//         // 未ログインならログインページへ
//         router.replace("/login");
//       }
//     });
//     return () => unsub();
//   }, [router]);

//   return <div>Loading your page…</div>;
// }


// src/app/mypage/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import styles from "./page.module.css"; // 🔥 追加

export default function MyPageIndex() {
  const router = useRouter();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user?.uid) {
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
