const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

// Если необходимо, можно добавить middleware для проверки JWT
router.post('/', projectController.createProject);
router.get('/', projectController.getProjects);

module.exports = router;
