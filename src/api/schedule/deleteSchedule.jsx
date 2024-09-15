import axios from 'axios';

const deleteSchedule = async(id) => {
  const baseUrl = process.env.REACT_APP_SERVER_URL;
  try {
    const res = await axios.delete(`${baseUrl}/api/schedule/${id}`
    );
    return res.data.data; 
  } catch (error) {
    console.log({
      success: false,
      message: "Error deleting schedule data😢:",
      error,
    });
    throw error;
  }
}

export default deleteSchedule;