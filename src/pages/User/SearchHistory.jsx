import { useEffect, useState } from "react";
import ResponsiveAppBar from "../../components/Nav/ResponsiveAppBar";
import styles from "./style/SearchHistory.module.css";

const SearchHistory = () => {
  const [recentSearches, setRecentSearches] = useState([]);

  useEffect(() => {
    const storedSearches =
      JSON.parse(localStorage.getItem("recentSearches")) || [];
    setRecentSearches(storedSearches);
  }, []);

  return (
    <div className={styles.top}>
      <ResponsiveAppBar />
      <div className={styles.mainContainer}>
        <div className={styles.rankingTitle}>
          <span>최근 검색어</span>
        </div>
        <ul className={styles.rankingList}>
          {recentSearches.map((search, index) => (
            <li key={index} className={styles.rankingItem}>
              {search}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchHistory;
