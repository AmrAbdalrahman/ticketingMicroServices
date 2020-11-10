import express, {Request, Response} from 'express';
import {check} from 'express-validator';
import {
    validateRequest,
    NotFoundError,
    requireAuth,
    NotAuthorizedError,
} from '@aaatickets/common';
import {Ticket} from '../models/ticket';

const router = express();

router.put(
    '/api/tickets/:id',
    requireAuth,
    [
        check('title').not().isEmpty().withMessage('Title is required'),
        check('price')
            .isFloat({gt: 0})
            .withMessage('Price must be provided and must be greater than 0'),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const ticket = await Ticket.findById(req.params.id);

        if (!ticket) {
            throw new NotFoundError();
        }

        if (ticket.userId !== req.currentUser!.id) {
            throw new NotAuthorizedError();
        }

        ticket.set({
            title: req.body.title,
            price: req.body.price,
        });
        await ticket.save();

        res.send(ticket);
    }
);

export {router as updateTicketRouter};
