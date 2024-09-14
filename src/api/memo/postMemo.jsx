import axios from 'axios';

const postMemo = async (memoData) => {
  const baseUrl = process.env.REACT_APP_SERVER_URL;
  try {
    const res = await axios.post(`${baseUrl}/api/memo`, memoData);
    return res.data;
  } catch (error) {
    console.log({
      success: false,
      message: "Error posting memo data😢:",
      error,
    });
    throw error;
  }
}

export default postMemo;
