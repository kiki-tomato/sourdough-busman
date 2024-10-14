import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import styles from "./BtnClose.module.css";
import Button from "./Button";
import ShareLink from "./ModalShare";

import { useBakeryInfo } from "../hooks/useBakeryInfo";

function BtnClose({ isModalOpen, setIsModalOpen }) {
  const { t } = useTranslation();
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
        <Button type="bookmark" id={id}>
          {t("buttons.bookmark")}
        </Button>
        <button className={styles.btnIcon} onClick={handleShare}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className={styles.iconShare}
            id="btn-share"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
            />
          </svg>
        </button>
      </div>
      {isModalOpen && (
        <ShareLink currentUrl={currentUrl} setIsModalOpen={setIsModalOpen} />
      )}
    </div>
  );
}

export default BtnClose;
