import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/actions";
import { token } from "../../config/config";
import BounceLoader from "react-spinners/BounceLoader";
import Switch from "react-switch";

const AllLanguages = ({
  langaugesReducer,
  getAllLanguages,
  updateLanguage,
  createLanguage,
  toggleLanguage,
  enable_disable,
}) => {
  let languages = langaugesReducer?.allLangauges;
  const [updatedLanguage, setUpdatedLanguage] = useState("");
  const [updateObject, setUpdateObject] = useState(null);
  const [languagecreated, setLanguageCreated] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isAddLangmodal, setIsAddLangmodal] = useState("");
  const [isModal, setModal] = useState("");

  useEffect(() => {
    // setIsLoading(true);
    getAllLanguages(token).then(() => {
      setIsLoading(false);
    });
  }, []);

  const _onPressModalButton = () => {
    setIsLoading(true);
    updateLanguage(updateObject?.id, updatedLanguage).then(() => {
      getAllLanguages(token);
      setIsLoading(false);
      setModal("");
    });
  };

  const _onPressSwitch = (id) => {
    setIsLoading(true);
    toggleLanguage(id).then(() => {
      getAllLanguages(token);
      setIsLoading(false);
    });
  };

  const openModal = (item) => {
    setModal(true);
    setUpdateObject(item);
    setUpdatedLanguage(item?.language_name);
  };

  const addnewlanguage = () => {
    setIsAddLangmodal(true);
  };

  const createNewLanguage = () => {
    createLanguage(languagecreated).then(() => {
      getAllLanguages();
    });
    setIsAddLangmodal("");
  };

  return (
    <>
      {/* <h1>hello!!!!!!!!!!!!</h1> */}
      <div className="container-fluid">
        <h2 className="page-heading">Languages</h2>
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
                className="btn add-new-btn"
                title=""
                onClick={() => addnewlanguage()}
              >
                Add New
              </a>
            </div>
            <div className="row clearfix languages">
              <div className="col-lg-12">
                <div className="table-responsive">
                  <table className="table table-hover table-custom spacing5">
                    <tbody>
                      {languages?.map((item, idx) => (
                        <tr key={idx}>
                          <td>
                            <p>{item?.language_name}</p>
                          </td>
                          <td>
                            {/* <label className="switch">
                              <input
                                // value={item?.status === 0 ? false : true}
                                value={false}
                                type="checkbox"
                                onChange={() => {
                                  _onPressSwitch(item?.id);
                                }}
                              />
                              <span className="slider round"></span>
                            </label> */}
                            <Switch
                              onChange={() => _onPressSwitch(item?.id)}
                              checked={item?.status === 1 ? true : false}
                            />
                          </td>
                          <td>
                            <button
                              className="btn btn-success btn-sm mr-1 float-right"
                              onClick={() => openModal(item)}
                            >
                              Update
                            </button>

                            {/* <button
                          type="button"
                          className="btn btn-round btn-danger"
                          onClick={() => setModal(true)}
                        >
                          Delete
                        </button> */}
                          </td>
                        </tr>
                      ))}
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
                        Update Language
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
                          placeholder="Language Name"
                          value={updatedLanguage}
                          onChange={(e) => setUpdatedLanguage(e.target.value)}
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
            {isAddLangmodal && (
              <div
                className={`modal fade ${isAddLangmodal ? "d-block show" : ""}`}
                // onClick={() => setModal("")}
              >
                <div
                  className="modal-dialog modal-dialog-centered"
                  role="document"
                >
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalCenterTitle">
                        Add New Language
                      </h5>
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                        onClick={() => setIsAddLangmodal("")}
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
                          placeholder="Language Name"
                          value={languagecreated}
                          onChange={(e) => setLanguageCreated(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-round btn-default"
                        data-dismiss="modal"
                        onClick={() => setIsAddLangmodal("")}
                      >
                        Close
                      </button>
                      <button
                        type="button"
                        className="btn btn-round btn-primary"
                        onClick={() => createNewLanguage()}
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
const mapStateToProps = ({ langaugesReducer }) => {
  return { langaugesReducer };
};
export default connect(mapStateToProps, actions)(AllLanguages);
