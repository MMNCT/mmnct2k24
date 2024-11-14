// src/components/UserOrganisersForm.jsx
import React, { useState } from "react";
import { db, storage } from "../../components/db/Firebase"; // Adjust the path as needed
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const UserOrganisersForm = () => {
  const branches = [
    "Artificial Intelligence",
    "Chemical Engineering",
    "Civil Engineering",
    "Computer Science and Engineering",
    "Electrical Engineering",
    "Electronics Engineering",
    "Mechanical Engineering",
    "MSc Mathematics",
    "MSc Chemistry",
    "MSc Physics",
  ];

  const positions = [
    "President",
    "Coordinator",
    "Developer",
    "Designer",
    "Content Writer",
    "Infra and In-House",
    "sponsorship",
    "scorer"
  ];
  const [imagePreview, setImagePreview] = useState(null);

  const [formData, setFormData] = useState({
    branch: "",
    edition: "",
    github: "",
    ig: "",
    image: null,
    linkedin: "",
    name: "",
    portfolio: "",
    position: "",
    year: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Preview URL for image
      const previewUrl = URL.createObjectURL(file);
      setFormData((prevData) => ({
        ...prevData,
        image: file,
      }));
      setImagePreview(previewUrl);
    }
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      let imageUrl = "";

      if (formData.image) {
        // Create a unique file name
        const timestamp = Date.now();
        const storageRef = ref(storage, `team/${formData.name}_${timestamp}`);

        // Upload the image
        const snapshot = await uploadBytes(storageRef, formData.image);

        // Get the download URL
        imageUrl = await getDownloadURL(snapshot.ref);
      }

      // Prepare data to be saved
      const dataToSave = {
        branch: formData.branch,
        edition: formData.edition,
        github: formData.github,
        ig: formData.ig,
        img_url: imageUrl, // Store the image URL
        linkedin: formData.linkedin,
        name: formData.name,
        portfolio: formData.portfolio,
        position: formData.position,
        year: formData.year, // Optional: Timestamp
      };

      // Add the document to Firestore
      await addDoc(collection(db, "team"), dataToSave);

      setSuccess("Organiser details added successfully!");
      setFormData({
        branch: "",
        edition: "",
        github: "",
        ig: "",
        image: null,
        linkedin: "",
        name: "",
        portfolio: "",
        position: "",
        year: "",
      });
      setImagePreview(null);
    } catch (err) {
      console.error("Error adding document: ", err);
      setError("Failed to add organiser details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md mt-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="text-2xl font-semibold mb-6 text-gray-800 text-center underline">
          Add Organiser Details
        </div>

        {/* Success and Error Messages */}
        {success && (
          <div className="p-4 mb-4 text-green-700 bg-green-100 rounded">
            {success}
          </div>
        )}
        {error && (
          <div className="p-4 mb-4 text-red-700 bg-red-100 rounded">
            {error}
          </div>
        )}

        <div className="space-y-4">
          {/* Branch */}
          <div className="flex flex-col">
            <label htmlFor="branch" className="text-sm mb-1 text-gray-600">
              Branch
            </label>
            <select
              id="branch"
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              required
              className="px-3 py-2 bg-white rounded-md border border-gray-300"
            >
              <option value="">Select Branch</option>
              {branches.map((branch) => (
                <option key={branch} value={branch}>
                  {branch}
                </option>
              ))}
            </select>
          </div>

          {/* Edition */}
          <div className="flex flex-col">
            <label htmlFor="edition" className="text-sm mb-1 text-gray-600">
              Edition
            </label>
            <input
              type="text"
              id="edition"
              name="edition"
              value={formData.edition}
              onChange={handleChange}
              required
              className="px-3 py-2 bg-white rounded-md border border-gray-300"
            />
          </div>

          {/* GitHub URL */}
          <div className="flex flex-col">
            <label htmlFor="github" className="text-sm mb-1 text-gray-600">
              GitHub URL
            </label>
            <input
              type="url"
              id="github"
              name="github"
              value={formData.github}
              onChange={handleChange}
              
              className="px-3 py-2 bg-white rounded-md border border-gray-300"
            />
          </div>

          {/* Instagram */}
          <div className="flex flex-col">
            <label htmlFor="ig" className="text-sm mb-1 text-gray-600">
              Instagram
            </label>
            <input
              type="text"
              id="ig"
              name="ig"
              value={formData.ig}
              onChange={handleChange}
              
              className="px-3 py-2 bg-white rounded-md border border-gray-300"
            />
          </div>

          {/* Profile Image */}
          <div className="flex flex-col">
            <label htmlFor="image" className="text-sm mb-1 text-gray-600">
              Profile Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              required
              className="px-3 py-2 bg-white rounded-md border border-gray-300"
            />
            {imagePreview && (
              <div className="mt-2">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="h-32 w-32 object-cover rounded-md"
                />
              </div>
            )}
          </div>

          {/* LinkedIn URL */}
          <div className="flex flex-col">
            <label htmlFor="linkedin" className="text-sm mb-1 text-gray-600">
              LinkedIn URL
            </label>
            <input
              type="url"
              id="linkedin"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleChange}
              
              className="px-3 py-2 bg-white rounded-md border border-gray-300"
            />
          </div>

          {/* Name */}
          <div className="flex flex-col">
            <label htmlFor="name" className="text-sm mb-1 text-gray-600">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="px-3 py-2 bg-white rounded-md border border-gray-300"
            />
          </div>

          {/* Portfolio URL */}
          <div className="flex flex-col">
            <label htmlFor="portfolio" className="text-sm mb-1 text-gray-600">
              Portfolio URL
            </label>
            <input
              type="url"
              id="portfolio"
              name="portfolio"
              value={formData.portfolio}
              onChange={handleChange}
              
              className="px-3 py-2 bg-white rounded-md border border-gray-300"
            />
          </div>

          {/* Position */}
          <div className="flex flex-col">
            <label htmlFor="position" className="text-sm mb-1 text-gray-600">
              Position
            </label>
            <select
              id="position"
              name="position"
              value={formData.position}
              onChange={handleChange}
              required
              className="px-3 py-2 bg-white rounded-md border border-gray-300"
            >
              <option value="">Select Position</option>
              {positions.map((position) => (
                <option key={position} value={position.toLowerCase()}>
                  {position}
                </option>
              ))}
            </select>
          </div>

          {/* Year */}
          <div className="flex flex-col">
            <label htmlFor="year" className="text-sm mb-1 text-gray-600">
              Year
            </label>
            <input
              type="text"
              id="year"
              name="year"
              value={formData.year}
              onChange={handleChange}
              required
              className="px-3 py-2 bg-white rounded-md border border-gray-300"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full mt-6 px-4 py-2 rounded-md text-white ${
            loading
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          } transition-colors duration-200 focus:ring-2 focus:ring-blue-200`}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default UserOrganisersForm;
