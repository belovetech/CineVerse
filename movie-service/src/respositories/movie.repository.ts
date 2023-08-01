import { FindOptions } from 'sequelize';
import { MovieDto } from '@dtos/movie.dto';
import { IGetMovie } from '@interfaces/movie.interface';
import ApiFeaturesHandler from '@utils/api.features';
import Movie from '@models/movies';

export default class MovieRepository {
  public async createMovie(movieData: MovieDto): Promise<MovieDto> {
    return await Movie.create(movieData);
  }

  public async getMovieById(movieId: string, options?: FindOptions): Promise<Movie | null> {
    return await Movie.findByPk(movieId, options);
  }

  public async getMovie(options: FindOptions): Promise<Movie | null> {
    return await Movie.findOne(options);
  }

  public async getMovies(reqQuery: Record<string, any>): Promise<IGetMovie> {
    const query = new ApiFeaturesHandler(reqQuery);
    const [offset, limit] = query.paginate();

    const { count, rows } = await Movie.findAndCountAll({
      where: query.filter(),
      attributes: query.getFieldsQuery(),
      order: query.sort(),
      offset: offset,
      limit: limit,
    });

    const metadata = query.getMetadata({ total: count, itemPerPage: rows.length });
    return { movies: rows, metadata };
  }

  public async updateMovie(movieId: string, options: Partial<Movie>): Promise<Movie> {
    await Movie.update({ ...options }, { where: { movieId } });
    return await this.getMovieById(movieId);
  }

  public async deleteMovie(movieId: string): Promise<Movie | number> {
    return await Movie.destroy({ where: { movieId: movieId } });
  }
}
