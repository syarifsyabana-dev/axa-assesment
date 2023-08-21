import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Users from "./users";
import MainLayout from "../components/layouts";
import Posts from "./posts";
import Albums from "./albums";
import Comments from "./comments";
import Photos from "./photos";

const RouterApp = () => {
  return (
    <BrowserRouter basename="/">
      <MainLayout>
        <Routes>
          <Route path="/" element={<>Welcome</>} />
          <Route path="/users" element={<Users />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/comments" element={<Comments />} />
          <Route path="/albums" element={<Albums />} />
          <Route path="/photos" element={<Photos />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
};

export default RouterApp;
