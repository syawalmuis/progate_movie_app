import { Dimensions, View } from 'react-native';
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Movie } from '../types/app';
import { useFocusEffect } from '@react-navigation/native';
import { FlatList } from 'react-native';
import MovieItem from '../components/movies/MovieItem';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

function Favorite() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const tabBarHeight = useBottomTabBarHeight();

  const { width: screenWidth } = Dimensions.get('window');

  const getFavoriteMovies = async (): Promise<void> => {
    const favoriteMovies = await AsyncStorage.getItem('@FavoriteList');
    if (favoriteMovies) setMovies(JSON.parse(favoriteMovies));
  };
  useFocusEffect(() => {
    getFavoriteMovies();
  });

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <FlatList
        data={movies}
        numColumns={3}
        columnWrapperStyle={{
          gap: 5,
        }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          justifyContent: 'space-between',
          rowGap: 10,
          columnGap: 10,
          paddingTop: 10,
          paddingBottom: 5,
        }}
        renderItem={({ item }) => (
          <MovieItem
            key={item.id}
            movie={item}
            coverType="backdrop"
            size={{
              width: Math.floor(screenWidth / 3.4),
              height: 160,
            }}
          />
        )}
        keyExtractor={(_, id) => id.toString()}
      />
    </View>
  );
}

export default Favorite;
