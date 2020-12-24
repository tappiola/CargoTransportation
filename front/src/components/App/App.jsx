import React from "react";
import { connect } from "react-redux";
import { someActionCreator } from "../../redux/actions";
import Main from "../Main/Main";

function App() {
  return (
    <>
      <h1>Cargo Transportation</h1>
      <Main />
    </>
  );
}

const mapState = (state) => ({ ...state });

const mapDispatch = (dispatch) => ({
  onInit(data) {
    dispatch(someActionCreator(data));
  },
});

export default connect(mapState, mapDispatch)(App);
