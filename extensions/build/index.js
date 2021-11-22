/* eslint-disable @typescript-eslint/naming-convention */
import * as T from "@effect-ts/core/Effect";
const person = {
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
export function flatMap(self, f, __trace) {
    return T.chain_(self, f, __trace);
}
/**
 * Binds an effectful value in a `do` scope
 *
 * @ets_extension bind
 */
export function bind(mk, tag, f, __trace) {
    return T.bind_(mk, tag, f, __trace);
}
/**
 * Returns an effect whose success is mapped by the specified `f` function.
 *
 * @ets_extension map
 */
export function map(self, f, __trace) {
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
/**
 * @ets_operator +
 */
export function sum(x, y) {
    return {
        n: x.n + y.n
    };
}
export function int(n) {
    return {
        n
    };
}
