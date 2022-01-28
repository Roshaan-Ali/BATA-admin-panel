import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/actions";
import { token } from "../../config/config";
import BounceLoader from "react-spinners/BounceLoader";

const Packages = ({
  packagesReducer,
  getAllPackages,
  getAllCustomPackages,authReducer,
  updateAllPackages,
}) => {
  let packages = packagesReducer?.allPackages;
  let custompackges = packagesReducer?.customPackages;
  const token = authReducer?.accessToken;

  const [isAddPackagemodal, setIsAddPackagemodal] = useState("");
  const [updatePackageModal, setUpdatePackageModal] = useState(null);
  const [showAllPackages, setShowAllPackages] = useState(true);
  const [isExtractFeatures, setIsExtractFeatures] = useState(false);
  const [updateSelectedPackageData, setUpdateSelectedPackageData] =
    useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const _updatePackageModal = () => {
    setIsLoading(true)
    const id = updateSelectedPackageData?.id;
    const data = {
      name: updateSelectedPackageData.name,
      price: updateSelectedPackageData.price,
      package_limit: updateSelectedPackageData.package_limit,
      description: updateSelectedPackageData.description,
    };
    updateAllPackages(data, id).then(() => {
      getAllPackages();
      getAllCustomPackages(token).then(() => {
        setIsLoading(false);
      });
    });
    setUpdatePackageModal(false);
  };

  useEffect(() => {
    setIsLoading(true);
    getAllPackages(token);
    getAllCustomPackages(token).then(() => {
      setIsLoading(false);
    });
  }, []);

  const makeListArray = (data) => {
    let array = data.split("\n");
    let updatedList = array.filter((item) => {
      return item !== "";
    });
    setUpdateSelectedPackageData({
      ...updateSelectedPackageData,
      description: updatedList,
    });
  };

  const openModal = (item) => {
    setUpdatePackageModal(true);
    setUpdateSelectedPackageData(item);
  };

  const addnewpackage = () => {
    setIsAddPackagemodal(true);
  };
  return (
    <div className="container-fluid">
      <h2 className="page-heading ml-3">Packages</h2>
      {isLoading ? (
        <div className="loader-container">
          <BounceLoader color={"#81246C"} loading={isLoading} size={100} />
        </div>
      ) : (
        <>
          <div className="col-md-12 col-sm-12 text-right hidden-xs justify-content-between d-flex">
            <div className="d-flex flex-row align-items-center">
              <button
                className="btn btn-success btn-sm mr-1"
                onClick={() => setShowAllPackages(true)}
              >
                Packages
              </button>
              <button
                className="btn btn-success btn-sm mr-1"
                onClick={() => setShowAllPackages(false)}
              >
                Custom Packages
              </button>
            </div>
            <a
              className="btn add-new-btn mb-0"
              title=""
              onClick={() => addnewpackage()}
            >
              Add New
            </a>
          </div>
          {showAllPackages ? (
            <div className="col-12">
              <div className="Card-mine-row-flexed card w_card3">
                {packages?.map((item, idx) => (
                  <div key={idx}>
                    {/* {console.log(item.description)} */}
                    <div className="body">
                      <div className="text-center text-capitalize">
                        <h3>{item?.name}</h3>
                        <p>Price: {item?.price}</p>
                        <p>Limit: {item?.package_limit}</p>
                        <div>
                          <p>Desription:</p>
                          {item?.description?.map((ele) => (
                            <p>{ele}</p>
                          ))}
                          <button
                            className="btn btn-success btn-sm mr-1"
                            onClick={() => openModal(item)}
                          >
                            Update
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="col-12">
              <div className="Card-mine-row-flexed card w_card3">
                {custompackges?.map((item, idx) => (
                  <div key={idx}>
                    <div className="body">
                      <div className="text-center text-capitalize">
                        <h3>{item?.name}</h3>
                        <p>Price: {item?.price}</p>
                        <p>Limit: {item?.package_limit}</p>
                        <div>
                          <p>
                            Desription: video and audio interpretation depending
                            on the business and people required.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {updatePackageModal && (
            <div
              className={`modal fade ${
                updatePackageModal ? "d-block show" : ""
              }`}
            >
              <div
                className="modal-dialog modal-dialog-centered"
                role="document"
              >
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalCenterTitle">
                      Update Package
                    </h5>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                      onClick={() => {
                        setUpdatePackageModal(false);
                        setIsExtractFeatures(false);
                      }}
                    >
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <div className="input-group input-group-lg mb-2 d-flex flex-column">
                      <p className="mb-0">Package Name:</p>
                      <input
                        type="text"
                        className="form-control"
                        aria-label="Large"
                        aria-describedby="inputGroup-sizing-sm"
                        placeholder="Package Name"
                        value={updateSelectedPackageData?.name}
                        onChange={(e) =>
                          setUpdateSelectedPackageData({
                            ...updateSelectedPackageData,
                            name: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="input-group input-group-lg mb-2 d-flex flex-column">
                      <p className="mb-0">Package Price:</p>
                      <input
                        type="text"
                        className="form-control input-size"
                        aria-label="Large"
                        aria-describedby="inputGroup-sizing-sm"
                        placeholder="Package Price"
                        value={updateSelectedPackageData?.price}
                        onChange={(e) =>
                          setUpdateSelectedPackageData({
                            ...updateSelectedPackageData,
                            price: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="input-group input-group-lg d-flex flex-column">
                      <p className="mb-0">No. of Interpreters:</p>
                      <input
                        type="text"
                        className="form-control input-size"
                        aria-label="Large"
                        aria-describedby="inputGroup-sizing-sm"
                        placeholder="Package Limit"
                        value={updateSelectedPackageData?.package_limit}
                        onChange={(e) =>
                          setUpdateSelectedPackageData({
                            ...updateSelectedPackageData,
                            package_limit: e.target.value,
                          })
                        }
                      />
                    </div>
                    {!isExtractFeatures ? (
                      <>
                        <p className="mb-0 mt-2">Package Details:</p>
                        <ul className="mt-4">
                          <button
                            className="btn btn-success btn-sm mr-1 float-right"
                            onClick={() => setIsExtractFeatures(true)}
                          >
                            Edit
                          </button>
                          {updateSelectedPackageData?.description.map(
                            (item, idx) => {
                              console.log(item);
                              return (
                                <>
                                  <li
                                    key={idx}
                                    className="d-flex justify-content-between mb-2"
                                  >
                                    {item}
                                  </li>
                                </>
                              );
                            }
                          )}
                        </ul>
                      </>
                    ) : (
                      <>
                        <p className="mb-0 mt-2">Package Details:</p>
                        <textarea
                          rows="5"
                          className="form-control"
                          name="description"
                          onChange={(e) => {
                            makeListArray(e.target.value);
                          }}
                        ></textarea>
                      </>
                    )}
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-round btn-default"
                      data-dismiss="modal"
                      onClick={() => {
                        setUpdatePackageModal(false);
                        setIsExtractFeatures(false);
                      }}
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      className="btn btn-round btn-primary"
                      onClick={() => _updatePackageModal()}
                    >
                      Save changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          :
          {isAddPackagemodal && (
            <div
              className={`modal fade ${
                isAddPackagemodal ? "d-block show" : ""
              }`}
            >
              <div
                className="modal-dialog modal-dialog-centered"
                role="document"
              >
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalCenterTitle">
                      Add New Package
                    </h5>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                      onClick={() => setIsAddPackagemodal("")}
                    >
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <div className="input-group input-group-lg mb-2">
                      <input
                        type="text"
                        className="form-control"
                        aria-label="Large"
                        aria-describedby="inputGroup-sizing-sm"
                        placeholder="Package Name"
                      />
                    </div>
                    <div className="input-group input-group-lg mb-2">
                      <input
                        type="text"
                        className="form-control input-size"
                        aria-label="Large"
                        aria-describedby="inputGroup-sizing-sm"
                        placeholder="Package Price"
                      />
                      <input
                        type="text"
                        className="form-control input-size"
                        aria-label="Large"
                        aria-describedby="inputGroup-sizing-sm"
                        placeholder="Package Limit"
                      />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-round btn-default"
                      data-dismiss="modal"
                      onClick={() => setIsAddPackagemodal("")}
                    >
                      Close
                    </button>
                    <button type="button" className="btn btn-round btn-primary">
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
  );
};
const mapStateToProps = ({ packagesReducer,authReducer }) => {
  return { packagesReducer,authReducer };
};
export default connect(mapStateToProps, actions)(Packages);
