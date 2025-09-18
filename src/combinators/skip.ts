import type { Percy } from "../Percy";

export function skip<T>(parser: Percy<T>): Percy<null> {
	return parser.map(() => null);
}
