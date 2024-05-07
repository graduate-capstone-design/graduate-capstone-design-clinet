import { useState } from "react";
import ResponsiveAppBar from "../components/Nav/ResponsiveAppBar";
import styles from "./style/Mainpage.module.css";

const MainPage = () => {
  const data = { 음식점: "restaurant", 레시피: "recipe" };
  const [search, setSearch] = useState("");

  // 음식점 버튼 클릭 핸들러
  const handleRestaurantClick = () => {
    setSearch(data["음식점"]);
  };

  // 레시피 버튼 클릭 핸들러
  const handleRecipeClick = () => {
    setSearch(data["레시피"]);
  };

  console.log(search);

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
      </div>
    </div>
  );
};

export default MainPage;
