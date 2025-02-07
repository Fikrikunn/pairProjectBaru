const express = require('express')
// const category = require('./category')
// const recipe = require('./recipe')
const Controller = require('../controllers/controller')
const { isLoggedIn, isAdmin } = require('../middlewares/auth')
const router = express.Router()


router.get('/', Controller.showHomePage)

router.get('/register', Controller.showRegisterForm)
router.post('/register', Controller.postRegisterForm)

router.get('/login', Controller.showLoginForm)
router.post('/login', Controller.postLoginForm)

//   router.use(isLoggedIn)

router.get('/profile', isLoggedIn, Controller.showLobby)

router.get('/halamanAdmin', isLoggedIn, isAdmin, Controller.showAllUsers)

router.get('/profile/edit/:id', isLoggedIn, Controller.showEditForm)
router.post('/profile/edit/:id', isLoggedIn, Controller.postEditForm)

router.get('/profile/delete/:id', isLoggedIn, Controller.deleteProfile)

router.get('/delete/byAdmin/:id', isLoggedIn, isAdmin, Controller.deleteByAdmin)


router.get('/symptom/add', isLoggedIn, Controller.showAddSymptomForm)
router.post('/symptom/add', isLoggedIn, Controller.postAddSymptomForm)

router.get('/profile/add', isLoggedIn, Controller.showProfileAdd)
router.post('/profile/add', isLoggedIn, Controller.postProfileAdd)





// router.use('/categories', category)
// router.use('/recipes', recipe)


module.exports = router