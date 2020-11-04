import express from 'express';

const router = express();

router.post('/api/users/signin', (req, res) => {
    res.send('Hi there!');
});

export { router as signinRouter };
