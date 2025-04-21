// src/components/equipment/EquipmentCard.tsx
"use client";

import styles from "./EquipmentCard.module.css";

type EquipmentCardProps = {
  name: string;
  description: string;
};

export default function EquipmentCard({ name, description }: EquipmentCardProps) {
  return (
    <div className={styles.card}>
      <h2 className={styles.title}>{name}</h2>
      <p className={styles.description}>{description}</p>
    </div>
  );
}
