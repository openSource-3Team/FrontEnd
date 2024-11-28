// Match.jsx
import React, { useState } from 'react';
import styled from 'styled-components';

function Match() {
  const [Click, setClick] = useState([]);

  const wantOption = (value) => {
    if (Click.includes(value)) {
      setClick(Click.filter((filter) => filter !== value));
    }
    else {
      setClick([...Click, value]);
    }
  };

  return (
    <Container>
      <Title>매칭</Title>
      <Filter>
        <FilterGroup>
          <FilterLabel>기숙사</FilterLabel>
          <FilterValues>
            <FilterValue
              onClick={() => wantOption('4개월')}
              selected={Click.includes('4개월')}
            >
              4개월
            </FilterValue>
            <FilterValue>6개월</FilterValue>
            <FilterValue>12개월</FilterValue>
          </FilterValues>
        </FilterGroup>
        <FilterGroup>
          <FilterLabel>학과</FilterLabel>
          <FilterValues>
            <FilterValue>컴퓨터정보공학부</FilterValue>
            <FilterValue>소프트웨어학부</FilterValue>
            <FilterValue>정보융합학부</FilterValue>
          </FilterValues>
        </FilterGroup>
        <FilterGroup>
          <FilterLabel>학번</FilterLabel>
          <FilterValues>
            <FilterValue>16학번</FilterValue>
            <FilterValue>17학번</FilterValue>
            <FilterValue>18학번</FilterValue>
            <FilterValue>19학번</FilterValue>
            <FilterValue>20학번</FilterValue>
            <FilterValue>21학번</FilterValue>
            <FilterValue>22학번</FilterValue>
            <FilterValue>23학번</FilterValue>
            <FilterValue>24학번</FilterValue>
          </FilterValues>
        </FilterGroup>
        <FilterGroup>
          <FilterLabel>루미의 기상시간이 언제였으면 좋겠나요?</FilterLabel>
          <FilterValues>
            <FilterValue>07:00</FilterValue>
            <FilterValue>08:00</FilterValue>
            <FilterValue>09:00</FilterValue>
            <FilterValue>10:00</FilterValue>
          </FilterValues>
        </FilterGroup>
        <FilterGroup>
          <FilterLabel>취침시간</FilterLabel>
          <FilterValues>
            <FilterValue
              onClick={() => wantOption('22:00')}
              selected={Click.includes('22:00')}
            >
              22:00
            </FilterValue>
            <FilterValue
              onClick={() => wantOption('23:00')}
              selected={Click.includes('23:00')}
            >
              23:00
            </FilterValue>
            <FilterValue
              onClick={() => wantOption('24:00')}
              selected={Click.includes('24:00')}
            >
              24:00
            </FilterValue>
            <FilterValue
              onClick={() => wantOption('새벽')}
              selected={Click.includes('새벽')}
            >
              새벽
            </FilterValue>
          </FilterValues>
        </FilterGroup>
        <FilterGroup>
          <FilterLabel>소등시간</FilterLabel>
          <FilterValues>
            <FilterValue>21:00</FilterValue>
            <FilterValue>22:00</FilterValue>
            <FilterValue>23:00</FilterValue>
            <FilterValue>24:00</FilterValue>
          </FilterValues>
        </FilterGroup>
        <FilterGroup>
          <FilterLabel>샤워시간</FilterLabel>
          <FilterValues>
            <FilterValue>외출 전</FilterValue>
            <FilterValue>귀가 후</FilterValue>
            <FilterValue>둘 다</FilterValue>
          </FilterValues>
        </FilterGroup>
        <FilterGroup>
          <FilterLabel>흡연여부 (필수 택1)</FilterLabel>
          <FilterValues>
            <FilterValue>흡연자</FilterValue>
            <FilterValue>비흡연자</FilterValue>
          </FilterValues>
        </FilterGroup>
        <FilterGroup>
          <FilterLabel>이해할 수 있는 잠버릇을 선택해주세요.</FilterLabel>
          <FilterValues>
            <FilterValue>코골이</FilterValue>
            <FilterValue>이갈이</FilterValue>
            <FilterValue>몽유벙</FilterValue>
            <FilterValue>잠꼬대</FilterValue>
          </FilterValues>
        </FilterGroup>
        <FilterGroup>
          <FilterLabel>생활패턴</FilterLabel>
          <FilterValues>
            <FilterValue>아침형</FilterValue>
            <FilterValue>저녁형</FilterValue>
            <FilterValue>새벽형</FilterValue>
          </FilterValues>
        </FilterGroup>
        <FilterGroup>
          <FilterLabel>알람소리</FilterLabel>
          <FilterValues>
            <FilterValue>민감</FilterValue>
            <FilterValue>둔감</FilterValue>
          </FilterValues>
        </FilterGroup>
        <FilterGroup>
          <FilterLabel>물건 공유 여부</FilterLabel>
          <FilterValues>
            <FilterValue>공유해요</FilterValue>
            <FilterValue>공유하기 싫어요</FilterValue>
            <FilterValue>상관없어요(맞춰줄 수 있어요)</FilterValue>
          </FilterValues>
        </FilterGroup>
        <FilterGroup>
          <FilterLabel>방에서 게임 가능?</FilterLabel>
          <FilterValues>
            <FilterValue>PC 게임 가능해요</FilterValue>
            <FilterValue>모바일 게임만 가능해요</FilterValue>
            <FilterValue>가끔 이해할 수 있어요</FilterValue>
            <FilterValue>아예 안돼요</FilterValue>
          </FilterValues>
        </FilterGroup>
        <FilterGroup>
          <FilterLabel>루미가 방 안에서 공부해도 되나요</FilterLabel>
          <FilterValues>
            <FilterValue>아예 안돼요</FilterValue>
            <FilterValue>스탠드 켜고 하면 가능해요</FilterValue>
            <FilterValue>불 켜고 해도 돼요</FilterValue>
          </FilterValues>
        </FilterGroup>
        <FilterGroup>
          <FilterLabel>방 안 섭취</FilterLabel>
          <FilterValues>
            <FilterValue>아예 안돼요</FilterValue>
            <FilterValue>간단한 간식 가능</FilterValue>
            <FilterValue>식사 가능</FilterValue>
            <FilterValue>음료 가능</FilterValue>
            <FilterValue>배달음식 가능</FilterValue>
          </FilterValues>
        </FilterGroup>
        <FilterGroup>
          <FilterLabel>청소를 어느정도 하길 바라는지</FilterLabel>
          <FilterValues>
            <FilterValue>매일 항상 깨끗이</FilterValue>
            <FilterValue>2~3일에 한 번씩</FilterValue>
            <FilterValue>일주일에 한 번</FilterValue>
            <FilterValue>한 달에 한 번</FilterValue>
            <FilterValue>아예 안해요</FilterValue>
          </FilterValues>
        </FilterGroup>
        <FilterGroup>
          <FilterLabel>MBTI</FilterLabel>
          <FilterValues>
            <FilterValue>ESTJ</FilterValue>
            <FilterValue>ESTP</FilterValue>
            <FilterValue>ESFJ</FilterValue>
            <FilterValue>ESFP</FilterValue>
            <FilterValue>ENTJ</FilterValue>
            <FilterValue>ENTP</FilterValue>
            <FilterValue>ENFJ</FilterValue>
            <FilterValue>ENFP</FilterValue>
            <FilterValue>ISTJ</FilterValue>
            <FilterValue>ISTP</FilterValue>
            <FilterValue>ISFJ</FilterValue>
            <FilterValue>ISFP</FilterValue>
            <FilterValue>INTJ</FilterValue>
            <FilterValue>INTP</FilterValue>
            <FilterValue>INFJ</FilterValue>
            <FilterValue>INFP</FilterValue>
          </FilterValues>
        </FilterGroup>
      </Filter>

      <HorizonLine text="Roomie" />
      <ProfileContainer>
        <Profile>
          <RommieImage />
          <Roomie1>
            <Roomie>김소정</Roomie>
            <Roomie>21학번</Roomie>
            <Roomie>컴퓨터정보공학부</Roomie>
          </Roomie1>
        </Profile>
        <Profile>
          <RommieImage />
          <Roomie1>
            <Roomie>김소정</Roomie>
            <Roomie>21학번</Roomie>
            <Roomie>컴퓨터정보공학부</Roomie>
          </Roomie1>
        </Profile>
      </ProfileContainer>
    </Container>
  )
}

