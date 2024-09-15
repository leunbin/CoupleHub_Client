import axios from "axios";

const postLogin = async ({name, phoneNum}) => {
  const baseUrl = process.env.REACT_APP_SERVER_URL;
  console.log(name, phoneNum)
  try{
    const result = await axios.post(`${baseUrl}/api/auth/login`, { name, phoneNum });
    return result.data.data;
  } catch (error) {
    console.log({
      success: false,
      message: "Error login😢:",
      error,
    });
    throw error;
  }
}

export default postLogin;