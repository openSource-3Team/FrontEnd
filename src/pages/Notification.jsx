import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

function Notification() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotifications = async () => {
      const userId = localStorage.getItem('userid');
      if (!userId) {
        console.error('User ID가 없습니다. 로그인 상태를 확인하세요.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/users/received/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setNotifications(data.result || []); // 응답 데이터에 따라 수정
        } else {
          console.error('알림 데이터를 가져오는 데 실패했습니다.');
        }
      } catch (error) {
        console.error('알림 데이터를 가져오는 중 오류:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  // 쪽지 클릭 시 senderId를 기반으로 /roomie/:id로 이동
  const handleNotificationClick = (senderId) => {
    if (senderId) {
      navigate(`/roomie/${senderId}`);
    } else {
      console.error('Sender ID가 없습니다.');
    }
  };

  if (loading) {
    return <Loading>알림 데이터를 불러오는 중입니다...</Loading>;
  }

  return (
    <Container>
      <Title>받은 쪽지</Title>
      {notifications.length > 0 ? (
        <NotificationList>
          {notifications.map((notification, index) => (
            <NotificationItem
              key={index}
              onClick={() => handleNotificationClick(notification.senderId)} // 클릭 이벤트 추가
            >
              <Message>
                {notification.content || '새로운 쪽지가 도착했습니다.'}
              </Message>
              <Timestamp>
                {new Date(notification.createdAt).toLocaleString()}
              </Timestamp>
            </NotificationItem>
          ))}
        </NotificationList>
      ) : (
        <NoNotifications>받은 쪽지가 없습니다.</NoNotifications>
      )}
    </Container>
  );
}

export default Notification;

// 스타일링
const Container = styled.div`
  max-width: 800px;
  margin: 50px auto;
  padding: 30px;
  border-radius: 10px;
  background-color: #fff;
  width: 210vh;
  position: absolute;
  top: 10%;
  left: 26%;
  justify-content: center;

  align-items: flex-start; /* 상단 여백 조정 */
  margin-top: 200px; /* 네브바와 겹치지 않도록 여백 추가 */

  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border: 2px solid #a72b0c; /* 포인트 색상 */
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #a72b0c; /* 포인트 색상 */
  text-align: center;
`;

const NotificationList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const NotificationItem = styled.div`
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #fef6f4;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: #ffece6;
  }
`;

const Message = styled.div`
  font-size: 16px;
  color: #333;
`;

const Timestamp = styled.div`
  font-size: 14px;
  color: #666;
`;

const Loading = styled.div`
  text-align: center;
  font-size: 18px;
  color: #666;
`;

const NoNotifications = styled.div`
  text-align: center;
  font-size: 16px;
  color: #999;
  margin-top: 20px;
`;
