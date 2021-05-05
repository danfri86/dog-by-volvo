import { BreedListControl, BreedsList, Error } from '@components';
import { useBreeds } from '@hooks';
import { container } from '@styles/styleRules';
import { pageSize } from '@utils/constants';
import { sortListByKey } from '@utils/sorting';
import { GetStaticProps } from 'next';
import { ChangeEvent, useEffect, useState } from 'react';
import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { fetchBreeds } from 'src/api';
import { Breed } from 'types/breed';
import { SortDirection } from 'types/sort';
import { Block, Flex, Text, View } from 'vcc-ui';

const Home = () => {
  const sortBy: keyof Breed = 'name';
  const [page, setPage] = useState(0);
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const { data: breeds, isLoading, error } = useBreeds();
  const [filteredBreeds, setFilteredBreeds] = useState(
    breeds?.slice(0, (page + 1) * pageSize) || []
  );

  useEffect(() => {
    const sortedBreeds = sortListByKey(breeds || [], sortDirection, sortBy)
      .slice(0, (page + 1) * pageSize)
      .map((dog) => {
        if (!dog.subBreeds || dog.subBreeds.length < 1) return dog;

        const sortedSubBreed = sortListByKey(dog.subBreeds, sortDirection, sortBy);

        return { ...dog, subBreeds: sortedSubBreed };
      });
    setFilteredBreeds(sortedBreeds);
  }, [sortDirection, page]);

  const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSortDirection(e.target.value as SortDirection);
  };

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  const hasMorePosts = (page + 1) * pageSize < (breeds?.length || 0);
  const breedsCount = breeds?.length || 0;
  const subBreedsCount =
    breeds?.reduce((acc: number, item) => {
      if (!item.subBreeds || item.subBreeds.length < 1) return acc;
      return (acc += item.subBreeds.length);
    }, 0) || 0;

  return (
    <>
      {isLoading && !error && (
        <View
          alignItems="center"
          minHeight="100%"
          extend={{
            ...container,
            position: 'relative',
            textAlign: 'center'
          }}>
          <Text>Hundpatrullen rycker ut...</Text>
        </View>
      )}

      {error && <Error errorMessage={error.message} />}

      {breeds && (
        <>
          <View
            extend={{ ...container }}
            direction="row"
            justifyContent="space-between"
            marginBottom={2}>
            <Flex extend={{ whiteSpace: 'nowrap' }}>
              <Text variant="bates" foreground="#888">
                Hittade {breedsCount} raser
              </Text>
              <Text variant="bates" foreground="#888">
                och {subBreedsCount} underraser
              </Text>
            </Flex>

            <Block>
              <BreedListControl sortValue={sortDirection} onSortChange={handleSortChange} />
            </Block>
          </View>

          <Block extend={{ ...container }}>
            <BreedsList
              breeds={filteredBreeds}
              hasMorePosts={hasMorePosts}
              onLoadMore={handleLoadMore}
            />
          </Block>
        </>
      )}
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery('breeds', fetchBreeds);

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  };
};
