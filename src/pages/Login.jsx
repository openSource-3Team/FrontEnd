import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 네비게이션 처리

  const validateForm = () => {
    const newErrors = {};
    if (!id) {
      newErrors.id = 'ID는 필수 입력 항목입니다.';
    }
    if (!password) {
      newErrors.password = '비밀번호는 필수 입력 항목입니다.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');

    if (validateForm()) {
      try {
        const response = await fetch('/api/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: id, password }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log('로그인 성공', data.result);

          localStorage.setItem('userid', data.result.id);
          alert('로그인 성공!');
          // 새로고침 및 프로필 페이지로 이동
          window.location.href = '/profile';
        } else {
          // 인증 실패
          alert(' 아이디 또는 비밀번호를 확인해주세요');
        }
      } catch (error) {
        console.error('로그인 요청 중 에러:', error);
        setApiError('서버 에러: 잠시 후 다시 시도해주세요.');
      }
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Title>로그인</Title>
        <Description>
          M@tchRoomie와 함께 룸메이트를 찾고 커뮤니티를 즐길 수 있어요!
        </Description>
        <InputGroup>
          <Input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="ID (email)"
          />
          {errors.id && <ErrorMessage>{errors.id}</ErrorMessage>}
        </InputGroup>
        <InputGroup>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
        </InputGroup>

        {apiError && <ErrorMessage>{apiError}</ErrorMessage>}

        <Options>
          <Link to="/forgotpw">
            <ForgotPassword>Forgot Password?</ForgotPassword>
          </Link>
        </Options>
        <ButtonGroup>
          <LoginButton type="submit">Login</LoginButton>
          <SignUpButton type="button" as={Link} to="/signup">
            Sign Up
          </SignUpButton>
        </ButtonGroup>
      </Form>
    </Container>
  );
}

export default Login;

const Container = styled.div`
  max-width: 800px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 30%;
  left: 30%;
`;

const Title = styled.div`
  font-size: 27px;
  color: #333;

  font-weight: 600;
  text-align: center;
`;
const Description = styled.p`
  font-size: 20px;
  text-align: center;
  color: #777;
  margin-bottom: 60px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const InputGroup = styled.div`
  margin-bottom: 30px;
`;

const Input = styled.input`
  width: 90%;
  padding: 20px 40px;
  font-size: 17px;
  border: 1px solid #ccc;
  border-radius: 15px;

  &:focus {
    border-color: #a72b0c;
    outline: none;
    box-shadow: 0 0 4px rgba(167, 43, 12, 0.5);
  }
`;

const ErrorMessage = styled.div`
  font-size: 14px;
  color: red;
  margin-left: 10px;
  margin-top: 5px;
`;

const Options = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 30px;
`;

const ForgotPassword = styled.div`
  font-size: 14px;
  color: #a72b0c;
  cursor: pointer;

  &:hover {
    color: #a72b0c;
  }
`;

const ButtonGroup = styled.div`
  margin-top: 30px;
  width: 100%;
  display: flex;
  gap: 15px;
`;

const LoginButton = styled.button`
  flex: 1;
  padding: 10px 20px;
  font-size: 20px;
  color: white;
  background-color: #a72b0c;
  border: none;
  border-radius: 20px;
  cursor: pointer;

  &:hover {
    background-color: #87200a;
  }
`;

const SignUpButton = styled.div`
  flex: 1;
  padding: 10px 20px;
  font-size: 20px;
  color: #a72b0c;
  background-color: white;
  border: 2px solid #a72b0c;
  border-radius: 20px;
  cursor: pointer;
  text-align: center;

  &:hover {
    color: #a72b0c;
    border: 2px solid #a72b0c;
    background-color: #f9e9e5;
  }
`;
