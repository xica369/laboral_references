const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
    const data = {
        "message": "Bienvenido"
    };
    res.json(data);
});

module.exports = router;