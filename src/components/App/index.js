import React from "react";
import Table from "../../containers/Table";
import Wrapper from "../Wrapper";
import Header from "../Header";

import "../../styles/App.css";

function App() {
  return (
    <div className="App">
      <Wrapper>
        <Header />
        <Table />
      </Wrapper>
    </div>
  );
}

export default App;
