import { useTranslation } from "react-i18next";
import { useEffect } from "react";

import Button from "../../ui/Button";
import styles from "./Section.module.scss";

import { useBakeryInfo } from "../../hooks/useBakeryInfo";
import { useMap } from "../../hooks/useMap";

const { naver } = window;

function Section({ type, heading }) {
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
    <section>
      <h3 className={styles.heading}>{heading}</h3>
      {type === "review" && <p>coming soon!</p>}
      {type === "mini-map" && (
        <>
          <Button type="link" url={naverMap}>
            {t("buttons.link")}
          </Button>
          <div ref={mapElement} id="naverMap" className={styles.miniMap}></div>
        </>
      )}
    </section>
  );
}

export default Section;
