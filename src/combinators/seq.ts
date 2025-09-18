import { isFailure, p, Percy, type ParserResult } from "../Percy";
import { failure } from "./failure";
import { success } from "./success";

export function seq<T1, T2>(p1: Percy<T1>, p2: Percy<T2>): Percy<[T1, T2]>;
export function seq<T1, T2, T3>(
	p1: Percy<T1>,
	p2: Percy<T2>,
	p3: Percy<T3>,
): Percy<[T1, T2, T3]>;
export function seq<T1, T2, T3, T4>(
	p1: Percy<T1>,
	p2: Percy<T2>,
	p3: Percy<T3>,
	p4: Percy<T4>,
): Percy<[T1, T2, T3, T4]>;
export function seq<T extends Array<unknown>>(...parsers: Percy[]): Percy<T>;
export function seq<T extends Array<unknown>>(...parsers: Percy[]): Percy<T> {
	return p((input, index) => {
		const results: unknown[] = [];
		let currentIndex = index;
		for (const parser of parsers) {
			const result = parser.parse(
				input,
				currentIndex,
			) as ParserResult<unknown>;
			if (isFailure(result)) {
				return failure(currentIndex, result[1]);
			}
			results.push(result[1]);
			currentIndex = result[0];
		}
		return success(currentIndex, results as T);
	});
}
