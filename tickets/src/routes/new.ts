import express, {Request, Response} from 'express';
import {check} from 'express-validator';
import {requireAuth, validateRequest} from '@aaatickets/common';
import {Ticket} from '../models/ticket';
import {TicketCreatedPublisher} from "../events/publishers/ticket-created-publisher";
import {natsWrapper} from "../nats-wrapper";

const router = express();


router.post(
    '/api/tickets',
    requireAuth,
    [
        check('title').not().isEmpty().withMessage('Title is required'),
        check('price')
            .isFloat({gt: 0})
            .withMessage('Price must be greater than 0'),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const {title, price} = req.body;

        const ticket = Ticket.build({
            title,
            price,
            userId: req.currentUser!.id,
        });
        await ticket.save();

        // we use await here  because we want send created ticket event first then return created ticket response
        await new TicketCreatedPublisher(natsWrapper.client).publish({
            id: ticket.id,
            title: ticket.title,
            price: ticket.price,
            userId: ticket.userId,
            version: ticket.version
        });

        res.status(201).send(ticket);
    }
);

export {router as createTicketRouter};
