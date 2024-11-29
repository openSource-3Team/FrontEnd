import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function Write() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  // 제출 버튼 클릭 시 /community로 이동
  const handleSubmit = (e) => {
    e.preventDefault();
    // 게시글 작성 후 이동
    navigate('/community');
    history.push('/community');
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Title>커뮤니티 게시글 작성</Title>

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

        <Button type="submit">제출</Button>
      </Form>
    </Container>
  );
}

export default Write;

const Container = styled.div`
  max-width: 1200px;
  width: 100%;
  position: absolute;
  top: 30%;
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
  font-size: 27px;
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-size: 23px;
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 20px;
  font-size: 18px;

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
  font-size: 19px;
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

const Button = styled.button`
  padding: 12px 40px;
  background-color: #a72b0c;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  align-self: flex-end;

  &:hover {
    background-color: #87200a;
  }
`;
