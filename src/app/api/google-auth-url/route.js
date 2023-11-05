import { OAuth2Client } from 'google-auth-library';
import { NextResponse } from 'next/server';

// import http from 'http';
// import url from 'url';
// import open from 'open';
// import destroyer from 'server-destroy';

export async function POST(request) {
  const { googleClientId, googleClientSecret, GoogleAuthTokenUrl } = await request.json();

  const oAuth2Client = new OAuth2Client(googleClientId, googleClientSecret, GoogleAuthTokenUrl);

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

  return NextResponse.json(
    {
      body: authorizeUrl,
    },
    {
      status: 200,
    }
  );
}

// export default function GoogleAuthUrl(googleClientId, googleClientSecret, googleUri) {
//   const oAuth2Client = new OAuth2Client(googleClientId, googleClientSecret, googleUri);
//   const scopes = [
//     'https://www.googleapis.com/auth/youtube',
//     'https://www.googleapis.com/auth/youtube.upload',
//     'https://www.googleapis.com/auth/youtube.readonly',
//     'https://www.googleapis.com/auth/youtube.force-ssl',
//     'https://www.googleapis.com/auth/youtubepartner',
//   ];

//   // Generate a url that asks permissions
//   const authorizeUrl = oAuth2Client.generateAuthUrl({
//     // 'online' (default) or 'offline' (gets refresh_token)
//     access_type: 'offline',
//     /** Pass in the scopes array defined above.
//      * Alternatively, if only one scope is needed, you can pass a scope URL as a string */
//     scope: scopes,
//     // Enable incremental authorization. Recommended as a best practice.
//     include_granted_scopes: true,
//   });

//   return authorizeUrl;
// }

// /**
//  * Start by acquiring a pre-authenticated oAuth2 client.
//  */
// async function GoogleAuth(googleClientId, googleClientSecret, googleUri) {
//   const oAuth2Client = await getAuthenticatedClient(googleClientId, googleClientSecret, googleUri);
//   return oAuth2Client;
// }

// function getAuthenticatedClient(googleClientId, googleClientSecret, googleUri) {
//   return new Promise((resolve, reject) => {
//     const oAuth2Client = new OAuth2Client(googleClientId, googleClientSecret, googleUri);

//     const scopes = [
//       'https://www.googleapis.com/auth/youtube',
//       'https://www.googleapis.com/auth/youtube.upload',
//       'https://www.googleapis.com/auth/youtube.readonly',
//       'https://www.googleapis.com/auth/youtube.force-ssl',
//       'https://www.googleapis.com/auth/youtubepartner',
//     ];

//     // Generate a url that asks permissions
//     const authorizeUrl = oauth2Client.generateAuthUrl({
//       // 'online' (default) or 'offline' (gets refresh_token)
//       access_type: 'offline',
//       /** Pass in the scopes array defined above.
//        * Alternatively, if only one scope is needed, you can pass a scope URL as a string */
//       scope: scopes,
//       // Enable incremental authorization. Recommended as a best practice.
//       include_granted_scopes: true,
//     });

//     // Open an http server to accept the oauth callback. In this simple example, the
//     // only request to our webserver is to /oauth2callback?code=<code>
//     const server = http
//       .createServer(async (req, res) => {
//         try {
//           if (req.url.indexOf('/oauth2callback') > -1) {
//             // acquire the code from the querystring, and close the web server.
//             const qs = new url.URL(req.url, 'http://localhost:3000').searchParams;
//             const code = qs.get('code');
//             console.log(`Code is ${code}`);
//             res.end('Authentication successful! Please return to the console.');
//             server.destroy();

//             // Now that we have the code, use that to acquire tokens.
//             const r = await oAuth2Client.getToken(code);
//             // Make sure to set the credentials on the OAuth2 client.
//             oAuth2Client.setCredentials(r.tokens);
//             console.info('Tokens acquired.');
//             resolve(oAuth2Client);
//           }
//         } catch (e) {
//           reject(e);
//         }
//       })
//       .listen(3000, () => {
//         // open the browser to the authorize url to start the workflow
//         open(authorizeUrl, { wait: false }).then(cp => cp.unref());
//       });
//     destroyer(server);
//   });
// }

// export default GoogleAuth();
