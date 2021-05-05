import { uppercaseFirtChar } from '@utils/typography';
import Image from 'next/image';
import React from 'react';
import { Breed } from 'types/breed';
import { Block, Text, useTheme, View } from 'vcc-ui';

type Props = {
  dog: Breed;
  hasNoSubBreed?: boolean;
  isSubBreed?: boolean;
};

const BreedsListItem = ({ dog, hasNoSubBreed, isSubBreed }: Props) => {
  const { baselineGrid } = useTheme();

  return (
    <View
      direction="row"
      wrap={['wrap', 'wrap', 'nowrap']}
      extend={{
        ':not(:last-of-type)': {
          marginBottom: `${baselineGrid * 2}px`
        }
      }}>
      <View marginRight={3} minWidth="160px">
        <Text variant="hillary" subStyle="emphasis" as="h2">
          {uppercaseFirtChar(dog.name)}
        </Text>
      </View>

      <View
        shrink={1}
        width={['100%', '100%', 'auto']}
        order={[1, 1, 0]}
        marginTop={[1, 1, 0]}
        maxWidth={['auto', 'auto', '500px']}>
        <Text>{dog.description}</Text>
      </View>

      {(hasNoSubBreed || isSubBreed) && (
        <Block
          extend={{
            position: 'relative',
            flexShrink: 0,
            width: '80px',
            height: '60px',
            marginLeft: 'auto',
            background: '#ddd'
          }}>
          <Image src={dog.imageUrl} layout="fill" objectFit="cover" />
        </Block>
      )}
    </View>
  );
};

export default BreedsListItem;
