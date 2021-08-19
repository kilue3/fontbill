import React, { useState, useEffect } from 'react';
import { Container, Row } from "reactstrap";
import Scholarship_Box from "../component/scholarship_box";
import axios from 'axios';
import ReactPaginate from "react-paginate";

const title = 'ทุนการศึกษาทั้งหมด';


const AllSchollar = (props) => {

    const [pageNumber, setPageNumber] = useState(0);

    const [Mscholar, setMscholar] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:8080/Mback/public/allMshcholarship")
            .then((response) => {
                setMscholar(response.data);
            });
    }, []);
    <></>
    const usersPerPage = 4;
    const pagesVisited = pageNumber * usersPerPage;

    const displayUsers = Mscholar.slice(pagesVisited, pagesVisited + usersPerPage).map((scholar) => {
        return (
            <>

                {/* {props.match.params.id = scholar.msch_id}  */}


                <div className="col-12 col-sm-6 col-lg-6 col-BoxContentSetting">
                    <div key={scholar.msch_id}><Scholarship_Box id={scholar.msch_id} /></div>
                </div>



            </>
        );
    });
    const pageCount = Math.ceil(Mscholar.length / usersPerPage);

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
                <br />
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
                    /></center>

            </Container>
        </>
    )
}
export default AllSchollar;
