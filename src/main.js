import PointsModel from './model/point-model';
import BoardPresenter from './presenter/event-presenter';

const filterContainer = document.querySelector('.trip-controls__filters');
const tripInfoContainer = document.querySelector('.trip-main');
const eventsContainer = document.querySelector('.trip-events');

const container = {
  filter: filterContainer,
  tripInfo: tripInfoContainer,
  events: eventsContainer
}

const pointsModel = new PointsModel();
const boardPresenter = new BoardPresenter({container: container, pointsModel: pointsModel});

boardPresenter.init();

// render(new FilterView(), container.filter);
// render(new TripInfoView(), container.tripInfo, RenderPosition.AFTERBEGIN);



// import PointsModel from './model/point-model';
// import BoardPresenter from './presenter/event-presenter';
// import { render, RenderPosition } from './render';
// import FilterView from './view/filter-view';
// import TripInfoView from './view/trip-info-view';

// const bodyElement = document.querySelector('body');
// const filterElement = bodyElement.querySelector('.trip-controls__filters');
// const tripInfoElement = document.querySelector('.trip-main');
// const boardContainer = document.querySelector('.trip-events');
// const pointsModel = new PointsModel();
// const boardPresenter = new BoardPresenter({container: boardContainer, pointsModel: pointsModel});

// boardPresenter.init();

// render(new FilterView(), filterElement);
// render(new TripInfoView(), tripInfoElement, RenderPosition.AFTERBEGIN);

