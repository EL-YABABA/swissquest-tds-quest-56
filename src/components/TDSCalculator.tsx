import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import labBackground from '@/assets/lab-background.jpg';

interface FormData {
  tds: string;
  temperature: string;
  pumpCapacity: string;
  recovery: string;
  flow: string;
  tankSize: string;
  pumpSetting: string;
  runningHours: string;
  // Chemical parameters
  ca: string;
  mg: string;
  co3: string;
  hcoe: string;
  cl: string;
  fe: string;
}

const TDSCalculator = () => {
  const [formData, setFormData] = useState<FormData>({
    tds: '3000',
    temperature: '',
    pumpCapacity: '',
    recovery: '',
    flow: '',
    tankSize: '',
    pumpSetting: '',
    runningHours: '',
    // Chemical parameters
    ca: '',
    mg: '',
    co3: '',
    hcoe: '',
    cl: '',
    fe: '',
  });

  const [results, setResults] = useState<any>(null);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = () => {
    return Object.values(formData).every(value => value.trim() !== '');
  };

  const calculateDosing = () => {
    if (!validateForm()) {
      alert('Please fill all fields before calculating');
      return;
    }

    // TDS dosing calculation logic
    const tdsValue = parseFloat(formData.tds) || 0;
    const flowValue = parseFloat(formData.flow) || 0;
    const recoveryValue = parseFloat(formData.recovery) || 0;
    const tankSizeValue = parseFloat(formData.tankSize) || 0;
    const runningHoursValue = parseFloat(formData.runningHours) || 0;

    // TDS divided by 600 as requested
    const adjustedTDS = tdsValue / 600;
    
    // Basic calculation formulas
    const concentrationFactor = 100 / (100 - recoveryValue);
    const concentratedTDS = adjustedTDS * concentrationFactor;
    const dosingRate = (flowValue * 1000 * 0.001) / 24; // Convert to appropriate units
    const dailyConsumption = dosingRate * runningHoursValue;
    const tankDuration = tankSizeValue / dailyConsumption;

    setResults({
      adjustedTDS: adjustedTDS.toFixed(2),
      concentrationFactor: concentrationFactor.toFixed(2),
      concentratedTDS: concentratedTDS.toFixed(2),
      dosingRate: dosingRate.toFixed(2),
      dailyConsumption: dailyConsumption.toFixed(2),
      tankDuration: tankDuration.toFixed(1)
    });
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed relative"
      style={{ backgroundImage: `url(${labBackground})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-lab-overlay backdrop-blur-sm"></div>
      
      <div className="relative z-10 container mx-auto px-2 sm:px-4 py-4 sm:py-6">
        {/* Header with Logo */}
        <div className="text-center mb-4 sm:mb-6">
          <div className="flex items-center justify-center gap-4 mb-4">
            <img 
              src="/lovable-uploads/28443e71-ea0c-4af7-816c-2c454fe0d335.png" 
              alt="SwissQuest Logo" 
              className="h-16 sm:h-20 w-auto"
            />
          </div>
        </div>

        <Card className="max-w-7xl mx-auto backdrop-blur-md border-0 shadow-2xl bg-swissquest-pink-red/90 text-white">
          <CardHeader className="text-center pb-3 sm:pb-4 px-3 sm:px-6">
            <CardTitle className="flex items-center justify-center gap-2 text-white text-lg sm:text-xl">
              <span>Dosing Calculation</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-4 sm:space-y-6 px-3 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
              {/* Left Column - 7 fields */}
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <Label htmlFor="tds" className="text-xs sm:text-sm font-medium text-white block mb-1">TDS</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="tds"
                      type="number"
                      value={formData.tds}
                      onChange={(e) => handleInputChange('tds', e.target.value)}
                      className="text-right bg-white text-red-600 font-semibold h-12 text-base"
                    />
                    <span className="text-xs sm:text-sm text-white min-w-[35px] sm:min-w-[40px]">ppm</span>
                  </div>
                </div>

                <div>
                  <Label htmlFor="temperature" className="text-xs sm:text-sm font-medium text-white block mb-1">Temperature of Feed Water</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="temperature"
                      type="number"
                      value={formData.temperature}
                      onChange={(e) => handleInputChange('temperature', e.target.value)}
                      className="text-right bg-white text-red-600 font-semibold h-12 text-base"
                    />
                    <span className="text-xs sm:text-sm text-white min-w-[35px] sm:min-w-[40px]">°C</span>
                  </div>
                </div>

                <div>
                  <Label htmlFor="pumpCapacity" className="text-xs sm:text-sm font-medium text-white block mb-1">Dosing Pump Capacity</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="pumpCapacity"
                      type="number"
                      value={formData.pumpCapacity}
                      onChange={(e) => handleInputChange('pumpCapacity', e.target.value)}
                      className="text-right bg-white text-red-600 font-semibold h-12 text-base"
                    />
                    <span className="text-xs sm:text-sm text-white min-w-[35px] sm:min-w-[40px]">LPH</span>
                  </div>
                </div>

                <div>
                  <Label htmlFor="recovery" className="text-xs sm:text-sm font-medium text-white block mb-1">Recovery</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="recovery"
                      type="number"
                      value={formData.recovery}
                      onChange={(e) => handleInputChange('recovery', e.target.value)}
                      className="text-right bg-white text-red-600 font-semibold h-12 text-base"
                    />
                    <span className="text-xs sm:text-sm text-white min-w-[35px] sm:min-w-[40px]">%</span>
                  </div>
                </div>

                <div>
                  <Label htmlFor="flow" className="text-xs sm:text-sm font-medium text-white block mb-1">
                    Flow in m³/hr (1 m³ = 1000 LPH)
                  </Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="flow"
                      type="number"
                      value={formData.flow}
                      onChange={(e) => handleInputChange('flow', e.target.value)}
                      className="text-right bg-white text-red-600 font-semibold h-12 text-base"
                    />
                    <span className="text-xs sm:text-sm text-white min-w-[40px] sm:min-w-[50px]">m³/hr</span>
                  </div>
                </div>

                <div>
                  <Label htmlFor="tankSize" className="text-xs sm:text-sm font-medium text-white block mb-1">Dosing Tank Size(Volume) in Litre</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="tankSize"
                      type="number"
                      value={formData.tankSize}
                      onChange={(e) => handleInputChange('tankSize', e.target.value)}
                      className="text-right bg-white text-red-600 font-semibold h-12 text-base"
                    />
                    <span className="text-xs sm:text-sm text-white min-w-[35px] sm:min-w-[40px]">ltr</span>
                  </div>
                </div>

                <div>
                  <Label htmlFor="pumpSetting" className="text-xs sm:text-sm font-medium text-white block mb-1">Dosing Pump Setting in %</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="pumpSetting"
                      type="number"
                      value={formData.pumpSetting}
                      onChange={(e) => handleInputChange('pumpSetting', e.target.value)}
                      className="text-right bg-white text-red-600 font-semibold h-12 text-base"
                    />
                    <span className="text-xs sm:text-sm text-white min-w-[35px] sm:min-w-[40px]">%</span>
                  </div>
                </div>
              </div>

              {/* Right Column - Chemical parameters */}
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <Label htmlFor="runningHours" className="text-xs sm:text-sm font-medium text-white block mb-1">Plant Running Hour/Day</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="runningHours"
                      type="number"
                      value={formData.runningHours}
                      onChange={(e) => handleInputChange('runningHours', e.target.value)}
                      className="text-right bg-white text-red-600 font-semibold h-12 text-base"
                    />
                    <span className="text-xs sm:text-sm text-white min-w-[40px] sm:min-w-[50px]">hr/day</span>
                  </div>
                </div>

                <div>
                  <Label htmlFor="ca" className="text-xs sm:text-sm font-medium text-white block mb-1">Ca (Calcium)</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="ca"
                      type="number"
                      value={formData.ca}
                      onChange={(e) => handleInputChange('ca', e.target.value)}
                      className="text-right bg-white text-red-600 font-semibold h-12 text-base"
                    />
                    <span className="text-xs sm:text-sm text-white min-w-[35px] sm:min-w-[40px]">ppm</span>
                  </div>
                </div>

                <div>
                  <Label htmlFor="mg" className="text-xs sm:text-sm font-medium text-white block mb-1">Mg (Magnesium)</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="mg"
                      type="number"
                      value={formData.mg}
                      onChange={(e) => handleInputChange('mg', e.target.value)}
                      className="text-right bg-white text-red-600 font-semibold h-12 text-base"
                    />
                    <span className="text-xs sm:text-sm text-white min-w-[35px] sm:min-w-[40px]">ppm</span>
                  </div>
                </div>

                <div>
                  <Label htmlFor="co3" className="text-xs sm:text-sm font-medium text-white block mb-1">CO₃ (Carbonate)</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="co3"
                      type="number"
                      value={formData.co3}
                      onChange={(e) => handleInputChange('co3', e.target.value)}
                      className="text-right bg-white text-red-600 font-semibold h-12 text-base"
                    />
                    <span className="text-xs sm:text-sm text-white min-w-[35px] sm:min-w-[40px]">ppm</span>
                  </div>
                </div>

                <div>
                  <Label htmlFor="hcoe" className="text-xs sm:text-sm font-medium text-white block mb-1">HCO₃ (Bicarbonate)</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="hcoe"
                      type="number"
                      value={formData.hcoe}
                      onChange={(e) => handleInputChange('hcoe', e.target.value)}
                      className="text-right bg-white text-red-600 font-semibold h-12 text-base"
                    />
                    <span className="text-xs sm:text-sm text-white min-w-[35px] sm:min-w-[40px]">ppm</span>
                  </div>
                </div>

                <div>
                  <Label htmlFor="cl" className="text-xs sm:text-sm font-medium text-white block mb-1">Cl (Chloride)</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="cl"
                      type="number"
                      value={formData.cl}
                      onChange={(e) => handleInputChange('cl', e.target.value)}
                      className="text-right bg-white text-red-600 font-semibold h-12 text-base"
                    />
                    <span className="text-xs sm:text-sm text-white min-w-[35px] sm:min-w-[40px]">ppm</span>
                  </div>
                </div>

                <div>
                  <Label htmlFor="fe" className="text-xs sm:text-sm font-medium text-white block mb-1">Fe (Iron)</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="fe"
                      type="number"
                      value={formData.fe}
                      onChange={(e) => handleInputChange('fe', e.target.value)}
                      className="text-right bg-white text-red-600 font-semibold h-12 text-base"
                    />
                    <span className="text-xs sm:text-sm text-white min-w-[35px] sm:min-w-[40px]">ppm</span>
                  </div>
                </div>
              </div>
            </div>

            <Button 
              onClick={calculateDosing}
              disabled={!validateForm()}
              className="w-full bg-white/20 hover:bg-white/30 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 sm:py-4 text-base sm:text-lg mt-4 sm:mt-6 h-12 sm:h-14"
            >
              CALCULATE
            </Button>

            {results && (
              <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-white/20 rounded-lg">
                <h3 className="font-semibold mb-2 text-white text-sm sm:text-base">Calculation Results:</h3>
                <div className="text-base sm:text-lg font-bold text-white">
                  {results.adjustedTDS} ppm
                </div>
              </div>
            )}

            <div className="text-center mt-4 sm:mt-6">
              <span className="text-xl sm:text-2xl font-bold text-white">TDS</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TDSCalculator;