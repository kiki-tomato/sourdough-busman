import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import arrow from "../assets/arrow_forward.svg";

function Map({
  bakeryData,
  currentLocation,
  today,
  currentTime,
  openFiltered,
  shippingFiltered,
  dineInFiltered,
  distanceFiltered,
  filterData,
}) {
  const mapElement = useRef(null);
  const mapInitialized = useRef(false);
  const { t } = useTranslation();
  const filterOptions = [
    today,
    currentTime,
    openFiltered,
    shippingFiltered,
    dineInFiltered,
    distanceFiltered,
  ];

  let filteredData = filterData(bakeryData, filterOptions);

  useEffect(() => {
    const { naver } = window;

    if (!mapInitialized.current && mapElement.current && naver.maps) {
      const mapContainer = document.getElementById("naverMap");
      const placeList = document.querySelector(".place-list");
      const btnToMyLocation = document.querySelector(".btn-to-my-location");

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

      const markerEl = function (content) {
        return `<div class="marker">${content.name}</div>`;
      };
      const infoWindowEl = function (content) {
        const bakeryOpen = content.hours[today].open;
        const openingTime = Number(`${bakeryOpen?.hour}.${bakeryOpen?.min}`);
        const closingHour = content.hours[today].close?.hour;
        const closingMin = content.hours[today].close?.min;
        const shippingAvail = content.shippingService;

        return `
        <div class="info-window">
          <div>✸ ${content.name}</div>
          <div>${content.address}</div>
          <div class="extra-info">
            ${
              bakeryOpen
                ? `<span>${
                    currentTime < openingTime
                      ? t("openStatus.notOpenYet")
                      : closingMin === 0
                      ? t("openStatus.open", {
                          hour: closingHour - 12,
                          minute: "00",
                        })
                      : t("openStatus.open", {
                          hour: closingHour - 12,
                          minute: closingMin,
                        })
                  }</span>`
                : `<span>${t("openStatus.closureDay")}</span>`
            }
            ${
              shippingAvail
                ? `<span>|</span>
                   <span>${t("buttons.shippingAvailable")}</span>`
                : ""
            }
          </div>
          ${
            shippingAvail
              ? `<a href=${
                  content.onlineStore
                } target="_blank" rel="noopener" class="btn-to-order">
                  ${t(
                    "buttons.orderOnline"
                  )}<img class="btn-arrow" src=${arrow} alt="arrow"/>
                </a>`
              : ""
          }
          <a href=${content.naverMap} target="_blank" rel="noopener">
            <button class="btn-more-details">${t(
              "buttons.moreDetails"
            )}</button>
          </a>
        </div>`;
      };

      const markers = filteredData.map(
        (bakery) =>
          new naver.maps.Marker({
            position: new naver.maps.LatLng(
              bakery.location.latitude,
              bakery.location.longitude
            ),
            map: map,
            icon: {
              content: markerEl(bakery),
              size: new naver.maps.Size(10, 10),
              anchor: new naver.maps.Point(40, 20),
            },
          })
      );

      const infoWindows = filteredData.map(
        (bakery) =>
          new naver.maps.InfoWindow({
            content: infoWindowEl(bakery),
            disableAnchor: true,
            borderWidth: 0,
            backgroundColor: "transparent",
            pixelOffset: new naver.maps.Point(20, -20),
          })
      );

      function openInfoWindow(marker, seq) {
        const infoWindow = infoWindows[seq];

        infoWindow.getMap() ? infoWindow.close() : infoWindow.open(map, marker);

        deactivateMarker(markers);
        activateMarker(marker);
      }

      function activateMarker(marker) {
        marker.eventTarget.classList.add("active-marker");
        marker.setZIndex(100);
      }

      function deactivateMarker(markerArr) {
        markerArr.map((marker) => {
          marker.setZIndex(1);
          return marker.eventTarget.classList.remove("active-marker");
        });
      }

      function magnifyMarker(marker) {
        return function (e) {
          marker.setZIndex(110);
          marker.eventTarget.classList.add("hover-marker");
        };
      }

      function downsizeMarker(marker) {
        return function (e) {
          marker.eventTarget.classList.remove("hover-marker");

          marker.eventTarget.classList.contains("active-marker")
            ? marker.setZIndex(100)
            : marker.setZIndex(1);
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

      markers.forEach((marker, i) => {
        naver.maps.Event.addListener(marker, "click", () =>
          openInfoWindow(marker, i)
        );
        naver.maps.Event.addListener(
          marker,
          "mouseover",
          magnifyMarker(marker)
        );
        naver.maps.Event.addListener(
          marker,
          "mouseout",
          downsizeMarker(marker)
        );
      });

      placeList.addEventListener("click", function (e) {
        const clickedListItem = e.target
          .closest(".place")
          .querySelector("h3").textContent;

        const [markerIndexPair] = markers
          .map((marker, i) =>
            marker.eventTarget.textContent === clickedListItem
              ? [marker, i]
              : ""
          )
          .filter((marker) => marker);
        const [marker, index] = markerIndexPair;

        openInfoWindow(marker, index);
      });

      btnToMyLocation.addEventListener("click", returnToCurrentLocation);
    }
  }, [currentLocation, bakeryData, filteredData, today, currentTime, t]);

  return <div ref={mapElement} className="map" id="naverMap"></div>;
}

export default Map;
