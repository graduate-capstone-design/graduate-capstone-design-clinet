import ResponsiveAppBar from "../components/Nav/ResponsiveAppBar";
import styles from "./style/Mainpage.module.css";

const MainPage = () => {
  return (
    <div className={styles.top}>
      <ResponsiveAppBar />
    </div>
  );
};

export default MainPage;
