"use client"

import type React from "react"
import { useState } from "react"
import styles from "./page.module.css"
import Image from "next/image"
import GoogleLoginButton from "@/components/auth/GoogleLoginButton"


export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle login logic here
    console.log("Login attempt with:", email)
  }

  const handleGoogleLogin = () => {
    // Handle Google login logic here
    console.log("Google login initiated")
  }

  return (
    <main className={styles.container}>
      <div className={styles.loginBox}>
        <div className={styles.header}>
          <h1 className={styles.title}>GYM MASTER</h1>
          <p className={styles.subtitle}>予約管理システム</p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>
              メールアドレス
            </label>
            <input
              id="email"
              type="email"
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>
              パスワード
            </label>
            <input
              id="password"
              type="password"
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className={styles.forgotPassword}>
            <a href="#" className={styles.link}>
              パスワードをお忘れですか？
            </a>
          </div>

          <button type="submit" className={styles.loginButton}>
            ログイン
          </button>

          <div className={styles.divider}>
            <span className={styles.dividerText}>または</span>
          </div>

          <GoogleLoginButton />

        </form>

        <div className={styles.footer}>
          <p className={styles.registerText}>
            アカウントをお持ちでないですか？{" "}
            <a href="#" className={styles.link}>
              新規登録
            </a>
          </p>
        </div>
      </div>
    </main>
  )
}
