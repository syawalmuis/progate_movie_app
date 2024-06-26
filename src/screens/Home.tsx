import React, { useState } from 'react';
import { ScrollView, View, StatusBar, StyleSheet } from 'react-native';
import type { MovieGenre as Genre, MovieListProps } from '../types/app';
import MovieList from '../components/movies/MovieList';
import MovieGenre from '../components/movies/MovieGenre';

const movieLists: MovieListProps[] = [
  {
    title: 'Now Playing in Theater',
    path: '/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_release_type=2|3&release_date.gte={min_date}&release_date.lte={max_date}',
    coverType: 'backdrop',
  },
  {
    title: 'Upcoming Movies',
    path: 'discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_release_type=2|3&release_date.gte={min_date}&release_date.lte={max_date}',
    coverType: 'poster',
  },
  {
    title: 'Top Rated Movies',
    path: 'discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=vote_average.desc&&vote_count.gte=200',
    coverType: 'poster',
  },
  {
    title: 'Popular Movies',
    path: 'discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc',
    coverType: 'poster',
  },
];

const Home = (): JSX.Element => {
  const [currentGenre, setCurrentGenre] = useState<Genre | null>(null);

  return (
    <View>
      <MovieGenre {...{ currentGenre, setCurrentGenre }} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {movieLists.map((movieList) => (
            <MovieList
              title={movieList.title}
              path={
                currentGenre
                  ? movieList.path + `&with_genres=${currentGenre.id}`
                  : movieList.path
              }
              coverType={movieList.coverType}
              key={movieList.title}
              {...{ currentGenre }}
            />
          ))}
          <StatusBar translucent={false} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 70,
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: 16,
  },
});

export default Home;
