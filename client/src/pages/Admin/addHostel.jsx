import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";

const uploadImage = async (image) => {
  try {
    const form = new FormData();
    form.append("file", image);
    form.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: form,
      },
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error?.message || "Failed to upload image");
    }

    const data = await res.json();
    return data.secure_url;
  } catch (error) {
    console.error("Error uploading image:", error.message);
    throw error; // Re-throw the error to propagate it
  }
};

const addHostel = async (hostelData) => {
  try {
    const res = await fetch("http://localhost:4000/addHostel", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(hostelData),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to add hostel");
    }

    return await res.json();
  } catch (error) {
    console.error("Error adding hostel to the server:", error.message);
    throw error; // Re-throw the error to propagate it
  }
};

const AddHostel = () => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    roomType: "",
    roomsCount: 0,
    pricePerRoom: 0.0,
    image: null,
  });
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      try {
        // Step 1: Upload image
        console.log("Starting image upload...");
        const imageUrl = await uploadImage(formData.image);
        console.log("Image uploaded successfully:", imageUrl);

        // Step 2: Add hostel with the image URL
        console.log("Sending hostel data to the server...");
        return addHostel({ ...formData, imageUrl });
      } catch (error) {
        console.error("Error in mutation function:", error.message);
        throw error;
      }
    },
    onSuccess: () => {
      alert("Hostel added successfully!");
      queryClient.invalidateQueries(["hostels"]); // Update the hostels list
      navigate("hostels");
    },
    onError: (error) => {
      console.error("Error in onError handler:", error.message);
      alert("Error adding hostel: " + error.message);
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Convert roomsCount to an integer if the field name is "roomsCount"
    if (name === "roomsCount") {
      setFormData({ ...formData, [name]: parseInt(value, 10) });
    } else if (name === "pricePerRoom") {
      // Convert pricePerRoom to a float
      setFormData({ ...formData, [name]: parseFloat(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (!formData.image) {
        alert("Please upload an image!");
        return;
      }
      console.log("Submitting form data:", formData);
      mutation.mutate(); // Trigger the mutation
    } catch (error) {
      console.error("Error in handleSubmit:", error.message);
    }
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
          value={formData.roomsCount}
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
          value={formData.pricePerRoom}
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
