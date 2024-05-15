import React from "react";

// Style
import styles from "./style/RestaurantList.module.css";

// Component
import ResponsiveAppBar from "../../components/Nav/ResponsiveAppBar";

// Data
import mockData from "../../asset/data/mockData";

const RestaurantList = () => {
  return (
    <div className={styles.top}>
      <ResponsiveAppBar />
      <div className={styles.mainContainer}>
        <div className={styles.searchResult}>치킨</div>
        <ul className={styles.ul}>
          {mockData.map((data, index) => (
            <li className={styles.li}>
              <div className={styles.li_index}>{index + 1}.</div>
              <div className={styles.li_name}>{data.name}</div>
              <div className={styles.li_detail}>디테일 정보 보여줄 부분</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RestaurantList;
