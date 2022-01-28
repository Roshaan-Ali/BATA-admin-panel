import { apiUrl, token } from "../config/config";
import axios from "axios";
import { toast } from "react-toastify";

export const getAllUsers = (token) => async (dispatch) => {
  console.log(token);
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
      // 'My-Custom-Header': 'foobar'
    };
    const response = await axios.get(`${apiUrl}/api/admin/users/getAllUsers`, {
      headers,
    });
    if (response.data.status) {
      dispatch({
        type: "ALL_USERS",
        payload: response.data.data,
      });
    } else {
      console.log("fail");
    }
  } catch (error) {
    console.log(error);
  }
};
export const enable_disable = (url) => async (dispatch) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.put(
      `${apiUrl}${url}`,
      {},
      {
        headers,
      }
    );
    if (response.data.status) {
      toast.success("Active");
    } else {
      toast.error("Couldn't Active");
    }
  } catch (error) {
    console.log(error);
  }
};

export const toggleLanguage = (id) => async (dispatch) => {
  const header = {
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await axios.put(
      `${apiUrl}/api/admin/language/activeOrUnactive/${id}`,
      {},
      header
    );
    console.log(response.data);
  } catch (err) {
    console.log("Network Error", err);
  }
};

export const toggleUsers = (id) => async (dispatch) => {
  const header = {
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await axios.put(
      `${apiUrl}/api/admin/users/block/${id}`,
      {},
      header
    );
    console.log(response.data);
  } catch (err) {
    console.log("Network Error", err);
  }
};

export const getAllLanguages = (token) => async (dispatch) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
      // 'My-Custom-Header': 'foobar'
    };
    const response = await axios.get(`${apiUrl}/api/admin/language/gets`, {
      headers,
    });
    if (response.data.status) {
      // console.log(response.data.data," response");
      dispatch({
        type: "ALL_LANGUAGES",
        payload: response.data.data,
      });
    } else {
      console.log("fail");
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateLanguage = (id, text) => async (dispatch) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.put(
      `${apiUrl}/api/admin/language/update/${id}`,
      { language_name: text },
      { headers }
    );
    if (response.data.status) {
      toast.success("Language Updated");
    } else {
      toast.error("Couldn't Update Language");
    }
  } catch (error) {
    console.log(error);
  }
};

export const createLanguage = (text) => async (dispatch) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.post(
      `${apiUrl}/api/admin/language/create`,
      { language_name: text },
      { headers }
    );
    if (response.data.status) {
      dispatch({
        type: "ALL_LANGUAGE",
        payload: response.data.data,
      });
      toast.success("New Language Inserted");
    } else {
      toast.error("Couldn't Insert New Language");
    }
  } catch (error) {
    console.log(error);
  }
};

export const getAllPackages = (token) => async (dispatch) => {
  console.log(token);
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
      // 'My-Custom-Header': 'foobar'
    };
    const response = await axios.get(`${apiUrl}/api/packages/gets`, {
      headers,
    });
    if (response.data.status) {
      dispatch({
        type: "ALL_PACKAGES",
        payload: response.data.data,
      });
    } else {
      console.log("fail");
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateAllPackages = (data, id) => async (dispatch) => {
  console.log(data, "::::::::::::::::::", id);
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.put(
      `${apiUrl}/api/admin/packages/update/${id}`,
      data,
      { headers }
    );
    if (response.data.status) {
      toast.success("Package Updated");
    } else {
      toast.error("Couldn't Update Package");
    }
  } catch (error) {
    console.log(error);
  }
};

export const getAllCustomPackages = (token) => async (dispatch) => {
  console.log(token);
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.get(`${apiUrl}/api/admin/packages/gets`, {
      headers,
    });
    if (response.data.status) {
      dispatch({
        type: "CUSTOM_PACKAGES",
        payload: response.data.data,
      });
    } else {
      console.log("fail");
    }
  } catch (error) {
    console.log(error);
  }
};

