import * as actionTypes from './actionTypes';

function createData(id, name, email, isActive) {
  return {
    id, name, email, isActive,
  };
}

const FAKE_EMPLOYEES = [
  createData(1, 'Иванов Иван Иванович', 'i.ivanov@gmail.com', 1),
  createData(2, 'Сидоров Петр Валерьевич', 'sidorov@mail.ru', 0),
  createData(3, 'Пупкин Василий Васильевич', 'vpupkin@mail.ru', 1),
  createData(4, 'Васюков Геннадий Аркадьевич', 'vasiukovvv@gmail.com', 1),
  createData(5, 'Прохоров Александр Аркадьевич', 'a.prohorov@minsktrans.com', 1),
  createData(6, 'Валерьянов Михаил Васильевич', 'valerianov.m@mail.ru', 1),
  createData(7, 'Пронченко Геннадий Аркадьевич', 'pronchenko@auto.com', 0),
  createData(8, 'Астапук Геннадий Аркадьевич', 'astapuk@yandex.ru', 0),
  createData(9, 'Кабанов Геннадий Аркадьевич', 'kabanov@gmail.com', 1),
  createData(10, 'Гаврилюк Геннадий Аркадьевич', 'gavriliuk@mail.ru', 1),
  createData(11, 'Минченко Геннадий Аркадьевич', 'minchenko@gmail.com', 1),
  createData(12, 'Зарубин Антон Викторович', 'zarubin@gmail.com', 1),
];

export const setEmployees = (usersData) => ({
  type: actionTypes.EMPLOYEES_SET,
  usersData,
});

export const handleDeleteUsers = (ids) => ({
  type: actionTypes.EMPLOYEES_DELETE,
  ids,
});

export const dispatchGetEmployees = () => (dispatch) => setTimeout(
  () => Promise.resolve(FAKE_EMPLOYEES)
    .then((data) => dispatch(setEmployees(data))),
  1000,
);

export const dispatchDeleteEmployees = (ids) => (dispatch) => dispatch(handleDeleteUsers(ids));
