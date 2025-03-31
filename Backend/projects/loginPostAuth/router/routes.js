const express = require('express')
const router = express.Router()


const {
    login,
    register,
    create
} = require('../controllers/mainControllers');

const{
    validateRegister,
    validateLogin
} = require('../middleware/validators');

const userAuth = require('../middleware/userAuth');

router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);
router.post('/create', userAuth, create);



module.exports = router