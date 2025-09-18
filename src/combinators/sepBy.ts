import type { Percy } from "../Percy";
import { optional } from "./optional";
import { sepBy1 } from "./sepBy1";

export function sepBy<T, S>(parser: Percy<T>, separator: Percy<S>): Percy<T[]> {
	return optional(sepBy1(parser, separator)).map((v) => v || []);
}
