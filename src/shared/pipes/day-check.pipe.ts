import { Pipe, PipeTransform } from '@angular/core';
import { isSameDay, subDays, format } from 'date-fns';

@Pipe({
	name: 'dayCheck',
	standalone: true,
})
export class DayCheckPipe implements PipeTransform {
	transform(watchDate: string): string {
		const date = new Date(watchDate);
		const sameDate = new Date();
		const yesterday = subDays(sameDate, 1);
		if (isSameDay(date, sameDate)) {
			return 'Today';
		} else if (isSameDay(date, yesterday)) {
			return 'Yesterday';
		} else {
			return format(date, 'DD.MM.YYYY');
		}
	}
}
