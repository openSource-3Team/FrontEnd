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
      {/* Section 1: 프로젝트 이름 소개 섹션 */}
      <Section align="left">
        <h2>프로젝트 이름</h2>
        <p>KW-MatchRommie</p>
        {/* 추가 설명: 프로젝트 이름에 대한 의미나 의도 */}
        <p>
          "KW-MatchRommie"는 대학 기숙사생들을 위한 룸메이트 매칭 플랫폼으로, 이름에서 알 
          수 있듯 광운대학교 기숙사생을 대상으로 한다는 
          가상의 시나리오를 포함하거나, 단순히 "KW"가 특정 대학을 상징한다고 설정할 수도 있습니다.  
          "Rommie"는 Roommate를 변형한 단어로, 친근하고 캐주얼한 느낌을 주어 사용자가 
          쉽게 기억할 수 있도록 하였습니다.
        </p>
      </Section>

      {/* Section 2: 프로젝트 요약(Abstract) */}
      <Section align="left">
        <h2>프로젝트 요약 (Abstract)</h2>
        <p>룸메이트 매칭 플랫폼</p>
        {/* 추가 설명: 플랫폼의 핵심 기능과 가치를 좀 더 구체적으로 언급 */}
        <p>
          이 프로젝트는 새로운 생활 환경에서 '나와 잘 맞는 룸메이트'를 찾기 어려운 문제를 
          해결하기 위한 매칭 서비스입니다. 사용자의 프로필 정보를 바탕으로 성향, 생활 패턴, 
          관심사 등을 고려하여 가장 적합한 룸메이트 후보를 추천합니다.
        </p>
      </Section>

      {/* Section 3: 추가 목적 및 커뮤니티 기능 강조 */}
      <Section align="left">
        <h2>프로젝트 목표</h2>
        <p>나에게 맞는 룸메이트를 찾는 공간</p>
        <p>기숙사생을 위한 커뮤니티 사이트</p>
        {/* 추가 설명: 커뮤니티 기능 및 기대되는 효과 */}
        <p>
          이 플랫폼은 단순히 룸메이트를 매칭하는 것에 그치지 않고, 기숙사 생활을 하는 
          학생들이 서로 정보를 공유하고, 이벤트를 주최하며, 소통할 수 있는 커뮤니티 역할을 
          수행합니다. 기숙사 생활 팁, 식사 시간 조율, 생활용품 공동 구매 등을 통해 사용자는 
          새로운 공동체 문화 속에서 편안하고 알찬 기숙사 경험을 누릴 수 있습니다.
        </p>
      </Section>
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

const Section = styled.div`
  width: 80%;
  margin: 50px auto;
  text-align: ${props => props.align === 'left' ? 'left' : 'center'};
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 10px;

  h2 {
    font-size: 2rem;
    margin-bottom: 20px;
  }

  p {
    font-size: 1.2rem;
    line-height: 1.6;
    margin-bottom: 15px;
  }
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

