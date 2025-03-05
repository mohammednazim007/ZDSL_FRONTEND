import L, { LatLngBounds } from 'leaflet'
// Define the bounds of Bangladesh
export const bangladeshBounds = new LatLngBounds([
  [20.55, 88.03], // South-West (South of Khulna)
  [26.75, 92.68], // North-East (North of Sylhet)
])

// Create a custom marker icon with the desired color
export const customMarkerIcon = new L.Icon({
  iconUrl: 'https://i.ibb.co.com/9pCdQVS/Component-323-1.png', // Your custom marker image
  iconSize: [25, 35], // Adjust size as needed
  iconAnchor: [17, 45], // Anchor point to center the icon
  popupAnchor: [0, -40], // Popup position relative to the icon
  shadowSize: [41, 41], // Optional: change or remove if no shadow is needed
})

export const markers: { position: [number, number]; popup: any }[] = [
  { position: [22.3569, 91.7832], popup: 'Chittagong' },
  { position: [22.8456, 89.5403], popup: 'Khulna' },
  { position: [22.701, 90.3535], popup: 'Barisal' },
  { position: [24.8898, 91.8697], popup: 'Sylhet' },
  { position: [24.3745, 88.6042], popup: 'Rajshahi' },
  { position: [25.7439, 89.2752], popup: 'Rangpur' },
  { position: [24.7471, 90.4203], popup: 'Mymensingh' },
  { position: [25.020663153441177, 90.01675839645145], popup: 'Sherpur' },
]

export const locationsArray = [
  { id: '1', place: 'Dhaka' },
  { id: '2', place: 'Chittagong' },
  { id: '3', place: 'Khulna' },
  { id: '4', place: 'Rajshahi' },
  { id: '5', place: 'Sylhet' },
  { id: '6', place: 'Barisal' },
  { id: '7', place: 'Rangpur' },
  { id: '8', place: 'Mymensingh' },
  { id: '9', place: '7 mohammedpur, dhaka' },
]
