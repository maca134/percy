import { p, type ParserInput, type Percy } from "../Percy";

export function predicate<T>(
	fn: (input: ParserInput, index: number) => Percy<T>,
): Percy<T> {
	return p(
		(input, index) => fn(input, index).parse(input, index),
		`predicate(${fn.name})`,
	);
}
