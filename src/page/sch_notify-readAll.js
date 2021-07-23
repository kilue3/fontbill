import React, { useState, useEffect } from 'react';
import { Container,   Row} from "reactstrap";
import Resultbox from "../component/sch_notify_box";
import axios from 'axios';
import ReactPaginate from "react-paginate";

const title = 'ประกาศทุนการศึกษาทั้งหมด';


const Allresult = (props) => {
  
    const [pageNumber, setPageNumber] = useState(0);

    const [Resultlist, setResultlist] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:8080/Mback/public/allresultlist")
            .then((response) => {
                setResultlist(response.data);
            });
    }, []);
    <></>
    const usersPerPage = 5;
    const pagesVisited = pageNumber * usersPerPage;
    
    const displayUsers = Resultlist.slice(pagesVisited, pagesVisited + usersPerPage).map((scholar) => {
      return (
        <>
           
           {/* {props.match.params.id = scholar.msch_id}  */}
                                          
                                            
        <div className="col-12 col-sm-6 col-lg-6 col-BoxContentSetting">
            <div key={scholar.result_id}><Resultbox id={scholar.result_id} /></div>
        </div>
                                            
                                        
        
        </>
      );
});
const pageCount = Math.ceil(Resultlist.length / usersPerPage);

    const changePage = ({ selected }) => {
      setPageNumber(selected);
      };
    return (
        <>
            <Container className="container-fluid TZS-Container">
            
                <Row>
                    {displayUsers}
                </Row>
                <div className="borderline" />
                <br/>
                <center>
                <ReactPaginate 
                className="pagination" 
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    pageCount={pageCount}
                    onPageChange={changePage}
                    containerClassName={"paginationBttns"}
                    previousLinkClassName={"previousBttn"}
                    nextLinkClassName={"nextBttn"}
                    disabledClassName={"paginationDisabled"}
                    activeClassName={"paginationActive"}
                    color="primary"
                    count={pageCount}
                />
                </center>
            
            </Container>
        </>
    )
}
export default Allresult;
