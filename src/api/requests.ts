import { instance } from '@api';
import axios from 'axios';
import { Breed, BreedBase, BreedImageResponse, BreedsResponse } from 'types/breed';

export const fetchBreeds = async (): Promise<Breed[]> => {
  const res = await instance.get<BreedsResponse>('breeds/list/all');
  const { message: breeds } = res.data;

  const breedsWithData: Breed[] = [];

  // Use for..of for promises to work in loop
  for (const breedName of Object.keys(breeds)) {
    const base = await getBreedBase(breedName);
    const item: Breed = {
      ...base,
      subBreeds: []
    };

    for (const subBreedName of breeds[breedName]) {
      const subBreedBase = await getBreedBase(breedName, subBreedName);
      item.subBreeds?.push(subBreedBase);
    }

    breedsWithData.push(item);
  }

  return breedsWithData;
};

const fetchBreedImage = async (breed: string) => {
  const res = await instance.get<BreedImageResponse>(`breed/${breed}/images/random`);
  return res.data.message;
};

const fetchSubBreedImage = async (breed: string, subBreed: string) => {
  const res = await instance.get<BreedImageResponse>(
    `https://dog.ceo/api/breed/${breed}/${subBreed}/images/random`
  );
  return res.data.message;
};

const fetchDescription = async () => {
  const res = await axios.get<string>(
    'https://baconipsum.com/api/?type=all-meat&sentences=1&start-with-lorem=1'
  );
  return res.data[0];
};

const getBreedBase = async (breedName: string, subBreedName?: string): Promise<BreedBase> => {
  const [description, imageUrl] = await Promise.all([
    fetchDescription(),
    subBreedName ? fetchSubBreedImage(breedName, subBreedName) : fetchBreedImage(breedName)
  ]);

  return {
    name: subBreedName || breedName,
    description,
    imageUrl
  };
};
