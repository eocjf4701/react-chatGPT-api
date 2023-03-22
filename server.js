const OpenAI = require('openai')
const { Configuration, OpenAIApi } = OpenAI

const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3001;

const configuration = new Configuration({
  organization: "eocjf4701",
  apiKey: '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',
});
const openai = new OpenAIApi(configuration);

app.use(bodyParser.json());
app.use(cors());

app.post('/', async (req, res) => {
  const { message } = req.body
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `${message}`,
    max_tokens: 4000,
    temperature: 0,
  });
  console.log(response.data)
  if (response.data) {
    if (response.data.choices) {
      res.json({
        message: response.data.choices[0].text
      })
    }
  }
})

app.listen(port, () => {
  console.log('Example app port: ' + port);
})