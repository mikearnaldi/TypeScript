/* eslint-disable @typescript-eslint/naming-convention */
import * as T from "@effect-ts/core/Effect";
import * as L from "@effect-ts/core/Effect/Layer";
import { AnyService, Has, Tag, tag } from "@effect-ts/core/Has";

/**
 * Returns an effect that models the execution of this effect, followed by
 * the passing of its value to the specified continuation function `f`,
 * followed by the effect that it returns.
 *
 * @ets_extension flatMap
 */
export function flatMapSelf<R, E, A, R1, E1, A1>(
    self: T.Effect<R, E, A>,
    f: (a: A) => T.Effect<R1, E1, A1>,
    __trace?: string | undefined
): T.Effect<R & R1, E | E1, A1> {
    return T.chain_(self, f, __trace);
}

/**
 * Returns an effect that effectfully "peeks" at the success of this effect.
 *
 * @ets_extension tap
 */
export function tapSelf<R, E, A, R1, E1, A1>(
    self: T.Effect<R, E, A>,
    f: (a: A) => T.Effect<R1, E1, A1>,
    __trace?: string | undefined
): T.Effect<R & R1, E | E1, A> {
    return T.tap_(self, f, __trace);
}

/**
 * Binds an effectful value in a `do` scope
 *
 * @ets_extension bind
 */
export function bindSelf<R2, E2, R, E, A, K, N extends string>(
    self: T.Effect<R2, E2, K>,
    tag: Exclude<N, keyof K>,
    f: (_: K) => T.Effect<R, E, A>,
    __trace?: string | undefined
): T.Effect<R & R2, E2 | E, K & { readonly [k in N]: A; }> {
    return T.bind_(self, tag, f, __trace);
}

/**
 * Returns an effect whose success is mapped by the specified `f` function.
 *
 * @ets_extension map
 */
export function mapSelf<R, E, A, B>(
    self: T.Effect<R, E, A>,
    f: (a: A) => B,
    __trace?: string
): T.Effect<R, E, B> {
    return T.map_(self, f, __trace);
}

/**
 * Returns an effect whose success is mapped by the specified `f` function.
 *
 * @ets_extension toLayer
 */
export function toLayerSelf<R, E, A extends AnyService>(
    self: T.Effect<R, E, A>,
    _tag?: Tag<A>,
    __trace?: string
): L.Layer<R, E, Has<A>> {
    return T.toLayerRaw(T.map_(self, (a): Has<A> => tag<A>(a.serviceId).has(a)));
}

/**
 * @ets_extension identity
 */
export function identityEffectSelf<R, E, A>(
    self: T.Effect<R, E, A>,
): T.Effect<R, E, A> {
    return self;
}

/**
 * Returns an effect whose success is mapped by the specified `f` function.
 *
 * @ets_operator |
 * @ets_extension pipe
 */
export function pipeSelf<R, E, A, B>(
    self: T.Effect<R, E, A>,
    f: (a: T.Effect<R, E, A>) => B
): B {
    return f(self);
}

export const programInFluent = T.do
    .bind("x", () => T.succeed(0))
    .bind("y", (_) => T.succeed(_.x + 1))
    .map((_) => `${_.x} + 1 = ${_.y}`)
    .tap((_) => T.succeedWith(console.log(_)));

export const programWithPipe = T.succeed(0)
    | T.map((n) => n + 1)
    | T.map((n) => `got:${n}`)
    | T.tap((s) => T.succeedWith(console.log(s)));

/**
 * @ets_do adapter
 */
export declare function adapter<A>(self: A): A;

/**
 * @ets_do Do
 */
export declare function Do<X>(f: (x: typeof adapter) => X): X;

export interface ServiceB {
    readonly serviceId: "ServiceB";
}
export const ServiceB = tag<ServiceB>("ServiceB");
export interface ServiceC {
    readonly serviceId: "ServiceC";
}
export const ServiceC = tag<ServiceC>("ServiceC");

export interface Logger {
    readonly serviceId: "Logger";
    readonly log: (message: string) => T.UIO<void>;
}

export const Logger = tag<Logger>("Logger");

export const makeLogger = T.succeedWith<Logger>({
    serviceId: "Logger",
    log: (message) => T.succeedWith(console.log(message))
}).toLayer();

export const makeMath = Do(($) => {
    const logger = $(T.service(Logger));

    const add = (x: number, y: number) =>
        Do(($) => {
            const result = $(T.succeedWith(x + y));
            $(logger.log(`result: ${result}`));
            return result;
        });

    return {
        add
    } as const;
});
