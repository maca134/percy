import { p, Percy } from "../Percy";
import { failure } from "./failure";
import { success } from "./success";

export function str(value: string): Percy<string> {
	return p((input, index) => {
		if (typeof input !== "string") {
			return failure(index, `"${value}"`);
		}
		return input.startsWith(value, index)
			? success(index + value.length, value)
			: failure(index, `"${value}"`);
	});
}
