"use client";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";

export default function AddSchool() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [message, setMessage] = useState("");

  const onSubmit = async (data) => {
    const formData = new FormData();
    for (let key in data) {
      if (key === "image") formData.append("image", data.image[0]);
      else formData.append(key, data[key]);
    }

    try {
      const res = await axios.post("/api/schools", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage(res.data.message);
      reset(); // ✅ clear form after success
    } catch (err) {
      if (err.response && err.response.data.error) {
        setMessage(err.response.data.error);
      } else {
        setMessage("❌ Error adding school");
      }
    }
  };

  return (
    <div className="page-container">
      <h1>Add School</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("name", { required: true })} placeholder="School Name" />
        {errors.name && <p>Name is required</p>}

        <input {...register("address", { required: true })} placeholder="Address" />
        {errors.address && <p>Address is required</p>}

        <input {...register("city", { required: true })} placeholder="City" />
        {errors.city && <p>City is required</p>}

        <input {...register("state", { required: true })} placeholder="State" />
        {errors.state && <p>State is required</p>}

        <input {...register("contact", { required: true, pattern: /^[0-9]+$/ })} placeholder="Contact Number" />
        {errors.contact && <p>Contact must be numeric</p>}

        <input {...register("email", { required: true, pattern: /^\S+@\S+$/i })} placeholder="Email" />
        {errors.email && <p>Invalid email</p>}

        <input type="file" {...register("image", { required: true })} />
        {errors.image && <p>Image is required</p>}

        <button type="submit">Submit</button>
      </form>
      {message && (
        <p style={{ marginTop: "10px", color: message.startsWith("❌") ? "red" : "green" }}>
          {message}
        </p>
      )}
    </div>
  );
}
