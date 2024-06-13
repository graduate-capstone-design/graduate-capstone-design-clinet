import { Route, Routes } from 'react-router-dom';

// Pages
import RootPage from './RootPage';
import MainPage from './Mainpage';
import UserInfo from './User/UserInfo';
import Ranking from './Rank/Ranking';
import SearchHistory from './User/SearchHistory';

// List
import RestaurantList from './ListPage/RestaurantList';
import RecipeList from './ListPage/RecipeList';
import RestaurantDetail from './ListPage/ListDetail/RestaurantDetail';
import RecipeDetail from './ListPage/ListDetail/RecipeDetail';
import RestaurantListRoutedByHistory from './ListPage/RestaurantListRoutedByHistory';

const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<RootPage />} />
        <Route path="main" element={<MainPage />} />
        <Route path="userinfo" element={<UserInfo />} />
        <Route path="ranking" element={<Ranking />} />
        <Route path="search-history" element={<SearchHistory />} />
        <Route
          path="search-result/restaurants/:foodname"
          element={<RestaurantList />}
        />
        <Route
          path="search-result/restaurant-by-history/:foodname"
          element={<RestaurantListRoutedByHistory />}
        />
        <Route
          path="search-result/recipes/:foodname"
          element={<RecipeList />}
        />
        <Route
          path="search-detail/restaurants/:id"
          element={<RestaurantDetail />}
        />
        <Route path="recipe-detail/:id" element={<RecipeDetail />} />
      </Routes>
    </>
  );
};

export default Router;
