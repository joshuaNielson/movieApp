import React from 'react'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import StarRatings from 'react-star-ratings'
import './App.css'

export default function MovieGrid({ movies }) {
  const baseImageUrl = 'https://image.tmdb.org/t/p/w200'

  return movies ? (
    <div>
      <Grid container direction="row" justify="center" alignItems="flex-start">
        {movies.map(movie => (
          <Card key={movie.id} className="card-div">
            <CardMedia
              image={baseImageUrl + movie.poster_path}
              className="poster-image"
            />
            <CardContent className="card-overview">
              {movie.title.split(':').length > 0 ? (
                <>
                  <h3 className="movie-title">{movie.title.split(':')[0]}</h3>
                  <h5 className="movie-subtitle">
                    {movie.title.split(':')[1]}
                  </h5>
                </>
              ) : (
                <h3>{movie.title}</h3>
              )}
              {movie.overview}
            </CardContent>
            <CardContent className="card-footer">
              <div className="rating-stars">
                <StarRatings
                  rating={Number(movie.vote_average) / 2}
                  starRatedColor="black"
                  starEmptyColor="grey"
                  numberOfStars={5}
                  starDimension="20px"
                  starSpacing="0px"
                  name="rating"
                />
              </div>
              <div className="rating-number">
                {Math.round((Number(movie.vote_average) / 2) * 10) / 10}
              </div>
            </CardContent>
          </Card>
        ))}
      </Grid>
    </div>
  ) : null
}
