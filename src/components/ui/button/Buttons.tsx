// Styles
import styles from './styles.module.css';
import type { FC } from 'react';

const Button: FC = () => {
  return (
    <div className={styles['button-container']}>Button component</div>
  );
};

export default Button;
