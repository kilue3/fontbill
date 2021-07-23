import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import FullPaageLoader from './component/FullPageLoader';
import Home from "./page/home-all";
import ShowschMain from "./page/sch_main-show";
import ShowschSub from "./page/sch_sub-show";
import Login from "./page/login-register/login-all";
import Register from './page/login-register/register-all';
import Profile from "./page/profile";
import StaffPage from "./page/staff_page/home-staff";
import ApproveUser from "./page/staff_page/approve_user";
import ApproveUserDetail from "./page/staff_page/approve_user_detail";
import Approprop from "./page/staff_page/approveprop"
import ManageUser from "./page/staff_page/manage_user";
import Scholarship from "./page/staff_page/m_sch_main-show";
import ScholarshipCreateMain from "./page/staff_page/m_sch_main-create";
import ManageCategory from "./page/staff_page/manage_category";
import ManageAgency from "./page/staff_page/manage_agency";
import MaddSsholar from "./page/staff_page/m_sch_main-add_sub";
//import choseMsch from "./page/staff_page/choose_main_scholarship";
import editMscholar from "./page/staff_page/m_sch_main-edit";
import editShscholar from "./page/staff_page/m_sch_sub-show";
import editDataShscholar from "./page/staff_page/m_sch_sub-edit";
import Follow from "./page/followpage";
import AllSchollarpage from "./page/sch_main-showAll";
import Newresult from "./page/staff_page/sch_notify-create";
import Allresutpage from "./page/sch_notify-showAll";
import Result_pagestaff from "./page/staff_page/sch_notify-show";
import result_showpage  from "./page/sch_notify-page";
import editrelt from './page/staff_page/Editresult-props';
import userinfo  from "./page/staff_page/user_info";

const App = () => {
    const [loading, setloading] = useState(false);

    useEffect(() => {
        setloading(true)
        setTimeout(() => {
            setloading(false)
        }, 0)
    }, []);
    return (
        loading ? <FullPaageLoader /> : [
            <Router>
                <Switch>

                    <Route exact path="/" component={Home} />
                    <Route path="/home" component={Home} />
                    <Route path="/allscholarship" component={AllSchollarpage} />
                    <Route path="/scholarshipMain/:id" component={ShowschMain} />
                    <Route path="/scholarshipSub/:id" component={ShowschSub} />

                    <Route path="/allScholarshipNotify" component={Allresutpage} />
                    <Route path="/ScholarshipNotify/:id" component={result_showpage} />

                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <Route path="/profile/" component={Profile} />

                    <Route path="/staff_page" component={StaffPage} />
                    <Route path="/staff/approve_user" component={ApproveUser} />
                    <Route path="/staff/approve_user_detail/:id" component={Approprop} />
                    <Route path="/staff/manage_user" component={ManageUser} />
                    <Route path="/staff/scholarship" component={Scholarship} />
                    <Route path="/staff/scholarship_create-main" component={ScholarshipCreateMain} />
                    {/* <Route path="/staff/scholarship_create-sub" component={ScholarshipCreateSub} /> */}
                    <Route path="/staff/manage_category" component={ManageCategory} />
                    <Route path="/staff/manage_agency" component={ManageAgency} />
                    {/* <Route path="/staff/scholarship_create/choose_main_scholarship" component={choseMsch} /> */}
                    <Route path="/staff/MainAddSunsholar/:id" component={MaddSsholar} />
                    <Route path="/staff/MainEditSunsholar/:id" component={editMscholar} />
                    <Route path="/staff/ShEditSunsholar/:id" component={editShscholar} />
                    <Route path="/staff/editDataShscholar/:id" component={editDataShscholar} />
                    <Route path="/staff/NewResultpage" component={Newresult} />
      
                    <Route path="/followpage" component={Follow} />
                    <Route path="/staff/resultpagestaff" component={Result_pagestaff} />
                    <Route path="/staff/editresult/:id" component={editrelt}/>
                    <Route path="/userinfo/:id" component={userinfo} />

                    
                </Switch>
            </Router>
        ]

    );
}

export default App;