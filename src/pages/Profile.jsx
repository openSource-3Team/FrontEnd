// Profile.jsx
import React, { useState, useRef, useEffect } from 'react';
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

    // New states for name and profile picture
    const [userName, setUserName] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    
    const handleProfilePictureChange = (event) => {
        const file = event.target.files[0];
        if (!file) return; // If no file is selected, exit
        setProfilePicture(file);

        // Create a preview URL
        const newPreviewUrl = URL.createObjectURL(file);
        setPreviewUrl(newPreviewUrl);
    };

    // Cleanup preview URL to avoid memory leaks
    useEffect(() => {
        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);


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
            <Container>
            <Content>
            <h1>프로필 세팅</h1>
            <p>여기에 사용자 프로필 설정 양식을 작성하세요.</p>

            {/* New fields for name and profile picture */}
            {/* User name input */}
            <InputGroup>
                <label htmlFor="userName">이름:</label>
                <TextInput
                    type="text"
                    id="userName"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="이름을 입력하세요"
                />
            </InputGroup>

            {/* Profile picture upload */}
            <InputGroup>
                <label htmlFor="profilePicture">프로필 사진:</label>
                <FileInput
                    type="file"
                    id="profilePicture"
                    onChange={handleProfilePictureChange}
                    accept="image/*"
                />
                {previewUrl && (
                    <PreviewImage src={previewUrl} alt="Profile Preview" />
                )}
            </InputGroup>

            <h3>매칭 프로필 옵션 세팅</h3>

            {/* Options for gender, dorm, etc. */}
            <OptionGroup>
                <h4>성별 선택</h4>
                <CheckBoxContainer>
                    {options.gender.map((option) => (
                        <CheckBoxContainer key={option.value}>
                            <CheckBox
                                type="radio"
                                name="gender"
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
            </Content>
        </Container>
        </div>
    );
}

export default Profile;

// Styled-components

const Container = styled.div`
    display: flex;
    justify-content: center; /* 가로 중앙 정렬 */
    align-items: center; /* 세로 중앙 정렬 */
    height: 100vh; /* 화면 전체 높이 */
    box-sizing: border-box; /* 패딩 포함 크기 계산 */
    padding-top: 900px; /* 네비게이션 바 높이만큼 여백 추가 */
`;

const Content = styled.div`
    max-width: 600px;
    width: 100%;
    padding: 20px;
    background: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const InputGroup = styled.div`
    margin-bottom: 15px;
    display: flex;
    flex-direction: column;
`;

const TextInput = styled.input`
    padding: 8px;
    margin-top: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

const FileInput = styled.input`
    margin-top: 5px;
`;

const PreviewImage = styled.img`
    margin-top: 10px;
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 50%;
    border: 1px solid #ccc;
`;

const OptionGroup = styled.div`
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

const CheckBoxContainer = styled.div`
    display: flex;
    align-items: center;
    margin: 5px 0;
`;

const CheckBoxLabel = styled.label`
    margin-left: 5px;
`;

const CheckBox = styled.input`
    margin-right: 5px;
`;