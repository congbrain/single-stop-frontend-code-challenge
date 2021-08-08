var express = require('express')
var router = express.Router()
const commentsController = require('./../controllers/comments')

router.get('/', (req, res, next) => res.json(commentsController.getComments()))

router.post('/', (req, res, next) => {
  console.log(req.body);
  res.header("Access-Control-Allow-Headers","*");
  const { comment: requestComment } = req.body

  if (!requestComment) {
    return res.status(400).send({error: 'Malformed request payload. The correct shape is: { "comment": { "body": "hello world", "email": "johndoe@gmail.com"}'})
  }

  const { body, email } = requestComment

  if (!body) {
    return res.status(400).send({error: 'comment.body is a required field'})
  }

  if (!email) {
    return res.status(400).send({error: 'comment.email is a required field'})
  }

  const responseComment = commentsController.addComment(requestComment)

  return res.status(201).json(responseComment)
})

router.delete('/:id', (req, res, next) => {
  const { id } = req.params
  const comments = commentsController.removeComment(id)
  res.json(comments)
})

module.exports = router
