import { type Percy, p } from "../Percy";
import { failure } from "./failure";
import { success } from "./success";

export function until(predicate: (value: number) => boolean): Percy<Buffer> {
	return p((input, index) => {
		if (!Buffer.isBuffer(input)) {
			return failure(index, "Buffer");
		}
		let end = index;
		while (end < input.length && !predicate(input[end]!)) {
			end++;
		}
		return success(end + 1, input.subarray(index, end));
	}, `until(${predicate.name})`);
}
