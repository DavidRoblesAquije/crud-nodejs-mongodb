const { Router } = require('express');
const router = Router();

const { renderAlIndeX, renderAlAbout } = require('../controllers/index.controller');

router.get('/', renderAlIndeX);

router.get('/about', renderAlAbout);

module.exports = router;