import SortView from '../view/sort-view.js';
import PointListView from '../view/point-list-view.js';
import { render, RenderPosition } from '../render.js';
import PointView from '../view/point-view.js';
import PointEditView from '../view/point-edit-view.js';
import FilterView from '../view/filter-view.js';
import TripInfoView from '../view/trip-info-view.js';

export default class BoardPresenter {
  pointList = new PointListView();

  constructor({container, pointsModel}) {
    this.container = container;
    this.pointsModel = pointsModel
  }

  init() {
    this.tripPoints = [...this.pointsModel.getPoints()];
    render(this.pointList, this.container.events);
    render(new SortView(), this.container.events);
    render(new FilterView(), this.container.filter);
    render(new TripInfoView(), this.container.tripInfo, RenderPosition.AFTERBEGIN);
    render(new PointEditView({ point: this.tripPoints[0] }), this.pointList.getElement());

    for (let i = 1; i < this.tripPoints.length; i++) {
      render(new PointView({ point: this.tripPoints[i] }), this.pointList.getElement());
    }
  }
}
