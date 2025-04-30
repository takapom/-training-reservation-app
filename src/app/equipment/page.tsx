"use client";

import Link from "next/link";
import EquipmentCard from "@/components/equipment/EquipmentCard";

const equipmentList = [
  { id: "dumbbell_room", name: "ダンベルルーム", description: "各種ダンベルを備えたトレーニングエリア" },
  { id: "bench_press_room", name: "ベンチプレスルーム", description: "ベンチプレス専用ルーム" },
  { id: "side_press_room", name: "サイドプレスルーム", description: "サイドプレス用マシン完備" },
];

export default function HomePage() {
  return (
    <main style={{ padding: "2rem" }}>
      <h1 style={{ color: "white", fontSize: "2rem", marginBottom: "1.5rem" }}>トレーニング機器一覧</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {equipmentList.map((equipment) => (
          <Link key={equipment.id} href={`/equipment/${equipment.id}`} style={{ textDecoration: "none" }}>
            <EquipmentCard name={equipment.name} description={equipment.description} />
          </Link>
        ))}
      </div>
    </main>
  );
}