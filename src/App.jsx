// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // react-router-dom 임포트
import Navbar from './navbar/Navbar';
import Main from './pages/Main';
import Match from './pages/Match';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Forgotpw from './pages/Forgotpw';
import Community from './pages/Community';
import Write from './pages/Write';
import styled from 'styled-components';

function App() {
  return (
    <Router>
      <Navbar />
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
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
const Container = styled.div`
  margin: 220px 150px 0px 150px;

  @media (max-width: 480px) {
    margin: 0px 50px; /* 작은 화면에서는 더 좁은 여백 */
  }
`;
