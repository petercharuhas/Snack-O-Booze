import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import { Route, Switch } from "react-router-dom";
import Menu from "./components/Menu";
import Item from "./components/Item";
import { menuData } from "./data/items";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <main>
          <Switch>
            <Route exact path="/">
              <Home snacks={menuData.snacks} drinks={menuData.drinks} />
            </Route>
            <Route exact path="/snacks">
              <Menu items={menuData.snacks} type="snacks" />
            </Route>
            <Route exact path="/drinks">
              <Menu items={menuData.drinks} type="drinks" />
            </Route>
            <Route path="/snacks/:id">
              <Item items={menuData.snacks} type="snacks" />
            </Route>
            <Route path="/drinks/:id">
              <Item items={menuData.drinks} type="drinks" />
            </Route>
          </Switch>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;