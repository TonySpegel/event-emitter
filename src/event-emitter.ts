interface EmitterConfig {
  /**
   * The event name you can listen to
   */
  name: string;
}

/**
 * eventEmitter decorator
 *
 * Copyright © 2023 Tony Spegel
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
     * Extract a name for the event either from config or context.
     * 
     * Example:
     * @eventEmitter({ name: 'add-event' })
     * add(a: number, b: number) {}
     * event will be 'add-event'
     */
    const { name } = config ?? context;

    function replacementMethod(this: This, ...args: Args): Return {
      const result = target.call(this, ...args);

      window.dispatchEvent(new CustomEvent(String(name), { detail: result }));

      return result;
    }

    return replacementMethod;
  };
}
