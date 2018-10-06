import React, { Component } from 'react';
import DataBrowser from 'react-data-browser';
import styles from './App.module.css';

class App extends Component {
  render() {
    return (
      <DataBrowser columns={[]}>
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
