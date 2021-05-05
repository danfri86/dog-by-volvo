export type BreedsResponse = {
  message: {
    [key: string]: string[];
  };
  status: string;
};

export type BreedImageResponse = {
  message: string;
  status: string;
};

export type BreedBase = {
  name: string;
  description: string;
  imageUrl: string;
};

export type Breed = BreedBase & {
  subBreeds?: BreedBase[];
};
