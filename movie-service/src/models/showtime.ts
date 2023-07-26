import { v4 as uuidv4 } from 'uuid';
import { Table, Model, Column, Default, DataType, BelongsTo, ForeignKey, PrimaryKey } from 'sequelize-typescript';
import Movie from './movies';
import Theater from './theater';

@Table({ tableName: 'showTimes' })
export default class ShowTime extends Model<ShowTime> {
  @PrimaryKey
  @Default(() => uuidv4().replace(/-/g, ''))
  @Column(DataType.UUID)
  showTimeId: string;

  @Column({ type: DataType.STRING, allowNull: false })
  startTime: string;

  @Column({ type: DataType.STRING, allowNull: false })
  endTime: string;

  @Column({ type: DataType.DATE })
  date: Date;

  @ForeignKey(() => Movie)
  @Column({ type: DataType.UUID })
  movieId: string;

  @BelongsTo(() => Movie)
  movie: Movie;

  @ForeignKey(() => Theater)
  @Column({ type: DataType.UUID })
  theaterId: string;

  @BelongsTo(() => Theater)
  theater: Theater;
}