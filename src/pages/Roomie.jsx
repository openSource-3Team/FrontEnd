//Roomie.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import { FaUserCircle } from 'react-icons/fa';

// 글로벌 스타일 설정
const GlobalStyle = createGlobalStyle`
    html, body, #root {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: Arial, sans-serif;
        background-color: #fef9f6; /* 부드러운 톤의 배경색 */
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

  return (
    <>
      <GlobalStyle />
      <Container>
        <ProfileIcon />
        <ProfileInfo>
          <ProfileText>이름: {roomieData.name}</ProfileText>
          <ProfileText> 학번 : {roomieData.studentId}</ProfileText>
          <ProfileText> 성별 : {roomieData.gender}</ProfileText>
          <ProfileText>학과: {roomieData.department}</ProfileText>
          <ProfileText>기숙사: {roomieData.dormitoryDuration}</ProfileText>
          <ProfileText> 기상시간 : {roomieData.wakeUpTime}</ProfileText>
          <ProfileText> 취침시간 : {roomieData.sleepingTime}</ProfileText>
          <ProfileText> 소등시간 : {roomieData.lightOutTime}</ProfileText>
          <ProfileText> 샤워시간 : {roomieData.showerTime}</ProfileText>
          <ProfileText> 흡연 여부 : {roomieData.isSmoking ? '흡연' : '비흡연'} </ProfileText>
          <ProfileText> 잠버릇 : {roomieData.sleepingHabits.join(', ')}</ProfileText>
          <ProfileText> 생활 패턴 : {roomieData.lifestyle}</ProfileText>
          <ProfileText> 알람소리 : {roomieData.alarm}</ProfileText>
          <ProfileText> 물건 공유 : {roomieData.itemSharingPreference}</ProfileText>
          <ProfileText> 방 안에서 게임 : {roomieData.gamePreference.join(', ')}</ProfileText>
          <ProfileText> 방 안에서 공부 : {roomieData.studyPreference.join(', ')}</ProfileText>
          <ProfileText> 방 안 음식물 섭취 : {roomieData.foodPreference.join(', ')}</ProfileText>
          <ProfileText> 청소 주기 : {roomieData.cleaningFrequency}</ProfileText>
          <ProfileText> MBTI : {roomieData.mbti}</ProfileText>
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
  background-color: #fef9f6; /* 부드러운 톤의 배경색 */

`;

const ProfileInfo = styled.div`
  width: 25%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  font-size: 18px;
  padding: 30px;
  border: 2px solid #a72b0c;
  border-radius: 10px;
  background-color: white;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

`;

const ProfileText = styled.div`
  text-align: left;

  
`;

const MessageSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 540px;
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

const ProfileIcon = styled(FaUserCircle)`
  color: #a72b0c;
  font-size: 200px;
  margin-right: 5px;
`;
