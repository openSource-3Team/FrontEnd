// App.jsx
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import Navbar from './navbar/Navbar';
import HomeNavbar from './navbar/HomeNavbar'; // HomeNavbar 임포트
import Main from './pages/Main';
import Match from './pages/Match';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Forgotpw from './pages/Forgotpw';
import Community from './pages/Community';
import Write from './pages/Write';
import PostView from './pages/PostView';
import Roomie from './pages/Roomie';
import styled from 'styled-components';

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  const isHomePath = location.pathname === '/'; // HomeNavbar를 렌더링할 경로 확인

  return (
    <>
      {isHomePath ? <HomeNavbar /> : <Navbar />}
      <Container>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/match" element={<Match />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgotpw" element={<Forgotpw />} />
          <Route path="/community" element={<Community />} />
          <Route path="/write" element={<Write />} />
          <Route path="/postview/:id" element={<PostView />} />
          <Route path="/roomie" element={<Roomie />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;

const Container = styled.div``;
