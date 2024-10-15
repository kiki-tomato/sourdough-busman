import { useLocation, useNavigate } from "react-router-dom";

import styles from "./BtnClose.module.css";
import Button from "./Button";
import ShareLink from "./ModalShare";

import { useBakeryInfo } from "../hooks/useBakeryInfo";

function BtnClose({ isModalOpen, setIsModalOpen }) {
  const { search } = useLocation();
  const navigate = useNavigate();

  const { id } = useBakeryInfo();

  const currentUrl = window.location.href;

  function handleClose() {
    navigate(`/${search}`);
  }

  function handleShare() {
    setIsModalOpen((status) => !status);
  }

  return (
    <div className={styles.btnContainer}>
      <button onClick={handleClose}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className={styles.iconArrow}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5 8.25 12l7.5-7.5"
          />
        </svg>
      </button>
      <div>
        <Button type="bookmark" id={id} />
        <Button type="share" event={handleShare} />
      </div>
      {isModalOpen && (
        <ShareLink currentUrl={currentUrl} setIsModalOpen={setIsModalOpen} />
      )}
    </div>
  );
}

export default BtnClose;
