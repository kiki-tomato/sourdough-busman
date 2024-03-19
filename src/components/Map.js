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
            content: `<div class="marker-container">${bakery.name}</div>`,
            size: new naver.maps.Size(10, 10),
            anchor: new naver.maps.Point(40, 20),
          },
        });
      });

      const infoWindows = bakeryData.map((bakery) => {
        return new naver.maps.InfoWindow({
          content: `
          <div class="infoWindow">
          <div>${bakery.name}</div>
          <div>${bakery.address}</div>
          <button class="info-window-btn"><a>네이버지도에서 자세히 보기</a></button>
          </div>`,
          disableAnchor: true,
          borderWidth: 0,
          backgroundColor: "transparent",
          pixelOffset: new naver.maps.Point(20, -20),
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

          markers.forEach((marker, i) => {
            marker.eventTarget.classList.remove("active-marker");
            marker.setZIndex(1);
          });

          markers[seq].eventTarget.classList.add("active-marker");
          markers[seq].setZIndex(100);
        };
      }

      function getMouseOverHandler(seq) {
        return function (e) {
          markers[seq].setZIndex(110);
          markers[seq].eventTarget.classList.add("hover-marker");
        };
      }

      function getMouseOutHandler(seq) {
        return function (e) {
          markers[seq].eventTarget.classList.remove("hover-marker");

          if (markers[seq].eventTarget.classList.contains("active-marker"))
            markers[seq].setZIndex(100);
          else markers[seq].setZIndex(1);
        };
      }

      for (var i = 0, ii = markers.length; i < ii; i++) {
        naver.maps.Event.addListener(markers[i], "click", getClickHandler(i));
        naver.maps.Event.addListener(
          markers[i],
          "mouseover",
          getMouseOverHandler(i)
        );
        naver.maps.Event.addListener(
          markers[i],
          "mouseout",
          getMouseOutHandler(i)
        );
      }

      places.forEach((el, i) => {
        el.addEventListener("click", getClickHandler(i));
      });

      const btnMyLocation = '<img class="button">';
      const customControl = new naver.maps.CustomControl(btnMyLocation, {
        position: naver.maps.Position.RIGHT_BOTTOM,
      });

      naver.maps.Event.once(map, "init", function () {
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
