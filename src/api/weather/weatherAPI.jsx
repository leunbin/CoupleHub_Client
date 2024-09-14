import axios from "axios";

const weatherAPI = async ({ date, time, nx, ny }) => {
  const baseUrl = process.env.REACT_APP_SERVER_URL;
  try {
    const result = await axios.get(`${baseUrl}/api/weather`, {
      params: { date, time, nx, ny },
    });
    return result.data.data;
  } catch (error) {
    console.log({
      success: false,
      message: "Error fetching weather data🌩️:",
      error,
    });
    throw error;
  }
};

export default weatherAPI;
