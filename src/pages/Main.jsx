import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import mainImage from '../images/main_img03.jpg'; // 이미지 파일 import

function Main() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <MainContainer>
      <Header>
        <HeaderBackground scrollY={scrollY}>
          <HeaderImage src={mainImage} alt="배경 이미지" />
        </HeaderBackground>
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
  width: 100%;
  margin: 0 auto;
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

const HeaderBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: -1;
  background-color: #000;
  opacity: ${({ scrollY }) => Math.max(1 - scrollY / 300, 0)};
  transform: translateY(${({ scrollY }) => scrollY / 2}px);
  transition: opacity 0.2s ease-out, transform 0.2s ease-out;
`;

const HeaderImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ContentContainer = styled.div`
  padding: 20px;
  width: 100%;
  margin-top: 600px; /* 헤더 높이만큼 여백 추가 */
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const Content = styled.div`
  width: 100%;
  max-width: 800px;
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
