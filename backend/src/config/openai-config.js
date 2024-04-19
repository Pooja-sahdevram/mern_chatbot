const { Configuration } = require("openai");

const configureOpenAI = () => {
  const config = new Configuration({
    apiKey: process.env.OPEN_AI_SECRET,
  });
  return config;
};

module.exports = {configureOpenAI};