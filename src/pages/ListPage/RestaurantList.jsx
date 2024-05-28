import React from "react";
import { useLocation } from "react-router-dom";

// Style
import styles from "./style/RestaurantList.module.css";

// Component
import ResponsiveAppBar from "../../components/Nav/ResponsiveAppBar";

const RestaurantList = () => {
  const location = useLocation();
  const { results, foodName } = location.state;

  console.log(results);
  return (
    <div className={styles.top}>
      <ResponsiveAppBar />
      <div className={styles.mainContainer}>
        <div className={styles.searchResult}>{foodName}</div>
        <ul className={styles.ul}>
          {results?.map((data, index) => (
            <li key={data.id} className={styles.li}>
              <div className={styles.li_index}>{index + 1}.</div>
              <div className={styles.li_name}>
                {data.name.length > 7
                  ? `${data.name.substring(0, 8)}...`
                  : data.name}
              </div>
              <div className={styles.li_detail}>
                {data.info}
                {data.image !== null && (
                  <img className={styles.image} src={data.image} alt="" />
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RestaurantList;
