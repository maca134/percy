import type { Percy } from "../Percy";
import { many } from "./many";
import { seq } from "./seq";

export function sepBy1<T, S>(
	parser: Percy<T>,
	separator: Percy<S>,
): Percy<T[]> {
	return seq(parser, separator, many(parser)).map(([first, , rest]) => [
		first,
		...rest,
	]);
}
