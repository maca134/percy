import { p, Percy } from "../Percy";

export function lazy<T>(fn: () => Percy<T>): Percy<T> {
	return p((input, index) => fn().parse(input, index), `lazy(${fn().name})`);
}
