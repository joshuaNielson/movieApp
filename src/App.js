import React from 'react'
import MovieHeader from './MovieHeader.js'
import MovieGrid from './MovieGrid'

const apiKey = 'api key here'

const movieAPI = pageNum =>
  `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=${pageNum}`

async function getMovieData(pageNum) {
  console.log('PAGE: ', pageNum)
  let response = await fetch(movieAPI(pageNum))
  let json = await response.json()
  return json.results.filter(
    movie => !movie.adult && !getBlacklistFromUser().includes(movie.id)
  )
}

function getBlacklistFromUser() {
  return [475557, 474350, 540901]
}

export default function MovieApp() {
  const [movies, setMovies] = React.useState()
  const [pages, setPages] = React.useState(1)

  function showMoreResults() {
    setPages(pages + 1)
    console.log(pages)
  }

  React.useEffect(() => {
    getBlacklistFromUser()
    getMovieData(pages).then(movies => {
      setMovies(movies.concat(movies))
    })
  }, [pages])

  return (
    <>
      <MovieHeader />
      {movies && <MovieGrid movies={movies} />}
      <div className="show-more">
        <button onClick={showMoreResults}>show more</button>
      </div>
    </>
  )
}
