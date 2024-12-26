import { Link, useLocation } from "react-router-dom";

import styles from "./BtnClose.module.scss";
import Button from "./Button";
import Icons from "./Icons";
import ModalShare from "./ModalShare";

import { useBakeryInfo } from "../hooks/useBakeryInfo";

function BtnClose({ isModalOpen, setIsModalOpen }) {
  const { search } = useLocation();

  const { id } = useBakeryInfo();

  const currentUrl = window.location.href;

  function handleShare() {
    setIsModalOpen((status) => !status);
  }

  return (
    <div className={styles.btnContainer}>
      <Link to={`/${search}`} className={styles.btnArrow}>
        <Icons name="iconArrowRight" />
      </Link>
      <div>
        <Button type="bookmark" id={id} />
        <Button type="share" event={handleShare} />
      </div>
      {isModalOpen && (
        <ModalShare currentUrl={currentUrl} setIsModalOpen={setIsModalOpen} />
      )}
    </div>
  );
}

export default BtnClose;
