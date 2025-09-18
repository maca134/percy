import type { Failure } from "../Percy";

export function failure(index: number, expected: string): Failure {
	return [0, expected, index];
}
