// Profile.jsx
import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import styled, { createGlobalStyle } from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const options = {
  gender: [
    { value: '남성', label: '남성' },
    { value: '여성', label: '여성' },
  ],
  dorm: [
    { value: '4개월', label: '4개월' },
    { value: '6개월', label: '6개월' },
    { value: '12개월', label: '12개월' },
  ],
  major: [
    { value: '전자정보공과대학', label: '전자정보공과대학' },
    { value: '인공지능융합대학', label: '인공지능융합대학' },
    { value: '공과대학', label: '공과대학' },
    { value: '자연과학대학', label: '자연과학대학' },
    { value: '경영대학', label: '경영대학' },
    { value: '인문사회과학대학', label: '인문사회과학대학' },
    { value: '정책법학대학', label: '정책법학대학' },
    { value: '인제니움학부대학', label: '인제니움학부대학' },
  ],
  studentNumber: [
    { value: '16', label: '16' },
    { value: '17', label: '17' },
    { value: '18', label: '18' },
    { value: '19', label: '19' },
    { value: '20', label: '20' },
    { value: '21', label: '21' },
    { value: '22', label: '22' },
    { value: '23', label: '23' },
    { value: '24', label: '24' },
    { value: '25', label: '25' },
  ],
  birthYear: [
    { value: '1995', label: '1995' },
    { value: '1996', label: '1996' },
    { value: '1997', label: '1997' },
    { value: '1998', label: '1998' },
    { value: '1999', label: '1999' },
    { value: '2000', label: '2000' },
    { value: '2001', label: '2001' },
    { value: '2002', label: '2002' },
    { value: '2003', label: '2003' },
    { value: '2004', label: '2004' },
    { value: '2005', label: '2005' },
  ],
  lifestyle: [
    { value: '아침형 인간', label: '아침형 인간' },
    { value: '저녁형 인간', label: '저녁형 인간' },
    { value: '새벽형 인간', label: '새벽형 인간' },
  ],
  isSmoker: [
    { value: '흡연자', label: '흡연자' },
    { value: '비흡연자', label: '비흡연자' },
  ],
  sleephabits: [
    { value: '코골이', label: '코골이' },
    { value: '이갈이', label: '이갈이' },
    { value: '잠꼬대', label: '잠꼬대' },
    { value: '불면증', label: '불면증' },
    { value: '몽유병', label: '몽유병' },
  ],
  wakeup: [
    { value: '07:00', label: '07:00' },
    { value: '08:00', label: '08:00' },
    { value: '09:00', label: '09:00' },
    { value: '10:00', label: '10:00' },
  ],
  gotobed: [
    { value: '21:00', label: '21:00' },
    { value: '22:00', label: '22:00' },
    { value: '23:00', label: '23:00' },
    { value: '새벽', label: '새벽' },
  ],
  offlight: [
    { value: '21:00', label: '21:00' },
    { value: '22:00', label: '22:00' },
    { value: '23:00', label: '23:00' },
    { value: '24:00', label: '24:00' },
  ],
  showerTime: [
    { value: '외출 전', label: '외출 전' },
    { value: '귀가 후', label: '귀가 후' },
    { value: '둘 다', label: '둘 다' },
  ],
  alarm: [
    { value: '민감', label: '민감' },
    { value: '둔감', label: '둔감' },
  ],
  share: [
    { value: '공유해요', label: '공유해요' },
    { value: '공유하기 싫어요', label: '공유하기 싫어요' },
  ],
  game: [
    { value: 'PC 게임해요', label: 'PC 게임해요' },
    { value: '모바일 게임해요', label: '모바일 게임해요' },
    { value: '안해요', label: '안해요' },
  ],
  study: [
    { value: '불 키고 해요', label: '불 키고 해요' },
    { value: '스탠드 키고 해요', label: '스탠드 키고 해요' },
    { value: '공부 안해요', label: '공부 안해요' },
  ],
  food: [
    { value: '음료', label: '음료' },
    { value: '간단한 간식', label: '간단한 간식' },
    { value: '식사', label: '식사' },
    { value: '배달음식', label: '배달음식' },
    { value: '섭취 안해요', label: '섭취 안해요' },
  ],
  cleaning: [
    { value: '매일 깨끗하게 청소', label: '매일 깨끗하게 청소' },
    { value: '2~3일에 한 번씩 청소', label: '2~3일에 한 번씩 청소' },
    { value: '일주일에 한 번씩 청소', label: '일주일에 한 번씩 청소' },
    { value: '한 달에 한 번씩 청소', label: '한 달에 한 번씩 청소' },
  ],
  mbti: [
    { value: 'ESTJ', label: 'ESTJ' },
    { value: 'ESTP', label: 'ESTP' },
    { value: 'ESFJ', label: 'ESFJ' },
    { value: 'ESFP', label: 'ESFP' },
    { value: 'ENTJ', label: 'ENTJ' },
    { value: 'ENTP', label: 'ENTP' },
    { value: 'ENFJ', label: 'ENFJ' },
    { value: 'ESFP', label: 'ESFP' },
    { value: 'ISTJ', label: 'ISTJ' },
    { value: 'ISTP', label: 'ISTP' },
    { value: 'ISFJ', label: 'ISFJ' },
    { value: 'ISFP', label: 'ISFP' },
    { value: 'INTP', label: 'INTP' },
    { value: 'INFJ', label: 'INFJ' },
    { value: 'INFP', label: 'INFP' },
    { value: 'INTJ', label: 'INTJ' },
  ],
};

