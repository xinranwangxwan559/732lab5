import { render, MemoryRouter } from '@testing-library/react';
import App from '../App';
import {AppContext} from '../AppContextProvider';

describe('App Component Routes', () => {
  const dummyContextValue = {
    products: [],
    cart: []
  };

  it('renders the Shop page for "/shop" route', () => {
    const { queryByText } = render(
      <AppContext.Provider value={dummyContextValue}>
        <MemoryRouter initialEntries={['/shop']}>
          <App />
        </MemoryRouter>
      </AppContext.Provider>
    );

    expect(queryByText("🚀Rocket Game Corner 🚀 - Prize Shop")).toBeInTheDocument();
  });

  it('renders the Order History page for "/history" route', () => {
    const { queryByText } = render(
      <AppContext.Provider value={dummyContextValue}>
        <MemoryRouter initialEntries={['/history']}>
          <App />
        </MemoryRouter>
      </AppContext.Provider>
    );

    expect(queryByText("🚀Rocket Game Corner 🚀 - My Order History")).toBeInTheDocument();
  });

  it('renders the Checkout page for "/checkout" route', () => {
    const { queryByText } = render(
      <AppContext.Provider value={dummyContextValue}>
        <MemoryRouter initialEntries={['/checkout']}>
          <App />
        </MemoryRouter>
      </AppContext.Provider>
    );

    expect(queryByText("🚀Rocket Game Corner 🚀 - Checkout")).toBeInTheDocument();
  });
});
