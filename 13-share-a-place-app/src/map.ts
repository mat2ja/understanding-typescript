export const apiKey = process.env.API_KEY;

// Create the script tag, set the appropriate attributes
const script = document.createElement('script');
script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
script.async = true;

// Append the 'script' element to 'head'
document.head.appendChild(script);
