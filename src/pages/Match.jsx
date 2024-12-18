import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import { FaUserCircle } from 'react-icons/fa';

const GlobalStyle = createGlobalStyle`
  html, body, #root {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }
`;

function Match() {
  const [Click, setClick] = useState([]);
  const [roomies, setRoomies] = useState([]); // Roomie 상태
  const [username, setUsername] = useState('사용자'); // 사용자 이름 상태
  const [userGender, setUserGender] = useState(null); // 사용자 성별 상태 추가
  const navigate = useNavigate();

  // 필터 선택 함수
  const wantOption = (value) => {
    if (Click.includes(value)) {
      setClick(Click.filter((filter) => filter !== value));
    } else {
      setClick([...Click, value]);
    }
  };

  // 로그인된 사용자 정보 가져오는 함수 (임시 예시)
  const fetchUserInfo = async () => {
    try {
      const userid = localStorage.getItem('userid');
      if (!userid) {
        console.error('로그인 정보가 없습니다. userid가 존재하지 않습니다.');
        return; // userid가 없으면 함수 종료
      }

      // GET 요청으로 사용자 정보 가져오기
      const response = await fetch(`/api/users/${userid}`);

      if (!response.ok) {
        throw new Error(`사용자 정보 불러오기 실패: ${response.status}`);
      }

      const data = await response.json();
      console.log('불러온 사용자 프로필 데이터:', data);

      setUsername(data.name); // 사용자 이름 저장
      setUserGender(data.gender); // 성별 상태 설정
    } catch (error) {
      console.error('사용자 정보 오류:', error);
    }
  };

  // 필터 조건에 따라 서버에서 사용자 프로필 데이터 가져오기
  const fetchRoomies = async () => {
    try {
      // 필터 조건을 요청 본문에 포함
      const requestBody = {
        dormitoryDuration: Click.filter((item) =>
          ['4개월', '6개월', '12개월'].includes(item)
        ),
        department: Click.filter((item) =>
          [
            '전자정보공과대학',
            '인공지능융합대학',
            '공과대학',
            '자연과학대학',
            '경영대학',
            '인문사회과학대학',
            '정책법학대학',
            '인제니움학부대학',
          ].includes(item)
        ),
        studentId: Click.filter((item) =>
          [
            '16학번',
            '17학번',
            '18학번',
            '19학번',
            '20학번',
            '21학번',
            '22학번',
            '23학번',
            '24학번',
          ].includes(item)
        ),
        wakeUpTime: Click.filter((item) =>
          ['07:00', '08:00', '09:00', '10:00'].includes(item)
        ),
        sleepingTime: Click.filter((item) =>
          ['21:00', '22:00', '23:00', '새벽'].includes(item)
        ),
        lightOutTime: Click.filter((item) =>
          ['21:00', '22:00', '23:00', '24:00'].includes(item)
        ),
        showerTime: Click.filter((item) =>
          ['외출 전', '귀가 후', '둘 다'].includes(item)
        ),
        isSmoking: Click.filter((item) =>
          ['흡연자', '비흡연자'].includes(item)
        ).map((val) => (val === '비흡연자' ? false : true)), // true/false 변환
        cleaningFrequency: Click.filter((item) =>
          [
            '매일 항상 깨끗이',
            '2~3일에 한 번씩',
            '일주일에 한 번',
            '한 달에 한 번',
            '아예 안해요',
          ].includes(item)
        ),
        itemSharingPreference: Click.filter((item) =>
          ['공유해요', '공유하기 싫어요'].includes(item)
        ),
        gamePreference: Click.filter((item) =>
          [
            'PC 게임',
            '모바일 게임',
            '가끔 이해할 수 있어요',
            '아예 안돼요',
          ].includes(item)
        ),
        studyPreference: Click.filter((item) =>
          [
            '스탠드 켜고 하면 가능해요',
            '불 켜고 해도 돼요',
            '공부 안돼요',
          ].includes(item)
        ),
        foodPreference: Click.filter((item) =>
          ['음료', '간단한 간식', '식사', '배달음식', '섭취 안돼요'].includes(
            item
          )
        ),
        lifestyle: Click.filter((item) =>
          ['아침형', '저녁형', '새벽형'].includes(item)
        ),
        sleepingHabits: Click.filter((item) =>
          ['코골이', '이갈이', '몽유병', '잠꼬대'].includes(item)
        ),
        acLevel: Click.filter((item) => ['민감', '둔감'].includes(item)),
        mbti: Click.filter((item) =>
          [
            'ESTJ',
            'ESTP',
            'ESFJ',
            'ESFP',
            'ENTJ',
            'ENTP',
            'ENFJ',
            'ENFP',
            'ISTJ',
            'ISTP',
            'ISFJ',
            'ISFP',
            'INTJ',
            'INTP',
            'INFJ',
            'INFP',
          ].includes(item)
        ),
        gender: userGender || undefined, // 사용자 성별 조건 추가
      };

      console.log('요청 본문:', requestBody); // 필터 요청 데이터 확인

      const response = await fetch('/api/users/filter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`서버 오류: ${response.status}`);
      }

      const data = await response.json();
      console.log('필터링된 사용자 리스트:', data);
      setRoomies(data); // 상태에 저장
    } catch (error) {
      console.error('필터링 오류:', error.message);
    }
  };

  useEffect(() => {
    fetchUserInfo(); // 사용자 정보 가져오기
  }, []);

  useEffect(() => {
    if (userGender) fetchRoomies(); // 필터링 조건에 사용자 성별이 포함될 때만 호출
  }, [Click, userGender]); // 필터링 조건이 변경될 때마다 호출

  return (
    <>
      <GlobalStyle />
      <Container>
        <Explain>
          원하는 Roomie의 특징을 한 개 이상 선택해주세요! <br></br>
          그럼 저희가 딱 맞는 Roomie를 Matching해줄게요 <br></br>
          원하는 만큼 선택해도 좋아요.
        </Explain>
        <Filter>
          <FilterGroup>
            <FilterLabel>
              <br></br>기숙사 생활 기간
            </FilterLabel>
            <FilterValues>
              {['4개월', '6개월', '12개월'].map((value) => (
                <FilterValue
                  key={value}
                  onClick={() => wantOption(value)}
                  selected={Click.includes(value)}
                >
                  {value}
                </FilterValue>
              ))}
            </FilterValues>
          </FilterGroup>
          <FilterGroup>
            <FilterLabel>단과대</FilterLabel>
            <FilterValues>
              {[
                '전자정보공과대학',
                '인공지능융합대학',
                '공과대학',
                '자연과학대학',
                '경영대학',
                '인문사회과학대학',
                '정책법학대학',
                '인제니움학부대학',
              ].map((item) => (
                <FilterValue
                  key={item}
                  onClick={() => wantOption(item)}
                  selected={Click.includes(item)}
                >
                  {item}
                </FilterValue>
              ))}
            </FilterValues>
          </FilterGroup>
          <FilterGroup>
            <FilterLabel>학번</FilterLabel>
            <FilterValues>
              {[
                '16학번',
                '17학번',
                '18학번',
                '19학번',
                '20학번',
                '21학번',
                '22학번',
                '23학번',
                '24학번',
              ].map((item) => (
                <FilterValue
                  key={item}
                  onClick={() => wantOption(item)}
                  selected={Click.includes(item)}
                >
                  {item}
                </FilterValue>
              ))}
            </FilterValues>
          </FilterGroup>
          <FilterGroup>
            <FilterLabel>기상시간</FilterLabel>
            <FilterValues>
              {['07:00', '08:00', '09:00', '10:00'].map((item) => (
                <FilterValue
                  key={item}
                  onClick={() => wantOption(item)}
                  selected={Click.includes(item)}
                >
                  {item}
                </FilterValue>
              ))}
            </FilterValues>
          </FilterGroup>
          <FilterGroup>
            <FilterLabel>취침시간</FilterLabel>
            <FilterValues>
              <FilterValue
                onClick={() => wantOption('21:00')}
                selected={Click.includes('21:00')}
              >
                21:00
              </FilterValue>
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
              <FilterValue
                onClick={() => wantOption('21:00 ')}
                selected={Click.includes('21:00 ')}
              >
                21:00
              </FilterValue>
              <FilterValue
                onClick={() => wantOption('22:00 ')}
                selected={Click.includes('22:00 ')}
              >
                22:00
              </FilterValue>
              <FilterValue
                onClick={() => wantOption('23:00 ')}
                selected={Click.includes('23:00 ')}
              >
                23:00
              </FilterValue>
              <FilterValue
                onClick={() => wantOption('24:00 ')}
                selected={Click.includes('24:00 ')}
              >
                24:00
              </FilterValue>
            </FilterValues>
          </FilterGroup>
          <FilterGroup>
            <FilterLabel>샤워시간</FilterLabel>
            <FilterValues>
              {['외출 전', '귀가 후', '둘 다'].map((item) => (
                <FilterValue
                  key={item}
                  onClick={() => wantOption(item)}
                  selected={Click.includes(item)}
                >
                  {item}
                </FilterValue>
              ))}
            </FilterValues>
          </FilterGroup>
          <FilterGroup>
            <FilterLabel>흡연 여부</FilterLabel>
            <FilterValues>
              {['흡연자', '비흡연자'].map((item) => (
                <FilterValue
                  key={item}
                  onClick={() => wantOption(item)}
                  selected={Click.includes(item)}
                >
                  {item}
                </FilterValue>
              ))}
            </FilterValues>
          </FilterGroup>
          <FilterGroup>
            <FilterLabel>잠버릇</FilterLabel>
            <FilterValues>
              {['코골이', '이갈이', '몽유병', '잠꼬대'].map((item) => (
                <FilterValue
                  key={item}
                  onClick={() => wantOption(item)}
                  selected={Click.includes(item)}
                >
                  {item}
                </FilterValue>
              ))}
            </FilterValues>
          </FilterGroup>
          <FilterGroup>
            <FilterLabel>생활패턴</FilterLabel>
            <FilterValues>
              {['아침형', '저녁형', '새벽형'].map((item) => (
                <FilterValue
                  key={item}
                  onClick={() => wantOption(item)}
                  selected={Click.includes(item)}
                >
                  {item}
                </FilterValue>
              ))}
            </FilterValues>
          </FilterGroup>
          <FilterGroup>
            <FilterLabel>알람소리</FilterLabel>
            <FilterValues>
              {['민감', '둔감'].map((item) => (
                <FilterValue
                  key={item}
                  onClick={() => wantOption(item)}
                  selected={Click.includes(item)}
                >
                  {item}
                </FilterValue>
              ))}
            </FilterValues>
          </FilterGroup>
          <FilterGroup>
            <FilterLabel>물건 공유 여부</FilterLabel>
            <FilterValues>
              {['공유해요', '공유하기 싫어요'].map((item) => (
                <FilterValue
                  key={item}
                  onClick={() => wantOption(item)}
                  selected={Click.includes(item)}
                >
                  {item}
                </FilterValue>
              ))}
            </FilterValues>
          </FilterGroup>
          <FilterGroup>
            <FilterLabel>방에서 게임</FilterLabel>
            <FilterValues>
              {[
                'PC 게임',
                '모바일 게임',
                '가끔 이해할 수 있어요',
                '아예 안돼요',
              ].map((item) => (
                <FilterValue
                  key={item}
                  onClick={() => wantOption(item)}
                  selected={Click.includes(item)}
                >
                  {item}
                </FilterValue>
              ))}
            </FilterValues>
          </FilterGroup>
          <FilterGroup>
            <FilterLabel>방 안 공부</FilterLabel>
            <FilterValues>
              {[
                '스탠드 켜고 하면 가능해요',
                '불 켜고 해도 돼요',
                '공부 안돼요',
              ].map((item) => (
                <FilterValue
                  key={item}
                  onClick={() => wantOption(item)}
                  selected={Click.includes(item)}
                >
                  {item}
                </FilterValue>
              ))}
            </FilterValues>
          </FilterGroup>
          <FilterGroup>
            <FilterLabel>방 안 음식물 섭취</FilterLabel>
            <FilterValues>
              {['음료', '간단한 간식', '식사', '배달음식', '섭취 안돼요'].map(
                (item) => (
                  <FilterValue
                    key={item}
                    onClick={() => wantOption(item)}
                    selected={Click.includes(item)}
                  >
                    {item}
                  </FilterValue>
                )
              )}
            </FilterValues>
          </FilterGroup>
          <FilterGroup>
            <FilterLabel>청소 주기</FilterLabel>
            <FilterValues>
              {[
                '매일 항상 깨끗이',
                '2~3일에 한 번씩',
                '일주일에 한 번',
                '한 달에 한 번',
                '아예 안해요',
              ].map((item) => (
                <FilterValue
                  key={item}
                  onClick={() => wantOption(item)}
                  selected={Click.includes(item)}
                >
                  {item}
                </FilterValue>
              ))}
            </FilterValues>
          </FilterGroup>
          <FilterGroup>
            <FilterLabel>MBTI</FilterLabel>
            <FilterValues>
              {[
                'ESTJ',
                'ESTP',
                'ESFJ',
                'ESFP',
                'ENTJ',
                'ENTP',
                'ENFJ',
                'ENFP',
                'ISTJ',
                'ISTP',
                'ISFJ',
                'ISFP',
                'INTJ',
                'INTP',
                'INFJ',
                'INFP',
              ].map((value) => (
                <FilterValue
                  key={value}
                  onClick={() => wantOption(value)}
                  selected={Click.includes(value)}
                >
                  {value}
                </FilterValue>
              ))}
            </FilterValues>
          </FilterGroup>
        </Filter>

        <HorizonLine text="Roomie" />

        <Explain>
          {' '}
          아래는 {username}님과 딱 맞는 루미들이에요. <br></br>
          프로필을 눌러 세부사항도 확인해보세요.
        </Explain>

        <ProfileContainer>
          {roomies.length > 0 ? (
            roomies.map((roomie) => (
              <Profile
                key={roomie.id}
                onClick={() => navigate(`/roomie/${roomie.id}`)}
              >
                <ProfileIcon />
                <RoomieBox>
                  <Roomietext>{roomie.name}</Roomietext>
                  <Roomietext>{roomie.department}</Roomietext>
                </RoomieBox>
              </Profile>
            ))
          ) : (
            <div>매칭된 Roomie가 없습니다. 필터를 선택해 주세요.</div>
          )}
        </ProfileContainer>
      </Container>
    </>
  );
}

