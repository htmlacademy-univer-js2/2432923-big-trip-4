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
    this.#filterContainer = filterContainer; //вопросик по передаче нужного контейнера

    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;

    this.#pointsModel.addObserver(this.#modelChangeHandler);
    this.#filterModel.addObserver(this.#modelChangeHandler);
  }

  get filters() {
    const points = this.#pointsModel.points;

    return Object.entries(filter).map(([filterType, filterPoints]) =>
      ({
        type: filterType,
        isDisabled: filterPoints(points).length === 0,
      }),
    );
  }

  init(){
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new FilterView({
      //проверить аргументы во view
      filters: this.filters,
      currentFilterType: this.#filterModel.filter,
      onFilterTypeChange: this.#filterTypeChangeHandler,
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
    this.#filterModel.set(UpdateType.MAJOR, filterType);
  };

  #modelChangeHandler = () => {
    this.init();
  };
}
