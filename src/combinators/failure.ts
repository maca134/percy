import type { Expected, Failure } from "../Percy";

export function failure(index: number, expected: Expected): Failure {
	return [-1, expected, index];
}
