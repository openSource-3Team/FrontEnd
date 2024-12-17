import React, { useState } from 'react';
import styled from 'styled-components';

function Forgotpw() {
  const [step, setStep] = useState(1); // 1: 코드 요청, 2: 비밀번호 재설정
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  // 인증 코드 요청
  const handleCodeRequest = async (e) => {
    e.preventDefault();

    if (!email) {
      setError('이메일을 입력해주세요.');
      return;
    }

    try {
      const response = await fetch(
        'http://15.165.223.198:3000/users/password-reset',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        }
      );

      if (response.ok) {
        const data = await response.json();

        alert('인증코드 발송완료!');
        setStep(2); // 인증 코드 입력 단계로 이동
      } else {
        const errorData = await response.json();
        setError(errorData.error || '오류가 발생했습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      setError('네트워크 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  // 비밀번호 재설정
  const handlePasswordReset = async (e) => {
    e.preventDefault();

    if (!email || !code || !newPassword) {
      setError('모든 필드를 입력해주세요.');
      return;
    }

    try {
      const response = await fetch(
        'http://15.165.223.198:3000/users/password-reset/verify',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, code, newPassword }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        alert('비밀번호가 성공적으로 변경되었습니다.');
        window.location.href = '/login'; // 로그인 페이지로 이동
      } else {
        const errorData = await response.json();
        setError(errorData.error || '오류가 발생했습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      setError('네트워크 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <Container>
      {step === 1 ? (
        <Form onSubmit={handleCodeRequest}>
          <Title>비밀번호 찾기</Title>
          <Description>
            걱정하지 마세요! 계정과 연결된 이메일을 입력하면 M@tchRoomie가
            비밀번호 재설정을 위한 코드를 보내줍니다.
          </Description>
          <InputGroup>
            <Input
              type="email"
              placeholder="Enter your Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {error && <ErrorMessage>{error}</ErrorMessage>}
          </InputGroup>

          <ButtonGroup>
            <SendCodeButton type="submit">Send code</SendCodeButton>
          </ButtonGroup>

          <Footer>
            <FooterText>
              Remember password? <StyledLink href="/login">Log in</StyledLink>
            </FooterText>
          </Footer>
        </Form>
      ) : (
        <Form onSubmit={handlePasswordReset}>
          <Title>비밀번호 재설정</Title>
          <Description>
            인증 코드를 입력하고 새로운 비밀번호를 설정해주세요.
          </Description>
          <InputGroup>
            <Input
              type="text"
              placeholder="Enter your Code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </InputGroup>
          <InputGroup>
            <Input
              type="password"
              placeholder="Enter your New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            {error && <ErrorMessage>{error}</ErrorMessage>}
          </InputGroup>

          <ButtonGroup>
            <SendCodeButton type="submit">Reset Password</SendCodeButton>
          </ButtonGroup>
        </Form>
      )}
      {message && <SuccessMessage>{message}</SuccessMessage>}
    </Container>
  );
}

export default Forgotpw;

// 스타일 컴포넌트는 이전과 동일하지만 SuccessMessage 추가
const SuccessMessage = styled.div`
  font-size: 16px;
  color: green;
  margin-top: 20px;
  text-align: center;
`;

// 스타일 컴포넌트
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

const Form = styled.form`
  background-color: white;
  padding: 40px;
  border-radius: 12px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 27px;
  font-weight: bold;
  color: #333;
  margin-bottom: 60px;
`;

const Description = styled.p`
  font-size: 20px;
  color: #777;
  margin-bottom: 60px;
`;

const InputGroup = styled.div`
  margin-bottom: 30px;
`;

const Input = styled.input`
  width: 88%;
  padding: 20px 40px;
  font-size: 14px;
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
  text-align: left; /* 에러 메시지를 왼쪽에 위치시킴 */
`;

const ButtonGroup = styled.div`
  width: 100%;
`;

const SendCodeButton = styled.button`
  width: 100%;
  padding: 15px;
  background-color: #a72b0c;
  color: white;
  font-size: 20px;
  border: none;
  border-radius: 15px;
  cursor: pointer;

  &:hover {
    background-color: #87200a;
  }
`;

const Footer = styled.div`
  margin-top: 30px; /* Footer 간격 증가 */
`;

const FooterText = styled.p`
  font-size: 15px;
  color: #333;
  margin-bottom: 0;
`;

const StyledLink = styled.a`
  font-size: 15px;
  color: #a72b0c;
  cursor: pointer;
  margin-left: 10px; /* "Remember"와 "Log in" 간격 증가 */

  &:hover {
    color: #87200a;
  }
`;
