import { GoogleGeocodeResponse, Location } from './results.model';
import axios from 'axios';
import { apiKey } from './map';

declare var window: any;

// Attach your callback function to the `window` object
window.initMap = () => {};

const addressTitle = document.querySelector('h1')!;
const mapEl = document.getElementById('map')!;
const form = document.querySelector('form') as HTMLFormElement;
const addressInput = document.getElementById('address') as HTMLInputElement;

const baseUrl = `https://maps.googleapis.com`;
const addressUrl = `${baseUrl}/maps/api/geocode/json`;

const searchAddressHandler = async (e: Event) => {
  e.preventDefault();
  const enteredAddress = addressInput.value;

  try {
    const { data } = await axios.get<GoogleGeocodeResponse>(addressUrl, {
      params: {
        address: enteredAddress,
        key: apiKey,
      },
    });

    const { results, status } = data;

    if (status !== 'OK') {
      throw new Error('Could not fetch location!');
    }

    const [firstResult] = results;
    const {
      geometry: { location },
      formatted_address,
    } = firstResult;

    addressTitle.textContent = formatted_address;
    renderMap(location);
  } catch (error) {
    console.log(error);
  }
};

const renderMap = (coordinates: Location) => {
  const map = new google.maps.Map(mapEl, {
    center: coordinates,
    zoom: 16,
  });
  new google.maps.Marker({ position: coordinates, map: map });
};

form?.addEventListener('submit', searchAddressHandler);
