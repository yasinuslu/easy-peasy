import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import {
  action,
  createStore,
  StoreProvider,
  useStore,
  useActions,
} from '../../index';

const model = {
  count: 0,
  increment: action(state => {
    state.count += 1;
  }),
};

describe('react', () => {
  it('component integration test', () => {
    // arrange
    function ComponentUnderTest() {
      const count = useStore(state => state.count);
      const increment = useActions(actions => actions.increment);
      return (
        <div>
          Count: <span data-testid="count">{count}</span>
          <button type="button" onClick={increment}>
            +
          </button>
        </div>
      );
    }

    const store = createStore(model);

    const app = (
      <StoreProvider store={store}>
        <ComponentUnderTest />
      </StoreProvider>
    );

    // act
    const { getByTestId, getByText } = render(app);

    // assert
    expect(getByTestId('count').textContent).toEqual('0');

    // act
    fireEvent.click(getByText('+'));

    // assert
    expect(getByTestId('count').textContent).toEqual('1');
  });
});
