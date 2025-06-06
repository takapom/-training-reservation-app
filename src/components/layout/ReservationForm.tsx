"use client";

import { useState } from "react";
import styles from "./ReservationForm.module.css";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { auth } from "@/lib/firebase";
import { useParams } from "next/navigation";

export default function ReservationForm() {
  const [dateTime, setDateTime] = useState("");
  const [phone, setPhone] = useState("");
  const [training, setTraining] = useState("");
  const [inquiry, setInquiry] = useState("");

  const params = useParams();
  // Next.jsが認識しているルートパラメータのキー (小文字の 'equipmentid') を使用
  const equipmentIdFromParams = params.equipmentid as string | undefined;

  const getEquipmentName = (id: string | undefined): string => {
    switch (id) {
      case "dumbbell_room":
        return "ダンベル";
      case "bench_press_room":
        return "ベンチプレス";
      case "side_press_room":
        return "サイドプレス";
      case "running": // 'running' のケースを追加
        return "ランニングマシーン";
      default:
        return ""; // 該当なしの場合は空文字
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const user = auth.currentUser;
      if (!user) {
        alert("ログインしてください");
        return;
      }

      const userId = user.uid;
      const reservationId = crypto.randomUUID();

      // 修正した equipmentIdFromParams を使用
      const equipmentName = getEquipmentName(equipmentIdFromParams);
      if (!equipmentName) {
        // このアラートが表示される場合、equipmentIdFromParams の値が getEquipmentName のどのケースにも一致していない
        alert("有効なトレーニング機器名ではありません。");
        return;
      }

      await setDoc(doc(db, "users", userId, "reservations", reservationId), {
        equipmentName,
        reservedDateTime: Timestamp.fromDate(new Date(dateTime)),
        note: training,
        inquiry,
        phone,
        status: "reserved",
      });

      alert("予約が送信されました！");
      setDateTime("");
      setPhone("");
      setTraining("");
      setInquiry("");
    } catch (error) {
      console.error("保存エラー:", error);
      alert("エラーが発生しました");
    }
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <div className={styles.formInner}>
        <div className={styles.field}>
          <label htmlFor="dateTime" className={styles.label}>
            予約希望日時
          </label>
          <input
            id="dateTime"
            type="datetime-local"
            className={styles.input}
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
            required
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="phone" className={styles.label}>
            電話番号
          </label>
          <input
            id="phone"
            type="tel"
            className={styles.input}
            placeholder="090-1234-5678"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="training" className={styles.label}>
            トレーニング内容
          </label>
          <textarea
            id="training"
            className={styles.textarea}
            rows={4}
            placeholder="例：ベンチプレス 60kg × 10回 × 3セット"
            value={training}
            onChange={(e) => setTraining(e.target.value)}
            required
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="inquiry" className={styles.label}>
            質問・問い合わせ
          </label>
          <textarea
            id="inquiry"
            className={styles.textarea}
            rows={3}
            placeholder="何かご要望があればご記入ください"
            value={inquiry}
            onChange={(e) => setInquiry(e.target.value)}
          />
        </div>

        <div className={styles.formActions}>
          <button type="submit" className={styles.button}>
            予約を送信
          </button>
        </div>
      </div>
    </form>
  );
}