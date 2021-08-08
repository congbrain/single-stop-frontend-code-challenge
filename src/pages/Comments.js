import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { createComment, getAllComments, deleteComment } from '../actions/comment'

const CommentsSection = styled.div`
  padding: 2rem;
  max-width: 60rem;
  margin: 0 auto;

  .error-msg {
    color: #ff0000;
  }
`

const Title = styled.h1`
  margin: 0 0 2rem;
`

const FormItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  
  label {
    min-width: 6rem;
    font-weight: bold;
  }

  input {
    width: 100%;
  }
`

const Button = styled.button`
  width: 100%;
  padding: 0.5rem 0;
  margin-bottom: 1rem;
`

const CommentItem = styled.div`
  margin-bottom: 1rem;

  .email {
    margin: 0 0 0.5rem;
    font-size: 18px;
    font-weight: 500;
  }

  .comment-content {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    div {
      padding-left: 1rem;
    }

    p {
      margin: 0 0 0.2rem;
    }

    .comment {
      font-size: 18px;
      font-weight: 500;
    }

    .date {
      font-size: 14px;
      color: #747474;
      font-weight: 400;
    }
  }
`

const Comments = () => {
  const dispatch = useDispatch()
  const [comment, setComment] = useState({
    body: '',
    email: ''
  })

  const [commentError, setCommentError] = useState({
    body: '',
    email: ''
  })

  const comments = useSelector(state => state.Comment.comments)

  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(email)
  }

  const validateInput = (value, name) => {
    if (!value) {
      setCommentError((commentError) => ({ ...commentError, [name]: 'This field should not be empty.' }))
      return false
    } else {
      if (name === 'email') {
        const emailValid = validateEmail(value)
        if (!emailValid) {
          setCommentError((commentError) => ({ ...commentError, [name]: 'Invalid e-mail address' }))
          return false
        } else {
          setCommentError((commentError) => ({ ...commentError, [name]: '' }))
          return true
        }
      } else {
        setCommentError((commentError) => ({ ...commentError, [name]: '' }))
        return true
      }
    }
  }

  const handleChange = (value, name) => {
    validateInput(value, name)
    setComment({ ...comment, [name]: value })
  }

  const handleCreateComment = async () => {
    const result = Object.keys(comment).map((key) => {
      return validateInput(comment[key], key)
    })

    const isInvalid = result.filter((r) => !r).length > 0

    if (isInvalid) {
      return
    }

    const resp = await dispatch(createComment(comment))

    if (resp && resp.type === 'CREATE_COMMENT_SUCCESS') {
      setComment({ body: '', email: '' })
    }
  }

  const handleDeleteComment = (id) => {
    dispatch(deleteComment(id))
  }

  useEffect(() => {
    dispatch(getAllComments())
  }, [dispatch])

  return (
    <CommentsSection data-testid='comments'>
      <Title>Comments{comments && comments.length > 0 ? '(' + comments.length + ')' : ''}</Title>
      <FormItem className='form-item'>
        <label htmlFor='email'>Email</label>
        <input type='email' id='email' name='email' value={comment.email} onChange={(e) => handleChange(e.target.value, 'email')} />
      </FormItem>
      {commentError.email && <p className='error-msg'>{commentError.email}</p>}
      <FormItem className='form-item'>
        <label htmlFor='comment'>Comment</label>
        <input type='text' value={comment.body} id='comment' name='comment' onChange={(e) => handleChange(e.target.value, 'body')} />
      </FormItem>
      {commentError.body && <p className='error-msg'>{commentError.body}</p>}
      <Button onClick={handleCreateComment} id='comment-add-btn' data-testid='comment-add-btn'>Add Comment</Button>
      {comments.map((comment, index) => (
        <CommentItem key={index}>
          <p className='email'>{comment.email}:</p>
          <div className='comment-content'>
            <div>
              <p className='comment'>{comment.body}</p>
              <p className='date'>{comment.date} at {comment.time}</p>
            </div>
            <button onClick={() => handleDeleteComment(comment.id)}>Delete</button>
          </div>
        </CommentItem>
      ))}
    </CommentsSection>
  )
}

export default Comments
