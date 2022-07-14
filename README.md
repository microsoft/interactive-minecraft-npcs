# Interactive NPCs for Minecraft

This repository contains the code referred in the paper below:

<a href="https://wordplay-workshop.github.io/modern/assets/pdfs/6.pdf">Craft an Iron Sword: Dynamically Generating Interactive Game Characters by Prompting Large Language Models Tuned on Code</a><br/>
<i>In the proceedings of NAACL 2022 workshop - Wordplay: When Language Meets Games </i><br/>
Ryan Volum, Sudha Rao, Michael Xu, Gabriel DesGarennes, Chris Brockett, Benjamin Van Durme, Olivia Deng, Akanksha Malhotra, Bill Dolan <br/>
Microsoft Corporation <br/>

Contact Person: Sudha Rao (Sudha.Rao@microsoft.com)

This repository contains prototype code that uses Codex in gaming. Codex is a code generation model that fine-tuned GPT-3 with OSS code. Here we use it to generate code and dialog in gaming contexts to explore what might be possible. 

## Getting Started

Currently this repo contains code that applies Codex in Minecraft. It uses a bot Minecraft library called `mineflayer` to generate a non-player agent (NPC) and enables that NPC to turn commands into code. 

### Requirements

To run this prototype, you'll need the following: 

1. **Minecraft** - specifically the Java version, as the Windows version does not seem to expose LAN ports
1. **Node.js and npm** - the prototype was tested with Node version v14.17.5, but newer versions should work
1. **Access to the OpenAI Codex API** - this prototype specifically uses the `codex-davinci-msft` model
1. **git** - if you're reading this, this is probably self evident :)

### Running the prototype

1. Clone the repo: `git clone https://github.com/microsoft/codex-gaming.git`
1. Install npm packages: `npm i`
1. Rename `.env.example` to `.env`
1. Grab your Codex API key from `https://beta.openai.com/account/api-keys` and add it to the `.env` file
1. Open Minecraft and create a one player new world. Set "Allow Cheats" to true
1. Enter the world and open settings (hitting the escape key). Select "Open to LAN", selecting "Allow Cheats" again. To avoid being killed in-game while programming, set mode to "Creative"
1. Open the world to LAN, and copy the port number that appears as an in-game message. Add that port number to the `.env` file
1. Run the bot: `node index.js`. To automatically re-run the bot as you make code changes, consider installing `nodemon` and running `nodemon index.js`
1. You can see the code produced by the bot in the console window 

You should now see an NPC appear that you can interact with! To type commands or messages to the NPC, press "t" to open the chat window, and type the command or message. 

## Introductory Demo

https://user-images.githubusercontent.com/64496188/179088024-bfefd7f0-b83a-44d3-8e42-c97bb46fb051.mp4

## How it Works

For now, this prototype uses zero-shot learning and no fine-tuning to generate code. Instead, it relies on engineered context and prompts. Our contexts live in the `context` directory and are intended to give the model a sense for the shape of the API we're using (`mineflayer`), along with the structure of the calls we will make. Pulling from the `context/commands.js` file, here is a subset of our context:

```js
// "Go backwards"
bot.setControlState('back', true)

// "Hello!"
bot.chat("Yo! How's it going?");
```

As you can see, we give commands in the form of comments, which is followed by the code that should be executed to satisfy the command. When calling the model, we can now simply pass a comment with our command (e.g. `// "Go Forward"`) and the model will generate the next line - the code that satisfies the command (e.g. `bot.setControlState('forward', true)`). In the `index.js`, we run the code by simply calling JavaScript's "eval" function on it. 

### Context Class

This project includes a Context class, which you can find in `Context.js` in the root directory. This class enables a few things:

- To build new prompts against the model
- To append past interactions to future prompts
- To enable an interface for learning and "unlearning" from previous interactions

The Context class exposes a few functions: 

- `addInteraction`: Appends the last call + response to the existing context. This happens automatically as you interact with the NPC. 
- `removeLastInteraction`: Remove the last call + response from the context. If the NPC does something wrong, you can say "unlearn" to have this function invoked.
- `resetContext`: Removes all interactions from the context, effectively resetting the context.
- `craftPrompt`: A helper method to append a prompt to a context, to be sent to the model. 
- `fixResponse`: Removes last response and adds a corrected response. Currently triggered by saying "fix:..." with the correct code to the NPC.

Use these functions or add more to "machine teach" your NPC as you interact!

### Web-based viewer

You can watch the player and the NPC nagivate the minecraft world by going to http://localhost:3030/ 

### Using a seed to initialize Minecraft world

By default, the new world started in Minecraft (Java edition) does not have easy access to interesting resources. Follow the steps below to arrive at a world that is comparatively flat and has interesting resources nearby. 

- In the Create New World window, select 'More World Options'
- In the 'Seed for the world generator' text box, enter 6714107141548954383
- Select 'Game Rules' and under World Updates, switch off 'Advance time of day', 'Update weather'. This will make sure that it is always day time and no rain in the newly created world.

## Escape Room Demo

Here is a demo of a player collaborating with the NPC to escape out of two escape rooms

https://user-images.githubusercontent.com/64496188/179092236-ec6362ea-249b-4e23-95d9-8c3d94ba4560.mp4

## Contributing

This project welcomes contributions and suggestions.  Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit https://cla.opensource.microsoft.com.

When you submit a pull request, a CLA bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., status check, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

## Trademarks

This project may contain trademarks or logos for projects, products, or services. Authorized use of Microsoft 
trademarks or logos is subject to and must follow 
[Microsoft's Trademark & Brand Guidelines](https://www.microsoft.com/en-us/legal/intellectualproperty/trademarks/usage/general).
Use of Microsoft trademarks or logos in modified versions of this project must not cause confusion or imply Microsoft sponsorship.
Any use of third-party trademarks or logos are subject to those third-party's policies.
