import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

function Community() {
  const dummyData = Array.from({ length: 24 }, (_, i) => ({
    title: `게시글 제목 ${i + 1}`,
    author: `작성자 ${String.fromCharCode(65 + i)}`,
    date: `2024-11-29`,
  }));

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = dummyData.slice(indexOfFirstItem, indexOfLastItem);

  const nextPage = () => {
    if (currentPage < Math.ceil(dummyData.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const navigate = useNavigate();

  const goToWritePage = () => {
    navigate('/write'); // /write 페이지로 이동
  };

  const goToPostPage = () => {
    navigate('/postview'); // /write 페이지로 이동
  };

  return (
    <Container>
      <TableHeader>
        <div>작성물</div>
        <div>작성자</div>
        <div>작성시간</div>
      </TableHeader>

      <ContentContainer>
        {currentItems.map((item, index) => (
          <ContentRow onClick={goToPostPage} key={index}>
            <div>{item.title}</div>
            <div>{item.author}</div>
            <div>{item.date}</div>
          </ContentRow>
        ))}
      </ContentContainer>

      <ButtonGroup>
        <Button onClick={goToWritePage}>WRITE</Button>
        {currentPage > 1 && <Button onClick={prevPage}>PREV</Button>}
        {currentPage < Math.ceil(dummyData.length / itemsPerPage) && (
          <Button onClick={nextPage}>NEXT</Button>
        )}
      </ButtonGroup>
    </Container>
  );
}

export default Community;

const Container = styled.div`
  max-width: 1200px;
  width: 100%;
  position: fixed;
  top: 23%;
  left: 25%;
  color: #333;
  font-size: 19px;
  font-family: 'Arial', sans-serif;
`;

const TableHeader = styled.div`
  font-size: 20px;
  display: grid;
  grid-template-columns: 8fr 2.1fr 0.8fr;
  padding: 12px 30px;
  border: 2px solid #a72b0c;
  background-color: #ffffff;
  font-weight: bold;
  border-radius: 12px;
  margin-bottom: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
`;

const ContentContainer = styled.div`
  border-radius: 0 0 12px 12px;
  overflow: hidden;
`;

const ContentRow = styled.div`
  display: grid;
  grid-template-columns: 8fr 2fr 1fr;
  padding: 24px;
  justify-items: start;
  align-items: center;
  border-radius: 12px;
  border: 2px solid #a72b0c;
  margin-bottom: 12px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    background-color: #f9e9e5;
    transform: scale(1.0009);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 12px 40px;
  margin: 0 8px;
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

  &:first-child {
    color: #a72b0c;
    background-color: white;
    border: 2px solid #a72b0c;
    align-self: flex-start; /* 첫 번째 버튼만 위쪽에 정렬 */
    &:hover {
      background-color: #f9e9e5;
      transform: translateY(-6px);
    }
  }
`;
