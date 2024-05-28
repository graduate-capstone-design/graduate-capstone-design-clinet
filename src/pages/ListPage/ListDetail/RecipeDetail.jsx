import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ResponsiveAppBar from '../../../components/Nav/ResponsiveAppBar';
import styles from './RecipeDetail.module.css';
import getDetail from '../../../api/getDetail';

// 유튜브 동영상을 검색하여 비디오 ID 배열을 설정하는 함수
const fetchYouTubeVideos = async (recipeName, setVideoIds, setErrorMessage) => {
  const API_KEY = 'AIzaSyCqItFIbQGul_PZDk_GG2JTcJ9LQ4odJ7E';
  const query = `${recipeName} 레시피`;
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=4&q=${encodeURIComponent(
    query
  )}&key=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.items && data.items.length > 0) {
      const ids = data.items.map((item) => item.id.videoId);
      setVideoIds(ids);
    }
  } catch (error) {
    console.error('Error fetching YouTube videos:', error);
    setErrorMessage('유튜브 동영상을 불러오는 중 오류가 발생했습니다.');
  }
};

// 레시피 정보를 API에서 가져와 설정하는 함수
const fetchRecipe = async (id, setRecipe) => {
  try {
    const recipeData = await getDetail(id);
    setRecipe(recipeData);
  } catch (error) {
    console.error('Error fetching recipe details:', error);
  }
};

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [videoIds, setVideoIds] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchRecipe(id, setRecipe);
  }, [id]);

  useEffect(() => {
    if (recipe) {
      fetchYouTubeVideos(recipe.foodName, setVideoIds, setErrorMessage);
    }
  }, [recipe]);

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
              </div>
              <div className={styles.recipeInfo}>
                <h3>음식 정보</h3>
                <p>칼로리: {recipe.calories}</p>
                <p>기본 재료: {recipe.ingredients}</p>
                <p>기본 레시피: {recipe.recipe}</p>
              </div>
            </section>
          </div>
          <div className={styles.rightColumn}>
            {errorMessage && (
              <div className={styles.error}>
                <p>{errorMessage}</p>
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
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
