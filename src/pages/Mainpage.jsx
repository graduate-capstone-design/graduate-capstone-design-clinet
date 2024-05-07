import { useState } from "react";

// style
import styles from "./style/Mainpage.module.css";

// Components
import ResponsiveAppBar from "../components/Nav/ResponsiveAppBar";

// Svg
import searchIcon from "../asset/svg/search.svg";

const data = { 음식점: "restaurant", 레시피: "recipe" };

const MainPage = () => {
  const [search, setSearch] = useState("");
  const [inputValue, setInputValue] = useState("");

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

  console.log(inputValue);

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
        </div>
        <div className={styles.inputContainer}>
          <input
            className={styles.input}
            required
            type="text"
            placeholder="원하는 음식을 검색해주세요."
            value={inputValue}
            onChange={handleChange}
          />
          <div className={styles.iconContainer}>
            <img src={searchIcon} alt="Search" className={styles.icon} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
