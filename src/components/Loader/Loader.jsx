import { RotatingLines } from 'react-loader-spinner';
import css from './Loader.module.css';

function Loader() {
  return (
    <div className={css.ContainerLoader}>
      <RotatingLines
        strokeColor="#3f51b5"
        strokeWidth="5"
        animationDuration="0.75"
        width="50"
        visible={true}
      />
    </div>
  );
}

export default Loader;
