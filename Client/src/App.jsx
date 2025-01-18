import { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Home from "./Components/Home/Home";
import Contact from "./Components/Contact";
import Service from "./Components/Service";
import About from "./Components/About";
import Blog from "./Components/Blog";
import BlogPage from "./Components/BlogPage";
import DashBoard from "./Components/Admin/DashBoard";
import DashBoardHome from "./Components/Admin/DashBoardHome";
import DashboardContact from "./Components/Admin/DashboardContact";
import DashBoardAbout from "./Components/Admin/DashBoardAbout";
import DashobardBlog from "./Components/Admin/DashobardBlog";
import DashBoardService from "./Components/Admin/dashBoardService";
import DashboardFAQ from "./Components/Admin/DashboardFAQ";
import DashBoardAppointment from "./Components/Admin/DashBoardAppointment";


import AddService from "./Components/Dashboard/AddService";
import UpdateBlog from "./Components/Dashboard/UpdateBlog";
import UpdateService from "./Components/Dashboard/UpdateService";
import AddBlog from "./Components/Dashboard/AddBlog";
import AddFaq from "./Components/Dashboard/AddFaq"
import UpdateFaq  from "./Components/Dashboard/UpdateFaq"



import Login from "./Components/Auth/Login";
import ProtectedRoute from "./Protected";
import { Provider } from "react-redux";
import store from "./store/store";
function App() {
  const [count, setCount] = useState(0);
  if (typeof global === "undefined") {
    window.global = window;
  }

  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="" element={<Home />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
              <Route path="/service" element={<Service />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:blogid" element={<BlogPage />} />
            </Route>
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashBoard />
                </ProtectedRoute>
              }
            >
              <Route path="" element={<DashBoardHome />} />
              <Route path="contact" element={<DashboardContact />} />
              <Route path="faq" element={<DashboardFAQ />} />
              <Route path="about" element={<DashBoardAbout />} />
              <Route path="service" element={<DashBoardService />} />



              <Route path="add-service" element={<AddService />} />
              <Route path="update-service/:id" element={<UpdateService />} />
              <Route path="update-blog/:id" element={<UpdateBlog />} />
              <Route path="add-blog" element={<AddBlog />} />
              <Route path="add-faq" element={<AddFaq />} />
              <Route path="update-faq/:id" element={<UpdateFaq />} />



              <Route path="blog" element={<DashobardBlog />} />

              <Route path="appointment" element={<DashBoardAppointment />} />
            </Route>
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
