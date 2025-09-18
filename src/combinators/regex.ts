import { p, Percy } from "../Percy";
import { failure } from "./failure";
import { success } from "./success";

export function regex(re: RegExp): Percy<string> {
	if (re.source[0] !== "^") {
		re = new RegExp("^" + re.source, re.flags);
	}
	const expected = `/${re.source}/`;
	return p((input, index) => {
		if (typeof input !== "string") {
			return failure(index, expected);
		}
		const match = re.exec(input.slice(index));
		if (match) {
			return success(index + match[0].length, match[0]);
		} else {
			return failure(index, expected);
		}
	});
}
