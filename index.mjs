import * as dotenv from "dotenv";
dotenv.config();
import {
  Client,
  GatewayIntentBits,
  ActionRowBuilder,
  EmbedBuilder,
  StringSelectMenuBuilder,
  Colors,
  ApplicationCommandOptionType,
} from "discord.js";
import { Dalle } from "node-dall-ai-2";
import config from "./config";

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
  allowedMentions: {
    repliedUser: false,
  },
});

let dataObject = {};

const dalle = new Dalle({
  apiKey: config.apiKey, // to get key check package npm home page
});

client.on("ready", () => {
  console.log("Bot is Ready");

  client.application.commands.set([
    {
      name: `image`,
      description: `Generate Image By Dall Open AI`,
      options: [
        {
          name: `query`,
          description: `give pic name`,
          type: ApplicationCommandOptionType.String,
          required: true,
        },
      ],
    },
  ]);
});

client.on("interactionCreate", async (interaction) => {
  if (interaction.isCommand()) {
    await interaction.deferReply({ fetchReply: true }).catch((e) => {});
    switch (interaction.commandName) {
      case "image":
        {
          let input = interaction.options.getString("query");
          interaction.followUp({
            content: `Please Wait ...`,
          });
          const response = await dalle.generate(input).catch((e) => {
            interaction.editReply({
              content: `> Error \n\n ${e.message}`,
            });
          });

          if (!response) {
            return interaction.followUp({
              content:
                "Dall-e 2 couldn't generate images based upon the given caption.",
              ephemeral: true,
            });
          }
          const { data } = response;

          const options = data?.map((data, index) => {
            let key = data?.id;
            dataObject[key] = {
              url: data.generation.image_path,
              id: data.id,
              createdAt: data.created,
            };
            return {
              label: `${input} Image : ${index + 1}`,
              description: `Click to See Image`,
              value: data?.id,
            };
          });
          const row = new ActionRowBuilder().addComponents(
            new StringSelectMenuBuilder()
              .setCustomId("img_select")
              .setPlaceholder("Click To See Images")
              .addOptions(options)
          );
          let embed = new EmbedBuilder()
            .setColor(Colors.Blurple)
            .setTitle(`Dall AI Image Generator`)
            .setDescription(`images found for \`${input}\``);

          interaction.editReply({
            embeds: [embed],
            components: [row],
          });
        }
        break;

      default:
        break;
    }
  }

  if (interaction.isStringSelectMenu()) {
    await interaction.deferUpdate().catch((e) => {});
    if (interaction.customId === "img_select") {
      const value = interaction.values[0];
      let data = dataObject[value];
      if (!data)
        return interaction
          .followUp({
            content: `Something Went Wrong`,
            ephemeral: true,
          })
          .catch((e) => interaction.deferReply().catch((e) => {}));
      let embed = EmbedBuilder.from(interaction.message.embeds[0]);
      interaction.message.edit({
        embeds: [embed.setImage(data.url)],
      });
    }
  }
});

client.login(config.BotToken);

process.on("unhandledRejection", (reason, p) => {
  console.log(" [Error_Handling] :: Unhandled Rejection/Catch");
  console.log(reason, p);
});

process.on("uncaughtException", (err, origin) => {
  console.log(" [Error_Handling] :: Uncaught Exception/Catch");
  console.log(err, origin);
});

process.on("uncaughtExceptionMonitor", (err, origin) => {
  console.log(" [Error_Handling] :: Uncaught Exception/Catch (MONITOR)");
  console.log(err, origin);
});
