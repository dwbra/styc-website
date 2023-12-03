import React from 'react';
import Adsense from '@/app/components/_AdSense_Square';
import styles from '../../page.module.scss';
import { Link } from '@mui/material';
import Image from 'next/image';

const YoutubeGuidePage = () => {
  return (
    <div className={styles.youtubeGuidePage}>
      <h1>Youtube API Guide</h1>
      <h3>Follow the step by step instructions below to get your Youtube API keys.</h3>
      <ol>
        <li>
          Visit <Link href="https://console.developers.google.com">Google Developer Console</Link> and log in with your
          gmail account. If you do not have a gmail account you will need to create one.
        </li>
        <li>
          Once you have signed in, you should be at this url https://console.cloud.google.com/cloud-resource-manager. In
          the top left, click on <strong>create project</strong>. Give your project a name and click continue.
        </li>
        <li>
          Wait for the project to be created and then click on view project. Once that page has loaded you should see a
          dashboard screen as per the screenshot below.
          <Image
            width={100}
            height={100}
            src="/public/google-dev-project-dashboard.png"
            alt="google-dev-project-dashboard"
          ></Image>
        </li>
        <li>
          In the middle of the screen, or if you scroll down on mobile you will see APIS. Click on the arrow link
          reading <strong>Go to APIS overview.</strong>
        </li>
        <li>
          At the top you will see a blue plus with the words <strong>Enable APIS and services.</strong> Click on that
          link.
        </li>
        <li>In the search field, type in Youtube and hit enter.</li>
        <li>
          In the list of options, click on <strong>Youtube Data API v3</strong>.
        </li>
        <li>
          Click on the blue enable button. Once that has finished loading, you should see a page as per the image below.
          <Image
            width={100}
            height={100}
            src="/Users/dworkman/Coding/styc_website/public/google-dev-project-api-enabled.png"
            alt="google-dev-project-api-enabled"
          ></Image>
        </li>
        <li>
          On the right of the screen click on the blue button that says <strong>create credentials.</strong>
        </li>
        <li>
          The youtube API should already be selected. Click on <strong>user data</strong> and hit next.
        </li>
        <li>Enter in an app name, and your email addresses in the required fields then hit save and continue.</li>
        <li>You should now be on the scopes section. Scroll down and click save and continue.</li>
        <li>
          Under application type select <strong>Web application</strong>. Give the app a name of your choosing. Under
          <strong>Authorized redirect URIS</strong> add http://localhost:5000/api/google-auth-url and then hit create.
        </li>
        <li>
          Now you can download your credentials! This will be a json file that you can open and retrieve your clientId
          and client secret API keys from. Alternatively you can copy the clientId from the screen there and click done.
          Then on the left hand screen click credentials, the name of your OAuth credential, and then you should see
          your client secret there also.
        </li>
      </ol>
      <Adsense styles={{ display: 'block', width: '1200px', height: '280px' }} slot="xyz" />
    </div>
  );
};

export default YoutubeGuidePage;
