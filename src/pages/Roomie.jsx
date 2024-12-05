//Roomie.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import tempImage from "../images/ppotto.png";

// 글로벌 스타일 설정
const GlobalStyle = createGlobalStyle`
  html, body, #root {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Arial, sans-serif;
  }
`;

function Roomie() {
    const navigate = useNavigate();

    // 임시 데이터 (프로필 정보)
    const roomieData = {
        name: '김소정',
        year: '21학번',
        department: '인공지능융합대학',
        dormPeriod: '6개월',
        wakeUpTime: '09:00',
        sleepTime: '23:00',
        lightsOut: '22:00',
        showerTime: '귀가 후',
        smoking: '비흡연자',
        sleepHabit: ['없음','잠꼬대'],
        lifestyle: '아침형',
        alarmSensitivity: '둔감',
        shareItems: '공유해요',
        gaming: 'PC 게임',
        studying: '불 켜고 해도 돼요',
        eating: '간단한 간식',
        cleaningFrequency: '일주일에 한 번',
        mbti: 'INFP'
    };

    

    return (
        <>
        <GlobalStyle />
        <Container>
            <ProfileImage src={tempImage} alt="Roommate Profile" />
            <ProfileInfo>
                <ProfileText> {roomieData.name}</ProfileText>
                <ProfileText> {roomieData.year}</ProfileText>
                <ProfileText> {roomieData.department}</ProfileText>
                <ProfileText> {roomieData.dormPeriod}</ProfileText>
                <ProfileText> {roomieData.wakeUpTime}</ProfileText>
                <ProfileText> {roomieData.sleepTime}</ProfileText>
                <ProfileText> {roomieData.lightsOut}</ProfileText>
                <ProfileText> {roomieData.showerTime}</ProfileText>
                <ProfileText> {roomieData.smoking}</ProfileText>
                <ProfileText> {roomieData.sleepHabit.join(', ')}</ProfileText>
                <ProfileText> {roomieData.lifestyle}</ProfileText>
                <ProfileText> {roomieData.alarmSensitivity}</ProfileText>
                <ProfileText> {roomieData.shareItems}</ProfileText>
                <ProfileText> {roomieData.gaming}</ProfileText>
                <ProfileText> {roomieData.studying}</ProfileText>
                <ProfileText> {roomieData.eating}</ProfileText>
                <ProfileText> {roomieData.cleaningFrequency}</ProfileText>
                <ProfileText> {roomieData.mbti}</ProfileText>
            </ProfileInfo>
            
        </Container>
        </>
    );
}

export default Roomie;


const Container = styled.div`
  width: 100%;
  padding: 20px; /* 내부 여백 */
  margin-top: 200px;
  display: flex;
  flex-direction: column;
  align-items: center; /* 모든 콘텐츠를 중앙 정렬 */
  gap: 20px;
`;

const ProfileImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%; /* 원형 이미지 */
  object-fit: cover; /* 이미지 비율 유지 */
`;

const ProfileInfo = styled.div`
  width: 20%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  font-size: 18px;
  padding: 30px;
  border: 2px solid #a72b0c;
  border-radius: 10px;
  background-color: white;
`;

const ProfileText = styled.div`
  text-align: left;
`;
