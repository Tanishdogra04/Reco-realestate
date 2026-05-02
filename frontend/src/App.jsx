import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import UserDashboard from "./dashboard/UserDashboard";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import Home from "./pages/Home";
import Listings from "./pages/Listings";
import PropertyDetails from "./pages/PropertyDetails";
import PostProperty from "./pages/PostProperty";
import PostPropertyStep1 from "./pages/PostPropertyStep1";
import PostPropertyStep2 from "./pages/PostPropertyStep2";
import PostPropertyStep3 from "./pages/PostPropertyStep3";
import PostPropertyStep4 from "./pages/PostPropertyStep4";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NewProject from "./pages/NewProject";
import ReadyToMove from "./pages/ReadyToMove";
import Residential from "./pages/Residential";
import ProjectListing from "./pages/ProjectListing";
import View from "./pages/View";
import Detailsproperty from "./pages/Detailsproperty";
import Collection from "./pages/Collection";
import Luxury from "./pages/Luxury";
import Insights from "./pages/Insights";
import InsightDetail from "./pages/InsightDetail";
import Solutions from "./pages/Solutions";
import TopLocalitiesPage from "./pages/TopLocalitiesPage";
import EventsPage from "./pages/EventsPage";
import PropertyListingPage from "./pages/PropertyListingPage";
import PropertiesPage from "./pages/PropertiesPage";
import EditProfile from "./pages/EditProfile";
import SavedProperties from "./pages/SavedProperties";
import Commercial from "./pages/Commercial";
import ForgotPassword from "./pages/ForgotPassword";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>

        {/* ================= ADMIN PORTAL ================= */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* ================= DASHBOARD (PROTECTED) ================= */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          } 
        />

        {/* ================= MAIN WEBSITE ================= */}
        <Route
          path="*"
          element={
            <>
              <Navbar />

              <main className="pt-16">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/properties" element={<PropertiesPage />} />
                  <Route path="/properties/:category" element={<PropertyListingPage />} />
                  <Route path="/view" element={<PropertyListingPage />} />
                  <Route path="/property/:id" element={<PropertyDetails />} />
                  <Route path="/detailsproperty" element={<Detailsproperty />} />

                  <Route 
                    path="/edit-profile" 
                    element={
                      <ProtectedRoute>
                        <EditProfile />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/saved-properties" 
                    element={
                      <ProtectedRoute>
                        <SavedProperties />
                      </ProtectedRoute>
                    } 
                  />

                  <Route 
                    path="/post-property" 
                    element={
                      <ProtectedRoute>
                        <PostProperty />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/post-property-step1" 
                    element={
                      <ProtectedRoute>
                        <PostPropertyStep1 />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/post-property-step2" 
                    element={
                      <ProtectedRoute>
                        <PostPropertyStep2 />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/post-property-step3" 
                    element={
                      <ProtectedRoute>
                        <PostPropertyStep3 />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/post-property-step4" 
                    element={
                      <ProtectedRoute>
                        <PostPropertyStep4 />
                      </ProtectedRoute>
                    } 
                  />

                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />

                  <Route path="/new-project" element={<NewProject />} />
                  <Route path="/ready-to-move" element={<ReadyToMove />} />
                  <Route path="/commercial" element={<Commercial />} />
                   <Route 
                    path="/contact" 
                    element={
                      <ProtectedRoute>
                        <Contact />
                      </ProtectedRoute>
                    } 
                  />
                  <Route path="/projects-preview" element={<ProjectListing />} />
                  <Route path="/view" element={<View />} />
                  <Route path="/insights" element={<Insights />} />
                  <Route path="/insight/:id" element={<InsightDetail />} />
                  <Route path="/collection/:type" element={<Collection />} />
                  <Route path="/luxury" element={<Luxury />} />
                  <Route path="/solutions" element={<Solutions />} />
                  <Route path="/top-localities" element={<TopLocalitiesPage />} />
                  <Route path="/events" element={<EventsPage />} />
                </Routes>
              </main>

              <Footer />
            </>
          }
        />

      </Routes>
    </Router>
  );
}

export default App;