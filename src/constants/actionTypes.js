import { defineAction } from 'redux-define'

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  GET_ALL_COMMENTS: defineAction('GET_ALL_COMMENTS', ['REQUEST', 'SUCCESS', 'FAILURE']),
  CREATE_COMMENT: defineAction('CREATE_COMMENT', ['REQUEST', 'SUCCESS', 'FAILURE']),
  DELETE_COMMENT: defineAction('DELETE_COMMENT', ['REQUEST', 'SUCCESS', 'FAILURE'])
}
