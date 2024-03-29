import express from 'express';
import {currentUser} from '@aaatickets/common';

const router = express();

router.get('/api/users/currentuser', currentUser, (req, res) => {
    res.send({currentUser: req.currentUser || null});
});

export {router as currentUserRouter};
