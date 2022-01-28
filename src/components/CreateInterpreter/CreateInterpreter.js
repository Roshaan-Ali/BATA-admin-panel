import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../actions/actions";
import { imageUrl, token } from "../../config/config";
import person from "../../assets/images/person.png";
import BounceLoader from "react-spinners/BounceLoader";
import moment from "moment";

const CreateInterpreter = ({
  langaugesReducer,
  getAllLanguages,authReducer,
  createInterpreter,
}) => {
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [language, setLanguage] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fieldLeftEmpty, setFieldLeftEmpty] = useState(false);
  const token = authReducer?.accessToken;

  const LIMIT = langaugesReducer?.allLangauges?.length - 1;
  const l = langaugesReducer?.allLangauges;
  const _onPressCreateInterPreter = async () => {
    setIsLoading(true);
    if (
      first_name == "" ||
      last_name == "" ||
      email == "" ||
      phone == "" ||
      password == "" ||
      confirmPassword == "" ||
      language?.length == 0
    ) {
      setFieldLeftEmpty(true);
    } else {
      let data = {
        first_name,
        last_name,
        email,
        phone,
        password,
        confirmPassword,
        language,
        role_id: "3",
      };
      console.log(data);
      await createInterpreter(data).then(() => {
        setFirst_name("");
        setLast_name("");
        setPassword("");
        setEmail("")
        setConfirmPassword("");
        setPhone("");
        setLanguage(langaugesReducer?.allLangauges);
        setSelectedLanguages([langaugesReducer?.allLangauges[0]]);
        setFieldLeftEmpty(false);
      });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllLanguages(token);
  }, []);

  useEffect(() => {
    if (langaugesReducer?.allLangauges?.length > 0) {
      setLanguage(langaugesReducer?.allLangauges);
      setSelectedLanguages([langaugesReducer?.allLangauges[0]]);
    }
  }, [langaugesReducer?.allLangauges]);

  const _onPressBin = (item) => {
    if (selectedLanguages?.length > 1 && selectedLanguages?.length <= LIMIT) {
      const index = selectedLanguages?.findIndex((x) => x?.id === item?.id);
      const oldArray = [...selectedLanguages];
      let arr = oldArray?.splice(index, 1);
      setSelectedLanguages(oldArray);
    } else {
      return;
    }
  };

  const checkAllElements = () => {
    var deSelectedRows = [...language];
    console.log("selectedLanguages", selectedLanguages);
    var selectedRows = [...selectedLanguages];
    var ids = [];
    for (let i = 0; i < selectedRows?.length; i++) {
      if (selectedRows[i]?.id !== null) {
        ids.push(selectedRows[i]?.id);
      }
    }
    // var ids = new Set(selectedRows?.map(({ id }) => id));
    // var res = deSelectedRows?.filter(({ id }) => !ids?.has(id));
    var arr = [];
    console.log("ids: ", ids, "ids length : ", ids.length);
    if (ids?.length > 0) {
      for (let i = 0; i < deSelectedRows?.length; i++) {
        // console.log(deSelectedRows[i]?.id);
        // console.log(ids);
        // console.log(Array.isArray(ids));
        // console.log(!ids?.includes(deSelectedRows[i]?.id));
        // console.log(ids?.includes(deSelectedRows[i]?.id),deSelectedRows[i]?.language_name);
        if (!ids?.includes(deSelectedRows[i]?.id)) {
          // console.log("checked inside",deSelectedRows[i]);
          arr.push(deSelectedRows[i]);
        }
      }
      console.log(arr);
      setLanguage(arr);
    }
  };

  // const _onPressModalDoneButton = () => {
  //   let oldArray = [...selectedLanguages];
  //   oldArray[oldArray?.length] = selectedOption;
  //   console.log(oldArray);
  //   // setSelectedLanguages(oldArray);
  //   // setShowLanguageModal(false);
  // };

  useEffect(() => {
    if (selectedLanguages?.length > 0 && language.length > 0) {
      checkAllElements();
    }
  }, [selectedLanguages]);

  const _placeValue = (id) => {
    let item = null;
    let index = 0;
    for (let i = 0; i < language.length; i++) {
      if (language[i]?.id == id) {
        item = language[i];
        index = i;
      }
    }
    // console.log(item);
    setSelectedOption(item);
    let oldArray = [...selectedLanguages];
    oldArray[oldArray?.length] = item;
    // console.log(oldArray);
    setSelectedLanguages(oldArray);
    setShowLanguageModal(false);
  };

  return (
    <>
      <div className="container-fluid">
        <h2 className="mt-2">Create Interpreter</h2>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <input
            style={{ fontSize: "18px", marginRight: "30px" }}
            value={first_name}
            placeholder="First Name"
            onChange={(e) => {
              setFirst_name(e.target.value);
            }}
          />
          <input
            style={{ fontSize: "18px", marginRight: "30px" }}
            value={last_name}
            placeholder="Last Name"
            onChange={(e) => {
              setLast_name(e.target.value);
            }}
          />
          <input
            style={{ fontSize: "18px" }}
            value={phone}
            placeholder="Phone"
            onChange={(e) => {
              setPhone(e.target.value);
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: "30px",
          }}
        >
          <input
            style={{ fontSize: "18px", marginRight: "30px" }}
            value={email}
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            style={{ fontSize: "18px", marginRight: "30px" }}
            value={password}
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <input
            style={{ fontSize: "18px", marginRight: "30px" }}
            value={confirmPassword}
            type="password"
            placeholder="Confirm Password"
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
        </div>
        <h4 className="mt-3">Select Languages</h4>
        {selectedLanguages?.map((ele) => (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginTop: "10px",
            }}
          >
            <div
              key={ele?.id}
              style={{
                borderRadius: "7px",
                width: "200px",
                height: "40px",
                border: "1px solid purple",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <p className="m-0 ">{ele?.language_name}</p>
            </div>
            {selectedLanguages?.length > 1 && (
              <p
                className="m-0 ml-2"
                style={{ cursor: "pointer", fontWeight: "600" }}
                onClick={() => {
                  _onPressBin(ele);
                }}
              >
                Remove
              </p>
            )}
          </div>
        ))}
        <button
          style={{
            borderRadius: "20px",
            fontSize: "15px",
            color: "white",
            padding: "6px 25px",
            marginTop: "20px",
            backgroundColor: "#81246C",
          }}
          onClick={() => {
            setShowLanguageModal(true);
          }}
        >
          Add Language
        </button>
        {fieldLeftEmpty && (
          <p style={{ color: "red", fontSize: 17, marginTop: 10 }}>
            Some fields have been left empty.
          </p>
        )}
      </div>
      <button
        style={{
          borderRadius: "20px",
          fontSize: "15px",
          color: "white",
          padding: "6px 25px",
          width: "200px",
          marginTop: "20px",
          backgroundColor: "#81246C",
        }}
        onClick={() => {
          _onPressCreateInterPreter();
        }}
      >
        Create Interpreter
      </button>

      {showLanguageModal && (
        <div
          className={`modal fade ${showLanguageModal ? "d-block show" : ""}`}
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalCenterTitle">
                  Select Language
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={() => {
                    setShowLanguageModal(false);
                  }}
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div
                className="modal-body"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <select
                  onChange={(e) => _placeValue(e.target.value)}
                  onClick={() => console.log("test")}
                  name="languages"
                  id="languages"
                  style={{ width: "300px", fontSize: 20 }}
                >
                  <option>Select Language</option>
                  {language?.map((item) => {
                    return (
                      <option key={item?.id} value={item?.id}>
                        {item?.language_name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const mapStateToProps = ({ langaugesReducer,authReducer }) => {
  return { langaugesReducer,authReducer };
};
export default connect(mapStateToProps, actions)(CreateInterpreter);
