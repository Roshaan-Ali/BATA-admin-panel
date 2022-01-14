import React, { useState, useEffect, Children } from "react";
import { Link } from "react-router-dom";
// import { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/actions";
import { token } from "../../config/config";
import Modal from "react-modal";
// import avatar from "../assets/images/xs/avatar1.jpg";
// import person from "../../assets/images/person.png";

// import Packages from "../AllPackages/Packages";
const AllOccasions = ({
  occasionsReducer,
  getAllOccasions,
  updateOccasions,
  createOccasions,
  enable_disable
}) => {
  // console.log(occasionsReducer, "______________");
  let alloccasions = occasionsReducer?.allOccasions;
  console.log(alloccasions, "kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk");
  // let b = ("ahmed",a)
  const [updatedOccasion, setUpdatedOccasion] = useState("");
  const [updateObject, setUpdateObject] = useState(null);
  const [occasioncreated, setLanguageCreated] = useState("");

  useEffect(() => {
    getAllOccasions(token);
    // console.log(b)
  }, []);
  const _onPressSwitch = (id) => {
    // const id = updatedUser?.id;
    const url = `/api/admin/occation/activeOrInactive/${id}`;
    console.log(id, "-------0000000000,Activeeeeeeeeee");
    enable_disable(url);
  };
  const _onPressModalButton = () => {
    updateOccasions(updateObject.id, updatedOccasion).then(() => {
      // console.log(updateOccasions)
      getAllOccasions(token);
    });
    setModal("");
  };
  const [isAddOccasionmodal, setIsAddOccasionmodal] = useState("");
  const [isModal, setModal] = useState("");

  const openModal = (item) => {
    setModal(true);
    setUpdateObject(item);
    setUpdatedOccasion(item.name);
    // getAllOccasions();
  };

  const addnewoccasion = () => {
    setIsAddOccasionmodal(true);
    // getAllOccasions(token);
  };

  const createNewOccasion = () => {
    createOccasions(occasioncreated).then(() => {
      getAllOccasions(token);
    });
    setIsAddOccasionmodal("");
  };

  return (
    <>
      {/* <h1>hello!!!!!!!!!!!!</h1> */}
      <div className="container-fluid">
        <h2>All Occasions</h2>
        <div className="col-md-12 col-sm-12 text-right hidden-xs">
          <a
            className="btn btn-sm btn-primary btn-round"
            title=""
            onClick={() => addnewoccasion()}
          >
            Add New
          </a>
        </div>
        <div className="row clearfix">
          <div className="col-lg-12">
            <div className="table-responsive">
              <table className="table table-hover table-custom spacing5">
                <tbody>
                  {alloccasions?.map((item, idx) => (
                    <tr key={idx}>
                      <td>
                        <a href="/" title="">
                          {item?.name}
                        </a>
                      </td>
                      <td>
                        <label className="switch">
                          <input
                            type="checkbox"
                            onChange={() => {
                              _onPressSwitch(item.id);
                            }}
                          />
                          <span class="slider round"></span>
                        </label>
                      </td>
                      <td>
                        <button
                          className="btn btn-success btn-sm mr-1 float-right"
                          onClick={() => openModal(item)}
                        >
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
        {isModal && (
          <div
            className={`modal fade ${isModal ? "d-block show" : ""}`}
            // onClick={() => setModal("")}
          >
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalCenterTitle">
                    Update Occasion
                  </h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={() => setModal("")}
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">
                  <div className="input-group input-group-lg">
                    <input
                      type="text"
                      className="form-control"
                      aria-label="Large"
                      aria-describedby="inputGroup-sizing-sm"
                      placeholder="Occasion Name"
                      value={updatedOccasion}
                      onChange={(e) => setUpdatedOccasion(e.target.value)}
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-round btn-default"
                    data-dismiss="modal"
                    onClick={() => setModal("")}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-round btn-primary"
                    onClick={() => _onPressModalButton()}
                  >
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        :
        {isAddOccasionmodal && (
          <div
            className={`modal fade ${isAddOccasionmodal ? "d-block show" : ""}`}
            // onClick={() => setModal("")}
          >
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalCenterTitle">
                    Add New Occasion
                  </h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={() => setIsAddOccasionmodal("")}
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">
                  <div className="input-group input-group-lg">
                    <input
                      type="text"
                      className="form-control"
                      aria-label="Large"
                      aria-describedby="inputGroup-sizing-sm"
                      placeholder="Occasion Name"
                      value={occasioncreated}
                      onChange={(e) => setLanguageCreated(e.target.value)}
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-round btn-default"
                    data-dismiss="modal"
                    onClick={() => setIsAddOccasionmodal("")}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-round btn-primary"
                    onClick={() => createNewOccasion()}
                  >
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
const mapStateToProps = ({ occasionsReducer }) => {
  return { occasionsReducer };
};
export default connect(mapStateToProps, actions)(AllOccasions);
