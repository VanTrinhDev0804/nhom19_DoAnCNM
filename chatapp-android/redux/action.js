import axios from "axios";

const serverUrl = "http://10.0.2.2:5000";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: "loginRequest" });

    const { data } = await axios.post(
      `${serverUrl}/api/auth/login`,
      { email, password }

    );
     console.log("data", data)
     if(data.status){
      dispatch({ type: "loginSuccess", payload: data });
     }
     else{
      dispatch({ type: "loginFailure", payload: data.msg})
     }
  
  } catch (error) {
    console.log(error)
    dispatch({ type: "loginFailure", payload: error.response.data.message});
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: "loadUserRequest" });

    const { data } = await axios.get(`${serverUrl}/me`);
    dispatch({ type: "loadUserSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "loadUserFailure", payload: error.response.data.message });
  }
};


export const loadListFriend = (id) => async( dispatch)=>{
  try {
    const {data} = await await axios.get(`${serverUrl}/api/auth/allusers/${id}`);

    dispatch({ type: "loadListUser", payload: data });
  
  } catch (error) {
    console.log(error)
  }
   
}
export const loadGroups = (id) => async( dispatch)=>{
  try {
    const {data} = await await axios.get(`${serverUrl}/api/groupchat/getgroupchat/${id}`);
    console.log(data)
    dispatch({ type: "loadGroupsChats", payload: data });
  
  } catch (error) {
    console.log(error)
  }
   
}

export const loadCurrentMessage = (data , currentChat) => async (dispatch) => {
  try {
    dispatch({ type: "loadMesageRequest" });
    const response = await axios.post(`${serverUrl}/api/messages/getmsg`, {
      from: data._id,
      to: currentChat._id,
    });
    console.log(response.data , "----------------------")
   
    dispatch({ type: "loadMesageSuccess", payload: response.data});
  } catch (error) {
      console.log(errr)
  }
};




export const updateTask = (taskId) => async (dispatch) => {
  try {
    dispatch({ type: "updateTaskRequest" });

    const { data } = await axios.get(`${serverUrl}/task/${taskId}`);
    dispatch({ type: "updateTaskSuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "updateTaskFailure",
      payload: error.response.data.message,
    });
  }
};

export const deleteTask = (taskId) => async (dispatch) => {
  try {
    dispatch({ type: "deleteTaskRequest" });

    const { data } = await axios.delete(`${serverUrl}/task/${taskId}`);
    dispatch({ type: "deleteTaskSuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "deleteTaskFailure",
      payload: error.response.data.message,
    });
  }
};

export const updateProfile = (formData) => async (dispatch) => {
  try {
    dispatch({ type: "updateProfileRequest" });

    const { data } = await axios.put(`${serverUrl}/updateprofile`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    dispatch({ type: "updateProfileSuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "updateProfileFailure",
      payload: error.response.data.message,
    });
  }
};

export const logout = () => async (dispatch) => {
  try {
    dispatch({ type: "logoutRequest" });

    await axios.get(`${serverUrl}/logout`);
    dispatch({ type: "logoutSuccess" });
  } catch (error) {
    dispatch({
      type: "logoutFailure",
      payload: error.response.data.message,
    });
  }
};

export const register = (dataParam) => async (dispatch) => {
  try {
    dispatch({ type: "registerRequest" });
 
    const { data } = await axios.post(`${serverUrl}/api/auth/register`, dataParam, {
  
    });
    dispatch({ type: "registerSuccess", payload: data.user });
  } catch (error) {
    dispatch({
      type: "registerFailure",
      payload: error.response.data.msg,
    });
  }
};

export const updatePassword =
  (oldPassword, newPassword) => async (dispatch) => {
    try {
      dispatch({ type: "updatePasswordRequest" });

      const { data } = await axios.put(
        `${serverUrl}/updatepassword`,
        { oldPassword, newPassword },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch({ type: "updatePasswordSuccess", payload: data.message });
    } catch (error) {
      dispatch({
        type: "updatePasswordFailure",
        payload: error.response.data.message,
      });
    }
  };

export const verify = (otp, userID) => async (dispatch) => {
  try {
    dispatch({ type: "verificationRequest" });

    const { data } = await axios.post(
      `${serverUrl}/api/auth/verify/${userID}`,
      { otp },
     
    );

    console.log(data)
    dispatch({ type: "verificationSuccess", payload: data.isSet });
  } catch (error) {
    console.log(error)
    dispatch({
      type: "verificationFailure",
      payload: error.response.data.message,
    });
  }
};

export const forgetPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: "forgetPasswordRequest" });

    const { data } = await axios.post(
      `${serverUrl}/forgetpassword`,
      { email },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({ type: "forgetPasswordSuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "forgetPasswordFailure",
      payload: error.response.data.message,
    });
  }
};

export const resetPassword = (otp, newPassword) => async (dispatch) => {
  try {
    dispatch({ type: "resetPasswordRequest" });

    const { data } = await axios.put(
      `${serverUrl}/resetpassword`,
      { otp, newPassword },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({ type: "resetPasswordSuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "resetPasswordFailure",
      payload: error.response.data.message,
    });
  }
};