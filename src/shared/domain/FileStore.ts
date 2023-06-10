import { DomainEvent } from './DomainEvent';

export interface EventDomainEmitter {
	publish(events: Array<DomainEvent>): Promise<void>;
}
