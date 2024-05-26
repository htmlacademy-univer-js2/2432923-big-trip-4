import FilterView from '../view/filter-view';
import { remove, render, replace } from '../framework/render';
import { filter } from '../utils';
import { UpdateType } from '../consts';

export default class FilterPresenter {
  #filterContainer = null;

  #pointsModel;
  #filterModel = null;

  #filterComponent = null;

  constructor({filterContainer, pointsModel, filterModel}) {
    this.#filterContainer = filterContainer;

    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;

    this.#pointsModel.addObserver(this.#modelChangeHandler);

  }

  get filters() {
    const points = this.#pointsModel.getPoints(); //сделать через метод
    const result = Object.entries(filter).map(([filterType, filterPoints]) =>
      ({
        type: filterType,
        isDisabled: filterPoints(points).length === 0,
      }),
    );
    // console.log('result', result);
    return result;
  }

  init(){
    const prevFilterComponent = this.#filterComponent;

    this.#filterModel.addObserver(this.#modelChangeHandler);

    this.#filterComponent = new FilterView({
      //проверить аргументы во view
      items: this.filters,
      //currentFilterType: this.#filterModel.filter,
      onItemChange: this.#filterTypeChangeHandler,
    });

    if (prevFilterComponent === null) {
      render(this.#filterComponent, this.#filterContainer);
      return;
    }
    // console.log(this.#filterComponent, prevFilterComponent);
    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  #filterTypeChangeHandler = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }
    // console.log(this.#pointsModel.points);
    this.#filterModel.set(UpdateType.MAJOR, filterType);
  };

  #modelChangeHandler = () => {
    this.init();
  };
}
