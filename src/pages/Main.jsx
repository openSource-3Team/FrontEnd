import React from 'react';
import styled from 'styled-components';
import mainImage from '../images/main_img03.jpg'; // 이미지 파일 import
import {
  FaProjectDiagram,
  FaRegListAlt,
  FaBullseye,
  FaTools,
  FaUsers,
} from 'react-icons/fa';
function Main() {
  return (
    <MainContainer>
      <Header>
        <HeaderImage src={mainImage} alt="배경 이미지" />
      </Header>
      <ContentContainer>
        {/* Section 1: 프로젝트 이름 소개 섹션 */}
        <Section align="left" odd>
          <SectionContent>
            <h2>
              <FaProjectDiagram
                style={{ color: '#a72b0c', marginRight: '10px' }}
              />
              KW-MatchRommie
            </h2>

            <p>
              "KW-MatchRommie"는 대학 기숙사생을 위한 **룸메이트 매칭
              플랫폼**입니다. 친근하면서도 기능적 이름을 통해 사용자가 쉽게
              기억하고 활용할 수 있도록 설계되었습니다.
            </p>
          </SectionContent>
        </Section>

        {/* Section 2: 프로젝트 요약(Abstract) */}
        <Section align="right" even>
          <SectionContent>
            <h2>
              <FaRegListAlt style={{ color: '#a72b0c', marginRight: '10px' }} />
              나에게 꼭 맞는 룸메이트 매칭 플랫폼
            </h2>
            <p>
              성향 기반 AI 시스템을 활용해 사용자가 가장 잘 맞는 룸메이트를
              신뢰성 있게 매칭합니다. 기숙사 생활의 첫걸음을 더 편안하고
              특별하게 만들어줄 플랫폼입니다.
            </p>
          </SectionContent>
        </Section>

        {/* Section 3: 프로젝트 목표 */}
        <Section align="left" odd>
          <SectionContent>
            <h2>
              <FaBullseye style={{ color: '#a72b0c', marginRight: '10px' }} />
              룸메이트를 찾는 커뮤니티 공간
            </h2>
            <p>
              단순 매칭을 넘어 기숙사생 간 소통과 협력을 돕는 커뮤니티
              플랫폼입니다. 생활 팁, 공동 구매, 이벤트 주최 등 기숙사 문화를
              스마트하게 만들어갑니다.
            </p>
          </SectionContent>
        </Section>

        {/* Section 4: 프로젝트 기술 목록 */}
        <Section align="right" even>
          <SectionContent>
            <h2>
              <FaTools style={{ color: '#a72b0c', marginRight: '10px' }} />
              프로젝트 기술 목록
            </h2>
            <TechGrid>
              <TechCard>
                <h3>1. 프로그래밍 언어 및 프레임워크</h3>
                <ul>
                  <li>프론트엔드: React.js</li>
                  <li>백엔드: Node.js, MySQL</li>
                </ul>
              </TechCard>

              <TechCard>
                <h3>2. 개발 도구 및 협업 환경</h3>
                <ul>
                  <li>버전 관리: Git & GitHub</li>
                  <li>IDE: IntelliJ / VSCode</li>
                  <li>API 테스트: Swagger</li>
                </ul>
              </TechCard>

              <TechCard>
                <h3>3. 배포 및 운영</h3>
                <ul>
                  <li>
                    <strong>서버 배포</strong>: AWS EC2
                  </li>
                  <li>
                    <strong>데이터베이스</strong>: AWS RDS
                  </li>
                  <li>
                    <strong>프론트엔드 배포</strong>: Vercel
                  </li>
                  <li>
                    <strong>CI/CD 파이프라인</strong>: GitHub Actions & Docker
                  </li>
                </ul>
              </TechCard>
            </TechGrid>
          </SectionContent>
        </Section>
        {/* Section 5: 팀원 소개 */}
        <Section align="left" odd>
          <SectionContent>
            <h2>
              <FaUsers style={{ color: '#a72b0c', marginRight: '10px' }} />
              팀원 소개
            </h2>
            <p>
              KW-MatchRommie를 함께 만들어가는 열정적인 팀원들을 소개합니다.
            </p>
            <TechGrid>
              <TeamCard>
                <h3>황인규</h3>
                <p>백엔드 개발</p>
                <ul>
                  <li>API 설계 및 구현</li>
                  <li>데이터베이스 연동</li>
                </ul>
              </TeamCard>
              <TeamCard>
                <h3>최현서</h3>
                <p>프론트 개발 & 디자인</p>
                <ul>
                  <li>UI/UX 설계</li>
                  <li>프론트엔드 연동</li>
                </ul>
              </TeamCard>
              <TeamCard>
                <h3>정주연</h3>
                <p>프론트엔드 개발</p>
                <ul>
                  <li>UI 구현</li>
                  <li>리액트 컴포넌트 개발</li>
                </ul>
              </TeamCard>
              <TeamCard>
                <h3>김소정</h3>
                <p>프론트엔드 개발</p>
                <ul>
                  <li>기능 개발 및 테스트</li>
                  <li>디자인 반영</li>
                </ul>
              </TeamCard>
            </TechGrid>
          </SectionContent>
        </Section>
      </ContentContainer>
    </MainContainer>
  );
}

