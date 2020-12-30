import * as actionTypes from './actionTypes';

function createData(id, name, email, unn, companyAccountNumber, isActive) {
  return {
    id, name, email, unn, companyAccountNumber, isActive
  };
}

const FAKE_EMPLOYEES = [
  createData(1, 'Иванов Иван Иванович', 'i.ivanov@gmail.com', 'БелСпецТранспорт', 845785123, 1),
  createData(2, 'Сидоров Петр Валерьевич', 'sidorov@mail.ru', 'ТехСтройСервис', 454751578, 0),
  createData(3, 'Пупкин Василий Васильевич', 'vpupkin@mail.ru', 'ГосТрансАвто', 989898988, 1),
  createData(4, 'Васюков Геннадий Аркадьевич', 'vasiukovvv@gmail.com', 'ТрансАвтоЭкспресс', 789456123, 1),
  createData(5, 'Прохоров Александр Аркадьевич', 'a.prohorov@minsktrans.com', 'Минсктранс', 345876312, 1),
  createData(6, 'Валерьянов Михаил Васильевич', 'valerianov.m@mail.ru', 'Гомельтранс', 145872369, 1),
  createData(7, 'Пронченко Геннадий Аркадьевич', 'pronchenko@auto.com', 'ПронченкоТранс', 225469531, 0),
  createData(8, 'Астапук Геннадий Аркадьевич', 'astapuk@yandex.ru', 'АвтоПромТранс', 785136589, 0),
  createData(9, 'Кабанов Геннадий Аркадьевич', 'kabanov@gmail.com', 'МинскСтройЭкспорт', 753951825, 1),
  createData(10, 'Гаврилюк Геннадий Аркадьевич', 'gavriliuk@mail.ru', 'АвтоГрузТранс', 654128934, 1),
  createData(11, 'Минченко Геннадий Аркадьевич', 'minchenko@gmail.com', 'ИП Минченко', 746328451, 1),
  createData(12, 'Зарубин Антон Викторович', 'zarubin@gmail.com', 'ЧТУП СтройЭкспортТранс', 878788889, 1),
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
