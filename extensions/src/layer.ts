/* eslint-disable @typescript-eslint/naming-convention */

import * as L from "@effect-ts/core/Effect/Layer";
import { Has, tag } from "@effect-ts/core/Has";
import { Erase } from "@effect-ts/core/Utils";

/**
 * @ets_extension add
 * @ets_operator +
 */
export function add<R, E, A, R2, E2, A2>(
    self: L.Layer<R, E, A>,
    that: L.Layer<R2, E2, A2>
): L.Layer<R & R2, E2 | E, A & A2> {
    return self["+++"](that);
}

/**
 * @ets_extension provideAndAdd
 * @ets_operator >
 */
export function provideAndAdd<R, E, A, R2, E2, A2>(
    self: L.Layer<R, E, A>,
    that: L.Layer<R2, E2, A2>
): L.Layer<R & Erase<A & R2, A>, E2 | E, A & A2> {
    return self[">+>"](that);
}

/**
 * @ets_extension provide
 * @ets_operator >>
 */
export function provide<R, E, A, R2, E2, A2>(
    self: L.Layer<R, E, A>,
    that: L.Layer<R2, E2, A2>
): L.Layer<R & Erase<A & R2, A>, E2 | E, A2> {
    return self[">>>"](that);
}

/**
 * @ets_extension provideStrict
 * @ets_operator >=
 */
export function provideStrict<R, E, A, E2, A2>(
    self: L.Layer<R, E, A>,
    that: L.Layer<A, E2, A2>
): L.Layer<R, E2 | E, A2> {
    return self[">=>"](that);
}

export interface ServiceA {
    readonly serviceId: "ServiceA";
}
export const ServiceA = tag<ServiceA>("ServiceA");
export interface ServiceB {
    readonly serviceId: "ServiceB";
}
export const ServiceB = tag<ServiceB>("ServiceB");
export interface ServiceC {
    readonly serviceId: "ServiceC";
}
export const ServiceC = tag<ServiceC>("ServiceC");

declare const LiveA: L.Layer<unknown, never, Has<ServiceA>>;
declare const LiveB: L.Layer<Has<ServiceA>, never, Has<ServiceB>>;
declare const LiveC: L.Layer<Has<ServiceA> & Has<ServiceB>, never, Has<ServiceC>>;

export const Live = LiveA > LiveB >= LiveC;
