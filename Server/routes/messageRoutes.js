const {addMessages, getMessages} = require('../controller/messageController');

const router = require('express').Router();

router.post("/add-message", addMessages);
router.post("/get-message", getMessages);

module.exports = router;