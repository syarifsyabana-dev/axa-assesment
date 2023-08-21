import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Users from "./users";
import MainLayout from "../components/layouts";
import Posts from "./posts";
import Albums from "./albums";

const RouterApp = () => {
  return (
    <BrowserRouter basename="/">
      <MainLayout>
        <Routes>
          <Route path="/" element={<>Welcome</>} />
          <Route path="/users" element={<Users />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/albums" element={<Albums />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
};

export default RouterApp;
