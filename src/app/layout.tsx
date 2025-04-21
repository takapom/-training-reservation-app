// src/app/layout.tsx
import { EmotionProvider } from "@/components/EmotionProvider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head />
      <body>
        <EmotionProvider>
          {children}
        </EmotionProvider>
      </body>
    </html>
  );
}
