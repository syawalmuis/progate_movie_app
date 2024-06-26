// import { View, Text, Button } from 'react-native';
import { API_URL, API_ACCESS_TOKEN } from '@env'; // Ditambahkan
import React from 'react';
import { Button, Text, View } from 'react-native';

const MovieDetail = (): React.ReactElement => {
  const fetchData = (): void => {
    if (API_URL == null || API_ACCESS_TOKEN.length == null) {
      throw new Error('ENV not found');
    }
    console.log({ API_URL, API_ACCESS_TOKEN });

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_ACCESS_TOKEN}`,
      },
    };

    fetch(API_URL, options)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <View>
      <Text>Movie Detail</Text>
    </View>
  );
};

export default MovieDetail;
