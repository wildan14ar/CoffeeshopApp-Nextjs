"use client";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { orderByDistance, getDistance } from "geolib";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import HeadingPhone from "@/components/atoms/HeadingPhone";
import Modal from "@/components/Modal";
import Loader from "@/components/atoms/Loader";

const StorePage = () => {
  const [stores, setStores] = useState([]);
  const [currentPosition, setCurrentPosition] = useState(null);
  const [mapCenter, setMapCenter] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStore, setSelectedStore] = useState(null); // Local state for selected store

  const selectedStoreId = useSelector((state: any) => state.store.selectedStoreId); // Retrieve selected store ID from Redux

  useEffect(() => {
    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentPosition({ latitude, longitude });
        },
        (error) => {
          console.error("Error obtaining location:", error);
        },
        { enableHighAccuracy: true }
      );
    }

    // Fetch store data from API
    const fetchStores = async () => {
      const response = await fetch("/api/store");
      const data = await response.json();
      setStores(data);
    };

    fetchStores();
  }, []);

  // Sort stores by distance
  useEffect(() => {
    if (currentPosition && stores.length > 0) {
      const sortedStores = orderByDistance(
        currentPosition,
        stores.map((store) => ({
          latitude: parseFloat(store.details.latitude),
          longitude: parseFloat(store.details.longitude),
          key: store.id,
        }))
      );

      const nearestStore = stores.find(
        (store) => store.id === sortedStores[0]?.key
      );
      if (nearestStore) {
        setMapCenter({
          lat: parseFloat(nearestStore.details.latitude),
          lng: parseFloat(nearestStore.details.longitude),
        });
      }
    }
  }, [currentPosition, stores]);

  const handleStoreSelect = (store) => {
    setSelectedStore(store); // Set selected store in local state
    setMapCenter({
      lat: parseFloat(store.details.latitude),
      lng: parseFloat(store.details.longitude),
    });
    setIsModalOpen(true); // Show confirmation modal
  };

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  if (!isLoaded || !currentPosition) return <Loader />;

  return (
    <div className="store-page text-white">
      <HeadingPhone name="Store" />
      {/* Google Map */}
      <div className="relative h-64 mb-4">
        <GoogleMap
          zoom={14}
          center={mapCenter}
          mapContainerStyle={{ height: "100%", width: "100%" }}
          className="rounded-lg overflow-hidden"
        >
          {stores.map((store) => (
            <Marker
              key={store.id}
              position={{
                lat: parseFloat(store.details.latitude),
                lng: parseFloat(store.details.longitude),
              }}
            />
          ))}
        </GoogleMap>
      </div>

      {/* Store List */}
      <ul className="space-y-4 p-2">
        {stores.map((store) => (
          <li
            key={store.id}
            onClick={() => handleStoreSelect(store)} // Pass entire store object
            className={`p-4 bg-gray-800 rounded-lg cursor-pointer ${
              selectedStoreId === store.id
                ? "border border-purple-600" // Highlight selected store
                : "border border-gray-700" // Default border for unselected stores
            }`}
          >
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-semibold">{store.name}</h2>
              <button className="text-gray-500 hover:text-gray-400">
                <i className="fas fa-info-circle"></i>
              </button>
            </div>
            <p className="text-sm text-gray-400">{store.address}</p>

            {/* Display distance if available */}
            {currentPosition &&
              store.details.latitude &&
              store.details.longitude && (
                <p className="text-purple-500 mt-2">
                  {(
                    getDistance(currentPosition, {
                      latitude: parseFloat(store.details.latitude),
                      longitude: parseFloat(store.details.longitude),
                    }) / 1000
                  ).toFixed(2)}{" "}
                  km away
                </p>
              )}
          </li>
        ))}
      </ul>

      {/* Confirmation Modal */}
      {isModalOpen && (
        <Modal
          onClose={() => setIsModalOpen(false)}
          storeDetails={selectedStore} // Pass the selected store details
        />
      )}
    </div>
  );
};

export default StorePage;
