export const hexToRGBA = (hex: string, alpha = 1) => {
	if (!/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
		throw new Error('Invalid hex color code.');
	}

	const hexLength = hex.length;
	const rgba = [];

	for (let i = 1; i < hexLength; i += (hexLength - 1) / 3) {
		const color = parseInt(hex.slice(i, i + (hexLength - 1) / 3), 16);
		rgba.push(color);
	}

	rgba.push(alpha);

	return `rgba(${rgba.join(', ')})`;
};

export const createTeamName = (strings: string[]): string => {
	const extractThreeChars = (str: string): string => {
		let chars = str.slice(0, 3);
		return chars.charAt(0).toUpperCase() + chars.slice(1).toLowerCase();
	};

	return strings.map(extractThreeChars).join('');
};

export const genRanHex = (size: number) =>
	[...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');

export const formatDate = (date: Date) => {
	// Extract the individual date components
	const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date);
	const day = new Intl.DateTimeFormat('en-US', { day: '2-digit' }).format(date);
	const year = new Intl.DateTimeFormat('en-US', { year: 'numeric' }).format(date);
	const hour = new Intl.DateTimeFormat('en-US', { hour: 'numeric', hour12: false }).format(date);

	// Combine the components to create the desired format
	return `${month} ${day} ${year} ${hour}h`;
};
