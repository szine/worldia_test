import { Area } from './area';
import { Location } from './location';

export interface Trip {
  id: string;
  state: string;
  slug: string;
  name: string;
  catchPhrase: string;
  thumbnail: {
      path: string;
  };
  areas: Area[];
  locations: Location[];
  duration: number;
  volumeInfo: {
    title: string;
    subtitle: string;
    authors: string[];
    publisher: string;
    publishDate: string;
    description: string;
    averageRating: number;
    ratingsCount: number;
    imageLinks: {
      thumbnail: string;
      smallThumbnail: string;
    };
  };
}
