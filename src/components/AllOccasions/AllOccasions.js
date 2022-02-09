import React, { useState, useEffect, Children } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../actions/actions";
import { token } from "../../config/config";
import BounceLoader from "react-spinners/BounceLoader";
import Switch from "react-switch";

const AllOccasions = ({
  occasionsReducer,
  getAllOccasions,
  updateOccasions,
  authReducer,
  toggleOccasion,
  createOccasions,
}) => {
  let alloccasions = occasionsReducer?.allOccasions;
  const [isAddOccasionmodal, setIsAddOccasionmodal] = useState("");
  const [isModal, setModal] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [updatedOccasion, setUpdatedOccasion] = useState("");
  const [updateObject, setUpdateObject] = useState(null);
  const [occasioncreated, setLanguageCreated] = useState("");
  const token = authReducer?.accessToken;
  // console.log(token);
  useEffect(() => {
    getAllOccasions(token).then(() => {
      setIsLoading(false);
    });
  }, []);

  const _onPressSwitch = (id) => {
    setIsLoading(true);
    toggleOccasion(id, token).then(() => {
      getAllOccasions(token);
      setIsLoading(false);
    });
  };

  const _onPressModalButton = () => {
    setIsLoading(true);
    updateOccasions(updateObject?.id, updatedOccasion, token).then(() => {
      getAllOccasions(token);
      setIsLoading(false);
      setModal("");
    });
  };

  const openModal = (item) => {
    setModal(true);
    setUpdateObject(item);
    setUpdatedOccasion(item.name);
  };

  const addnewoccasion = () => {
    setIsAddOccasionmodal(true);
    // getAllOccasions(token);
  };

  const createNewOccasion = () => {
    createOccasions(occasioncreated, token).then(() => {
      getAllOccasions(token);
    });
    setIsAddOccasionmodal("");
  };

  return (
    <>
      {/* <h1>hello!!!!!!!!!!!!</h1> */}
      <div className="container-fluid">
        <h2 className="page-heading">Occasions</h2>
        {isLoading ? (
          <div className="loader-container">
            <BounceLoader
              color={"#81246C"}
              loading={isLoading}
              // css={override}
              size={100}
            />
          </div>
        ) : (
          <>
            <div className="col-md-12 col-sm-12 text-right hidden-xs">
              <a
                className="btn  add-new-btn"
                title=""
                onClick={() => addnewoccasion()}
              >
                Add New
              </a>
            </div>
            <div className="row clearfix occasions">
              <div className="col-lg-12">
                <div className="table-responsive">
                  <table className="table table-hover table-custom spacing5">
                    <tbody>
                      <tr>
                        <td className="font-weight-bold">Occasion Name</td>
                        <td className="font-weight-bold">Enable / Disable</td>
                        <td className="font-weight-bold">Action</td>
                      </tr>
                      {
                      // alloccasions?.length > 0 
                      1==2
                      ? (
                        alloccasions?.map((item, idx) => (
                          <tr key={idx}>
                            <td>
                              <p>{item?.name}</p>
                            </td>
                            <td>
                              {/* <label className="switch">
                              <input
                                type="checkbox"
                                onChange={() => {
                                  _onPressSwitch(item.id);
                                }}
                              />
                              <span class="slider round"></span>
                            </label> */}
                              <Switch
                                onChange={() => _onPressSwitch(item?.id)}
                                checked={item?.status === 1 ? true : false}
                              />
                            </td>
                            <td>
                              <button
                                className="btn btn-success btn-sm mr-1 float-right w-100"
                                onClick={() => openModal(item)}
                              >
                                Update
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <h4>No Occasions Record</h4>
                      )}
                      <tr></tr>
                    </tbody>
                  </table>
                </div>
                {/* <nav aria-label="Page navigation example">
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
                </nav> */}
              </div>
            </div>
            {isModal && (
              <div
                className={`modal fade ${isModal ? "d-block show" : ""}`}
                // onClick={() => setModal("")}
              >
                <div
                  className="modal-dialog modal-dialog-centered"
                  role="document"
                >
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
                className={`modal fade ${
                  isAddOccasionmodal ? "d-block show" : ""
                }`}
                // onClick={() => setModal("")}
              >
                <div
                  className="modal-dialog modal-dialog-centered"
                  role="document"
                >
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
          </>
        )}
      </div>
    </>
  );
};
const mapStateToProps = ({ occasionsReducer, authReducer }) => {
  return { occasionsReducer, authReducer };
};
export default connect(mapStateToProps, actions)(AllOccasions);
