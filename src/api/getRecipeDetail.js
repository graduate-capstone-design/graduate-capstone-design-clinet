import axios from 'axios';

const getDetail = async (id) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/recipes/details/${id}`
    );

    return response.data;
  } catch (err) {
    console.error('Err >>', err);
  }
};

export default getDetail;
