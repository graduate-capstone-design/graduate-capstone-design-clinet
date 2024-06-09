const fetchYouTubeVideos = async (recipeName, setVideoIds, setErrorMessage) => {
  const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
  const query = `${recipeName} 레시피`;
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=4&q=${encodeURIComponent(
    query
  )}&key=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.items && data.items.length > 0) {
      const ids = data.items.map((item) => item.id.videoId);
      setVideoIds(ids);
    }
  } catch (err) {
    console.log('Err >>', err);
  }
};

export default fetchYouTubeVideos;
