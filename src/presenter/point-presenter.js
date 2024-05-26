import PointView from '../view/point-view';
import EditFormView from '../view/edit-form-view';
import { Mode, UpdateType, UserAction } from '../consts';
import { render, replace, remove } from '../framework/render';
import { isMajorDifference } from '../utils';
import { EditType } from '../consts';

export default class PointPresenter {
  #pointListContainer = null;

  #mode = Mode.DEFAULT;
  #point = null;

  #destinationModel = null;
  #offerModel = null;

  #onDataChange = null;
  #onModeChange = null;

  #pointComponent = null;
  #editFormComponent = null;

  constructor({pointListContainer, destinationModel, offerModel, handleDataChange, handleModeChange}){
    this.#pointListContainer = pointListContainer;
    this.#destinationModel = destinationModel;
    this.#offerModel = offerModel;
    this.#onDataChange = handleDataChange;
    this.#onModeChange = handleModeChange;
  }

  init(point) {
    this.#point = point;
    const prevPointComponent = this.#pointComponent;
    const prevEditFormComponent = this.#editFormComponent;

    this.#pointComponent = new PointView({
      point: this.#point,
      offers: this.#offerModel.getByType(this.#point.type),
      destination: this.#destinationModel.getById(point.destination),
      onEditFormClick: this.#editFormClickHandler,
      onFavoriteClick: this.#favoriteClickHandler
    });

    this.#editFormComponent = new EditFormView({
      point: this.#point,
      offers: this.#offerModel.get(),
      destinations: this.#destinationModel.get(),
      onEditFormReset: this.#editFormResetHandler,
      onEditFormSubmit: this.#editFormSubmitHandler,
      onEditFormDelete: this.#editFormDeleteHandler,
      editFormType: EditType.EDITING,
    });

    // console.log(this.#editFormComponent);

    if (!prevPointComponent || !prevEditFormComponent) {
      render(this.#pointComponent, this.#pointListContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#editFormComponent, prevEditFormComponent);
    }

    remove(prevEditFormComponent);
    remove(prevPointComponent);
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#editFormComponent);
  }

  #switchToEditForm = () => {
    replace(this.#editFormComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#onDocumentEscKeydown);
    this.#onModeChange();
    this.#mode = Mode.EDITING;
  };

  #switchToPoint = () => {
    replace(this.#pointComponent, this.#editFormComponent);
    document.removeEventListener('keydown', this.#onDocumentEscKeydown);
    this.#mode = Mode.DEFAULT;
  };

  #onDocumentEscKeydown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#editFormComponent.reset(this.#point);
      this.#switchToPoint();
    }
  };

  resetView() {
    if (this.#mode === Mode.EDITING) {
      this.#editFormComponent.reset(this.#point);
      this.#switchToPoint();
    }
  }

  #favoriteClickHandler = () => {
    this.#onDataChange(
      UserAction.UPDATE_POINT,
      UpdateType.MINOR,
      {
        ...this.#point,
        isFavorite: !this.#point.isFavorite,
      });
  };

  #editFormClickHandler = () => {
    this.#switchToEditForm();
    document.removeEventListener('keydown', this.escKeydownHandler);
  };

  #editFormResetHandler = () => {
    this.#editFormComponent.reset(this.#point);
    this.#switchToPoint();
    document.removeEventListener('keydown', this.escKeydownHandler);
  };

  #editFormSubmitHandler = (updatePoint) => {
    const isMinor = isMajorDifference(updatePoint, this.#point);

    this.#onDataChange(
      UserAction.UPDATE_POINT,
      isMinor ? UpdateType.MINOR : UpdateType.PATCH,
      updatePoint
    );

    // this.#point = updatePoint;
    this.#switchToPoint();
    document.removeEventListener('keydown', this.escKeydownHandler);
  };

  #editFormDeleteHandler = (point) => {
    // console.log('delete Блять');
    this.#onDataChange(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      point
    );
  };

}
