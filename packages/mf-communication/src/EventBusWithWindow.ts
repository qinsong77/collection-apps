import { getCache, setCache } from './cache';

const eventNameSpace = 'WindowsCustomEventName';

const CustomEventName = 'CustomEventName';

type EventName = string;
type PayLoad = Record<string, any>;
type CallBack = (payload: PayLoad) => void;

interface FuncHooks {
  publish(eventName: EventName, payload: PayLoad): void;
  subscribe(
    eventName: EventName,
    callback: CallBack,
    once?: boolean
  ): () => void;
  unSubscribe(eventName: EventName, callback: CallBack): void;
  hasTopic(eventName: EventName): boolean;
}

class EventBus implements FuncHooks {
  eventEmitter: Record<string, CallBack[]>;
  constructor() {
    this.eventEmitter = {};
    window.addEventListener(CustomEventName, (e: any) => {
      console.log(e);
      const { eventName, ...payload } = e.detail;
      const cbs = this.eventEmitter[eventName];
      if (Array.isArray(cbs)) {
        cbs.forEach((cb) => cb(payload));
      }
    });
  }
  publish(eventName: EventName, payload: PayLoad) {
    window.dispatchEvent(
      new CustomEvent(CustomEventName, {
        detail: {
          eventName,
          ...payload,
        },
      })
    );
  }

  subscribe(
    eventName: EventName,
    callback: CallBack,
    once?: boolean
  ): () => void {
    if (!this.hasTopic(eventName)) {
      this.eventEmitter[eventName] = [];
    }
    if (once) {
      // @ts-ignore
      const onlyOnce = (...args) => {
        this.unSubscribe(eventName, callback);
        callback.apply(this, args as any);
      };
      onlyOnce.origin = callback;
      this.eventEmitter[eventName].push(onlyOnce);
    } else this.eventEmitter[eventName].push(callback);
    return () => this.unSubscribe(eventName, callback);
  }

  unSubscribe(eventName: EventName, callback: (payload: PayLoad) => void) {
    if (this.hasTopic(eventName) && callback) {
      this.eventEmitter[eventName] = this.eventEmitter[eventName].filter(
        // @ts-ignore
        (cb) => cb !== callback && cb.origin !== callback
      );
    }
  }
  hasTopic(eventName: EventName): boolean {
    return Array.isArray(!this.eventEmitter[eventName]);
  }
}

let eventBus: EventBus = getCache(eventNameSpace) as EventBus;
if (!eventBus) {
  eventBus = new EventBus();
  setCache(eventNameSpace, eventBus);
}

export default eventBus;
