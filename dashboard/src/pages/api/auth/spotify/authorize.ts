import type { NextApiRequest, NextApiResponse } from "next";
import { generateRandomString } from "../../../../utils/generateRandomString";

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  var scope = "streaming user-read-email user-read-private";

  var state = generateRandomString(16);

  var auth_query_parameters = new URLSearchParams({
    response_type: "code",
    client_id: process.env.SPOTIFY_CLIENT_ID,
    scope: scope,
    redirect_uri: "http://localhost:3000/api/auth/spotify/callback",
    state: state,
  });

  res.redirect(
    "https://accounts.spotify.com/authorize/?" +
      auth_query_parameters.toString()
  );
}
