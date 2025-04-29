
"use client"; // ← これも必ず付けよう！(忘れずに)

import { EmotionProvider } from "@/components/EmotionProvider";
import { EquipmentContext } from "@/contexts/EquipmentContext"; // 追加
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css"; 

// Equipmentデータをここに置いておく
const equipmentList = [
  { id: "dumbbell_room", name: "ダンベルルーム", description: "各種ダンベルを備えたトレーニングエリア" },
  { id: "bench_press_room", name: "ベンチプレスルーム", description: "ベンチプレス専用ルーム" },
  { id: "side_press_room", name: "サイドプレスルーム", description: "サイドプレス用マシン完備" },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head />
      <body>
        {/* layout.tsxでProviderで囲むと全体で共有できる */}
        <EquipmentContext.Provider value={equipmentList}>
          <EmotionProvider>
            {children}
          </EmotionProvider>
        </EquipmentContext.Provider>
      </body>
    </html>
  );
}
