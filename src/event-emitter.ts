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
  name?: string;
}

/**
 * This decorator emits a custom event by wrapping a class method
 * and replacing it with a new one. It's meant to be used as 
 * one way for web components to communicate which each other 
 * but isn't limited to it.
 * 
 * Its event name is by default the decorated method's name.
 * The value that is emitted in the details property is the 
 * decorated method's return value. Both (and more) can be set as you wish.
 */
export function eventEmitter(config?: EmitterConfig) {
  return function <This, Args extends any[], Return>(
    target: (this: This, ...args: Args) => Return,
    context: ClassMethodDecoratorContext<
      This,
      (this: This, ...args: Args) => Return
    >
  ) {
    /**
     * Extracts the event name either from the provided config or context.
     * When no config object / name is given, the decorated method's name will be used.
     */
    const eventName = config?.name ?? String(context.name);
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
      const detail = config?.detail ?? result;

      window.dispatchEvent(
        new CustomEvent(String(eventName), { detail, ...config })
      );

      return result;
    };
  };
}
