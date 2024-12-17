// PostView.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

function PostView() {
  const navigate = useNavigate();
  const { id } = useParams(); // URL 파라미터에서 id 추출
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://15.165.223.198:3000/posts/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log('게시물 조회 성공:', data);
          setPost(data.result);
        } else if (response.status === 404) {
          console.error('게시물을 찾을 수 없음');
          setPost(null);
        } else {
          console.error('게시물 조회 실패');
          setPost(null);
        }
      } catch (error) {
        console.error('게시물 조회 중 오류:', error);
        setPost(null);
      }
    };

    fetchPost();
  }, [id]);

  // 뒤로 가기 버튼 클릭 시 /community로 이동
  const goBack = () => {
    navigate('/community');
  };

  // post가 로딩 중이거나 없는 경우 처리
  if (post === null) {
    return (
      <Container>
        <PostCard>
          <PostTitle>게시물을 불러오는 중...</PostTitle>
          <ButtonGroup>
            <Button onClick={goBack}>돌아가기</Button>
          </ButtonGroup>
        </PostCard>
      </Container>
    );
  }

  return (
    <Container>
      <PostCard>
        <PostHeader>
          <div>작성자: {post.authorId}</div>
          <div>작성일: {new Date(post.createdAt).toLocaleString()}</div>
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
  width: 210vh;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  position: fixed;
  top: 10%;
  font-family: 'Arial', sans-serif;

  /* 반응형 고려 */
  @media (max-width: 768px) {
    width: 100vw;
    top: 5%;
  }
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
  font-size: 14px;
  font-weight: 500;
  color: #666;
  margin-bottom: 20px;
`;

const PostTitle = styled.h1`
  font-size: 27px;
  font-weight: 700;
  color: #333;
  margin-bottom: 20px;
  padding: 0 0 30px 0;
  border-bottom: 2px solid #a72b0c;
`;

const PostContent = styled.p`
  font-size: 20px;
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
  font-size: 15px;
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
