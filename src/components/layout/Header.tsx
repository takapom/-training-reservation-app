
// src/components/LabelBottomNavigation.tsx
"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import PersonIcon from "@mui/icons-material/Person";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SchoolIcon from "@mui/icons-material/School";
import LoginIcon from "@mui/icons-material/Login";

export default function LabelBottomNavigation() {
  const [value, setValue] = React.useState("profile");
  const router = useRouter();

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);

    // newValue に対応するパスへ遷移
    switch (newValue) {
      case "profile":
        router.push("/mypage");
        break;
      case "schedule":
        router.push("/equipment_home");
        break;
      case "study":
        router.push("/trainning");
        break;
      case "login":
        router.push("/logout");
        break;
    }
  };

  return (
    <BottomNavigation
      sx={{ width: "100%", maxWidth: 500 }}
      value={value}
      onChange={handleChange}
    >
      <BottomNavigationAction
        label="Profile"
        value="profile"
        icon={<PersonIcon />}
      />
      <BottomNavigationAction
        label="Schedule"
        value="schedule"
        icon={<AccessTimeIcon />}
      />
      <BottomNavigationAction
        label="Study"
        value="study"
        icon={<SchoolIcon />}
      />
      <BottomNavigationAction
        label="Login"
        value="login"
        icon={<LoginIcon />}
      />
    </BottomNavigation>
  );
}
