//import { updateItem, sort} from '../utils.js';
import { sort } from '../utils.js';
import { render, remove } from '../framework/render.js';

// import TripInfoView from '../view/trip-info-view.js';
import EmptyPointListView from '../view/empty-point-list-view.js';
import PointListView from '../view/point-list-view.js';

import PointPresenter from './point-presenter.js';
// import FilterPresenter from './filter-presenter.js';
import SortPresenter from './sort-presenter.js';
import { filter } from '../utils.js';
import { UpdateType, UserAction, SortType, FilterType } from '../consts.js';
import CreatePointPresenter from './create-point-presenter.js';

export default class TripPresenter {
  #container = null;

  #pointsModel = null;
  #offersModel = null;
  #destinationModel = null;
  #filterModel = null;

  #currentSortType = SortType.DAY;
  #isCreating = false;

  #createPointButtonPresenter = null;
  #createPointPresenter = null;
  #sortPresenter = null;
  #pointPresenters = new Map();

  // #points = null;

  #pointListComponent = new PointListView();
  #emptyPointListComponent = new EmptyPointListView();
  //#tripInfoComponent = new TripInfoView(this.points, this.#destinationModel);


  constructor ({container,
    pointsModel,
    offersModel,
    destinationModel,
    filterModel,
    createPointButtonPresenter,}) {
    this.#container = container;
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
    this.#destinationModel = destinationModel;
    this.#filterModel = filterModel;
    this.#createPointButtonPresenter = createPointButtonPresenter;

    this.#createPointPresenter = new CreatePointPresenter({
      container: this.#pointListComponent.element,
      destinationModel: this.#destinationModel,
      offersModel: this.#offersModel,
      onDataChange: this.#viewActionHandler,
      onDestroy: this.#createPointButtonDestroyHandler,
    });

    this.#pointsModel.addObserver(this.#modelEventHandler);
    this.#filterModel.addObserver(this.#modelEventHandler);
  }

  get points() {
    //console.log(this.#pointsModel);
    const filterType = this.#filterModel.getFilter();
    const points = this.#pointsModel.points;
    const filteredPoints = filter[filterType](points);

    return sort(filteredPoints, this.#currentSortType);
    // попробовать sortMethod из utils
  }

  init() {
    //console.log(this.#filterModel);
    this.#renderTrip();
  }

  #viewActionHandler = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.update(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        // console.log('DELETE');
        this.#pointsModel.delete(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.add(updateType, update);
        break;
    }
  };

  #modelEventHandler = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearTrip();
        this.#renderTrip();
        break;
      case UpdateType.MAJOR:
        this.#clearTrip({ resetSortType: true });
        this.#renderTrip();
        break;
    }
  };

  #clearTrip = ({resetSortType = false} = {}) => {
    this.#clearPoints();
    this.#createPointPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();

    remove(this.#emptyPointListComponent);
    if (this.#sortPresenter) {
      this.#sortPresenter.destroy();
      this.#sortPresenter = null;
    }
    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
    // что-то непонятное // теперь вроде погятное
  };


  #renderTrip = () => {
    if (!this.points.length && !this.#isCreating) {
      render(this.#emptyPointListComponent, this.#container.events);
      return;
    }

    this.#renderSort();
    this.#renderPointList();
    this.#renderPoints();
    // this.#renderTripInfo();
    // this.#renderFilter();
  };

  #renderSort() {
    this.#sortPresenter = new SortPresenter({
      sortContainer: this.#container.events,
      currentSortType: this.#currentSortType,
      onSortChange: this.#sortTypeChangeHandler, //onSortTypeChange
    });

    this.#sortPresenter.init();
  }

  #sortTypeChangeHandler = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    // this.points = sort(this.points, sortType);
    this.#currentSortType = sortType;
    this.#clearPoints();
    this.#renderPointList();
    this.#renderPoints();
  };

  // #renderMessage = () => {

  // }

  createPointButtonClickHandler = () => {
    this.#isCreating = true;
    this.#currentSortType = SortType.DAY;
    this.#filterModel.set(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#createPointButtonPresenter.disableButton();
    this.#createPointPresenter.init();
  };

  #createPointButtonDestroyHandler = ({isCanceled}) => {
    this.#isCreating = false;
    this.#createPointButtonPresenter.enableButton();
    if (!this.points.length && isCanceled) {
      this.#clearTrip();
      this.#renderTrip();
    }
  };

  // объединить нижние два метода в один
  #renderPointList() {
    render(this.#pointListComponent, this.#container.events);
  }

  #renderPoints() {
    this.points.forEach((point) => this.#renderPoint(point));
  }

  // #renderTripInfo() {
  //   render(this.#tripInfoComponent, this.#container.tripInfo, RenderPosition.AFTERBEGIN);
  // }

  // #renderFilter() {
  //   const filterPresenter = new FilterPresenter({
  //     filterContainer: this.#container.filter,
  //     points: this.#points
  //   });

  //   filterPresenter.init();
  // }

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#pointListComponent.element,
      destinationModel: this.#destinationModel,
      offerModel: this.#offersModel,
      handleDataChange: this.#viewActionHandler, //onDataChange
      handleModeChange: this.#modeChangeHandler, //onModeChange
    });

    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  };

  #clearPoints = () => {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
    this.#createPointPresenter.destroy();
  };

  // #handlePointChange = (updatePoint) => {
  //   this.points = updateItem(this.points, updatePoint);
  //   this.#pointPresenters.get(updatePoint.id).init(updatePoint);
  // };

  #modeChangeHandler = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };
}
