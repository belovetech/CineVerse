import { FindOptions } from 'sequelize';
import { IgetTheaters } from '@interfaces/theater.interface';
import { TheaterDto } from '@dtos/theater.dto';
import Theater from '@models/theater';
import ApiFeaturesHandler from '@utils/api.features';

export default class TheaterRepository {
  public async create(theaterData: TheaterDto): Promise<TheaterDto> {
    return Theater.create(theaterData);
  }

  public async findByPk(theaterId: string): Promise<Theater | null> {
    return await Theater.findByPk(theaterId);
  }

  public async findOne(options: FindOptions): Promise<Theater | null> {
    return await Theater.findOne(options);
  }

  public async findAll(reqQuery: Record<string, string>): Promise<IgetTheaters> {
    const query = new ApiFeaturesHandler(reqQuery);

    const [offset, limit] = query.paginate();
    const { count, rows } = await Theater.findAndCountAll({
      where: query.filter(),
      attributes: query.getFieldsQuery(),
      order: query.sort(),
      offset: offset,
      limit: limit,
    });

    const metadata = query.getMetadata({ total: count, itemPerPage: rows.length });
    return { theaters: rows, metadata };
  }

  public async update(theaterId: string, options: Partial<Theater>): Promise<Theater> {
    await Theater.update({ ...options }, { where: { theaterId } });
    return this.findByPk(theaterId);
  }

  public async delete(theaterId: string, options?: Partial<Theater>): Promise<number> {
    if (options) return await Theater.destroy({ where: { ...options } });
    return await Theater.destroy({ where: { theaterId } });
  }
}
