import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ResponsiveAppBar from '../components/Nav/ResponsiveAppBar';
import styles from './style/Recipepage.module.css';

const Recipepage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { query } = useParams();
  const resultsPerPage = 10;
  const [numResults, setNumResults] = useState(30); // 임의의 총 결과 수 설정
  const navigate = useNavigate();

  useEffect(() => {
    // 백엔드 API 호출 및 데이터 받아오기 (임의로 주석 처리)
    // const fetchData = async () => {
    //   try {
    //     const response = await fetch('백엔드 API 주소');
    //     const data = await response.json();
    //     setSearchResults(data.results);
    //     setNumResults(data.totalResults);
    //   } catch (error) {
    //     console.error('Error fetching data:', error);
    //   }
    // };

    // fetchData(); // 임의의 데이터를 사용하므로 주석 처리
    // 임의의 데이터 정의
    const tempResults = Array.from({ length: numResults }, (_, index) => ({
      id: index + 1,
      name: `Recipe ${index + 1}`,
      image: `https://via.placeholder.com/150?text=Recipe${index + 1}`,
    }));
    setSearchResults(tempResults);
  }, [query, numResults]);

  const startIndex = (currentPage - 1) * resultsPerPage;
  const endIndex = Math.min(startIndex + resultsPerPage, numResults);

  // 결과를 클릭할 때의 동작 설정
  const handleClick = (id) => {
    console.log(`You clicked on result ${id + 1}`);
    // 클릭한 결과의 상세 정보 페이지로 이동
    navigate(`/recipein/${id}`);
  };

  return (
    <div className={styles.top}>
      <ResponsiveAppBar />
      <div className={styles.mainContainer}>
        <div className={styles.searchContainer}>
          <h1 className={styles.searchCategory}>{query}</h1>
          <div className={styles.buttonGroup}>
            <button className={styles.backBtn} onClick={() => navigate(-1)}>
              뒤로가기
            </button>
          </div>
          <ul className={styles.resultsContainer}>
            {searchResults.slice(startIndex, endIndex).map((result, index) => (
              <li
                key={index}
                className={styles.result}
                onClick={() => handleClick(index)}
              >
                <span className={styles.resultNumber}>
                  {startIndex + index + 1}
                </span>
                <div className={styles.resultInfo}>
                  <img
                    className={styles.resultImage}
                    src={result.image}
                    alt={result.name}
                  />
                  <hr className={styles.divider} />
                  <h4 className={styles.recipeName}>{result.name}</h4>
                </div>
              </li>
            ))}
          </ul>
          <div className={styles.pagination}>
            {Array.from(
              { length: Math.ceil(numResults / resultsPerPage) },
              (_, i) => (
                <button key={i + 1} onClick={() => setCurrentPage(i + 1)}>
                  {i + 1}
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recipepage;
