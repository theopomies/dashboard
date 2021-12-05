import type { NextApiRequest, NextApiResponse } from "next";
import { generateRandomString } from "../../../../utils/generateRandomString";

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  var scope = "read:user repo";

  var state = generateRandomString(16);

  var auth_query_parameters = new URLSearchParams({
    client_id: process.env.GITHUB_CLIENT_ID,
    scope,
    redirect_uri: "http://localhost:3000/api/auth/github/callback",
    state,
  });

  res.redirect(
    "https://github.com/login/oauth/authorize?" +
      auth_query_parameters.toString()
  );
}
