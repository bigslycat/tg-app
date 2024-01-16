export class Store<T> {
  private readonly listeners = new Set<(state: T) => void>()

  constructor(private state: T) {}

  getState(): T {
    return this.state
  }

  setState(state: T) {
    if (state === this.state) return

    this.state = state
    this.listeners.forEach(listener => listener(state))
  }

  watch(listener: (state: T) => void) {
    this.listeners.add(listener)

    return () => {
      this.listeners.delete(listener)
    }
  }
}
