import axios from 'axios';

const likeRecipe = async (id) => {
  try {
    await axios.post(`${process.env.REACT_APP_SERVER_URL}/recipes/${id}/like`);
  } catch (err) {
    console.log('Err >>', err);
  }
};

export default likeRecipe;
