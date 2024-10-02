import React from "react";
import ReactDOM from "react-dom";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { useDispatch } from "react-redux";
import { setSelectedStore } from "@/features/storeSlice"; // Import the setSelectedStore action

const Modal = ({ onClose, storeDetails }) => {
  const dispatch = useDispatch(); // Initialize dispatch

  const handleConfirm = (storeId) => {
    dispatch(setSelectedStore(storeId)); // Dispatch the action to Redux
    onClose(); // Optionally close the modal after confirming
  };

  if (!storeDetails) return null; // Ensure storeDetails is available

  const mapCenter = {
    lat: parseFloat(storeDetails.details.latitude),
    lng: parseFloat(storeDetails.details.longitude),
  };

  return ReactDOM.createPortal(
    <div className="fixed w-screen h-screen inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg w-full max-w-[400px] mx-auto relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <i className="fas fa-times"></i>
        </button>

        <div className="relative h-64 rounded-t-lg">
          <GoogleMap
            zoom={14}
            center={mapCenter}
            mapContainerStyle={{ height: "100%", width: "100%" }}
            className="rounded-t-lg overflow-hidden"
          >
            <Marker  className="rounded-t-lg" position={mapCenter} />
          </GoogleMap>
        </div>

        <div className="p-5 text-black flex flex-col gap-1">
          <h2 className="text-xl font-bold">Confirm Pickup Store:</h2>
          <h2 className="text-lg font-bold">{storeDetails.name}</h2>
          <h2 className="font-bold text-base">{storeDetails.address}</h2>
          <div className="flex justify-end space-x-2">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded"
            >
              Change Store
            </button>
            <button
              onClick={() => handleConfirm(storeDetails.id)} // Use handleConfirm for dispatching the action
              className="px-4 py-2 bg-purple-600 text-white rounded"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
