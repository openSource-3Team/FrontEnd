import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaHome, FaUserCircle } from 'react-icons/fa';

function Navbar() {
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
          <NavButton as={Link} to="/login">
            LOGIN
          </NavButton>
          <ProfileButton as={Link} to="/profile">
            <ProfileIcon />
            PROFILE
          </ProfileButton>
        </RightSection>
      </Top>
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
`;

const Name = styled(Link)`
  font-size: 17px;
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
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
`;
const MidSection = styled.div`
  color: #333;
  font-size: 17px;
  margin-right: 50px;
`;

const Highlight = styled.span`
  font-weight: bold;
  font-size: 17px;
  color: #a72b0c;
  margin-right: 30px;
`;

const RightSection = styled.div`
  display: flex;
  gap: 15px;
`;

const Bottom = styled.div`
  border-top: 3px solid #333;
  border-bottom: 3px solid #333;
  padding: 20px 40px;
  background-color: white;
`;

const BottomSection = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 15px;
`;

const NavButton = styled.div`
  background: none;
  color: #333;
  border: none;
  padding: 8px 10px;
  margin: 0 10px;
  cursor: pointer;
  font-size: 17px;

  &:hover {
    color: #333;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
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
  font-size: 17px;
  text-decoration: none;

  &:hover {
    color: #333;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  }
`;

/* 아이콘 */
const HomeIcon = styled(FaHome)`
  color: #a72b0c;
  margin-right: 10px;
  font-size: 17px;
`;

const ProfileIcon = styled(FaUserCircle)`
  color: #a72b0c;
  font-size: 17px;
  margin-right: 5px;
`;
