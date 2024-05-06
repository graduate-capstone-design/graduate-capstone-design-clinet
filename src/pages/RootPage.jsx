import React from "react";
import styles from "./style/Rootpage.module.css";
import { useNavigate } from "react-router-dom";

const RootPage = () => {
  const navigate = useNavigate();

  const navigateToMain = () => {
    navigate("main");
  };
  return (
    <div className={styles.top}>
      <div className={styles.logo}>뭐먹지?</div>
      <div className={styles.btnContainer}>
        <button className={styles.btn}>카카오 계정으로 시작하기</button>
        <button onClick={navigateToMain} className={styles.btn}>
          둘러보기
        </button>
      </div>
    </div>
  );
};

export default RootPage;
