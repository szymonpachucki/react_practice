import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';
// import categories from './api/categories';
// import users from './api/users';

export const App = () => {
  const [selectedUser, setSelectedUser] = useState('all');
  const [value, setValue] = useState('');
  const [query, setQuery] = useState('');
  const [visibleProducts, setVisibleProducts]
   = useState([...productsFromServer]);
  const handleSearch = (event) => {
    const inputValue = event.target.value.toLowerCase();

    setQuery(inputValue);
    setValue(event.target.value);

    const filteredProds = products.filter((prod) => {
      const titleContainsQuery
       = prod.name.toLowerCase().includes(query);

      return titleContainsQuery;
    });

    setVisibleProducts(filteredProds);
  };

  const products = visibleProducts.map((product) => {
    const category = categoriesFromServer.find(categorys => categorys.id
      === product.categoryId);
    const user = usersFromServer.find(users => users.id === category.ownerId);

    if (selectedUser !== 'all' && selectedUser !== user.name) {
      return null;
    }

    return {
      ...product,
      category,
      user,
    };
  }).filter(product => product !== null);

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>

        <div className="block">
          <nav className="panel">
            <p className="panel-heading">Filters</p>

            <p className="panel-tabs has-text-weight-bold">
              <a
                data-cy="FilterAllUsers"
                href="#/"
                className={selectedUser === 'all' ? 'is-active' : ''}
                onClick={() => setSelectedUser('all')}
              >
                All
              </a>

              <a
                data-cy="FilterUser"
                href="#/Roma"
                className={selectedUser === 'Roma' ? 'is-active' : ''}
                onClick={() => setSelectedUser(`Roma`)}
              >
                Roma
              </a>

              <a
                data-cy="FilterUser"
                href="#/Anna"
                className={selectedUser === 'Anna' ? 'is-active' : ''}
                onClick={() => setSelectedUser(`Anna`)}
              >
                Anna
              </a>

              <a
                data-cy="FilterUser"
                href="#/Max"
                className={selectedUser === 'Max' ? 'is-active' : ''}
                onClick={() => setSelectedUser(`Max`)}
              >
                Max
              </a>
            </p>

            <div className="panel-block">
              <p className="control has-icons-left has-icons-right">
                <input
                  data-cy="SearchField"
                  type="text"
                  className="input"
                  placeholder="Search"
                  value={value}
                  onChange={handleSearch}
                />

                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true" />
                </span>

                <span className="icon is-right">
                  {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                  <button
                    data-cy="ClearButton"
                    type="button"
                    className="delete"
                    style={{ display: query ? 'block' : 'none' }}
                    onClick={() => {
                      setQuery('');
                      setValue('');
                      setVisibleProducts([...productsFromServer]);
                    }}
                  />
                </span>
              </p>
            </div>

            <div className="panel-block is-flex-wrap-wrap">
              <a
                href="#/"
                data-cy="AllCategories"
                className="button is-success mr-6 is-outlined"
              >
                All
              </a>

              <a
                data-cy="Category"
                className="button mr-2 my-1 is-info"
                href="#/"
              >
                Category 1
              </a>

              <a
                data-cy="Category"
                className="button mr-2 my-1"
                href="#/"
              >
                Category 2
              </a>

              <a
                data-cy="Category"
                className="button mr-2 my-1 is-info"
                href="#/"
              >
                Category 3
              </a>
              <a
                data-cy="Category"
                className="button mr-2 my-1"
                href="#/"
              >
                Category 4
              </a>
            </div>

            <div className="panel-block">
              <a
                data-cy="ResetAllButton"
                href="#/"
                className="button is-link is-outlined is-fullwidth"
                onClick={() => {
                  setSelectedUser('all');
                  setQuery('');
                  setValue('');
                  setVisibleProducts([...productsFromServer]);
                }}
              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>

        <div className="box table-container">

          {products.length === 0
            ? (
              <p
                data-cy="NoMatchingMessage"
              >
                No products matching selected criteria
              </p>
            ) : (

              <table
                data-cy="ProductTable"
                className="table is-striped is-narrow is-fullwidth"
              >
                <thead>
                  <tr>
                    <th>
                      <span className="is-flex is-flex-wrap-nowrap">
                        ID

                        <a href="#/">
                          <span className="icon">
                            <i data-cy="SortIcon" className="fas fa-sort" />
                          </span>
                        </a>
                      </span>
                    </th>

                    <th>
                      <span className="is-flex is-flex-wrap-nowrap">
                        Product

                        <a href="#/">
                          <span className="icon">
                            <i
                              data-cy="SortIcon"
                              className="fas fa-sort-down"
                            />
                          </span>
                        </a>
                      </span>
                    </th>

                    <th>
                      <span className="is-flex is-flex-wrap-nowrap">
                        Category

                        <a href="#/">
                          <span className="icon">
                            <i data-cy="SortIcon" className="fas fa-sort-up" />
                          </span>
                        </a>
                      </span>
                    </th>

                    <th>
                      <span className="is-flex is-flex-wrap-nowrap">
                        User

                        <a href="#/">
                          <span className="icon">
                            <i data-cy="SortIcon" className="fas fa-sort" />
                          </span>
                        </a>
                      </span>
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {products.map(product => (
                    <tr key={product.id} data-cy="Product">
                      <td className="has-text-weight-bold" data-cy="ProductId">
                        {product.id}
                      </td>

                      <td data-cy="ProductName">{product.name}</td>
                      <td data-cy="ProductCategory">
                        {product.category.icon}
                        {' '}
                        -
                        {' '}
                        {product.category.title}
                      </td>

                      <td
                        data-cy="ProductUser"
                        className={product.user.sex === 'm'
                          ? 'has-text-link' : 'has-text-danger'}
                      >
                        {product.user.name}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
        </div>
      </div>
    </div>
  );
};
