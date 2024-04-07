# COMPSCI 732 / SOFTENG 750 Lab 05

In the final MERN-stack lab, we look at how we can test our code, with Jest for the backend and Vitest with the React Testing Library on the frontend (as well as various other testing libraries / packages as introduced in the course material).

In this lab, we'll be writing tests for a familiar webapp that we've created in previous labs. The only additions to the provided source code this time are the extra dependencies and config files related to testing, as seen in the course material and examples.

**Note:** VS Code's code completion for Jest and other testing-related libraries / frameworks operates **much better** if VS Code is opened to the folder containing the application under test. This means, when writing tests for the backend, **open VS Code to the [`backend`](./backend) folder**. When writing tests for the frontend, **open VS Code to the [`frontend`](./frontend) folder**.

**Hint:** If confused at any point during this lab, remember to consult the examples - particularly the "jest", "testing backend" and "testing frontend" examples.

## Exercise One - Testing the MongoDB schema

In this exercise, we'll write tests for the database schema for our simple store app that we've previously written. As a reminder, the schema for the app consists of two collections - `product`s and `order`s. To write these tests, we will "manually" add data to an in-memory database, then test that the mongoose model classes (i.e. `Product` and `Order`) behave correctly, including the relationship between them.

To complete the exercise, follow these steps:

1. In the backend's `db` folder, you'll notice another folder called `__tests__`, which is where we'll write our unit tests for the database. In there, you'll see a file called `schema.test.js`. It is good practice to put tests in a `__tests__` folder even though this is not strictly required by Jest; and good practice to name your test files after the code that they're testing (i.e. in this case naming our test file `schema.test.js` because it will test code in `schema.js`).

2. Look at this file. You'll see a few imports, and some dummy data we'll use.

3. Use Jest's `beforeAll()` function to define code which will run once, before any tests are run. This code should create a new `MongoMemoryServer`, then connect to it using `mongoose`.

4. Use Jest's `beforeEach()` function to define code which will run before each test. This code should completely clear the database. It should then create two collections - one named `products`, and another named `orders`. It should insert the contents of the `products` array into the products collection, and the contents of the `orders` array into the orders collection.

   **Hints:** The raw MongoDB instance can be obtained from `mongoose` using `mongoose.connection.db`. Then, its `dropDatabase()` and `createCollection()` methods can be used.

5. Use Jest's `afterAll()` function to define code which will run once, after all tests are done (pass or fail). This should disconnect from the database entirely using `mongoose`, then stop the running mongo memory server.

6. Create a test (using `it()` or similar) which will test whether all `Product` data can be obtained using the defined `Product` model. The test should call `Product`'s `find()` function, and then loop through the result, ensuring that the returned content matches the predefined `products` dummy data.

7. Define another test, ensuring that the correct product is returned when we try to get a product by id.

8. Define another test, ensuring that we retrieve no data when requesting for an invalid id. **Hint:** `null` is returned when searching for a single value, and nothing is found.

9. Define another test, ensuring that we retrieve the correct product when searching for a product named "Product1".

10. Repeat 6, 7, and 8 above, but for orders and the `Order` model class.

11. Write one final test, which tests that an order's products are `populate`d correctly (i.e. by using `mongoose`'s populate functionality, we can make an order's `order` array contain actual product data, rather than a list of product ids).

## Exercise Two - Testing the Express service

In this exercise, we'll test the Express route handlers which we've defined in the `routes` folder, to make sure that they return the correct data, and that the `POST` request updates the database properly. We'll do this using the help of the [`supertest`](https://www.npmjs.com/package/supertest) package as shown in the examples / course material.

1. In `routes.test.js`, begin by setting up the test file as you did in the previous exercises. That is - Before any tests run, a MongoDB in-memory database should be started, and after all tests are done, this should be stopped. Before each test, the database should be wiped, and the given product dummy data should be inserted.

2. At the marked location near the beginning of `routes.test.js`, create an express server. The created server should be able to handle JSON data sent to it (i.e. using the `express.json()` middleware), and should have the imported `router` loaded at `/api`. i.e:

   ```js
   const app = express();
   app.use(express.json());
   app.use("/api", router);
   ```

3. Write a test which makes a `GET` request to retrieve all products (using `supertest`). The test should make sure that a `200` response is returned, with the correct products (i.e. every product in the database). **Hint:** When comparing `_id`'s, the `_id` values returned from the API will be strings, rather than MongoDB `ObjectId`s.

4. Add a test which tests whether all orders can be retrieved successfully.

5. Add one final test which tests whether we can add a new order. This should `POST` an array of product ids to `/api/orders`, and test that a `201` response is returned. Then, once the response is returned, it should examine the orders in the database (`Order.find()` can be used), to check that the new order was actually added to the database.

## Exercise Three - Testing the Product component

For the remaining exercises, we will switch over and write some tests for the frontend. In this exercise, we'll write tests for the `Product` component. This component is supposed to render information about a product which is supplied as a prop (the `item` prop). It should also render a button which, when clicked, will call the `addToCart` function (which is obtained from Context), supplying the clicked product as an argument.

To begin, create a `__tests__` folder inside the `src` folder in the `frontend`. Then, create a file `Product.test.jsx`, where we'll write the tests for this component. In that file, write the following tests:

