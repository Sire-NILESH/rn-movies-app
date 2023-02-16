import { MovieMedia, TvMedia } from "../../typings";

export function isMovie(
  media: MovieMedia | TvMedia | null
): media is MovieMedia {
  return media !== null && (media as MovieMedia).title !== undefined;
}

export function isMovieArray(
  medias: MovieMedia[] | TvMedia[]
): medias is MovieMedia[] {
  return medias !== null && (medias as MovieMedia[])[0].title !== undefined;
}
