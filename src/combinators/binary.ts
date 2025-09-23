import { p, type Percy } from "../Percy";
import { failure } from "./failure";
import { success } from "./success";
import { until } from "./until";

export function bytes(value: number[] | number): Percy<Buffer> {
	return p(
		(input, index) => {
			if (!Buffer.isBuffer(input)) {
				return failure(index, `"${value}"`);
			}
			if (typeof value === "number") {
				const sub = input.subarray(index, index + value);
				if (sub.length < value) {
					return failure(index, `"${value}"`);
				}
				return success(index + value, Buffer.from(sub));
			}
			const buffer = Buffer.from(value);
			const result = input
				.subarray(index, index + buffer.length)
				.equals(buffer);
			if (!result) {
				return failure(index, `"${value}"`);
			}
			return success(index + buffer.length, Buffer.from(buffer));
		},
		`bytes(${Array.isArray(value) ? value.join(", ") : value})`,
	);
}

export const byte = bytes(1).map((b) => b[0]!);

export const byteString = until((n) => n === 0).map((b) => b.toString("utf8"));
