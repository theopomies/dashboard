import type { NextApiRequest, NextApiResponse } from "next";
import request from "request";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  var code = req.query.code;

  var authOptions = {
    url: "https://accounts.spotify.com/api/token",
    form: {
      code: code,
      redirect_uri: "http://localhost:3000/api/auth/spotify/callback",
      grant_type: "authorization_code",
    },
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(
          process.env.SPOTIFY_CLIENT_ID +
            ":" +
            process.env.SPOTIFY_CLIENT_SECRET
        ).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    json: true,
  };

  request.post(authOptions, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      console.log(JSON.stringify(body));
      res.redirect(
        `/spotify?access_token=${body.access_token}&refresh_token=${body.refresh_token}&expires_in=${body.expires_in}`
      );
    }
  });
}