For the first test, we will verify that a product is rendered correctly in a `Product` component. You can do this by defining a dummy product (which has a `name`, `cost`, and `image`), and supplying it to a `Product`'s `item` prop, which will be rendered using React testing library's `render()` function. This render function returns an object with several useful functions which can be used to query anything about the component under test.

- We can use the returned `queryByText` function to get a rendered element with the matching text, if any (`null` will be returned if there are no matches). Use this to check if there are elements on the page displaying the given product's name and cost. **Hint:** Remember that the product's cost isn't just displayed as a number, but rather, as a formatted number with appropriate commas, and a 🪙 emoji. For example, if a product's cost is `1234`, then the following text should be displayed: "🪙1,234".

- We can use the returned `queryByRole` function to get a rendered element with the matching role, if any. One possible role is `img`. Therefore, we can use this to make sure an `<img>` is being rendered. Once we have a reference to the rendered `img`, we can then use its `getAttribute()` function to check that its `src` attribute has been set to the correct value. **Note:** Because `Product` is expected to get part of the image `src` property from environment variables, we have created an additional environment file called `.env.test`. These values will overwrite the default `.env` values when running under a test environment. Because these values are blank, then, when checking the image `src`, we can just check that it equals `image.jpg`.

Next, we will write a new test which verifies that the `Product` component renders a button which, when clicked, will correctly call the `addToCart` context function.

- We can get the rendered `<button>`, if any, by using the `button` role.

- We can create a dummy `addToCart` function using `vi.fn()`, and supply it as part of a dummy context object by wrapping our rendered `Product` component in an `AppContext.Provider` component, supplying our dummy context object in the `value` prop. For example:

```jsx
const addToCart = vi.fn();

const { queryByRole } = render(
  <AppContext.Provider value={{ addToCart }}>
    <Product item={myDummyProduct} />
  </AppContext.Provider>
);
```

**Note:** As shown above, we are using `vi.fn()` instead of `jest.fn()` for mocking. This is the Vitest version of this function. Other than the name change, it is identical. You can import `vi` from `vitest`.

## Exercise Four - Testing our routing (App.js)

In this exercise, we'll test `App.js`. This component essentially just containes a `<Routes>` block, which we want to test that we've configured correctly.

In this exercise, create a new test file (`App.test.jsx`), and write three tests: One each to test whether the shop page, order history page, and checkout page are rendered when the user has navigated to `/shop`, `/history`, and `/checkout`, respectively.

**Hints:**

- When testing anything to do with React Router (i.e. testing Routes like we are in this exercise, or testing any code which contains `<Link>` or `<NavLink>` components), we need to surround the component under test with some form of Router (just like we surround our code with `BrowserRouter` at runtime). React Router's `MemoryRouter` is really good for this purpose. It also has an `initialEntries` prop, which allows us to set the browser history stack to whatever initial value we'd like. We can use this to, for example, start the app at the `/checkout` route, like so:

```jsx
<MemoryRouter initialEntries={["/checkout"]}>
  <App />
</MemoryRouter>
```

- We may also want to surround our `App` with some dummy context data similar to the previous exercise. This time, dummy `products` and `cart` data. Both of these can simply be empty arrays for testing purposes.

- To test whether the correct pages are rendered, we can simply test whether the correct headings are rendered in each case (using `queryByText`). These are:

  - "🚀Rocket Game Corner 🚀 - Prize Shop"
  - "🚀Rocket Game Corner 🚀 - My Order History"
  - "🚀Rocket Game Corner 🚀 - Checkout"

## Exercise Five - Testing our API calls

In our app, the `AppContextProvider` component, when rendered, is supposed to make a `GET` request to `/api/products` (using the `useGet()` hook). We will test that this occurs.

Let's create a new test file, `AppContextProvider.test.jsx`.

With the previous tests, we've rendered components, and then checked that certain HTML elements have been rendered, with the correct values. In this case, `AppContextProvider` doesn't itself have any UI to speak of - it only displays its children. So, let's begin by creating a simple React component in our test file which will get the `products` array from context, and display the number of products in the list, plus the name of each product. Something like this:

```jsx
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
```

Then, we'll write our actual unit test, which will render an `AppContextProvider` _containing_ one of our `TestComponent`s, and will check if the products are displayed correctly in the `TestComponent` (as well as checking that our API is called correctly, using `axios-mock-adapter`).

Before we write the actual unit test, setup our `MockAdapter` from `axios-mock-adapter`, to mock API calls, and make sure to `reset()` the mock after each test runs.

Next, create the unit test itself. Begin by creating some fake products (each containing an `_id`, `name`, `cost`, and `image`). Then, setup our axios mock to respond with a `200` response, and those products, when a `GET` request is made to `/api/products`.

Next, render our `AppContextProvider`, with a `TestComponent` inside it. Then, use the async `waitFor()` function provided by React testing library to wait for an element to be rendered with the text matching one of your dummy product names. For example:

```js
await waitFor(() => getByText("Product1"), { timeout: 1000 });
```

After that, check the axios mock to make sure it was called once, with the correct URL. And, finally, loop through all of our dummy products and make sure each is rendered onscreen (by searching for, for example, those products' names by text).
