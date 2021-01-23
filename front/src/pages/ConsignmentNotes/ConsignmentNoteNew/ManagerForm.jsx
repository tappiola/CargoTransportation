import Grid from "@material-ui/core/Grid";
import ControlledAutocomplete from "../../../components/ControlledAutocomplete";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {usersWithRoleSelector} from "redux/selectors/employees";
import {dispatchGetEmployees} from "redux/actions";
import {isEmpty} from "utils/objectUtils";

const ClientForm = () => {
  const {employeesData} = useSelector(({employees}) => employees);
  const managersData = usersWithRoleSelector(employeesData, 'manager');

  const dispatch = useDispatch();
  useEffect(() => {dispatch(dispatchGetEmployees())}, []);

  return <Grid container spacing={3} justify="space-between" alignItems="center">
              <Grid item xs={12}>
                <ControlledAutocomplete
                  name="manager"
                  fieldName="fullName"
                  options={managersData}
                  getOptionLabel={(option) => option.fullName || ""}
                  getOptionSelected={(option, value) => isEmpty(value) || option.fullName === value.fullName}
                  label='ФИО'
                  defaultValue={{}}
                />
              </Grid>
            </Grid>
}

export default ClientForm;
