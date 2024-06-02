import { useSelector } from "react-redux";
import { Route, Routes } from "react-router";
import "@fortawesome/fontawesome-free/css/all.css";
import { CometChat } from "@cometchat-pro/chat";

//////////////////// ---- components ---- ////////////////////

import Yt from "./components/Youtube/Yt";
import Login from "./components/Login/Login";
import States from "./components/admin/States";
import Admin from "./components/admin/Dashboard";
import UserHome from "./components/user/UserHome";
import Mentors from "./components/Mentor/Mentors";
import UserChat from "./components/user/UserChat";
import Requests from "./components/admin/Requests";
import About from "./components/Layout/About/About";
import AdminChat from "./components/admin/AdminChat";
import NotFound from "./components/NotFound/NotFound";
import Reviews from "./components/MentorPanel/Ratings";
import PlayVideo from "./components/Youtube/PlayVideo";
import MentorChat from "./components/Mentor/MentorChat";
import MailRequest from "./components/Login/MailRequest";
import BecomeMentor from "./components/user/BecomeMentor";
import ChatWithAdmin from "./components/chat/ChatWithAdmin";
import EditMentor from "./components/MentorPanel/EditMentor";
import MentorProfile from "./components/Mentor/MentorProfile";
import ChatWithMentor from "./components/chat/ChatWithMentor";
import ForgotPassword from "./components/Login/ForgotPassword";
import MentorDetail from "./components/MentorPanel/MentorDetail";
import LeaderBoard from "./components/Mentors Leaderboard/LeaderBoard";

const appId = process.env.REACT_APP_COMETCHAT_APP_ID;
const region = process.env.REACT_APP_COMETCHAT_REGION;

////////////////////// initializing comet chat app when app starts ////////////////////////////////

const appSetting = new CometChat.AppSettingsBuilder()
  .subscribePresenceForAllUsers()
  .setRegion(region)
  .build();
CometChat.init(appId, appSetting).then(
  () => {
    console.log("Initialization completed successfully");
  },
  (error) => {
    console.log("Initialization failed with error:", error);
  }
);

export default function App() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  return (
    <div>
      <Routes>
        {/* -------------------- Admin Routes -------------------- */}

        {isAuthenticated && user.role === "admin" && (
          <Route>
            <Route path="/admin/:id" element={<Admin />} />
            <Route path="/admin/:id/chat" element={<AdminChat />} />
            <Route path="/admin/:id/requests" element={<Requests />} />
            <Route path="/admin/:id/states" element={<States />} />
          </Route>
        )}

        {/* -------------------- Mentor Routes -------------------- */}

        {isAuthenticated && user.role === "mentor" && (
          <Route>
            <Route path="/mentor/:id/edit" element={<EditMentor />} />
            <Route path="/mentor/:id/chat" element={<MentorChat />} />
            <Route path="/chatwithadmin/:uid" element={<ChatWithAdmin />} />
            <Route path="/mentor/:id" element={<MentorDetail />} />
            <Route path="/mentor/:id/reviews" element={<Reviews />} />
          </Route>
        )}

        {/* -------------------- User Routes -------------------- */}

        {isAuthenticated && user.role === "user" && (
          <Route>
            <Route path="/user/:id" element={<UserHome />} />
            <Route path="/user/:id/chat" element={<UserChat />} />
            <Route path="/user/:id/become" element={<BecomeMentor />} />
          </Route>
        )}

        {/* -------------------- Routes which requires only authentication -------------------- */}

        {isAuthenticated && (
          <Route>
            <Route path="/chatwithmentor/:uid" element={<ChatWithMentor />} />
          </Route>
        )}

        <Route path="/" element={<Mentors />} />
        <Route path="/leaderboard" element={<LeaderBoard />} />
        <Route path="/about" element={<About />} />
        <Route path="/mentor/:id/profile" element={<MentorProfile />} />

        {/* -------------------- Auth Routes -------------------- */}

        <Route path="/login" element={<Login />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/mailrequest" element={<MailRequest />} />

        {/* -------------------- Youtube videos Routes -------------------- */}
        <Route path="/videos" element={<Yt />} />
        <Route path="/videos/play/:id" element={<PlayVideo />} />

        {/* -------------------- Default Not found Route -------------------- */}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
