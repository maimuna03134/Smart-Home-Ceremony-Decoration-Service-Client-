import React, { useState } from "react";
import toast from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";
import { imageUpload } from "../../../utils";
import coverImg from '../../../assets/coverImage.avif'
import Loader from "../../shared/loader/Loader";
import { useTheme } from "../../../contexts/ThemeContext";

const MyProfile = () => {
  const { user, setUser, updateProfileInfo } = useAuth();
  const [role, isRoleLoading] = useRole();
  const { isDark } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  // Handle image preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };


  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    const form = e.target;
    const inputName = form.name?.value;
    const imageFile = form.image?.files[0];

    try {
      let imageUrl = user?.photoURL; 

      if (imageFile) {
        imageUrl = await imageUpload(imageFile);
      }

   
      await updateProfileInfo(inputName, imageUrl);

   
      setUser({ ...user, displayName: inputName, photoURL: imageUrl });

      toast.success("Profile updated successfully!");
      setIsModalOpen(false);
      setImagePreview(null);
    } catch (err) {
      toast.error(`Error: ${err.message}`);
    } finally {
      setIsUploading(false);
    }
  };


  if (isRoleLoading) {
    return <Loader/>
  }

  return (
    <div className="flex justify-center items-center min-h-screen py-8 px-4">
      <div className={`shadow-lg rounded-2xl md:w-4/5 lg:w-3/5 w-full ${
        isDark ? 'bg-gray-800' : 'bg-white'
      }`}>
        <img
          alt="cover photo"
          src={coverImg}
          className="w-full mb-4 rounded-t-lg h-56 object-cover"
        />
        <div className="flex flex-col items-center justify-center p-4 -mt-16">
          <div className="relative">
            <img
              alt="profile"
              src={user?.photoURL}
              className="mx-auto object-cover rounded-full h-24 w-24 border-4 border-white shadow-lg"
            />
          </div>

          <p className="p-2 px-4 text-xs text-white bg-primary rounded-full mt-3">
            {role}
          </p>

          <h2 className={`mt-3 text-2xl font-bold ${
            isDark ? 'text-white' : 'text-gray-800'
          }`}>
            {user?.displayName}
          </h2>

          <p className={`mt-1 text-sm ${
            isDark ? 'text-gray-400' : 'text-gray-500'
          }`}>{user?.email}</p>

          <div className={`w-full p-6 mt-6 rounded-lg ${
            isDark ? 'bg-gray-700' : 'bg-gray-50'
          }`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className={`p-4 rounded-lg shadow-sm ${
                isDark ? 'bg-gray-600' : 'bg-white'
              }`}>
                <p className={`text-xs uppercase tracking-wide ${
                  isDark ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  Full Name
                </p>
                <p className={`text-lg font-semibold mt-1 ${
                  isDark ? 'text-white' : 'text-gray-800'
                }`}>
                  {user?.displayName || "N/A"}
                </p>
              </div>

              <div className={`p-4 rounded-lg shadow-sm ${
                isDark ? 'bg-gray-600' : 'bg-white'
              }`}>
                <p className={`text-xs uppercase tracking-wide ${
                  isDark ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  Email Address
                </p>
                <p className={`text-lg font-semibold mt-1 break-all ${
                  isDark ? 'text-white' : 'text-gray-800'
                }`}>
                  {user?.email}
                </p>
              </div>

              <div className={`p-4 rounded-lg shadow-sm md:col-span-2 ${
                isDark ? 'bg-gray-600' : 'bg-white'
              }`}>
                <p className={`text-xs uppercase tracking-wide ${
                  isDark ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  User ID
                </p>
                <p className={`text-sm font-mono mt-1 break-all ${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {user?.uid}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-primary px-8 py-2.5 rounded-lg text-white font-medium cursor-pointer hover:bg-primary/90 transition-all shadow-md hover:shadow-lg"
              >
                Update Profile
              </button>
              
            </div>
          </div>
        </div>
      </div>

      {/* Update Profile Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`rounded-xl shadow-2xl p-6 w-full max-w-md relative ${
            isDark ? 'bg-gray-800' : 'bg-white'
          }`}>
            <h3 className="text-2xl font-bold text-primary mb-6 text-center">
              Update Profile
            </h3>

            <form
              onSubmit={handleUpdateProfile}
              className="flex flex-col gap-5"
            >
              {/* Name Input */}
              <div>
                <label className={`block font-semibold mb-2 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  defaultValue={user?.displayName || ""}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                  placeholder="Enter your name"
                  required
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className={`block font-semibold mb-2 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Profile Image
                </label>

                {/* Image Preview */}
                {(imagePreview || user?.photoURL) && (
                  <div className="mb-3 flex justify-center">
                    <img
                      src={imagePreview || user?.photoURL}
                      alt="Preview"
                      className="w-24 h-24 rounded-full object-cover border-4 border-primary/20"
                    />
                  </div>
                )}

                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className={`block w-full text-sm 
                    file:mr-4 file:py-2.5 file:px-4 
                    file:rounded-lg file:border-0 
                    file:text-sm file:font-semibold  
                    file:bg-primary/10 file:text-primary  
                    hover:file:bg-primary/20
                    border-2 border-dashed border-primary/30 
                    rounded-lg cursor-pointer py-3 px-2
                    hover:border-primary/50 transition-all ${
                      isDark 
                        ? 'bg-gray-700 text-gray-300' 
                        : 'bg-gray-50 text-gray-500'
                    }`}
                />
                <p className={`text-xs mt-2 ${
                  isDark ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  Leave empty to keep current image
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-2">
                <button
                  type="submit"
                  disabled={isUploading}
                  className="flex-1 px-4 py-2.5 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                >
                  {isUploading ? "Updating..." : "Save Changes"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setImagePreview(null);
                  }}
                  disabled={isUploading}
                  className="flex-1 px-4 py-2.5 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-all disabled:bg-gray-400 shadow-md hover:shadow-lg"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      
    </div>
  );
};

export default MyProfile;
