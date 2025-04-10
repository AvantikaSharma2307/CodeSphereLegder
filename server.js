// server.js
require('dotenv').config();
const express=require('express');
const{ post, get }=require('axios');
const cors=require('cors');

const app = express();
app.use(cors());

app.get('/auth/github/callback', async (req, res) => {
  const code = req.query.code;
  if (!code) return res.status(400).send('No code provided');

  try {
    // Step 1: Exchange code for access token
    const tokenResponse = await post(
      `https://github.com/login/oauth/access_token`,
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      },
      {
        headers: { Accept: 'application/json' },
      }
    );

    const accessToken = tokenResponse.data.access_token;

    // Step 2: Use access token to get user data
    const userResponse = await get(`https://api.github.com/user`, {
      headers: { Authorization: `token ${accessToken}` },
    });

    const user = userResponse.data;
    console.log(user);

    // Here, you'd usually create/find the user in DB and issue your JWT
    res.json({ user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'));
