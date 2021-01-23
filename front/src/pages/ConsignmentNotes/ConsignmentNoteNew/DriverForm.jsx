import Grid from "@material-ui/core/Grid";
import ControlledAutocomplete from "../../../components/ControlledAutocomplete";
import BaseField from "components/ControlledField";
import React, {useEffect, useState} from "react";
import {useFormContext} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import * as api from "../../../api";
import {usersWithRoleSelector} from 'redux/selectors/employees';
import {dispatchGetEmployees} from "../../../redux/actions";
import {isEmpty} from "utils/objectUtils";

const DriverForm = () => {
  const { setValue } = useFormContext();

  const {employeesData} = useSelector(({employees}) => employees);
  const driversData = usersWithRoleSelector(employeesData, 'driver');

  const [driverId, setDriverId] = useState();
  const [passportData, setPassportData] = useState({});

  const dispatch = useDispatch();
  useEffect(() => {dispatch(dispatchGetEmployees())}, []);

  useEffect(() => {
    if (driverId) {
      api.getDocuments(driverId).then(data => {
        setPassportData(data);
        setValue('passportNumber', data.passportNumber, { shouldValidate: true });
        setValue('passportIssuedBy', data.passportIssuedBy, { shouldValidate: true });
        setValue('passportIssuedAt', data.passportIssuedAt, { shouldValidate: true });
      }
      );
    } else {
      setPassportData({});
      setValue('passportNumber', '');
      setValue('passportIssuedBy', '');
      setValue('passportIssuedAt', '');
    }
  }, [driverId]);

  return <Grid container spacing={3} justify="space-between" alignItems="center">
              <Grid item xs={12} md={7}>

                <ControlledAutocomplete
                  name="driver"
                  fieldName="fullName"
                  options={driversData}
                  getOptionLabel={(option) => option.fullName || ""}
                  getOptionSelected={(option, value) => isEmpty(value) || option.fullName === value.fullName}
                  onSelectionChange={(value) => {
                    setDriverId(value?.id);
                  }}
                  label='ФИО'
                  defaultValue={{}}
                />
              </Grid>
                  <Grid item xs={12} md={5}>
                <BaseField name="vehicle" label="Транспортное средство" value={passportData.passportNumber}/>
              </Grid>
              <Grid item xs={12} md={3}>
                <BaseField name="passportNumber" label="Номер паспорта" value={passportData.passportNumber}/>
              </Grid>
                 <Grid item xs={12} md={3}>
                <BaseField
                  name="passportIssuedAt"
                  label="Дата выдачи паспорта"
                  type="date"
                  InputLabelProps={{shrink: true}}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <BaseField name="passportIssuedBy" label="Место выдачи паспорта"/>
              </Grid>
            </Grid>
}

export default DriverForm;
