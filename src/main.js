import PointsModel from './model/point-model';
import BoardPresenter from './presenter/event-presenter';

const filterContainer = document.querySelector('.trip-controls__filters');
const tripInfoContainer = document.querySelector('.trip-main');
const eventsContainer = document.querySelector('.trip-events');

const container = {
  filter: filterContainer,
  tripInfo: tripInfoContainer,
  events: eventsContainer
};

const pointsModel = new PointsModel();
const boardPresenter = new BoardPresenter({container: container, pointsModel: pointsModel});

boardPresenter.init();
