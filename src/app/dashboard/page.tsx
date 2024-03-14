"use client";
import { useEffect } from "react";

const Dashboard = () => {
  const data = localStorage.getItem("users");
  const dataObj = data ? JSON.parse(data) : null;
  if (dataObj) {
    window.location.href = `/dashboard/${dataObj?.creatorId}`;
  }
};

export default Dashboard;
