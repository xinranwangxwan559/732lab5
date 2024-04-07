import React, { useContext } from 'react';
import { render, waitFor } from '@testing-library/react';
import { AppContextProvider, AppContext } from '../AppContextProvider';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

// Setup axios mock
const mock = new MockAdapter(axios);

// Test component to display products
function TestComponent() {
  const { products } = useContext(AppContext);

  return (
    <div>
      <p>{products ? products.length : 0} products in list</p>
      {products &&
        products.map((product) => <p key={product._id}>{product.name}</p>)}
    </div>
  );
}

describe('AppContextProvider', () => {
  const fakeProducts = [
    { _id: '1', name: 'Product1', cost: 100, image: 'image1.jpg' },
    { _id: '2', name: 'Product2', cost: 200, image: 'image2.jpg' },
    { _id: '3', name: 'Product3', cost: 300, image: 'image3.jpg' }
  ];

  // Reset the mock after each test
  afterEach(() => {
    mock.reset();
  });

  it('fetches products and updates context', async () => {
    // Mock the GET request to /api/products
    mock.onGet("/api/products").reply(200, fakeProducts);

    const { getByText } = render(
      <AppContextProvider>
        <TestComponent />
      </AppContextProvider>
    );

    // Wait for the product name to be in the document
    await waitFor(() => getByText("Product1"), { timeout: 1000 });

    // Check if axios was called correctly
    expect(mock.history.get.length).toBe(1);
    expect(mock.history.get[0].url).toEqual("/api/products");

    // Check if all products are rendered
    fakeProducts.forEach(product => {
      expect(getByText(product.name)).toBeInTheDocument();
    });
  });
});
