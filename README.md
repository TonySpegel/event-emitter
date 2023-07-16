# eventEmitter

A class method decorator 

```ts
import { eventEmitter } from './event-emitter.js';

class EmitterClass {
  @eventEmitter({ name: 'add-event' })
  add(a: number, b: number): number {
    return a + b;
  }

  constructor() {
    const sum = this.add(3, 7);
  }
}
```