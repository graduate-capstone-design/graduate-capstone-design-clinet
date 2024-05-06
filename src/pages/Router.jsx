import { Route, Routes } from "react-router-dom";
import MainPage from "./Mainpage";
import UserInfo from "./UserInfo";
import Ranking from "./Ranking";
import SearchHistory from "./SearchHistory";

const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="userinfo" element={<UserInfo />} />
        <Route path="ranking" element={<Ranking />} />
        <Route path="search-history" element={<SearchHistory />} />
      </Routes>
    </>
  );
};

export default Router;
