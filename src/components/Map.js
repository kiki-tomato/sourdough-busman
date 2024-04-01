import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import arrow from "../assets/arrow_forward.svg";

function Map({
  bakeryData,
  currentLocation,
  currentDay,
  currentTime,
  openFiltered,
  shippingFiltered,
  dineInFiltered,
  distanceFiltered,
}) {
  const mapElement = useRef(null);
  const mapInitialized = useRef(false);
  const { t } = useTranslation();

  let filteredData = bakeryData;

  if (openFiltered) {
    const openFilteredData = bakeryData
      .filter((bakery) => {
        return bakery.hours[currentDay].open;
      })
      .filter(
        (bakery) =>
          Number(
            `${bakery.hours[currentDay].open.hour}.${bakery.hours[currentDay].open.min}`
          ) <= currentTime &&
          currentTime <
            Number(
              `${bakery.hours[currentDay].close.hour}.${bakery.hours[currentDay].close.min}`
            )
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

    if (distanceFiltered) {
      filteredData = openFilteredData
        .slice()
        .sort((a, b) => a.distance - b.distance);
    }
    if (dineInFiltered && shippingFiltered) {
      filteredData = openFilteredData.filter(
        (bakery) => bakery.dineIn && bakery.shippingService
      );
    }

    if (dineInFiltered && distanceFiltered) {
      filteredData = openFilteredData
        .slice()
        .sort((a, b) => a.distance - b.distance)
        .filter((bakery) => bakery.dineIn);
    }

    if (shippingFiltered && distanceFiltered) {
      filteredData = openFilteredData
        .filter((bakery) => bakery.shippingService)
        .sort((a, b) => a.distance - b.distance);
    }

    if (dineInFiltered && shippingFiltered && distanceFiltered) {
      filteredData = openFilteredData
        .filter((bakery) => bakery.shippingService)
        .sort((a, b) => a.distance - b.distance)
        .filter((bakery) => bakery.dineIn);
    }
  } else if (dineInFiltered) {
    const dineInFilteredData = bakeryData.filter((bakery) => bakery.dineIn);

    filteredData = dineInFilteredData;

    if (shippingFiltered) {
      filteredData = dineInFilteredData.filter(
        (bakery) => bakery.shippingService
      );
    }

    if (distanceFiltered) {
      filteredData = dineInFilteredData
        .slice()
        .sort((a, b) => a.distance - b.distance);
    }

    if (shippingFiltered && distanceFiltered) {
      filteredData = dineInFilteredData
        .filter((bakery) => bakery.shippingService)
        .slice()
        .sort((a, b) => a.distance - b.distance);
    }
  } else if (shippingFiltered) {
    const shippingFilteredData = bakeryData.filter(
      (bakery) => bakery.shippingService
    );

    filteredData = shippingFilteredData;

    if (distanceFiltered) {
      filteredData = shippingFilteredData
        .slice()
        .sort((a, b) => a.distance - b.distance);
    }
  } else if (distanceFiltered) {
    const distanceFilteredData = bakeryData
      .slice()
      .sort((a, b) => a.distance - b.distance);

    filteredData = distanceFilteredData;
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
          <div class="info-window">
          <div>✸ ${bakery.name}</div>
          <div>${bakery.address}</div>
          <div class="extra-info">
            ${
              bakery.hours[currentDay].open
                ? `<span>${
                    currentTime <
                    Number(
                      `${bakery.hours[currentDay].open.hour}.${bakery.hours[currentDay].open.min}`
                    )
                      ? t("openStatus.notOpenYet")
                      : bakery.hours[currentDay].close.min === 0
                      ? t("openStatus.open", {
                          hour: bakery.hours[currentDay].close.hour - 12,
                          minute: "00",
                        })
                      : t("openStatus.open", {
                          hour: bakery.hours[currentDay].close.hour - 12,
                          minute: bakery.hours[currentDay].close.min,
                        })
                  }</span>`
                : `<span>${t("openStatus.closureDay")}</span>`
            }
            ${
              bakery.shippingService
                ? `<span>|</span>
                <span>${t("buttons.shippingAvailable")}</span>`
                : ""
            }
          </div>
          ${
            bakery.shippingService
              ? `<a href=${
                  bakery.onlineStore
                } target="_blank" rel="noopener" class="btn-to-order">${t(
                  "buttons.orderOnline"
                )}<img class="btn-arrow" src=${arrow} alt="arrow"/>
                </a>`
              : ""
          }
          <a href=${
            bakery.naverMap
          } target="_blank" rel="noopener"><button class="btn-more-details">${t(
            "buttons.moreDetails"
          )}</button></a>
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

      function returnToCurrentLocation() {
        map.setCenter(
          new naver.maps.LatLng(
            currentLocation.latitude,
            currentLocation.longitude
          )
        );
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
        .addEventListener("click", returnToCurrentLocation);
    }
  }, [currentLocation, bakeryData, filteredData, currentDay, currentTime, t]);

  return <div ref={mapElement} className="map" id="naverMap"></div>;
}

export default Map;
