import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

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
  bookmarks,
  setBookmarks,
  UpdateBookmarks,
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

      const hash = window.location.hash.slice(1);

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

      const generateMarkerMarkup = function (content) {
        return `<div class="marker" data-id=${content.id}>${content.name}</div>`;
      };

      const generateInfoWindowMarkup = function (content) {
        const bakeryOpen = content.hours[today].open;
        const openingTime = Number(`${bakeryOpen?.hour}.${bakeryOpen?.min}`);
        const closingHour = content.hours[today].close?.hour;
        const closingMin = content.hours[today].close?.min;
        const shippingAvail = content.shippingService;
        const descriptionAvail = content.description;

        return `
        <div class="info-window">
          <div>✸ ${content.name}</div>
          <div>${content.address}</div>
          <div class="short-info">
              <div>${t("buttons.shortInfo")}</div>
              ${descriptionAvail ? `<div>"${content.description}"</div>` : ""}
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
          </div>
          <div class="info-window-btns">
            <a href=${content.naverMap} target="_blank" rel="noopener">
              <button class="btn-more-details" >${t(
                "buttons.moreDetails"
              )}</button>
            </a>
            <button class="btn-bookmark" data-id=${content.id}>${t(
          "buttons.bookmark"
        )}</button>
          </div>
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
              content: generateMarkerMarkup(bakery),
              size: new naver.maps.Size(10, 10),
              anchor: new naver.maps.Point(40, 20),
            },
          })
      );

      const infoWindows = filteredData.map(
        (bakery) =>
          new naver.maps.InfoWindow({
            content: generateInfoWindowMarkup(bakery),
            disableAnchor: true,
            borderWidth: 0,
            backgroundColor: "transparent",
            pixelOffset: new naver.maps.Point(20, -20),
          })
      );

      function openInfoWindow(id) {
        markers.forEach((marker, i) => {
          if (marker.eventTarget.dataset.id === id)
            infoWindows[i].open(map, marker);
        });
      }

      function markActiveList(id) {
        placeList.querySelectorAll(".place").forEach((place) => {
          place.classList.remove("active");
          if (place.dataset.id === id) place.classList.add("active");
        });
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

      function addIdToUrl(dataArr, id) {
        dataArr.forEach((data) => {
          if (data.id === id) window.history.pushState(null, "", `#${data.id}`);
        });
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
        naver.maps.Event.addListener(marker, "click", () => {
          openInfoWindow(marker.eventTarget.dataset.id);
          deactivateMarker(markers);
          activateMarker(marker);
          addIdToUrl(filteredData, marker.eventTarget.dataset.id);
          markActiveList(marker.eventTarget.dataset.id);
        });
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

      infoWindows.forEach((window) => {
        const windowEl = window.getContentElement();

        if (
          bookmarks.includes(windowEl.querySelector(".btn-bookmark").dataset.id)
        )
          windowEl.querySelector(".btn-bookmark").classList.add("bookmarked");

        windowEl.addEventListener("click", function (e) {
          const btnBookmark = e.target.closest(".btn-bookmark");

          if (btnBookmark) {
            const newBookmark = btnBookmark.dataset.id;
            btnBookmark.classList.toggle("bookmarked");

            UpdateBookmarks(newBookmark);
          }
        });
      });

      placeList.addEventListener("click", function (e) {
        const clickedPlace = e.target.closest(".place");
        const id = clickedPlace.dataset.id;

        openInfoWindow(id);
        addIdToUrl(filteredData, id);
        markActiveList(id);
        deactivateMarker(markers);
        markers.map((marker) =>
          marker.eventTarget.dataset.id === id ? activateMarker(marker) : ""
        );
      });

      window.addEventListener("load", () => {
        markActiveList(hash);
        openInfoWindow(window.location.hash.slice(1));
        deactivateMarker(markers);
        markers.map((marker) =>
          marker.eventTarget.dataset.id === hash ? activateMarker(marker) : ""
        );
      });

      naver.maps.Event.addListener(map, "click", function () {
        infoWindows.map((window) => (window.getMap() ? window.close() : ""));
        deactivateMarker(markers);
      });
      btnToMyLocation.addEventListener("click", returnToCurrentLocation);
    }
  }, [
    currentLocation,
    bakeryData,
    filteredData,
    today,
    currentTime,
    t,
    setBookmarks,
    bookmarks,
    UpdateBookmarks,
  ]);

  return <div ref={mapElement} className="map" id="naverMap"></div>;
}

export default Map;
