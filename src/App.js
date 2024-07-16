import "./App.css";

import { Navigate, Route, Routes } from "react-router-dom";

import CustomLayout from "./components/Layout/Layout";
import DetailSportClass from "pages/Sport/Detail";
import Hero from "pages/Banner/Hero";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";
import ParticipantRoom from "pages/Room/Participant";
import ParticipantSportClass from "pages/Sport/Participant";
import PrivateRoute from "./components/PrivateRouter";
import Room from "pages/Room";
import RoomBanner from "pages/Banner/RoomBanner";
import SportClass from "./pages/Sport";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<CustomLayout />}>
        <Route index element={<Navigate to="/sport" />} />
        <Route
          path="/sport"
          element={
            <PrivateRoute>
              <SportClass />
            </PrivateRoute>
          }
        />
        <Route
          path="/sport/detail/:id"
          element={
            <PrivateRoute>
              <DetailSportClass />
            </PrivateRoute>
          }
        />
        <Route
          path="/sport/participant/:id"
          element={
            <PrivateRoute>
              <ParticipantSportClass />
            </PrivateRoute>
          }
        />
        <Route
          path="/room"
          element={
            <PrivateRoute>
              <Room />
            </PrivateRoute>
          }
        />
        <Route
          path="/room/participant/:id"
          element={
            <PrivateRoute>
              <ParticipantRoom />
            </PrivateRoute>
          }
        />
        <Route
          path="/banner/hero"
          element={
            <PrivateRoute>
              <Hero />
            </PrivateRoute>
          }
        />
        <Route
          path="/banner/room-banner"
          element={
            <PrivateRoute>
              <RoomBanner />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
