import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { Container } from '@material-ui/core';

import { BACKEND_HOST } from 'constants/environment';

const styles = {
  header: {
    position: 'relative',
    overflow: 'hidden',
    paddingTop: 150,
    filter: 'drop-shadow(1px 1px 4px grey)',
  },
  confetti: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: 'auto',
    opacity: 0.7,
  },
  gift: {
    position: 'relative',
    left: '35%',
    width: '30%',
    height: 'auto',
    filter: 'drop-shadow(1px 1px 4px grey)',
  },
  h1: {
    position: 'absolute',
    top: 50,
    display: 'inline-block',
    fontSize: 20,
    marginLeft: 20,
    fontFamily: 'Arial',
    zIndex: 1,
    width: '100%',
    textAlign: 'center',
    color: '#fefefe',
  },
  image: {
    display: 'inline-block',
    width: 100,
    height: 100,
  },
  text: {
    zIndex: 2,
    fontSize: 16,
  },
  footer: {
    marginTop: 20,
    paddingBottom: 20,
  },
};

const LiveResult = ({ color, image, user }) => {
  const { watch } = useFormContext();
  const { company } = useSelector(({ currentUser }) => currentUser);
  const { text, birthday } = watch();
  const age = new Date().getYear() - new Date(birthday).getYear();

  return (
    <Container style={{ backgroundColor: color }}>
      <header style={styles.header}>
        <h1 style={styles.h1}>
          <strong>{`Уважаемый ${user?.firstName} ${user?.middleName || ''}!`}</strong>
          <br />
          {`Поздраляем Вас с ${age}-летием.`}
        </h1>

        <img src="https://pngimg.com/uploads/confetti/confetti_PNG87007.png" alt="confettti" style={styles.confetti} />
      </header>
      <main style={{ position: 'relative' }}>
        <img src={`${BACKEND_HOST}/${image}`} alt="gift" style={styles.gift} />
        <p>{text}</p>
      </main>
      <footer style={styles.footer}>
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

export default LiveResult;
