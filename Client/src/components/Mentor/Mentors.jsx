import React from "react";
import Mentor from "./Mentor";
import { Layout } from "../Layout/Layout";
import { useSelector, useDispatch } from "react-redux";
import CustomPagination from "../Layout/Pagination/Pagination";
import { setCurrentPage } from "../../redux/slices/dataSlice";
import Loading from "../Layout/Loading/Loading";

export default function Mentors() {
  const dispatch = useDispatch();

  const currentPage = useSelector((state) => state.data.currentPage);
  const { totalPages, mentors } = useSelector((state) => state.result);

  // triggered when user change page
  const handlePageChange = (pageNumber) => {
    if (pageNumber === currentPage) {
      dispatch(setCurrentPage(1)); // Set the current page to null or a default value
    } else {
      dispatch(setCurrentPage(pageNumber));
    }
  };

  return (
    <Layout>
      {!mentors ? (
        <Loading />
      ) : (
        <React.Fragment>
          {/* If result have no mentors */}
          {mentors.length === 0 && (
            <h3 className="nomentors">There are no mentors to show.</h3>
          )}

          {/* display mentors */}
          {mentors.length > 0 && (
            <div>
              <div className="row justify-content-center">
                {mentors.map((mentor, index) => (
                  <Mentor mentor={mentor} key={index} />
                ))}
              </div>
            </div>
          )}

          {/* Pagination */}
          <div>
            <CustomPagination
              totalPages={totalPages}
              currentPage={currentPage}
              handlePageChange={(page) => handlePageChange(page)}
            />
          </div>
        </React.Fragment>
      )}
    </Layout>
  );
}
