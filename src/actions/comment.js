import CommentApi from '../api/CommentApi'
import ActionTypes from '../constants/actionTypes'

export function createComment (comment) {
  return dispatch => {
    dispatch(request())
    return CommentApi
      .create(comment)
      .then(resp => {
        return dispatch(success(resp.data))
      })
      .catch(error => {
        return dispatch(failure(error.response.data))
      })
  }

  function request () { return { type: ActionTypes.CREATE_COMMENT.REQUEST } }
  function success (data) { return { type: ActionTypes.CREATE_COMMENT.SUCCESS, payload: data } }
  function failure (error) { return { type: ActionTypes.CREATE_COMMENT.FAILURE, payload: error } }
}

export function getAllComments () {
  return dispatch => {
    dispatch(request())
    return CommentApi
      .getAllComments()
      .then(resp => {
        return dispatch(success(resp.data))
      })
      .catch(error => {
        return dispatch(failure(error.response.data))
      })
  }

  function request () { return { type: ActionTypes.GET_ALL_COMMENTS.REQUEST } }
  function success (data) { return { type: ActionTypes.GET_ALL_COMMENTS.SUCCESS, payload: data } }
  function failure (error) { return { type: ActionTypes.GET_ALL_COMMENTS.FAILURE, payload: error } }
}

export function deleteComment (id) {
  return dispatch => {
    dispatch(request())
    return CommentApi
      .delete(id)
      .then(resp => {
        return dispatch(success(resp.data))
      })
      .catch(error => {
        return dispatch(failure(error.response.data))
      })
  }

  function request () { return { type: ActionTypes.DELETE_COMMENT.REQUEST } }
  function success (data) { return { type: ActionTypes.DELETE_COMMENT.SUCCESS, payload: data } }
  function failure (error) { return { type: ActionTypes.DELETE_COMMENT.FAILURE, payload: error } }
}
