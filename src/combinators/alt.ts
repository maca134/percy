import { isFailure, p, Percy, type ParserResult } from "../Percy";
import { failure } from "./failure";
import { success } from "./success";

// #region overloads
export function alt<T1, T2>(p1: Percy<T1>, p2: Percy<T2>): Percy<T1 | T2>;

export function alt<T1, T2, T3>(
	p1: Percy<T1>,
	p2: Percy<T2>,
	p3: Percy<T3>,
): Percy<T1 | T2 | T3>;

export function alt<T1, T2, T3, T4>(
	p1: Percy<T1>,
	p2: Percy<T2>,
	p3: Percy<T3>,
	p4: Percy<T4>,
): Percy<T1 | T2 | T3 | T4>;

export function alt<T1, T2, T3, T4, T5>(
	p1: Percy<T1>,
	p2: Percy<T2>,
	p3: Percy<T3>,
	p4: Percy<T4>,
	p5: Percy<T5>,
): Percy<T1 | T2 | T3 | T4 | T5>;

export function alt<T1, T2, T3, T4, T5, T6>(
	p1: Percy<T1>,
	p2: Percy<T2>,
	p3: Percy<T3>,
	p4: Percy<T4>,
	p5: Percy<T5>,
	p6: Percy<T6>,
): Percy<T1 | T2 | T3 | T4 | T5 | T6>;

export function alt<T1, T2, T3, T4, T5, T6, T7>(
	p1: Percy<T1>,
	p2: Percy<T2>,
	p3: Percy<T3>,
	p4: Percy<T4>,
	p5: Percy<T5>,
	p6: Percy<T6>,
	p7: Percy<T7>,
): Percy<T1 | T2 | T3 | T4 | T5 | T6 | T7>;

export function alt<T1, T2, T3, T4, T5, T6, T7, T8>(
	p1: Percy<T1>,
	p2: Percy<T2>,
	p3: Percy<T3>,
	p4: Percy<T4>,
	p5: Percy<T5>,
	p6: Percy<T6>,
	p7: Percy<T7>,
	p8: Percy<T8>,
): Percy<T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8>;

export function alt<T1, T2, T3, T4, T5, T6, T7, T8, T9>(
	p1: Percy<T1>,
	p2: Percy<T2>,
	p3: Percy<T3>,
	p4: Percy<T4>,
	p5: Percy<T5>,
	p6: Percy<T6>,
	p7: Percy<T7>,
	p8: Percy<T8>,
	p9: Percy<T9>,
): Percy<T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9>;

export function alt<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(
	p1: Percy<T1>,
	p2: Percy<T2>,
	p3: Percy<T3>,
	p4: Percy<T4>,
	p5: Percy<T5>,
	p6: Percy<T6>,
	p7: Percy<T7>,
	p8: Percy<T8>,
	p9: Percy<T9>,
	p10: Percy<T10>,
): Percy<T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9 | T10>;
// #endregion

export function alt<T>(...parsers: Percy[]): Percy<T>;
export function alt<T>(...parsers: Percy[]): Percy<T> {
	return p((input, index) => {
		const expected: string[] = [];
		for (const parser of parsers) {
			const result = parser.parse(input, index) as ParserResult<unknown>;
			if (!isFailure(result)) {
				return success(result[0], result[1] as T);
			}
			expected.push(result[1]);
		}
		return failure(index, `[${expected.join(", ")}]`);
	});
}
