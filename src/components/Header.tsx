import { FC } from "react";

// styles and other things
import styles from '../styles/components/header.module.scss';
import { STRING } from "../config/string";
import { AuthUserDetails, HeaderPropsInterface } from "../interface/interface";
import LocalstorageService from "../config/localstorage-services";



const Header: FC<HeaderPropsInterface> = ({ setIsModalOpen }) => {
  const data: AuthUserDetails = LocalstorageService.getLoggedInUserDetails();
  const userName = data?.name ? data.name[0] : ''

  return (
    <div className={styles.headerContainer}>
      <span className={styles.title}>{STRING.HEADER_TITLE}</span>
      <div className={styles.leftContainer}>
        <button onClick={() => setIsModalOpen(true)} className={styles.button}>{STRING.CREATE_TASK}</button>
        <div className={styles.userContainer}>
          {userName}
        </div>
      </div>

    </div>
  );
};



export default Header;
