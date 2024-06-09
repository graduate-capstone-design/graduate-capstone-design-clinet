import axios from "axios";

const getRestaurantDetail = async (id) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/restaurants/details/${id}`
    );
    console.log(response);
    return response.data;
  } catch (err) {
    console.log("Err >>", err);
  }
};

export default getRestaurantDetail;
