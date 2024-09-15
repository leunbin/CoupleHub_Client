import axios from'axios';

const postSchedule = async (scheduleData) => {
  const baseUrl = process.env.REACT_APP_SERVER_URL;
  console.log(scheduleData)
  try{
    const res = await axios.post(`${baseUrl}/api/schedule`, scheduleData);
    return res.data;
  } catch (error) {
    console.log({
      success: false,
      message: "Error posting schedule data😢:",
      error,
    });
    throw error;
  }
}

export default postSchedule;