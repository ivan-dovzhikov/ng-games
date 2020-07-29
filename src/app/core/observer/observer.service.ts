export type SubscriberCallback<T> = (value: T) => void;

interface Subscriber<T> {
  id: number;
  callback: SubscriberCallback<T>;
}

export const ObserverServiceName = 'ObserverService';

export class ObserverService<T> {
  private subscribersCount = 0;
  private subscribers: Subscriber<T>[] = [];

  private unsubscribe(targetId: number) {
    this.subscribers = this.subscribers.filter(({ id }) => id !== targetId);
  }

  public notify = (data: T) => {
    this.subscribers.forEach(({ callback }) => callback(data));
  };

  public subscribe = (callback: SubscriberCallback<T>) => {
    const id = this.subscribersCount++;
    this.subscribers.push({ id, callback });
    return () => this.unsubscribe(id);
  };
}
