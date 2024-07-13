# Sourdough Busan

## Project Description

Find and share sourdough bakeries in Busan.  
&nbsp;

## Built With

![Static Badge](https://img.shields.io/badge/React-61DAFB?style=for-the-badge) ![Static Badge](https://img.shields.io/badge/Naver%20Map%20API-03C75A?style=for-the-badge) ![Static Badge](https://img.shields.io/badge/Geolocation%20API-5A0FC8?style=for-the-badge) ![Static Badge](https://img.shields.io/badge/localStorage-AECBFA?style=for-the-badge) ![Static Badge](https://img.shields.io/badge/React%20Router-CA4245?style=for-the-badge) ![Static Badge](https://img.shields.io/badge/i18next-26A69A?style=for-the-badge)  
&nbsp;

## Features

| Feature                | Description                                                                                                                                                                                                                                |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Map and List           | - Read bakery data with i18next<br> - Display all bakeries on the map<br> - Display all bakeries in the list<br> - Display relevant information about each bakery                                                                          |
| Display Distance       | - Geolocation to calculate the distance between the user’s current location and each bakery<br> - Display the calculated distance for each bakery in the list<br> - Offer a sort-by-distance option                                        |
| Bookmark Places        | - Save interesting places in the browser using localStorage API<br> - On the saved button click, read the data from localStorage and display a list of it both on the map                                                                  |
| Filter Places          | - Offer multiple filters, including open status, dine-in availability, and shipping service availability, to save users time<br> - Display filtered data both on the map and in the list<br> - Show the number of filters currently in use |
| Store State in the URL | - Place the bakery ID parameter and filter query strings in the URL with React Router<br> - Retrieve each bakery’s information and applied filters using state from the URL and display them on the screen                                 |
| Language Options       | - Toggle between Korean and English language options using i18next                                                                                                                                                                         |

&nbsp;

## Problem Solving Process

#### Cleaning Up Redundant Elements for Performance

- Problem Identification: The website slowed down over time due to the duplication of map and marker elements on every re-execution of the useEffect
- Solution:
  - Used one useEffect per purpose to avoid unnecessary side effects
  - Ensured cleanup of side effects, such as removing markers from the map and detaching event listeners
  - Created a separate info-window component and positioned it on the map to avoid additional duplicates
- Outcome: Smoother user experience with better performance by preventing the duplication of elements  
  &nbsp;

#### Handling API Key to Load the Map for Practicality

- Problem Identification : Using a server-side proxy to hide the API key wasn’t cost-efficient for this project, despite the potential risks of exposing the API key on the client side
- Solution :
  - Researched how other services manage API keys for map integrations
  - Found that many services use the map API with the API key exposed because the benefits outweigh the risks, especially when API key restrictions are properly implemented
- Outcome : Reduced the app building time by including the API key directly in the HTML and restricting the API key to specific URLs, while maintaining a reasonable level of security  
  &nbsp;

## Improvement Ideas

- Ability to store the location state in the URL to read data and display
- Ability to share certain locations with others
- More realistic error and confirmation messages
