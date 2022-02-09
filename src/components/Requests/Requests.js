import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../actions/actions";
import { imageUrl, token } from "../../config/config";
import person from "../../assets/images/person.png";
import BounceLoader from "react-spinners/BounceLoader";
import moment from "moment";

const Requests = ({
  bookingsReducer,
  getBookings,
  authReducer,
  roleReducer,
  getInactiveInterpreters,
  assignInterpreter,
  rejectInterpreter,
}) => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [assignedInterpreters, setAssignedInterpreters] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [showAllocationModal, setShowAllocationModal] = useState(false);
  const [interpreters, setInterpreters] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalLoader, setModalLoader] = useState(false);
  const token = authReducer?.accessToken;
  // console.log(token);

  useEffect(() => {
    setIsLoading(true);
    getInactiveInterpreters(token);
    getBookings(token).then(() => {
      setIsLoading(false);
    });
    setBookings(bookingsReducer?.bookings);
  }, []);

  const _onPressToggleBookings = (status) => {
    if (status === "all") {
      setBookings(bookingsReducer?.bookings);
    } else {
      const filterArr = bookingsReducer?.bookings?.filter(
        (ele) => ele?.status == status
      );
      setBookings(filterArr);
    }
  };

  useEffect(() => {
    setBookings(bookingsReducer?.bookings);
    setInterpreters(roleReducer?.inactiveInterpreters);
  }, [bookingsReducer?.bookings, roleReducer?.inactiveInterpreters]);

  const _onPressAlocateInterpreter = (booking) => {
    let arr = [];
    const ar = booking?.booking_languages?.map((ele) => {
      for (let i = 0; i < ele?.qty; i++) {
        arr.push({
          id: Math.round(Math.random() * 1000),
          translationLang: ele?.name,
          primaryLang: booking?.primary_language?.name,
          interpreters: [],
        });
      }
    });
    setLanguages(arr);
    setShowAllocationModal(true);
  };

  const _checkValues = (ele, item) => {
    let hasPrimaryLang,
      hasTranslationLang = false;

    for (let index = 0; index < item?.language?.length; index++) {
      if (ele.primaryLang === item?.language[index]?.name) {
        hasPrimaryLang = true;
      }
      if (ele.translationLang === item?.language[index]?.name) {
        hasTranslationLang = true;
      }
    }

    if (hasPrimaryLang && hasTranslationLang) {
      return true;
    } else {
      return false;
    }
  };

  const placeValue = (id) => {
    let selectedItem = null;
    let index = 0;
    for (let i = 0; i < interpreters.length; i++) {
      if (interpreters[i]?.id == id) {
        selectedItem = interpreters[i];
        index = i;
      }
    }

    let copyAssignedInters = [...assignedInterpreters];
    copyAssignedInters.push(selectedItem);
    setAssignedInterpreters(copyAssignedInters);

    let copyInterpreters = [...interpreters];
    let result = copyInterpreters?.splice(index, 1);
    setInterpreters(copyInterpreters);
  };

  const _onPressReset = () => {
    setAssignedInterpreters([]);
    setInterpreters(roleReducer?.inactiveInterpreters);
    _onPressAlocateInterpreter(selectedItem);
  };

  const _onPressAssignModalButton = async () => {
    setModalLoader(true);
    let arr = [];
    for (let i = 0; i < assignedInterpreters?.length; i++) {
      arr.push({
        language: selectedItem?.booking_languages[i]?.id,
        interpreter: assignedInterpreters[i]?.id,
      });
    }
    let data = {
      interpreters: arr,
    };

    await assignInterpreter(selectedItem?.id, data, token);
    setShowAllocationModal(false);
    setSelectedItem(null);
    getBookings(token);
    setModalLoader(false);
  };

  const _onPressRejectModalButton = async () => {
    setModalLoader(true);
    await rejectInterpreter(selectedItem?.id, token).then(() => {
      setShowAllocationModal(false);
      setModalLoader(false);
      setSelectedItem(null);
      getBookings(token);
    });
  };
  return (
    <>
      <div className="container-fluid">
        <h2 className="mt-2">Bookings</h2>
        <div style={{ display: "flex", marginBottom: "10px" }}>
          <button
            style={{
              borderRadius: "20px",
              fontSize: "15px",
              color: "white",
              padding: "6px 25px",

              backgroundColor: "#81246C",
            }}
            onClick={() => {
              _onPressToggleBookings("all");
            }}
          >
            View All
          </button>
          <button
            style={{
              borderRadius: "20px",
              fontSize: "15px",
              color: "white",
              padding: "6px 25px",
              marginLeft: "10px",
              backgroundColor: "#81246C",
            }}
            onClick={() => _onPressToggleBookings("pending")}
          >
            View Pendings
          </button>
          <button
            style={{
              borderRadius: "20px",
              fontSize: "15px",
              color: "white",
              padding: "6px 25px",
              marginLeft: "10px",
              backgroundColor: "#81246C",
            }}
            onClick={() => _onPressToggleBookings("accept")}
          >
            View Accepted
          </button>
          <button
            style={{
              borderRadius: "20px",
              fontSize: "15px",
              color: "white",
              padding: "6px 25px",
              marginLeft: "10px",
              backgroundColor: "#81246C",
            }}
            onClick={() => _onPressToggleBookings("completed")}
          >
            View Completed
          </button>
          <button
            style={{
              borderRadius: "20px",
              fontSize: "15px",
              color: "white",
              padding: "6px 25px",
              marginLeft: "10px",
              backgroundColor: "#81246C",
            }}
            onClick={() => _onPressToggleBookings("reject")}
          >
            View Rejected
          </button>
        </div>
        {isLoading ? (
          <div className="loader-container">
            <BounceLoader color={"#81246C"} loading={isLoading} size={100} />
          </div>
        ) : (
          <div className="row clearfix">
            <div className="col-lg-12">
              <div className="table-responsive">
                <table className="table table-hover table-custom spacing5">
                  <tbody>
                    <tr>
                      <td className="font-weight-bold">Client Image</td>
                      <td className="font-weight-bold">Client Name</td>
                      <td className="font-weight-bold">Status</td>
                      <td className="font-weight-bold">Occasion </td>
                      <td className="font-weight-bold">Primary Language </td>
                      <td
                        className="font-weight-bold"
                        style={{ marginLeft: 80 }}
                      >
                        From
                      </td>
                      <td className="font-weight-bold">To</td>
                      <td className="font-weight-bold">Translation Address</td>
                      <td className="font-weight-bold">Action</td>
                    </tr>
                    {bookings?.length > 0 ? (
                      bookings?.map((item, idx) => (
                        <tr key={idx} style={{ width: "100%" }}>
                          <td className="w60">
                            <img
                              src={
                                item?.client?.profile_image !== undefined &&
                                item?.client?.profile_image !== null &&
                                item?.client?.profile_image !== ""
                                  ? `${imageUrl}${item?.client?.profile_image}`
                                  : person
                              }
                              data-toggle="tooltip"
                              data-placement="top"
                              title=""
                              alt="Avatar"
                              className="w35 rounded"
                              data-original-title="Avatar Name"
                            />
                          </td>
                          <td>
                            <p style={{ textTransform: "capitalize" }}>
                              {item?.client?.first_name}
                            </p>
                          </td>
                          <td>
                            <span style={{ textTransform: "capitalize" }}>
                              {item?.status}
                            </span>
                          </td>
                          <td>
                            <p>{item?.occasion?.name ? item?.occasion?.name : "No Occasion Mentioned"}</p>
                          </td>
                          <td>
                            <p>{item?.primary_language?.name}</p>
                          </td>
                          <td>
                            <p>
                              {moment(item?.start_date).format(
                                "DD/MMM/YYYY hh:mm A"
                              )}
                            </p>
                          </td>
                          <td>
                            <p>
                              {moment(item?.end_date).format(
                                "DD/MMM/YYYY hh:mm A"
                              )}
                            </p>
                          </td>
                          <td>{item?.translation_address}</td>
                          {item?.status == "pending" ? (
                            <td>
                              <button
                                style={{
                                  borderRadius: "20px",
                                  fontSize: "15px",
                                  color: "white",
                                  padding: "6px 25px",
                                  marginLeft: "10px",
                                  backgroundColor: "#81246C",
                                }}
                                onClick={() => {
                                  setSelectedItem(item);
                                  _onPressAlocateInterpreter(item);
                                }}
                              >
                                Assign Interpreter
                              </button>
                            </td>
                          ) : (
                            "No Action"
                          )}
                        </tr>
                      ))
                    ) : (
                      <h4>No Bookings Record</h4>
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
              {showAllocationModal && (
                <div
                  className={`modal fade ${
                    showAllocationModal ? "d-block show" : ""
                  }`}
                >
                  <div
                    className="modal-dialog modal-dialog-centered"
                    role="document"
                  >
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5
                          className="modal-title"
                          id="exampleModalCenterTitle"
                        >
                          Assign Interpreter
                        </h5>
                        <button
                          type="button"
                          className="close"
                          data-dismiss="modal"
                          aria-label="Close"
                          onClick={() => {
                            setShowAllocationModal(false);
                          }}
                        >
                          <span aria-hidden="true">×</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        <div className="input-group input-group-lg mb-2 d-flex flex-row">
                          <p className="mb-0">Client Name:</p>
                          <p className=" ml-2 mb-0">
                            {selectedItem?.client?.first_name}
                          </p>
                        </div>
                        <div className="input-group input-group-lg mb-2 d-flex flex-row ">
                          <p className="mb-0 " style={{ marginRight: "80px" }}>
                            Primary:
                          </p>
                          <p className="mb-0 " style={{ marginRight: "80px" }}>
                            Translation:
                          </p>
                          <p className="mb-0 " style={{ marginRight: "80px" }}>
                            Interpreter:
                          </p>
                        </div>
                        {languages?.map((ele, index) => (
                          <div
                            key={index}
                            className="d-flex flex-row ml-2 mt-2 justify-content-around"
                          >
                            <p className="mb-0" style={{ width: "200px" }}>
                              {ele?.primaryLang}
                            </p>
                            <p className="mb-0" style={{ width: "200px" }}>
                              {ele?.translationLang}
                            </p>
                            <select
                              onChange={(e) => placeValue(e.target.value)}
                              name="cars"
                              id="cars"
                              style={{ width: "200px" }}
                              disabled={
                                !(assignedInterpreters?.length == index)
                              }
                            >
                              <option value={""}>
                                {assignedInterpreters[index] != undefined ||
                                assignedInterpreters[index] != null
                                  ? assignedInterpreters[
                                      index
                                    ]?.first_name?.concat(
                                      ` ${assignedInterpreters[index]?.last_name}`
                                    )
                                  : "Select"}
                              </option>
                              {interpreters?.map((item) => {
                                const response = _checkValues(ele, item);
                                return (
                                  response && (
                                    <option key={item?.id} value={item?.id}>
                                      {item?.first_name.concat(
                                        ` ${item?.last_name}`
                                      )}
                                    </option>
                                  )
                                );
                              })}
                            </select>
                          </div>
                        ))}
                        {/* <div className="input-group input-group-lg d-flex flex-column">
                          <p className="mb-0">Select Interpreter</p>
                        </div> */}
                        {assignedInterpreters?.length > 0 && (
                          <button
                            className="mx-auto"
                            style={{
                              cursor: "pointer",
                              display: "flex",
                              backgroundColor: "red",
                              marginTop: "10px",
                              color: "white",
                              borderRadius: "7px",
                            }}
                            onClick={() => {
                              _onPressReset();
                            }}
                          >
                            Reset Choices
                          </button>
                        )}
                      </div>
                      <div className="modal-footer">
                        {modalLoader ? (
                          <p style={{ fontSize: "17px", fontWeight: "600" }}>
                            Please Wait...
                          </p>
                        ) : (
                          <>
                            <button
                              type="button"
                              className="btn btn-round btn-default"
                              data-dismiss="modal"
                              onClick={() => {
                                setShowAllocationModal(false);
                                // setUpdatePackageModal(false);
                                // setIsExtractFeatures(false);
                              }}
                            >
                              Close
                            </button>
                            <button
                              type="button"
                              // className="btn btn-round btn-default"
                              style={{
                                borderRadius: "20px",
                                fontSize: "15px",
                                color: "white",
                                padding: "6px 25px",

                                backgroundColor: "#81246C",
                              }}
                              data-dismiss="modal"
                              onClick={() => {
                                _onPressRejectModalButton();
                              }}
                            >
                              Reject
                            </button>
                            <button
                              disabled={assignedInterpreters?.length === 0}
                              type="button"
                              className="btn btn-round btn-primary"
                              onClick={() => {
                                _onPressAssignModalButton();
                              }}
                            >
                              Assign Now
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};
const mapStateToProps = ({ bookingsReducer, roleReducer, authReducer }) => {
  return { bookingsReducer, roleReducer, authReducer };
};
export default connect(mapStateToProps, actions)(Requests);

// {isModal && (
//   <div
//     className={`modal fade ${isModal ? "d-block show" : ""}`}
//     // onClick={() => setModal("")}
//   >
//     <div className="modal-dialog modal-dialog-centered" role="document">
//       <div className="modal-content">
//         <div className="modal-header">
//           <h5 className="modal-title" id="exampleModalCenterTitle">
//             Update User
//           </h5>
//           <button
//             type="button"
//             className="close"
//             data-dismiss="modal"
//             aria-label="Close"
//             onClick={() => setModal("")}
//           >
//             <span aria-hidden="true">×</span>
//           </button>
//         </div>
//         <div className="modal-body">
//           <div className="input-group input-group-lg">
//             <input
//               type="text"
//               className="form-control"
//               aria-label="Large"
//               aria-describedby="inputGroup-sizing-sm"
//               placeholder="Enter FirstName...."
//               value={updatedUser?.first_name}
//               onChange={(e) => setUpdatedUser({...updatedUser,first_name:e.target.value})}
//             />
//           </div>
//           <div className="input-group input-group-lg">
//             <input
//               type="text"
//               className="form-control"
//               aria-label="Large"
//               aria-describedby="inputGroup-sizing-sm"
//               placeholder="Enter LasttName...."
//               value={updatedUser?.last_name}
//               onChange={(e) => setUpdatedUser({...updatedUser,last_name:e.target.value})}
//             />
//           </div>
//           {/* <div className="input-group input-group-lg">
//             <input
//               type="text"
//               className="form-control"
//               aria-label="Large"
//               aria-describedby="inputGroup-sizing-sm"
//               placeholder="Enter Email...."
//               value={updatedUser}
//               onChange={(e) => setUpdatedUser(e.target.value)}
//             />
//           </div> */}
//           {/* <div className="input-group input-group-lg">
//             <input
//               type="text"
//               className="form-control"
//               aria-label="Large"
//               aria-describedby="inputGroup-sizing-sm"
//               placeholder="Enter Phone #...."
//               value={updatedUser}
//               onChange={(e) => setUpdatedUser(e.target.value)}
//             />
//           </div> */}
//           <div className="input-group input-group-lg">
//             <input
//               type="text"
//               className="form-control"
//               aria-label="Large"
//               aria-describedby="inputGroup-sizing-sm"
//               placeholder="Enter Language...."
//               value={updatedUser?.language}
//               onChange={(e) => setUpdatedUser({...updatedUser,language:e.target.value})}
//             />
//           </div>
//           {/* <div className="input-group input-group-lg">
//             <input
//               type="text"
//               className="form-control"
//               aria-label="Large"
//               aria-describedby="inputGroup-sizing-sm"
//               placeholder="Enter Service Type...."
//               value={updatedUser}
//               onChange={(e) => setUpdatedUser(e.target.value)}
//             />
//           </div> */}
//         </div>
//         <div className="modal-footer">
//           <button
//             type="button"
//             className="btn btn-round btn-default"
//             data-dismiss="modal"
//             onClick={() => setModal("")}
//           >
//             Close
//           </button>
//           <button
//             type="button"
//             className="btn btn-round btn-primary"
//             onClick={() => _onPressModalButton()}
//           >
//             Save changes
//           </button>
//         </div>
//       </div>
//     </div>
//   </div>
// )}
