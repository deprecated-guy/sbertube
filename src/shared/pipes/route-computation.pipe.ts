import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'routeComputation',
	standalone: true,
})
export class RouteComputationPipe implements PipeTransform {
	transform(value: string, username: string, type: 'library' | ''): unknown {
		return `${value}/${username}/${type}`;
	}
}
