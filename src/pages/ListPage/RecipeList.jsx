import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ResponsiveAppBar from '../../components/Nav/ResponsiveAppBar';
import styles from './style/RecipeList.module.css';

const Recipepage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { results, foodName } = location.state || {};
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 10;
  const numResults = results?.length || 0;

  useEffect(() => {
    if (results) {
      setSearchResults(results);
    }
  }, [results]);

  const startIndex = (currentPage - 1) * resultsPerPage;
  const endIndex = Math.min(startIndex + resultsPerPage, numResults);

  const handleClick = (id) => {
    console.log(`You clicked on result ${id}`);
    navigate(`/recipe-detail/${id}`);
  };

  return (
    <div className={styles.top}>
      <ResponsiveAppBar />
      <div className={styles.searchContainer}>
        <h1 className={styles.searchCategory}>{foodName}</h1>
        <div className={styles.buttonGroup}>
          <button className={styles.backBtn} onClick={() => navigate(-1)}>
            뒤로가기
          </button>
        </div>
        <div className={styles.mainContainer}>
          <ul className={styles.resultsContainer}>
            {searchResults.slice(startIndex, endIndex).map((result, index) => (
              <li
                key={result.id}
                className={styles.result}
                onClick={() => handleClick(result.id)}
              >
                <div className={styles.resultInfo}>
                  <img
                    className={styles.resultImage}
                    src={result.image}
                    alt={result.foodName}
                  />
                  <hr className={styles.divider} />
                  <h4 className={styles.recipeName}>{result.foodName}</h4>
                </div>
              </li>
            ))}
          </ul>
          {numResults > resultsPerPage && (
            <div className={styles.pagination}>
              {Array.from(
                { length: Math.ceil(numResults / resultsPerPage) },
                (_, i) => (
                  <button key={i + 1} onClick={() => setCurrentPage(i + 1)}>
                    {i + 1}
                  </button>
                )
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Recipepage;
