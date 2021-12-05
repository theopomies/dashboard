import type { NextApiRequest, NextApiResponse } from "next";
import { Octokit } from "octokit";
import request from "request";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  var code = req.query.code;

  var authOptions = {
    url: "https://github.com/login/oauth/access_token",
    form: {
      code: code,
      redirect_uri: "http://localhost:3000/api/auth/github/callback",
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
    },
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
    json: true,
  };

  request.post(authOptions, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      const octokit = new Octokit({ auth: body.access_token });
      octokit.rest.users
        .getAuthenticated()
        .then((value) => {
          res.redirect(
            `/github?access_token=${body.access_token}&id=${value.data.login}`
          );
        })
        .catch(() => res.redirect("/"));
    }
  });
}
