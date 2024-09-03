import weatherAPI from "./weatherAPI";

const fetchWeather = async({date,time,nx,ny}) => {
  try {
    const datas = await weatherAPI({date,time,nx,ny});
    return datas;
  } catch(error) {
    console.log(error);
  }
}

export default fetchWeather;