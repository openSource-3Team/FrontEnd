// PostView.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function PostView() {
  const navigate = useNavigate();

  // 더미 데이터 (실제로는 서버에서 받아온 데이터를 사용)
  const post = {
    title: '게시글 제목 1',
    author: '작성자 A',
    date: '2024-11-29',
    content:
      '여기에 게시글 내용이 들어갑니다. 이곳에 작성자가 남긴 내용들이 펼쳐집니다. 다양한 내용들이 들어갈 수 있습니다.',
  };

  // 뒤로 가기 버튼 클릭 시 /community로 이동
  const goBack = () => {
    navigate('/community'); // /community 페이지로 이동
  };

  return (
    <Container>
      <PostCard>
        <PostHeader>
          <div>작성자: {post.author}</div>
          <div>작성일: {post.date}</div>
        </PostHeader>

        <PostTitle>{post.title}</PostTitle>
        <PostContent>{post.content}</PostContent>

        <ButtonGroup>
          <Button onClick={goBack}>돌아가기</Button>
        </ButtonGroup>
      </PostCard>
    </Container>
  );
}

export default PostView;

// 스타일링

const Container = styled.div`
  width: 220vh;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  position: fixed;
  top: 10%;
  font-family: 'Arial', sans-serif;
`;

const PostCard = styled.div`
  width: 100%;
  max-width: 1200px;
  background-color: #ffffff;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  border: 2px solid #a72b0c;
`;

const PostHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 16px;
  font-weight: 500;
  color: #666;
  margin-bottom: 20px;
`;

const PostTitle = styled.h1`
  font-size: 36px;
  font-weight: 700;
  color: #333;
  margin-bottom: 20px;
  padding: 0 0 10px 0;
  border-bottom: 2px solid #a72b0c;
`;

const PostContent = styled.p`
  font-size: 18px;
  line-height: 1.8;
  color: #555;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 30px;
  height: 30vh;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Button = styled.button`
  padding: 12px 40px;
  background-color: #a72b0c;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 17px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #87200a;
    transform: translateY(-3px);
  }

  &:active {
    background-color: #a72b0c;
    transform: translateY(1px);
  }
`;
