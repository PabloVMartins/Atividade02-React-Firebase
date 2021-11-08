import React from "react";
import ListaJogos from "./components/ListaJogos";
import Titulo from "./components/Titulo";
import Avaliar from "./components/Avaliar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Titulo />
      <Switch>
        <Route path="/" exact>
          <ListaJogos />
        </Route>
        <Route path="/avaliar/:id">
          <Avaliar />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
