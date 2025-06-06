"use client";

import { useState } from "react";
import styles from "./page.module.css"; // CSSモジュールをインポート！
import LabelBottomNavigation from "@/components/layout/Header";

export default function Home() {
  const [bodyPart, setBodyPart] = useState("");
  const [place, setPlace] = useState("");
  const [level, setLevel] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [freeNote, setfreeNote] = useState("");

  const handleSubmit = async () => {
    try {
      setLoading(true)
      const response = await fetch(process.env.NEXT_PUBLIC_DIFY_API_URL as string, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.NEXT_PUBLIC_DIFY_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: {
            body_part: bodyPart,
            training_place: place,
            training_level: level,
            freeNote: freeNote, 
          },
          query: "筋トレメニューを提案してください",
          user: "test-user-001",
        }),
      });

      const data = await response.json();
      console.log(data);

      setResult(data.answer);
    } catch (error) {
      console.error("エラーが発生しました", error);
    } finally {
      setLoading(false)
    }
  };

  return (
    <div className={styles.page}>
      <LabelBottomNavigation />
      <main className={styles.container}>
        <h1 className={styles.title}>筋トレメニュー提案</h1>
        
        <div className={styles.instructions}>
          <h3 className={styles.instructionsTitle}>入力の注意点</h3>
          <ul className={styles.instructionsList}>
            <li>鍛えたい部位を選択してください</li>
            <li>トレーニング場所を選択すると、適切な器具を使ったメニューが提案されます</li>
            <li>あなたのレベルに合わせたメニューが提案されます</li>
            <li>特別な要望がある場合は、追加の希望欄に入力してください</li>
          </ul>
        </div>

        <div className={styles.formContainer}>
          <div className={styles.form}>
            <label className={styles.label}>鍛えたい部位:</label>
            <select
              className={styles.input}
              value={bodyPart}
              onChange={(e) => setBodyPart(e.target.value)}
            >
              <option value="">選択してください</option>
              <option value="胸">胸</option>
              <option value="腕">腕</option>
              <option value="脚">脚</option>
              <option value="背中">背中</option>
              <option value="腹筋">腹筋</option>
            </select>

            <label className={styles.label}>トレーニング場所:</label>
            <select
              className={styles.input}
              value={place}
              onChange={(e) => setPlace(e.target.value)}
            >
              <option value="">選択してください</option>
              <option value="家">家</option>
              <option value="ジム">ジム</option>
            </select>

            <label className={styles.label}>レベル:</label>
            <select
              className={styles.input}
              value={level}
              onChange={(e) => setLevel(e.target.value)}
            >
              <option value="">選択してください</option>
              <option value="初級者">初級者</option>
              <option value="中級者">中級者</option>
              <option value="上級者">上級者</option>
            </select>

            <label className={styles.label}>追加の希望・リクエスト（任意）:</label>
            <input
              className={styles.input}
              value={freeNote}
              onChange={(e) => setfreeNote(e.target.value)}
              placeholder="例）膝に負担をかけたくない、短時間メニュー希望 など"
            />

            <button onClick={handleSubmit} className={styles.button}>
              メニューを提案してもらう
            </button>
          </div>
        </div>

        {loading && (
          <div className={styles.loadingWrapper}>
            <div className={styles.spinner}></div>
            <p className={styles.loading}>読み込み中...</p>
          </div>
        )}

        {result && (
          <div className={styles.result}>
            <h2>提案されたメニュー:</h2>
            <div className={styles.support_message}>
              {result.split('\n').map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}