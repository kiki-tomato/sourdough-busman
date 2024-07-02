# Sourdough Busan

## Project Description

Find and share sourdough bakeries in Busan.  
&nbsp;

## Built With

![Static Badge](https://img.shields.io/badge/React-61DAFB?style=for-the-badge) ![Static Badge](https://img.shields.io/badge/Naver%20Map%20API-03C75A?style=for-the-badge) ![Static Badge](https://img.shields.io/badge/Geolocation%20API-5A0FC8?style=for-the-badge) ![Static Badge](https://img.shields.io/badge/i18next-26A69A?style=for-the-badge) ![Static Badge](https://img.shields.io/badge/localStorage-AECBFA?style=for-the-badge)  
&nbsp;

## Features

| Feature          | Description                                                                                                                                                                                                                                |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Map and List     | - Read bakery data with i18next<br> - Display all bakeries on the map<br> - Display all bakeries in the list<br> - Display relevant information about each bakery                                                                          |
| Display Distance | - Geolocation to calculate the distance between the user’s current location and each bakery<br> - Display the calculated distance for each bakery in the list<br> - Offer a sort-by-distance option                                        |
| Bookmark Places  | - Save interesting places in the browser using localStorage API<br> - On the saved button click, read the data from localStorage and display a list of it both on the map                                                                  |
| Filter Places    | - Offer multiple filters, including open status, dine-in availability, and shipping service availability, to save users time<br> - Display filtered data both on the map and in the list<br> - Show the number of filters currently in use |
| Language Options | - Toggle between Korean and English language options using i18next                                                                                                                                                                         |

&nbsp;

## Improvement Ideas

- Ability to store the location state in the URL to read data and
  display
- Ability to share certain locations with others
- Performance optimization for a better user experience
- More realistic error and confirmation messages
- Smooth navigation on the map
