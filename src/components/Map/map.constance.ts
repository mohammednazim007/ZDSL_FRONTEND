import L, { LatLngBounds } from 'leaflet'
// Define the bounds of Bangladesh
export const bangladeshBounds = new LatLngBounds([
  [20.55, 88.03], // South-West (South of Khulna)
  [26.75, 92.68], // North-East (North of Sylhet)
])

// Create a custom marker icon with the desired color
export const customMarkerIcon = new L.Icon({
  iconUrl: 'https://i.imghippo.com/files/kY1ZT1727559255.png', // Your custom marker image
  iconSize: [50, 55], // Adjust size as needed
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
// // {
//   position: [23.8103, 90.4125],
//   popup: (
//     <div className="flex flex-col gap-y-4">
//       <img
//         src="https://cms.shantaholdings.com/media/images/shwapnoneer_2_8.2e16d0ba.fill-650x650-c0.format-avif.avif"
//         alt="property"
//         srcSet="https://cms.shantaholdings.com/media/images/shwapnoneer_2_8.2e16d0ba.fill-650x650-c0.format-avif.avif"
//         className="rounded-md object-contain"
//       />

//       <div>
//         <div className="text-left flex flex-col gap-y-2">
//           <div className="flex flex-col gap-y-0.5">
//             <h1 className="text-xl font-bold text-olive-600">
//               SHWAPNONEER
//             </h1>
//             <p className="text-gray-700 !my-0">Bashundhara R/A</p>
//           </div>

//           <div className="flex flex-col gap-y-1">
//             <h2 className="text-lg font-semibold text-gray-900 my-0">
//               Project Details
//             </h2>

//             <ul className="text-gray-800">
//               <li>
//                 <span className="font-semibold">Architect:</span> Ar. Nahas
//                 Ahmed Khalil
//               </li>
//               <li>
//                 <span className="font-semibold">Land Area:</span> 28.66
//                 kathas
//               </li>
//               <li>
//                 <span className="font-semibold">
//                   Orientation of the Land:
//                 </span>{' '}
//                 North-South
//               </li>
//               <li>
//                 <span className="font-semibold">Number of Floors:</span> 14
//               </li>
//               <li>
//                 <span className="font-semibold">Number of Apartments:</span>{' '}
//                 48
//               </li>
//               <li>
//                 <span className="font-semibold">Size of Units:</span> 2,663
//                 sft - 3,664 sft
//               </li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   ),
// },
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
