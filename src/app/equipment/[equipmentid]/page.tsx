"use client";

import { useParams } from "next/navigation";
import { useContext } from "react";
import Image from "next/image";
import LabelBottomNavigation from "@/components/layout/Header";
import styles from "../page.module.css";
import { EquipmentContext } from "@/contexts/EquipmentContext";
import ReservationForm from "@/components/layout/ReservationForm";

export default function EquipmentDetailPage() {
  const { equipmentId } = useParams();
  const equipmentList = useContext(EquipmentContext);
  const equipment = equipmentList.find((item) => item.id === equipmentId);

  // URLパラメータから表示用の日本語名称を決定
  const name =
    equipmentId === "dumbbell_room"
      ? "ダンベルルーム"
      : equipmentId === "bench_press_room"
      ? "ベンチプレスルーム"
      : equipmentId === "side_press_room"
      ? "サイドプレスルーム"
      : "";

  if (!equipment) {
    return (
      <main className={styles.error}>
        <h1>機器が見つかりません</h1>
      </main>
    );
  }

  return (
    <div>
      <LabelBottomNavigation />

      <main className={styles.container}>
        <h1 className={styles.title}>機器詳細ページ: {equipment.name}</h1>
        {/* ここに予約リストを描画 */}

        {/* 条件に応じて写真を表示 */}
        {name === "ダンベルルーム" && (
          <Image
            src="/danbel.webp"
            alt="ダンベルルームの写真"
            width={400}
            height={300}
          />
        )}
        {name === "ベンチプレスルーム" && (
          <Image
            src="/kintore.webp"
            alt="ベンチプレスルームの写真"
            width={400}
            height={300}
          />
        )}
        {name === "サイドプレスルーム" && (
          <Image
            src="/sidepress.webp"
            alt="サイドプレスルームの写真"
            width={400}
            height={300}
          />
        )}
        <ReservationForm />
      </main>
    </div>
  );
}
