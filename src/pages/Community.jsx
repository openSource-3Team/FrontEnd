import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

function Community() {
  const [posts, setPosts] = useState([]); // Store fetched posts
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://15.165.223.198:3000/posts', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log('게시물 목록 조회 성공:', data);
          setPosts(data.result || []); // posts 배열만 설정
        } else {
          console.error('게시물 목록 조회 실패');
          setPosts([]); // 실패 시 빈 배열로 설정
        }
      } catch (error) {
        console.error('게시물 조회 중 오류:', error);
        setPosts([]); // 오류 시 빈 배열로 설정
      }
    };

    fetchPosts();
  }, []);

  // Format the date to 'YY.MM.DD HH:mm'
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear().toString().slice(-2); // '24'
    const month = String(date.getMonth() + 1).padStart(2, '0'); // '09'
    const day = String(date.getDate()).padStart(2, '0'); // '30'
    const hours = String(date.getHours()).padStart(2, '0'); // '08'
    const minutes = String(date.getMinutes()).padStart(2, '0'); // '34'
    return `${year}.${month}.${day} ${hours}:${minutes}`;
  };

  // Calculate current items for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = posts.slice(indexOfFirstItem, indexOfLastItem);

  const nextPage = () => {
    if (currentPage < Math.ceil(posts.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToWritePage = () => {
    const userid = localStorage.getItem('userid'); // 로컬 스토리지에서 userid 확인

    if (!userid) {
      alert('로그인이 필요합니다. 로그인 페이지로 이동합니다.');
      navigate('/login'); // 로그인 페이지로 이동
      return;
    }

    navigate('/write'); // userid가 있으면 /write로 이동
  };

  // Navigate to postview with the specific post ID
  const goToPostPage = (postId) => {
    navigate(`/postview/${postId}`);
  };

  return (
    <Container>
      <TableHeader>
        <div>작성물</div>
        <div>내용</div>
        <div>작성시간</div>
      </TableHeader>

      <ContentContainer>
        {currentItems.map((item, index) => (
          <ContentRow onClick={() => goToPostPage(item.id)} key={index}>
            <div>{item.title}</div>
            <div>{item.content}</div>
            <div>{formatDate(item.createdAt)}</div>
          </ContentRow>
        ))}
      </ContentContainer>

      <ButtonGroup>
        <Button onClick={goToWritePage}>WRITE</Button>
        {currentPage > 1 && <Button onClick={prevPage}>PREV</Button>}
        {currentPage < Math.ceil(posts.length / itemsPerPage) && (
          <Button onClick={nextPage}>NEXT</Button>
        )}
      </ButtonGroup>
    </Container>
  );
}

export default Community;

const Container = styled.div`
  max-width: 1000px;
  width: 100%;
  position: fixed;
  top: 25%;
  left: 25%;
  color: #333;
  font-size: 16px;
  font-family: 'Arial', sans-serif;
`;

const TableHeader = styled.div`
  font-size: 17px;
  display: grid;
  grid-template-columns: 5fr 5fr 0.8fr;
  padding: 10px 30px;
  border: 2px solid #a72b0c;
  background-color: #ffffff;
  font-weight: bold;
  border-radius: 12px;
  margin-bottom: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
`;

const ContentContainer = styled.div`
  border-radius: 0 0 12px 12px;
  overflow: hidden;
`;

const ContentRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 9fr 2.5fr;
  padding: 17px 30px;
  justify-items: start; /* 기본 정렬 */
  align-items: center; /* 기본 정렬 */
  border-radius: 12px;
  border: 2px solid #a72b0c;
  margin-bottom: 12px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    background-color: #f9e9e5;
    transform: scale(1.0009);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  // 두 번째 div에만 스타일 적용
  div:nth-child(2) {
    justify-self: center; /* 그리드 아이템을 수평 가운데 정렬 */
    color: #666; /* 회색 */
  }

  // 세 번째 div에만 스타일 적용
  div:nth-child(3) {
    font-size: 14px; /* 작은 글씨 크기 */
    color: #666; /* 회색 */
    justify-self: right; /* 그리드 아이템을 수평 가운데 정렬 */
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 10px 35px;
  margin: 0 8px;
  background-color: #a72b0c;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #87200a;
  }

  &:first-child {
    color: #a72b0c;
    background-color: white;
    border: 2px solid #a72b0c;
    align-self: flex-start; /* 첫 번째 버튼만 위쪽에 정렬 */
    &:hover {
      background-color: #f9e9e5;
      transform: translateY(-6px);
    }
  }
`;
