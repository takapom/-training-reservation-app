// src/components/ReservationForm.tsx
"use client";

import { useState } from "react";
import styles from "./ReservationForm.module.css";

export default function ReservationForm() {
  const [dateTime, setDateTime] = useState("");
  const [phone, setPhone] = useState("");
  const [training, setTraining] = useState("");
  const [inquiry, setInquiry] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // ここで API 呼び出しなど
    console.log({ dateTime, phone, training, inquiry });
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
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

      <button type="submit" className={styles.button}>
        予約を送信
      </button>
    </form>
  );
}
