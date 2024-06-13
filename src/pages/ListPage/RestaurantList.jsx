import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

// Style
import styles from './style/RestaurantList.module.css';

// Component
import ResponsiveAppBar from '../../components/Nav/ResponsiveAppBar';

const RestaurantList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { results, foodName } = location.state;

  console.log(results);
  return (
    <div className={styles.top}>
      <ResponsiveAppBar />
      <div className={styles.mainContainer}>
        <div className={styles.searchResult}>{foodName}</div>
        <div className={styles.buttonGroup}>
          <button className={styles.backBtn} onClick={() => navigate(-1)}>
            뒤로가기
          </button>
        </div>
        <ul className={styles.ul}>
          {results?.map((data, index) => (
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

export default RestaurantList;
