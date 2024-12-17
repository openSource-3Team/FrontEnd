import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { FaHeart, FaRegHeart } from 'react-icons/fa'; // 하트 아이콘 추가
function PostView() {
  const navigate = useNavigate();
  const { postId } = useParams(); // URL 파라미터에서 postId 추출
  const [post, setPost] = useState(null);
  const [userid, setUserid] = useState(null); // 로컬 스토리지에서 userid 저장
  const [comments, setComments] = useState([]); // 댓글 상태
  const [newComment, setNewComment] = useState(''); // 새로운 댓글 내용
  const [likes, setLikes] = useState(0); // 좋아요 수 상태
  const [userLiked, setUserLiked] = useState(false); // 사용자가 좋아요를 눌렀는지 확인

  useEffect(() => {
    // 로컬 스토리지에서 userid 가져오기
    const storedUserid = localStorage.getItem('userid');
    if (storedUserid) {
      setUserid(parseInt(storedUserid, 10)); // 문자열을 정수로 변환
    }

    const fetchPost = async () => {
      try {
        const response = await fetch(
          `http://15.165.223.198:3000/posts/${postId}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setPost(data.result);
          setLikes(data.result.likes); // 좋아요 수 설정
        } else {
          console.error('게시물 조회 실패');
        }
      } catch (error) {
        console.error('게시물 조회 중 오류:', error);
      }
    };

    const fetchComments = async () => {
      try {
        const response = await fetch(
          `http://15.165.223.198:3000/comments/${postId}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setComments(data.result?.reverse() || []);
        } else {
          console.error('댓글 조회 실패');
        }
      } catch (error) {
        console.error('댓글 조회 중 오류:', error);
      }
    };

    fetchPost();
    fetchComments();
  }, [postId]);

  const handleAddComment = async () => {
    if (!userid) {
      alert('로그인이 필요합니다. 로그인 페이지로 이동합니다.');
      navigate('/login'); // 로그인 페이지로 이동
      return;
    }
    if (!newComment.trim()) return;

    try {
      const response = await fetch('http://15.165.223.198:3000/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postId: parseInt(postId),
          authorId: parseInt(userid),
          content: newComment,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setComments((prev) => [...prev, data.result]); // 새 댓글 추가
        setNewComment(''); // 입력 필드 초기화
      } else {
        console.error('댓글 생성 실패');
      }
    } catch (error) {
      console.error('댓글 생성 중 오류:', error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const response = await fetch(
        `http://15.165.223.198:3000/comments/${commentId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.ok) {
        setComments((prev) =>
          prev.filter((comment) => comment.id !== commentId)
        );
      } else {
        console.error('댓글 삭제 실패');
      }
    } catch (error) {
      console.error('댓글 삭제 중 오류:', error);
    }
  };

  const handleEditComment = async (commentId, updatedContent) => {
    try {
      const response = await fetch(
        `http://15.165.223.198:3000/comments/${commentId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ content: updatedContent }),
        }
      );

      if (response.ok) {
        setComments((prev) =>
          prev.map((comment) =>
            comment.id === commentId
              ? { ...comment, content: updatedContent }
              : comment
          )
        );
      } else {
        console.error('댓글 수정 실패');
      }
    } catch (error) {
      console.error('댓글 수정 중 오류:', error);
    }
  };
  const handleLike = async () => {
    const endpoint = userLiked
      ? `http://15.165.223.198:3000/posts/${postId}/dislike`
      : `http://15.165.223.198:3000/posts/${postId}/like`;

    try {
      const response = await fetch(endpoint, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setLikes((prev) => (userLiked ? prev - 1 : prev + 1)); // 좋아요 증가/감소
        setUserLiked(!userLiked); // 좋아요 상태 토글
      } else {
        console.error('좋아요 변경 실패');
      }
    } catch (error) {
      console.error('좋아요 변경 중 오류:', error);
    }
  };

  const goBack = () => {
    navigate('/community');
  };

  // 수정 버튼 클릭 시 /edit/:id로 이동
  const handleEdit = () => {
    navigate(`/write/${postId}`);
  };

  if (post === null) {
    return (
      <Container>
        <PostCard>
          <PostTitle>게시물을 불러오는 중...</PostTitle>
          <ButtonGroup>
            <Button onClick={goBack}>돌아가기</Button>
          </ButtonGroup>
        </PostCard>
      </Container>
    );
  }

  return (
    <Container>
      <PostCard>
        <PostHeader>
          <div>작성자: {post.authorId}</div>
          <div>작성일: {new Date(post.createdAt).toLocaleString()}</div>
        </PostHeader>

        <PostTitle>{post.title}</PostTitle>
        <PostContent>{post.content}</PostContent>

        <ButtonGroup>
          <LeftGroup>
            <LikeWrapper onClick={handleLike}>
              {userLiked ? (
                <FaHeart size="20px" color="#a72b0c" />
              ) : (
                <FaRegHeart size="20px" />
              )}
              <LikeCount>{likes}</LikeCount>
            </LikeWrapper>
          </LeftGroup>

          <RightGroup>
            {userid === post.authorId && (
              <Button
                onClick={handleEdit}
                style={{
                  backgroundColor: 'white',
                  border: '2px solid #a72b0c',
                  color: '#a72b0c',
                  marginRight: '10px',
                }}
              >
                수정 / 삭제
              </Button>
            )}
            <Button onClick={goBack}>돌아가기</Button>
          </RightGroup>
        </ButtonGroup>

        <CommentsSection>
          <h3>댓글</h3>
          <CommentList>
            {comments.map((comment) => (
              <Comment key={comment.id}>
                <CommentAuthor>작성자: {comment.authorId}</CommentAuthor>
                <CommentText>{comment.content}</CommentText>
                {userid === comment.authorId && (
                  <CommentActions>
                    <ActionButton
                      onClick={() =>
                        handleEditComment(
                          comment.id,
                          prompt('수정할 내용 입력:', comment.content)
                        )
                      }
                    >
                      수정
                    </ActionButton>
                    <ActionButton
                      onClick={() => handleDeleteComment(comment.id)}
                    >
                      삭제
                    </ActionButton>
                  </CommentActions>
                )}
              </Comment>
            ))}
          </CommentList>
          <NewComment>
            <NewCommentInput
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="댓글을 입력하세요"
            />
            <Button onClick={handleAddComment}>댓글 작성</Button>
          </NewComment>
        </CommentsSection>
      </PostCard>
    </Container>
  );
}

