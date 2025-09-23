import { isFailure, p, Percy } from "../Percy";

export function many<T>(parser: Percy<T>): Percy<T[]> {
	return p((input, index) => {
		const results: T[] = [];
		let currentIndex = index;
		while (true) {
			const result = parser.parse(input, currentIndex);
			if (isFailure(result)) {
				break;
			}
			results.push(result[1]);
			if (currentIndex === result[0]) {
				throw new Error("many() must consume input");
			}
			currentIndex = result[0];
		}
		return [currentIndex, results];
	}, `many(${parser.name})`);
}
