import { Route, Routes } from "react-router-dom";

import RootPage from "./RootPage";

// Main
import MainPage from "./Mainpage";

// User
import UserInfo from "./User/UserInfo";
import Ranking from "./Rank/Ranking";
import SearchHistory from "./User/SearchHistory";

// List
import RestaurantList from "./ListPage/RestaurantList";

// List
import RecipeList from "./ListPage/RecipeList";
import RestaurantDetail from "./ListPage/ListDetail/RestaurantDetail";

const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<RootPage />} />
        <Route path="main" element={<MainPage />} />
        <Route path="userinfo" element={<UserInfo />} />
        <Route path="ranking" element={<Ranking />} />
        <Route path="search-history" element={<SearchHistory />} />
        <Route path="search-result/restaurant" element={<RestaurantList />} />
        <Route path="search-result/recipe" element={<RecipeList />} />
        <Route
          path="search-detail/:restaurant_name"
          element={<RestaurantDetail />}
        />
      </Routes>
    </>
  );
};

export default Router;
