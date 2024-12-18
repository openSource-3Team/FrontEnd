import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

function Write() {
  const { id } = useParams(); // URL에서 id 추출
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // URL에 id가 있을 경우 해당 게시물 데이터 가져오기
    if (id) {
      const fetchPost = async () => {
        try {
          const response = await fetch(`/api/posts/${id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (response.ok) {
            const data = await response.json();
            setTitle(data.result.title);
            setContent(data.result.content);
          } else {
            console.error('게시물을 불러오지 못했습니다.');
          }
        } catch (error) {
          console.error('게시물 조회 중 오류:', error);
        }
      };

      fetchPost();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const authorId = parseInt(localStorage.getItem('userid'), 10);
    if (!authorId) {
      alert('로그인이 필요합니다.');
      return;
    }

    try {
      const response = await fetch(
        id
          ? `/api/posts/${id}` // 수정
          : '/api/posts', // 새 글 작성
        {
          method: id ? 'PUT' : 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title, content, authorId }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(id ? '게시물 수정 성공:' : '게시글 생성 성공:', data);
        navigate('/community');
      } else {
        console.error(id ? '게시물 수정 실패' : '게시글 생성 실패');
        alert('작업에 실패했습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      console.error(
        id ? '게시물 수정 중 오류:' : '게시글 생성 중 오류:',
        error
      );
      alert('서버 오류: 잠시 후 다시 시도해주세요.');
    }
  };

  const handleDelete = async (e) => {
    e.stopPropagation(); // 이벤트 전파 차단
    e.preventDefault(); // 기본 동작 차단
    if (!id) return;

    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        console.log('게시물 삭제 성공');
        // 상태 초기화
        setTitle('');
        setContent('');
        // 커뮤니티 페이지로 이동
        navigate('/community');
      } else {
        console.error('게시물 삭제 실패');
        alert('게시물을 삭제하지 못했습니다.');
      }
    } catch (error) {
      console.error('게시물 삭제 중 오류:', error);
      alert('서버 오류: 삭제 실패');
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Title>{id ? '게시물 수정' : '커뮤니티 게시글 작성'}</Title>
        <Description>기숙사 학생들과 자유롭게 생각을 공유해보세요!</Description>
        <Label htmlFor="title">제목</Label>
        <Input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="게시글 제목을 입력하세요"
        />

        <Label htmlFor="content">내용</Label>
        <TextArea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="게시글 내용을 입력하세요"
        />

        <ButtonGroup>
          <Button type="submit">{id ? '수정' : '작성'}</Button>
          {id && <DeleteButton onClick={handleDelete}>삭제</DeleteButton>}
        </ButtonGroup>
      </Form>
    </Container>
  );
}

export default Write;

// 스타일링

const Container = styled.div`
  max-width: 1200px;
  width: 100%;
  position: absolute;
  top: 23%;
  left: 50%;
  transform: translateX(-50%);
  padding: 20px;
  color: #333;
  font-family: 'Arial', sans-serif;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 25px;
`;

const Description = styled.p`
  font-size: 20px;
  text-align: center;
  color: #777;
  margin-bottom: 30px;
`;

const Label = styled.label`
  font-size: 17px;
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 20px;
  font-size: 17px;
  border: 2px solid #a72b0c;
  border-radius: 8px;
  margin-bottom: 15px;
  width: 100%;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #87200a;
  }
`;

const TextArea = styled.textarea`
  padding: 20px;
  font-size: 17px;
  border: 2px solid #a72b0c;
  border-radius: 8px;
  margin-bottom: 20px;
  width: 100%;
  height: 200px;
  box-sizing: border-box;
  font-family: 'Arial', sans-serif;

  &:focus {
    outline: none;
    border-color: #87200a;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const Button = styled.button`
  padding: 12px 40px;
  background-color: #a72b0c;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #87200a;
  }
`;

const DeleteButton = styled(Button)`
  background-color: white;
  color: #a72b0c;
  border: 2px solid #a72b0c;

  &:hover {
    background-color: #a72b0c;
    border: 2px solid #a72b0c;
    color: white;
  }
`;
