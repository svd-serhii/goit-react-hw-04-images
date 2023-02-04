import { useState } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';
import { FaSistrix } from 'react-icons/fa';

const Searchbar = ({ onSubmit }) => {
  const [request, setRequest] = useState('');

  const handleChange = event => {
    setRequest(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (request.trim() === '') {
      toast.error('Please enter your search data.');
      return;
    }
    onSubmit(request);
    setRequest('');
    event.currentTarget.reset();
  };

  return (
    <>
      <header className={css.SearchBar}>
        <form className={css.SearchForm} onSubmit={handleSubmit}>
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
            value={request}
            placeholder="Search images and photos"
            onChange={handleChange}
          />
        </form>
      </header>
    </>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
