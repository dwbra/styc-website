'use client';
import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import spotifyAuth from '../../helpers/spotifyAuth';
import getGoogleTokens from '../../helpers/getGoogleTokens';
import fetchSpotifyTracks from '../../helpers/spotifyFetchTracks';
import spotifyDataModifier from '../../helpers/spotifyDataModifier';
import getYoutubeVideoIds from '../../helpers/getYoutubeVideoIds';
import youtubeSearchModifier from '../../helpers/youtubeSearchModifier';
import postYoutubeTrack from '@/app/helpers/postYoutubeTrack';

import styles from '../../page.module.scss';
import { TextField, Button, CircularProgress, Modal, Box, Fade, Backdrop } from '@mui/material';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid grey',
  boxShadow: 24,
  p: 4,
  textAlign: 'center',
};

const ConverterFormValidation = Yup.object().shape({
  spotifyPlaylistId: Yup.string().required('This is a required field.'),
  spotifyClientId: Yup.string().required('This is a required field.'),
  spotifyClientSecret: Yup.string().required('This is a required field.'),
  youtubePlaylistId: Yup.string().required('This is a required field.'),
  googleClientId: Yup.string().required('This is a required field.'),
  googleClientSecret: Yup.string().required('This is a required field.'),
});

const ConverterForm = () => {
  let spotifyStore = [];
  let spotifyNext = null;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  const spotifyRecursive = async callback => {
    const getPlaylist = await callback;

    if (!!spotifyNext) {
      spotifyStore = [...spotifyStore, ...getPlaylist?.items];
      spotifyNext = getPlaylist?.tracks?.next;
      spotifyRecursive();
    }

    return;
  };

  const CallStack = async ({
    spotifyPlaylistId,
    spotifyClientId,
    spotifyClientSecret,
    youtubePlaylistId,
    googleClientId,
    googleClientSecret,
  }) => {
    const googleFetchTokens = await getGoogleTokens(googleClientId, googleClientSecret);

    const spotifyToken = await spotifyAuth(spotifyClientId, spotifyClientSecret);

    const getSpotifyPlaylistTracks = await fetchSpotifyTracks(spotifyToken, spotifyPlaylistId);
    spotifyNext = getSpotifyPlaylistTracks?.tracks?.next;
    spotifyStore = [...getSpotifyPlaylistTracks?.tracks?.items];

    if (!!spotifyNext) {
      await spotifyRecursive(fetchOffsetTracks(spotifyToken, spotifyNext));
    }

    const modifiedSpotifyDataJS = spotifyDataModifier(spotifyStore);

    if (!modifiedSpotifyDataJS.length < 1) {
      modifiedSpotifyDataJS.length = 1;
    }

    console.log({ spotifyModifiedData: modifiedSpotifyDataJS });

    const youtubeVideoIds = await getYoutubeVideoIds(googleFetchTokens.access_token, modifiedSpotifyDataJS);

    console.log({ videoIds: youtubeVideoIds });

    if (youtubeVideoIds[0].error) {
      console.log(youtubeVideoIds[0].error);
      alert('Failed');
      return;
    }

    const sanitizedIds = youtubeSearchModifier(youtubeVideoIds);

    console.log({ sanitizedIds });

    /**
     * Create a generator function with a list of yielded async functions. Each yielded function contains a different track to POST into the Youtube playlist.
     */
    async function* postTracks() {
      for (const track of sanitizedIds) {
        yield await postYoutubeTrack(googleFetchTokens.access_token, track, youtubePlaylistId);
      }
    }

    // Create the generator object
    const postRequestResultData = postTracks();

    // Loop over the array of sanitizedIds and call .next() on the generator function to POST the next track.
    for (let i = 0; i < sanitizedIds.length; i++) {
      postRequestResultData.next();
      // Wait 4s after each request to ensure we don't hit API errors.
      await new Promise(r => setTimeout(r, 4000));
    }
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
        validationSchema={ConverterFormValidation}
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
          handleModalOpen();
          await CallStack({
            spotifyPlaylistId,
            spotifyClientId,
            spotifyClientSecret,
            youtubePlaylistId,
            googleClientId,
            googleClientSecret,
          });
          // resetForm();
          setSubmitting(false);
          handleModalClose();
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
      <Modal
        open={isModalOpen}
        onClose={handleModalClose}
        aria-describedby="conversion form is submitting"
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={isModalOpen}>
          <Box sx={modalStyle}>
            <h4 style={{ marginBottom: '30px' }}>Please wait while your playlist is being built.</h4>
            <CircularProgress />
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default ConverterForm;
