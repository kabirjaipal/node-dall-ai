# node-dall-ai-2

A type safe library for interacting with OpenAI's Dall-E 2 AI.

Dall-E 2 is a new AI system that can create realistic images and art from a description in natural langauge.

[https://openai.com/dall-e-2/](https://openai.com/dall-e-2/)

# Setup

To get access to Dall-E 2's API you need to join the waitlist and wait to be accepted which can be found [here](https://labs.openai.com/waitlist).

1. To get the your unique session key you need to go to [https://labs.openai.com/](https://labs.openai.com/).
2. Open the Network Tab in Developer Tools in your browser.
3. Send an image request in the input box.
4. In the network tab you'll find a POST request to [https://labs.openai.com/api/labs/tasks](https://labs.openai.com/api/labs/tasks).
5. In the POST request headers you'll find your session key in the "Authorization" header, it'll look something like "sess-xxxxxxxxxxxxxxxxxxxxxxxxxxxx".

# Usage

```sh
npm i node-dall-ai-2
```

```js
import { Dalle } from "node-dall-ai-2";

const dalle = new Dalle({
  apiKey: `Auth_Token`,
});

(async () => {
  const data = await dalle.generate(`cat`); // return array of data

  console.log(data);
})();
```

### Output

```
[
  {
    id: 'generation-QyXXdJP165TiSpSrzBqAo6IS',
    object: 'generation',
    created: 1659149946,
    generation_type: 'ImageGeneration',
    generation: {
      image_path: 'https://openailabsprodscus.blob.core.windows.net/private/...'
    },
    task_id: 'task-QCKmkq8rxg0ablIgiXizTn0y',
    prompt_id: 'prompt-IN4gE4yFBTi4MPlEG3GzCE4R',
    is_public: false
  },
  {
    id: 'generation-UNJiRu5dzbvJYo8FVnZs5SCS',
    object: 'generation',
    created: 1659149946,
    generation_type: 'ImageGeneration',
    generation: {
      image_path: 'https://openailabsprodscus.blob.core.windows.net/private/...'
    },
    task_id: 'task-QCKmkq8rxg0ablIgiXizTn0y',
    prompt_id: 'prompt-IN4gE4yFBTi4MPlEG3GzCE4R',
    is_public: false
  },
  {
    id: 'generation-XCqpvMF0araPjFczwwfDGHGv',
    object: 'generation',
    created: 1659149946,
    generation_type: 'ImageGeneration',
    generation: {
      image_path: 'https://openailabsprodscus.blob.core.windows.net/private/...'
    },
    task_id: 'task-QCKmkq8rxg0ablIgiXizTn0y',
    prompt_id: 'prompt-IN4gE4yFBTi4MPlEG3GzCE4R',
    is_public: false
  },
  {
    id: 'generation-sSo1TufL7d4OSGEBTwRTMtxv',
    object: 'generation',
    created: 1659149946,
    generation_type: 'ImageGeneration',
    generation: {
      image_path: 'https://openailabsprodscus.blob.core.windows.net/private/...'
    },
    task_id: 'task-QCKmkq8rxg0ablIgiXizTn0y',
    prompt_id: 'prompt-IN4gE4yFBTi4MPlEG3GzCE4R',
    is_public: false
  }
]
```

### Get the first image URL

```js
const firstImage = data[0].generation.image_path;
console.log(firstImage);
```

### Output

```
'https://openailabsprodscus.blob.core.windows.net/private/...'
```

<br/>

# Support Server

[Join Now](https://discord.gg/PcUVWApWN3)

# Npm Package

[Visit](https://www.npmjs.com/package/node-dall-ai-2)

# Discord Bot Example

[Visit](https://github.com/kabirsingh2004/dall-e-discord-bot]

<h1 align="center"> Thanks For Visiting Here </h1><br/>
