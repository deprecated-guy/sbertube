const checkDate = (
	years: number,
	formattedDate: string,
	months: number,
	days: number,
	hours: number,
	minutes: number,
	seconds: number,
) => {
	if (years > 0) {
		formattedDate += years + ' years ';
	}
	if (months > 0) {
		formattedDate += months + ' months ';
	}
	if (days > 0) {
		formattedDate += days + ' days ';
	}
	if (hours > 0) {
		formattedDate += hours + ' hours ';
	}
	if (minutes > 0) {
		formattedDate += minutes + ' minutes ';
	}
	if (seconds > 0) {
		formattedDate += seconds + ' seconds ';
	}
	return formattedDate;
};

export const formatDate = (createdAt: string) => {
	const currentDate = new Date();
	const pastDate = new Date(createdAt);

	const timeDiff = Math.abs(currentDate.getTime() - pastDate.getTime());

	const years = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 365));
	const months = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 30));
	const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
	const hours = Math.floor(timeDiff / (1000 * 60 * 60));
	const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
	const seconds = Math.floor((timeDiff / 1000) % 60);

	let formattedDate = '';
	formattedDate = checkDate(years, formattedDate, months, days, hours, minutes, seconds);

	formattedDate += 'ago';

	return formattedDate;
};
