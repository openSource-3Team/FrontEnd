//Roomie.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import tempImage from '../images/ppotto.png';

// 글로벌 스타일 설정
const GlobalStyle = createGlobalStyle`
  html, body, #root {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Arial, sans-serif;
  }
`;

function Roomie() {
  const { id } = useParams(); // URL 파라미터에서 ID 가져오기
  const navigate = useNavigate();
  const [roomieData, setRoomieData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(''); // 쪽지 내용 상태
  const userId = localStorage.getItem('userid'); // 현재 로그인한 사용자 ID

  // 사용자 데이터 가져오기
  useEffect(() => {
    const fetchRoomieData = async () => {
      try {
        console.log('보고있는 유저의 id:', id);
        console.log('현재 로그인한 유저의 userid:', userId);
        const response = await fetch(`http://15.165.223.198:3000/users/${id}`);
        console.log('API 호출 URL:', `http://15.165.223.198:3000/users/${id}`);
        if (!response.ok) {
          throw new Error(
            `사용자 정보를 불러오지 못했습니다. 상태 코드: ${response.status}`
          );
        }
        const data = await response.json();
        setRoomieData(data.result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRoomieData();
  }, [id]);

  // 사용자 데이터 가져오기
  useEffect(() => {
    const fetchRoomieData = async () => {
      try {
        const response = await fetch(`http://15.165.223.198:3000/users/${id}`);
        if (!response.ok) {
          throw new Error(
            `사용자 정보를 불러오지 못했습니다. 상태 코드: ${response.status}`
          );
        }
        const data = await response.json();
        setRoomieData(data.result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRoomieData();
  }, [id]);

  const handleSendMessage = async () => {
    if (!message.trim()) {
      alert('쪽지 내용을 입력해주세요.');
      return;
    }

    try {
      const response = await fetch('http://15.165.223.198:3000/users/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          senderId: parseInt(userId, 10),
          receiverId: parseInt(id, 10),
          content: message,
        }),
      });

      if (response.ok) {
        alert('쪽지가 성공적으로 전송되었습니다!');
        setMessage(''); // 메시지 입력창 초기화
      } else {
        alert('쪽지 전송에 실패했습니다.');
      }
    } catch (error) {
      console.error('쪽지 전송 중 오류:', error);
      alert('쪽지 전송 중 오류가 발생했습니다.');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>오류 발생: {error}</div>;

  // // 임시 데이터 (프로필 정보)
  // const roomieData = {
  //   name: '김소정',
  //   year: '21학번',
  //   department: '인공지능융합대학',
  //   dormPeriod: '6개월',
  //   wakeUpTime: '09:00',
  //   sleepTime: '23:00',
  //   lightsOut: '22:00',
  //   showerTime: '귀가 후',
  //   smoking: '비흡연자',
  //   sleepHabit: ['없음', '잠꼬대'],
  //   lifestyle: '아침형',
  //   alarmSensitivity: '둔감',
  //   shareItems: '공유해요',
  //   gaming: 'PC 게임',
  //   studying: '불 켜고 해도 돼요',
  //   eating: '간단한 간식',
  //   cleaningFrequency: '일주일에 한 번',
  //   mbti: 'INFP'
  // };

  return (
    <>
      <GlobalStyle />
      <Container>
        <ProfileImage
          src={roomieData.imageData ? roomieData.imageData : tempImage}
          alt="Roomie Profile"
        />
        <ProfileInfo>
          <ProfileText>이름: {roomieData.name}</ProfileText>
          {/* <ProfileText> {roomieData.year}</ProfileText> */}
          <ProfileText>학과: {roomieData.department}</ProfileText>
          <ProfileText>기숙사: {roomieData.dormitory}</ProfileText>
          {/* <ProfileText> {roomieData.wakeUpTime}</ProfileText>
          <ProfileText> {roomieData.sleepTime}</ProfileText>
          <ProfileText> {roomieData.lightsOut}</ProfileText>
          <ProfileText> {roomieData.showerTime}</ProfileText>
          <ProfileText> {roomieData.smoking}</ProfileText>
          <ProfileText> {roomieData.sleepHabit.join(', ')}</ProfileText>
          <ProfileText> {roomieData.lifestyle}</ProfileText>
          <ProfileText> {roomieData.alarmSensitivity}</ProfileText>
          <ProfileText> {roomieData.shareItems}</ProfileText>
          <ProfileText> {roomieData.gaming}</ProfileText>
          <ProfileText> {roomieData.studying}</ProfileText>
          <ProfileText> {roomieData.eating}</ProfileText>
          <ProfileText> {roomieData.cleaningFrequency}</ProfileText>
          <ProfileText> {roomieData.mbti}</ProfileText> */}
        </ProfileInfo>
        <MessageSection>
          <MessageInput
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="쪽지 내용을 입력하세요..."
          />
          <SendButton onClick={handleSendMessage}>쪽지 보내기</SendButton>
        </MessageSection>
      </Container>
    </>
  );
}

export default Roomie;

const Container = styled.div`
  width: 100%;
  padding: 20px; /* 내부 여백 */
  margin-top: 200px;
  display: flex;
  flex-direction: column;
  align-items: center; /* 모든 콘텐츠를 중앙 정렬 */
  gap: 20px;
`;

const ProfileImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%; /* 원형 이미지 */
  object-fit: cover; /* 이미지 비율 유지 */
`;

const ProfileInfo = styled.div`
  width: 20%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  font-size: 18px;
  padding: 30px;
  border: 2px solid #a72b0c;
  border-radius: 10px;
  background-color: white;
`;

const ProfileText = styled.div`
  text-align: left;
`;

const MessageSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 300px;
`;

const MessageInput = styled.textarea`
  width: 100%;
  height: 80px;
  padding: 10px;
  border: 2px solid #a72b0c;
  border-radius: 8px;
  font-size: 16px;
  resize: none;
  box-sizing: border-box;
`;

const SendButton = styled.button`
  background-color: #a72b0c;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #87200a;
  }
`;
