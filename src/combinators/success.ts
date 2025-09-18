import type { ParserResult } from "../Percy";

export function success<T>(index: number, value: T): ParserResult<T> {
	return [index, value];
}
