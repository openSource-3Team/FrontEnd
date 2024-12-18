import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaUserCircle, FaBell } from 'react-icons/fa';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const userid = localStorage.getItem('userid');
    setIsLoggedIn(!!userid);

    if (userid) {
      fetchNotifications(userid);
    }
  }, []);

  const fetchNotifications = async (userid) => {
    try {
      const response = await fetch(`/api/users/received/${userid}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        const data = await response.json();
        setNotificationCount(data.result?.length || 0); // 알림 개수 설정
      } else {
        console.error('알림 데이터를 가져오는 데 실패했습니다.');
      }
    } catch (error) {
      console.error('알림 데이터를 가져오는 중 오류:', error);
    }
  };

  const handleAuthNavigation = (path) => {
    const userid = localStorage.getItem('userid');
    if (!userid) {
      alert('로그인이 필요합니다. 로그인 페이지로 이동합니다.');
      navigate('/login');
    } else {
      navigate(path);
    }
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
            <LogButton
              onClick={() => {
                localStorage.removeItem('userid');
                setIsLoggedIn(false);
                navigate('/login');
              }}
            >
              LOGOUT
            </LogButton>
          ) : (
            <LogButton as={Link} to="/login">
              LOGIN
            </LogButton>
          )}
          <ProfileButton onClick={() => handleAuthNavigation('/profile')}>
            <ProfileIcon />
            PROFILE
          </ProfileButton>
          <NotificationWrapper
            onClick={() => handleAuthNavigation('/notification')}
          >
            <NotificationIcon />
            {notificationCount > 0 && <Badge>{notificationCount}</Badge>}
          </NotificationWrapper>
        </RightSection>
      </Top>
      <Bottom>
        <BottomSection>
          <NavButton as={Link} to="/community">
            Community
          </NavButton>
          <NavButton onClick={() => handleAuthNavigation('/match')}>
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
};

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
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 35px 40px;
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
  display: flex;
  align-items: center;
  &:hover {
    color: #333;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  }
  @media (max-width: 768px) {
    font-size: 27px;
  }
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 768px) {
    justify-content: center;
    width: 100%;
  }
`;

const MidSection = styled.div`
  color: #333;
  font-size: 20px;
  @media (max-width: 768px) {
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
  }
`;

const RightSection = styled.div`
  display: flex;
  gap: 15px;
  @media (max-width: 768px) {
    justify-content: center;
    width: 100%;
  }
`;

const NotificationWrapper = styled.div`
  margin: 0 10px;
  position: relative;
  display: flex;

  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const NotificationIcon = styled(FaBell)`
  font-size: 25px;
  color: #333;
`;

const Badge = styled.div`
  position: absolute;
  top: -1px;
  right: -10px;
  background-color: #a72b0c; /* 포인트 색상 */
  color: white; /* 텍스트 색상 */
  font-size: 12px;
  font-weight: bold;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

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
`;

const ProfileButton = styled.div`
  display: flex;
  align-items: center;
  background: none;
  color: #333;
  padding: 8px 10px;
  cursor: pointer;
  font-size: 20px;
  &:hover {
    color: #333;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  }
`;

const Bottom = styled.div`
  border-top: 2px solid #333;
  border-bottom: 2px solid #333;
  padding: 3px 40px;
  background-color: white;
  @media (max-width: 768px) {
    padding: 10px 20px;
  }
`;

const BottomSection = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const NavButton = styled.div`
  background: none;
  color: #333;
  padding: 10px;
  cursor: pointer;
  font-size: 20px;
  &:hover {
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  }
`;

const HomeIcon = styled(FaHome)`
  color: #a72b0c;
  margin-right: 10px;
  font-size: 27px;
`;

const ProfileIcon = styled(FaUserCircle)`
  color: #a72b0c;
  font-size: 23px;
  margin-right: 5px;
`;
