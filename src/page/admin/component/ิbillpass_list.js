import React, { useState } from "react";
import { Button} from "reactstrap";
import ReactPaginate from "react-paginate";

const Billlist = ({id}) => {
  const [pageNumber, setPageNumber] = useState(0);
   
  <></>;
  const usersPerPage = 10;
  const pagesVisited = pageNumber * usersPerPage;

  const displayUsers = id.slice(
    pagesVisited,
    pagesVisited + usersPerPage
  ).map((lists) => {
    return (
      <>
        <tr key={lists.bill_id}>
          <td>{lists.bill_op_time}</td>
          <th>{lists.Store_name}</th>

          <th>{lists.bill_id}</th>
          <th>{lists.bill_amount}</th>

          <td>{lists.bill_detail}</td>

          {lists.bill_status == "wait" ? (
                              <>
                                <td className="status">
                                  <b style={{ color: "blue" }}>สร้างใหม่</b>
                                </td>
                              </>
                            ) : 
                            lists.bill_status == "รออนุมัติ" ?(
                              <>
                                <td
                                  className="status"
                                  style={{ color: "green" }}
                                >
                                  <b>{lists.bill_status}</b>
                                </td>
                              </>
                            ):(<>
                            <td
                                  className="status"
                                  style={{ color: "red" }}
                                >
                                  <b>{lists.bill_status}</b>
                                </td>
                            
                            </>)}
          <td>
            {" "}
            <Button
              color="primary"
              href={"/Billdetailfromadmin/" + lists.bill_id}
              block
            >
              ดูรายละเอียด{" "}
            </Button>
          </td>
        </tr>
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
        <div align ="center" >
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
export default Billlist;
