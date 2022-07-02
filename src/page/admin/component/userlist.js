import React, { useState, useEffect } from "react";
import { Button, } from "reactstrap";
import axios from "axios";
import ReactPaginate from "react-paginate";

const Userlist = () => {
  const [User, setUser] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const session = {
  
    status: localStorage.getItem("status"),
  };
  const [ses, setSes] = useState(session);

  useEffect(() => {
    axios.get("http://localhost/Mback/public/allusers").then((response) => {
      setUser(response.data);
    });
  }, []);
  <></>;
  const usersPerPage = 4;
  const pagesVisited = pageNumber * usersPerPage;

  const displayUsers = User.slice(
    pagesVisited,
    pagesVisited + usersPerPage
  ).map((list) => {
    return (
      <>
                

            <tr>
              <th>{list.id}</th>
              <td>{list.fullname}</td>
              <td>{list.username}</td>
              <td>{list.status}</td>
              {ses.status == "admin"  ?
                      <Button color="danger">ดูรายละเอียด</Button>

              : ""}
            </tr>
            
      </>
    );
  });
  const pageCount = Math.ceil(User.length / usersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  return (
    <>
      
        {displayUsers}
        <br />
        
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
   
    </>
  );
};
export default Userlist;
