import { ApplicationCommandOptionType } from 'discord.js';
import { DrizzleError } from 'drizzle-orm';
import { db, players } from '../util/db.js';
import type { Command } from './index.js';

export default {
	data: {
		name: 'Get Points',
		description: 'Gets your current points. Or get all other players points.',
        options: [
            { name: 'Players', description: 'Can select multiple players to get their specific point totals', type: ApplicationCommandOptionType.User, required: false }
        ]
	},
	async execute(interaction) {
        const players = interaction.options.get('Players')?.value;
        console.log({players})
        await interaction.reply({content: 'hi'})
        // if(amount === undefined) {
        //     await interaction.reply({ content: 'Invalid amount', ephemeral: true });
        //     return;
        // }
        
        // try {
        //     await db.insert(players)
        //         .values({ id: interaction.user.id, points: Number(amount) })
        //         .onConflictDoUpdate({ target: players.id, set: { points: Number(amount) }})
        //     await interaction.reply({ content: `Added ${amount} points to your account`, ephemeral: true });
        // } catch (error) {
        //     if(error instanceof DrizzleError) {
        //         await interaction.reply({ content: error.message, ephemeral: true });
        //     } else {
        //         await interaction.reply({ content: 'An error occurred', ephemeral: true });
        //     }
        // }
	},
} satisfies Command;
