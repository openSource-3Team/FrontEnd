import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';

function Navbar() {
  return (
    <NavbarContainer>
      <Top>
        <LeftSection>
          <Name as={Link} to="/main">
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
          <NavButton as={Link} to="/signup">
            SIGN UP
          </NavButton>
          <NavButton as={Link} to="/profile">
            PROFILE
          </NavButton>
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

  margin: 90px 20px;
`;

const Name = styled(Link)`
  font-size: 33px;
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

const HomeIcon = styled(FaHome)`
  color: #a72b0c;
  margin-right: 10px;
  font-size: 40px;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
`;
const MidSection = styled.div`
  color: #333;
  font-size: 27px;
`;

const Highlight = styled.span`
  font-weight: bold;
  font-size: 33px;
  color: #a72b0c;
  margin-right: 20px;
`;

const RightSection = styled.div`
  display: flex;
  gap: 15px;
`;

const Bottom = styled.div`
  border-top: 5px solid #333;
  border-bottom: 5px solid #333;
  padding: 10px 40px;
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
  font-size: 23px;

  &:hover {
    color: #333;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  }
`;

export default Navbar;
