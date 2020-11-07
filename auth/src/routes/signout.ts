import express from 'express';

const router = express();

router.post('/api/users/signout', (req, res) => {
    req.session = null;

    res.send({});
});

export {router as signoutRouter};
