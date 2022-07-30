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
import Billlist from "./page/StoreUser/bill_list";
import Billdetail from "./page/StoreUser/bill_detail.js";
import Testfile from "../src/page/testfile";
import Bill_detail_admin from "./page/admin/bill_detail_admin";
import Billpasspage from "./page/admin/ิbillpass";
import History_bill from "./page/StoreUser/history_bill";
import bill_yearpage from "./page/admin/billyearpage"
import Bill_notpass_page from "./page/admin/bill_not pass"


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
          <Route path="/storepage" component={Storepage} />
          <Route path="/Login" component={Home} />
          <Route path="/adminpage" component={Adminpage} />
          <Route path="/alluserpage" component={Alluser} />
          <Route path="/billpage" component={Billpage} />
          {/* storeuser */}
          <Route path="/loginStore" component={Store_Login} />
          <Route path="/mainstore" component={MainStorepage} />
          <Route path="/Billuser" component={Billlist} />
          <Route path="/Billdetailfrom/:id" component={Billdetail} />
          <Route path="/test" component={Testfile} />
          <Route path="/Billdetailfromadmin/:id"  component={Bill_detail_admin} />
          <Route path="/Billpasspage" component={Billpasspage} />
          <Route path="/History_bill" component={History_bill} />
          <Route path="/BillbyYearpage/:id" component={bill_yearpage} />
          <Route path="/Bill_notpass_page" component={Bill_notpass_page} />

        </Switch>
      </Router>,
    ]
  );
};

export default App;
