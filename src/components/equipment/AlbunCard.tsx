"use client"

import type { FC } from "react"
import styles from "./AlbumCard.module.css"
import Image from "next/image"

export type AlbumCardProps = {
  name: string
  description: string
  imageUrl: string
  maxUsers: number
  targetMuscles: string[]
  currentReservations: number
}

const AlbumCard: FC<AlbumCardProps> = ({
  name,
  description,
  imageUrl,
  maxUsers,
  targetMuscles,
  currentReservations,
}) => {
  // 予約状況に基づいて色を決定
  const reservationPercentage = (currentReservations / maxUsers) * 100
  let statusColor = styles.statusLow

  if (reservationPercentage >= 80) {
    statusColor = styles.statusHigh
  } else if (reservationPercentage >= 50) {
    statusColor = styles.statusMedium
  }

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image src={imageUrl || "/placeholder.png"} alt={`${name}の写真`} fill style={{ objectFit: "cover" }} />
        <div className={styles.imageDimmer}></div>
      </div>

      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{name}</h3>
        <p className={styles.cardDescription}>{description}</p>

        <div className={styles.infoGrid}>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>最大利用人数</span>
            <span className={styles.infoValue}>{maxUsers}人</span>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>対応部位</span>
            <div className={styles.muscleTagsContainer}>
              {targetMuscles.map((muscle, index) => (
                <span key={index} className={styles.muscleTag}>
                  {muscle}
                </span>
              ))}
            </div>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>現在の予約人数</span>
            <div className={`${styles.reservationStatus} ${statusColor}`}>
              <span className={styles.infoValue}>{currentReservations}人</span>
              <div className={styles.progressBar}>
                <div className={styles.progressFill} style={{ width: `${reservationPercentage}%` }}></div>
              </div>
            </div>
          </div>
        </div>

        <button className={styles.viewButton}>詳細を見る</button>
      </div>
    </div>
  )
}

export default AlbumCard
