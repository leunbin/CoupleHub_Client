import axios from 'axios';

const fetchSchedules = async () => {
  const baseUrl = process.env.REACT_APP_SERVER_URL;
  try{
    const res = await axios.get(`${baseUrl}/api/schedule`);
    return res.data.data;
  } catch (error) {
    console.log({
      success: false,
      message: "Error fetching schedule datas😢:",
      error,
    });
    throw error;
  }
}

export default fetchSchedules;