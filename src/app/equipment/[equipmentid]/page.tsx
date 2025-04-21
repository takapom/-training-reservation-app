// src/app/equipment/[equipmentId]/page.tsx
"use client";

import { useParams } from "next/navigation";

export default function EquipmentDetailPage() {
  const { equipmentId } = useParams();

  return (
    <main style={{ padding: "2rem", color: "white" }}>
      <h1>機器詳細ページ: {equipmentId}</h1>
      <p>ここに「{equipmentId}」の予約フォームや説明を追加していきます！</p>
    </main>
  );
}


