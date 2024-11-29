// Match.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import tempImage from "../images/ppotto.png";

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
            >4개월
            </FilterValue>
            <FilterValue
              onClick={() => wantOption('6개월')}
              selected={Click.includes('6개월')}
            >6개월
            </FilterValue>
            <FilterValue
              onClick={() => wantOption('12개월')}
              selected={Click.includes('12개월')}
            >12개월
            </FilterValue>
          </FilterValues>
        </FilterGroup>
        <FilterGroup>
          <FilterLabel>학과</FilterLabel>
          <FilterValues>
            <FilterValue
              onClick={() => wantOption('컴퓨터정보공학부')}
              selected={Click.includes('컴퓨터정보공학부')}
            >컴퓨터정보공학부</FilterValue>
            <FilterValue
              onClick={() => wantOption('소프트웨어학부')}
              selected={Click.includes('소프트웨어학부')}
            >소프트웨어학부</FilterValue>
            <FilterValue
              onClick={() => wantOption('정보융합학부')}
              selected={Click.includes('정보융합학부')}
            >정보융합학부</FilterValue>
          </FilterValues>
        </FilterGroup>
        <FilterGroup>
          <FilterLabel>학번</FilterLabel>
          <FilterValues>
            {['16학번', '17학번', '18학번', '19학번', '20학번', '21학번', '22학번', '23학번', '24학번'].map(item => (
              <FilterValue
                key={item}
                onClick={() => wantOption(item)}
                selected={Click.includes(item)}
              >{item}</FilterValue>
            ))}
          </FilterValues>
        </FilterGroup>
        <FilterGroup>
          <FilterLabel>원하는 루미의 기상시간을 선택해주세요.</FilterLabel>
          <FilterValues>
            {['07:00', '08:00', '09:00', '10:00'].map(item => (
              <FilterValue
                key={item}
                onClick={() => wantOption(item)}
                selected={Click.includes(item)}
              >{item}</FilterValue>
            ))}
          </FilterValues>
        </FilterGroup>
        <FilterGroup>
          <FilterLabel>원하는 루미의 취침시간을 선택해주세요.</FilterLabel>
          <FilterValues>
            {['22:00', '23:00', '24:00', '새벽'].map(item => (
              <FilterValue
                key={item}
                onClick={() => wantOption(item)}
                selected={Click.includes(item)}
              >{item}</FilterValue>
            ))}
          </FilterValues>
        </FilterGroup>
        <FilterGroup>
          <FilterLabel>원하는 루미의 소등시간 선택해주세요.</FilterLabel>
          <FilterValues>
            {['21:00', '22:00', '23:00', '24:00'].map(item => (
              <FilterValue
                key={item}
                onClick={() => wantOption(item)}
                selected={Click.includes(item)}
              >{item}</FilterValue>
            ))}
          </FilterValues>
        </FilterGroup>
        <FilterGroup>
          <FilterLabel>샤워시간</FilterLabel>
          <FilterValues>
            {['외출 전', '귀가 후', '둘 다'].map(item => (
              <FilterValue
                key={item}
                onClick={() => wantOption(item)}
                selected={Click.includes(item)}
              >{item}</FilterValue>
            ))}
          </FilterValues>
        </FilterGroup>
        <FilterGroup>
          <FilterLabel>흡연여부 (필수 택1)</FilterLabel>
          <FilterValues>
            {['흡연자', '비흡연자'].map(item => (
              <FilterValue
                key={item}
                onClick={() => wantOption(item)}
                selected={Click.includes(item)}
              >{item}</FilterValue>
            ))}
          </FilterValues>
        </FilterGroup>
        <FilterGroup>
          <FilterLabel>이해할 수 있는 잠버릇을 선택해주세요.</FilterLabel>
          <FilterValues>
            {['코골이', '이갈이', '몽유병', '잠꼬대'].map(item => (
              <FilterValue
                key={item}
                onClick={() => wantOption(item)}
                selected={Click.includes(item)}
              >{item}</FilterValue>
            ))}
          </FilterValues>
        </FilterGroup>
        <FilterGroup>
          <FilterLabel>생활패턴</FilterLabel>
          <FilterValues>
            {['아침형', '저녁형', '새벽형'].map(item => (
              <FilterValue
                key={item}
                onClick={() => wantOption(item)}
                selected={Click.includes(item)}
              >{item}</FilterValue>
            ))}
          </FilterValues>
        </FilterGroup>
        <FilterGroup>
          <FilterLabel>알람소리</FilterLabel>
          <FilterValues>
            {['민감', '둔감'].map(item => (
              <FilterValue
                key={item}
                onClick={() => wantOption(item)}
                selected={Click.includes(item)}
              >{item}</FilterValue>
            ))}
          </FilterValues>
        </FilterGroup>
        <FilterGroup>
          <FilterLabel>물건 공유 여부</FilterLabel>
          <FilterValues>
            {['공유해요', '공유하기 싫어요', '상관없어요(맞춰줄 수 있어요)'].map(item => (
              <FilterValue
                key={item}
                onClick={() => wantOption(item)}
                selected={Click.includes(item)}
              >{item}</FilterValue>
            ))}
          </FilterValues>
        </FilterGroup>
        <FilterGroup>
          <FilterLabel>방에서 게임 가능?</FilterLabel>
          <FilterValues>
            {['PC 게임 가능해요', '모바일 게임만 가능해요', '가끔 이해할 수 있어요', '아예 안돼요'].map(item => (
              <FilterValue
                key={item}
                onClick={() => wantOption(item)}
                selected={Click.includes(item)}
              >{item}</FilterValue>
            ))}
          </FilterValues>
        </FilterGroup>
        <FilterGroup>
          <FilterLabel>루미가 방 안에서 공부해도 되나요</FilterLabel>
          <FilterValues>
            {['아예 안돼요', '스탠드 켜고 하면 가능해요', '불 켜고 해도 돼요'].map(item => (
              <FilterValue
                key={item}
                onClick={() => wantOption(item)}
                selected={Click.includes(item)}
              >{item}</FilterValue>
            ))}
          </FilterValues>
        </FilterGroup>
        <FilterGroup>
          <FilterLabel>방 안 섭취</FilterLabel>
          <FilterValues>
            {['아예 안돼요', '간단한 간식 가능', '식사 가능', '음료 가능', '배달음식 가능'].map(item => (
              <FilterValue
                key={item}
                onClick={() => wantOption(item)}
                selected={Click.includes(item)}
              >{item}</FilterValue>
            ))}
          </FilterValues>
        </FilterGroup>
        <FilterGroup>
          <FilterLabel>청소를 어느정도 하길 바라는지</FilterLabel>
          <FilterValues>
            {['매일 항상 깨끗이', '2~3일에 한 번씩', '일주일에 한 번', '한 달에 한 번', '아예 안해요'].map(item => (
              <FilterValue
                key={item}
                onClick={() => wantOption(item)}
                selected={Click.includes(item)}
              >{item}</FilterValue>
            ))}
          </FilterValues>
        </FilterGroup>
        <FilterGroup>
          <FilterLabel>MBTI</FilterLabel>
          <FilterValues>
            {['ESTJ', 'ESTP', 'ESFJ', 'ESFP', 'ENTJ', 'ENTP', 'ENFJ', 'ENFP', 'ISTJ', 'ISTP', 'ISFJ', 'ISFP', 'INTJ', 'INTP', 'INFJ', 'INFP'].map((value) => (
              <FilterValue key={value} onClick={() => wantOption(value)} selected={Click.includes(value)}>
                {value}
              </FilterValue>
            ))}
          </FilterValues>
        </FilterGroup>
      </Filter>

      <HorizonLine text="Roomie" />

      <ProfileContainer>
        <Profile>
          <ProfileImage src={tempImage} alt="Roommate Profile" />
          <RoomieBox>
            <Roomietext>김소정</Roomietext>
            <Roomietext>21학번</Roomietext>
            <Roomietext>컴퓨터정보공학부</Roomietext>
          </RoomieBox>
        </Profile>
        <Profile>
          <ProfileImage src={tempImage} alt="Roommate Profile" />
          <RoomieBox>
            <Roomietext>정주연</Roomietext>
            <Roomietext>22학번</Roomietext>
            <Roomietext>컴퓨터정보공학부</Roomietext>
          </RoomieBox>
        </Profile>
        <Profile>
          <ProfileImage src={tempImage} alt="Roommate Profile" />
          <RoomieBox>
            <Roomietext>최현서</Roomietext>
            <Roomietext>20학번</Roomietext>
            <Roomietext>컴퓨터정보공학부</Roomietext>
          </RoomieBox>
        </Profile>
        <Profile>
          <ProfileImage src={tempImage} alt="Roommate Profile" />
          <RoomieBox>
            <Roomietext>황인규</Roomietext>
            <Roomietext>21학번</Roomietext>
            <Roomietext>컴퓨터정보공학부</Roomietext>
          </RoomieBox>
        </Profile>
        <Profile>
          <ProfileImage src={tempImage} alt="Roommate Profile" />
          <RoomieBox>
            <Roomietext>황인규</Roomietext>
            <Roomietext>21학번</Roomietext>
            <Roomietext>컴퓨터정보공학부</Roomietext>
          </RoomieBox>
        </Profile>
        <Profile>
          <ProfileImage src={tempImage} alt="Roommate Profile" />
          <RoomieBox>
            <Roomietext>황인규</Roomietext>
            <Roomietext>21학번</Roomietext>
            <Roomietext>컴퓨터정보공학부</Roomietext>
          </RoomieBox>
        </Profile>
        <Profile>
          <ProfileImage src={tempImage} alt="Roommate Profile" />
          <RoomieBox>
            <Roomietext>황인규</Roomietext>
            <Roomietext>21학번</Roomietext>
            <Roomietext>컴퓨터정보공학부</Roomietext>
          </RoomieBox>
        </Profile>
      </ProfileContainer>
    </Container>
  )
}

export default Match;

// Styled-components
const Container = styled.div`
  width: 80%;
  padding: 20px; /* 내부 여백 */
  margin-top:200px;
  `;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const Filter = styled.div`
justify-content: center;
display: flex;
flex-direction: column;
gap: 15px;
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

const ProfileContainer = styled.div`
  display:flex;
  flex-wrap: wrap; /* 줄 바꿈 허용 */
  flex-direction: row;
  width:100%;
  padding:10px
  gap:10px
  
`;

const Profile = styled.div`
  display: flex;
  align-items: center; /* 가로 중앙 정렬 */
  margin-top: 30px;
  padding: 20px;
  border: 1px solid #a72b0c;
  border-radius: 10px;
  width:350px;
  background-color: white;
  gap : 10px;
  margin-right:10px;
`;

const RoomieBox = styled.div`
  display: flex;
  flex-direction: column; /* 세로 정렬 */
  gap: 10px; /* 각 항목 간의 간격 */
  width: 140px;
`;

const Roomietext = styled.div`
  font-size: 16px;
  font-weight: 500;
`;

const ProfileImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%; /* 원형 이미지 */
  object-fit: cover; /* 이미지 비율 유지 */
`;