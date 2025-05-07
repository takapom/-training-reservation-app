"use client"

import * as React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import BottomNavigation from "@mui/material/BottomNavigation"
import BottomNavigationAction from "@mui/material/BottomNavigationAction"
import PersonIcon from "@mui/icons-material/Person"
import AccessTimeIcon from "@mui/icons-material/AccessTime"
import SchoolIcon from "@mui/icons-material/School"
import LoginIcon from "@mui/icons-material/Login"
import styles from "./header.module.css"

export default function LabelBottomNavigation() {
  const [value, setValue] = useState("schedule")
  const router = useRouter()

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)

    // newValue に対応するパスへ遷移
    switch (newValue) {
      case "profile":
        router.push("/mypage")
        break
      case "schedule":
        router.push("/equipment_home")
        break
      case "study":
        router.push("/trainning")
        break
      case "login":
        router.push("/logout")
        break
    }
  }

  return (
    <div className={styles.navigationWrapper}>
      <BottomNavigation
        className={styles.navigation}
        value={value}
        onChange={handleChange}
        sx={{
          width: "100%",
          maxWidth: 500,
          background: "rgba(31, 41, 55, 0.95)",
          backdropFilter: "blur(10px)",
          borderRadius: "12px",
          border: "1px solid rgba(255, 255, 255, 0.15)",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
        }}
      >
        <BottomNavigationAction
          label="Profile"
          value="profile"
          icon={<PersonIcon />}
          sx={{
            color: "rgba(255, 255, 255, 0.7)",
            "&.Mui-selected": {
              color: "#ffffff",
            },
          }}
        />
        <BottomNavigationAction
          label="Schedule"
          value="schedule"
          icon={<AccessTimeIcon />}
          sx={{
            color: "rgba(255, 255, 255, 0.7)",
            "&.Mui-selected": {
              color: "#ffffff",
            },
          }}
        />
        <BottomNavigationAction
          label="Study"
          value="study"
          icon={<SchoolIcon />}
          sx={{
            color: "rgba(255, 255, 255, 0.7)",
            "&.Mui-selected": {
              color: "#ffffff",
            },
          }}
        />
        <BottomNavigationAction
          label="Login"
          value="login"
          icon={<LoginIcon />}
          sx={{
            color: "rgba(255, 255, 255, 0.7)",
            "&.Mui-selected": {
              color: "#ffffff",
            },
          }}
        />
      </BottomNavigation>
    </div>
  )
}
