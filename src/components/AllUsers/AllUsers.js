import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/actions";
import { token } from "../../config/config";
// import avatar from "../assets/images/xs/avatar1.jpg";
import person from "../../assets/images/person.png";

const AllUsers = ({ userReducer, getAllUsers, enable_disable }) => {
  // console.log(userReducer, "______________");
  let allusers = userReducer?.allUsers;
  useEffect(() => {
    console.log(userReducer, "ooooooooo", allusers);
    console.log("-------------------");
    getAllUsers(token);
  }, []);

  const _onPressSwitch = (id) => {
    // const id = updatedUser?.id;
   const url = `/api/admin/users/block/${id}`
    console.log(id, "-------0000000000,Activeeeeeeeeee");
    enable_disable(url);
  };
  // const _onPressModalButton = () => {
  //   const id = updatedUser?.id;
  //   const data = {
  //     first_name: updatedUser.first_name,
  //     last_name: updatedUser.last_name,
  //     language: updatedUser.language,
  //     profile_image: updatedUser.profile_image,
  //   };
  //   console.log(data, id)
  //   // updateUsers(data, id).then(() => {
  //   //   getAllUsers();
  //   // });
  //   // setModal("");
  // };
  // const [isAddUsermodal, setIsAddUsermodal] = useState("");
  // const [isModal, setModal] = useState("");

  // const openModal = (item) => {
  //   setModal(true);
  //   setUpdateObject(item);
  // };

  // const addnewuser = () => {
  //   setIsAddUsermodal(true);
  // };
  // const createNewUser = () => {
  //   createUser(usercreated).then(() => {
  //     getAllUsers();
  //   });
  //   setIsAddUsermodal("");
  // };
  return (
    <>
      <div className="container-fluid">
        <h2>All Users</h2>
        <div className="row clearfix">
          <div className="col-lg-12">
            <div className="table-responsive">
              <table className="table table-hover table-custom spacing5">
                <tbody>
                  {allusers.map((item, idx) => (
                    <tr key={idx}>
                      <td className="w60">
                        <img
                          src={item.profile_image ? item.profile_image : person}
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
                          {item.first_name}
                        </a>
                      </td>
                      <td>
                        <span>{item.email}</span>
                      </td>
                      <td>
                        <p>{item.language}</p>
                      </td>
                      <td>
                        <p>{item.service_type}</p>
                      </td>
                      <td>
                        <p>{item.current_package}</p>
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
const mapStateToProps = ({ userReducer }) => {
  return { userReducer };
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
