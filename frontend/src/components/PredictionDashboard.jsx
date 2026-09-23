import React, { useState } from 'react';

export default function PredictionDashboard() {
  const [totalSpend, setTotalSpend] = useState(250);
  const [daysInactive, setDaysInactive] = useState(21);
  const [satisfaction, setSatisfaction] = useState(3);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [predictionResult, setPredictionResult] = useState(null);

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setPredictionResult({
        segmentTitle: 'At-Risk Customer',
        description: 'This customer is showing early warning signs of disengagement. Timely intervention can retain them.',
        strategies: [
          'Trigger a personalized re-engagement email sequence',
          'Offer a loyalty bonus or surprise discount',
          'Conduct a proactive check-in via preferred channel'
        ],
        metricsSummary: {
          spend: `$${totalSpend}`,
          inactive: `${daysInactive}d`,
          satisfaction: `${satisfaction}/5 ★`
        }
      });
      setIsAnalyzing(false);
    }, 600);
  };

  return (
    <section id="dashboard" className="py-16 bg-slate-50/50 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold border border-blue-100">
            <span>⚙️</span> Core Engine
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Analyze Your Customer
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Enter three key metrics — our AI model returns a behavioral segment and actionable strategies in seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">

          {/* Left Input Panel */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/50 border border-slate-200/70 space-y-6">
            <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
              Customer Metrics
            </h3>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-slate-700">Total Spend (USD)</label>
                <span className="text-base font-extrabold text-blue-600">${totalSpend}</span>
              </div>
              <input
                type="range"
                min="0"
                max="2000"
                step="25"
                value={totalSpend}
                onChange={(e) => setTotalSpend(Number(e.target.value))}
                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-[11px] font-medium text-slate-400">
                <span>$0</span>
                <span>$1,000</span>
                <span>$2,000</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-slate-700">Days Since Last Purchase</label>
                <span className="text-base font-extrabold text-blue-600">{daysInactive}d</span>
              </div>
              <input
                type="range"
                min="0"
                max="90"
                step="1"
                value={daysInactive}
                onChange={(e) => setDaysInactive(Number(e.target.value))}
                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-[11px] font-medium text-slate-400">
                <span>Active now</span>
                <span>45 days</span>
                <span>90 days</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 block">
                Satisfaction Score <span className="text-xs font-normal text-slate-400">(1 to 5)</span>
              </label>
              <div className="flex items-center gap-3 pt-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setSatisfaction(star)}
                    className="focus:outline-none transition-transform active:scale-95"
                  >
                    <svg
                      className={`w-7 h-7 ${star <= satisfaction ? 'text-amber-400 fill-amber-400' : 'text-slate-200 fill-slate-100'} transition-colors`}
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                    <span className="text-xs text-slate-400 block text-center mt-0.5 font-medium">{star}</span>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold rounded-xl shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
            >
              {isAnalyzing ? (
                <>
                  <svg className="animate-spin w-5 h-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                  </svg>
                  Processing ML Pipeline...
                </>
              ) : (
                <>
                  <span>⚡</span> Analyze Persona
                </>
              )}
            </button>
          </div>

          {/* Right Output Panel */}
          <div className="lg:col-span-6 h-full">
            {!predictionResult ? (
              <div className="bg-white rounded-3xl p-8 border-2 border-dashed border-slate-200 h-full flex flex-col items-center justify-center text-center space-y-3 min-h-[360px]">
                <div className="w-14 h-14 rounded-2xl bg-orange-50 text-orange-500 flex items-center justify-center text-2xl shadow-inner">
                  🎯
                </div>
                <h4 className="text-lg font-bold text-slate-800">Awaiting Analysis</h4>
                <p className="text-xs sm:text-sm text-slate-500 max-w-xs leading-relaxed">
                  Fill in the metrics on the left and click "Analyze Persona" to see the predicted customer segment.
                </p>
              </div>
            ) : (
              <div className="bg-amber-50/40 rounded-3xl p-6 sm:p-8 border-2 border-amber-300 shadow-xl shadow-amber-500/5 space-y-6 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-full border border-amber-200">
                    AI Prediction
                  </span>
                  <div className="w-10 h-10 bg-amber-500 text-white rounded-xl flex items-center justify-center shadow-md">
                    📊
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🔔</span>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">{predictionResult.segmentTitle}</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {predictionResult.description}
                  </p>
                </div>

                <div className="space-y-2.5 pt-2">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Recommended Strategies
                  </h4>
                  <ul className="space-y-2">
                    {predictionResult.strategies.map((strategy, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-800 font-medium">
                        <span className="w-4 h-4 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                          ✓
                        </span>
                        {strategy}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-4 border-t border-amber-200/60 text-center">
                  <div>
                    <span className="text-[10px] text-slate-500 block font-medium">Total Spend</span>
                    <span className="text-xs sm:text-sm font-extrabold text-slate-800">{predictionResult.metricsSummary.spend}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block font-medium">Days Inactive</span>
                    <span className="text-xs sm:text-sm font-extrabold text-slate-800">{predictionResult.metricsSummary.inactive}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block font-medium">Satisfaction</span>
                    <span className="text-xs sm:text-sm font-extrabold text-slate-800">{predictionResult.metricsSummary.satisfaction}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}