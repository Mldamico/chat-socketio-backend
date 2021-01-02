const { Router } = require('express');

const router = Router();

router.post('/new', (req, res) => {
  res.json({
    ok: true,
    msg: 'Register',
  });
});

router.post('/', (req, res) => {
  res.json({
    ok: true,
    msg: 'Login',
  });
});

router.get('/renew', (req, res) => {
  res.json({
    ok: true,
    msg: 'renew',
  });
});

module.exports = router;
