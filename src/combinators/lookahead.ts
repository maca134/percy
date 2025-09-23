import { isFailure, p, Percy } from "../Percy";
import { success } from "./success";

export function lookahead<T>(parser: Percy<T>): Percy<T> {
	return p((input, index) => {
		const result = parser.parse(input, index);
		if (isFailure(result)) {
			return result;
		}
		return success(index, result[1]);
	}, `lookahead(${parser.name})`);
}
