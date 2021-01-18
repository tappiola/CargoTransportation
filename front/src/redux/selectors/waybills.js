/* eslint-disable camelcase */
export const waybillsSelector = (waybills) => waybills.map((u) => {
  const { consignment_note, ...other } = u;
  return { ...other, ...consignment_note };
});
