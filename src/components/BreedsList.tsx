import { BreedsListItem } from '@components';
import { borderBottom } from '@styles/styleRules';
import React from 'react';
import { Breed } from 'types/breed';
import { Block, Button, Text, useTheme, View } from 'vcc-ui';

type Props = {
  breeds: Breed[];
  hasMorePosts: boolean;
  onLoadMore: () => void;
};

const BreedsList = ({ breeds, hasMorePosts, onLoadMore }: Props) => {
  const { color, baselineGrid } = useTheme();

  return (
    <>
      {breeds.map((dog, i) => (
        <View
          key={dog.name}
          marginBottom={i < breeds.length - 1 ? 4 : 0}
          paddingTop={2}
          paddingBottom={2}
          paddingLeft={2}
          paddingRight={2}
          backgroundColor={color.background.secondary}>
          <BreedsListItem breed={dog} hasNoSubBreed={dog.subBreeds && dog.subBreeds.length < 1} />

          {dog.subBreeds && dog.subBreeds.length > 0 && (
            <>
              <Text
                extend={{
                  ...borderBottom,
                  marginBottom: `${baselineGrid * 3}px`,
                  paddingBottom: baselineGrid / 2
                }}>
                Subbreeds
              </Text>

              {dog.subBreeds.map((subBreed) => {
                return <BreedsListItem key={subBreed.name} breed={subBreed} isSubBreed={true} />;
              })}
            </>
          )}
        </View>
      ))}

      <View justifyContent="center" alignItems="center" extend={{ marginTop: '40px' }}>
        {hasMorePosts ? (
          <Block>
            <Button variant="outline" onClick={onLoadMore}>
              Show more
            </Button>
          </Block>
        ) : (
          <Text extend={{ fontStyle: 'italic', textAlign: 'center' }}>No more to show</Text>
        )}
      </View>
    </>
  );
};

export default BreedsList;
