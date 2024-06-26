import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';
import { MovieGenre as Genre } from '../../types/app';
import { API_URL } from '@env';
import { options } from '../../helpers/options';

function MovieGenre({
  currentGenre,
  setCurrentGenre,
}: {
  currentGenre: Genre | null;
  setCurrentGenre: (genre: Genre | null) => void;
}): React.ReactElement {
  const [genres, setGenres] = useState<Genre[]>([]);

  const getGenres = async () => {
    const url = `${API_URL}/genre/movie/list?language=en-US`;
    try {
      const response = await fetch(url, options());
      const data = await response.json();
      setGenres(data.genres);
      console.log(data.genres.length);
    } catch {
      console.log('Error');
    }
  };
  useEffect(() => {
    getGenres();
  }, []);
  return (
    <ScrollView
      horizontal
      contentContainerStyle={[
        styles.container,
        {
          backgroundColor: 'rgb(128,128,128)',
        },
      ]}
      showsHorizontalScrollIndicator={false}
    >
      <Pressable
        style={[
          styles.genre,
          {
            backgroundColor: !currentGenre
              ? 'rgb(245, 245, 245)'
              : 'rgb(100, 100, 100)',
          },
        ]}
        onPress={() => setCurrentGenre(null)}
      >
        <Text
          style={{
            color: currentGenre ? 'white' : 'black',
          }}
        >
          {'All'}
        </Text>
      </Pressable>
      {genres.slice(0, 7).map((genre) => (
        <Pressable
          key={genre.id}
          style={[
            styles.genre,
            {
              backgroundColor:
                genre.id === currentGenre?.id
                  ? 'rgb(245, 245, 245)'
                  : 'rgb(100, 100, 100)',
            },
          ]}
          onPress={() => setCurrentGenre(genre)}
        >
          <Text
            style={{
              color: genre.id !== currentGenre?.id ? 'white' : 'black',
            }}
          >
            {genre.name}
          </Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}
// gray smoke rg

const styles = StyleSheet.create({
  genre: {
    borderRadius: 200,
    padding: 0,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    height: 30,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    paddingHorizontal: 10,
    gap: 4,
    backgroundColor: 'white',
  },
});

export default MovieGenre;
