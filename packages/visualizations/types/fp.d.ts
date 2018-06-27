declare namespace fp {
  interface ListIterator<T, TResult> {
    (value: T, index: number, collection: List<T>): TResult
  }

  interface ReduceIterator<T, TResult> {
    (accumulator: TResult, iteratee: T): TResult
  }

  type ReduceFunction<T, TResult> = (
    iterator: ReduceIterator<T, TResult>,
    accumulator: TResult,
  ) => (collection: List<T>) => TResult

  // Common interface between Arrays and jQuery objects
  interface List<T> {
    [index: number]: T
    length: number
  }

  interface Static {
    // find<T>(predicate: ListIterator<T, boolean>): (collection: List<T>) => T
    // find<TObject extends {}, T>(predicate: TObject): (collection: List<T>) => T

    /**
     * Creates an object composed of keys generated from the results of running each element of collection through
     * iteratee. The corresponding value of each key is an array of the elements responsible for generating the
     * key. The iteratee is bound to thisArg and invoked with three arguments:
     * (value, index|key, collection).
     *
     * If a property name is provided for iteratee the created _.property style callback returns the property
     * value of the given element.
     *
     * If a value is also provided for thisArg the created _.matchesProperty style callback returns true for
     * elements that have a matching property value, else false.
     *
     * If an object is provided for iteratee the created _.matches style callback returns true for elements that
     * have the properties of the given object, else false.
     *
     * @param collection The collection to iterate over.
     * @param iteratee The function invoked per iteration.
     * @param thisArg The this binding of iteratee.
     * @return Returns the composed aggregate object.
     */
    groupBy<T>(term: string): (collection: List<T>) => T[]
    groupBy<T>(fn: (item: T) => string): (collection: List<T>) => T[]

    /**
     * Creates an array of the own enumerable property values of object.
     *
     * @param object The object to query.
     * @return Returns an array of property values.
     */
    values<T>(object?: Object): T[]

    /**
     * Creates a function that returns the result of invoking the provided functions with the this binding of the
     * created function, where each successive invocation is supplied the return value of the previous.
     *
     * @param funcs Functions to invoke.
     * @return Returns the new function.
     */
    flow<TResult extends Function>(...funcs: Function[]): TResult

    /**
     * Returns a new list, constructed by applying the supplied function to every element of the supplied list.
     */
    map<T>(fn: Function): (list: T[]) => any[]

    /**
     * Returns `true` if the specified item is somewhere in the list, `false` otherwise.
     * Equivalent to `indexOf(a)(list) > -1`. Uses strict (`===`) equality checking.
     */
    includes<T>(value: T): (collection: T | T[]) => boolean

    /**
     * Returns a new list containing only those items that match a given predicate function. The
     * predicate function is passed one argument: (value).
     */
    // filter<T>(fn: (value: T) => boolean): (list: T[]) => T[]

    /**
     * Creates an array of elements, sorted in ascending order by the results of
     * running each element in a collection through each iteratee. This method
     * performs a stable sort, that is, it preserves the original sort order of
     * equal elements. The iteratees are invoked with one argument: (value).
     *
     * @static
     * @memberOf _
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {...(Function|Function[]|Object|Object[]|string|string[])} [iteratees=[_.identity]]
     *  The iteratees to sort by, specified individually or in arrays.
     * @returns {Array} Returns the new sorted array.
     * @example
     *
     * var users = [
     *   { 'user': 'fred',   'age': 48 },
     *   { 'user': 'barney', 'age': 36 },
     *   { 'user': 'fred',   'age': 42 },
     *   { 'user': 'barney', 'age': 34 }
     * ];
     *
     * _.sortBy(users, function(o) { return o.user; });
     * // => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 42]]
     *
     * _.sortBy(users, ['user', 'age']);
     * // => objects for [['barney', 34], ['barney', 36], ['fred', 42], ['fred', 48]]
     *
     * _.sortBy(users, 'user', function(o) {
     *   return Math.floor(o.age / 10);
     * });
     * // => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 42]]
     */
    sortBy<T, TSort>(iteratee?: ListIterator<T, TSort>): (collection: List<T>) => T[]

    /**
     * _.reduce; this method transforms object to a new accumulator object which is the result of
     * running each of its own enumerable properties through iteratee, with each invocation potentially mutating
     * the accumulator object. The iteratee is bound to thisArg and invoked with four arguments: (accumulator,
     * value, key, object). Iteratee functions may exit iteration early by explicitly returning false.
     *
     * @param iteratee The function invoked per iteration.
     * @param object The object to iterate over.
     * @param accumulator The custom accumulator value.
     * @param thisArg The this binding of iteratee.
     * @return Returns the accumulated value.
     */
    // reduce<T, TResult>(iterator: ReduceIterator<T, TResult>, accumulator: TResult): (collection: List<T>) => TResult
    reduce: any

    /**
     * Checks if value is classified as an Array object.
     * @param value The value to check.
     *
     * @return Returns true if value is correctly classified, else false.
     */
    isArray<T>(value?: any): value is T[]

    keys<T>(arg: T): (keyof T)[]

    /**
     * Checks if value is empty. A value is considered empty unless it’s an arguments object, array, string, or
     * jQuery-like collection with a length greater than 0 or an object with own enumerable properties.
     *
     * @param value The value to inspect.
     * @return Returns true if value is empty, else false.
     */
    isEmpty(value?: any): boolean

    all: any
    any: any
    assign: any
    bind: any
    clone: any
    cloneDeep: any
    compact: any
    defaults: any
    difference: any
    drop: any
    dropRight: any
    every: any
    extend: any
    filter: any
    find: any
    findIndex: any
    findKey: any
    flatten: any
    forEach: any
    get: any
    has: any
    identity: any
    indexOf: any
    initial: any
    invoke: any
    isBoolean: any
    isDate: any
    isFinite: any
    isFunction: any
    isMatch: any
    isNil: any
    isObject: any
    last: any
    mapValues: any
    mapKeys: any
    max: any
    merge: any
    min: any
    omit: any
    omitBy: any
    partition: any
    pickBy: any
    pluck: any
    rangeStep: any
    remove: any
    set: any
    size: any
    some: any
    tail: any
    times: any
    uniq: any
    uniqBy: any
    uniqueId: any
    zip: any
  }
}

declare let fp: fp.Static

declare module "lodash/fp" {
  export = fp
}
