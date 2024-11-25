import React, { useState } from 'react';
import styled from 'styled-components';

function Signup() {
  const [email, setEmail] = useState('');
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [accepted, setAccepted] = useState(false); // 약관 동의 여부

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!email) newErrors.email = '이메일을 입력해주세요.';
    if (!id) newErrors.id = '아이디를 입력해주세요.';
    if (!password) newErrors.password = '비밀번호를 입력해주세요.';
    if (!confirmPassword) {
      newErrors.confirmPassword = '비밀번호 확인을 입력해주세요.';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.';
    }
    if (!accepted) newErrors.accepted = '약관에 동의해주세요.'; // 약관 동의 체크

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      alert('회원가입 성공!');
      // navigate('/login'); // 회원가입 성공 후 /login으로 이동
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Title>회원가입</Title>
        <InputGroup>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
        </InputGroup>
        <InputGroup>
          <Input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="ID"
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
        <InputGroup>
          <Input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
          />
          {errors.confirmPassword && (
            <ErrorMessage>{errors.confirmPassword}</ErrorMessage>
          )}
        </InputGroup>

        {/* 약관 동의 체크박스 */}
        <CheckboxContainer>
          <Checkbox
            type="checkbox"
            checked={accepted}
            onChange={() => setAccepted(!accepted)}
          />
          <Label>I accept the terms and privacy policy</Label>
        </CheckboxContainer>
        {errors.accepted && <ErrorMessage>{errors.accepted}</ErrorMessage>}

        <ButtonGroup>
          <SignUpButton type="submit">Sign Up</SignUpButton>
        </ButtonGroup>
      </Form>
    </Container>
  );
}

export default Signup;

// 스타일 컴포넌트
const Container = styled.div`
  width: 800px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 33%;
  right: 33%;
  left: 33%;
`;

const Title = styled.div`
  font-size: 34px;
  color: #333;
  margin-bottom: 60px;
  font-weight: 600;
  text-align: center;
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
  border-radius: 20px;

  &:focus {
    border-color: #a72b0c;
    outline: none;
    box-shadow: 0 0 4px rgba(167, 43, 12, 0.5);
  }
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 14px;
  margin-top: 5px;
  margin-left: 10px;
`;

const ButtonGroup = styled.div`
  width: 100%;
  display: flex;
  gap: 15px;
  margin-top: 30px;
`;

const SignUpButton = styled.button`
  flex: 1;
  padding: 10px 20px;
  font-size: 23px;
  color: white;
  background-color: #a72b0c;
  border: none;
  border-radius: 20px;
  cursor: pointer;

  &:hover {
    background-color: #87200a;
  }
`;

// 약관 동의 체크박스 스타일
const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Checkbox = styled.input`
  margin-right: 10px;
`;

const Label = styled.label`
  font-size: 16px;
  color: #333;
`;
