"use client";

import { FC } from "react";
import styles from "./AlbumCard.module.css";
import Image from "next/image";

export type AlbumCardProps = {
  name: string;
  description: string;
  imageUrl: any;
};

const AlbumCard: FC<AlbumCardProps> = ({ name, description, imageUrl }) => (
  <div className={styles.wrapper}>
    <div className={`card shadow-sm ${styles.card}`}>
    <div className={styles.imageWrapper}>
        <Image
          src={imageUrl}
          alt={`${name}の写真`}
          fill
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="card-body">
        <p className="card-text">{description}</p>
        <div className="d-flex justify-content-between align-items-center">
          <div className="btn-group">
            <button type="button" className="btn btn-sm btn-outline-secondary">
              View
            </button>
          </div>
          <small className="text-body-secondary">{name}</small>
        </div>
      </div>
    </div>
  </div>
);

export default AlbumCard;
