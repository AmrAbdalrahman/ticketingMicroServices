import {Subjects, Publisher, PaymentCreatedEvent} from '@aaatickets/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
    //subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
    readonly subject = Subjects.PaymentCreated;
}
