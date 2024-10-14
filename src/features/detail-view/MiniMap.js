import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import styles from "./MiniMap.module.css";

import { useBakeryInfo } from "../../hooks/useBakeryInfo";
import { useMap } from "../../hooks/useMap";
import Button from "../../ui/Button";

const { naver } = window;

function MiniMap() {
  const { t } = useTranslation();
  const { lat, lng, naverMap } = useBakeryInfo();
  const { mapObj, mapElement } = useMap(lat, lng, 13);

  useEffect(() => {
    let marker;

    function createMarker() {
      const markerOption = {
        position: new naver.maps.LatLng(lat, lng),
        map: mapObj,
      };

      marker = new naver.maps.Marker(markerOption);
    }

    if (mapObj) {
      createMarker();
    }

    return () => {
      function clearMarkers() {
        marker?.setMap(null);
      }

      clearMarkers();
    };
  }, [mapObj, lat, lng]);

  return (
    <div className={styles.locationInfo}>
      <h3 className={styles.heading}>{t("info.location")}</h3>
      <Button type="link" url={naverMap}>
        {t("buttons.link")}
      </Button>
      <div ref={mapElement} id="naverMap" className={styles.miniMap}></div>
    </div>
  );
}

export default MiniMap;
