import React, { useState } from 'react';
import { useLanguage } from '../store/language';

const MyFarms = () => {
  const {T, language, setLanguage} = useLanguage();
  const [farms, setFarms] = useState([
    {
      id: 1,
      name: "Home Field",
      location: "Punjab",
      currentCrop: "Wheat",
      area: "2.5 Hectares",
      status: "Active",
      plantingDate: "Oct 2024",
      expectedHarvest: "Apr 2025",
      soilType: "Loamy",
      irrigationType: "Drip"
    },
    {
      id: 2,
      name: "Green Valley Farm",
      location: "Maharashtra",
      currentCrop: "Sugarcane",
      area: "5.2 Hectares",
      status: "Active",
      plantingDate: "Feb 2024",
      expectedHarvest: "Feb 2025",
      soilType: "Clay",
      irrigationType: "Flood"
    },
    {
      id: 3,
      name: "Sunrise Agriculture",
      location: "Gujarat",
      currentCrop: "Cotton",
      area: "3.8 Hectares",
      status: "Preparing",
      plantingDate: "May 2024",
      expectedHarvest: "Dec 2024",
      soilType: "Sandy",
      irrigationType: "Sprinkler"
    },
    {
      id: 4,
      name: "River Side Farm",
      location: "West Bengal",
      currentCrop: "Rice",
      area: "4.1 Hectares",
      status: "Harvesting",
      plantingDate: "Jun 2024",
      expectedHarvest: "Nov 2024",
      soilType: "Clay",
      irrigationType: "Flood"
    }
  ]);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [farmToDelete, setFarmToDelete] = useState(null);

  const handleAddFarm = () => {
    console.log("Add new farm clicked");
    // This would typically open a modal or navigate to an add farm page
  };

  const handleEditFarm = (farmId) => {
    console.log(`Edit farm ${farmId}`);
    // This would typically open an edit modal or navigate to an edit page
  };

  const handleDeleteClick = (farm) => {
    setFarmToDelete(farm);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    if (farmToDelete) {
      setFarms(farms.filter(farm => farm.id !== farmToDelete.id));
      setShowDeleteModal(false);
      setFarmToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setFarmToDelete(null);
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'preparing':
        return 'bg-yellow-100 text-yellow-800';
      case 'harvesting':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCropIcon = (crop) => {
    switch (crop.toLowerCase()) {
      case 'wheat':
        return '🌾';
      case 'sugarcane':
        return '🎋';
      case 'cotton':
        return '🌸';
      case 'rice':
        return '🌾';
      default:
        return '🌱';
    }
  };

  return (
    <div className="p-6 font-sans bg-gray-50">
      <style>{`
        .stat-card {
            background-color: white;
            padding: 1.5rem;
            border-radius: 0.75rem;
            box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
        }
        .farm-card {
            background-color: white;
            border-radius: 0.75rem;
            box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
            transition: box-shadow 0.3s;
        }
        .farm-card:hover {
            box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
        }
        .lang-button {
            padding: 0.5rem 1rem;
            border-radius: 0.375rem;
            font-weight: 600;
            border: none;
            cursor: pointer;
            transition: background-color 0.2s, color 0.2s;
        }
      `}</style>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1">
              {T.myFarms.pageTitle}
            </h1>
            <p className="text-gray-600">
              {T.myFarms.pageSubtitle}
            </p>
          </div>
        </div>

         <div className="flex justify-end mb-8">
            <button
                onClick={handleAddFarm}
                className="flex items-center space-x-2 bg-green-700 hover:bg-green-800 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-transform transform hover:scale-105 active:scale-95"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                <span>{T.myFarms.addNewFarm}</span>
            </button>
         </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="stat-card">
              <div className="flex items-center">
                <div className="bg-green-100 p-3 rounded-full"><svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m0 0H5m0 0h4M7.5 8h9M7.5 12h9m-9 4h9" /></svg></div>
                <div className="ml-4"><p className="text-sm text-gray-600">{T.myFarms.totalFarms}</p><p className="text-2xl font-bold text-gray-900">{farms.length}</p></div>
              </div>
            </div>

            <div className="stat-card">
              <div className="flex items-center">
                <div className="bg-blue-100 p-3 rounded-full"><svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg></div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">{T.myFarms.totalArea}</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {farms.reduce((total, farm) => total + parseFloat(farm.area.split(' ')[0]), 0).toFixed(1)} Ha
                  </p>
                </div>
              </div>
            </div>

            <div className="stat-card">
              <div className="flex items-center">
                <div className="bg-yellow-100 p-3 rounded-full"><svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg></div>
                <div className="ml-4"><p className="text-sm text-gray-600">{T.myFarms.activeFarms}</p><p className="text-2xl font-bold text-gray-900">{farms.filter(f => f.status === 'Active').length}</p></div>
              </div>
            </div>

            <div className="stat-card">
              <div className="flex items-center">
                <div className="bg-purple-100 p-3 rounded-full"><svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" /></svg></div>
                <div className="ml-4"><p className="text-sm text-gray-600">{T.myFarms.cropTypes}</p><p className="text-2xl font-bold text-gray-900">{new Set(farms.map(f => f.currentCrop)).size}</p></div>
              </div>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {farms.map((farm) => (
            <div key={farm.id} className="farm-card overflow-hidden">
              <div className="bg-green-700 p-4 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3"><span className="text-2xl">{getCropIcon(farm.currentCrop)}</span><div><h3 className="text-lg font-semibold">{farm.name}</h3><p className="text-green-100 text-sm">{farm.location}</p></div></div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(farm.status)}`}>{farm.status}</span>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                    <div className="flex justify-between"><span className="text-sm text-gray-600">{T.myFarms.currentCrop}:</span><span className="font-semibold text-gray-800">{farm.currentCrop}</span></div>
                    <div className="flex justify-between"><span className="text-sm text-gray-600">{T.common.area}:</span><span className="font-semibold text-gray-800">{farm.area}</span></div>
                    <div className="flex justify-between"><span className="text-sm text-gray-600">{T.myFarms.soilType}:</span><span className="font-semibold text-gray-800">{farm.soilType}</span></div>
                    <div className="flex justify-between"><span className="text-sm text-gray-600">{T.common.irrigation}:</span><span className="font-semibold text-gray-800">{farm.irrigationType}</span></div>
                    <div className="pt-3 mt-2 border-t border-gray-200">
                        <p className="text-sm text-gray-500">{T.myFarms.planted}: {farm.plantingDate}</p>
                        <p className="text-sm text-gray-500">{T.myFarms.harvest}: {farm.expectedHarvest}</p>
                    </div>
                </div>
              </div>
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                <div className="flex space-x-3">
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-lg">{T.common.edit}</button>
                  <button className="flex-1 bg-red-600 hover:bg-red-700 text-white text-sm font-medium py-2 px-4 rounded-lg">{T.common.delete}</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {farms.length === 0 && (
          <div className="text-center py-16 bg-white rounded-lg shadow-md">
            <div className="bg-gray-100 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center"><svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m0 0H5m0 0h4M7.5 8h9M7.5 12h9m-9 4h9" /></svg></div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">{T.myFarms.noFarmsTitle}</h3>
            <p className="text-gray-600 mb-6">{T.myFarms.noFarmsSubtitle}</p>
            <button onClick={handleAddFarm} className="bg-green-700 hover:bg-green-800 text-white font-medium py-2 px-6 rounded-lg">{T.addFirstFarm}</button>
          </div>
        )}

        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-xl">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{T.myFarms.confirmDeletionTitle}</h3>
              <p className="text-gray-600 mb-6">{T.confirmDeletionText(farmToDelete?.name)}</p>
              <div className="flex space-x-3">
                <button onClick={handleDeleteCancel} className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300">{T.common.cancel}</button>
                <button onClick={handleDeleteConfirm} className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg">{T.common.delete}</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyFarms;
