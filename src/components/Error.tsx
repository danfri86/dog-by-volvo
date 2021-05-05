import { container } from '@styles/styleRules';
import Image from 'next/image';
import React from 'react';
import { Block, Spacer, Text, View } from 'vcc-ui';

type Props = {
  errorMessage: string;
};

const Error = ({ errorMessage }: Props) => {
  return (
    <View
      alignItems="center"
      minHeight="100%"
      extend={{
        ...container,
        position: 'relative',
        textAlign: 'center'
      }}>
      <Block extend={{ maxWidth: '200px' }}>
        <Image src="/paw.svg" layout="intrinsic" width={425} height={399} />
      </Block>

      <Spacer size={{ default: 4 }} />

      <Text variant="hillary">The dog patrol is stuck</Text>

      <Spacer />

      <Text>{errorMessage}</Text>
    </View>
  );
};

export default Error;
