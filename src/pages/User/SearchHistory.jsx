import { useEffect, useState } from 'react';
import ResponsiveAppBar from '../../components/Nav/ResponsiveAppBar';
import styles from './style/SearchHistory.module.css';
import getSeachList from '../../api/getSeachList';
import { useNavigate } from 'react-router-dom';

const SearchHistory = () => {
  const [recentSearches, setRecentSearches] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedSearches =
      JSON.parse(localStorage.getItem('recentSearches')) || [];
    setRecentSearches(storedSearches);
  }, []);

  const clearSearchHistory = () => {
    localStorage.removeItem('recentSearches');
    setRecentSearches([]);
  };

  const handleRestaurantListPage = async (food) => {
    const response = await getSeachList('restaurants', food);
    navigate(`/search-result/restaurant-by-history/${food}`, {
      state: { food, response },
    });
  };

  return (
    <div className={styles.top}>
      <ResponsiveAppBar />
      <div className={styles.mainContainer}>
        <div className={styles.rankingTitle}>
          <span>최근 검색어</span>
        </div>
        <ul className={styles.rankingList}>
          {recentSearches.map((search, index) => (
            <li
              onClick={() => {
                handleRestaurantListPage(search);
              }}
              key={index}
              className={styles.rankingItem}
            >
              {search}
            </li>
          ))}
        </ul>
        <button onClick={clearSearchHistory} className={styles.delete_btn}>
          검색 기록 삭제
        </button>
      </div>
    </div>
  );
};

export default SearchHistory;
