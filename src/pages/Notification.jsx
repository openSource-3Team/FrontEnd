import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

function Notification() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      const userId = localStorage.getItem('userid');

      try {
        const response = await fetch(
          `http://15.165.223.198:3000/users/received/${userId}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setNotifications(data || []);
        } else {
          console.error('Failed to fetch notifications');
        }
      } catch (error) {
        console.error('Error fetching notifications:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  if (loading) {
    return <Loading>Loading notifications...</Loading>;
  }

  return (
    <Container>
      <Title>알림</Title>
      {notifications.length > 0 ? (
        <NotificationList>
          {notifications.map((notification, index) => (
            <NotificationItem key={index} isUnread={!notification.read}>
              <Message>
                {notification.message || '새로운 쪽지가 도착했습니다.'}
              </Message>
              <Timestamp>
                {new Date(notification.createdAt).toLocaleString()}
              </Timestamp>
            </NotificationItem>
          ))}
        </NotificationList>
      ) : (
        <NoNotifications>받은 알림이 없습니다.</NoNotifications>
      )}
    </Container>
  );
}

export default Notification;

// 스타일링
const Container = styled.div`
  max-width: 800px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
  text-align: center;
`;

const NotificationList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const NotificationItem = styled.div`
  padding: 15px;
  border: 1px solid ${({ isUnread }) => (isUnread ? '#a72b0c' : '#ddd')};
  border-radius: 8px;
  background-color: ${({ isUnread }) => (isUnread ? '#ffece6' : '#f9f9f9')};
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    background-color: #f5f5f5;
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
