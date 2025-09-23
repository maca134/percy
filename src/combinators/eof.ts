import { p, Percy } from "../Percy";
import { failure } from "./failure";
import { success } from "./success";

export function eof(): Percy<null> {
	return p(
		(input, index) =>
			index === input.length
				? success(index, null)
				: failure(index, "end of input"),
		"eof()",
	);
}