export default Match;

const Container = styled.div`
  width: 100%;
  padding: 20px; /* 내부 여백 */
  margin-top: 200px;
  display: flex;
  flex-direction: column;
  align-items: center; /* 모든 콘텐츠를 중앙 정렬 */
`;

const Explain = styled.div`
  text-align: center;
  padding: 10px;
  width: 60%; /* 부모 컨테이너의 전체 너비를 차지 */
  font-size: 20px;
`;

const Filter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 60%;
  align-items: flex-start; /* 내부 요소 왼쪽 정렬 */
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%; /* 그룹 전체 너비 */
`;

const FilterLabel = styled.div`
  font-weight: bold;
  font-size: 18px;
`;

const FilterValues = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  justify-content: flex-start; /* 선택 옵션 왼쪽 정렬 */
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

const HorizonLineContainer = styled.div`
  width: 60%;
  text-align: center;
  border-bottom: 1px solid #aaa;
  line-height: 0.1em;
  margin-top: 40px;
  margin-bottom: 10px;
`;

const HorizonLineText = styled.span`
  background: #fff;
  padding: 0 10px;
`;

const HorizonLine = ({ text }) => (
  <HorizonLineContainer>
    <HorizonLineText>{text}</HorizonLineText>
  </HorizonLineContainer>
);

const ProfileContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 한 줄에 3개씩 배치 */
  justify-items: center; /* 각 아이템을 중앙에 정렬 */
  width: 60%;
  padding: 10px;
`;

const Profile = styled.div`
  display: flex;
  align-items: center; /* 가로 중앙 정렬 */
  padding: 20px;
  border: 1px solid #a72b0c;
  border-radius: 10px;
  background-color: white;
  gap: 10px;
  width: 300px; /* 각 프로필의 고정된 너비 설정 */
  margin: 15px 0 15px;

  &:hover {
    background-color: #f08a77;
  }
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

const ProfileIcon = styled(FaUserCircle)`
  color: #a72b0c;
  font-size: 100px;
  margin-right: 5px;
`;
