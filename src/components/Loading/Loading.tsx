import { Dimensions, View } from 'react-native';
import LoadingPulseAnimation from './AnimationPulse';
import React from 'react';

function Loading({ width }: { width: number }): React.ReactElement {
  return (
    <View
      style={{
        padding: 4,
        width: width,
        marginTop: 4,
        rowGap: 8,
      }}
    >
      <LoadingPulseAnimation width={'100%'} height={50} borderRadius={100} />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <LoadingPulseAnimation width={'30%'} height={75} borderRadius={100} />
        <LoadingPulseAnimation width={'68%'} height={75} borderRadius={100} />
      </View>
    </View>
  );
}

export default Loading;