function Profile() {
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedDorm, setSelectedDorm] = useState(null);
  const [selectedMajor, setSelectedMajor] = useState(null);
  const [selectedStudentNumber, setSelectedStudentNumber] = useState(null);
  const [selectedBirthYear, setSelectedBirthYear] = useState(null);
  const [selectedIsSmoker, setSelectedIsSmoker] = useState(null);
  const [selectedLifestyle, setSelectedLifestyle] = useState('');
  const [selectedSleephabits, setSelectedSleephabits] = useState([]);
  const [selectedWakeup, setSelectedWakeup] = useState('');
  const [selectedGotobed, setSelectedGotobed] = useState('');
  const [selectedOfflight, setSelectedOfflight] = useState('');
  const [selectedShowerTime, setSelectedShowerTime] = useState('');
  const [selectedAlarm, setSelectedAlarm] = useState('');
  const [selectedShare, setSelectedShare] = useState('');
  const [selectedGame, setSelectedGame] = useState([]);
  const [selectedStudy, setSelectedStudy] = useState([]);
  const [selectedFood, setSelectedFood] = useState([]);
  const [selectedCleaning, setSelectedCleaning] = useState(null);
  const [selectedMbti, setSelectedMbti] = useState(null);

  // New states for name and profile picture
  const [userName, setUserName] = useState('');
  const [previewUrl, setPreviewUrl] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleCheckboxChange = (event, setter) => {
    const { value, checked } = event.target;

    setter((prev) => {
      if (checked) {
        return [...prev, value];
      } else {
        return prev.filter((item) => item !== value);
      }
    });
  };

  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value);
  };

  const handleLifestyleChange = (event) => {
    setSelectedLifestyle(event.target.value);
  };

  const handleIsSmokerChange = (event) => {
    setSelectedIsSmoker(event.target.value);
  };

  const handleSleephabitsChange = (event) => {
    handleCheckboxChange(event, setSelectedSleephabits);
  };

  const handleWakeupChange = (event) => {
    setSelectedWakeup(event.target.value);
  };

  const handleGotobedChange = (event) => {
    setSelectedGotobed(event.target.value);
  };

  const handleOfflightChange = (event) => {
    setSelectedOfflight(event.target.value);
  };

  const handleShowerTimeChange = (event) => {
    setSelectedShowerTime(event.target.value);
  };

  const handleAlarmChange = (event) => {
    setSelectedAlarm(event.target.value);
  };

  const handleShareChange = (event) => {
    setSelectedShare(event.target.value);
  };

  const handleGameChange = (event) => {
    handleCheckboxChange(event, setSelectedGame);
  };

  const handleStudyChange = (event) => {
    handleCheckboxChange(event, setSelectedStudy);
  };

  const handleFoodChange = (event) => {
    handleCheckboxChange(event, setSelectedFood);
  };

  const handleSaveProfile = async () => {
    if (
      !userName ||
      !phoneNumber ||
      !selectedGender ||
      !selectedDorm ||
      !selectedMajor ||
      !selectedStudentNumber ||
      !selectedBirthYear
    ) {
      alert('모든 필수 필드를 입력해주세요.');
      return;
    }
    const userid = localStorage.getItem('userid');
    const url = `http://15.165.223.198:3000/users/${userid}/profile`;

    const formData = new FormData();

    formData.append('name', userName?.trim() || 'John Doe');
    formData.append('email', userid);

    formData.append('gender', selectedGender || '');
    formData.append('phoneNumber', phoneNumber?.trim() || '010-1234-5678');
    formData.append('dormitoryDuration', selectedDorm?.value || '');
    formData.append('department', selectedMajor?.value || '');
    formData.append('studentId', selectedStudentNumber?.value || '');
    formData.append('lifestyle', selectedLifestyle || '');
    formData.append('isSmoking', selectedIsSmoker === '흡연자' ? true : false);
    formData.append('wakeUpTime', selectedWakeup || '');
    formData.append('sleepingTime', selectedGotobed || '');
    formData.append('lightOutTime', selectedOfflight || '');
    formData.append('showerTime', selectedShowerTime || '');
    formData.append('cleaningFrequency', selectedCleaning?.value || '');
    formData.append('itemSharingPreference', selectedShare || '');
    formData.append('alarm', selectedAlarm || '');
    formData.append('mbti', selectedMbti?.value || '');

    selectedSleephabits?.forEach((sleephabits) =>
      formData.append('sleepingHabits', sleephabits)
    );
    selectedGame?.forEach((game) => formData.append('gamePreferences', game));
    selectedStudy?.forEach((study) =>
      formData.append('studyPreferences', study)
    );
    selectedFood?.forEach((food) => formData.append('foodPreferences', food));

    console.log('FormData 확인:');
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    try {
      const response = await axios.put(url, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log('프로필 저장 성공:', response.data);
      alert('프로필이 성공적으로 저장되었습니다!');
      navigate('/match'); // 로그인 페이지로 이동
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data ||
        error.message ||
        '알 수 없는 오류 발생';
      console.error('프로필 저장 실패:', errorMessage);
      alert(`저장 실패: ${errorMessage}`);
    }
  };

  return (
    <>
      <GlobalStyle />
      <div>
        <Container>
          <Content>
            <Title>프로필</Title>

            {/* 이름 입력 필드 */}
            <InputGroup>
              <Label htmlFor="userName">이름</Label>
              <TextInput
                type="text"
                id="userName"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="이름을 입력하세요"
              />
            </InputGroup>

            {/* 전화번호 입력 */}
            <InputGroup>
              <Label htmlFor="phoneNumber">전화번호</Label>
              <TextInput
                type="text"
                id="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="전화번호를 입력하세요"
              />
            </InputGroup>

            <SectionSubtitle>매칭 프로필 옵션 세팅</SectionSubtitle>

            {/* 성별 선택 */}
            <OptionGroup>
              <Label>성별 선택</Label>
              <CheckBoxContainer>
                {options.gender.map((option) => (
                  <CheckBoxWrapper key={option.value}>
                    <CheckBox
                      type="radio"
                      name="gender"
                      value={option.value}
                      checked={selectedGender === option.value}
                      onChange={handleGenderChange}
                    />
                    <CheckBoxLabel>{option.label}</CheckBoxLabel>
                  </CheckBoxWrapper>
                ))}
              </CheckBoxContainer>
            </OptionGroup>

            {/* 기숙사 선택 */}
            <OptionGroup>
              <Label>기숙사 선택</Label>
              <Select
                value={selectedDorm}
                onChange={setSelectedDorm}
                options={options.dorm}
                placeholder="기숙사를 선택하세요"
              />
            </OptionGroup>

            {/* 단과대 선택 */}
            <OptionGroup>
              <Label>단과대 선택</Label>
              <Select
                value={selectedMajor}
                onChange={setSelectedMajor}
                options={options.major}
                placeholder="단과대를 선택하세요"
              />
            </OptionGroup>

            {/* 학번 선택 */}
            <OptionGroup>
              <Label>학번 선택</Label>
              <Select
                value={selectedStudentNumber}
                onChange={setSelectedStudentNumber}
                options={options.studentNumber}
                placeholder="학번을 선택하세요"
              />
            </OptionGroup>

            {/* 출생연도 선택 */}
            <OptionGroup>
              <Label>출생연도 선택</Label>
              <Select
                value={selectedBirthYear}
                onChange={setSelectedBirthYear}
                options={options.birthYear}
                placeholder="출생연도를 선택하세요"
              />
            </OptionGroup>

            {/* 생활 패턴 */}
            <OptionGroup>
              <Label>생활패턴 선택</Label>
              <CheckBoxContainer>
                {options.lifestyle.map((option) => (
                  <CheckBoxWrapper key={option.value}>
                    <CheckBox
                      type="radio"
                      value={option.value}
                      checked={selectedLifestyle === option.value}
                      onChange={handleLifestyleChange}
                    />
                    <CheckBoxLabel>{option.label}</CheckBoxLabel>
                  </CheckBoxWrapper>
                ))}
              </CheckBoxContainer>
            </OptionGroup>

            <OptionGroup>
              <Label>흡연여부 선택</Label>
              <CheckBoxContainer>
                {options.isSmoker.map((option) => (
                  <CheckBoxContainer key={option.value}>
                    <CheckBox
                      type="checkbox"
                      value={option.value}
                      checked={selectedIsSmoker === option.value}
                      onChange={handleIsSmokerChange}
                    />
                    <CheckBoxLabel>{option.label}</CheckBoxLabel>
                  </CheckBoxContainer>
                ))}
              </CheckBoxContainer>
            </OptionGroup>

            <OptionGroup>
              <Label>수면습관 선택</Label>
              <CheckBoxContainer>
                {options.sleephabits.map((option) => (
                  <CheckBoxContainer key={option.value}>
                    <CheckBox
                      type="checkbox"
                      value={option.value}
                      checked={selectedSleephabits.includes(option.value)}
                      onChange={handleSleephabitsChange}
                    />
                    <CheckBoxLabel>{option.label}</CheckBoxLabel>
                  </CheckBoxContainer>
                ))}
              </CheckBoxContainer>
            </OptionGroup>

            <OptionGroup>
              <Label>기상시간 선택</Label>
              <CheckBoxContainer>
                {options.wakeup.map((option) => (
                  <CheckBoxContainer key={option.value}>
                    <CheckBox
                      type="checkbox"
                      value={option.value}
                      checked={selectedWakeup === option.value}
                      onChange={handleWakeupChange}
                    />
                    <CheckBoxLabel>{option.label}</CheckBoxLabel>
                  </CheckBoxContainer>
                ))}
              </CheckBoxContainer>
            </OptionGroup>

            <OptionGroup>
              <Label>취침시간 선택</Label>
              <CheckBoxContainer>
                {options.gotobed.map((option) => (
                  <CheckBoxContainer key={option.value}>
                    <CheckBox
                      type="checkbox"
                      value={option.value}
                      checked={selectedGotobed === option.value}
                      onChange={handleGotobedChange}
                    />
                    <CheckBoxLabel>{option.label}</CheckBoxLabel>
                  </CheckBoxContainer>
                ))}
              </CheckBoxContainer>
            </OptionGroup>

            <OptionGroup>
              <Label>소등시간 선택</Label>
              <CheckBoxContainer>
                {options.offlight.map((option) => (
                  <CheckBoxContainer key={option.value}>
                    <CheckBox
                      type="checkbox"
                      value={option.value}
                      checked={selectedOfflight === option.value}
                      onChange={handleOfflightChange}
                    />
                    <CheckBoxLabel>{option.label}</CheckBoxLabel>
                  </CheckBoxContainer>
                ))}
              </CheckBoxContainer>
            </OptionGroup>

            <OptionGroup>
              <Label>샤워시간 선택</Label>
              <CheckBoxContainer>
                {options.showerTime.map((option) => (
                  <CheckBoxContainer key={option.value}>
                    <CheckBox
                      type="checkbox"
                      value={option.value}
                      checked={selectedShowerTime === option.value}
                      onChange={handleShowerTimeChange}
                    />
                    <CheckBoxLabel>{option.label}</CheckBoxLabel>
                  </CheckBoxContainer>
                ))}
              </CheckBoxContainer>
            </OptionGroup>

            <OptionGroup>
              <Label>알람소리 선택</Label>
              <CheckBoxContainer>
                {options.alarm.map((option) => (
                  <CheckBoxContainer key={option.value}>
                    <CheckBox
                      type="checkbox"
                      value={option.value}
                      checked={selectedAlarm === option.value}
                      onChange={handleAlarmChange}
                    />
                    <CheckBoxLabel>{option.label}</CheckBoxLabel>
                  </CheckBoxContainer>
                ))}
              </CheckBoxContainer>
            </OptionGroup>

            <OptionGroup>
              <Label>물건 공유 여부 선택</Label>
              <CheckBoxContainer>
                {options.share.map((option) => (
                  <CheckBoxContainer key={option.value}>
                    <CheckBox
                      type="checkbox"
                      value={option.value}
                      checked={selectedShare === option.value}
                      onChange={handleShareChange}
                    />
                    <CheckBoxLabel>{option.label}</CheckBoxLabel>
                  </CheckBoxContainer>
                ))}
              </CheckBoxContainer>
            </OptionGroup>

            <OptionGroup>
              <Label>방에서 게임 여부 선택</Label>
              <CheckBoxContainer>
                {options.game.map((option) => (
                  <CheckBoxContainer key={option.value}>
                    <CheckBox
                      type="checkbox"
                      value={option.value}
                      checked={selectedGame.includes(option.value)}
                      onChange={handleGameChange}
                    />
                    <CheckBoxLabel>{option.label}</CheckBoxLabel>
                  </CheckBoxContainer>
                ))}
              </CheckBoxContainer>
            </OptionGroup>

            <OptionGroup>
              <Label>방에서 공부 여부 선택</Label>
              <CheckBoxContainer>
                {options.study.map((option) => (
                  <CheckBoxContainer key={option.value}>
                    <CheckBox
                      type="checkbox"
                      value={option.value}
                      checked={selectedStudy.includes(option.value)}
                      onChange={handleStudyChange}
                    />
                    <CheckBoxLabel>{option.label}</CheckBoxLabel>
                  </CheckBoxContainer>
                ))}
              </CheckBoxContainer>
            </OptionGroup>

            <OptionGroup>
              <Label>방에서 음식물 섭취 여부 선택</Label>
              <CheckBoxContainer>
                {options.food.map((option) => (
                  <CheckBoxContainer key={option.value}>
                    <CheckBox
                      type="checkbox"
                      value={option.value}
                      checked={selectedFood.includes(option.value)}
                      onChange={handleFoodChange}
                    />
                    <CheckBoxLabel>{option.label}</CheckBoxLabel>
                  </CheckBoxContainer>
                ))}
              </CheckBoxContainer>
            </OptionGroup>

            <OptionGroup>
              <Label>청소 주기 선택</Label>
              <Select
                value={selectedCleaning}
                onChange={setSelectedCleaning}
                options={options.cleaning}
                placeholder="청소 주기를 선택하세요"
              />
            </OptionGroup>

            <OptionGroup>
              <Label>MBTI 선택</Label>
              <Select
                value={selectedMbti}
                onChange={setSelectedMbti}
                options={options.mbti}
                placeholder="MBTI를 선택하세요"
              />
            </OptionGroup>

            <SaveButton onClick={handleSaveProfile}>프로필 저장</SaveButton>
          </Content>
        </Container>
      </div>
    </>
  );
}

