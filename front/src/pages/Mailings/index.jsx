/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { Button } from '@material-ui/core';
import {
  cyan, green, grey, red, blue, amber,
} from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import { Add } from '@material-ui/icons';

import LiveResult from './LiveResult';
import { useStyles } from './Mailing.styles';
import { getTemplate } from 'api';
import BackButton from 'components/Buttons/BackButton';
import SubmitButton from 'components/Buttons/SubmitButton';
import ControlledAutocomplete from 'components/ControlledAutocomplete';
import ControlledField from 'components/ControlledField';
import GridToolbar from 'components/GridToolbar';
import PaddedContainer from 'components/PaddedContainer';
import PaddedPapper from 'components/PaddedPaper';
import { BACKEND_HOST } from 'constants/environment';
import { getAuthToken } from 'utils';

const COLORS = [cyan, green, grey, red, blue, amber];
const DEFAULT_IMAGES = [
  'default1.png',
  'default2.png',
  'default3.png',
];

export default function Mailings() {
  const classes = useStyles();
  const { employeesData } = useSelector(({ employees }) => employees);
  const { setValue, handleSubmit, ...methods } = useForm({
    defaultValues: employeesData[0],
  });

  const [selectedImage, setSelectedImage] = useState(DEFAULT_IMAGES[0]);
  const [userImages, setUserImages] = useState([]);
  const [selectedColor, setSelectedColor] = useState('#fff');
  const [user, setUser] = useState(employeesData[0]);

  const loadFiles = ({ target: { files } }) => {
    const [file] = files;

    if (!file) { return; }

    const reader = new FileReader();
    reader.onload = ({ target: { result } }) => setUserImages([...userImages, result]);

    reader.readAsDataURL(file);
  };

  useEffect(async () => {
    if (!user?.id) {
      return;
    }
    setValue('birthday', user.birthday);
    getTemplate(user.id)
      .then(({ color, text, image }) => {
        setSelectedColor(color);
        setValue('text', text);
        setSelectedImage(image);
      })
      .catch(() => console.log('not found'));
  }, [user?.id]);

  const sendFormData = async (data) => {
    const formData = new FormData();

    formData.append('image', data.image[0]);
    formData.append('data', JSON.stringify({
      color: selectedColor, userId: user.id, text: data.text, image: selectedImage,
    }));

    await fetch('http://localhost:5000/api/mails', {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
  };

  return (
    <PaddedContainer>
      <BackButton link="/" text="На главную страницу" />
      <GridToolbar title="Редактирование шаблона" />
      <FormProvider {...methods}>
        <Grid container justify="flex-start" spacing={4}>
          <Grid item className={classes.aside} xs={12} md={6} xl={4}>
            <form onSubmit={handleSubmit(sendFormData)}>
              <PaddedPapper title="Текст шаблона">
                <ControlledAutocomplete
                  name="fullName"
                  label="Пользователь"
                  options={employeesData}
                  getOptionSelected={({ id: opt }, { id: val }) => (!opt) || opt === val}
                  onSelectionChange={(option) => setUser(option)}
                  getOptionLabel={(option) => option.fullName || option}
                />
                <ControlledField name="birthday" label="Дата рождения" type="date" InputLabelProps={{ shrink: true }} />
                <ControlledField name="text" label="Текст поздравления" multiline />
              </PaddedPapper>

              <PaddedPapper title="Цвет фона">
                {COLORS.map(({ A100: currColor }) => (
                  <Button
                    key={currColor}
                    style={{ background: currColor }}
                    className={classes.colorBtn}
                    onClick={() => setSelectedColor(currColor)}
                  />
                ))}
                <Button component="label" className={classes.colorBtn}>
                  <input type="color" onInput={({ target }) => setSelectedColor(target.value)} />
                </Button>
              </PaddedPapper>

              <PaddedPapper title="Изображение">
                <Grid container spacing={1} wrap="wrap">
                  {[...DEFAULT_IMAGES, ...userImages].map((src) => (
                    src && (
                      <Grid item key={src}>
                        <img src={`${BACKEND_HOST}/${src}`} alt="avatar" className={classes.image} onClick={() => setSelectedImage(src)} />
                      </Grid>
                    )
                  ))}
                  <Grid item>
                    <Button variant="contained" component="label" color="secondary" className={classes.image}>
                      <Add className={classes.iconButton} />
                      <input name="image" type="file" ref={methods.register} onInput={loadFiles} hidden />
                    </Button>
                  </Grid>
                </Grid>
              </PaddedPapper>
              <SubmitButton>Сохранить</SubmitButton>
            </form>
          </Grid>

          <Grid item xs={12} md={6} xl={8} className={classes.template}>
            <PaddedPapper title="Итоговый результат" className={classes.fullWidth}>
              <LiveResult color={selectedColor} image={selectedImage} user={user} />
            </PaddedPapper>
          </Grid>
        </Grid>
      </FormProvider>

    </PaddedContainer>
  );
}
