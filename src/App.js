import React, { Component } from 'react';
import DataBrowser, { getObjectPropertyByString } from 'react-data-browser';
import axios from 'axios';
import styles from './App.module.css';

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/',
});

const columns = [
  { label: 'name', sortField: 'name', isLocked: true },
  { label: 'user name', sortField: 'username' },
  { label: 'email', sortField: 'email' },
  { label: 'street', sortField: 'address.street' },
  { label: 'suite', sortField: 'address.suite' },
  { label: 'city', sortField: 'address.city' },
];

function fieldReducer(fieldValue = '🍔', fieldName) {
  switch (fieldName) {
    case 'name':
      return `🌄 ${fieldValue}`;
    case 'username':
      return `📝 ${fieldValue}`;
    case 'email':
      return (
        <div style={{ color: 'orange', fontStyle: 'italic' }}>{fieldValue}</div>
      );
    default:
      return fieldValue;
  }
}

class App extends Component {
  state = { data: [], loading: true };
  async componentDidMount() {
    const [users, albums] = await Promise.all([
      api.get('users'),
      api.get('photos?albumId=1'),
    ]);
    const data = users.data.map(user => ({
      ...user,
      album: albums.data.find(album => album.id === user.id),
    }));
    this.setState({ data, loading: false });
  }
  render() {
    return (
      <DataBrowser
        initialColumnFlex={['0 0 25%', '1 1 35%', '0 0 20%', '0 0 20%']}
        columns={columns}
      >
        {({ columnFlex, visibleColumns }) => (
          <div className={styles.table}>
            <div className={styles.head}>
              <div className={styles.head_row}>
                {visibleColumns.map((cell, index) => (
                  <div
                    key={index}
                    className={styles.head_row_item}
                    style={{ flex: columnFlex[index] }}
                  >
                    {cell.label}
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.body}>
              {this.state.data.map((row, key) => (
                <div key={key} className={styles.body_row}>
                  {visibleColumns.map(({ label, sortField }, index) => (
                    <div
                      key={sortField}
                      className={styles.body_row_item}
                      style={{ flex: columnFlex[index] }}
                    >
                      {fieldReducer(
                        getObjectPropertyByString(row, sortField),
                        sortField,
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </DataBrowser>
    );
  }
}

export default App;