export default Profile;

const GlobalStyle = createGlobalStyle`
    html, body, #root {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: Arial, sans-serif;
        background-color: #fef9f6; /* 부드러운 톤의 배경색 */
    }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start; /* 상단 여백 */
  padding: 50px 20px;
  background-color: #fef9f6; /* 배경 색 */
  min-height: 100vh;
  align-items: flex-start; /* 상단 여백 조정 */
  margin-top: 200px; /* 네브바와 겹치지 않도록 여백 추가 */
`;

const Content = styled.div`
  max-width: 800px;
  width: 100%;
  padding: 40px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  border: 2px solid #a72b0c; /* 포인트 색으로 강조 */
`;

const InputGroup = styled.div`
  margin-bottom: 5px; /* 줄 간격 조정 */
  text-align: left;
`;

const TextInput = styled.input`
  padding: 12px;
  margin-top: 8px;
  border: 1px solid #ddd;
  border-radius: 8px;
  width: 100%;
  box-sizing: border-box;
  font-size: 14px;

  &:focus {
    border-color: #a72b0c;
    outline: none;
    box-shadow: 0 0 6px rgba(167, 43, 12, 0.5);
  }
`;

const OptionGroup = styled.div`
  margin-top: 20px;
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 15px; /* 간격 조정 */
`;

const CheckBoxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px; /* 줄 간격 조정 */
`;

const CheckBoxLabel = styled.label`
  margin-left: 10px;
  font-size: 14px;
  color: #333;
`;

const CheckBox = styled.input`
  margin-right: 5px;
`;

const SaveButton = styled.button`
  margin-top: 30px;
  padding: 15px 25px;
  background-color: #a72b0c;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #87200a;
    transform: translateY(-3px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }
`;

const Title = styled.h1`
  font-size: 28px;
  color: #a72b0c; /* 포인트 색으로 제목 강조 */
  margin-bottom: 30px;
  text-align: center;
`;

const SectionSubtitle = styled.h3`
  font-size: 20px;
  color: #a72b0c; /* 포인트 색 활용 */
  margin: 30px 0px;
  text-align: center;
  font-weight: 600px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: bold;
  color: #a72b0c; /* 포인트 색 강조 */
  margin-bottom: 5px;
  display: block;
`;

const CheckBoxWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px; /* 줄 간격 조정 */
  color: #a72b0c; /* 포인트 색 강조 */
`;
