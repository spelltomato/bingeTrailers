import { React, useState, useEffect, createContext } from "react";
import "./heroSection.css";
import moviePoster from "../assets/moviePoster.jpg";

const TrailersContext = createContext();

function HeroSection() {
  const [trailers, setTrailers] = useState([]);
  const [trailerUrls, setTrailerUrls] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchTrailers = async () => {
    // console.log("Your search query is:", searchQuery);
    if (!searchQuery.trim()) return;

    try {
      const url = `https://api.themoviedb.org/3/search/movie?api_key=${
        import.meta.env.VITE_TRAILER_VIDEO_API_KEY
      }&query=${encodeURIComponent(searchQuery)}`;
      // const url = `http://www.omdbapi.com/?s=${searchQuery}&apikey=${
      //   import.meta.env.VITE_TRAILER_API_KEY
      // }`;

      const response = await fetch(url);
      const trailersData = await response.json();
      // console.log(`the movie id is: ${trailersData.results[0].id}`);
      // setTrailers(trailersData.Search[0]);
      // setSearchQuery("");

      if (!trailersData.results || trailersData.results.length === 0) {
        console.log("No movies found.");
        return;
      }

      let movieId = trailersData.results[0].id;

      let trailerUrl = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${
        import.meta.env.VITE_TRAILER_VIDEO_API_KEY
      }`;
      let trailerResponse = await fetch(trailerUrl);
      let trailerData = await trailerResponse.json();
      // console.log(trailerData);
      setTrailers(trailerData.results);

      let allTrailers = trailerData.results
        .filter((video) => video.site === "YouTube")
        .slice(0, 1)
        .map((video) => `https://www.youtube.com/embed/${video.key}`);

      if (allTrailers.length > 0) {
        setTrailerUrls(allTrailers);
      } else {
        console.log("No trailers found.");
      }
    } catch (err) {
      console.log("Error:", err);
    }
  };
  console.log(trailers?.results);

  // fetchTrailers(searchQuery).then(console.log);
  async function loadTrailers() {
    try {
      const data = await fetchTrailers(searchQuery);
      // console.log(data);
    } catch (error) {
      console.error("Error fetching trailers:", error);
    }
  }

  // loadTrailers();

  return (
    <div>
      <div className="row">
        <div className="hero__container">
          <h1 className="hero__title text__purple">
            Georgetown's most awarded platform to watch trailers.
          </h1>
          <h3 className="hero__sub-title">
            Find your favorite trailer with{" "}
            <span className="text__purple hero__sub-title">Binge Trailers</span>
          </h3>
          <div className="search__container">
            <input
              type="text"
              className="search__field"
              placeholder="Search by Title "
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="search__icon--wrapper" onClick={fetchTrailers}>
              {" "}
              <i className="fas fa-search search__icon"></i>
            </button>
          </div>
        </div>
      </div>
      {/* display movies */}
      <div className="row">
        <div className="list__of--trailer">
          {trailerUrls.length > 0 ? (
            trailerUrls.map((url, index) => (
              <div key={index} style={{ marginTop: "20px" }}>
                <h3>Trailer {index + 1}:</h3>
                <iframe
                  width="560"
                  height="315"
                  src={url}
                  title={`Movie Trailer ${index + 1}`}
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              </div>
            ))
          ) : (
            <p>No trailers available.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
