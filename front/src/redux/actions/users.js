import * as api from 'api';
import * as actionTypes from './actionTypes';

function createData(id, name, email, companyName, companyAccountNumber) {
  return {
    id,
    name,
    email,
    companyName,
    companyAccountNumber,
    city: 'Minsk',
    street: 'Gorodeckaya',
    house: '32a',
    roles: { admin: true },
    birthDate: new Date(1993, 5, 8),
  };
}

const FAKE_USERS = [
  createData(
    1,
    'Иванов Иван Иванович',
    'i.ivanov@gmail.com',
    'БелСпецТранспорт',
    845785123,
  ),
  createData(
    2,
    'Сидоров Петр Валерьевич',
    'sidorov@mail.ru',
    'ТехСтройСервис',
    454751578,
  ),
  createData(
    3,
    'Пупкин Василий Васильевич',
    'vpupkin@mail.ru',
    'ГосТрансАвто',
    989898988,
  ),
  createData(
    4,
    'Васюков Геннадий Аркадьевич',
    'vasiukovvv@gmail.com',
    'ТрансАвтоЭкспресс',
    789456123,
  ),
  createData(
    5,
    'Прохоров Александр Аркадьевич',
    'a.prohorov@minsktrans.com',
    'Минсктранс',
    345876312,
  ),
  createData(
    6,
    'Валерьянов Михаил Васильевич',
    'valerianov.m@mail.ru',
    'Гомельтранс',
    145872369,
  ),
  createData(
    7,
    'Пронченко Геннадий Аркадьевич',
    'pronchenko@auto.com',
    'ПронченкоТранс',
    225469531,
  ),
  createData(
    8,
    'Астапук Геннадий Аркадьевич',
    'astapuk@yandex.ru',
    'АвтоПромТранс',
    785136589,
  ),
  createData(
    9,
    'Кабанов Геннадий Аркадьевич',
    'kabanov@gmail.com',
    'МинскСтройЭкспорт',
    753951825,
  ),
  createData(
    10,
    'Гаврилюк Геннадий Аркадьевич',
    'gavriliuk@mail.ru',
    'АвтоГрузТранс',
    654128934,
  ),
  createData(
    11,
    'Минченко Геннадий Аркадьевич',
    'minchenko@gmail.com',
    'ИП Минченко',
    746328451,
  ),
  createData(
    12,
    'Зарубин Антон Викторович',
    'zarubin@gmail.com',
    'ЧТУП СтройЭкспортТранс',
    878788889,
  ),
];

export const setUsers = (usersData) => ({
  type: actionTypes.USERS_SET,
  usersData,
});

export const handleDeleteUsers = (ids) => ({
  type: actionTypes.USERS_DELETE,
  ids,
});

export const dispatchGetUsers = () => (dispatch) => setTimeout(
  () => Promise.resolve(FAKE_USERS).then((usersData) => dispatch(setUsers(usersData))),
  1000,
);

export const dispatchSetUser = ({ id, ...data }) => (dispatch) => {
  api
    .setUser({ id, data })
    .then(
      () => dispatch({
        type: actionTypes.USERS_SET_USER_COMPLETE,
        isSuccess: true,
      }),
      () => dispatch({
        type: actionTypes.USERS_SET_USER_COMPLETE,
        isSuccess: false,
      }),
    )
    .catch(() => dispatch({
      type: actionTypes.USERS_SET_USER_COMPLETE,
      isSuccess: false,
    }));
};

export const dispatchDeleteUsers = (ids) => (dispatch) => dispatch(handleDeleteUsers(ids));
