import type { CommandInteraction } from 'discord.js';
import { DrizzleError } from 'drizzle-orm';

export async function HandleError(error: unknown, interaction: CommandInteraction) {
    if (error instanceof DrizzleError) {
        console.error(error.message);
        await interaction.reply({ content: 'Database Error', ephemeral: true });
    } else if (error instanceof Error) {
        await interaction.reply({ content: error.message, ephemeral: true });
    } else {
        await interaction.reply({ content: 'An error occurred', ephemeral: true });
    }
}
