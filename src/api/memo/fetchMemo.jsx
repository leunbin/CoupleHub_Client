import axios from "axios";

const fetchMemo = async () => {
  const baseUrl = process.env.REACT_APP_SERVER_URL;
  try{
    const res = await axios.get(`${baseUrl}/api/memo`);
    return res.data.data;
  } catch (error) {
    console.log({
      success: false,
      message: "Error fetching memo data😢:",
      error,
    });
    throw error;
  }
}

export default fetchMemo;