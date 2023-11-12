import React from 'react';
import styles from '../page.module.scss';
import { Link, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const HelpPage = () => {
  return (
    <div className={styles.helpPage}>
      <h1>Help & FAQS</h1>
      <p>
        If you have questions, please check our FAQS or alternatively submit a form with your question and I will
        endevour to do my best to read it and add it to the FAQS section. For any quesitons to do with the API itself,
        please read either Spotify or Googles documentation.
      </p>
      <div>
        <h3>FAQS</h3>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
            <h5>Accordion 1</h5>
          </AccordionSummary>
          <AccordionDetails>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit
              leo lobortis eget.
            </p>
          </AccordionDetails>
        </Accordion>
      </div>
      <div>
        <h3>Ask away!</h3>
        <p>Additional questions</p>
        <p>
          <strong>FORM GOES HERE!!!!!!!!!!!!</strong>
        </p>
      </div>
    </div>
  );
};

export default HelpPage;
