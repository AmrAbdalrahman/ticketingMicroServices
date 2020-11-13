import {Publisher, OrderCreatedEvent, Subjects} from '@aaatickets/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
    //subject: Subjects.OrderCreated = Subjects.OrderCreated;
    readonly subject = Subjects.OrderCreated;
}
