import { Component } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';
import { FaSistrix } from 'react-icons/fa';

class Searchbar extends Component {
  state = {
    request: '',
  };
  handleChange = event => {
    this.setState({ request: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.request.trim() === '') {
      toast.error('Please enter your search data.');
      return;
    }
    this.props.onSubmit(this.state.request);
    this.setState({ request: '' });
    event.currentTarget.reset();
  };

  render() {
    return (
      <>
        <header className={css.SearchBar}>
          <form className={css.SearchForm} onSubmit={this.handleSubmit}>
            <button type="submit" className={css.SearchFormButton}>
              <FaSistrix size={20} />
              <span className={css.SearchFormButtonLabel}></span>
            </button>

            <input
              className={css.SearchFormInput}
              type="text"
              name="request"
              autoComplete="off"
              autoFocus
              value={this.state.request}
              placeholder="Search images and photos"
              onChange={this.handleChange}
            />
          </form>
        </header>
      </>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
