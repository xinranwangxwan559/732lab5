import { render, fireEvent } from '@testing-library/react';
import Product from '../Product';
import AppContext from '../AppContextProvider';

import vi from 'vitest';

const mockProduct = {
  name: 'Test Product',
  cost: 1234,
  image: 'image.jpg'
};

describe('Product Component', () => {
  it('renders the product information correctly', () => {
    const { queryByText, queryByRole } = render(<Product item={mockProduct} />);

    expect(queryByText(mockProduct.name)).toBeInTheDocument();
    expect(queryByText(`🪙${mockProduct.cost.toLocaleString("en-NZ")}`)).toBeInTheDocument();
    
    const image = queryByRole('img');
    expect(image).toHaveAttribute('src', mockProduct.image); // Considering .env.test sets the base URL to be empty
  });

  it('calls addToCart when add to cart button is clicked', () => {
    const addToCart = vi.fn();
    const { queryByRole } = render(
      <AppContext.Provider value={{ addToCart }}>
        <Product item={mockProduct} />
      </AppContext.Provider>
    );

    const addButton = queryByRole('button', { name: /add to cart/i });
    fireEvent.click(addButton);
    expect(addToCart).toHaveBeenCalledWith(mockProduct);
  });
});
