import React, { FC } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header";

// import style and other
import styles from '../../styles/components/layout.module.scss'
import { HeaderPropsInterface } from "../../interface/interface";

const Layout: FC<HeaderPropsInterface> = ({setIsModalOpen}) => {
  return (
  <div className={styles.mainContainer}>
      <Header setIsModalOpen={setIsModalOpen} />
      <Outlet/>
    </div>
  );
};

export default Layout;
