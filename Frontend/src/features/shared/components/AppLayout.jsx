import React from "react";
import { Outlet } from "react-router";
import Sidebar from "./Sidebar";
import TopRightNav from "./TopRightNav";
import "../style/applayout.scss";

const AppLayout = () => {
  return (
    <div className="app-layout">
      <Sidebar />
      <TopRightNav />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
