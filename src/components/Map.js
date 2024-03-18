import { useEffect, useRef } from "react";

const { naver } = window;

function Map({ currentLocation, bakeryData }) {
  const mapElement = useRef(null);
  const mapInitialized = useRef(false);

  useEffect(() => {
    if (!mapInitialized.current && mapElement.current && naver.maps) {
      const mapContainer = document.getElementById("naverMap");
      const places = document.querySelectorAll(".place");

      const defaultLocation = new naver.maps.LatLng(35.1531696, 129.118666);

      const mapOptions = {
        center: defaultLocation,
        zoom: 12,
        zoomControl: true,
        minZoom: 6,
        zoomControlOptions: {
          style: naver.maps.ZoomControlStyle.SMALL,
          position: naver.maps.Position.TOP_RIGHT,
        },
        scaleControl: false,
        logoControl: false,
        mapDataControl: false,
      };

      const map = new naver.maps.Map(mapContainer, mapOptions);

      const markers = bakeryData.map((bakery) => {
        return new naver.maps.Marker({
          position: new naver.maps.LatLng(
            bakery.location.latitude,
            bakery.location.longitude
          ),
          map: map,
          icon: {
            content: [
              `<div class="marker-container" onmouseover="this.style.transform='scale(1.15)'" onmouseout="this.style.transform='scale(1)'" >${bakery.name}</div>`,
            ].join(""),
            size: new naver.maps.Size(10, 10),
            anchor: new naver.maps.Point(40, 20),
          },
        });
      });

      const infoWindows = bakeryData.map((bakery) => {
        return new naver.maps.InfoWindow({
          content: [
            '<div class="infoWindow">',
            `${bakery.name}`,
            "</div>",
          ].join(""),
          anchor: new naver.maps.Point(0, 0),
          anchorSkew: true,
          // pixelOffset: new naver.maps.Point(20, 0),
        });
      });

      function getClickHandler(seq) {
        return function (e) {
          const marker = markers[seq],
            infoWindow = infoWindows[seq];

          if (infoWindow.getMap()) {
            infoWindow.close();
          } else {
            infoWindow.open(map, marker);
          }

          markers.forEach((marker) =>
            marker.eventTarget.classList.remove("active-marker")
          );
          markers[seq].eventTarget.classList.add("active-marker");
        };
      }

      for (var i = 0, ii = markers.length; i < ii; i++) {
        naver.maps.Event.addListener(markers[i], "click", getClickHandler(i));
      }

      places.forEach((el, i) => {
        el.addEventListener("click", getClickHandler(i));
      });

      naver.maps.Event.once(map, "init", function () {
        const btnMyLocation = '<img class="button">';
        const customControl = new naver.maps.CustomControl(btnMyLocation, {
          position: naver.maps.Position.RIGHT_BOTTOM,
        });

        customControl.setMap(map);

        naver.maps.Event.addDOMListener(
          customControl.getElement(),
          "click",
          function () {
            map.setCenter(
              new naver.maps.LatLng(
                currentLocation.latitude,
                currentLocation.longitude
              )
            );
          }
        );
      });
    }
  }, [currentLocation, bakeryData]);

  return <div ref={mapElement} className="map" id="naverMap"></div>;
}

export default Map;
