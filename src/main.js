import PointsModel from './model/point-model';
import TripPresenter from './presenter/trip-presenter';
import DestinationModel from './model/destination-model';
import OffersModel from './model/offer-model';
import FilterModel from './model/filter-model';
import FilterPresenter from './presenter/filter-presenter';
import CreatePointButtonPresenter from './presenter/create-point-button-presenter';
import { RenderPosition, render } from './framework/render';
import TripInfoView from './view/trip-info-view';

const filterContainer = document.querySelector('.trip-controls__filters');
const tripInfoContainer = document.querySelector('.trip-main');
const eventsContainer = document.querySelector('.trip-events');

const container = {
  filter: filterContainer,
  tripInfo: tripInfoContainer,
  events: eventsContainer
};

const destinationModel = new DestinationModel();
const offersModel = new OffersModel();
const pointsModel = new PointsModel();
const filterModel = new FilterModel();
//console.log(filterModel);

const createPointButtonPresenter = new CreatePointButtonPresenter({
  container: container.tripInfo,
});
// console.log(createPointButtonPresenter);

const tripPresenter = new TripPresenter({
  container,
  pointsModel,
  offersModel,
  destinationModel,
  filterModel,
  createPointButtonPresenter,
});

render(new TripInfoView(pointsModel.getPoints(), destinationModel), container.tripInfo, RenderPosition.AFTERBEGIN);

const filterPresenter = new FilterPresenter({
  filterContainer: container.filter,
  pointsModel,
  filterModel
});

createPointButtonPresenter.init({
  onClick: tripPresenter.createPointButtonClickHandler,
});

tripPresenter.init();
filterPresenter.init();
// console.log(filterModel);
