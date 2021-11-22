import * as T from "@effect-ts/core/Effect";
/**
 * Returns an effect that models the execution of this effect, followed by
 * the passing of its value to the specified continuation function `f`,
 * followed by the effect that it returns.
 *
 * @ets_extension flatMap
 */
export declare function flatMap<R, E, A, R1, E1, A1>(self: T.Effect<R, E, A>, f: (a: A) => T.Effect<R1, E1, A1>, __trace?: string | undefined): T.Effect<R & R1, E | E1, A1>;
/**
 * Binds an effectful value in a `do` scope
 *
 * @ets_extension bind
 */
export declare function bind<R2, E2, R, E, A, K, N extends string>(mk: T.Effect<R2, E2, K>, tag: Exclude<N, keyof K>, f: (_: K) => T.Effect<R, E, A>, __trace?: string | undefined): T.Effect<R & R2, E2 | E, K & {
    [k in N]: A;
}>;
/**
 * Returns an effect whose success is mapped by the specified `f` function.
 *
 * @ets_extension map
 */
export declare function map<R, E, A, B>(self: T.Effect<R, E, A>, f: (a: A) => B, __trace?: string): T.Effect<R, E, B>;
export declare const x: T.Effect<unknown, never, string>;
export declare const y: T.Effect<unknown, never, string>;
export declare const z: T.Effect<unknown, never, string>;
export declare type Maybe = typeof x;
export interface Int {
    readonly n: number;
}
/**
 * @ets_operator +
 */
export declare function sum(x: Int, y: Int): Int;
export declare function int(n: number): Int;
