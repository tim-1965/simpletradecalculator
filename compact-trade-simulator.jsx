import React, { useState, useEffect } from 'react';
import { TrendingUp, DollarSign, BarChart3, ArrowRight, Users, FileText, Calculator, Settings } from 'lucide-react';

export default function CompactTradeSimulator() {
  const [activeTab, setActiveTab] = useState('inputs');

  // Load saved values from localStorage or use defaults
  const loadSavedValue = (key, defaultValue) => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('tradeSimulator');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          return parsed[key] !== undefined ? parsed[key] : defaultValue;
        } catch (e) {
          return defaultValue;
        }
      }
    }
    return defaultValue;
  };

  // Actual Financial Statement Inputs
  const [turnover, setTurnover] = useState(() => loadSavedValue('turnover', 1291.6));
  const [costOfSales, setCostOfSales] = useState(() => loadSavedValue('costOfSales', 707.4));
  const [operatingProfit, setOperatingProfit] = useState(() => loadSavedValue('operatingProfit', -39.6));
  const [netInterest, setNetInterest] = useState(() => loadSavedValue('netInterest', 29.9));
  const [tradePayables, setTradePayables] = useState(() => loadSavedValue('tradePayables', 94.9));
  const [netDebt, setNetDebt] = useState(() => loadSavedValue('netDebt', 511.1));
  const [equity, setEquity] = useState(() => loadSavedValue('equity', 320.8));
  const [cashFromOperations, setCashFromOperations] = useState(() => loadSavedValue('cashFromOperations', -170.3));
  const [currency, setCurrency] = useState(() => loadSavedValue('currency', 'GBP'));

  // Additional Current Costs
  const [internationalShipments, setInternationalShipments] = useState(() => loadSavedValue('internationalShipments', 2000));
  const [feePerShipment, setFeePerShipment] = useState(() => loadSavedValue('feePerShipment', 0.0025));
  const [apHeadcount, setApHeadcount] = useState(() => loadSavedValue('apHeadcount', 8));
  const [tradeComplianceHeadcount, setTradeComplianceHeadcount] = useState(() => loadSavedValue('tradeComplianceHeadcount', 4));
  const [avgSalaryCost, setAvgSalaryCost] = useState(() => loadSavedValue('avgSalaryCost', 0.065));

  // Program Assumptions - Trade Finance
  const [relevantSpendPct, setRelevantSpendPct] = useState(() => loadSavedValue('relevantSpendPct', 50));
  const [internationalSpendPct, setInternationalSpendPct] = useState(() => loadSavedValue('internationalSpendPct', 60));
  const [newDPO, setNewDPO] = useState(() => loadSavedValue('newDPO', 90));
  const [fundingBaseRate, setFundingBaseRate] = useState(() => loadSavedValue('fundingBaseRate', 4.25));
  const [fundingSpread, setFundingSpread] = useState(() => loadSavedValue('fundingSpread', 500));
  const [freeDays, setFreeDays] = useState(() => loadSavedValue('freeDays', 7));
  const [discount, setDiscount] = useState(() => loadSavedValue('discount', 3.5));
  const [uptakePct, setUptakePct] = useState(() => loadSavedValue('uptakePct', 70));
  const [accelerationPct, setAccelerationPct] = useState(() => loadSavedValue('accelerationPct', 80));
  const [platformCost, setPlatformCost] = useState(() => loadSavedValue('platformCost', 0));
  const [treasuryFundingPct, setTreasuryFundingPct] = useState(() => loadSavedValue('treasuryFundingPct', 0));

  // Program Assumptions - Operational Efficiency
  const [apEfficiency, setApEfficiency] = useState(() => loadSavedValue('apEfficiency', 40));
  const [tradeEfficiency, setTradeEfficiency] = useState(() => loadSavedValue('tradeEfficiency', 60));
  const [customsSavings, setCustomsSavings] = useState(() => loadSavedValue('customsSavings', 75));
  
  // Auto-save indicator
  const [showSaved, setShowSaved] = useState(false);

  // Save all values to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const allValues = {
        turnover, costOfSales, operatingProfit, netInterest, tradePayables, netDebt, equity, cashFromOperations, currency,
        internationalShipments, feePerShipment, apHeadcount, tradeComplianceHeadcount, avgSalaryCost,
        relevantSpendPct, internationalSpendPct, newDPO, fundingBaseRate, fundingSpread, freeDays, discount, uptakePct, accelerationPct, platformCost, treasuryFundingPct,
        apEfficiency, tradeEfficiency, customsSavings
      };
      localStorage.setItem('tradeSimulator', JSON.stringify(allValues));
      
      // Show "saved" indicator briefly
      setShowSaved(true);
      const timer = setTimeout(() => setShowSaved(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [turnover, costOfSales, operatingProfit, netInterest, tradePayables, netDebt, equity, cashFromOperations, currency,
      internationalShipments, feePerShipment, apHeadcount, tradeComplianceHeadcount, avgSalaryCost,
      relevantSpendPct, internationalSpendPct, newDPO, fundingBaseRate, fundingSpread, freeDays, discount, uptakePct, accelerationPct, platformCost, treasuryFundingPct,
      apEfficiency, tradeEfficiency, customsSavings]);

  // ===== CALCULATIONS =====
  
  const relevantSpend = (costOfSales * relevantSpendPct) / 100;
  const internationalSpend = relevantSpend * (internationalSpendPct / 100);
  const domesticSpend = relevantSpend * (1 - internationalSpendPct / 100);
  const avgShipmentSize = internationalShipments > 0 ? internationalSpend / internationalShipments : 0;
  const currentDPO = (tradePayables / costOfSales) * 365;
  
  const incomeFromDiscounts = (discount / 100) * (uptakePct / 100) * relevantSpend;
  const totalFundingRate = (fundingBaseRate / 100) + (fundingSpread / 10000);
  const fundingCostToSuppliers = -totalFundingRate * ((newDPO - freeDays) / 365) * relevantSpend * (uptakePct / 100) * (1 - treasuryFundingPct / 100) * (accelerationPct / 100);
  const netDiscountBenefit = incomeFromDiscounts + fundingCostToSuppliers - platformCost;
  
  const additionalDPO = relevantSpend * ((newDPO - currentDPO) / 365) * (1 - treasuryFundingPct / 100) - relevantSpend * ((currentDPO - freeDays) / 365) * (treasuryFundingPct / 100) * (accelerationPct / 100);
  const workingCapitalReleased = additionalDPO;
  const scfFacilitySize = relevantSpend * ((newDPO - freeDays) / 365) * (uptakePct / 100) * (accelerationPct / 100) * (1 - treasuryFundingPct / 100);

  const apHeadcountSaved = apHeadcount * (apEfficiency / 100);
  const tradeHeadcountSaved = tradeComplianceHeadcount * (tradeEfficiency / 100);
  const totalHeadcountSavings = (apHeadcountSaved + tradeHeadcountSaved) * avgSalaryCost;
  const annualCustomsFees = internationalShipments * feePerShipment;
  const customsCostSavings = annualCustomsFees * (customsSavings / 100);
  
  const totalPLImpact = netDiscountBenefit + totalHeadcountSavings + customsCostSavings;
  const workingCapitalValue = workingCapitalReleased * totalFundingRate;
  const totalAnnualBenefit = totalPLImpact + workingCapitalValue;

  // Adjusted Financials
  const adjustedCostOfSales = costOfSales - netDiscountBenefit;
  const grossProfit = turnover - costOfSales;
  const adjustedGrossProfit = turnover - adjustedCostOfSales;
  const adjustedOperatingProfit = operatingProfit + totalPLImpact;
  const netIncome = operatingProfit - netInterest;
  const adjustedNetIncome = adjustedOperatingProfit - netInterest;
  const estimatedDA = grossProfit - operatingProfit;
  const ebitda = operatingProfit + estimatedDA;
  const adjustedEBITDA = adjustedOperatingProfit + estimatedDA;
  const adjustedTradePayables = tradePayables + additionalDPO;
  const adjustedNetDebt = netDebt - workingCapitalReleased;
  const adjustedEquity = equity + totalPLImpact;
  const adjustedFCF = cashFromOperations + workingCapitalReleased;
  
  const leverage = ebitda !== 0 ? netDebt / ebitda : 0;
  const adjustedLeverage = adjustedEBITDA !== 0 ? adjustedNetDebt / adjustedEBITDA : 0;
  const solvency = equity !== 0 ? netDebt / equity : 0;
  const adjustedSolvency = adjustedEquity !== 0 ? adjustedNetDebt / adjustedEquity : 0;
  const ebitdaMargin = turnover !== 0 ? ebitda / turnover : 0;
  const adjustedEbitdaMargin = turnover !== 0 ? adjustedEBITDA / turnover : 0;
  const fcfToSales = turnover !== 0 ? cashFromOperations / turnover : 0;
  const adjustedFcfToSales = turnover !== 0 ? adjustedFCF / turnover : 0;

  const formatCurrency = (value) => {
    const absValue = Math.abs(value);
    const formatted = new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(absValue);
    return value < 0 ? `(${formatted})` : formatted;
  };

  const formatNumber = (value) => {
    return new Intl.NumberFormat('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(value);
  };

  const formatPercent = (value) => `${(value * 100).toFixed(1)}%`;
  const formatRatio = (value) => value.toFixed(1) + 'x';
  const getChangeArrow = (original, adjusted) => adjusted > original ? '↑' : '↓';

  const InputRow = ({ label, value, onChange, type = "number", step = "0.1", unit = "" }) => {
    const [localValue, setLocalValue] = useState(value);
    
    useEffect(() => {
      setLocalValue(value);
    }, [value]);
    
    const handleBlur = () => {
      if (type === "number") {
        const numValue = Number(localValue);
        if (!isNaN(numValue)) {
          onChange(numValue);
        }
      } else {
        onChange(localValue);
      }
    };
    
    return (
      <div className="flex items-center gap-3 py-1.5">
        <label className="text-xs text-gray-700 w-52 flex-shrink-0">{label}</label>
        <input
          type={type}
          step={step}
          value={localValue}
          onChange={(e) => setLocalValue(type === "number" ? e.target.value : e.target.value)}
          onBlur={handleBlur}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleBlur();
              e.target.blur();
            }
          }}
          className="w-40 px-2 py-1 border border-gray-300 rounded text-sm text-right focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
        {unit && <span className="text-xs text-gray-500 w-12">{unit}</span>}
      </div>
    );
  };

  const SliderRow = ({ label, value, onChange, min = 0, max = 100, step = 5, unit = "%", showValue = true, info = "" }) => {
    const [localValue, setLocalValue] = useState(value);
    const [isDragging, setIsDragging] = useState(false);
    
    useEffect(() => {
      if (!isDragging) {
        setLocalValue(value);
      }
    }, [value, isDragging]);
    
    const handleChange = (e) => {
      setLocalValue(Number(e.target.value));
    };
    
    const handleMouseDown = () => {
      setIsDragging(true);
    };
    
    const handleMouseUp = () => {
      setIsDragging(false);
      onChange(localValue);
    };
    
    return (
      <div className="py-1.5">
        <div className="flex items-center justify-between mb-1">
          <label className="text-xs text-gray-700">{label}</label>
          {showValue && <span className="text-xs font-semibold text-blue-600">{localValue}{unit}</span>}
        </div>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={localValue}
          onChange={handleChange}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onTouchStart={handleMouseDown}
          onTouchEnd={handleMouseUp}
          className="w-full h-1.5 bg-gray-200 rounded-lg cursor-pointer accent-blue-600"
        />
        {info && <div className="text-xs text-gray-500 mt-0.5">{info}</div>}
      </div>
    );
  };

  const tabs = [
    { id: 'inputs', label: 'Input Assumptions', icon: Settings },
    { id: 'results', label: 'Results', icon: BarChart3 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-4 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calculator className="text-blue-600" size={28} />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Trade Digitalization Simulator</h1>
                <p className="text-sm text-gray-600">Complete financial impact analysis with operational benefits</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {showSaved && (
                <div className="flex items-center gap-1 text-green-600 text-sm animate-pulse">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Saved</span>
                </div>
              )}
              <button
                onClick={() => {
                  if (confirm('Reset all values to defaults? This cannot be undone.')) {
                    localStorage.removeItem('tradeSimulator');
                    window.location.reload();
                  }
                }}
                className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg border border-gray-300 transition-colors"
              >
                Reset to Defaults
              </button>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-t-xl shadow-lg overflow-hidden">
          <div className="flex border-b border-gray-200">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white border-b-2 border-blue-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon size={18} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* TAB 1: INPUT ASSUMPTIONS */}
            {activeTab === 'inputs' && (
              <div className="grid grid-cols-2 gap-6">
                {/* LEFT COLUMN: All Number Inputs */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <DollarSign size={16} className="text-blue-600" />
                    Input Data
                  </h3>
                  <div className="space-y-1">
                    <div className="flex items-center gap-3 py-1.5">
                      <label className="text-xs text-gray-700 w-52">Currency</label>
                      <select
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                        className="w-40 px-2 py-1 border border-gray-300 rounded text-sm"
                      >
                        <option value="GBP">GBP (£)</option>
                        <option value="USD">USD ($)</option>
                        <option value="EUR">EUR (€)</option>
                      </select>
                    </div>
                    <InputRow label="Turnover / Revenue" value={turnover} onChange={setTurnover} />
                    <InputRow label="Cost of Sales" value={costOfSales} onChange={setCostOfSales} />
                    <InputRow label="Operating Profit" value={operatingProfit} onChange={setOperatingProfit} />
                    <InputRow label="Net Interest Payable" value={netInterest} onChange={setNetInterest} />
                    <InputRow label="Trade Payables" value={tradePayables} onChange={setTradePayables} />
                    <div className="text-xs text-gray-500 pl-52 py-0.5">Current DPO: {currentDPO.toFixed(1)} days</div>
                    <InputRow label="Net Financial Debt" value={netDebt} onChange={setNetDebt} />
                    <InputRow label="Equity" value={equity} onChange={setEquity} />
                    <InputRow label="Free Cash Flow" value={cashFromOperations} onChange={setCashFromOperations} />
                    
                    {/* Divider line */}
                    <div className="border-t-2 border-gray-300 my-3"></div>
                    
                    <div className="text-xs font-semibold text-gray-700 mb-2">Operational Costs</div>
                    <InputRow label="International Shipments / Year" value={internationalShipments} onChange={setInternationalShipments} step="1" />
                    <InputRow label="Fee per Shipment" value={feePerShipment * 1000000} onChange={(val) => setFeePerShipment(val / 1000000)} step="100" />
                    <div className="text-xs text-gray-500 pl-52 py-0.5">Total: {formatCurrency(annualCustomsFees)}</div>
                    <InputRow label="AP Team Headcount" value={apHeadcount} onChange={setApHeadcount} step="1" />
                    <InputRow label="Trade Compliance Headcount" value={tradeComplianceHeadcount} onChange={setTradeComplianceHeadcount} step="1" />
                    <InputRow label="Avg Salary Cost" value={avgSalaryCost * 1000000} onChange={(val) => setAvgSalaryCost(val / 1000000)} step="1000" />
                    <InputRow label="Platform Cost (millions)" value={platformCost} onChange={setPlatformCost} step="0.1" />
                  </div>
                  
                  {/* Summary Results Box */}
                  <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg p-4 border-2 border-indigo-200 mt-4">
                    <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <BarChart3 size={16} className="text-indigo-600" />
                      Summary Benefits
                    </h3>
                    <div className="space-y-2">
                      <div className="bg-white rounded p-2 border border-green-200 flex items-center justify-between">
                        <div className="text-xs text-gray-600">Discount Benefit</div>
                        <div className="text-base font-bold text-green-700">{formatCurrency(netDiscountBenefit)}</div>
                      </div>
                      <div className="bg-white rounded p-2 border border-purple-200">
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-gray-600">Headcount Savings</div>
                          <div className="text-base font-bold text-purple-700">{formatCurrency(totalHeadcountSavings)}</div>
                        </div>
                        <div className="text-xs text-gray-500 text-right mt-0.5">{formatNumber(apHeadcountSaved + tradeHeadcountSaved)} FTEs</div>
                      </div>
                      <div className="bg-white rounded p-2 border border-orange-200 flex items-center justify-between">
                        <div className="text-xs text-gray-600">Customs Savings</div>
                        <div className="text-base font-bold text-orange-700">{formatCurrency(customsCostSavings)}</div>
                      </div>
                      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded p-2 border-2 border-indigo-400 mt-2 flex items-center justify-between">
                        <div className="text-xs text-indigo-100">Total annual P&L benefit</div>
                        <div className="text-xl font-bold text-white">{formatCurrency(totalPLImpact)}</div>
                      </div>
                      <div className="bg-white rounded p-2 border border-blue-200 flex items-center justify-between mt-2">
                        <div className="text-xs text-gray-600">Additional working capital generated</div>
                        <div className="text-base font-bold text-blue-700">{formatCurrency(workingCapitalReleased)}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* RIGHT COLUMN: All Sliders - Aligned with inputs */}
                <div className="space-y-1">
                  {/* Spacers to align with Currency and Turnover */}
                  <div className="h-[42px]"></div>
                  <div className="h-[34px]"></div>
                  
                  {/* Spend Analysis - Aligned with Cost of Sales */}
                  <div className="bg-blue-50 rounded-lg p-3">
                    <h3 className="text-xs font-semibold text-gray-900 mb-2">Spend Analysis</h3>
                    <div className="space-y-2">
                      <SliderRow 
                        label="Relevant Spend (%)" 
                        value={relevantSpendPct} 
                        onChange={setRelevantSpendPct}
                        info={`${formatCurrency(relevantSpend)}`}
                      />
                      <SliderRow 
                        label="International Suppliers (%)" 
                        value={internationalSpendPct} 
                        onChange={setInternationalSpendPct}
                        info={`Int'l: ${formatCurrency(internationalSpend)} | Dom: ${formatCurrency(domesticSpend)}`}
                      />
                      <div className="text-xs text-blue-700 font-medium">Avg shipment: {formatCurrency(avgShipmentSize)}</div>
                    </div>
                  </div>

                  {/* Trade Finance Program - Aligned with Operating Profit through Free Cash Flow */}
                  <div className="bg-blue-50 rounded-lg p-3">
                    <h3 className="text-xs font-semibold text-gray-900 mb-2">Trade Finance Program</h3>
                    <div className="space-y-2">
                      <SliderRow 
                        label="New DPO Target (days)" 
                        value={newDPO} 
                        onChange={setNewDPO} 
                        min={30} 
                        max={120} 
                        unit=" days"
                        info={`Extension: +${(newDPO - currentDPO).toFixed(1)} days`}
                      />
                      <SliderRow 
                        label="Supplier Discount (%)" 
                        value={discount} 
                        onChange={setDiscount} 
                        min={0} 
                        max={10} 
                        step={0.5}
                      />
                      <SliderRow 
                        label="Supplier Uptake (%)" 
                        value={uptakePct} 
                        onChange={setUptakePct}
                      />
                      <SliderRow 
                        label="Acceleration (%)" 
                        value={accelerationPct} 
                        onChange={setAccelerationPct}
                      />
                      <SliderRow 
                        label="Funding Base Rate (%)" 
                        value={fundingBaseRate} 
                        onChange={setFundingBaseRate} 
                        min={0} 
                        max={15} 
                        step={0.25}
                      />
                      <SliderRow 
                        label="Funding Spread (bps)" 
                        value={fundingSpread} 
                        onChange={setFundingSpread} 
                        min={0} 
                        max={1000} 
                        step={50} 
                        unit=" bps"
                      />
                      <SliderRow 
                        label="Free Days" 
                        value={freeDays} 
                        onChange={setFreeDays} 
                        min={0} 
                        max={30} 
                        step={1} 
                        unit=" days"
                      />
                      <SliderRow 
                        label="Treasury Funding (%)" 
                        value={treasuryFundingPct} 
                        onChange={setTreasuryFundingPct}
                      />
                    </div>
                  </div>

                  {/* Spacer to align with Operational Costs section (after divider line) */}
                  <div className="h-[52px]"></div>

                  {/* Efficiency Gains - Aligned with operational costs */}
                  <div className="bg-green-50 rounded-lg p-3">
                    <h3 className="text-xs font-semibold text-gray-900 mb-2">Efficiency Assumptions</h3>
                    <div className="space-y-2">
                      <SliderRow 
                        label="Customs Fee Reduction (%)" 
                        value={customsSavings} 
                        onChange={setCustomsSavings}
                        info={`Saves ${formatCurrency(customsCostSavings)}`}
                      />
                      <SliderRow 
                        label="AP Efficiency Gain (%)" 
                        value={apEfficiency} 
                        onChange={setApEfficiency}
                        info={`${formatNumber(apHeadcountSaved)} FTEs = ${formatCurrency(apHeadcountSaved * avgSalaryCost)}`}
                      />
                      <SliderRow 
                        label="Trade Compliance Efficiency (%)" 
                        value={tradeEfficiency} 
                        onChange={setTradeEfficiency}
                        info={`${formatNumber(tradeHeadcountSaved)} FTEs = ${formatCurrency(tradeHeadcountSaved * avgSalaryCost)}`}
                      />
                    </div>
                    <div className="bg-white rounded p-2 mt-2 border border-green-200">
                      <div className="text-xs font-semibold text-gray-900 mb-1">Total Efficiency Savings</div>
                      <div className="space-y-1 text-xs">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Headcount:</span>
                          <span className="font-semibold text-green-700">{formatCurrency(totalHeadcountSavings)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Customs:</span>
                          <span className="font-semibold text-green-700">{formatCurrency(customsCostSavings)}</span>
                        </div>
                        <div className="flex justify-between border-t pt-1">
                          <span className="font-semibold text-gray-900">Total:</span>
                          <span className="font-bold text-green-700">{formatCurrency(totalHeadcountSavings + customsCostSavings)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: RESULTS - Financial Simulation + Benefits */}
            {activeTab === 'results' && (
              <div className="space-y-6">
                {/* Financial Simulation */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-6 text-white">
                  <h2 className="text-xl font-bold mb-2">Financial Statement Simulation</h2>
                  <p className="text-blue-100 text-sm">Before and after comparison showing the complete impact on your published financials</p>
                </div>

                <div className="overflow-x-auto bg-white rounded-lg shadow">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b-2 border-gray-300 bg-gray-50">
                        <th className="text-left py-2 px-3 font-semibold text-gray-700"></th>
                        <th className="text-right py-2 px-3 font-semibold text-gray-700">Actual</th>
                        <th className="py-2 px-2"></th>
                        <th className="text-right py-2 px-3 font-semibold text-blue-700">With PrimaTrade</th>
                        <th className="text-left py-2 px-3 font-semibold text-gray-600">Impact</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-gray-100">
                        <td colSpan="5" className="py-2 px-3 font-semibold text-gray-900 text-xs">INCOME STATEMENT (millions)</td>
                      </tr>
                      <tr className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="py-2 px-3 text-gray-700">Turnover</td>
                        <td className="py-2 px-3 text-right">{formatCurrency(turnover)}</td>
                        <td className="py-2 px-2 text-center"><ArrowRight size={14} className="mx-auto text-gray-400" /></td>
                        <td className="py-2 px-3 text-right text-blue-700">{formatCurrency(turnover)}</td>
                        <td className="py-2 px-3 text-gray-500 text-xs">No change</td>
                      </tr>
                      <tr className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="py-2 px-3 text-gray-700">Cost of sales</td>
                        <td className="py-2 px-3 text-right">{formatCurrency(-costOfSales)}</td>
                        <td className="py-2 px-2 text-center"><ArrowRight size={14} className="mx-auto text-gray-400" /></td>
                        <td className="py-2 px-3 text-right text-blue-700 font-semibold">{formatCurrency(-adjustedCostOfSales)}</td>
                        <td className="py-2 px-3 text-green-600 text-xs font-medium">Reduced via discounts</td>
                      </tr>
                      <tr className="border-b border-gray-200 bg-blue-50">
                        <td className="py-2 px-3 font-semibold text-gray-900">Gross profit</td>
                        <td className="py-2 px-3 text-right font-semibold">{formatCurrency(grossProfit)}</td>
                        <td className="py-2 px-2 text-center"><ArrowRight size={14} className="mx-auto text-gray-400" /></td>
                        <td className="py-2 px-3 text-right text-blue-700 font-bold">{formatCurrency(adjustedGrossProfit)}</td>
                        <td className="py-2 px-3 text-green-600 text-xs font-medium">+ {formatCurrency(adjustedGrossProfit - grossProfit)}</td>
                      </tr>
                      <tr className="border-b border-gray-200 bg-blue-50">
                        <td className="py-2 px-3 font-semibold text-gray-900">Operating profit</td>
                        <td className="py-2 px-3 text-right font-semibold">{formatCurrency(operatingProfit)}</td>
                        <td className="py-2 px-2 text-center"><ArrowRight size={14} className="mx-auto text-gray-400" /></td>
                        <td className="py-2 px-3 text-right text-blue-700 font-bold">{formatCurrency(adjustedOperatingProfit)}</td>
                        <td className="py-2 px-3 text-green-600 text-xs font-medium">+ {formatCurrency(totalPLImpact)}</td>
                      </tr>
                      <tr className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="py-2 px-3 text-gray-700">Net interest payable</td>
                        <td className="py-2 px-3 text-right">{formatCurrency(-netInterest)}</td>
                        <td className="py-2 px-2 text-center"><ArrowRight size={14} className="mx-auto text-gray-400" /></td>
                        <td className="py-2 px-3 text-right text-blue-700">{formatCurrency(-netInterest)}</td>
                        <td className="py-2 px-3 text-gray-500 text-xs">Unchanged</td>
                      </tr>
                      <tr className="border-b-2 border-gray-300 bg-blue-50">
                        <td className="py-2 px-3 font-semibold text-gray-900">Net income</td>
                        <td className="py-2 px-3 text-right font-semibold">{formatCurrency(netIncome)}</td>
                        <td className="py-2 px-2 text-center"><ArrowRight size={14} className="mx-auto text-gray-400" /></td>
                        <td className="py-2 px-3 text-right text-blue-700 font-bold">{formatCurrency(adjustedNetIncome)}</td>
                        <td className="py-2 px-3 text-green-600 text-xs font-medium">{getChangeArrow(netIncome, adjustedNetIncome)} + {formatCurrency(adjustedNetIncome - netIncome)}</td>
                      </tr>
                      <tr className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="py-2 px-3 text-gray-700">EBITDA</td>
                        <td className="py-2 px-3 text-right">{formatCurrency(ebitda)}</td>
                        <td className="py-2 px-2 text-center"><ArrowRight size={14} className="mx-auto text-gray-400" /></td>
                        <td className="py-2 px-3 text-right text-blue-700 font-semibold">{formatCurrency(adjustedEBITDA)}</td>
                        <td className="py-2 px-3 text-green-600 text-xs font-medium">{getChangeArrow(ebitda, adjustedEBITDA)} Improved</td>
                      </tr>
                      
                      <tr className="bg-gray-100">
                        <td colSpan="5" className="py-2 px-3 font-semibold text-gray-900 pt-3 text-xs">BALANCE SHEET (millions)</td>
                      </tr>
                      <tr className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="py-2 px-3 text-gray-700">Trade payables</td>
                        <td className="py-2 px-3 text-right">{formatCurrency(tradePayables)}</td>
                        <td className="py-2 px-2 text-center"><ArrowRight size={14} className="mx-auto text-gray-400" /></td>
                        <td className="py-2 px-3 text-right text-blue-700 font-semibold">{formatCurrency(adjustedTradePayables)}</td>
                        <td className="py-2 px-3 text-green-600 text-xs font-medium">+ {formatCurrency(additionalDPO)} DPO</td>
                      </tr>
                      <tr className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="py-2 px-3 text-gray-700">Net financial debt</td>
                        <td className="py-2 px-3 text-right">{formatCurrency(netDebt)}</td>
                        <td className="py-2 px-2 text-center"><ArrowRight size={14} className="mx-auto text-gray-400" /></td>
                        <td className="py-2 px-3 text-right text-blue-700 font-semibold">{formatCurrency(adjustedNetDebt)}</td>
                        <td className="py-2 px-3 text-green-600 text-xs font-medium">↓ - {formatCurrency(workingCapitalReleased)}</td>
                      </tr>
                      <tr className="border-b-2 border-gray-300 hover:bg-gray-50">
                        <td className="py-2 px-3 text-gray-700">Equity</td>
                        <td className="py-2 px-3 text-right">{formatCurrency(equity)}</td>
                        <td className="py-2 px-2 text-center"><ArrowRight size={14} className="mx-auto text-gray-400" /></td>
                        <td className="py-2 px-3 text-right text-blue-700 font-semibold">{formatCurrency(adjustedEquity)}</td>
                        <td className="py-2 px-3 text-green-600 text-xs font-medium">↑ + {formatCurrency(totalPLImpact)}</td>
                      </tr>
                      
                      <tr className="bg-gray-100">
                        <td colSpan="5" className="py-2 px-3 font-semibold text-gray-900 pt-3 text-xs">FINANCIAL KPIs</td>
                      </tr>
                      <tr className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="py-2 px-3 text-gray-700">Leverage (Net Debt / EBITDA)</td>
                        <td className="py-2 px-3 text-right">{formatRatio(leverage)}</td>
                        <td className="py-2 px-2 text-center"><ArrowRight size={14} className="mx-auto text-gray-400" /></td>
                        <td className="py-2 px-3 text-right text-blue-700 font-semibold">{formatRatio(adjustedLeverage)}</td>
                        <td className="py-2 px-3 text-green-600 text-xs font-medium">↓ Reduced</td>
                      </tr>
                      <tr className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="py-2 px-3 text-gray-700">Solvency (Debt / Equity)</td>
                        <td className="py-2 px-3 text-right">{formatRatio(solvency)}</td>
                        <td className="py-2 px-2 text-center"><ArrowRight size={14} className="mx-auto text-gray-400" /></td>
                        <td className="py-2 px-3 text-right text-blue-700 font-semibold">{formatRatio(adjustedSolvency)}</td>
                        <td className="py-2 px-3 text-green-600 text-xs font-medium">↓ Improved</td>
                      </tr>
                      <tr className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="py-2 px-3 text-gray-700">Free cash flow</td>
                        <td className="py-2 px-3 text-right">{formatCurrency(cashFromOperations)}</td>
                        <td className="py-2 px-2 text-center"><ArrowRight size={14} className="mx-auto text-gray-400" /></td>
                        <td className="py-2 px-3 text-right text-blue-700 font-semibold">{formatCurrency(adjustedFCF)}</td>
                        <td className="py-2 px-3 text-green-600 text-xs font-medium">+ {formatCurrency(workingCapitalReleased)}</td>
                      </tr>
                      <tr className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="py-2 px-3 text-gray-700">EBITDA margin</td>
                        <td className="py-2 px-3 text-right">{formatPercent(ebitdaMargin)}</td>
                        <td className="py-2 px-2 text-center"><ArrowRight size={14} className="mx-auto text-gray-400" /></td>
                        <td className="py-2 px-3 text-right text-blue-700 font-semibold">{formatPercent(adjustedEbitdaMargin)}</td>
                        <td className="py-2 px-3 text-green-600 text-xs font-medium">↑ Improved</td>
                      </tr>
                      <tr className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="py-2 px-3 text-gray-700">FCF / Sales</td>
                        <td className="py-2 px-3 text-right">{formatPercent(fcfToSales)}</td>
                        <td className="py-2 px-2 text-center"><ArrowRight size={14} className="mx-auto text-gray-400" /></td>
                        <td className="py-2 px-3 text-right text-blue-700 font-semibold">{formatPercent(adjustedFcfToSales)}</td>
                        <td className="py-2 px-3 text-green-600 text-xs font-medium">↑ Improved</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Benefits Summary */}
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg p-5 text-white shadow-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign size={18} />
                      <h3 className="text-sm font-semibold">Discount Benefit</h3>
                    </div>
                    <div className="text-3xl font-bold mb-1">{formatCurrency(netDiscountBenefit)}</div>
                    <div className="text-xs opacity-90">Net P&L from early payment discounts</div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg p-5 text-white shadow-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Users size={18} />
                      <h3 className="text-sm font-semibold">Headcount Savings</h3>
                    </div>
                    <div className="text-3xl font-bold mb-1">{formatCurrency(totalHeadcountSavings)}</div>
                    <div className="text-xs opacity-90">{formatNumber(apHeadcountSaved + tradeHeadcountSaved)} FTEs eliminated</div>
                  </div>

                  <div className="bg-gradient-to-br from-orange-500 to-amber-600 rounded-lg p-5 text-white shadow-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <FileText size={18} />
                      <h3 className="text-sm font-semibold">Customs Savings</h3>
                    </div>
                    <div className="text-3xl font-bold mb-1">{formatCurrency(customsCostSavings)}</div>
                    <div className="text-xs opacity-90">{internationalShipments.toLocaleString()} shipments, {customsSavings}% reduction</div>
                  </div>

                  <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg p-5 text-white shadow-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp size={18} />
                      <h3 className="text-sm font-semibold">Working Capital Generated</h3>
                    </div>
                    <div className="text-3xl font-bold mb-1">{formatCurrency(workingCapitalReleased)}</div>
                    <div className="text-xs opacity-90">Cash released via extended DPO</div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-xl p-8 text-white shadow-2xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-3xl font-bold mb-2">Total Annual P&L Benefit</h3>
                      <p className="text-indigo-100">Direct impact on profit & loss statement</p>
                    </div>
                    <div className="text-right">
                      <div className="text-6xl font-bold">{formatCurrency(totalPLImpact)}</div>
                      <div className="text-indigo-100 text-lg mt-1">per year</div>
                    </div>
                  </div>
                  
                  <div className="mt-6 grid grid-cols-3 gap-6 pt-6 border-t border-indigo-400">
                    <div>
                      <div className="text-indigo-200 text-sm mb-1">Discount Benefit</div>
                      <div className="text-2xl font-bold">{formatCurrency(netDiscountBenefit)}</div>
                      <div className="text-xs text-indigo-200 mt-1">
                        Early payment discounts
                      </div>
                    </div>
                    <div>
                      <div className="text-indigo-200 text-sm mb-1">Headcount Savings</div>
                      <div className="text-2xl font-bold">{formatCurrency(totalHeadcountSavings)}</div>
                      <div className="text-xs text-indigo-200 mt-1">
                        AP & Trade Compliance
                      </div>
                    </div>
                    <div>
                      <div className="text-indigo-200 text-sm mb-1">Customs Savings</div>
                      <div className="text-2xl font-bold">{formatCurrency(customsCostSavings)}</div>
                      <div className="text-xs text-indigo-200 mt-1">
                        Direct filing eliminates fees
                      </div>
                    </div>
                  </div>
                </div>

                {/* Working Capital Section */}
                <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl p-6 text-white shadow-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-2xl font-bold mb-1">Additional Working Capital Generated</h3>
                      <p className="text-blue-100 text-sm">Cash released through extended payment terms (not P&L impact)</p>
                    </div>
                    <div className="text-right">
                      <div className="text-5xl font-bold">{formatCurrency(workingCapitalReleased)}</div>
                    </div>
                  </div>
                  <div className="mt-4 text-sm text-blue-100">
                    SCF Facility Required: <span className="font-bold">{formatCurrency(scfFacilitySize)}</span>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">P&L Impact Breakdown</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center pb-2">
                        <span className="text-sm text-gray-600">Supplier Discounts (net):</span>
                        <span className="font-semibold text-green-700">{formatCurrency(netDiscountBenefit)}</span>
                      </div>
                      <div className="flex justify-between items-center pb-2">
                        <span className="text-sm text-gray-600">AP Headcount Savings:</span>
                        <span className="font-semibold text-green-700">{formatCurrency(apHeadcountSaved * avgSalaryCost)}</span>
                      </div>
                      <div className="flex justify-between items-center pb-2">
                        <span className="text-sm text-gray-600">Trade Compliance Savings:</span>
                        <span className="font-semibold text-green-700">{formatCurrency(tradeHeadcountSaved * avgSalaryCost)}</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b">
                        <span className="text-sm text-gray-600">Customs Fee Savings:</span>
                        <span className="font-semibold text-green-700">{formatCurrency(customsCostSavings)}</span>
                      </div>
                      <div className="flex justify-between items-center pt-2">
                        <span className="font-bold text-gray-900">Total P&L Improvement:</span>
                        <span className="text-xl font-bold text-green-700">{formatCurrency(totalPLImpact)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Program Metrics</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Relevant Spend:</span>
                        <span className="font-semibold">{formatCurrency(relevantSpend)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 pl-4">• International ({internationalSpendPct}%):</span>
                        <span className="font-semibold text-blue-700">{formatCurrency(internationalSpend)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 pl-4">• Domestic ({100-internationalSpendPct}%):</span>
                        <span className="font-semibold text-blue-700">{formatCurrency(domesticSpend)}</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t">
                        <span className="text-gray-600">Average Shipment Size:</span>
                        <span className="font-semibold">{formatCurrency(avgShipmentSize)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Current DPO:</span>
                        <span className="font-semibold">{currentDPO.toFixed(1)} days</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Target DPO:</span>
                        <span className="font-semibold text-blue-700">{newDPO} days</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">DPO Extension:</span>
                        <span className="font-semibold text-green-700">+{(newDPO - currentDPO).toFixed(1)} days</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t">
                        <span className="text-gray-600">Total Headcount Saved:</span>
                        <span className="font-semibold text-purple-700">{formatNumber(apHeadcountSaved + tradeHeadcountSaved)} FTEs</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Supplier Uptake:</span>
                        <span className="font-semibold">{uptakePct}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
