import axios from 'axios'
import BaseApi from './BaseApi'

class CommentApi extends BaseApi {
  create (comment) {
    return axios.post(this.REACT_APP_SERVER_URL + '/comments', { comment })
  }

  getAllComments () {
    return axios.get(this.REACT_APP_SERVER_URL + '/comments')
  }

  delete (id) {
    return axios.delete(this.REACT_APP_SERVER_URL + '/comments/' + id)
  }
}

export default new CommentApi()
