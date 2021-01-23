import Grid from "@material-ui/core/Grid";
import ControlledAutocomplete from "../../../components/ControlledAutocomplete";
import NavButton from "../../../components/Buttons/NavButton";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {dispatchGetClients} from "redux/actions";
import {isEmpty} from "utils/objectUtils";

const ClientForm = () => {
  const {clientsData} = useSelector(({clients}) => clients);

  const dispatch = useDispatch();
  useEffect(() => {dispatch(dispatchGetClients())}, []);

  return <Grid container spacing={3} justify="space-between" alignItems="center">
              <Grid item xs={12} md={8} lg={9}>
                <ControlledAutocomplete
                  name="client"
                  fieldName="fullName"
                  options={clientsData}
                  getOptionLabel={(option) => option.fullName || ""}
                  getOptionSelected={(option, value) => isEmpty(value) || option.fullName === value.fullName}
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
