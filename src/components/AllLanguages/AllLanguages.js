import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/actions";
import { token } from "../../config/config";
import Modal from "react-modal";
// import avatar from "../assets/images/xs/avatar1.jpg";
import person from "../../assets/images/person.png";
const AllLanguages = ({
  langaugesReducer,
  getAllLanguages,
  updateLanguage,
  createLanguage,
  enable_disable,
}) => {
  console.log(langaugesReducer, "______________");
  let alllangauges = langaugesReducer?.allLangauges;
  const [updatedLanguage, setUpdatedLanguage] = useState("");
  const [updateObject, setUpdateObject] = useState(null);
  const [languagecreated, setLanguageCreated] = useState("");

  useEffect(() => {
    getAllLanguages(token);
  }, []);
  const _onPressModalButton = () => {
    updateLanguage(updateObject.id, updatedLanguage).then(() => {
      getAllLanguages();
    });
    setModal("");
  };
  const _onPressSwitch = (id) => {
    // const id = updatedUser?.id;
    const url = `/api//admin/language/activeOrUnactive/${id}`;
    console.log(id, "-------0000000000,Activeeeeeeeeee");
    enable_disable(url);
  };
  const [isAddLangmodal, setIsAddLangmodal] = useState("");
  const [isModal, setModal] = useState("");

  const openModal = (item) => {
    setModal(true);
    setUpdateObject(item);
    setUpdatedLanguage(item.language_name);
    console.log(updateLanguage, "uuuuuuuuuuuuuuuuuuuuu");
  };

  const addnewlanguage = () => {
    setIsAddLangmodal(true);
  };

  // const closeModal = () => {
  //   setModal(true);
  // };
  // const afterOpenModal = () => {
  //   // references are now sync'd and can be accessed.
  //   console.log("object");
  // };

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
        <h2>All Languages</h2>
        <div className="col-md-12 col-sm-12 text-right hidden-xs">
          <a
            className="btn btn-sm btn-primary btn-round"
            title=""
            onClick={() => addnewlanguage()}
          >
            Add New
          </a>
        </div>
        <div className="row clearfix">
          <div className="col-lg-12">
            <div className="table-responsive">
              <table className="table table-hover table-custom spacing5">
                <tbody>
                  {alllangauges.map((item, idx) => (
                    <tr key={idx}>
                      <td>
                        <a href="/" title="">
                          {item.language_name}
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
        {/* <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <p>Language Name</p>
          <textarea
            value={updatedLanguage}
            onChange={(e) => setUpdatedLanguage(e.target.value)}
            type="text"
            placeholder="Enter Language Name....."
          ></textarea>
          <button onClick={() => _onPressModalButton()}>Done</button>
        </Modal> */}
        {isModal && (
          <div
            className={`modal fade ${isModal ? "d-block show" : ""}`}
            // onClick={() => setModal("")}
          >
            <div className="modal-dialog modal-dialog-centered" role="document">
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
        )}{" "}
        :{" "}
        {isAddLangmodal && (
          <div
            className={`modal fade ${isAddLangmodal ? "d-block show" : ""}`}
            // onClick={() => setModal("")}
          >
            <div className="modal-dialog modal-dialog-centered" role="document">
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
      </div>
    </>
  );
};
const mapStateToProps = ({ langaugesReducer }) => {
  return { langaugesReducer };
};
export default connect(mapStateToProps, actions)(AllLanguages);
