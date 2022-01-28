import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../actions/actions";
import { imageUrl, token } from "../../config/config";
import person from "../../assets/images/person.png";
import BounceLoader from "react-spinners/BounceLoader";
import Switch from "react-switch";

const AllUsers = ({ authReducer, userReducer, getAllUsers, toggleUsers }) => {
  const [allUsers, setAllUsers] = useState(userReducer?.allUsers);
  const [isLoading, setIsLoading] = useState(true);
  const token = authReducer?.accessToken;
  console.log(authReducer);
  // const [userType, setUserType] = useState(2);
  useEffect(() => {
    setIsLoading(true);
    getAllUsers(token).then(() => {
      setIsLoading(false);
    });
    setAllUsers(userReducer?.allUsers);
  }, []);

  const _onPressSwitch = (id) => {
    setIsLoading(true);
    toggleUsers(id).then(() => {
      getAllUsers(token);
      setIsLoading(false);
    });
  };

  const _onPressToggleUsers = (role_id) => {
    if (role_id === 1) {
      setAllUsers(userReducer?.allUsers);
    } else {
      const filterArr = userReducer?.allUsers?.filter(
        (ele) => ele?.role_id == role_id
      );
      setAllUsers(filterArr);
    }
  };

  useEffect(() => {
    setAllUsers(userReducer?.allUsers);
  }, [userReducer?.allUsers]);
  return (
    <>
      <div className="container-fluid">
        <h2 className="mt-2">Users & Interpreters</h2>
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
              _onPressToggleUsers(1);
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
            onClick={() => _onPressToggleUsers(2)}
          >
            View Users
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
            onClick={() => _onPressToggleUsers(3)}
          >
            View Interpreters
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
                    {allUsers?.map((item, idx) => (
                      // userType === item?.role_id &&
                      <tr key={idx}>
                        <td className="w60">
                          <img
                            src={
                              item?.profile_image !== undefined &&
                              item?.profile_image !== null
                                ? `${imageUrl}${item?.profile_image}`
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
                          <a href="/" title="">
                            {item?.first_name}
                          </a>
                        </td>
                        <td>
                          <span>{item?.email}</span>
                        </td>
                        <td>
                          <p>{item?.language}</p>
                        </td>
                        <td>
                          <p>{item?.service_type}</p>
                        </td>
                        <td>
                          <p>{item?.current_package}</p>
                        </td>
                        <td>
                          <Switch
                            onChange={() => _onPressSwitch(item?.id)}
                            checked={item?.blocked === 1 ? true : false}
                          />
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
        )}
      </div>
    </>
  );
};
const mapStateToProps = ({ userReducer, authReducer }) => {
  return { userReducer, authReducer };
};
export default connect(mapStateToProps, actions)(AllUsers);

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
