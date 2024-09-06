import axios from 'axios';

const weatherAPI = async ({date, time, nx, ny}) => {
  const baseUrl = process.env.REACT_APP_SERVER_URL;
  try {
    const result = await axios.get(`${baseUrl}/api/weather`, {
      params: { date, time, nx, ny }
    });
    console.log(result);
    return result.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

export default weatherAPI;
