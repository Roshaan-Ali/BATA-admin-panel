import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/actions";
import { token } from "../../config/config";
// import avatar from "../assets/images/xs/avatar1.jpg";
import person from "../../assets/images/person.png"

const AllRoles = ({roleReducer, getAllRoles }) => {
  console.log(roleReducer, "______________");
  let allroles = roleReducer?.allRoles;
  useEffect(() => {
    console.log(roleReducer, "ooooooooo", allroles);
    console.log("-------------------");
    getAllRoles(token);
  }, []);
  return (
    <>
      <div className="container-fluid">
        <h2>All Roles</h2>
        <div className="col-md-12 col-sm-12 text-right hidden-xs">
          <a href="/" className="btn btn-sm btn-primary btn-round" title="">
            Add New
          </a>
        </div>
        <div className="row clearfix">
          <div className="col-lg-12">
            <div className="table-responsive">
              <table className="table table-hover table-custom spacing5">
                <tbody>
                  {allroles.map((item, idx) => (
                    <tr key={idx}>
                      <td className="w60">
                        <img
                          src={item.profile_image? item.profile_image:person}
                          data-toggle="tooltip"
                          data-placement="top"
                          title=""
                          alt="Avatar"
                          className="w35 rounded"
                          data-original-title="Avatar Name"
                        />
                      </td>
                      <td>
                        <a href="/" title="">
                          {item.role_name}
                        </a>
                      </td>
                      {/* <td>
                        <span>{item.email}</span>
                      </td>
                      <td><p>{item.language}</p></td>
                      <td><p>{item.service_type}</p></td>
                      <td><p>{item.current_package}</p></td> */}
                      <td>
                        <button className="btn btn-primary btn-sm mr-1">
                          Edit
                        </button>
                        <button className="btn btn-success btn-sm">
                          Update
                        </button>
                      </td>
                    </tr>
                  ))}
                  <tr></tr>
                </tbody>
              </table>
            </div>
            <nav aria-label="Page navigation example">
              <ul className="pagination">
                <li className="page-item">
                  <Link className="page-link" to="/" aria-label="Previous">
                    <span aria-hidden="true">«</span>
                    <span className="sr-only">Previous</span>
                  </Link>
                </li>
                <li className="page-item active">
                  <Link className="page-link" to="/">
                    1
                  </Link>
                </li>
                <li className="page-item">
                  <Link className="page-link" to="/">
                    2
                  </Link>
                </li>
                <li className="page-item">
                  <Link className="page-link" to="/">
                    3
                  </Link>
                </li>
                <li className="page-item">
                  <Link className="page-link" to="/" aria-label="Next">
                    <span aria-hidden="true">»</span>
                    <span className="sr-only">Next</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};
const mapStateToProps = ({ roleReducer }) => {
  return { roleReducer };
};
export default connect(mapStateToProps, actions)(AllRoles);