export const getAllRoles = (token) => async (dispatch) => {
  console.log(token);
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
      // 'My-Custom-Header': 'foobar'
    };
    const response = await axios.get(`${apiUrl}/api/admin/roles/gets`, {
      headers,
    });
    if (response.data.status) {
      dispatch({
        type: "ALL_ROLES",
        payload: response.data.data,
      });
    } else {
      console.log("fail");
    }
  } catch (error) {
    console.log(error);
  }
};

export const getAllOccasions = (token) => async (dispatch) => {
  console.log(token);
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
      // 'My-Custom-Header': 'foobar'
    };
    const response = await axios.get(`${apiUrl}/api/occation/gets`, {
      headers,
    });
    if (response.data.status) {
      dispatch({
        type: "ALL_OCCASIONS",
        payload: response.data.data,
      });
    } else {
      console.log("fail");
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateOccasions = (id, text) => async (dispatch) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.put(
      // console.log(response.data,"--------------------------------------------")
      `${apiUrl}/api/admin/occation/update/${id}`,
      { name: text },
      { headers }
    );
    if (response.data.status) {
      toast.success("Occasion Updated");
    } else {
      toast.error("Couldn't Update Occasion");
    }
  } catch (error) {
    console.log(error);
  }
};

export const createOccasions = (text) => async (dispatch) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.post(
      `${apiUrl}/api/admin/occation/create`,
      { name: text },
      { headers }
    );

    console.log(response.data);
    if (response.data.status) {
      dispatch({
        type: "ALL_OCCASIONS",
        payload: response.data.data,
      });
      toast.success("New Occasion Inserted");
    } else {
      toast.error("Couldn't Insert New Occasion");
    }
  } catch (error) {
    console.log(error);
  }
};

export const getBookings = (token) => async (dispatch) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.get(
      `${apiUrl}/api/admin/bookingInterpreter/gets`,
      { headers }
    );
    dispatch({
      type: "GET_BOOKINGS",
      payload: response.data.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getInactiveInterpreters = (token) => async (dispatch) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.get(
      `${apiUrl}/api/admin/interpreter/inActiveInterpreter`,
      { headers }
    );
    dispatch({
      type: "GET_INACTIVE_INTERPRETERS",
      payload: response.data.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const assignInterpreter = (id, data) => async (dispatch) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.put(
      `${apiUrl}/api/admin/bookingInterpreter/accept/${id}`,
      data,
      { headers }
    );
  } catch (err) {
    console.log(err);
  }
};

export const rejectInterpreter = (id, data) => async (dispatch) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.put(
      `${apiUrl}/api/admin/bookingInterpreter/reject/${id}`,
      data,
      { headers }
    );
  } catch (err) {
    console.log(err);
  }
};

export const createInterpreter = (data) => async (dispatch) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.post(
      `${apiUrl}/api/admin/interpreter/create`,
      data,
      { headers }
    );

    console.log(response.data);
    if (response.data.status) {
      dispatch({
        type: "CREATE_INTERPRETER",
        payload: response.data.data,
      });
      toast.success("New Interpreter Created.");
    } else {
      toast.error("Couldn't Create New Interpreter");
    }
  } catch (error) {
    console.log(error);
  }
};

export const adminLogin =
  (email, password, _onLoginSuccess) => async (dispatch) => {
    try {
      const response = await axios.post(`${apiUrl}/api/users/signin`, {
        email,
        password,
      });
      if (response?.data?.success) {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: response?.data?.data,
        });
        _onLoginSuccess();
      } else {
        toast.error(response?.data?.msg);
      }
    } catch (err) {
      toast.error("Network Failure");
      console.log(
        "Network Error, ",
        err?.response?.data?.msg || "No Connection ======="
      );
    }
  };

export const logout = () => async (dispatch) => {
  try {
    dispatch({
      type: "LOGOUT_REQUEST",
    });
  } catch (err) {
    console.log(err);
  }
};
