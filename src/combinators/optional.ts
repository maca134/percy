import { isFailure, p, Percy } from "../Percy";
import { success } from "./success";

export function optional<T>(parser: Percy<T>): Percy<T | null> {
	return p((input, index) => {
		const result = parser.parse(input, index);
		if (!isFailure(result)) {
			return success(result[0], result[1] as T);
		}
		return success(index, null);
	});
}
