import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';

export class Searchbar extends Component {
  state = {
    name: '',
  };

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  handleChange = event => {
    const { name, value } = event.currentTarget;
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state.name);
  };

  render() {
    return (
      <header className={css.searchbar}>
        <form className={css.form} onSubmit={this.handleSubmit}>
          <button className={css.button} type="submit">
            <span className={css.buttonLabel}>Search</span>
          </button>

          <input
            className={css.input}
            name="name"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.name}
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}
