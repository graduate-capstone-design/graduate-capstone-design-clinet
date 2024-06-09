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
  const [address, setAddress] = useState("");

  const handleDetailInfo = async () => {
    const result = await getRestaurantDetail(id);
    setAddress(result.address);
  };

  useEffect(() => {
    handleDetailInfo();
  }, []);

  return (
    <div className={styles.top}>
      <ResponsiveAppBar />
      <div className={styles.mainContainer}>
        <div className={styles.info_container}>
          <div className={styles.info_name}>세상에서 제일 맛있는 돈까스</div>
          <div className={styles.info_detail}>
            세상에서 제일 맛있는 돈까스세상에서 제일 맛있는 돈까스세상에서 제일
            맛있는 돈까스세상에서 제일 맛있는 돈까스세상에서 제일 맛있는
            돈까스세상에서 제일 맛있는 돈까스세상에서 제일 맛있는 돈까스세상에서
            제일 맛있는 돈까스세상에서 제일 맛있는 돈까스
          </div>
        </div>
        <MapComponent address={address} />
      </div>
    </div>
  );
};

export default RestaurantDetail;
