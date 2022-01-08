import { GoogleGeocodeResponse } from './results.model';
import axios from 'axios';

const form = document.querySelector('form') as HTMLFormElement;
const addressInput = document.getElementById('address') as HTMLInputElement;

const apiKey = process.env.API_KEY;
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
      geometry: {
        location: { lat, lng },
      },
      formatted_address,
    } = firstResult;

    console.log(formatted_address, lat, lng);
  } catch (error) {
    console.log(error);
  }
};

form?.addEventListener('submit', searchAddressHandler);
