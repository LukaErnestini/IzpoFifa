import type { Player } from '@prisma/client';

/**
 * Retrieves the teammates or opposing team players of a player.
 *
 * @param {Player[] | undefined} team1 - The first team of players.
 * @param {Player[] | undefined} team2 - The second team of players.
 * @param {number | null} pId - The ID of the player whose teammates or opposing team players are to be found.
 * @param {boolean} inverse - Optional parameter, defaulting to `false`. If `true`, returns the players of the opposing team; if `false`, returns the teammates of the player.
 * @returns {Player[]} - The array of teammates or opposing team players.
 */
export const getTeammates = (
	team1: Player[] | undefined,
	team2: Player[] | undefined,
	pId: number | null,
	inverse = false
) => {
	if (!team1 || !team2 || !pId) {
		return [];
	}

	const player = team1.find((p) => p.id === pId);
	if (player) {
		return inverse ? team2 : team1;
	} else {
		return inverse ? team1 : team2;
	}
};
