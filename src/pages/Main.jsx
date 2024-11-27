import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import mainImage from '../images/main_img03.jpg'; // 이미지 파일 import

function Main() {
  return (
    <MainContainer>
      <Header>
        <HeaderImage src={mainImage} alt="배경 이미지" />
      </Header>
      <ContentContainer>
        <Content>
          <h1>홈 페이지</h1>
          <p>이 사이트는 사용자들에게 편리한 서비스를 제공하는 플랫폼입니다.</p>
          <p>여기서 매칭, 커뮤니티 활동, 프로필 관리 등을 할 수 있습니다.</p>
        </Content>
        <Content>
          <h1>홈 페이지</h1>
          <p>이 사이트는 사용자들에게 편리한 서비스를 제공하는 플랫폼입니다.</p>
          <p>여기서 매칭, 커뮤니티 활동, 프로필 관리 등을 할 수 있습니다.</p>
        </Content>
        <Content>
          <h1>홈 페이지</h1>
          <p>이 사이트는 사용자들에게 편리한 서비스를 제공하는 플랫폼입니다.</p>
          <p>여기서 매칭, 커뮤니티 활동, 프로필 관리 등을 할 수 있습니다.</p>
        </Content>
      </ContentContainer>
    </MainContainer>
  );
}

export default Main;

// 스타일 정의
const MainContainer = styled.div`
  width: 100vh; /* 부모 컨테이너 너비 100% */
  margin: 0 auto;
  padding-top: 600px; /* 헤더 높이만큼 상단 여백 추가 */
`;

const Header = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 600px;
  overflow: hidden;
  z-index: -1;
`;

const HeaderImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  background-color: #000;
  transition: opacity 0.2s ease-out, transform 0.2s ease-out;
`;

const ContentContainer = styled.div`
  width: 100vw; /* ContentContainer가 MainContainer의 너비 100%를 차지 */
  padding: 20px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const Content = styled.div`
  width: 100%;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 20px;
  }

  p {
    font-size: 1.2rem;
    line-height: 1.6;
    margin-bottom: 10px;
  }
`;
