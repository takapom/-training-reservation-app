// // src/app/mypage/page.tsx
// "use client";

// import React, { useEffect, useState } from "react";
// import { onAuthStateChanged, User } from "firebase/auth";
// import { auth } from "@/lib/firebase";
// import styles from "./page.module.css";
// import Header from "@/components/layout/Header"
// import Link from "next/link";

// type Reservation = {
//   id: string;
//   equipmentName: string;
//   reservedDateTime: string;
// };

// export default function MyPage() {
//   const [user, setUser] = useState<User | null>(null);
//   const [reservations, setReservations] = useState<Reservation[]>([]);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//       // ダミーデータ：実装時にFirestoreからフェッチしてください
//       setReservations([
//         { id: "1", equipmentName: "ダンベルルーム", reservedDateTime: "2025-05-01 14:00" },
//         { id: "2", equipmentName: "ベンチルーム", reservedDateTime: "2025-05-02 16:00" },
//       ]);
//     });
//     return () => unsubscribe();
//   }, []);

//   if (!user) {
//     return <div className={styles.container}>Loading…</div>;
//   }

//   return (
//     <div>
//       <Header />
//     <main className={styles.container}>
//       <div className={styles.profile}>
//         {user.photoURL && (
//           <img src={user.photoURL} alt="User Avatar" className={styles.avatar} />
//         )}
//         <h1 className={styles.username}>
//           {user.displayName ?? "Anonymous User"}
//         </h1>
//       </div>

//       <section className={styles.reservations}>
//         <h2 className={styles.sectionTitle}>Your Reservations</h2>
//         <ul className={styles.reservationList}>
//           {reservations.map((res) => (
//             <li key={res.id} className={styles.reservationItem}>
//               <span className={styles.reservationEquipment}>
//                 {res.equipmentName}
//               </span>
//               <span className={styles.reservationTime}>
//                 {res.reservedDateTime}
//               </span>
//             </li>
//           ))}
//         </ul>
//       </section>
//     </main>
//     </div>
//   );
// }


"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function MyPageIndex() {
  const router = useRouter();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user?.uid) {
        // 認証済みならユーザー固有ページへ
        router.replace(`/mypage/${user.uid}`);
      } else {
        // 未ログインならログインページへ
        router.replace("/login");
      }
    });
    return () => unsub();
  }, [router]);

  return <div>Loading your page…</div>;
}
