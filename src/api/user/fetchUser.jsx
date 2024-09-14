import axios from "axios";

const fetchUser = async (token) => {
  const baseUrl = process.env.REACT_APP_SERVER_URL;
  try{
    const res = await axios.get(`${baseUrl}/api/user`,{
      headers:{
        Authorization: `Bearer ${token}`
      }
    });

    return res.data.data;
  } catch (error) {
    console.log({
      success: false,
      message: "Error fetching user data😢:",
      error,
    });
    throw error;
  }
}

export default fetchUser;