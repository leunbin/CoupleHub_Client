import axios from 'axios';

const putMemo = async(id, memoData) => {
  const baseUrl = process.env.REACT_APP_SERVER_URL;
  try{
    const res= await axios.put(`${baseUrl}/api/memo/${id}`, memoData);
    return res.data.data;
  } catch (error) {
    console.log({
      success: false,
      message: "Error updating memo data😢:",
      error,
    });
    throw error;
  }
}

export default putMemo;