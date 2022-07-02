import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import FullPaageLoader from "./component/FullPageLoader";
import Home from "./page/home-all";
import Adminpage from "./page/admin/main-admin";
import Alluser from "./page/admin/alluser";
const App = () => {
  const [loading, setloading] = useState(false);

  useEffect(() => {
    setloading(true);
    setTimeout(() => {
      setloading(false);
    }, 0);
  }, []);
  return loading ? (
    <FullPaageLoader />
  ) : (
    [
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/home" component={Home} />
          <Route path="/adminpage" component={Adminpage} />
          <Route path="/alluserpage" component={Alluser} />
        </Switch>
      </Router>,
    ]
  );
};

export default App;
