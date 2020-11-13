import {Subjects, Publisher, OrderCancelledEvent} from '@aaatickets/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
    //subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
    readonly subject = Subjects.OrderCancelled;
}
