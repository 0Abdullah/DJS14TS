import { ActionRowBuilder, ApplicationCommandOptionType } from 'discord.js';
import { DrizzleError, eq } from 'drizzle-orm';
import { db, players } from '../util/db.js';
import { HandleError } from '../util/index.js';
import type { Command } from './index.js';

export default {
    data: {
        name: 'getpoints',
        description: 'gets your current points or get all other players points',
        options: [
            {
                name: 'players',
                description: 'can select multiple players to get their specific point totals',
                type: ApplicationCommandOptionType.Mentionable,
                required: false,
            },
        ],
    },
    async execute(interaction) {
        try {
            const playerId = interaction.options.get('players')?.value as string | undefined;
            if (playerId === undefined) {
                const playersData = await db.query.players.findMany();
                await interaction.reply({
                    content: playersData
                        .map((player, i) => {
                            const member = interaction.guild?.members.cache.get(player.id);
                            return `${member?.displayName ?? '???'}:    ${player.points}`;
                        })
                        .join('\n'),
                    ephemeral: true,
                });
            } else {
                const playerInDB = await db.query.players.findFirst({ where: eq(players.id, playerId) });
                const [playerData] = [playerInDB] ?? (await db.insert(players).values({ id: playerId, points: 0 }).returning());

                if (playerData === undefined) throw new Error('Failed to get player data');
                else {
                    const member = interaction.guild?.members.cache.get(playerData.id);
                    await interaction.reply({ content: `${member?.displayName}:    ${playerData.points}` });
                }
            }
        } catch (error) {
            await HandleError(error, interaction);
        }
    },
} satisfies Command;
