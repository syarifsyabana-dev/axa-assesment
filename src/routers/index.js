import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Users from "./users";
import MainLayout from "../components/layouts";
import Posts from "./posts";

const RouterApp = () => {
  return (
    <BrowserRouter basename="/">
      <MainLayout>
        <Routes>
          <Route path="/" element={<>Welcome</>} />
          <Route path="/users" element={<Users />} />
          <Route path="/posts" element={<Posts />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
};

export default RouterApp;
