/* eslint-disable @typescript-eslint/naming-convention */
import { Newtype } from "@effect-ts/core/Newtype";

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

export const intOp = int(0) + int(1) - int(2);
