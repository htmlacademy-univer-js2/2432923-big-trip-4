// export const createFilterTemplate = (filters) =>
//   `<form class="trip-filters" action="#" method="get">
//       ${filters.map(( filter ) => (`<div class="trip-filters__filter">
//         <input id="filter-${ filter.type }" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${ filter.type }" ${filter.isDisabled ? 'disabled' : ''}>
//         <label class="trip-filters__filter-label" for="filter-${ filter.type }">${ filter.type }</label>
//       </div>`)).join('')}
//     <button class="visually-hidden" type="submit">Accept filter</button>
//   </form>`;

export const createFilterTemplate = ({filters}) => `
  <form class="trip-filters" action="#" method="get">
    ${filters.map(({ type, isDisabled}) => `
      <div class="trip-filters__filter">
        <input
          id="filter-${type}"
          class="trip-filters__filter-input  visually-hidden"
          type="radio"
          name="trip-filter"
          value="${type}"
          data-item="${type}"
          ${isDisabled ? 'disabled' : ''}

        >
        <label class="trip-filters__filter-label" for="filter-${type}">
          ${type}
        </label>
      </div>
    `).join('')}
    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>
`;
