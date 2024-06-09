import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ResponsiveAppBar from '../../components/Nav/ResponsiveAppBar';
import styles from './Ranking.module.css';
import getRecipeRanking from '../../api/getRanking';

const RankingPage = () => {
  const [rankings, setRankings] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchRankings();
  }, []);

  const fetchRankings = async () => {
    try {
      const result = await getRecipeRanking();
      setRankings(result);
    } catch (err) {
      setError('Failed to load ranking data');
    }
  };

  const handleItemClick = (id) => {
    navigate(`/recipe-detail/${id}`);
  };

  const getTrophyClass = (index) => {
    if (index === 0) return styles.gold;
    if (index === 1) return styles.silver;
    if (index === 2) return styles.bronze;
    return '';
  };

  return (
    <div className={styles.top}>
      <ResponsiveAppBar />
      <div className={styles.mainContainer}>
        <div className={styles.rankingTitle}>
          <span>이달의 랭킹</span>
        </div>
        <div className={styles.rankingContainer}>
          {error && <div className={styles.error}>{error}</div>}
          <ol className={styles.rankingList}>
            {rankings.map((recipe, index) => (
              <li
                key={recipe.id}
                className={styles.rankingItem}
                onClick={() => handleItemClick(recipe.id)}
              >
                <div className={styles.rank}>{index + 1}</div>
                <img
                  src={recipe.image}
                  alt={recipe.foodName}
                  className={styles.avatar}
                />
                <div className={styles.details}>
                  <span className={styles.name}>{recipe.foodName}</span>
                  <span className={styles.likes}></span>
                </div>
                {index < 3 && (
                  <span className={`${styles.trophy} ${getTrophyClass(index)}`}>
                    {index === 0 && '🥇'}
                    {index === 1 && '🥈'}
                    {index === 2 && '🥉'}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default RankingPage;
