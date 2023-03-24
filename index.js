// coded by DikiDjatar
const { Configuration, OpenAIApi } = require("openai");

const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const path = require("path");

const express = require("express");
const app = express();

const server = require("http").createServer(app);
const io = require("socket.io")(server);

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API,
});

const openai = new OpenAIApi(configuration);

app.use(express.static(path.join(__dirname + "/public")));
app.use(bodyParser.json());
app.use(cors());

io.on("connection", function (socket) {
  socket.on("prompt", function (data) {
    console.log(data);
    friendChat(data.text);
  });

  async function friendChat(message) {
    const prompt = `You: ${message}\nFriend: `;
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 0.5,
      max_tokens: 60,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0,
      stop: ["You:"],
    });
    const chatBotMessage = response.data.choices[0].text;
    socket.emit("chatbot", { chat: chatBotMessage });
  }
});

const PORT = process.env.PORT || 6000;
server.listen(PORT, () => {
  console.log(`Server is running on port : ${PORT}`);
});
