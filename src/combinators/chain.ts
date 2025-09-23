import { Percy, p, isFailure } from "../Percy";

export function chain<T, U>(
	parser: Percy<T>,
	fn: (value: T) => Percy<U>,
): Percy<U> {
	return p((input, index) => {
		const result = parser.parse(input, index);
		if (isFailure(result)) {
			return result;
		}
		return fn(result[1]).parse(input, result[0]);
	});
}
