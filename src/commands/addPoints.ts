import { ApplicationCommandOptionType } from 'discord.js';
import { DrizzleError } from 'drizzle-orm';
import { db, players } from '../util/db.js';
import { HandleError } from '../util/index.js';
import type { Command } from './index.js';

export default {
    data: {
        name: 'addpoints',
        description: 'adds points to your account.',
        options: [
            {
                name: 'amount',
                description: 'amount to be added to existing points',
                type: ApplicationCommandOptionType.Number,
                required: false,
            },
        ],
    },
    async execute(interaction) {
        try {
            const amount = interaction.options.get('amount')?.value as number | undefined;
            if (amount === undefined) throw new Error('Invalid Amount');

            await db
                .insert(players)
                .values({ id: interaction.user.id, points: Number(amount) })
                .onConflictDoUpdate({ target: players.id, set: { points: Number(amount) } });

            await interaction.reply({
                content: `Added ${amount} points to your account (${interaction.user})`,
                ephemeral: true,
            });
        } catch (error) {
            await HandleError(error, interaction);
        }
    },
} satisfies Command;
