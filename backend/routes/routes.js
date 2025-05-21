const express = require('express')
const userController = require('../controller/userController');
const todoController = require('../controller/todoController');

const publicRouter = express.Router()
const privateRouter = express.Router()

const authMiddleware = require('../middleware/authMiddleware')

// private router
privateRouter.use(authMiddleware)

privateRouter.get('/utente-autenticato', (req,res) =>{
    res.status(200).json({message: "sei autorizzato"});
})
privateRouter.get('/logout', userController.logout)
privateRouter.post('/add-todo', todoController.create)
privateRouter.delete('/delete', todoController.delete)
privateRouter.patch('/update', todoController.update)



// public router
publicRouter.post('/register', userController.create)
publicRouter.post('/login', userController.login)
publicRouter.get('/check-token', userController.check)


module.exports = {publicRouter, privateRouter}; 
