import { v4 as uuid } from 'uuid';

enum Status {
    Todo = 'TODO',
    Doing = 'DOING',
    Done = 'DONE',
};

export class Task {
    readonly id: string;
    title: string;
    status: Status;

    constructor(properties: { tittle: string }) {
        this.id = uuid();
        this.title = properties.tittle;
        this.status = Status.Todo;
    }
}