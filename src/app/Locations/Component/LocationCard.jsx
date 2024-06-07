"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "./LocationCard.module.css";
import axioinstance from "@/app/Instance/api_instance";

function LocationCard({cupboards}) {
  

  return (
    <div className={styles.container}>
      {cupboards.map((cupboard, index) => (
        <div className={styles.card} key={index}>
          <Link href={`/Locations/${cupboard.cupboardName}`} key={index}>
            <h2 className={styles.cupboardName}>Cupboard {cupboard.cupboardId}-{cupboard.cupboardName}</h2>
            <p className={styles.details}>
              Number of Shelves: {cupboard.shelfNo.length}
            </p>
            <p className={styles.details}>Number of Books: {cupboard.count}</p>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default LocationCard;
