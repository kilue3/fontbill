import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import Info_store from "../component/info_store";
const Userlist = ({id}) => {
  const [pageNumber, setPageNumber] = useState(0);
  const session = {
    status: localStorage.getItem("status"),
  };
  const [ses, setSes] = useState(session);
  
  <></>;
  const usersPerPage = 10;
  const pagesVisited = pageNumber * usersPerPage;
  const displayUsers = id.slice(
    pagesVisited,
    pagesVisited + usersPerPage
  ).map((list) => {
    return (
      <>
        <>
          <tr key={list.Store_id}>
            <th>{list.Store_id}</th>
            <td>{list.Store_name}</td>
            <td>{list.Store_username}</td>
            <td>
              {" "}
              {ses.status == "admin" || ses.status == "normal" ? (
                <Info_store id={list.Store_id} />
              ) : (
                ""
              )}
            </td>
          </tr>
        </>
      </>
    );
  });
  const pageCount = Math.ceil(id.length / usersPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  return (
    <>
      {displayUsers}
      <br />
      <div align="center">
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
      </div>
    </>
  );
};
export default Userlist;
