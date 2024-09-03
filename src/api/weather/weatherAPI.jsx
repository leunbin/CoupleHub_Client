import axios from "axios";

const weatherAPI = async ({date, time, nx, ny}) => {
  const apikey = process.env.REACT_APP_WEATHER_API_KEY;
  const url = process.env.REACT_APP_WEATHER_CALLBACK_URL;
  const requestUrl = `${url}?serviceKey=${apikey}&numOfRows=7&pageNo=1&dataType=JSON&base_date=${date}&base_time=${time}&nx=${nx}&ny=${ny}`

  
  try {
    const result = await axios.get(requestUrl);
    console.log(requestUrl)
    console.log(result);
    return result.data.response.body.items.item;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error; // 에러를 호출자에게 전달
  }
}

export default weatherAPI;