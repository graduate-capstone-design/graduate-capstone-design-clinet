import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ResponsiveAppBar from '../../../components/Nav/ResponsiveAppBar';
import styles from './RecipeDetail.module.css';

const fetchRecipe = async (setRecipe) => {
  const data = {
    image: 'https://via.placeholder.com/150?text=Recipe+Image',
    name: '간장치킨.',
    rating: 4.5,
    calories: '200 kcal',
    ingredients: '간장, 설탕, 마늘, 닭고기',
    basicRecipe: '모든 재료를 섞어 닭고기에 발라 구워주세요.',
  };
  setRecipe(data);
};

const fetchYouTubeVideos = async (recipe, setVideoIds, setErrorMessage) => {
  const API_KEY = 'AIzaSyCqItFIbQGul_PZDk_GG2JTcJ9LQ4odJ7E';
  const query = `${recipe.name} 레시피`;
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

const Recipein = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [videoIds, setVideoIds] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchRecipe(setRecipe);
  }, [id]);

  useEffect(() => {
    if (recipe) {
      fetchYouTubeVideos(recipe, setVideoIds, setErrorMessage);
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
                alt={recipe.name}
                className={styles.image}
              />
            </section>
            <section className={styles.infoSection}>
              <div className={styles.nameRating}>
                <h2>{recipe.name}</h2>
                <span className={styles.rating}>{recipe.rating}</span>
              </div>
              <div className={styles.recipeInfo}>
                <h3>음식 정보</h3>
                <p>칼로리: {recipe.calories}</p>
                <p>기본 재료: {recipe.ingredients}</p>
                <p>기본 레시피: {recipe.basicRecipe}</p>
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
                <h3>레시피 동영상</h3>
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

export default Recipein;
