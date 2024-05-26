import { generatePoint } from '../mock/point';
import { POINT_COUNT } from '../consts';
import Observable from '../framework/observable';

export default class PointsModel extends Observable {
  #points;

  constructor() {
    super();
    this.#points = Array.from({ length: POINT_COUNT }, generatePoint);
  }

  get points() {
    return this.#points;
  }

  update = (updateType, update) => {
    const index = this.points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      update,
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType, update);
  };

  add = (updateType, update) => {
    this.#points = [
      ...this.#points,
      update,
    ];

    this._notify(updateType, update);
  };

  delete = (updateType, update) => {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType);
  };
}
