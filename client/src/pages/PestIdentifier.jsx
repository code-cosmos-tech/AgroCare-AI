import React from 'react';
import { useLanguage } from '../store/language';

const pestDatabase = [
    { name: "Powdery Mildew", confidence: 92, type: "Fungal Disease", severity: "Moderate", description: "A fungal disease that appears as white, powdery spots on leaves and stems.", symptoms: ["White powdery coating", "Yellowing leaves", "Stunted growth"], recommendedActions: ["Apply sulfur-based fungicide immediately", "Improve air circulation around plants", "Remove affected leaves and dispose properly", "Water plants at soil level to avoid wetting leaves"], organicSolutions: ["Spray with baking soda solution (1 tsp per quart water)", "Use neem oil spray in early morning or evening", "Apply compost tea to boost plant immunity"], prevention: ["Ensure proper spacing between plants", "Avoid overhead watering", "Choose resistant varieties when possible"] },
    { name: "Aphid Infestation", confidence: 88, type: "Insect Pest", severity: "High", description: "Small, soft-bodied insects that cluster on new growth and undersides of leaves.", symptoms: ["Sticky honeydew on leaves", "Curling or yellowing leaves", "Visible clusters of small insects"], recommendedActions: ["Spray with insecticidal soap solution", "Release ladybugs or other beneficial insects", "Hose off plants with strong water spray", "Apply systemic insecticide if severely infested"], organicSolutions: ["Mix dish soap with water (2 tbsp per gallon)", "Plant companion crops like marigolds or catnip", "Encourage natural predators like birds"], prevention: ["Regular inspection of plants", "Avoid over-fertilizing with nitrogen", "Maintain healthy soil conditions"] },
    { name: "Leaf Blight", confidence: 85, type: "Bacterial Disease", severity: "High", description: "Bacterial infection causing dark, water-soaked spots that expand rapidly.", symptoms: ["Dark brown or black spots", "Water-soaked appearance", "Rapid leaf death"], recommendedActions: ["Remove and destroy infected plant material", "Apply copper-based bactericide", "Improve drainage and air circulation", "Avoid working with wet plants"], organicSolutions: ["Use copper sulfate spray", "Apply beneficial bacterial sprays", "Boost plant health with compost"], prevention: ["Rotate crops annually", "Water at soil level only", "Disinfect tools between plants"] }
];

