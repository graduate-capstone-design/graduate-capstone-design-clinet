import axios from 'axios';

const getRecipeRanking = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/recipes/ranking`
    );
    return response.data;
  } catch (err) {
    console.log('Err >>', err);
  }
};

export default getRecipeRanking;
