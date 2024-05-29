import axios from "axios";

const getSeachList = async (type, foodName) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/${type}/search/byFoodName`,
      {
        params: { foodName },
      }
    );

    return response.data;
  } catch (err) {
    console.log("Err >>", err);
  }
};

export default getSeachList;
