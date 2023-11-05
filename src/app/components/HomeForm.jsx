'use client';
import React, { useContext } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import SpotifyAuth from '../api/spotifyAuth';
import SpotifyHandler from './SpotifyHandler';
import YoutubeHandler from './YoutubeHandler';
import SpotifyRecursive from '../helpers/SpotifyRecursive';

import StycContext from './_Context';

import styles from '../page.module.scss';
import { TextField, Button } from '@mui/material';

// const ConverterFormValidation = Yup.object().shape({
//   spotifyPlaylistId: Yup.string().required('This is a required field.'),
//   spotifyClientId: Yup.string().required('This is a required field.'),
//   spotifyClientSecret: Yup.string().required('This is a required field.'),
//   youtubePlaylistId: Yup.string().required('This is a required field.'),
//   googleClientId: Yup.string().required('This is a required field.'),
//   googleClientSecret: Yup.string().required('This is a required field.'),
// });

const GoogleAuthUrl = 'http://localhost:3000/api/google-auth-url';
const GoogleAuthTokenUrl = 'http://localhost:3000/api/google-auth-tokens';

const HomeForm = () => {
  const { setGoogleAccessToken, setSpotifyAccessToken } = useContext(StycContext);

  const CallStack = async ({
    spotifyPlaylistId,
    spotifyClientId,
    spotifyClientSecret,
    youtubePlaylistId,
    googleClientId,
    googleClientSecret,
  }) => {
    const googleAuthURL = await fetch(GoogleAuthUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ googleClientId, googleClientSecret, GoogleAuthTokenUrl }),
    });

    const googleUrl = await googleAuthURL.json();
    // setGoogleAccessToken(googleTokens);
    console.log(googleUrl);

    // const spotifyToken = await SpotifyAuth(spotifyClientId, spotifyClientSecret);
    // setSpotifyAccessToken(spotifyToken);
    // console.log(spotifyToken);

    // await SpotifyHandler(spotifyPlaylistId, SpotifyRecursive);
    // await YoutubeHandler(youtubePlaylistId);
  };
  return (
    <div>
      <h3>Convert your Spotify Playlist Below</h3>
      <p>
        Simply enter the required information below and hit submit! The playlist will get built and we will notify you
        once it has been completed!
      </p>
      <Formik
        initialValues={{
          spotifyPlaylistId: '',
          spotifyClientId: '',
          spotifyClientSecret: '',
          youtubePlaylistId: '',
          googleClientId: '',
          googleClientSecret: '',
        }}
        // validationSchema={ConverterFormValidation}
        onSubmit={async (
          {
            spotifyPlaylistId,
            spotifyClientId,
            spotifyClientSecret,
            youtubePlaylistId,
            googleClientId,
            googleClientSecret,
          },
          { setSubmitting, resetForm }
        ) => {
          //   setSubmitting(false);
          await CallStack({
            spotifyPlaylistId,
            spotifyClientId,
            spotifyClientSecret,
            youtubePlaylistId,
            googleClientId,
            googleClientSecret,
          });
          resetForm();
        }}
      >
        {({ isSubmitting, isValid }) => (
          <Form className={styles.homeForm}>
            <Field name="spotifyPlaylistId">
              {({ field, form: { touched, errors }, meta }) => {
                const error = meta.touched && !!meta.error;
                return (
                  <>
                    <TextField
                      error={error}
                      variant="outlined"
                      placeholder={field.name}
                      label={field.name}
                      {...field}
                      helperText={meta.error}
                    />
                  </>
                );
              }}
            </Field>
            <Field name="youtubePlaylistId">
              {({ field, form: { touched, errors }, meta }) => {
                const error = meta.touched && !!meta.error;
                return (
                  <>
                    <TextField
                      error={error}
                      variant="outlined"
                      placeholder={field.name}
                      label={field.name}
                      {...field}
                      helperText={meta.error}
                    />
                  </>
                );
              }}
            </Field>
            <Field name="spotifyClientId">
              {({ field, form: { touched, errors }, meta }) => {
                const error = meta.touched && !!meta.error;
                return (
                  <>
                    <TextField
                      error={error}
                      type="password"
                      variant="outlined"
                      placeholder={field.name}
                      label={field.name}
                      {...field}
                      helperText={meta.error}
                    />
                  </>
                );
              }}
            </Field>
            <Field name="spotifyClientSecret">
              {({ field, form: { touched, errors }, meta }) => {
                const error = meta.touched && !!meta.error;
                return (
                  <>
                    <TextField
                      error={error}
                      type="password"
                      variant="outlined"
                      placeholder={field.name}
                      label={field.name}
                      {...field}
                      helperText={meta.error}
                    />
                  </>
                );
              }}
            </Field>
            <Field name="googleClientId">
              {({ field, form: { touched, errors }, meta }) => {
                const error = meta.touched && !!meta.error;
                return (
                  <>
                    <TextField
                      error={error}
                      type="password"
                      variant="outlined"
                      placeholder={field.name}
                      label={field.name}
                      {...field}
                      helperText={meta.error}
                    />
                  </>
                );
              }}
            </Field>
            <Field name="googleClientSecret">
              {({ field, form: { touched, errors }, meta }) => {
                const error = meta.touched && !!meta.error;
                return (
                  <>
                    <TextField
                      error={error}
                      type="password"
                      variant="outlined"
                      placeholder={field.name}
                      label={field.name}
                      {...field}
                      helperText={meta.error}
                    />
                  </>
                );
              }}
            </Field>
            <Button type="submit" variant="contained" disabled={isSubmitting || !isValid}>
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default HomeForm;
