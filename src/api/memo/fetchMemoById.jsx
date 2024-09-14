import axios from 'axios';

const fetchMemoById = async (id) => {
  const baseUrl = process.env.REACT_APP_SERVER_URL;
  try {
    const res = await axios.get(`${baseUrl}/api/memo/${id}`
    );
    return res.data.data; 
  } catch (error) {
    console.log({
      success: false,
      message: "Error fetching memo data😢:",
      error,
    });
    throw error;
  }
};

export default fetchMemoById;