export default Match;

// Styled-components
const Container = styled.div`
  width: 100vh;
  padding: 20px; /* 내부 여백 */
  margin-top:400px;
  `;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const Filter = styled.div`
justify-content: center;
align-items: flex-start;
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-left:20vh;
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const FilterLabel = styled.div`
  font-weight: bold;
  font-size: 16px;
`;

const FilterValues = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const FilterValuezz = styled.div`
  padding: 5px 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: #a72b0c;
    border: 1px solid #a72b0c;
    color: #FFFFFF;
  }
`;

const FilterValue = styled.div`
  padding: 5px 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
  font-size: 14px;
  cursor: pointer;
  background-color: ${({ selected }) => (selected ? '#a72b0c' : 'white')};
  border: 1px solid ${({ selected }) => (selected ? '#a72b0c' : '#ddd')};
  color: ${({ selected }) => (selected ? '#FFFFFF' : 'black')};

  &:hover {
    background-color: ${({ selected }) => (selected ? '#a72b0c' : '#f0f0f0')};
  }
`;

const ProfileContainer = styled.div`
  display:flex;
  flex-direction: row;
  gap : 50px
`;

const Profile = styled.div`
  display: flex;
  align-items: center; /* 가로 중앙 정렬 */
  margin-top: 30px;
  padding: 20px;
  border: 1px solid #a72b0c;
  border-radius: 10px;
  max-width: 600px;
  background-color: white;
`;

const Roomie1 = styled.div`
  display: flex;
  flex-direction: column; /* 세로 정렬 */
  gap: 10px; /* 각 항목 간의 간격 */
`;

const Roomie = styled.div`
  font-size: 16px;
  font-weight: 500;
`;

const HorizonLine = ({ text }) => {
  return (
    <div
      style={{
        width: "100%",
        textAlign: "center",
        borderBottom: "1px solid #aaa",
        lineHeight: "0.1em",
        margin: "50px 0 0px",
      }}
    >
      <span style={{ background: "#fff", padding: "0 10px" }}>{text}</span>
    </div>
  );
};

const RommieImage = () => {
  return (
    <ImageContainer>
      <img src="./images/ppotto.png" alt="루미 프로필 사진" />
    </ImageContainer>
  );
};

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
    align-items: center; /* 세로 중앙 정렬 */

  img {
    width: 120px; /* 사진 크기 */
    height: 120px;
    border-radius: 0%; /* 원형으로 표시 */
    border: 1px solid #a72b0c; /* 테두리 */
  }
`;