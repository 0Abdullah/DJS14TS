# Discord JS v14 Bot Template, with full TypeScript support and Drizzle ORM
A modified version of the [Official create-discord-bot Template](https://github.com/discordjs/discord.js/tree/main/packages/create-discord-bot), with repo fixes and a Database ORM included ([Drizzle ORM](https://orm.drizzle.team/)).

# Cloning the repository
```bash
git clone https://github.com/0Abdullah/DJS14TS.git
```

# Installing dependencies
```bash
pnpm install
```

# Setting up Environment Variables
Copy the `.env.example` file in the root directory of the project, and rename it to `.env`. Fill in the required values in the `.env` file

# Running the bot

## Development
```bash
pnpm dev
```

### Deploying user commands
```bash
pnpm deploy-commands
```

## Production
```bash
pnpm build
```
