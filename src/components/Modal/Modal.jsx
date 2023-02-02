import { Component } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');
class Modal extends Component {
  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackDropClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  render() {
    return createPortal(
      <div className={css.Overlay} onClick={this.handleBackDropClick}>
        <div className={css.Modal}>
          <img src={this.props.largeImg} alt={this.props.tags} />
        </div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;

Modal.propTypes = {
  largeImage: PropTypes.string.isRequired,
  alt: PropTypes.string,
};
