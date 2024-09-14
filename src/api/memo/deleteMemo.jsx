import axios from 'axios';

const deleteMemo = async(id) => {
  const baseUrl = process.env.REACT_APP_SERVER_URL;
  try {
    const res = await axios.delete(`${baseUrl}/api/memo/${id}`
    );
    return res.data.data; 
  } catch (error) {
    console.log({
      success: false,
      message: "Error deleting memo data😢:",
      error,
    });
    throw error;
  }
}

export default deleteMemo;