export interface ClickEvent {
    type: 'click';
}

export type ClickEventType = ClickEvent['type'];

export interface EventMap {
    'click': ClickEvent;
}

export interface EventTarget {
    addEventListener<K extends keyof EventMap>(type: K, listener: (ev: EventMap[K]) => void): void;
    dispatchEvent<K extends keyof EventMap>(ev: EventMap[K]): void;
}
