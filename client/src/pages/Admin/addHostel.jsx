import React, { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

const uploadImage = async (image) => {
  const formData = new FormData();
  formData.append("file", image);
  formData.append(
    "upload_preset",
    import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
  );

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: formData,
    },
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error?.message || "Image upload failed");
  }

  const data = await response.json();
  return data.secure_url;
};

const addHostel = async (hostelData) => {
  const response = await fetch("http://localhost:4000/addHostel", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(hostelData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to add hostel");
  }

  return await response.json();
};

const AddHostel = () => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    roomType: "",
    roomsCount: "",
    pricePerRoom: "",
    image: null,
    amenities: [],
  });

  const [amenityInput, setAmenityInput] = useState(""); // State for the amenity input field
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async () => {
      if (!formData.image) {
        throw new Error("Image is required");
      }

      const imageUrl = await uploadImage(formData.image);
      return addHostel({ ...formData, imageUrl });
    },
    onSuccess: (data) => {
      alert("Hostel added successfully!");
      navigate(`/hostel/${data.id}`);
    },
    onError: (error) => {
      alert(error.message || "Failed to add hostel");
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]:
        name === "roomsCount" || name === "pricePerRoom"
          ? value === ""
            ? ""
            : parseFloat(value)
          : value,
    }));
  };

  const handleImageChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      image: e.target.files[0],
    }));
  };

  const handleAmenityAdd = () => {
    if (amenityInput.trim() !== "") {
      setFormData((prevData) => ({
        ...prevData,
        amenities: [...prevData.amenities, amenityInput.trim()],
      }));
      setAmenityInput(""); // Clear the input field after adding the amenity
    }
  };

  const handleAmenityRemove = (amenity) => {
    setFormData((prevData) => ({
      ...prevData,
      amenities: prevData.amenities.filter((item) => item !== amenity),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate();
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
      <label className="block mb-2">
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
      </label>
      <label className="block mb-2">
        Location:
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
      </label>
      <label className="block mb-2">
        Room Type:
        <input
          type="text"
          name="roomType"
          value={formData.roomType}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
      </label>
      <label className="block mb-2">
        Rooms Count:
        <input
          type="number"
          name="roomsCount"
          value={formData.roomsCount || ""}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
      </label>
      <label className="block mb-2">
        Price Per Room:
        <input
          type="number"
          name="pricePerRoom"
          value={formData.pricePerRoom || ""}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
      </label>
      <label className="block mb-2">
        Image:
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          required
          className="w-full p-2 border rounded"
        />
      </label>
      <label className="block mb-2">
        Amenities:
        <div className="flex items-center mb-2">
          <input
            type="text"
            value={amenityInput}
            onChange={(e) => setAmenityInput(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Add an amenity"
          />
          <button
            type="button"
            onClick={handleAmenityAdd}
            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add
          </button>
        </div>
        <ul>
          {formData.amenities.map((amenity, index) => (
            <li key={index} className="flex items-center justify-between">
              {amenity}
              <button
                type="button"
                onClick={() => handleAmenityRemove(amenity)}
                className="text-red-500 ml-2"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </label>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        disabled={mutation.isLoading}
      >
        {mutation.isLoading ? "Uploading..." : "Add Hostel"}
      </button>
    </form>
  );
};

export default AddHostel;
