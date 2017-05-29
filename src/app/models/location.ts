export interface Location {
  id: string;
  state: string;
  slug: string;
  name: string;
  catchPhrase: string;
  thumbnail: {
      path: string;
  };
  duration: number;
}
