import { ApplicationCommandOptionType } from 'discord.js';
import { DrizzleError } from 'drizzle-orm';
import { db, players } from '../util/db.js';
import type { Command } from './index.js';

export default {
	data: {
		name: 'Add Points',
		description: 'Adds points to your account.',
        options: [
            { name: 'Amount', description: 'amount to be added to existing points', type: ApplicationCommandOptionType.Number, required: true }
        ]
	},
	async execute(interaction) {
        const amount = interaction.options.get('Amount')?.value;
        if(amount === undefined) {
            await interaction.reply({ content: 'Invalid amount', ephemeral: true });
            return;
        }
        
        try {
            await db.insert(players)
                .values({ id: interaction.user.id, points: Number(amount) })
                .onConflictDoUpdate({ target: players.id, set: { points: Number(amount) }})
            await interaction.reply({ content: `Added ${amount} points to your account`, ephemeral: true });
        } catch (error) {
            if(error instanceof DrizzleError) {
                await interaction.reply({ content: error.message, ephemeral: true });
            } else {
                await interaction.reply({ content: 'An error occurred', ephemeral: true });
            }
        }
	},
} satisfies Command;
