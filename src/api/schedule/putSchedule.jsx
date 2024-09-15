import axios from 'axios';

const putSchedule = async(id, scheduleData) => {
  const baseUrl = process.env.REACT_APP_SERVER_URL;
  try{
    const res= await axios.put(`${baseUrl}/api/schedule/${id}`, scheduleData);
    return res.data.data;
  } catch (error) {
    console.log({
      success: false,
      message: "Error updating schedule data😢:",
      error,
    });
    throw error;
  }
}

export default putSchedule;