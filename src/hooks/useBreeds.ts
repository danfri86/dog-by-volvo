import { fetchBreeds } from '@api';
import { useQuery } from 'react-query';
import { Breed } from 'types/breed';

export const useBreeds = () => {
  return useQuery<Breed[], Error>('breeds', fetchBreeds, {
    staleTime: 100000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false
  });
};
