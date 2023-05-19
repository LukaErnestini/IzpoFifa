import { test, expect, describe } from 'vitest';
import { hexToRGBA, createTeamName, genRanHex } from './util';

describe('hexToRGBA', () => {
	test('hexToRGBA converts #000000 to rgba(0, 0, 0, 1)', () => {
		const result = hexToRGBA('#000000');
		expect(result).toBe('rgba(0, 0, 0, 1)');
	});

	test('hexToRGBA converts #FFFFFF to rgba(255, 255, 255, 1)', () => {
		const result = hexToRGBA('#FFFFFF');
		expect(result).toBe('rgba(255, 255, 255, 1)');
	});

	test('hexToRGBA converts #FF0000 to rgba(255, 0, 0, 1)', () => {
		const result = hexToRGBA('#FF0000');
		expect(result).toBe('rgba(255, 0, 0, 1)');
	});

	test('hexToRGBA converts #00FF00 to rgba(0, 255, 0, 1)', () => {
		const result = hexToRGBA('#00FF00');
		expect(result).toBe('rgba(0, 255, 0, 1)');
	});

	test('hexToRGBA converts #0000FF to rgba(0, 0, 255, 1)', () => {
		const result = hexToRGBA('#0000FF');
		expect(result).toBe('rgba(0, 0, 255, 1)');
	});

	test('hexToRGBA supports alpha argument', () => {
		const result = hexToRGBA('#000000', 0.5);
		expect(result).toBe('rgba(0, 0, 0, 0.5)');
	});

	test('hexToRGBA throws an error for invalid hex color codes', () => {
		expect(() => {
			hexToRGBA('invalid');
		}).toThrow('Invalid hex color code.');
	});
});

describe('createTeamName', () => {
	test('combines three characters from each word correctly', () => {
		const result = createTeamName(['Batman', 'Superman', 'Flash']);
		expect(result).toBe('BatSupFla');
	});

	test('handles words shorter than three characters', () => {
		const result = createTeamName(['A', 'To', 'Cat', 'Dog']);
		expect(result).toBe('AToCatDog');
	});

	test('ignores empty strings', () => {
		const result = createTeamName(['', 'Superman', '']);
		expect(result).toBe('Sup');
	});

	test('capitalizes the first letter of each word', () => {
		const result = createTeamName(['superman', 'flash']);
		expect(result).toBe('SupFla');
	});

	test('lowercases the second and third letters of each word', () => {
		const result = createTeamName(['SUPERMAN', 'FLASH']);
		expect(result).toBe('SupFla');
	});
});

describe('genRanHex', () => {
	test('generates a string of the correct length', () => {
		const size = 5;
		const result = genRanHex(size);
		expect(result.length).toBe(size);
	});

	test('generates a valid hexadecimal string', () => {
		const result = genRanHex(10);
		const isValidHex = /^([A-Fa-f0-9]{1,2})+$/.test(result);
		expect(isValidHex).toBe(true);
	});

	test('returns an empty string when size is zero', () => {
		const result = genRanHex(0);
		expect(result).toBe('');
	});

	test('throws an error if size is negative', () => {
		expect(() => {
			genRanHex(-1);
		}).toThrow();
	});
});
