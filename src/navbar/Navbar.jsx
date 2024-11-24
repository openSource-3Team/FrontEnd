import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <NavbarContainer>
      <Name as={Link} to="/main">
        MATCHROOMIE
      </Name>
      <PageLinks>
        <NavButton as={Link} to="/match">
          프로필 목록
        </NavButton>
        <NavButton as={Link} to="/profile">
          프로필 세팅
        </NavButton>
        <NavButton as={Link} to="/community">
          커뮤니티 게시글 목록
        </NavButton>
        <NavButton as={Link} to="/write">
          커뮤니티 게시글 작성
        </NavButton>
        <NavButton as={Link} to="/login">
          로그인
        </NavButton>
        <NavButton as={Link} to="/signup">
          회원가입
        </NavButton>
        <NavButton as={Link} to="/forgotpw">
          비밀번호 찾기
        </NavButton>
      </PageLinks>
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
  padding: 20px 0;
  border-bottom: 3px solid #333;
`;

const NavButton = styled.div`
  background: none;
  color: #333;
  border: none;
  padding: 8px 15px;
  margin: 0 10px;
  cursor: pointer;
  font-size: 23px;

  &:hover {
    color: #333;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  }
`;

const Name = styled(Link)`
  font-size: 43px;
  color: #333;
  text-decoration: none;
  font-weight: 600;
  margin-left: 130px;

  &:hover {
    color: #333;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  }
`;

const PageLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 20px;
  flex-wrap: wrap;
`;

export default Navbar;
