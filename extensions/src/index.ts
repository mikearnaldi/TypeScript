/* eslint-disable @typescript-eslint/naming-convention */
import * as T from "@effect-ts/core/Effect";
import { Newtype } from "@effect-ts/core/Newtype";

interface Person {
    readonly firstName: string
    readonly lastName: string
}

const person: Person = {
    firstName: "Mike",
    lastName: "Arnaldi"
};

/**
 * Returns an effect that models the execution of this effect, followed by
 * the passing of its value to the specified continuation function `f`,
 * followed by the effect that it returns.
 *
 * @ets_extension flatMap
 */
export function flatMap<R, E, A, R1, E1, A1>(
    self: T.Effect<R, E, A>,
    f: (a: A) => T.Effect<R1, E1, A1>,
    __trace?: string | undefined
): T.Effect<R & R1, E | E1, A1> {
    return T.chain_(self, f, __trace);
}

/**
 * Binds an effectful value in a `do` scope
 *
 * @ets_extension bind
 */
export function bind<R2, E2, R, E, A, K, N extends string>(
    mk: T.Effect<R2, E2, K>,
    tag: Exclude<N, keyof K>,
    f: (_: K) => T.Effect<R, E, A>,
    __trace?: string | undefined
): T.Effect<R & R2, E2 | E, K & { [k in N]: A; }> {
    return T.bind_(mk, tag, f, __trace);
}

/**
 * Returns an effect whose success is mapped by the specified `f` function.
 *
 * @ets_extension map
 */
export function map<R, E, A, B>(
    self: T.Effect<R, E, A>,
    f: (a: A) => B,
    __trace?: string
): T.Effect<R, E, B> {
    return T.map_(self, f, __trace);
}

export const x = T.do
    .bind("x", () => T.succeed(0))
    .bind("y", ({ x }) => T.succeed(x + 1))
    .map(({ x, y }) => `${x} + 1 = ${y}`);

export const y = T.do
    .bind("x", () => T.succeed(0))
    .bind("y", ({ x }) => T.succeed(x + 1))
    .map(({ x, y }) => `${x} + 1 = ${y}`);

export const z = T.do
    .bind("x", () => T.succeed(0))
    .bind("y", ({ x }) => T.succeed(x + 1))
    .map(({ x, y }) => `${x} + 1 = ${y}`);

export type Maybe = typeof x;

export interface Int extends Newtype<{readonly Int: unique symbol}, number> {}

export function int(n: number): Int {
    return n as unknown as Int;
}

/**
 * @ets_operator +
 */
export function add(x: Int, y: Int): Int {
    return ((x as unknown as number) + (y as unknown as number)) as unknown as Int;
}

/**
 * @ets_operator -
 */
export function sub(x: Int, y: Int): Int {
    return ((x as unknown as number) - (y as unknown as number)) as unknown as Int;
}

export const xx = int(0) + int(1) - int(2);