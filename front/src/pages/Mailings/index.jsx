/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { Button } from '@material-ui/core';
import {
  cyan, green, grey, red, blue, amber,
} from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import { Add } from '@material-ui/icons';

import LiveResult from './LiveResult';
import { useStyles } from './Mailing.styles';
import BackButton from 'components/Buttons/BackButton';
import SubmitButton from 'components/Buttons/SubmitButton';
import ControlledAutocomplete from 'components/ControlledAutocomplete';
import ControlledField from 'components/ControlledField';
import GridToolbar from 'components/GridToolbar';
import PaddedContainer from 'components/PaddedContainer';
import PaddedPapper from 'components/PaddedPaper';
import { ELASTIC_INDICIES } from 'constants/elastic';
import { useElastic, getAuthToken } from 'utils';

const COLORS = [cyan, green, grey, red, blue, amber];
const DEFAULT_IMAGES = [
  'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8aHVtYW58ZW58MHx8MHw%3D&ixlib=rb-1.2.1&w=1000&q=80',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbhPRCm9OEftQyqrF_vxXdQKZwf_YH9aaTKg&usqp=CAU',
  'http://pngimg.com/uploads/gift/gift_PNG5946.png',
];

const defaultValues = {
  user: {
    firstName: 'Стас',
    lastName: 'Михайлов',
    fullName: 'Михайлов Стас',
  },
  image: null,
  text: '',
  birthday: Date.now(),
};

export default function Mailings() {
  const classes = useStyles();
  const methods = useForm({ defaultValues });
  const { options, onChange } = useElastic(ELASTIC_INDICIES.USERS, 'fullName');
  const [image, setImage] = useState(DEFAULT_IMAGES[0]);
  const [userImages, setUserImages] = useState([]);
  const [color, setColor] = useState('#fff');
  const [userId, setUserId] = useState(null);
  const loadFiles = ({ target: { files } }) => {
    const [file] = files;
    if (file instanceof File) {
      const reader = new FileReader();

      reader.onload = ({ target }) => (
        target?.result && setUserImages([...userImages, target?.result])
      );

      reader.readAsDataURL(file);
    }
  };

  useEffect(async () => {
    console.log(userId);
    if (!userId) {
      return;
    }
    const response = await fetch(`http://localhost:5000/api/mails/${userId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    const template = await response.json();
    setColor(template.color);
    methods.setValue('text', template.text);

    const blob = await fetch(`http://localhost:5000/api/mails/images/${template.image}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });

    const file = await blob.blob();
    setImage(URL.createObjectURL(file));
  }, [userId]);

  const sendFormData = async (data) => {
    const formData = new FormData();
    formData.append('image', data.image[0]);
    formData.append('color', color);
    formData.append('text', data.text);
    formData.append('userId', userId);

    await fetch('http://localhost:5000/api/mails', {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
  };

  const getOption = () => true;

  return (
    <PaddedContainer>
      <BackButton link="/" text="На главную страницу" />
      <GridToolbar title="Редактирование шаблона" />
      <FormProvider {...methods}>
        <Grid container justify="flex-start" spacing={4}>
          <Grid item className={classes.aside} xs={12} md={6} xl={4}>
            <form onSubmit={methods.handleSubmit(sendFormData)}>
              <PaddedPapper title="Текст шаблона">
                <ControlledAutocomplete
                  name="user"
                  label="Пользователь"
                  options={options}
                  onInputChange={(e) => e?.target && onChange(e)}
                  getOptionSelected={getOption}
                  onSelectionChange={(option) => option && setUserId(option.id)}
                  getOptionLabel={({ firstName, lastName }) => `${lastName} ${firstName}` || '  '}
                />
                <ControlledField type="date" label="Дата рождения" name="birthdate" InputLabelProps={{ shrink: true }} />
                <ControlledField label="Текст поздравления" name="text" multiline fullWidth />
              </PaddedPapper>

              <PaddedPapper title="Цвет фона">
                {COLORS.map(({ A100: currColor }) => (
                  <Button
                    key={currColor}
                    style={{ background: currColor }}
                    className={classes.colorBtn}
                    onClick={() => setColor(currColor)}
                  />
                ))}
                <Button component="label" className={classes.colorBtn}>
                  <input type="color" onInput={({ target }) => setColor(target.value)} />
                </Button>
              </PaddedPapper>

              <PaddedPapper title="Изображение">
                <Grid container spacing={1} wrap="wrap">
                  {[...DEFAULT_IMAGES, ...userImages].map((src) => (
                    src && (
                      <Grid item key={src}>
                        <img src={src} alt="avatar" className={classes.image} onClick={() => setImage(src)} />
                      </Grid>
                    )
                  ))}
                  <Grid item>
                    <Button variant="contained" component="label" color="secondary" className={classes.image}>
                      <Add className={classes.iconButton} />
                      <input name="image" ref={methods.register} onInput={loadFiles} type="file" />
                    </Button>
                  </Grid>
                </Grid>
              </PaddedPapper>
              <SubmitButton>Сохранить</SubmitButton>
            </form>
          </Grid>

          <Grid item xs={12} md={6} xl={8} className={classes.template}>
            <PaddedPapper title="Итоговый результат">
              <LiveResult color={color} image={image} />
            </PaddedPapper>
          </Grid>
        </Grid>
      </FormProvider>

    </PaddedContainer>
  );
}
