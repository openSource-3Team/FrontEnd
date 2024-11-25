import React, { useState } from 'react';
import styled from 'styled-components';

function Forgotpw() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setError('이메일을 입력해주세요.');
    } else {
      setError('');
      // 비밀번호 재설정 코드 보내는 로직 추가
      alert('이메일로 코드가 전송되었습니다.');
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Title>비밀번호 찾기</Title>
        <Description>
          걱정하지 마세요! 계정과 연결된 이메일을 입력하면 비밀번호 재설정을
          위한 코드가 전송됩니다.
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
    </Container>
  );
}

export default Forgotpw;

// 스타일 컴포넌트
const Container = styled.div`
  width: 800px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 40%;
  right: 33%;
  left: 33%;
`;

const Form = styled.form`
  background-color: white;
  padding: 40px;
  border-radius: 12px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 33px;
  font-weight: bold;
  color: #333;
  margin-bottom: 60px;
`;

const Description = styled.p`
  font-size: 23px;
  color: #777;
  margin-bottom: 50px;
`;

const InputGroup = styled.div`
  margin-bottom: 30px;
`;

const Input = styled.input`
  width: 88%;
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
  font-size: 18px;
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
  font-size: 14px;
  color: #333;
  margin-bottom: 0;
`;

const StyledLink = styled.a`
  font-size: 14px;
  color: #a72b0c;
  cursor: pointer;
  margin-left: 10px; /* "Remember"와 "Log in" 간격 증가 */

  &:hover {
    color: #87200a;
  }
`;
