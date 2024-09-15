import axios from 'axios';

const fetchSchedulesByDate = async (date) => {
  const baseUrl = process.env.REACT_APP_SERVER_URL;
  try {
    const res = await axios.get(`${baseUrl}/api/schedule/date`, {
      params: {
        date: date,
      },
    });

    return res.data.data;
  } catch (error) {
    console.log({
      success: false,
      message: "Error fetching schedule data😢:",
      error,
    });
    throw error;
  }
}

export default fetchSchedulesByDate;