/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { Add } from '@material-ui/icons';

import { useStyles } from './Mailing.styles';
import Template from './Template';
import { templateResolver as resolver } from './templateResolver';
import { getTemplate } from 'api';
import BackButton from 'components/Buttons/BackButton';
import SubmitButton from 'components/Buttons/SubmitButton';
import ControlledAutocomplete from 'components/ControlledAutocomplete';
import ControlledField, { DateField } from 'components/ControlledField';
import GridToolbar from 'components/GridToolbar';
import PaddedContainer from 'components/PaddedContainer';
import PaddedPapper from 'components/PaddedPaper';
import { BACKEND_HOST } from 'constants/environment';
import { COLORS, DEFAULT_IMAGES } from 'constants/template';
import { getAuthToken, isDataURL } from 'utils';

export default function Mailings() {
  const classes = useStyles();
  const { employeesData } = useSelector(({ employees }) => employees);
  const { setValue, handleSubmit, ...methods } = useForm({
    resolver,
    reValidateMode: 'onBlur',
  });

  const [userImages, setUserImages] = useState([]);
  const [user, setUser] = useState(employeesData[0]);
  const [selectedColor, setSelectedColor] = useState('#fff');
  const [selectedImage, setSelectedImage] = useState(DEFAULT_IMAGES[0]);

  const loadFiles = ({ target: { files } }) => {
    const [file] = files;

    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = ({ target: { result } }) => {
      setUserImages([...userImages, result]);
    };
    reader.readAsDataURL(file);
  };

  useEffect(async () => {
    setValue('birthday', user?.birthday);

    getTemplate(user?.id).then(
      ({ color, text, image }) => {
        setSelectedColor(color);
        setSelectedImage(image);
        setValue('text', text || '');
      },
    );
  }, [user?.id]);

  const sendFormData = async ({ text }) => {
    const formData = new FormData();

    formData.append('image', methods.getValues('image')[0]);
    formData.append('data', JSON.stringify({
      userId: user.id,
      color: selectedColor,
      image: isDataURL(selectedImage) ? 'file' : selectedImage,
      text,
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
                  name="user"
                  fieldName="fullName"
                  label="Пользователь"
                  options={employeesData}
                  getOptionSelected={({ id: opt }, { id: val }) => (!opt) || opt === val}
                  onSelectionChange={(option) => setUser(option)}
                  getOptionLabel={(option) => option.fullName || option}
                  defaultValue={employeesData[0]}
                />
                <DateField name="birthday" label="Дата рождения" disabled />
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
                    <Grid item key={src}>
                      <img
                        alt="avatar"
                        className={classes.image}
                        onClick={() => setSelectedImage(src)}
                        src={isDataURL(src) ? src : `${BACKEND_HOST}/${src}`}
                      />
                    </Grid>
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
              <Template color={selectedColor} image={selectedImage} user={user} />
            </PaddedPapper>
          </Grid>
        </Grid>
      </FormProvider>

    </PaddedContainer>
  );
}
