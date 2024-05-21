import { Route, Routes } from 'react-router-dom';
import MainPage from './Mainpage';
import UserInfo from './UserInfo';
import Ranking from './Ranking';
import SearchHistory from './SearchHistory';
import RootPage from './RootPage';
import RecipePage from './Recipepage';
import RecipeIn from './RecipeIn';

const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<RootPage />} />
        <Route path="main" element={<MainPage />} />
        <Route path="userinfo" element={<UserInfo />} />
        <Route path="ranking" element={<Ranking />} />
        <Route path="search-history" element={<SearchHistory />} />
        <Route path="recipe/:query" element={<RecipePage />} />
        <Route path="recipein/:id" element={<RecipeIn />} />
      </Routes>
    </>
  );
};

export default Router;
