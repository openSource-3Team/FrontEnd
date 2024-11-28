// Profile.jsx
import React, { useState } from 'react';
import Select from 'react-select';
import styled from 'styled-components';

const options = {
    gender: [
        { value: '남성', label: '남성' },
        { value: '여성', label: '여성' },
    ],
    dorm: [
        { value: '', label: '기숙사' },
        { value: '4개월', label: '4개월' },
        { value: '6개월', label: '6개월' },
        { value: '12개월', label: '12개월' },
    ],
    major: [
        { value: '', label: '단과대' },
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
        { value: '', label: '학번' },
        { value: '16', label: '16' },
        { value: '17', label: '17' },
        { value: '18', label: '18' },
        { value: '19', label: '19' },
        { value: '20', label: '20' },
        { value: '21', label: '21' },
        { value: '22', label: '22' },
        { value: '23', label: '23' },
        { value: '24', label: '24' },
    ],
    birthYear: [
        { value: '', label: '출생연도' },
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
        {value: '코골이', label: '코골이'},
        {value: '이갈이', label: '이갈이'},
        {value: '잠꼬대', label: '잠꼬대'},
        {value: '불면증', label: '불면증'},
        {value: '몽유병', label: '몽유병'},
        {value: '가위눌림', label: '가위눌림'},
    ],
};

function Profile() {
    const [selectedGender, setSelectedGender] = useState('');
    const [selectedDorm, setSelectedDorm] = useState(null);
    const [selectedMajor, setSelectedMajor] = useState(null);
    const [selectedStudentNumber, setSelectedStudentNumber] = useState(null);
    const [selectedBirthYear, setSelectedBirthYear] = useState(null);
    const [selectedIsSmoker, setSelectedIsSmoker] = useState(null); 
    const [selectedLifestyle, setSelectedLifestyle] = useState([]);
    const [selectedSleephabits, setSelectedSleephabits] = useState([]);

    const handleGenderChange = (event) => {
        setSelectedGender(event.target.value);
    };

    const handleLifestyleChange = (event) => {
        const value = event.target.value;
        setSelectedLifestyle((prev) => {
            if (prev.includes(value)) {
                return prev.filter((lifestyle) => lifestyle !== value);
            } else {
                return [...prev, value];
            }
        });
    };

    const handleIsSmokerChange = (event) => {
        setSelectedIsSmoker(event.target.value);
    };

    const handleSleephabitsChange = (event) => {
        const value = event.target.value;
        setSelectedSleephabits((prev) => {
            if (prev.includes(value)) {
                return prev.filter((sleephabits) => sleephabits !== value);
            } else {
                return [...prev, value];
            }
        });
    };

    return (
        <div>
            <h1>프로필 세팅</h1>
            <p>여기에 사용자 프로필 설정 양식을 작성하세요.</p>

            <h3>매칭 프로필 옵션 세팅</h3>

<OptionGroup>
            <h4>성별 선택</h4>
            <CheckBoxContainer>
                {options.gender.map((option) => (
                    <CheckBoxContainer key={option.value}>
                        <CheckBox
                            type="checkbox"
                            value={option.value}
                            checked={selectedGender === option.value}
                            onChange={handleGenderChange}
                        />
                        <CheckBoxLabel>{option.label}</CheckBoxLabel>
                    </CheckBoxContainer>
                ))}
            </CheckBoxContainer>

            <h4>기숙사 선택</h4>
            <Select
                value={selectedDorm}
                onChange={setSelectedDorm}
                options={options.dorm}
                placeholder="기숙사를 선택하세요"
            />

            <h4>단과대 선택</h4>
            <Select
                value={selectedMajor}
                onChange={setSelectedMajor}
                options={options.major}
                placeholder="단과대를 선택하세요"
            />

            <h4>학번 선택</h4>
            <Select
                value={selectedStudentNumber}
                onChange={setSelectedStudentNumber}
                options={options.studentNumber}
                placeholder="학번을 선택하세요"
            />

            <h4>출생연도 선택</h4>
            <Select
                value={selectedBirthYear}
                onChange={setSelectedBirthYear}
                options={options.birthYear}
                placeholder="출생연도를 선택하세요"
            />

            <h4>생활패턴 선택</h4>
            <CheckBoxContainer>
                {options.lifestyle.map((option) => (
                    <CheckBoxContainer key={option.value}>
                        <CheckBox
                            type="checkbox"
                            value={option.value}
                            checked={selectedLifestyle.includes(option.value)}
                            onChange={handleLifestyleChange}
                        />
                        <CheckBoxLabel>{option.label}</CheckBoxLabel>
                    </CheckBoxContainer>
                ))}
            </CheckBoxContainer>

            <h4>흡연여부 선택</h4>
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

            <h4>수면습관 선택</h4>
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
        </div>
    );
}

export default Profile;

// Styled-components

const OptionGroup = styled.div`
   display:flex;
  flex-direction: column;
  gap : 15px
`;

const CheckBoxContainer = styled.div`
    display: flex;
    align-items: center;
    margin: 10px 0;
`;

const CheckBoxLabel = styled.label`
    margin-left: 5px;
`;

const CheckBox = styled.input`
    margin-right: 5px;
`;