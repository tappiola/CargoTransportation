/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import {
  Container, makeStyles, Typography, TextField, Button,
} from '@material-ui/core';
import { cyan, green, grey } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import { Add } from '@material-ui/icons';

import BackButton from 'components/Buttons/BackButton';
import SubmitButton from 'components/Buttons/SubmitButton';
import ControlledAutocomplete from 'components/ControlledAutocomplete';
// import ControlledField from 'components/ControlledField';
import GridToolbar from 'components/GridToolbar';
import PaddedContainer from 'components/PaddedContainer';
import PaddedPapper from 'components/PaddedPaper';
import { ELASTIC_INDICIES } from 'constants/elastic';
import { useElastic } from 'utils';

const COLORS = [cyan, green, grey];
const IMAGES = [
  'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8aHVtYW58ZW58MHx8MHw%3D&ixlib=rb-1.2.1&w=1000&q=80',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbhPRCm9OEftQyqrF_vxXdQKZwf_YH9aaTKg&usqp=CAU',
];

const useStyles = makeStyles(() => ({
  colorInput: {
    width: 50,
    height: 50,
    border: 'none',
    backgroundColor: 'transparent',
    '&:focus': {
      outline: 'none',
    },
  },
  aside: {
    maxWidth: 400,
  },
  template: {
    position: 'relative',
    minWidth: 350,
    minHeight: 700,
    flex: 1,
    '& *': {
    },
  },
}));

export default function Mailings() {
  const classes = useStyles();
  const defaultValues = {
    user: {
      firstName: 'Стас',
      lastName: 'Михайлов',
      fullName: 'Михайлов Стас',
    },
  };
  const [user, setUser] = useState(defaultValues.user);
  const methods = useForm({ defaultValues });
  // const { handleSubmit } = methods;
  const { options, onChange } = useElastic(ELASTIC_INDICIES.USERS, 'fullName');
  // const getOption = ({ fullName: option }, { fullName: value }) => (!option) || option === value;
  const [color, setColor] = useState('#000000');
  const [image, setImage] = useState(IMAGES[0]);
  const [text, setText] = useState('');
  const [birthdate, setBirthdate] = useState('1995-12-17T03:24:00');

  const ColorInput = ({ onClick, disabled, ...props }) => (
    <input
      className={classes.colorInput}
      type="color"
      onClickCapture={(event) => {
        if (disabled) {
          setColor(event.target.value);
          event.preventDefault();
        }
      }}
      onChange={({ target }) => setColor(target.value)}
      {...props}
    />
  );

  return (
    <>
      <PaddedContainer>
        <BackButton link="/" text="На главную страницу" />
        <GridToolbar title="Редактирование шаблона" />
        <Grid container justify="flex-start">
          <Grid item className={classes.aside}>
            <FormProvider {...methods}>
              <form>
                <PaddedPapper title="Текст шаблона">
                  <ControlledAutocomplete
                    name="user"
                    options={options}
                    label="Пользователь"
                    onInputChange={(e) => e?.target && onChange(e)}
                    onChange={setUser}
                    getOptionLabel={({ firstName, lastName }) => `${lastName} ${firstName}` || '  '}
                  />
                  <TextField type="date" label="Дата рождения" name="birthdate" InputLabelProps={{ shrink: true }} onChange={({ target }) => setBirthdate(target.value)} />
                  <TextField label="Текст поздравления" multiline fullWidth value={text} onChange={({ target }) => setText(target.value)} />
                </PaddedPapper>

                <PaddedPapper title="Цвет фона">
                  <Grid container>
                    <Typography>Свой цвет</Typography>
                    <ColorInput defaultValue={color} />
                    <Grid container>
                      <Typography>Стандартные цвета </Typography>
                      {COLORS.map((materialColor) => (
                        <ColorInput
                          key={materialColor[50]}
                          defaultValue={materialColor[300]}
                          disabled
                        />
                      ))}
                    </Grid>
                  </Grid>
                </PaddedPapper>

                <PaddedPapper title="Изображение">
                  <Grid container spacing={1} wrap="wrap">
                    {IMAGES.map((url) => (
                      <Grid item key={url}>
                        <img
                          src={url}
                          alt="avatar"
                          width="100"
                          height="100"
                          onClick={() => setImage(url)}
                        />
                      </Grid>
                    ))}
                    <Grid item>
                      <Button
                        variant="contained"
                        component="label"
                        color="secondary"
                        style={{ height: 100, width: 100 }}
                      >
                        <Add style={{ height: 95, width: 95 }} />
                        <input type="file" hidden />
                      </Button>
                    </Grid>
                  </Grid>
                </PaddedPapper>
              </form>
            </FormProvider>
          </Grid>

          <PaddedPapper title="Итоговый результат">
            <Grid item>
              <Container className={classes.template} style={{ backgroundColor: color }}>
                <header style={{ paddingTop: 20 }}>
                  <img alt="sdfsdf" src={image} style={{ display: 'inline-block', width: 100 }} />
                  <h1 style={{ display: 'inline-block', width: '50%', marginLeft: 20 }}>
                    {`Уважаемый ${user.firstName} ${user.middleName || ''}!`}
                  </h1>
                </header>
                <main>
                  <p>
                    {`Поздраляем Вас с
                ${new Date().getYear() - new Date(birthdate).getYear()}-летием.`}
                  </p>
                  <p>
                    {text}
                  </p>
                </main>
                <footer style={{
                  position: 'absolute',
                  bottom: 0,
                  marginTop: 20,
                  paddingBottom: 20,
                }}
                >
                  <p>
                    С уваженем,
                    <br />
                    коллектив ООО
                    <b> ”Транспортные системы”</b>
                  </p>
                </footer>
              </Container>
            </Grid>
          </PaddedPapper>
        </Grid>
        <SubmitButton />
      </PaddedContainer>
    </>
  );
}
