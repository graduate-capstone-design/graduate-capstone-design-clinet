import { useState } from "react";
import { useNavigate } from "react-router-dom";

// style
import styles from "./style/Mainpage.module.css";

// Components
import ResponsiveAppBar from "../components/Nav/ResponsiveAppBar";

// Svg
import searchIcon from "../asset/svg/search.svg";

// Api
import getSeachList from "../api/getSeachList";

const data = { 음식점: "restaurants", 레시피: "recipes" };

const MainPage = () => {
  const [search, setSearch] = useState("");
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  // 음식점 버튼 클릭 핸들러
  const handleRestaurantClick = () => {
    setSearch(data["음식점"]);
  };

  // 레시피 버튼 클릭 핸들러
  const handleRecipeClick = () => {
    setSearch(data["레시피"]);
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSearch = async (type, foodName) => {
    const results = await getSeachList(type, foodName);
    navigate(`/search-result/${type}/${foodName}`, {
      state: { results, foodName },
    });

    // 최근 검색어 저장
    saveRecentSearch(foodName);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch(search, inputValue);
    }
  };

  const saveRecentSearch = (searchTerm) => {
    let recentSearches =
      JSON.parse(localStorage.getItem("recentSearches")) || [];

    recentSearches = recentSearches.filter((term) => term !== searchTerm);

    recentSearches.unshift(searchTerm);

    if (recentSearches.length > 12) {
      recentSearches.pop();
    }
    localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
  };

  return (
    <div className={styles.top}>
      <ResponsiveAppBar />
      <div className={styles.mainContainer}>
        <div className={styles.btnContainer}>
          <div className={styles.btnTitle}>
            원하는 검색 유형을 선택해주세요.
          </div>
          <div className={styles.btnBox}>
            <button className={styles.btn} onClick={handleRestaurantClick}>
              음식점
            </button>
            <button className={styles.btn} onClick={handleRecipeClick}>
              레시피
            </button>
          </div>
          <div className={styles.state}>현재 선택된 상태 : {search}</div>
        </div>
        <div className={styles.inputContainer}>
          <input
            className={styles.input}
            required
            type="text"
            placeholder="원하는 음식을 검색해주세요."
            value={inputValue}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <div
            onClick={() => handleSearch(search, inputValue)}
            className={styles.iconContainer}
          >
            <img src={searchIcon} alt="Search" className={styles.icon} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
