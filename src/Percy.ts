import { failure } from "./combinators";
import { eof } from "./combinators/eof";
import { seq } from "./combinators/seq";

export type Success<T> = [number, T];
export type Expected = string | (string | Expected)[];
export type Failure = [-1, Expected, number];
export const isFailure = <T>(result: ParserResult<T>): result is Failure =>
	result[0] === -1;

export type ParserInput = string | Buffer;
export type ParserResult<T> = Success<T> | Failure;
export type ParserFnc<T> = (
	input: ParserInput,
	index: number,
) => ParserResult<T>;

export const p = <T>(fn: ParserFnc<T>, name: string): Percy<T> =>
	new Percy(fn, name);

export class Percy<Out = unknown, In extends ParserInput = ParserInput> {
	constructor(
		readonly parse: ParserFnc<Out>,
		readonly name: string,
	) {}

	tryParse(input: In) {
		const result = seq(this, eof())
			.map(([value]) => value)
			.parse(input, 0);
		if (isFailure(result)) {
			return {
				success: false,
				error: `Expected ${result[1]} at index ${result[2]}`,
			};
		}
		return { success: true, value: result[1] };
	}

	map<U>(fn: (value: Out) => U): Percy<U> {
		return p((input, index): ParserResult<U> => {
			const result = this.parse(input, index);
			if (isFailure(result)) {
				return failure(result[2], result[1]);
			}
			return [result[0], fn(result[1])];
		}, `Percy.map()`);
	}
}
