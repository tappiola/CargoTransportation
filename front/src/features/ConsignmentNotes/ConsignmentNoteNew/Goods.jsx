import React from 'react';

import ControlledTable from 'components/ControlledTable';

const TABLE_COLUMNS = [
  { columnKey: 'name', columnName: 'Наименование' },
  { columnKey: 'quantity', columnName: 'Кол-во' },
  { columnKey: 'unit', columnName: 'Ед. измерения' },
  { columnKey: 'cost', columnName: 'Стоимость (руб)' },
  { columnKey: 'weight', columnName: 'Масса (кг)' },
  { columnKey: 'notes', columnName: 'Примечания' },
];

const TABLE_NAME = 'goods';

const COLUMN_KEYS = TABLE_COLUMNS.reduce((prev, next) => [...prev, next.columnKey], []);

const Goods = () => (
  <ControlledTable
    tableName={TABLE_NAME}
    tableColumns={TABLE_COLUMNS}
    columnKeys={COLUMN_KEYS}
    confirmDeleteTitle="Удаление товарной позиции"
    confirmDeleteDescription="Вы уверены, что хотите удалить выбранный товар?"
  />
);

export default Goods;