const PestIdentifier = () => {
  const { T } = useLanguage();
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [imagePreview, setImagePreview] = React.useState(null);
  const [analysisResult, setAnalysisResult] = React.useState(null);
  const [showResults, setShowResults] = React.useState(false);
  const [isAnalyzing, setIsAnalyzing] = React.useState(false);
  const [isDragOver, setIsDragOver] = React.useState(false);
  const fileInputRef = React.useRef(null);

  const handleImageSelect = (file) => {
    if (file && file.type.startsWith('image/')) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
      setShowResults(false);
      setAnalysisResult(null);
    } else {
      alert(T.alert_invalidFile);
    }
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) handleImageSelect(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files.length > 0) handleImageSelect(e.dataTransfer.files[0]);
  };

  const handleDragOver = (e) => e.preventDefault();
  const handleDragEnter = () => setIsDragOver(true);
  const handleDragLeave = () => setIsDragOver(false);

  const handleAnalyze = async () => {
    if (!selectedImage) {
      alert(T.alert_selectImage);
      return;
    }
    setIsAnalyzing(true);
    setTimeout(() => {
      const randomResult = pestDatabase[Math.floor(Math.random() * pestDatabase.length)];
      setAnalysisResult(randomResult);
      setShowResults(true);
      setIsAnalyzing(false);
    }, 2500);
  };

  const handleUploadClick = () => fileInputRef.current?.click();

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setShowResults(false);
    setAnalysisResult(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const getSeverityColor = (s) => {
    switch (s?.toLowerCase()) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'moderate': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getConfidenceColor = (c) => {
    if (c >= 90) return 'text-green-600'; if (c >= 75) return 'text-blue-600'; if (c >= 60) return 'text-yellow-600'; return 'text-orange-600';
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{T.pestIdentifier.pageTitle}</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">{T.pestIdentifier.pageSubtitle}</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">{T.pestIdentifier.uploadTitle}</h2>
          {!imagePreview ? (
            <div className={`relative border-2 border-dashed rounded-lg p-12 text-center transition-colors duration-200 ${isDragOver ? 'border-green-500 bg-green-50' : 'border-gray-300 bg-gray-50'} hover:border-green-400 hover:bg-green-50`} onDrop={handleDrop} onDragOver={handleDragOver} onDragEnter={handleDragEnter} onDragLeave={handleDragLeave}>
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileInputChange} className="hidden" />
              <div className="space-y-4">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center"><svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg></div>
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">{isDragOver ? T.pestIdentifier.dropPrompt : T.pestIdentifier.uploadPrompt}</h3>
                  <p className="text-gray-600 mb-4">{T.pestIdentifier.uploadPrompt.split(',')[1]}</p>
                  <button onClick={handleUploadClick} className="bg-green-700 hover:bg-green-800 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200">{T.pestIdentifier.clickToUpload}</button>
                  <p className="text-xs text-gray-500 mt-3">{T.pestIdentifier.fileSupport}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="relative bg-gray-100 rounded-lg p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-800">{T.pestIdentifier.imagePreview}</h3>
                  <button onClick={handleRemoveImage} className="text-red-600 hover:text-red-700 p-2" title="Remove image"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
                </div>
                <div className="flex justify-center"><img src={imagePreview} alt="Plant preview" className="max-w-full max-h-96 rounded-lg shadow-md object-contain" /></div>
              </div>
              <div className="text-center">
                <button onClick={handleAnalyze} disabled={isAnalyzing} className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-4 px-8 rounded-lg shadow-md transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:transform-none disabled:cursor-not-allowed">
                  {isAnalyzing ? (<div className="flex items-center space-x-2"><svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg><span>{T.common.analyzing}</span></div>) : (T.pestIdentifier.analyze)}
                </button>
              </div>
            </div>
          )}
        </div>

        {showResults && analysisResult && (
          <div className="bg-white rounded-lg shadow-lg p-8 animate-fadeIn">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">{T.pestIdentifier.analysisResult}</h2>
            <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-6 mb-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
                <div><h3 className="text-2xl font-bold text-gray-800">{analysisResult.name}</h3><p className="text-gray-600 mt-1">{analysisResult.type}</p></div>
                <div className="text-right space-y-2">
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getConfidenceColor(analysisResult.confidence)}`}>{analysisResult.confidence}% {T.common.confidence}</div>
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getSeverityColor(analysisResult.severity)}`}>{analysisResult.severity} {T.common.severity}</div>
                </div>
              </div>
              <p className="text-gray-700 text-lg">{analysisResult.description}</p>
            </div>
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-3">{T.pestIdentifier.symptoms}</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {analysisResult.symptoms.map((symptom, i) => (<div key={i} className="bg-gray-50 p-3 rounded-lg flex items-center space-x-2"><svg className="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg><span className="text-sm text-gray-700">{symptom}</span></div>))}
              </div>
            </div>
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-3">{T.pestIdentifier.recommendedActions}</h4>
              <div className="space-y-3">
                {analysisResult.recommendedActions.map((action, i) => (<div key={i} className="bg-blue-50 border-l-4 border-blue-500 p-4 flex items-start space-x-3"><span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded">{i + 1}</span><p className="text-blue-800">{action}</p></div>))}
              </div>
            </div>
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center"><span className="text-green-600 mr-2">🌱</span>{T.pestIdentifier.organicSolutions}</h4>
              <div className="space-y-2">
                {analysisResult.organicSolutions.map((solution, i) => (<div key={i} className="bg-green-50 p-3 rounded-lg flex items-center space-x-2"><svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg><p className="text-green-800 text-sm">{solution}</p></div>))}
              </div>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-yellow-800 mb-3 flex items-center"><svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>{T.pestIdentifier.preventionTips}</h4>
              <ul className="space-y-2 list-disc list-inside text-yellow-800 text-sm">{analysisResult.prevention.map((tip, i) => (<li key={i}>{tip}</li>))}</ul>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-green-700 hover:bg-green-800 text-white font-medium py-3 px-6 rounded-lg transition-colors">{T.pestIdentifier.getTreatmentGuide}</button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors">{T.pestIdentifier.findSuppliers}</button>
              <button onClick={handleRemoveImage} className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-6 rounded-lg transition-colors">{T.pestIdentifier.analyzeAnother}</button>
            </div>
          </div>
        )}
      </div>
       <style>{`.animate-fadeIn { animation: fadeIn 0.5s ease-in-out; } @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </div>
  );
};

export default PestIdentifier;
