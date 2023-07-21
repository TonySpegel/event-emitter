/**
 * Copyright © 2023 Tony Spegel
 */

/**
 * EmitterConfig includes not only a name for your custom event
 * but also all other properties one would like to set such as:
 * detail, bubbles and so on.
 */
interface EmitterConfig extends CustomEventInit {
  /**
   * The event name you can listen to
   */
  name: string;
  /**
   * The emitter for your events,
   * by default the class instance (this)
   */
  emitter?: Window | Document;
}

/**
 * This decorator emits a custom event by wrapping a class method
 * and replacing it with a new one. It's meant to be used as
 * one way for web components to communicate which each other
 * but isn't limited to it.
 *
 * Its event name must be set. The 'detail' property transports
 * the decorated method's return value. By default the emitter
 * dispatching events is the instance itself and the event is
 * set to bubble up.
 */
export function eventEmitter(config: EmitterConfig) {
  return function <This extends EventTarget, Args extends any[], Return>(
    target: (this: This, ...args: Args) => Return,
    _context: ClassMethodDecoratorContext<
      This,
      (this: This, ...args: Args) => Return
    >
  ) {
    /**
     * Throw an error if no config or no name has been set.
     */
    if (!config?.name) {
      throw new Error(
        `The "name"-property in the config is mandatory. It is used to name your custom event.`
      );
    }
    /**
     * Extracts the event name from the provided config.
     */
    const { name } = config;
    /**
     * The method which will replace the original one that emits a custom event
     */
    return function (this: This, ...args: Args): Return {
      /**
       * The method's return value
       */
      const result = target.call(this, ...args);
      /**
       * 'detail' is by default what is set with the config and if not
       * the method's return value
       */
      const detail = config.detail ?? result;
      /**
       * The emitter which dispatches the event
       */
      const emitter = config.emitter ?? this;

      emitter.dispatchEvent(
        new CustomEvent(name, { detail, bubbles: true, ...config })
      );

      return result;
    };
  };
}
