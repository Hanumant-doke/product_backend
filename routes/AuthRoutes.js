const { Login, GetUser, createUser, deleteUser } = require("../controller/AuthController");
const { userVerification } = require("../middlewares/AuthMiddleware");
const router = require("express").Router();

router.post('/', userVerification)
router.post("/login", Login);
router.get('/get-user', GetUser);
router.post('/create-user', createUser);
router.delete('/delete-user/:userId', deleteUser)


module.exports = router;