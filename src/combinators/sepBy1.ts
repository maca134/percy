import type { Percy } from "../Percy";
import { many } from "./many";
import { seq } from "./seq";

export function sepBy1<T, S>(
	parser: Percy<T>,
	separator: Percy<S>,
): Percy<T[]> {
	return seq(parser, many(seq(separator, parser).map(([_, p]) => p))).map(
		([first, rest]) => [first, ...rest],
	);
}
