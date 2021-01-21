import Grid from "@material-ui/core/Grid";
import ControlledAutocomplete from "../../../components/ControlledAutocomplete";
import NavButton from "../../../components/Buttons/NavButton";
import React from "react";
import {useSelector} from "react-redux";

const ClientForm = () => {
  const {clientsData} = useSelector(({clients}) => clients);

  return <Grid container spacing={3} justify="space-between" alignItems="center">
              <Grid item xs={12} md={8} lg={9}>
                <ControlledAutocomplete
                  name="clientName"
                  fieldName="fullName"
                  options={clientsData}
                  getOptionLabel={(option) => option.fullName}
                  getOptionSelected={(option, value) => option.fullName === value.fullName}
                  label='ФИО'
                  defaultValue={{}}
                />
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
                <NavButton variant="contained" color="secondary" to={'/clients/new'}>Добавить нового клиента</NavButton>
              </Grid>
            </Grid>
}

export default ClientForm;
