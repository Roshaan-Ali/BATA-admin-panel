import React, { useEffect, useState } from "react";
import moment from "moment";
import { connect } from "react-redux";
import * as actions from "../../actions/actions";
import { imageUrl } from "../../config/config";
import person from "../../assets/images/person.png";
import BounceLoader from "react-spinners/BounceLoader";

const PackagePayments = ({ authReducer, paymentsReducer, getPayments }) => {
  const [packagePayments, setPackagePayments] = useState(
    paymentsReducer?.payments
  );
  //   const [packagePayments, setPackagePayments] = useState(paymentsReducer?.packagePayments);

  const [isLoading, setIsLoading] = useState(true);
  const token = authReducer?.accessToken;

  console.log(authReducer);
  useEffect(() => {
    setIsLoading(true);
    getPayments(token).then(() => {
      setIsLoading(false);
    });
    setPackagePayments(paymentsReducer?.payments);
  }, []);

  const _onPressToggleUsers = (role_id) => {
    if (role_id === 1) {
      setPackagePayments(paymentsReducer?.payments);
    } else {
      const filterArr = paymentsReducer?.payments?.filter(
        (ele) => ele?.role_id == role_id
      );
      setPackagePayments(filterArr);
    }
  };

  useEffect(() => {
    setPackagePayments(paymentsReducer?.payments);
  }, [paymentsReducer?.payments]);
  return (
    <>
      <div className="container-fluid">
        <h2 className="mt-2">Package Payments</h2>
        {/* <div style={{ display: "flex", marginBottom: "10px" }}>
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
        </div> */}
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
                      <td className="font-weight-bold">Amount Paid</td>
                      <td className="font-weight-bold">Package Name</td>
                      <td className="font-weight-bold">Bought On</td>
                    </tr>
                    {packagePayments?.length > 0 ? (
                      packagePayments?.map(
                        (item, idx) =>
                          // userType === item?.role_id &&
                          // item?.stripe_s_id !== "" ||
                          // item?.package !== {} &&
                          item?.client?.first_name !== undefined && (
                            <tr key={idx}>
                              <td className="w60">
                                <img
                                  src={
                                    item?.client?.profile_image !== undefined &&
                                    item?.client?.profile_image !== null &&
                                    item?.client?.profile_image !== ""
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
                              <td style={{ textTransform: "capitalize" }}>
                                {item?.client?.first_name}
                              </td>
                              <td>
                                <p
                                  style={{ margin: 0 }}
                                >{`$${item?.amount?.toFixed(2)}`}</p>
                              </td>
                              <td>
                                <p style={{ textTransform: "capitalize" }}>
                                  {item?.package?.name}
                                </p>
                              </td>
                              <td>
                                {moment(item.created_at)?.format(
                                  "DD/MMMM/YYYY hh:mm A"
                                )}
                              </td>
                            </tr>
                          )
                      )
                    ) : (
                      <h4>No Payments Record</h4>
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
        )}
      </div>
    </>
  );
};
const mapStateToProps = ({ paymentsReducer, authReducer }) => {
  return { paymentsReducer, authReducer };
};
export default connect(mapStateToProps, actions)(PackagePayments);
