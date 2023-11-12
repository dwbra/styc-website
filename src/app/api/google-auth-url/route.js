import { OAuth2Client } from 'google-auth-library';
import { NextResponse } from 'next/server';

import http from 'http';
import url from 'url';
import open from 'open';
import destroyer from 'server-destroy';

export async function POST(request) {
  const { googleClientId, googleClientSecret, googleRedirectURI } = await request.json();

  const response = await GoogleAuth(googleClientId, googleClientSecret, googleRedirectURI);

  return NextResponse.json(
    {
      body: response?.credentials,
    },
    {
      status: 200,
    }
  );
}

async function GoogleAuth(googleClientId, googleClientSecret, googleUri) {
  const oAuth2Client = await getAuthenticatedClient(googleClientId, googleClientSecret, googleUri);
  return oAuth2Client;
}

function getAuthenticatedClient(googleClientId, googleClientSecret, googleUri) {
  return new Promise((resolve, reject) => {
    const oAuth2Client = new OAuth2Client(googleClientId, googleClientSecret, googleUri);

    const scopes = [
      'https://www.googleapis.com/auth/youtube',
      'https://www.googleapis.com/auth/youtube.upload',
      'https://www.googleapis.com/auth/youtube.readonly',
      'https://www.googleapis.com/auth/youtube.force-ssl',
      'https://www.googleapis.com/auth/youtubepartner',
    ];

    // Generate a url that asks permissions
    const authorizeUrl = oAuth2Client.generateAuthUrl({
      // 'online' (default) or 'offline' (gets refresh_token)
      access_type: 'offline',
      /** Pass in the scopes array defined above.
       * Alternatively, if only one scope is needed, you can pass a scope URL as a string */
      scope: scopes,
      // Enable incremental authorization. Recommended as a best practice.
      include_granted_scopes: true,
    });

    // Open an http server to accept the oauth callback.
    const server = http
      .createServer(async (req, res) => {
        try {
          if (req.url.indexOf('/google-auth-url') > -1) {
            // acquire the code from the querystring, and close the web server.
            const qs = new url.URL(req.url, 'http://localhost:3000').searchParams;
            const code = qs.get('code');
            // console.log(`Code is ${code}`);
            res.end('You may close this browser tab now.');
            server.destroy();

            // Now that we have the code, use that to acquire tokens.
            const r = await oAuth2Client.getToken(code);
            // Make sure to set the credentials on the OAuth2 client.
            oAuth2Client.setCredentials(r.tokens);
            // console.info('Tokens acquired.');
            resolve(oAuth2Client);
          }
        } catch (e) {
          reject(e);
        }
      })
      .listen(5000, () => {
        // open the browser to the authorize url to start the workflow
        open(authorizeUrl, { wait: false }).then(cp => cp.unref());
      });
    destroyer(server);
  });
}
