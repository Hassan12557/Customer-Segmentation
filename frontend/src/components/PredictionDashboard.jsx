// // import React, { useState } from 'react';
// //
// // export default function PredictionDashboard({ user }) {
// //   const [totalSpend, setTotalSpend] = useState(800);
// //   const [daysInactive, setDaysInactive] = useState(41);
// //   const [satisfactionScore, setSatisfactionScore] = useState(4);
// //   const [loading, setLoading] = useState(false);
// //
// //   // Default report state
// //   const [prediction, setPrediction] = useState({
// //     title: "Churned / Lapsed Customer",
// //     description: "Strong churn signals detected. This customer has disengaged — either by time away or poor experience. Act fast with re-engagement tactics.",
// //     strategies: [
// //       "Send a win-back email with a personalized discount offer",
// //       "Deploy a satisfaction survey to identify root pain points",
// //       "Offer a limited-time \"welcome back\" incentive"
// //     ],
// //     spend: 800,
// //     days: 41,
// //     score: 4
// //   });
// //
// //   const handleRunAnalysis = async () => {
// //     setLoading(true);
// //     try {
// //       const response = await fetch('http://localhost:8000/api/v1/predict', {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify({
// //           total_spend: parseFloat(totalSpend),
// //           days_inactive: parseInt(daysInactive),
// //           satisfaction_score: parseInt(satisfactionScore)
// //         })
// //       });
// //
// //       if (response.ok) {
// //         const data = await response.json();
// //         setPrediction({
// //           title: data.persona_title || "Churned / Lapsed Customer",
// //           description: data.description || "Strong churn signals detected. This customer has disengaged.",
// //           strategies: data.strategies || [
// //             "Send a win-back email with a personalized discount offer",
// //             "Deploy a satisfaction survey to identify root pain points",
// //             "Offer a limited-time \"welcome back\" incentive"
// //           ],
// //           spend: totalSpend,
// //           days: daysInactive,
// //           score: satisfactionScore
// //         });
// //       }
// //     } catch (err) {
// //       console.error(err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };
// //
// //   const userName = user?.name ? user.name.split(' ')[0].toLowerCase() : 'hassan';
// //
// //   return (
// //     <div className="max-w-6xl mx-auto px-6 py-8">
// //       {/* Top Welcome Title */}
// //       <div className="flex justify-between items-start mb-8">
// //         <div>
// //           <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
// //             Welcome back, {userName} 👋
// //           </h1>
// //           <p className="text-sm font-medium text-slate-500 mt-1">
// //             Run a customer analysis below. All predictions are instant and private.
// //           </p>
// //         </div>
// //
// //         <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200/80 px-3.5 py-1.5 rounded-full">
// //           <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
// //           <span className="text-xs font-bold text-emerald-700">Analyzer Active</span>
// //         </div>
// //       </div>
// //
// //       {/* Main Grid Section */}
// //       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
// //
// //         {/* LEFT COLUMN: Input Card */}
// //         <div className="bg-white rounded-3xl p-7 border border-slate-200/80 shadow-sm space-y-6">
// //
// //           <div className="flex items-center gap-3">
// //             <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg">
// //               🎯
// //             </div>
// //             <div>
// //               <h2 className="text-lg font-bold text-slate-900 leading-tight">Customer Metrics</h2>
// //               <p className="text-xs font-semibold text-slate-400">3 inputs · AI-powered segmentation</p>
// //             </div>
// //           </div>
// //
// //           {/* Slider 1: Total Spend */}
// //           <div className="space-y-2">
// //             <div className="flex justify-between items-center">
// //               <label className="text-xs font-bold text-slate-700">Total Spend (USD)</label>
// //               <span className="text-lg font-black text-blue-600">${totalSpend}</span>
// //             </div>
// //             <input
// //               type="range"
// //               min="0"
// //               max="2000"
// //               step="10"
// //               value={totalSpend}
// //               onChange={(e) => setTotalSpend(e.target.value)}
// //               className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
// //             />
// //             <div className="flex justify-between text-[11px] font-bold text-slate-400 pt-1">
// //               <span>$0</span>
// //               <span>$1,000</span>
// //               <span>$2,000</span>
// //             </div>
// //           </div>
// //
// //           {/* Slider 2: Days Inactive */}
// //           <div className="space-y-2">
// //             <div className="flex justify-between items-center">
// //               <label className="text-xs font-bold text-slate-700">Days Since Last Purchase</label>
// //               <span className="text-lg font-black text-blue-600">{daysInactive}d</span>
// //             </div>
// //             <input
// //               type="range"
// //               min="0"
// //               max="90"
// //               value={daysInactive}
// //               onChange={(e) => setDaysInactive(e.target.value)}
// //               className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
// //             />
// //             <div className="flex justify-between text-[11px] font-bold text-slate-400 pt-1">
// //               <span>Active now</span>
// //               <span>45 days</span>
// //               <span>90 days</span>
// //             </div>
// //           </div>
// //
// //           {/* Rating 3: Satisfaction Score */}
// //           <div className="space-y-2">
// //             <label className="text-xs font-bold text-slate-700">
// //               Satisfaction Score <span className="text-slate-400 font-normal">(1 Very Poor — 5 Excellent)</span>
// //             </label>
// //             <div className="flex items-center gap-2 pt-1">
// //               {[1, 2, 3, 4, 5].map((star) => (
// //                 <button
// //                   key={star}
// //                   type="button"
// //                   onClick={() => setSatisfactionScore(star)}
// //                   className="focus:outline-none transition transform hover:scale-110"
// //                 >
// //                   <svg
// //                     className={`w-8 h-8 ${star <= satisfactionScore ? 'text-amber-400 fill-amber-400' : 'text-slate-200 fill-slate-100'}`}
// //                     viewBox="0 0 24 24"
// //                   >
// //                     <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
// //                   </svg>
// //                 </button>
// //               ))}
// //             </div>
// //           </div>
// //
// //           {/* Run Analysis Button */}
// //           <button
// //             onClick={handleRunAnalysis}
// //             disabled={loading}
// //             className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-black text-sm rounded-2xl shadow-lg shadow-blue-600/25 transition flex items-center justify-center gap-2 cursor-pointer mt-4"
// //           >
// //             ⚡ {loading ? 'Running AI Model...' : 'Run Segment Analysis'}
// //           </button>
// //         </div>
// //
// //         {/* RIGHT COLUMN: Red Segment Report Output */}
// //         <div className="bg-red-50/40 rounded-3xl p-7 border border-red-200/60 shadow-sm space-y-6">
// //
// //           <div className="flex justify-between items-center">
// //             <span className="px-3 py-1 bg-red-100/80 text-red-700 text-[11px] font-bold rounded-full">
// //               AI Prediction · Segment Report
// //             </span>
// //             <div className="w-9 h-9 bg-red-600 rounded-xl flex items-center justify-center text-white font-bold">
// //               📊
// //             </div>
// //           </div>
// //
// //           <div>
// //             <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
// //               ⚠️ {prediction.title}
// //             </h2>
// //             <p className="text-xs font-semibold text-slate-600 leading-relaxed mt-3">
// //               {prediction.description}
// //             </p>
// //           </div>
// //
// //           <div>
// //             <h3 className="text-xs font-bold text-slate-700 mb-3">Recommended Strategies</h3>
// //             <ul className="space-y-2.5">
// //               {prediction.strategies.map((strat, idx) => (
// //                 <li key={idx} className="flex items-start gap-2.5 text-xs font-semibold text-slate-800">
// //                   <span className="w-4 h-4 bg-red-600 text-white rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
// //                     ✓
// //                   </span>
// //                   <span>{strat}</span>
// //                 </li>
// //               ))}
// //             </ul>
// //           </div>
// //
// //           {/* Bottom Summary Metric Cards */}
// //           <div className="border-t border-red-200/50 pt-5 grid grid-cols-3 gap-3">
// //             <div className="bg-white rounded-2xl p-3 text-center border border-red-100">
// //               <span className="block text-[10px] font-bold text-slate-400 uppercase">Total Spend</span>
// //               <span className="text-sm font-black text-red-600">${prediction.spend}</span>
// //             </div>
// //             <div className="bg-white rounded-2xl p-3 text-center border border-red-100">
// //               <span className="block text-[10px] font-bold text-slate-400 uppercase">Inactive Days</span>
// //               <span className="text-sm font-black text-red-600">{prediction.days}d</span>
// //             </div>
// //             <div className="bg-white rounded-2xl p-3 text-center border border-red-100">
// //               <span className="block text-[10px] font-bold text-slate-400 uppercase">Satisfaction</span>
// //               <span className="text-sm font-black text-red-600">{prediction.score} / 5</span>
// //             </div>
// //           </div>
// //
// //         </div>
// //
// //       </div>
// //     </div>
// //   );
// // }
// import React, { useState } from 'react';
//
// export default function PredictionDashboard({ user }) {
//   const [totalSpend, setTotalSpend] = useState(800);
//   const [daysInactive, setDaysInactive] = useState(41);
//   const [satisfactionScore, setSatisfactionScore] = useState(4);
//   const [loading, setLoading] = useState(false);
//
//   // Set initial prediction to null so the report does not show directly
//   const [prediction, setPrediction] = useState(null);
//
//   const handleRunAnalysis = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch('http://localhost:8000/api/v1/predict', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           total_spend: parseFloat(totalSpend),
//           days_inactive: parseInt(daysInactive),
//           satisfaction_score: parseInt(satisfactionScore)
//         })
//       });
//
//       if (response.ok) {
//         const data = await response.json();
//         setPrediction({
//           title: data.persona_title || "Churned / Lapsed Customer",
//           description: data.description || "Strong churn signals detected.",
//           strategies: data.strategies || [
//             "Send a win-back email with a personalized discount offer",
//             "Deploy a satisfaction survey to identify root pain points",
//             "Offer a limited-time \"welcome back\" incentive"
//           ],
//           spend: totalSpend,
//           days: daysInactive,
//           score: satisfactionScore
//         });
//       }
//     } catch (err) {
//       console.error('Prediction request failed:', err);
//     } finally {
//       setLoading(false);
//     }
//   };
//
//   const displayName = user?.name ? user.name.split(' ')[0] : 'User';
//
//   return (
//     <div className="max-w-6xl mx-auto px-6 py-10">
//       {/* Welcome Title */}
//       <div className="flex justify-between items-start mb-8">
//         <div>
//           <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
//             Welcome back, {displayName} 👋
//           </h1>
//           <p className="text-sm font-medium text-slate-500 mt-1">
//             Run a customer analysis below. All predictions are instant and private.
//           </p>
//         </div>
//
//         <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200/80 px-3.5 py-1.5 rounded-full">
//           <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
//           <span className="text-xs font-bold text-emerald-700">Analyzer Active</span>
//         </div>
//       </div>
//
//       {/* Main Grid */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
//
//         {/* LEFT COLUMN: Input Controls */}
//         <div className="bg-white rounded-3xl p-7 border border-slate-200/80 shadow-sm space-y-6">
//
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg">
//               🎯
//             </div>
//             <div>
//               <h2 className="text-lg font-bold text-slate-900 leading-tight">Customer Metrics</h2>
//               <p className="text-xs font-semibold text-slate-400">3 inputs · AI-powered segmentation</p>
//             </div>
//           </div>
//
//           {/* Slider 1: Total Spend */}
//           <div className="space-y-2">
//             <div className="flex justify-between items-center">
//               <label className="text-xs font-bold text-slate-700">Total Spend (USD)</label>
//               <span className="text-lg font-black text-blue-600">${totalSpend}</span>
//             </div>
//             <input
//               type="range"
//               min="0"
//               max="2000"
//               step="10"
//               value={totalSpend}
//               onChange={(e) => setTotalSpend(e.target.value)}
//               className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
//             />
//             <div className="flex justify-between text-[11px] font-bold text-slate-400 pt-1">
//               <span>$0</span>
//               <span>$1,000</span>
//               <span>$2,000</span>
//             </div>
//           </div>
//
//           {/* Slider 2: Days Inactive */}
//           <div className="space-y-2">
//             <div className="flex justify-between items-center">
//               <label className="text-xs font-bold text-slate-700">Days Since Last Purchase</label>
//               <span className="text-lg font-black text-blue-600">{daysInactive}d</span>
//             </div>
//             <input
//               type="range"
//               min="0"
//               max="90"
//               value={daysInactive}
//               onChange={(e) => setDaysInactive(e.target.value)}
//               className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
//             />
//             <div className="flex justify-between text-[11px] font-bold text-slate-400 pt-1">
//               <span>Active now</span>
//               <span>45 days</span>
//               <span>90 days</span>
//             </div>
//           </div>
//
//           {/* Rating 3: Satisfaction Score */}
//           <div className="space-y-2">
//             <label className="text-xs font-bold text-slate-700">
//               Satisfaction Score <span className="text-slate-400 font-normal">(1 Very Poor — 5 Excellent)</span>
//             </label>
//             <div className="flex items-center gap-2 pt-1">
//               {[1, 2, 3, 4, 5].map((star) => (
//                 <button
//                   key={star}
//                   type="button"
//                   onClick={() => setSatisfactionScore(star)}
//                   className="focus:outline-none transition transform hover:scale-110 cursor-pointer"
//                 >
//                   <svg
//                     className={`w-8 h-8 ${star <= satisfactionScore ? 'text-amber-400 fill-amber-400' : 'text-slate-200 fill-slate-100'}`}
//                     viewBox="0 0 24 24"
//                   >
//                     <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
//                   </svg>
//                 </button>
//               ))}
//             </div>
//           </div>
//
//           {/* Run Analysis Button */}
//           <button
//             onClick={handleRunAnalysis}
//             disabled={loading}
//             className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-black text-sm rounded-2xl shadow-lg shadow-blue-600/25 transition flex items-center justify-center gap-2 cursor-pointer mt-4"
//           >
//             ⚡ {loading ? 'Running AI Model...' : 'Run Segment Analysis'}
//           </button>
//         </div>
//
//         {/* RIGHT COLUMN: Output Report or Placeholder */}
//         {!prediction ? (
//           /* Placeholder shown BEFORE user clicks Run Segment Analysis */
//           <div className="bg-slate-100/60 rounded-3xl p-8 border border-dashed border-slate-300 flex flex-col items-center justify-center text-center space-y-4 min-h-[380px]">
//             <div className="w-16 h-16 bg-white border border-slate-200 text-blue-600 rounded-2xl flex items-center justify-center text-3xl shadow-xs">
//               📊
//             </div>
//             <div>
//               <h3 className="text-base font-bold text-slate-800">Ready for Segment Analysis</h3>
//               <p className="text-xs font-semibold text-slate-400 max-w-xs mt-1 leading-relaxed">
//                 Adjust customer metrics on the left panel and click <strong className="text-slate-700">"Run Segment Analysis"</strong> to generate real-time prediction reports.
//               </p>
//             </div>
//           </div>
//         ) : (
//           /* Segment Report Card shown AFTER clicking Run Segment Analysis */
//           <div className="bg-red-50/40 rounded-3xl p-7 border border-red-200/60 shadow-sm space-y-6 flex flex-col justify-between">
//             <div className="space-y-6">
//               <div className="flex justify-between items-center">
//                 <span className="px-3 py-1 bg-red-100/80 text-red-700 text-[11px] font-bold rounded-full">
//                   AI Prediction · Segment Report
//                 </span>
//                 <div className="w-9 h-9 bg-red-600 rounded-xl flex items-center justify-center text-white font-bold">
//                   📊
//                 </div>
//               </div>
//
//               <div>
//                 <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
//                   ⚠️ {prediction.title}
//                 </h2>
//                 <p className="text-xs font-semibold text-slate-600 leading-relaxed mt-3">
//                   {prediction.description}
//                 </p>
//               </div>
//
//               <div>
//                 <h3 className="text-xs font-bold text-slate-700 mb-3">Recommended Strategies</h3>
//                 <ul className="space-y-2.5">
//                   {prediction.strategies.map((strat, idx) => (
//                     <li key={idx} className="flex items-start gap-2.5 text-xs font-semibold text-slate-800">
//                       <span className="w-4 h-4 bg-red-600 text-white rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
//                         ✓
//                       </span>
//                       <span>{strat}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//
//             {/* Bottom Summary Metric Cards */}
//             <div className="border-t border-red-200/50 pt-5 grid grid-cols-3 gap-3">
//               <div className="bg-white rounded-2xl p-3 text-center border border-red-100">
//                 <span className="block text-[10px] font-bold text-slate-400 uppercase">Total Spend</span>
//                 <span className="text-sm font-black text-red-600">${prediction.spend}</span>
//               </div>
//               <div className="bg-white rounded-2xl p-3 text-center border border-red-100">
//                 <span className="block text-[10px] font-bold text-slate-400 uppercase">Inactive Days</span>
//                 <span className="text-sm font-black text-red-600">{prediction.days}d</span>
//               </div>
//               <div className="bg-white rounded-2xl p-3 text-center border border-red-100">
//                 <span className="block text-[10px] font-bold text-slate-400 uppercase">Satisfaction</span>
//                 <span className="text-sm font-black text-red-600">{prediction.score} / 5</span>
//               </div>
//             </div>
//
//           </div>
//         )}
//
//       </div>
//     </div>
//   );
// }
import React, { useState } from 'react';

