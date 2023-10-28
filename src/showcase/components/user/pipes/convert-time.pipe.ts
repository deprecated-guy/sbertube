import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'convertTime',
	pure: false,
	standalone: true,
})
export class ConvertTimePipe implements PipeTransform {
	transform(value: string): string {
		return this.calculateTimeDifference(value);
	}

	private calculateTimeDifference(value: string): string {
		const date = new Date(value);
		const date2 = new Date();
		const diff = Math.abs(date2.getTime() - date.getTime());
		let seconds = Math.floor(diff / 1000);
		let minutes = Math.floor(seconds / 60);
		let hours = Math.floor(minutes / 60);
		const days = Math.floor(hours / 24);

		seconds %= 60;
		minutes %= 60;
		hours %= 24;

		return `time after register ${days} days, ${hours} hours and ${minutes} minutes ago`;
	}
}
