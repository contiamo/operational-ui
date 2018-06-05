class EventEmitter {
  subscribers: { [key: string]: any[] } = {}

  on(eventName: string, callback: any): void {
    this.subscribers[eventName] = this.subscribers[eventName] || []
    this.subscribers[eventName].push(callback)
  }

  removeListener(eventName: string, callback: any): void {
    if (!this.subscribers[eventName]) {
      return
    }
    this.subscribers[eventName] = this.subscribers[eventName].filter(cb => cb !== callback)
  }

  removeAllListeners(eventName: string): void {
    this.subscribers[eventName] = []
  }

  emit(eventName: string, eventData: any = {}): void {
    if (!this.subscribers[eventName]) {
      return
    }
    this.subscribers[eventName].forEach(subscriber => {
      subscriber(eventData)
    })
  }

  removeAll(): void {
    this.subscribers = {}
  }
}

export default EventEmitter