export default function PredictionDashboard({ user }) {
  const [totalSpend, setTotalSpend] = useState(800);
  const [daysInactive, setDaysInactive] = useState(41);
  const [satisfactionScore, setSatisfactionScore] = useState(4);
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleRunAnalysis = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      const response = await fetch('http://127.0.0.1:8000/api/v1/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          total_spend: parseFloat(totalSpend),
          days_inactive: parseInt(daysInactive),
          satisfaction_score: parseInt(satisfactionScore)
        })
      });

      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}`);
      }

      const data = await response.json();
      setPrediction({
        title: data.persona_title,
        badge: data.status_badge,
        description: data.description,
        strategies: data.strategies,
        spend: totalSpend,
        days: daysInactive,
        score: satisfactionScore
      });
    } catch (err) {
      console.error('Prediction failed:', err);
      setErrorMsg('Failed to fetch prediction from backend. Ensure FastAPI server is running on port 8000.');
    } finally {
      setLoading(false);
    }
  };

  const displayName = user?.name ? user.name.split(' ')[0] : 'User';

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            Welcome back, {displayName} 👋
          </h1>
          <p className="text-sm font-medium text-slate-500 mt-1">
            Run a customer analysis below. All predictions are instant and private.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200/80 px-3.5 py-1.5 rounded-full">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-xs font-bold text-emerald-700">Analyzer Active</span>
        </div>
      </div>

      {errorMsg && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl text-xs font-bold">
          ⚠️ {errorMsg}
        </div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">

        {/* LEFT COLUMN: Controls */}
        <div className="bg-white rounded-3xl p-7 border border-slate-200/80 shadow-sm space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg">
              🎯
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 leading-tight">Customer Metrics</h2>
              <p className="text-xs font-semibold text-slate-400">3 inputs · AI-powered segmentation</p>
            </div>
          </div>

          {/* Spend Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-slate-700">Total Spend (USD)</label>
              <span className="text-lg font-black text-blue-600">${totalSpend}</span>
            </div>
            <input
              type="range"
              min="0"
              max="2000"
              step="10"
              value={totalSpend}
              onChange={(e) => setTotalSpend(e.target.value)}
              className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-[11px] font-bold text-slate-400 pt-1">
              <span>$0</span>
              <span>$1,000</span>
              <span>$2,000</span>
            </div>
          </div>

          {/* Days Inactive Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-slate-700">Days Since Last Purchase</label>
              <span className="text-lg font-black text-blue-600">{daysInactive}d</span>
            </div>
            <input
              type="range"
              min="0"
              max="90"
              value={daysInactive}
              onChange={(e) => setDaysInactive(e.target.value)}
              className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-[11px] font-bold text-slate-400 pt-1">
              <span>Active now</span>
              <span>45 days</span>
              <span>90 days</span>
            </div>
          </div>

          {/* Satisfaction Score Stars */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700">
              Satisfaction Score <span className="text-slate-400 font-normal">(1 Very Poor — 5 Excellent)</span>
            </label>
            <div className="flex items-center gap-2 pt-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setSatisfactionScore(star)}
                  className="focus:outline-none transition transform hover:scale-110 cursor-pointer"
                >
                  <svg
                    className={`w-8 h-8 ${star <= satisfactionScore ? 'text-amber-400 fill-amber-400' : 'text-slate-200 fill-slate-100'}`}
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleRunAnalysis}
            disabled={loading}
            className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-black text-sm rounded-2xl shadow-lg shadow-blue-600/25 transition flex items-center justify-center gap-2 cursor-pointer mt-4"
          >
            ⚡ {loading ? 'Running AI Model...' : 'Run Segment Analysis'}
          </button>
        </div>

        {/* RIGHT COLUMN: Output Report */}
        {!prediction ? (
          <div className="bg-slate-100/60 rounded-3xl p-8 border border-dashed border-slate-300 flex flex-col items-center justify-center text-center space-y-4 min-h-[380px]">
            <div className="w-16 h-16 bg-white border border-slate-200 text-blue-600 rounded-2xl flex items-center justify-center text-3xl shadow-xs">
              📊
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800">Ready for Segment Analysis</h3>
              <p className="text-xs font-semibold text-slate-400 max-w-xs mt-1 leading-relaxed">
                Adjust customer metrics on the left panel and click <strong className="text-slate-700">"Run Segment Analysis"</strong> to generate real-time prediction reports.
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-red-50/40 rounded-3xl p-7 border border-red-200/60 shadow-sm space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <span className="px-3 py-1 bg-red-100/80 text-red-700 text-[11px] font-bold rounded-full">
                  AI Prediction · {prediction.badge}
                </span>
                <div className="w-9 h-9 bg-red-600 rounded-xl flex items-center justify-center text-white font-bold">
                  📊
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                  ⚠️ {prediction.title}
                </h2>
                <p className="text-xs font-semibold text-slate-600 leading-relaxed mt-3">
                  {prediction.description}
                </p>
              </div>

              <div>
                <h3 className="text-xs font-bold text-slate-700 mb-3">Recommended Strategies</h3>
                <ul className="space-y-2.5">
                  {prediction.strategies.map((strat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs font-semibold text-slate-800">
                      <span className="w-4 h-4 bg-red-600 text-white rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                        ✓
                      </span>
                      <span>{strat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="border-t border-red-200/50 pt-5 grid grid-cols-3 gap-3">
              <div className="bg-white rounded-2xl p-3 text-center border border-red-100">
                <span className="block text-[10px] font-bold text-slate-400 uppercase">Total Spend</span>
                <span className="text-sm font-black text-red-600">${prediction.spend}</span>
              </div>
              <div className="bg-white rounded-2xl p-3 text-center border border-red-100">
                <span className="block text-[10px] font-bold text-slate-400 uppercase">Inactive Days</span>
                <span className="text-sm font-black text-red-600">{prediction.days}d</span>
              </div>
              <div className="bg-white rounded-2xl p-3 text-center border border-red-100">
                <span className="block text-[10px] font-bold text-slate-400 uppercase">Satisfaction</span>
                <span className="text-sm font-black text-red-600">{prediction.score} / 5</span>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}