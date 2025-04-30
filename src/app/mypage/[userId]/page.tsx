"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { onAuthStateChanged, type User, signOut } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { collection, onSnapshot, query, orderBy } from "firebase/firestore"
import { db } from "@/lib/firebase"
import Header from "@/components/layout/Header"
import styles from "../page.module.css"
import Link from "next/link"

type Reservation = {
  id: string
  equipmentName: string
  reservedDateTime: string
  status?: string
}

export default function UserMyPage() {
  const { userId } = useParams()
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (!u || u.uid !== userId) {
        router.push("/")
      } else {
        setUser(u)

        const q = query(collection(db, "users", String(userId), "reservations"), orderBy("reservedDateTime", "desc"))

        const unsubscribe = onSnapshot(q, (snapshot) => {
          setIsLoading(false)

          if (snapshot.empty) {
            console.log("予約が見つかりませんでした。")
            setReservations([])
            return
          }

          const data = snapshot.docs.map((doc) => {
            const d = doc.data()
            console.log("予約データ取得:", d)

            // Add a status field for demonstration
            const reservationDate = d.reservedDateTime?.toDate()
            const status = reservationDate > new Date() ? "upcoming" : "past"

            return {
              id: doc.id,
              equipmentName: d.equipmentName || "未設定",
              reservedDateTime: reservationDate?.toLocaleString() || "日時不明",
              status,
            }
          })

          setReservations(data)
        })

        return () => unsubscribe()
      }
    })

    return () => unsub()
  }, [userId, router])

  const handleLogout = () => {
    signOut(auth).then(() => {
      router.push("/")
    })
  }

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}>
          <div className={styles.loadingCircle}></div>
          <div className={styles.loadingCircle}></div>
          <div className={styles.loadingCircle}></div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.pageWrapper}>
      <Header />
      <div className={styles.backgroundEffect}></div>
      <main className={styles.container}>
        <div className={styles.glassCard}>
          <div className={styles.profileSection}>
            <div className={styles.profileHeader}>
              <div className={styles.avatarContainer}>
                {user?.photoURL ? (
                  <img src={user.photoURL || "/placeholder.svg"} alt="avatar" className={styles.avatar} />
                ) : (
                  <div className={styles.avatarPlaceholder}>{user?.displayName?.charAt(0) || "U"}</div>
                )}
                <div className={styles.statusIndicator}></div>
              </div>
              <div className={styles.userInfo}>
                <h1 className={styles.username}>{user?.displayName || "User"}</h1>
                <p className={styles.userEmail}>{user?.email}</p>
                <div className={styles.userStats}>
                  <div className={styles.statItem}>
                    <span className={styles.statValue}>{reservations.length}</span>
                    <span className={styles.statLabel}>Reservations</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statValue}>
                      {reservations.filter((r) => r.status === "upcoming").length}
                    </span>
                    <span className={styles.statLabel}>Upcoming</span>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.actionButtons}>
              <button className={styles.editButton}>Edit Profile</button>
              <button className={styles.logoutButton} onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        </div>

        <div className={styles.glassCard}>
          <section className={styles.reservationsSection}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Your Reservations</h2>
            </div>

            {reservations.length === 0 ? (
              <div className={styles.emptyState}>
                <div className={styles.emptyIcon}>📅</div>
                <p>No reservations found</p>
                <Link href="/equipment_home">
                <button className={styles.newReservationButton}>Make a Reservation</button>
                </Link>
              </div>
            ) : (
              <ul className={styles.reservationList}>
                {reservations.map((res) => (
                  <li key={res.id} className={styles.reservationItem}>
                    <div className={styles.reservationContent}>
                      <div className={styles.reservationHeader}>
                        <h3 className={styles.equipmentName}>{res.equipmentName}</h3>
                        <span className={`${styles.statusBadge} ${styles[res.status || ""]}`}>
                          {res.status === "upcoming" ? "Upcoming" : "Past"}
                        </span>
                      </div>
                      <div className={styles.reservationDetails}>
                        <div className={styles.detailItem}>
                          <span className={styles.detailIcon}>🕒</span>
                          <span className={styles.reservationTime}>{res.reservedDateTime}</span>
                        </div>
                        <div className={styles.detailItem}>
                          <span className={styles.detailIcon}>🆔</span>
                          <span className={styles.reservationId}>ID: {res.id.substring(0, 8)}...</span>
                        </div>
                      </div>
                    </div>
                    <div className={styles.reservationActions}>
                      {res.status === "upcoming" && (
                        <>
                          <button className={styles.actionButton}>Modify</button>
                          <button className={`${styles.actionButton} ${styles.cancelButton}`}>Cancel</button>
                        </>
                      )}
                      {res.status === "past" && <button className={styles.actionButton}>Details</button>}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </main>
    </div>
  )
}
