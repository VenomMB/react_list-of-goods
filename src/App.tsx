import { Component } from 'react';
import classNames from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

enum SortType {
  NONE,
  ALPHABET,
  LENGTH,
}

type ReorderOptions = {
  sortType: SortType,
  isReversed: boolean,
};

export function getReorderedGoods(
  goods: string[],
  { sortType, isReversed }: ReorderOptions,
) {
  const visibleGoods = [...goods];

  visibleGoods.sort((a, b) => {
    switch (sortType) {
      case SortType.ALPHABET:
        return a.localeCompare(b);
      case SortType.LENGTH:
        return a.length - b.length;
      default:
        return 0;
    }
  });

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

type State = {
  isReversed: boolean,
  sortType: SortType,
};

export class App extends Component<{}, State> {
  state = {
    isReversed: false,
    sortType: SortType.NONE,
  };

  toSortAlphabet = () => {
    this.setState(({
      sortType: SortType.ALPHABET,
    }));
  };

  toSortByLength = () => {
    this.setState(({
      sortType: SortType.LENGTH,
    }));
  };

  toReverse = () => {
    this.setState(state => ({
      isReversed: !state.isReversed,
    }));
  };

  toReset = () => {
    this.setState({
      isReversed: false,
      sortType: SortType.NONE,
    });
  };

  render() {
    const {
      toSortAlphabet,
      toSortByLength,
      toReverse,
      toReset,
    } = this;

    const { sortType, isReversed } = this.state;
    const goods = getReorderedGoods(goodsFromServer, { sortType, isReversed });

    return (
      <div className="section content">
        <div className="buttons">
          <button
            type="button"
            className={classNames(
              'button is-info',
              { 'is-light': sortType !== SortType.ALPHABET },
            )}
            onClick={toSortAlphabet}
          >
            Sort alphabetically
          </button>

          <button
            type="button"
            className={classNames(
              'button is-success',
              { 'is-light': sortType !== SortType.LENGTH },
            )}
            onClick={toSortByLength}
          >
            Sort by length
          </button>

          <button
            type="button"
            className={classNames(
              'button is-warning',
              { 'is-light': !isReversed },
            )}
            onClick={toReverse}
          >
            Reverse
          </button>

          { (sortType !== SortType.NONE || isReversed) && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={toReset}
            >
              Reset
            </button>
          )}
        </div>

        <ul>
          <ul>
            {goods.map(good => (
              <li data-cy="Good" key={good}>{good}</li>
            ))}
          </ul>
        </ul>
      </div>
    );
  }
}
