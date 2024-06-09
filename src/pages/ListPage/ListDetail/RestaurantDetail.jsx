import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Style
import styles from "./RestaurantDetail.module.css";

// Component
import ResponsiveAppBar from "../../../components/Nav/ResponsiveAppBar";
import MapComponent from "../../../components/Map/MapComponent";

// Api
import getRestaurantDetail from "../../../api/getRestaurantDetail";

const RestaurantDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState();

  const handleDetailInfo = async () => {
    const result = await getRestaurantDetail(id);
    setData(result);
  };

  useEffect(() => {
    handleDetailInfo();
  }, []);

  console.log(data);

  return (
    <div className={styles.top}>
      <ResponsiveAppBar />
      <div className={styles.mainContainer}>
        <div className={styles.info_container}>
          <div className={styles.info_name}>
            {data?.name.length > 10
              ? `${data?.name.substring(0, 10)}...`
              : data?.name}
          </div>
          <div className={styles.info_phone}>Phone : {data?.number}</div>
          <img className={styles.info_img} src={data?.image} />
        </div>
        <MapComponent address={data?.address} />
      </div>
    </div>
  );
};

export default RestaurantDetail;
