type Listener = {
  [id: string]: {
    event: string;
    element: HTMLElement;
    handler: (e: Event) => void;
  };
};

export class EventListener {
  private readonly listeners: Listener = {};

  add(
    listenerId: string,
    event: string,
    element: HTMLElement,
    handler: (e: Event) => void
  ) {
    this.listeners[listenerId] = {
      event,
      element,
      handler,
    };
    element.addEventListener(event, handler);
  }
}
