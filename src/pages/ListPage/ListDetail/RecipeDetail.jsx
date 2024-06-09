import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ResponsiveAppBar from '../../../components/Nav/ResponsiveAppBar';
import styles from './RecipeDetail.module.css';
import getDetail from '../../../api/getRecipeDetail';
import fetchYouTubeVideos from '../../../api/getYoutubeAPI';
import likeRecipe from '../../../api/getLikeAPI';

const fetchRecipeDetails = async (id, setRecipe) => {
  try {
    const recipeData = await getDetail(id);
    setRecipe(recipeData);
  } catch (error) {
    console.error('Error fetching recipe details:', error);
  }
};

const VideoSection = ({ videoIds, error }) => (
  <div className={styles.rightColumn}>
    {error && (
      <div className={styles.error}>
        <p>{error}</p>
      </div>
    )}
    {videoIds.length > 0 && (
      <section className={styles.videoSection}>
        {videoIds.map((videoId, index) => (
          <iframe
            key={index}
            className={styles.videoIframe}
            src={`https://www.youtube.com/embed/${videoId}`}
            title={`YouTube video player ${index + 1}`}
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ))}
      </section>
    )}
  </div>
);

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [videoIds, setVideoIds] = useState([]);
  const [error, setError] = useState('');
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    fetchRecipeDetails(id, setRecipe);
  }, [id]);

  useEffect(() => {
    if (recipe) {
      fetchYouTubeVideos(recipe.foodName, setVideoIds, setError);
      setLikes(recipe.likeCount);
    }
  }, [recipe]);

  const handleLike = async () => {
    try {
      await likeRecipe(id);
      setLikes((prev) => prev + 1);
    } catch {
      setError('추천을 보내는 중 오류가 발생했습니다.');
    }
  };

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.top}>
      <ResponsiveAppBar />
      <div className={styles.mainContainer}>
        <button className={styles.backBtn} onClick={() => navigate(-1)}>
          뒤로가기
        </button>
        <div className={styles.container}>
          <div className={styles.leftColumn}>
            <section className={styles.imageSection}>
              <img
                src={recipe.image}
                alt={recipe.foodName}
                className={styles.image}
              />
            </section>
            <section className={styles.infoSection}>
              <div className={styles.nameRating}>
                <h2>{recipe.foodName}</h2>
                <button className={styles.likeBtn} onClick={handleLike}>
                  <p>추천수: {likes}</p>
                </button>
              </div>
              <div className={styles.recipeInfo}>
                <h3>음식 정보</h3>
                <p>칼로리: {recipe.calories}</p>
                <p>재료: {recipe.ingredients}</p>
                <p>레시피: {recipe.recipe}</p>
              </div>
            </section>
          </div>
          <VideoSection videoIds={videoIds} error={error} />
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
