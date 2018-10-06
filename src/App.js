import React, { Component } from 'react';
import DataBrowser from 'react-data-browser';
import axios from 'axios';
import styles from './App.module.css';

const api = axios.instance('https://jsonplaceholder.typicode.com/');

const columns = [
  { label: 'name', sortField: 'name', isLocked: true },
  { label: 'user name', sortField: 'username' },
  { label: 'email', sortField: 'email' },
  { label: 'street', sortField: 'address.street' },
  { label: 'suite', sortField: 'address.suite' },
  { label: 'city', sortField: 'address.city' },
];

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
      <DataBrowser columns={columns}>
        {() => (
          <div className={styles.table}>
            <div className={styles.head}>
              <div className={styles.head_row}>
                <div className={styles.head_row_item}>
                  head column titles will go here
                </div>
              </div>
            </div>
            <div className={styles.body}>
              <div className={styles.body_row}>
                <div className={styles.body_row_item}>
                  body row names will go here
                </div>
              </div>
            </div>
          </div>
        )}
      </DataBrowser>
    );
  }
}

export default App;
