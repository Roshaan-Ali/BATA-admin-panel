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
        headers
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
// export const createUser = (text) => async (dispatch) => {
//   try {
//     const headers = {
//       Authorization: `Bearer ${token}`,
//     };
//     const response = await axios.post(
//       `${apiUrl}/api/admin/language/create`,
//       { language_name: text },
//       { headers }
//     );
//     if (response.data.status) {
//       dispatch({
//         type: "ALL_USERS",
//         payload: response.data.data,
//       });
//       toast.success("New User Added");
//     } else {
//       toast.error("Couldn't Add New User");
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

export const getAllLanguages = (token) => async (dispatch) => {
  console.log(token);
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
      // 'My-Custom-Header': 'foobar'
    };
    const response = await axios.get(`${apiUrl}/api/admin/language/gets`, {
      headers,
    });
    if (response.data.status) {
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
