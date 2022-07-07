import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import FullPaageLoader from "./component/FullPageLoader";
import Home from "./page/home-all";
import Adminpage from "./page/admin/main-admin";
import Alluser from "./page/admin/alluser";
import Storepage from "./page/admin/storepage";
import Billpage from "./page/admin/bill_page";
import Store_Login from "./page/StoreUser/store_login";
import MainStorepage from "./page/StoreUser/main_store";
import Billlist from "./page/StoreUser/bill_list"
const App = () => {
  const [loading, setloading] = useState(false);

  useEffect(() => {
    setloading(true);
    setTimeout(() => {
      setloading(false);
    }, 1);
  }, []);
  return loading ? (
    <FullPaageLoader />
  ) : (
    [
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/storepage" component={Storepage} />

          <Route path="/Login" component={Home} />
          <Route path="/adminpage" component={Adminpage} />
          <Route path="/alluserpage" component={Alluser} />
          <Route path="/billpage" component={Billpage} />
          {/* storeuser */}
          <Route path="/loginStore" component={Store_Login} />
          <Route path="/mainstore" component={MainStorepage} />
          <Route path="/Billuser" component={Billlist} />

          

        </Switch>
      </Router>,
    ]
  );
};

export default App;
