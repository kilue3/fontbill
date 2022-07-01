import React from "react";
import axios from "axios";
import { useState,useEffect } from "react";
import { Card, CardBody, Input, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
const Search = () => {

  // const accessKey = process.env.REACT_APP_ACCESSKEY;          //เป็นตัวแปรที่นำไฟล์.env key Unspach

  const [SearchScholarship, setSearchScholarship] = useState("");                      //เซตเป็นค่าว่างเพื่อในการเก็บค่าที่เปลี่ยนแปลงจาก handleChange


  const [ShowScholarship, setShowUser] = useState([]);                //เซตเป็นค่าว่างเพื่อในการเก็บค่าผลลัพท์จาก handleSubmit

  const handleChange = (event) => {
    setSearchScholarship(event.target.value);                             //รับค่าจาก value ที่กรอกข้อมูลมาและเตรียมเปลี่ยนค่ามาเป็นข้อมูลที่ต้องการ
  };

  useEffect(() => {
    

    const url = "http://localhost:8080/Mback/public/Searchshcholarship?q=" 

    axios.get(url)//โดย axios นั่นดึงค่า url
      .then((response) => {//ใช้ตัวแปรค่า คือ responseเพื่อเก็บค่า

        setShowUser(response.data,); // เก็บค่า response หลังจาก ดึงค่าข้อมูลผลลัพธ์
      });
  },[SearchScholarship]);
  

  return (
    
    <Card className="CardBackground-1">
      <CardBody>
        <h6>
          <img className="buttonMenuIcon" src="https://tzs-global.com/website_factor-image/button_icon/search.png" />
          ค้นหาทุนการศึกษา
        </h6>
        <UncontrolledDropdown>
          <DropdownToggle style={{ padding: '0px', background: 'none', border: 'none', width: '100%' }}>
            <Input onChange={handleChange} type="text" name="ssch_name" placeholder="ค้นหาทุนการศึกษา" />
          </DropdownToggle>
          <DropdownMenu>
            <div>
              {ShowScholarship.filter((ShowScholar) => {//โดยถึงShowUser มาจากuseState setUserphotoShow และใช้ตัวแปรuser
                if (SearchScholarship === ""){
                  return SearchScholarship;
                }else if(
                  ShowScholar.ssch_name.toLowerCase().includes(SearchScholarship.toLowerCase())
                ){
                  return SearchScholarship;
                }
              }).map((s)=>(
                
                <>
                {/* {s.ssch_name}<br/> */}
                <DropdownItem >
                  <a href={"/scholarshipSub/"+s.ssch_id}>{s.ssch_name} 
                    <br/>
                  </a>
                </DropdownItem>
                </>
              ))}
            </div>
          </DropdownMenu>
        </UncontrolledDropdown>
      </CardBody>
    </Card>

  )
}

export default Search




