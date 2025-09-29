import React from 'react';
import { useLanguage } from '../store/language';

const CropRecommender = () => {
  const { T, language, setLanguage} = useLanguage();
  
  const farms = [
    { id: 1, name: "Home Field", location: "Punjab", currentCrop: "Wheat", area: "2.5 Hectares", soilType: "Loamy", nitrogen: 45, phosphorus: 25, potassium: 30, ph: 6.8 },
    { id: 2, name: "Green Valley Farm", location: "Maharashtra", currentCrop: "Sugarcane", area: "5.2 Hectares", soilType: "Clay", nitrogen: 60, phosphorus: 35, potassium: 40, ph: 7.2 },
    { id: 3, name: "Sunrise Agriculture", location: "Gujarat", currentCrop: "Cotton", area: "3.8 Hectares", soilType: "Sandy", nitrogen: 30, phosphorus: 20, potassium: 35, ph: 6.5 },
    { id: 4, name: "River Side Farm", location: "West Bengal", currentCrop: "Rice", area: "4.1 Hectares", soilType: "Clay", nitrogen: 55, phosphorus: 40, potassium: 45, ph: 6.9 }
  ];

  const [selectedFarm, setSelectedFarm] = React.useState('');
  const [formData, setFormData] = React.useState({ nitrogen: '', phosphorus: '', potassium: '', ph: '' });
  const [showResults, setShowResults] = React.useState(false);
  const [recommendation, setRecommendation] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const getCropRecommendation = (n, p, k, ph) => {
    const crops = [
      { name: "Rice", icon: "🌾", conditions: { n: [40, 80], p: [30, 60], k: [30, 50], ph: [6.0, 7.5] }, description: "Rice thrives in nutrient-rich, slightly acidic to neutral soil with good water retention. Perfect for your soil's balanced nutrient profile.", benefits: ["High yield potential", "Good market demand", "Suitable for your climate"] },
      { name: "Wheat", icon: "🌾", conditions: { n: [30, 60], p: [20, 40], k: [25, 45], ph: [6.0, 7.8] }, description: "Wheat is well-suited for your soil conditions, offering excellent growth with moderate nutrient requirements and good pH tolerance.", benefits: ["Stable market price", "Lower water requirements", "Good crop rotation option"] },
      { name: "Cotton", icon: "🌸", conditions: { n: [25, 50], p: [15, 35], k: [30, 55], ph: [5.5, 8.0] }, description: "Cotton performs excellently in your soil type with moderate nitrogen needs and good potassium availability.", benefits: ["High economic value", "Drought tolerant", "Long growing season"] },
      { name: "Sugarcane", icon: "🎋", conditions: { n: [50, 100], p: [25, 50], k: [35, 65], ph: [6.0, 8.0] }, description: "Sugarcane is ideal for your high-nutrient soil profile and will benefit from the excellent nitrogen and potassium levels.", benefits: ["Very high yield potential", "Long-term crop", "Multiple revenue streams"] },
      { name: "Maize", icon: "🌽", conditions: { n: [35, 70], p: [20, 45], k: [25, 50], ph: [6.0, 7.5] }, description: "Maize is well-suited for your balanced soil nutrients and pH level, promising good yields with proper management.", benefits: ["Fast growing", "Multiple uses", "Good rotation crop"] },
      { name: "Soybean", icon: "🫘", conditions: { n: [20, 45], p: [25, 50], k: [30, 55], ph: [6.0, 7.0] }, description: "Soybean is perfect for your soil as it can fix nitrogen naturally and thrives in your phosphorus and potassium levels.", benefits: ["Nitrogen fixing", "High protein content", "Good market demand"] }
    ];

    const scoredCrops = crops.map(crop => {
      let score = 0;
      if (n >= crop.conditions.n[0] && n <= crop.conditions.n[1]) score += 25; else score += Math.max(0, 25 - Math.abs(n - (crop.conditions.n[0] + crop.conditions.n[1]) / 2));
      if (p >= crop.conditions.p[0] && p <= crop.conditions.p[1]) score += 25; else score += Math.max(0, 25 - Math.abs(p - (crop.conditions.p[0] + crop.conditions.p[1]) / 2));
      if (k >= crop.conditions.k[0] && k <= crop.conditions.k[1]) score += 25; else score += Math.max(0, 25 - Math.abs(k - (crop.conditions.k[0] + crop.conditions.k[1]) / 2));
      if (ph >= crop.conditions.ph[0] && ph <= crop.conditions.ph[1]) score += 25; else score += Math.max(0, 25 - Math.abs(ph - (crop.conditions.ph[0] + crop.conditions.ph[1]) / 2) * 5);
      return { ...crop, score: Math.round(score) };
    });

    return scoredCrops.sort((a, b) => b.score - a.score)[0];
  };

  const handleFarmSelect = (farmId) => {
    setSelectedFarm(farmId);
    if (farmId) {
      const farm = farms.find(f => f.id === parseInt(farmId));
      if (farm) {
        setFormData({ nitrogen: farm.nitrogen.toString(), phosphorus: farm.phosphorus.toString(), potassium: farm.potassium.toString(), ph: farm.ph.toString() });
      }
    } else {
      setFormData({ nitrogen: '', phosphorus: '', potassium: '', ph: '' });
    }
    setShowResults(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRecommend = async () => {
    const { nitrogen, phosphorus, potassium, ph } = formData;
    if (!nitrogen || !phosphorus || !potassium || !ph) {
      alert(T.fillAllFields);
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      const result = getCropRecommendation(parseFloat(nitrogen), parseFloat(phosphorus), parseFloat(potassium), parseFloat(ph));
      setRecommendation(result);
      setShowResults(true);
      setIsLoading(false);
    }, 1500);
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600'; if (score >= 75) return 'text-blue-600'; if (score >= 60) return 'text-yellow-600'; return 'text-orange-600';
  };

  const getScoreLabel = (score) => {
    if (score >= 90) return T.excellentMatch; if (score >= 75) return T.veryGoodMatch; if (score >= 60) return T.goodMatch; return T.fairMatch;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{T.cropRecommender.pageTitle}</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">{T.cropRecommender.pageSubtitle}</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">{T.cropRecommender.soilAnalysisInput}</h2>
          <div className="mb-6">
            <label htmlFor="farm-select" className="block text-sm font-medium text-gray-700 mb-2">{T.cropRecommender.selectFarm}</label>
            <select id="farm-select" value={selectedFarm} onChange={(e) => handleFarmSelect(e.target.value)} className="w-full input-style">
              <option value="">{T.cropRecommender.selectFarmPlaceholder}</option>
              {farms.map((farm) => (<option key={farm.id} value={farm.id}>{farm.name} - {farm.location} ({farm.soilType} soil)</option>))}
            </select>
            {selectedFarm && (<div className="mt-2 p-3 bg-green-50 rounded-lg"><p className="text-sm text-green-700">{T.cropRecommender.farmDataLoaded}</p></div>)}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="nitrogen" className="block text-sm font-medium text-gray-700 mb-2">{T.cropRecommender.nitrogen} <span className="text-gray-500 text-xs">{T.cropRecommender.unit}</span></label>
              <input type="number" id="nitrogen" name="nitrogen" value={formData.nitrogen} onChange={handleInputChange} placeholder={`${T.cropRecommender.placeholder_e_g} 45`} className="w-full input-style" />
            </div>
            <div>
              <label htmlFor="phosphorus" className="block text-sm font-medium text-gray-700 mb-2">{T.cropRecommender.phosphorus} <span className="text-gray-500 text-xs">{T.cropRecommender.unit}</span></label>
              <input type="number" id="phosphorus" name="phosphorus" value={formData.phosphorus} onChange={handleInputChange} placeholder={`${T.cropRecommender.placeholder_e_g} 25`} className="w-full input-style" />
            </div>
            <div>
              <label htmlFor="potassium" className="block text-sm font-medium text-gray-700 mb-2">{T.cropRecommender.potassium} <span className="text-gray-500 text-xs">{T.cropRecommender.unit}</span></label>
              <input type="number" id="potassium" name="potassium" value={formData.potassium} onChange={handleInputChange} placeholder={`${T.cropRecommender.placeholder_e_g} 30`} className="w-full input-style" />
            </div>
            <div>
              <label htmlFor="ph" className="block text-sm font-medium text-gray-700 mb-2">{T.cropRecommender.ph} <span className="text-gray-500 text-xs">{T.cropRecommender.phUnit}</span></label>
              <input type="number" step="0.1" id="ph" name="ph" value={formData.ph} onChange={handleInputChange} placeholder={`${T.cropRecommender.placeholder_e_g} 6.8`} className="w-full input-style" />
            </div>
          </div>

          <div className="mt-8 text-center">
            <button onClick={handleRecommend} disabled={isLoading} className="bg-green-700 hover:bg-green-800 disabled:bg-green-400 text-white font-bold py-4 px-8 rounded-lg shadow-md transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:transform-none disabled:cursor-not-allowed">
              {isLoading ? (<div className="flex items-center space-x-2"><svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg><span>{T.common.analyzing}</span></div>) : (T.cropRecommender.recommendCrop)}
            </button>
          </div>
        </div>

        {showResults && recommendation && (
          <div className="bg-white rounded-lg shadow-lg p-8 animate-fadeIn">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{T.cropRecommender.recommendedCropTitle}</h2>
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(recommendation.score)} bg-gray-100`}>{T.cropRecommender.suitability}: {recommendation.score}% - {getScoreLabel(recommendation.score)}</div>
            </div>
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 mb-6">
              <div className="text-center mb-4"><div className="text-6xl mb-2">{recommendation.icon}</div><h3 className="text-3xl font-bold text-gray-800">{recommendation.name}</h3></div>
              <p className="text-lg text-gray-700 text-center mb-6">{recommendation.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {recommendation.benefits.map((benefit, index) => (<div key={index} className="bg-white p-4 rounded-lg shadow-sm"><div className="flex items-center space-x-2"><svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg><span className="text-sm font-medium text-gray-900">{benefit}</span></div></div>))}
              </div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start space-x-3"><svg className="w-6 h-6 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <div><h4 className="font-medium text-blue-900 mb-1">{T.cropRecommender.nextSteps}</h4><p className="text-sm text-blue-800">{T.cropRecommender.nextStepsText}</p></div>
              </div>
            </div>
          </div>
        )}
      </div>
       <style>{`.input-style { padding: 0.75rem 1rem; border-radius: 0.5rem; border: 1px solid #D1D5DB; background-color: #FFFFFF; color: #111827; transition: border-color 0.2s, box-shadow 0.2s; } .input-style:focus { outline: none; border-color: #16a34a; box-shadow: 0 0 0 2px rgba(22, 163, 74, 0.5); } .animate-fadeIn { animation: fadeIn 0.5s ease-in-out; } @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </div>
  );
};

export default CropRecommender;

