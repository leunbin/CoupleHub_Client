import axios from "axios";

const fetchMemoByDuedate = async (date) => {
  const baseUrl = process.env.REACT_APP_SERVER_URL;
  try {
    const res = await axios.get(`${baseUrl}/api/memo/dueDate`, {
      params: {
        date: date,
      },
    });

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

export default fetchMemoByDuedate;