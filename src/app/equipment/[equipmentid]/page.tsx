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
      <div className={styles.page}>
        <main className={styles.errorContainer}>
          <div className={styles.errorContent}>
            <h1>機器が見つかりません</h1>
            <p>指定された機器は存在しないか、削除された可能性があります。</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <LabelBottomNavigation />

      <main className={styles.container}>
        <div className={styles.contentWrapper}>
          <div className={styles.equipmentHeader}>
            <h1 className={styles.title}>{equipment.name}</h1>
            <div className={styles.equipmentInfo}>
              <span className={styles.badge}>利用可能</span>
              <span className={styles.equipmentId}>ID: {equipmentId}</span>
            </div>
          </div>

          <div className={styles.equipmentCard}>
            <div className={styles.imageContainer}>
              {name === "ダンベルルーム" && (
                <Image
                  src="/danbel.webp"
                  alt="ダンベルルームの写真"
                  width={400}
                  height={300}
                  className={styles.equipmentImage}
                  priority
                />
              )}
              {name === "ベンチプレスルーム" && (
                <Image
                  src="/kintore.webp"
                  alt="ベンチプレスルームの写真"
                  width={400}
                  height={300}
                  className={styles.equipmentImage}
                  priority
                />
              )}
              {name === "サイドプレスルーム" && (
                <Image
                  src="/kintore.webp"
                  alt="サイドプレスルームの写真"
                  width={400}
                  height={300}
                  className={styles.equipmentImage}
                  priority
                />
              )}
            </div>
            
            <div className={styles.equipmentDetails}>
              <h2 className={styles.detailsTitle}>機器詳細</h2>
              <div className={styles.detailsContent}>
                <p className={styles.description}>
                  {name}は最新のトレーニング設備を備えた専用ルームです。
                  効率的なトレーニングのために最適な環境が整っています。
                </p>
                <ul className={styles.featuresList}>
                  <li>最新の設備</li>
                  <li>清潔な環境</li>
                  <li>専門スタッフのサポート</li>
                  <li>24時間利用可能</li>
                </ul>
              </div>
            </div>
          </div>

          <div className={styles.reservationSection}>
            <h2 className={styles.sectionTitle}>予約フォーム</h2>
            <ReservationForm />
          </div>
        </div>
      </main>
    </div>
  );
}