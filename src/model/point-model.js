import { generatePoint } from '../mock/point';
import { POINT_COUNT } from '../consts';

export default class PointsModel {
  points = Array.from({ length: POINT_COUNT }, generatePoint);

  getPoints() {
    return this.points;
  }
}
