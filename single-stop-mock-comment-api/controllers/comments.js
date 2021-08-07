const comments = {
  "1584765206902": {
    "body": "Hello world",
    "email": "johndoe@coolguy.com",
    "date": "3/21/2020",
    "time": "12:33:26 AM",
    "id": "1584765206902"
  }
}

const addComment = comment => {
  const [date, time] = new Date().toLocaleString().split(', ')
  const id = new Date().getTime() + ''
  const commentWithDateAndTime = {
    ...comment,
    date,
    time,
    id
  }
  comments[id] = commentWithDateAndTime
  return commentWithDateAndTime
}

const removeComment = id => {
  delete comments[id]
  return {id}
}

const getComments = () => comments

module.exports = {
  addComment,
  getComments,
  removeComment
}