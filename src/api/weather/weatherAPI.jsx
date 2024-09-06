import axios from 'axios';

const weatherAPI = async ({date, time, nx, ny}) => {
  try {
    const result = await axios.get(`http://localhost:4000/api/weather`, {
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
