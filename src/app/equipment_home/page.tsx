"use client"

import Link from "next/link"
import styles from "./page.module.css"
import LabelBottomNavigation from "@/components/layout/Header"
import { EquipmentContext } from "@/contexts/EquipmentContext"
import AlbumCard from "@/components/equipment/AlbunCard"

const equipmentList = [
  {
    id: "dumbbell_room",
    name: "ダンベルルーム",
    description: "各種ダンベルを備えたトレーニングエリア",
    imageUrl: "/danbel.webp",
    maxUsers: 4,
    targetMuscles: ["腕", "肩", "胸"],
    currentReservations: 8,
  },
  {
    id: "bench_press_room",
    name: "ベンチプレスルーム",
    description: "ベンチプレス専用ルーム",
    imageUrl: "/benti.jpg",
    maxUsers: 4,
    targetMuscles: ["胸", "三頭筋"],
    currentReservations: 5,
  },
  {
    id: "side_press_room",
    name: "サイドプレス",
    description: "サイドプレス用マシン完備",
    imageUrl: "/kintore.webp",
    maxUsers: 4,
    targetMuscles: ["肩", "上腕"],
    currentReservations: 3,
  },
  {
    id: "running",
    name: "ランニングマシーン",
    description: "ランニングマシーン",
    imageUrl: "/running_machine.jpeg",
    maxUsers: 4,
    targetMuscles: ["脚", "心肺"],
    currentReservations: 12,
  },
]

export default function HomePage() {
  return (
    <EquipmentContext.Provider value={equipmentList}>
      <main className={styles.mainContainer}>
        <div className={styles.headerWrapper}>
          <LabelBottomNavigation />
        </div>
        <h1 className={styles.headingText}>トレーニング機器予約ページ</h1>
        <div className={styles.equipmentGrid}>
          {equipmentList.map((equipment) => (
            <Link key={equipment.id} href={`/equipment/${equipment.id}`} className={styles.equipmentLink}>
              <AlbumCard
                name={equipment.name}
                description={equipment.description}
                imageUrl={equipment.imageUrl}
                maxUsers={equipment.maxUsers}
                targetMuscles={equipment.targetMuscles}
                currentReservations={equipment.currentReservations}
              />
            </Link>
          ))}
        </div>
      </main>
    </EquipmentContext.Provider>
  )
}
