import * as React from 'react';
import { Filter, todoActions } from '../modules/todo';
import { useDispatch } from 'react-redux';
export interface FilterProps {}

interface IFilterButton {
  filter: Filter;
}
const Filters: React.FC<FilterProps> = props => {
  return (
    <section className="filters">
      {Object.values(Filter).map((filter: Filter, index: number) => {
        return <FilterButton key={`filter_button_${index}`} filter={filter} />;
      })}
    </section>
  );
};
const FilterButton = (props: IFilterButton) => {
  const { filter } = props;
  const dispatch = useDispatch();

  return (
    <button onClick={() => dispatch(todoActions.changeFilter({ filter }))}>
      {filter}
    </button>
  );
};

export default Filters;
