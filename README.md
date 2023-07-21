# eventEmitter

A class method decorator which emits custom events.

The decorator supports the latest (stage: 3) [TC39 proposal](https://github.com/tc39/proposal-decorators) - which is not yet implemented by browser vendors. However with TypeScript 5 we can use those already.

Some notes:

- An event name has to be set
- The emitted event bubbles by default
- using both `experimentalDecorators` and stage 3 decorators in the same file is not possible. In the same project for separate files this could work, but that needs some work and several tsconfig files.
- This is experimental and may not work in every environment or framework

Feel free to contribute and giving feedback

## Usage

```ts
import { eventEmitter } from './event-emitter.js';

class EmitterClass {
  // listen to: 'sum-event'
  @eventEmitter({ name: 'sum-event' })
  sum(a: number, b: number): number {
    return a + b;
  }
}
```
The decorated method's return value is stored in the custom event's `detail` property (if not otherwise specified).

### Customization
`EmitterConfig` adds two properties to `CustomEventInit`:
```ts
interface EmitterConfig extends CustomEventInit {
  /**
   * The event name you can listen to
   */
  name: string;
  /**
   * The emitter for your events,
   * by default the class instance itself (this)
   */
  emitter?: Window | Document;
}
```
Which includes: 
```ts
interface CustomEventInit<T = any> extends EventInit {
  detail?: T;
}

interface EventInit {
  bubbles?: boolean;
  cancelable?: boolean;
  composed?: boolean;
}
```

## Motivation

After writing the [@queryAssignedElementContent](https://github.com/TonySpegel/query-assigned-element-content) decorator, I thought about what other ways there are to use decorators for web components. One way is to emit custom events so that consumers can react to this data. This could be a slider's position after moving it or anything else. Although motivated by it, it's not limited to be used with web components.

## Installation
```bash
npm i event-emitter-class-method-decorator
```

## Development
Install project dependencies
```bash
npm i
```
Run the next two commands in parallel:
```bash
# Build with TS:
npm run build:watch
# Start a webserver:
npm run wds:serve
```

## Useful resources

- [TC39: proposal decorators](https://github.com/tc39/proposal-decorators)
- [JavaScript metaprogramming with the 2022-03 decorators API](https://2ality.com/2022/10/javascript-decorators.html)
- [Microsoft: announcing TypeScript 5.0 RC](https://devblogs.microsoft.com/typescript/announcing-typescript-5-0-rc/#decorators)