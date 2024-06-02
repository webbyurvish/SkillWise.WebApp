import createAxiosInstance from "../Axios/axiosInstance";

const axiosInstance = createAxiosInstance();

export const handleResetPasswordrequest = async (credentials) => {
  try {
    //////////////////// ---- send request to reset password ---- ////////////////////

    const response = await axiosInstance.post(
      "/account/resetpassword",
      credentials,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response;
  } catch (error) {
    throw new Error(error);
  }
};

//////////////////// ---- send mail for forgot password ---- ////////////////////

export const sendMail = async (email) => {
  try {
    const response = await axiosInstance.post(
      "/account/forgotpassword",
      email,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response;
  } catch (error) {
    throw new Error(error);
  }
};