export default Main;

// 스타일 정의
const MainContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  padding-top: 600px; /* 헤더 높이만큼 상단 여백 추가 */
`;

const Section = styled.div`
  display: flex;
  justify-content: ${({ odd }) => (odd ? 'flex-end' : 'flex-start')};
  padding: 50px 0;
  width: 99%;

  &:nth-child(even) {
    background-color: #fef6f4; /* 메인 색상과 어울리는 연한 배경색 */
  }

  &:nth-child(odd) {
    background-color: #ffffff;
  }
`;

const SectionContent = styled.div`
  width: 45%;
  padding: 30px;
  background-color: #ffffff;
  border: 2px solid #a72b0c; /* 메인 색상 테두리 */
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  }

  h2 {
    font-size: 1.5rem;
    margin-bottom: 20px;
    color: #a72b0c; /* 메인 색상 */
    font-weight: bold;
  }

  h3 {
    font-size: 1.3rem;
    margin-top: 15px;
    color: #444;
  }

  p {
    font-size: 1rem;
    line-height: 1.8;
    color: #555;
    margin-bottom: 15px;
  }

  ul {
    list-style: none;
    padding: 0;

    li {
      font-size: 1rem;
      margin-bottom: 10px;
      color: #333;
      position: relative;
      padding-left: 20px;

      &::before {
        content: '•';
        position: absolute;
        left: 0;
        color: #a72b0c; /* 포인트 색상 */
        font-size: 1.3rem;
      }
    }
  }
`;
const TechGrid = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-top: 20px;
`;

const TechCard = styled.div`
  flex: 1;
  background-color: #fff;
  border: 2px solid #a72b0c;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  h3 {
    color: #a72b0c; /* 메인 색상 */
    font-size: 1.4rem;
    margin-bottom: 15px;
  }

  ul {
    list-style: none;
    padding: 0;

    li {
      font-size: 1rem;
      margin-bottom: 10px;
      color: #555;
      position: relative;

      &::before {
        content: '•';
        position: absolute;
        left: -10px;
        color: #a72b0c;
        font-size: 1.2rem;
      }
    }
  }
`;
const TeamCard = styled.div`
  flex: 1;
  background-color: #fff;
  border: 2px solid #a72b0c;
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  h3 {
    color: #a72b0c;
    font-size: 1.5rem;
    margin-bottom: 10px;
    font-weight: bold;
  }

  p {
    font-size: 1.2rem;
    color: #555;
    margin-bottom: 15px;
    font-weight: 500;
  }

  ul {
    list-style: none;
    padding: 0;

    li {
      font-size: 1rem;
      color: #333;
      margin-bottom: 8px;
      position: relative;

      &::before {
        content: '✔';
        color: #a72b0c;
        font-size: 1rem;
        margin-right: 8px;
      }
    }
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
  padding: 0px;
  margin: 0px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;
