'use client';
import React, { useState, useEffect, use } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import spotifyAuth from '../../helpers/spotifyAuth';
import getGoogleTokens from '../../helpers/getGoogleTokens';
import fetchSpotifyTracks from '../../helpers/spotifyFetchTracks';
import spotifyDataModifier from '../../helpers/spotifyDataModifier';
import getYoutubeVideoId from '../../helpers/getYoutubeVideoId';
import youtubeSearchModifier from '../../helpers/youtubeSearchModifier';
import postYoutubeTrack from '@/app/helpers/postYoutubeTrack';
import fetchOffsetTracks from '@/app/helpers/spotifyFetchOffsetTracks';

import styles from '../../page.module.scss';
import { TextField, Button, CircularProgress, Modal, Box, Fade, Backdrop } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

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

const googleFetchVideoIds = async (googleTokens, modifiedSpotifyDataJS) => {
  async function* getYoutubeIds() {
    for (const spotifyTrack of modifiedSpotifyDataJS) {
      yield await getYoutubeVideoId(googleTokens.access_token, spotifyTrack);
    }
  }

  const postRequestResultData = getYoutubeIds();
  let ids = [];

  for (let i = 0; i < modifiedSpotifyDataJS.length; i++) {
    const idObj = await postRequestResultData.next();
    ids.push(idObj);
    await new Promise(r => setTimeout(r, 500));
  }

  return ids;
};

const googlePostTracks = async (transformedGoogleIds, googleTokens, youtubePlaylistId) => {
  /**
   * Create a generator function with a list of yielded async functions. Each yielded function contains a different track to POST into the Youtube playlist.
   */
  async function* postTracks() {
    for (const track of transformedGoogleIds) {
      yield await postYoutubeTrack(googleTokens.access_token, track, youtubePlaylistId);
    }
  }

  // Create the generator object
  const postRequestResultData = postTracks();

  // Loop over the array of sanitizedIds and call .next() on the generator function to POST the next track.
  for (let i = 0; i < transformedGoogleIds.length; i++) {
    postRequestResultData.next();
    // Wait 4s after each request to ensure we don't hit API errors.
    await new Promise(r => setTimeout(r, 4000));
  }
};

const ConverterForm = () => {
  const [errorMessage, setErrorMessage] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => {
    setIsModalOpen(false);
    setErrorMessage(null);
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
          setSubmitting(false);

          let spotifyNext = null;
          let spotifyStore = [];

          // //rewrite using a reducer
          // const spotifyRecursive = async callback => {
          //   const getPlaylist = await callback();

          //   if (!!spotifyNext) {
          //     spotifyStore = [...spotifyStore, ...getPlaylist?.items];
          //     spotifyNext = getPlaylist?.tracks?.next;
          //     spotifyRecursive(callback);
          //   }

          //   return;
          // };

          const googleT = await getGoogleTokens(googleClientId, googleClientSecret);

          if (googleT?.error) {
            console.warn('Google Token API Error');
            setErrorMessage(googleT);
            return;
          }

          const spotifyT = await spotifyAuth(spotifyClientId, spotifyClientSecret);

          if (spotifyT?.error) {
            console.warn('Spotify Token API Error');
            setErrorMessage(spotifyT);
            return;
          }

          const spotifyTrax = await fetchSpotifyTracks(spotifyT, spotifyPlaylistId);

          console.log(spotifyTrax);

          if (spotifyTrax?.error) {
            console.warn('Spotify Fetch Error');
            setErrorMessage(spotifyTrax);
            return;
          }

          spotifyNext = spotifyTrax?.tracks?.next;
          spotifyStore = spotifyTrax?.tracks?.items;

          if (!!spotifyNext) {
            await spotifyRecursive(fetchOffsetTracks(spotifyT, spotifyNext));
          }

          const transformedSpotifyStore = spotifyDataModifier(spotifyStore);

          console.log({ transformedSpotifyStore });

          if (transformedSpotifyStore.length > 1) {
            transformedSpotifyStore.length = 1;
          }

          const googleVideoIds = await googleFetchVideoIds(googleT, transformedSpotifyStore);

          console.log({ googleVideoIds });

          const googleTransformed = youtubeSearchModifier(googleVideoIds);

          console.log({ googleTransformed });

          // await googlePostTracks(transformedGoogleIds, googleTokens, youtubePlaylistId);

          // if (errorMessage === null) {
          //   resetForm();
          //   handleModalClose();
          // }
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
            <div style={{ position: 'relative' }}>
              {!!errorMessage ? (
                <>
                  <p>Error Status: {errorMessage.status}</p>
                  <p>{errorMessage.message}</p>
                </>
              ) : (
                <>
                  <h4 style={{ marginBottom: '30px' }}>Please wait while your playlist is being built.</h4>
                  <CircularProgress />
                </>
              )}
              {!!errorMessage && (
                <button onClick={handleModalClose} type="button" className={styles.modalCloseButton}>
                  <ClearIcon />
                </button>
              )}
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default ConverterForm;
