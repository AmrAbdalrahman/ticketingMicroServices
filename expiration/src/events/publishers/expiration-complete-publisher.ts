import {
    Subjects,
    Publisher,
    ExpirationCompleteEvent,
} from '@aaatickets/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
    //subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
    readonly subject = Subjects.ExpirationComplete;
}
