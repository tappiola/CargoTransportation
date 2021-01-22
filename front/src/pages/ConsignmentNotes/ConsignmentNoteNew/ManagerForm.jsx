import Grid from "@material-ui/core/Grid";
import ControlledAutocomplete from "../../../components/ControlledAutocomplete";
import NavButton from "../../../components/Buttons/NavButton";
import React from "react";
import {useSelector} from "react-redux";
import {usersWithRoleSelector} from "../../../redux/selectors/employees";

const ClientForm = () => {
  const {employeesData} = useSelector(({employees}) => employees);
  const managersData = usersWithRoleSelector(employeesData, 'manager');

  return <Grid container spacing={3} justify="space-between" alignItems="center">
              <Grid item xs={12}>
                <ControlledAutocomplete
                  name="manager"
                  fieldName="fullName"
                  options={managersData}
                  getOptionLabel={(option) => option.fullName}
                  getOptionSelected={(option, value) => option.fullName === value.fullName}
                  label='ФИО'
                  defaultValue={{}}
                />
              </Grid>
            </Grid>
}

export default ClientForm;
