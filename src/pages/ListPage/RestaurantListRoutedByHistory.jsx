import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";

// Style
import styles from "./style/RestaurantList.module.css";

// Component
import ResponsiveAppBar from "../../components/Nav/ResponsiveAppBar";

const RestaurantListRoutedByHistory = () => {
  const location = useLocation();
  const { food, response } = location.state || {};

  console.log(food, response);
  return (
    <div className={styles.top}>
      <ResponsiveAppBar />
      <div className={styles.mainContainer}>
        <div className={styles.searchResult}>{food}</div>
        <ul className={styles.ul}>
          {response?.map((data, index) => (
            <Link
              to={`/search-detail/restaurants/${data.id}`}
              className={styles.styled_link}
              key={data.id}
            >
              <li className={styles.li}>
                <div className={styles.li_index}>{index + 1}.</div>
                <div className={styles.li_name}>
                  {data.name.length > 7
                    ? `${data.name.substring(0, 8)}...`
                    : data.name}
                </div>
                <div className={styles.li_detail}>
                  맛있는 음식점입니다.
                  {data.image !== null && (
                    <img className={styles.image} src={data.image} alt="" />
                  )}
                </div>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RestaurantListRoutedByHistory;
