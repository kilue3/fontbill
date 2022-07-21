import React, { useState } from "react";
import {
  Card,

  Row,
  
  CardBody,
} from "reactstrap";
import Home from ".././../img/home.png"
import user from ".././../img/user.png"
import bill from ".././../img/invoice.png"
import store from ".././../img/store.png"
import Historybill from ".././../img/history.png"

const StaffLeftMenu = () => {
  const session = {
    id: localStorage.getItem("id"),
    fname: localStorage.getItem("fname"),
    lname: localStorage.getItem("lname"),
    status: localStorage.getItem("status"),
  };
  const [status, SetStatus] = useState(session);
  return (
    <>
      <div class="TZS-LeftMenu-Container">
        <Row>
        {status.status == "admin" || status.status == "normal" ? (
          <>
 <div className="col-sm-12 col-md-12 col-lg-12 col-LeftMenuSetting">
 <Card className="CardBackground-1">
   <CardBody className="CardBody">
     <a href="/adminpage">
       <div className="buttonMenu">
         <img
           className="buttonMenuIcon"
           src={Home}
         />
         กำหนดขอบเขตการวางบิล
       </div>
     </a>
   </CardBody>
 </Card>

 <Card className="CardBackground-1">
   <CardBody className="CardBody">
     <a href="/alluserpage">
       <div className="buttonMenu">
         <img
           className="buttonMenuIcon"
           src={user}
         />
         ผู้ใช้งานในระบบ
       </div>
     </a>

     <a href="/storepage">
       <div className="buttonMenu">
         <img
           className="buttonMenuIcon"
           src= {store}
         />
         รายชื่อร้านค้าในระบบ
       </div>
     </a>
     <a href="/billpage">
       <div className="buttonMenu">
         <img
           className="buttonMenuIcon"
           src={bill}
         />
         รายการวางบิล
       </div>
     </a>
     <a href="/Billpasspage">
       <div className="buttonMenu">
         <img
           className="buttonMenuIcon"
           src={Historybill}
         />
         บิลที่ผ่านการอนุมัติแล้ว
       </div>
     </a>
   </CardBody>
 </Card>
</div>

<div className="col-sm-6 col-md-6 col-lg-12 col-LeftMenuSetting">
 
</div> 
</>                           ) : (
                              <>
                               <div className="col-sm-12 col-md-12 col-lg-12 col-LeftMenuSetting">

                              <Card className="CardBackground-1">
                 <CardBody className="CardBody">
                     <a href="/mainstore">
                         <div className="buttonMenu">
                             <img className="buttonMenuIcon" src={Home} />
                             หน้าแรก
                         </div>
                     </a>
                     <a href="/Billuser">
                         <div className="buttonMenu">
                             <img className="buttonMenuIcon" src={bill} />
                             รายการวางบิล
                         </div>
                     </a>
                     <a href="/History_bill">
                         <div className="buttonMenu">
                             <img className="buttonMenuIcon" src={Historybill}/>
                             ประวัติการวางบิล
                         </div>
                     </a>
                     
                 </CardBody>
             </Card>
</div>
</>
                            )}
         
        </Row>
      </div>
    </>
  );
};

export default StaffLeftMenu;
