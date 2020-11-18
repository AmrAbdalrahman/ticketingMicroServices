import express, {Request, Response} from 'express';
import {check} from 'express-validator';
import {
    validateRequest,
    NotFoundError,
    requireAuth,
    NotAuthorizedError, BadRequestError,
} from '@aaatickets/common';
import {Ticket} from '../models/ticket';
import {TicketUpdatedPublisher} from "../events/publishers/ticket-updated-publisher";
import {natsWrapper} from "../nats-wrapper";

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

        if (ticket.orderId) {
            throw new BadRequestError('Cannot edit a reserved ticket');
        }

        if (ticket.userId !== req.currentUser!.id) {
            throw new NotAuthorizedError();
        }

        ticket.set({
            title: req.body.title,
            price: req.body.price,
        });
        await ticket.save();

        //we don't await here because we need to publish updated ticket event before return updates ticket response
        new TicketUpdatedPublisher(natsWrapper.client).publish({
            id: ticket.id,
            title: ticket.title,
            price: ticket.price,
            userId: ticket.userId,
            version: ticket.version
        });

        res.send(ticket);
    }
);

export {router as updateTicketRouter};
