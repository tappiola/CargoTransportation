import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { Container } from '@material-ui/core';

import { useStyles } from './Template.styles';
import { BACKEND_HOST } from 'constants/environment';
import { isDataURL } from 'utils';

const Template = ({ color, image, user }) => {
  const { watch } = useFormContext();
  const { company } = useSelector(({ currentUser }) => currentUser);
  const { text, birthday } = watch();
  const age = new Date().getYear() - new Date(birthday).getYear();
  const classes = useStyles();

  return (
    <Container style={{ backgroundColor: color }}>
      <header className={classes.header}>
        <h1 className={classes.h1}>
          <strong>
            {`Уважаемый ${user?.firstName || '...'} ${user?.middleName || ''}!`}
          </strong>
          <br />
          {`Поздраляем Вас с ${age || '...'}-летием.`}
        </h1>
        <img
          src="https://pngimg.com/uploads/confetti/confetti_PNG87007.png"
          alt="confettti"
          className={classes.confetti}
        />
      </header>
      <main className={classes.main}>
        <img
          alt="gift"
          className={classes.gift}
          src={isDataURL(image) ? image : `${BACKEND_HOST}/uploads/${image}`}
        />
        <p className={classes.text}>
          {text}
        </p>
      </main>
      <footer className={classes.footer}>
        <p>
          С уваженем,
          <br />
          коллектив ООО
          <b>
            ”
            {company}
            ”
          </b>
        </p>
      </footer>
    </Container>
  );
};

export default Template;
