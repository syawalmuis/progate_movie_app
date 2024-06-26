// import { View, Text, Button } from 'react-native';
import { API_URL, API_ACCESS_TOKEN } from '@env'; // Ditambahkan
import {
  StackActions,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  Dimensions,
  BackHandler,
} from 'react-native';
import { getOptions } from '../helpers/options';
import ParallaxScrollView from '../components/ParallaxScrollView';
import { Movie } from '../types/app';
import { FontAwesome } from '@expo/vector-icons';
import MovieItem from '../components/movies/MovieItem';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MovieDetail = () => {
  const route = useRoute<{
    key: string;
    name: string;
    params: { id: string };
  }>();

  const [movie, setMovie] = useState<Movie>();
  const [recommendations, setRecommendations] = useState<Movie[]>();
  const [isFavorite, setIsFavorite] = useState(false);
  const { width: screenWidth } = Dimensions.get('window');
  const navigtaion = useNavigation();
  const popToTop = StackActions.popToTop();

  const fetchData = (): void => {
    if (API_URL == null || API_ACCESS_TOKEN.length == null) {
      throw new Error('ENV not found');
    }
    const url = `${API_URL}/movie/${route?.params?.id}`;

    fetch(url, getOptions())
      .then((response) => response.json())
      .then((response) => {
        setMovie(response);
        getFavorite(response.id);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const fetchRecommendations = (): void => {
    if (API_URL == null || API_ACCESS_TOKEN.length == null) {
      throw new Error('ENV not found');
    }
    const url = `${API_URL}/movie/${route?.params?.id}/recommendations`;

    fetch(url, getOptions())
      .then((response) => response.json())
      .then((response) => {
        setRecommendations(response.results);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const addFavorite = async (movie: Movie): Promise<void> => {
    try {
      const initialData: string | null =
        await AsyncStorage.getItem('@FavoriteList');

      let favMovieList: Movie[] = [];

      if (initialData !== null) {
        favMovieList = [...JSON.parse(initialData), movie];
      } else {
        favMovieList = [movie];
      }

      await AsyncStorage.setItem('@FavoriteList', JSON.stringify(favMovieList));
      setIsFavorite(true);
    } catch (error) {
      console.log(error);
    }
  };

  const removeFavorite = async (id: number): Promise<void> => {
    try {
      const initialData: string | null =
        await AsyncStorage.getItem('@FavoriteList');
      console.log(initialData);
      // Tulis code untuk menghapus film dari storage
      let favMovieList: Movie[] = [];
      if (initialData !== null) {
        favMovieList = JSON.parse(initialData).filter(
          (movie: Movie) => movie.id !== id,
        );
      }
      await AsyncStorage.setItem('@FavoriteList', JSON.stringify(favMovieList));
      setIsFavorite(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getFavorite = async (id: number): Promise<void> => {
    try {
      const initialData: string | null =
        await AsyncStorage.getItem('@FavoriteList');
      let favMovieList: Movie[] = [];
      if (initialData !== null) {
        favMovieList = JSON.parse(initialData);
      }
      if (favMovieList.some((favMovie) => Number(favMovie.id) === id)) {
        setIsFavorite(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchRecommendations();

    BackHandler.addEventListener('hardwareBackPress', () => {
      navigtaion.dispatch(popToTop);
      return true;
    });
  }, []);
  return (
    movie && (
      <>
        <ParallaxScrollView
          headerImage={
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w500${movie?.backdrop_path}`,
              }}
              style={{ width: '100%', height: 300 }}
            />
          }
        >
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{movie?.title}</Text>
            <Pressable
              onPress={() => {
                if (isFavorite) {
                  removeFavorite(movie.id);
                } else {
                  addFavorite(movie);
                }
              }}
            >
              <FontAwesome
                name={isFavorite ? 'heart' : 'heart-o'}
                size={28}
                color={isFavorite ? '#fc0f0c' : 'black'}
              />
            </Pressable>
          </View>
          <View style={styles.subtitleContainer}>
            <View style={styles.ratingContainer}>
              <FontAwesome name="star" size={16} color="rgb(128,128,128)" />
              <Text style={styles.rating}>
                {parseFloat(String(movie?.vote_average)).toFixed(1)}
              </Text>
            </View>
            <Text>
              {String(new Date(String(movie?.release_date)).getFullYear())}
            </Text>
            <Text>{movie?.runtime} minutes</Text>
          </View>
          <View style={styles.genreContainer}>
            {movie?.genres.map((genre) => (
              <Text style={styles.subtitle} key={genre.id}>
                {genre?.name}
              </Text>
            ))}
          </View>
          <View>
            <Text style={[styles.overview]}>{movie?.overview}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              gap: 14,
              marginTop: 16,
              flexWrap: 'wrap',
            }}
          >
            <View style={styles.overviewItem}>
              <Text style={styles.overviewItemTitle}>Language</Text>
              <Text style={styles.blackSmoke}>{movie?.original_language}</Text>
            </View>
            <View style={styles.overviewItem}>
              <Text style={styles.overviewItemTitle}>Popularity</Text>
              <Text style={styles.blackSmoke}>{movie?.popularity}</Text>
            </View>
            <View style={styles.overviewItem}>
              <Text style={styles.overviewItemTitle}>Production</Text>
              <Text style={styles.blackSmoke}>
                {movie?.production_companies[0]?.name}
              </Text>
            </View>
            <View style={styles.overviewItem}>
              <Text style={styles.overviewItemTitle}>Tagline</Text>
              <Text style={styles.blackSmoke}>{movie?.tagline} sdsdv vsdv</Text>
            </View>

            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <View style={styles.header}>
                <Text style={styles.titleRecomendation}>
                  {'Recommendations'}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  marginTop: 16,
                  gap: 4,
                  flexWrap: 'wrap',
                }}
              >
                {recommendations &&
                  recommendations.map((recommendation) => (
                    <MovieItem
                      movie={recommendation}
                      size={{
                        width: Math.floor(screenWidth / 3.4),
                        height: 160,
                      }}
                      coverType="backdrop"
                      key={recommendation.id}
                    />
                  ))}
              </View>
            </View>
          </View>
        </ParallaxScrollView>
      </>
    )
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1.3,
    width: '60%',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  rating: {
    color: 'rgb(128,128,128)',
    fontWeight: '700',
  },
  subtitleContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    alignItems: 'center',
    gap: 8,
  },
  genreContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  subtitle: {
    color: 'rgb(128,128,128)',
  },
  overview: {
    marginTop: 16,
    color: 'rgb(50,50,50)',
    lineHeight: 18,
    letterSpacing: 0.9,
    textAlign: 'justify',
  },
  overviewItem: {
    width: '47%',
  },
  overviewItemTitle: {
    color: 'rgb(128,128,128)',
    fontWeight: 'bold',
  },
  blackSmoke: {
    color: 'rgb(120,120,120)',
  },
  header: {
    marginLeft: 6,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 16,
    width: '100%',
  },
  titleRecomendation: {
    fontSize: 20,
    fontWeight: '900',
  },
});

export default MovieDetail;
