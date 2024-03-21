import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

function Map({
  bakeryData,
  currentLocation,
  currentDay,
  currentHour,
  openFiltered,
  shippingFiltered,
  dineInFiltered,
}) {
  const mapElement = useRef(null);
  const mapInitialized = useRef(false);
  const { t } = useTranslation();

  let filteredData = bakeryData;

  if (openFiltered) {
    const openFilteredData = bakeryData.filter(
      (bakery) =>
        bakery.hours[currentDay].open <= currentHour &&
        currentHour < bakery.hours[currentDay].close
    );

    filteredData = openFilteredData;

    if (dineInFiltered) {
      filteredData = openFilteredData.filter((bakery) => bakery.dineIn);
    }

    if (shippingFiltered) {
      filteredData = openFilteredData.filter(
        (bakery) => bakery.shippingService
      );
    }

    if (dineInFiltered && shippingFiltered) {
      filteredData = openFilteredData.filter(
        (bakery) => bakery.dineIn && bakery.shippingService
      );
    }
  } else if (dineInFiltered) {
    const dineInFilteredData = bakeryData.filter((bakery) => bakery.dineIn);

    filteredData = dineInFilteredData;

    if (shippingFiltered) {
      filteredData = dineInFilteredData.filter(
        (bakery) => bakery.shippingService
      );
    }
  } else if (shippingFiltered) {
    filteredData = bakeryData.filter((bakery) => bakery.shippingService);
  }

  useEffect(() => {
    const { naver } = window;

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

      const markers = filteredData.map((bakery) => {
        return new naver.maps.Marker({
          position: new naver.maps.LatLng(
            bakery.location.latitude,
            bakery.location.longitude
          ),
          map: map,
          icon: {
            content: `<div class="marker">${bakery.name}</div>`,
            size: new naver.maps.Size(10, 10),
            anchor: new naver.maps.Point(40, 20),
          },
        });
      });

      const infoWindows = filteredData.map((bakery) => {
        return new naver.maps.InfoWindow({
          content: `
          <div class="infoWindow">
          <div>${bakery.name}</div>
          <div>${bakery.address}</div>
          <button class="btn-more-details"><a>${t(
            "buttons.moreDetails"
          )}</a></button>
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

          // if (document.querySelector(".container").classList.contains("grid")) {
          //   infoWindow.close();
          // }
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

      places.forEach((place, i) =>
        place.addEventListener("click", getClickHandler(i))
      );

      document
        .querySelector(".btn-to-my-location")
        .addEventListener("click", function () {
          map.setCenter(
            new naver.maps.LatLng(
              currentLocation.latitude,
              currentLocation.longitude
            )
          );
        });

      // const btnMyLocation = '<img class="button">';

      // const customControl = new naver.maps.CustomControl(btnListView, {
      //   position: naver.maps.Position.RIGHT_BOTTOM,
      // });

      // naver.maps.Event.once(map, "init", function () {
      //   customControl.setMap(map);
      // });

      // naver.maps.Event.addDOMListener(
      //   customControl.getElement(),
      //   "click",
      //   function () {
      //     document.querySelector(".container").classList.toggle("grid");

      //     setBtn((on) => !on);

      //     console.log(customControl.getElement().children);

      //     // console.log(customControl.getElement().firstElementChild);
      //     // console.log(customControl.getElement().childNodes);
      //   }
      // );
    }
  }, [currentLocation, bakeryData, filteredData, t]);

  return <div ref={mapElement} className="map" id="naverMap"></div>;
}

export default Map;
