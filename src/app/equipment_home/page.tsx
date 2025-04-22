"use client";

import Link from "next/link";
import styles from "./page.module.css"
import LabelBottomNavigation from "@/components/layout/Header";
import { EquipmentContext } from "@/contexts/EquipmentContext";
import AlbumCard from "@/components/equipment/AlbunCard";



const equipmentList = [
  { id: "dumbbell_room", name: "ダンベルルーム", description: "各種ダンベルを備えたトレーニングエリア", imageUrl: "/danbel.webp"},
  { id: "bench_press_room", name: "ベンチプレスルーム", description: "ベンチプレス専用ルーム",imageUrl: "/benti.jpg" },
  { id: "side_press_room", name: "サイドプレス", description: "サイドプレス用マシン完備", imageUrl: "/kintore.webp" },
  { id: "running", name: "ランニングマシーン", description: "ランニングマシーン", imageUrl: "/running_machine.jpeg" },
];

export default function HomePage() {
  return (
    <EquipmentContext.Provider value={equipmentList}>
    <main>
        <LabelBottomNavigation />
      <h1 className={styles.heading_text}>トレーニング機器予約ページ</h1>
      <div>
        {equipmentList.map((equipment) => (
          <Link key={equipment.id} href={`/equipment/${equipment.id}`} style={{ textDecoration: "none" }}>
            <AlbumCard name={equipment.name} description={equipment.description} imageUrl={equipment.imageUrl} />
          </Link>
        ))}
      </div>
    </main>
    </EquipmentContext.Provider>
  );
}

