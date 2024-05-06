import { Route, Routes } from "react-router-dom";
import MainPage from "./Mainpage";
import UserInfo from "./UserInfo";
import Ranking from "./Ranking";
import SearchHistory from "./SearchHistory";
import RootPage from "./RootPage";

const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<RootPage />} />
        <Route path="main" element={<MainPage />} />
        <Route path="userinfo" element={<UserInfo />} />
        <Route path="ranking" element={<Ranking />} />
        <Route path="search-history" element={<SearchHistory />} />
      </Routes>
    </>
  );
};

export default Router;
