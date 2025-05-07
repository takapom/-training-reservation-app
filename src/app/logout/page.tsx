"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { signOut } from "firebase/auth"
import { auth } from "@/lib/firebase"
import Header from "@/components/layout/Header"
import styles from "./page.module.css"

export default function Logout() {
  const router = useRouter()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true)
      await signOut(auth)
      setTimeout(() => {
        router.push("/")
      }, 2000)
    } catch (error) {
      console.error("ログアウトに失敗しました:", error)
      setIsLoggingOut(false)
    }
  }

  return (
    <div className={styles.pageWrapper}>
      <Header />
      <div className={styles.backgroundEffect}></div>
      <main className={styles.container}>
        <div className={styles.glassCard}>
          <div className={styles.logoutContent}>
            {isLoggingOut ? (
              <>
                <div className={styles.logoutAnimation}>
                  <div className={styles.circle}></div>
                  <div className={styles.circle}></div>
                  <div className={styles.circle}></div>
                </div>
                <h1 className={styles.title}>ログアウト中...</h1>
                <p className={styles.message}>ご利用ありがとうございました</p>
                <div className={styles.redirectMessage}>
                  <p>トップページにリダイレクトされます</p>
                </div>
              </>
            ) : (
              <>
                <h1 className={styles.title}>ログアウト</h1>
                <p className={styles.message}>ログアウトしますか？</p>
                <div className={styles.buttonContainer}>
                  <button 
                    className={`${styles.button} ${styles.logoutButton}`}
                    onClick={handleLogout}
                  >
                    ログアウト
                  </button>
                  <button 
                    className={`${styles.button} ${styles.cancelButton}`}
                    onClick={() => router.back()}
                  >
                    キャンセル
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}