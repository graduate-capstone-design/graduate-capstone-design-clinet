import React from "react";

// Style
import styles from "./RestaurantDetail.module.css";

// Component
import ResponsiveAppBar from "../../../components/Nav/ResponsiveAppBar";

const RestaurantDetail = () => {
  return (
    <div className={styles.top}>
      <ResponsiveAppBar />
      <div className={styles.mainContainer}></div>
    </div>
  );
};

export default RestaurantDetail;
