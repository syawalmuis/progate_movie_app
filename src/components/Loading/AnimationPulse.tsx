import React, { useRef, useEffect } from 'react';
import { View, Animated, Easing, StyleSheet } from 'react-native';

const LoadingPulseAnimation = ({
  height,
  borderRadius,
  width,
}: {
  height: number | string;
  width: number | string;
  borderRadius?: number;
}) => {
  const opacityAnim = useRef(new Animated.Value(1)).current;

  const pulse = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacityAnim, {
          toValue: 0.5,
          duration: 1000,
          easing: Easing.bezier(0.4, 0, 0.6, 1), // cubic-bezier(0.4, 0, 0.6, 1)
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.bezier(0.4, 0, 0.6, 1), // cubic-bezier(0.4, 0, 0.6, 1)
          useNativeDriver: true,
        }),
      ]),
      { iterations: -1 },
    ).start();
  };

  useEffect(() => {
    pulse();
  }, []);

  return (
    <Animated.View
      style={[
        {
          backgroundColor: 'rgb(226 232 240)',
          height,
          width,
        },
        { opacity: opacityAnim },
      ]}
    />
  );
};

export default LoadingPulseAnimation;
