const createRouteElement = (points, destinationModel) => {
  const destinationIds = Array.from(points, (point) => (point.destination));
  const destinationNames = destinationIds.map((destinationId) => (destinationModel.getById(destinationId))).map((destination) => destination.name);

  return `<h1 class="trip-info__title">
    ${ destinationNames.map((name) => `${ name }`).join(' &mdash; ')}
  </h1>`;
};

export function createTripInfoTemplate() {
  return `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>

      <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;20</p>
    </div>

    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>
    </p>
  </section>`;
}
