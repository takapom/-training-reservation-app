"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import styles from "../page.module.css";
import Header from "@/components/layout/Header"

type Reservation = { id: string; equipmentName: string; reservedDateTime: string };

export default function UserMyPage() {
  const { userId } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    // 現在のログインユーザーと URL の userId が一致しない場合はトップへ
    const unsub = onAuthStateChanged(auth, (u) => {
      if (!u || u.uid !== userId) {
        // セキュリティ強化のため、他ユーザーのページは禁止
        window.location.href = "/";
      } else {
        setUser(u);
        // TODO: Firestore から userId の予約を取得して setReservations
        setReservations([
          { id: "1", equipmentName: "ダンベルルーム", reservedDateTime: "2025-05-01 14:00" },
        ]);
      }
    });
    return () => unsub();
  }, [userId]);

  if (!user) return <div className={styles.container}>Loading…</div>;

  return (
    <div>
    <Header />
    <main className={styles.container}>
      <div className={styles.profile}>
        {user.photoURL && (
          <img src={user.photoURL} alt="avatar" className={styles.avatar} />
        )}
        <h1 className={styles.username}>{user.displayName}</h1>
      </div>
      <section className={styles.reservations}>
        <h2 className={styles.sectionTitle}>Your Reservations</h2>
        <ul className={styles.reservationList}>
          {reservations.map((res) => (
            <li key={res.id} className={styles.reservationItem}>
              <span>{res.equipmentName}</span>
              <span className={styles.reservationTime}>{res.reservedDateTime}</span>
            </li>
          ))}
        </ul>
      </section>
    </main>
    </div>
  );
}
