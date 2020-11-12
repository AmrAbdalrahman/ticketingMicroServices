import {Publisher, Subjects, TicketCreatedEvent} from "@aaatickets/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    //subject: Subjects.TicketCreated = Subjects.TicketCreated;
    readonly subject = Subjects.TicketCreated;
}
