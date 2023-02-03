import { useState } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import css from './SearchBar.module.css';
import { FaSistrix } from 'react-icons/fa';

const SearchBar = ({ onSubmit }) => {
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

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;

// class Searchbar extends Component {
//   state = {
//     request: '',
//   };
//   handleChange = event => {
//     this.setState({ request: event.currentTarget.value.toLowerCase() });
//   };

//   handleSubmit = event => {
//     event.preventDefault();

//     if (this.state.request.trim() === '') {
//       toast.error('Please enter your search data.');
//       return;
//     }
//     this.props.onSubmit(this.state.request);
//     this.setState({ request: '' });
//     event.currentTarget.reset();
//   };

//   render() {
// return (
//   <>
//     <header className={css.SearchBar}>
//       <form className={css.SearchForm} onSubmit={this.handleSubmit}>
//         <button type="submit" className={css.SearchFormButton}>
//           <FaSistrix size={20} />
//           <span className={css.SearchFormButtonLabel}></span>
//         </button>

//         <input
//           className={css.SearchFormInput}
//           type="text"
//           name="request"
//           autoComplete="off"
//           autoFocus
//           value={this.state.request}
//           placeholder="Search images and photos"
//           onChange={this.handleChange}
//         />
//       </form>
//     </header>
//   </>
// );
//   }
// }