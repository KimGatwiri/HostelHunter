// import {Link} from'rect-router-dom'
// import React from "react";
// import { useParams } from "react-router-dom";
// import { useQuery } from "react-query";

// const HostelCards = () => {
//   const { id } = useParams();
//   console.log(id);

//   const { isLoading, isError, error, data: hostel } = useQuery({
//     queryKey: ["hostel", id],
//     queryFn: async () => {
//       const response = await fetch(`http://localhost:4000/HostelDetails/${id}`, {
//         credentials: "include",
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         console.log('Error data:', errorData);
//         throw new Error(errorData.message || "Failed to fetch hostel");
//       }

//       return response.json();
//     },
//   });

//   if (isLoading) {
//     return (
//       <h2 className="text-3xl text-center font-semibold mt-5">
//         Loading... Please Wait...
//       </h2>
//     );
//   }

//   if (isError) {
//     return (
//       <h2 className="text-3xl text-center font-semibold mt-5 text-red-500">
//         {error.message}
//       </h2>
//     );
//   }

//   return (
//     <div className="bg-white border rounded-lg shadow-lg overflow-hidden">
//       <img
//         src={hostel.imageUrl}
//         alt={hostel.name}
//         className="w-full h-48 object-cover"
//       />
//       <div className="p-4">
//         <h3 className="text-xl font-semibold">{hostel.name}</h3>
//         <p className="text-gray-600">{hostel.location}</p>
//         <p className="mt-2">Room Type: {hostel.roomType}</p>
//         <p className="mt-2">Rooms Available: {hostel.roomsCount}</p>
//         <p className="mt-2">Price per Room: ${hostel.pricePerRoom}</p>
//         <Link
//             to={`/login`}
//             className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-200 inline-block text-center"
//         >
//             Book Now
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default HostelCards;
