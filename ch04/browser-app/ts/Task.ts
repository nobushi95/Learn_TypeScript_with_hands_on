import { v4 as uuid } from 'uuid';

export class Task {
    readonly id;
    title;

    constructor(properties: { tittle: string }) {
        this.id = uuid();
        this.title = properties.tittle;
    }
}