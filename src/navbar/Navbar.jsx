import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaUserCircle } from 'react-icons/fa';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // 컴포넌트가 마운트될 때 localStorage에서 userid 확인
  useEffect(() => {
    const userid = localStorage.getItem('userid');
    if (userid) {
      setIsLoggedIn(true);
    }
  }, []);

  // 로그아웃 핸들러
  const handleLogout = () => {
    localStorage.removeItem('userid'); // 필요 시 다른 사용자 정보도 제거
    setIsLoggedIn(false);
    navigate('/'); // 로그아웃 후 홈으로 이동
  };

  return (
    <NavbarContainer>
      <Top>
        <LeftSection>
          <Name as={Link} to="/">
            <HomeIcon />
            M@tchRoomie
          </Name>
        </LeftSection>
        <MidSection>
          <Highlight>광운대학교 기숙사</Highlight> 룸메 매칭 서비스
        </MidSection>
        <RightSection>
          {isLoggedIn ? (
            <LogButton onClick={handleLogout}>LOGOUT</LogButton>
          ) : (
            <LogButton as={Link} to="/login">
              LOGIN
            </LogButton>
          )}
          <>
            <ProfileButton as={Link} to="/profile">
              <ProfileIcon />
              PROFILE
            </ProfileButton>
          </>
        </RightSection>
      </Top>
      <Bottom>
        <BottomSection>
          <NavButton as={Link} to="/community">
            Community
          </NavButton>
          <NavButton as={Link} to="/match">
            Matching
          </NavButton>
          <NavButton
            as="a"
            href="https://kw.happydorm.or.kr/00/0000.kmc"
            target="_blank"
            rel="noopener noreferrer"
          >
            기숙사 홈페이지
          </NavButton>
        </BottomSection>
      </Bottom>
    </NavbarContainer>
  );
}

export default Navbar;

// 스타일링
const NavbarContainer = styled.div`
  background-color: white;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 1000;
  display: flex;
  flex-direction: column;
`;

const Top = styled.div`
  /* Desktop layout */
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 35px 40px;

  /* Responsive layout */
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 30px 20px;
  }
`;

const Name = styled(Link)`
  font-size: 27px;
  color: #333;
  text-decoration: none;
  font-weight: 600;
  margin-left: 50px;
  display: flex;
  align-items: center;

  &:hover {
    color: #333;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  }

  /* Responsive font size */
  @media (max-width: 768px) {
    margin-left: 0;
    font-size: 27px;
  }
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  /* On smaller screens, center the content */
  @media (max-width: 768px) {
    justify-content: center;
    width: 100%;
  }
`;

const MidSection = styled.div`
  color: #333;
  font-size: 20px;

  /* On smaller screens, center and reduce font size */
  @media (max-width: 768px) {
    margin-right: 0;
    margin-top: 20px;
    margin-bottom: 20px;
    font-size: 20px;
    text-align: center;
    width: 100%;
  }
`;

const Highlight = styled.span`
  font-weight: bold;
  font-size: 24px;
  color: #a72b0c;
  margin-right: 15px;

  @media (max-width: 768px) {
    font-size: 25px;
    margin-right: 10px;
  }
`;

const RightSection = styled.div`
  display: flex;
  gap: 15px;

  /* On smaller screens, center the elements */
  @media (max-width: 768px) {
    justify-content: center;
    width: 100%;
    margin-bottom: 20px;
  }
`;

const Bottom = styled.div`
  border-top: 2px solid #333;
  border-bottom: 2px solid #333;
  padding: 3px 40px;
  background-color: white;

  /* On smaller screens, adjust padding */
  @media (max-width: 768px) {
    padding: 10px 20px;
  }
`;

const BottomSection = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 15px;

  /* On smaller screens, adjust layout */
  @media (max-width: 768px) {
    justify-content: center;
    flex-wrap: wrap;
    gap: 10px;
  }
`;

const NavButton = styled.div`
  /* Button style */
  background: none;
  color: #333;
  border: none;
  padding: 10px 10px;
  margin: 0 6px;
  cursor: pointer;
  font-size: 20px;

  &:hover {
    color: #333;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  }

  /* Responsive font and margin */
  @media (max-width: 768px) {
    font-size: 18px;
    margin: 0;
    padding: 4px 8px;
  }
`;

const ProfileButton = styled(Link)`
  display: flex;
  align-items: center;
  background: none;
  color: #333;
  border: none;
  padding: 8px 10px;
  margin: 0 10px;
  cursor: pointer;
  font-size: 20px;
  text-decoration: none;

  &:hover {
    color: #333;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  }

  /* Responsive font and margin */
  @media (max-width: 768px) {
    font-size: 18px;
    margin: 0;
    padding: 4px 8px;
  }
`;

// 새로운 스타일: LogoutButton
const LogButton = styled.div`
  background: none;
  color: #a72b0c;
  border: 2px solid #a72b0c;
  padding: 8px 15px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 20px;

  display: flex;
  align-items: center;

  &:hover {
    background-color: #a72b0c;
    color: white;
  }

  /* Responsive font and margin */
  @media (max-width: 768px) {
    font-size: 18px;
    padding: 6px 12px;
  }
`;

// 아이콘
const HomeIcon = styled(FaHome)`
  color: #a72b0c;
  margin-right: 10px;
  font-size: 27px;

  /* Responsive icon size */
  @media (max-width: 768px) {
    font-size: 25px;
    margin-right: 5px;
  }
`;

const ProfileIcon = styled(FaUserCircle)`
  color: #a72b0c;
  font-size: 23px;
  margin-right: 5px;

  /* Responsive icon size */
  @media (max-width: 768px) {
    font-size: 20px;
    margin-right: 5px;
  }
`;