export default PostView;

// 스타일링

const Container = styled.div`
  width: 210vh;
  display: flex;
  justify-content: center;

  align-items: flex-start; /* 상단 여백 조정 */
  margin-top: 200px; /* 네브바와 겹치지 않도록 여백 추가 */

  font-family: 'Arial', sans-serif;

  /* 반응형 고려 */
  @media (max-width: 768px) {
    width: 100vw;
    margin-top: 120px;
  }
`;

const PostCard = styled.div`
  width: 100%;
  max-width: 1200px;
  background-color: #ffffff;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  border: 2px solid #a72b0c;
`;

const PostHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 14px;
  font-weight: 500;
  color: #666;
  margin-bottom: 20px;
`;

const PostTitle = styled.h1`
  font-size: 27px;
  font-weight: 700;
  color: #333;
  margin-bottom: 20px;
  padding: 0 0 30px 0;
  border-bottom: 2px solid #a72b0c;
`;

const PostContent = styled.p`
  font-size: 20px;
  line-height: 1.8;
  color: #555;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 30px;
  height: 30vh;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LeftGroup = styled.div`
  display: flex;
  align-items: center;
`;

const RightGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  padding: 12px 40px;
  background-color: #a72b0c;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #87200a;
    transform: translateY(-3px);
  }

  &:active {
    background-color: #a72b0c;
    transform: translateY(1px);
  }
`;

const CommentsSection = styled.div`
  margin-top: 30px;
`;

const CommentList = styled.div`
  margin-bottom: 20px;
`;

const Comment = styled.div`
  border-bottom: 1px solid #ccc;
  padding: 10px 0;
`;

const CommentAuthor = styled.div`
  font-weight: bold;
  color: #333;
`;

const CommentText = styled.div`
  margin-top: 5px;
  color: #555;
`;

const CommentActions = styled.div`
  margin-top: 10px;
  display: flex;
  gap: 10px;
`;

const ActionButton = styled.button`
  padding: 5px 10px;
  background-color: #fff;
  color: #a72b0c;
  border: 1px solid #a72b0c;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #a72b0c;
    color: #fff;
  }
`;

const NewComment = styled.div`
  display: flex;
  gap: 10px;
`;

const NewCommentInput = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const LikeWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

const LikeCount = styled.span`
  font-size: 16px;
  color: #333;
`;
