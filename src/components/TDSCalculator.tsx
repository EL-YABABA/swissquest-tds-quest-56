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
      
      <div className="relative z-10 container mx-auto px-4 py-6">
        {/* Header with Logo */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-4 mb-4">
            <img 
              src="/lovable-uploads/eef60e35-4e45-40ae-950f-f170a82bd6f4.png" 
              alt="SwissQuest Logo" 
              className="h-12 w-auto"
            />
          </div>
        </div>

        <Card className="max-w-lg mx-auto backdrop-blur-md border-0 shadow-2xl bg-swissquest-pink-red/90 text-white">
          <CardHeader className="text-center pb-4">
            <CardTitle className="flex items-center justify-center gap-2 text-white">
              <span>Dosing Calculation</span>
              <ArrowRight className="w-5 h-5" />
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="tds" className="text-sm font-medium text-white">TDS</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="tds"
                  type="number"
                  value={formData.tds}
                  onChange={(e) => handleInputChange('tds', e.target.value)}
                  className="text-right"
                />
                <span className="text-sm text-white min-w-[40px]">ppm</span>
              </div>
            </div>

            <div>
              <Label htmlFor="temperature" className="text-sm font-medium text-white">Temperature of Feed Water</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="temperature"
                  type="number"
                  value={formData.temperature}
                  onChange={(e) => handleInputChange('temperature', e.target.value)}
                  className="text-right"
                />
                <span className="text-sm text-white min-w-[40px]">°C</span>
              </div>
            </div>

            <div>
              <Label htmlFor="pumpCapacity" className="text-sm font-medium text-white">Dosing Pump Capacity</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="pumpCapacity"
                  type="number"
                  value={formData.pumpCapacity}
                  onChange={(e) => handleInputChange('pumpCapacity', e.target.value)}
                  className="text-right"
                />
                <span className="text-sm text-white min-w-[40px]">LPH</span>
              </div>
            </div>

            <div>
              <Label htmlFor="recovery" className="text-sm font-medium text-white">Recovery</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="recovery"
                  type="number"
                  value={formData.recovery}
                  onChange={(e) => handleInputChange('recovery', e.target.value)}
                  className="text-right"
                />
                <span className="text-sm text-white min-w-[40px]">%</span>
              </div>
            </div>

            <div>
              <Label htmlFor="flow" className="text-sm font-medium text-white">
                Flow in m³/hr (1 m³ = 1000 LPH)
              </Label>
              <div className="flex items-center gap-2">
                <Input
                  id="flow"
                  type="number"
                  value={formData.flow}
                  onChange={(e) => handleInputChange('flow', e.target.value)}
                  className="text-right"
                />
                <span className="text-sm text-white min-w-[50px]">m³/hr</span>
              </div>
            </div>

            <div>
              <Label htmlFor="tankSize" className="text-sm font-medium text-white">Dosing Tank Size(Volume) in Litre</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="tankSize"
                  type="number"
                  value={formData.tankSize}
                  onChange={(e) => handleInputChange('tankSize', e.target.value)}
                  className="text-right"
                />
                <span className="text-sm text-white min-w-[40px]">ltr</span>
              </div>
            </div>

            <div>
              <Label htmlFor="pumpSetting" className="text-sm font-medium text-white">Dosing Pump Setting in %</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="pumpSetting"
                  type="number"
                  value={formData.pumpSetting}
                  onChange={(e) => handleInputChange('pumpSetting', e.target.value)}
                  className="text-right"
                />
                <span className="text-sm text-white min-w-[40px]">%</span>
              </div>
            </div>

            <div>
              <Label htmlFor="runningHours" className="text-sm font-medium text-white">Plant Running Hour/Day</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="runningHours"
                  type="number"
                  value={formData.runningHours}
                  onChange={(e) => handleInputChange('runningHours', e.target.value)}
                  className="text-right"
                />
                <span className="text-sm text-white min-w-[50px]">hr/day</span>
              </div>
            </div>

            <Button 
              onClick={calculateDosing}
              disabled={!validateForm()}
              className="w-full bg-swissquest-blue hover:bg-swissquest-blue/90 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 text-lg"
            >
              CALCULATE
            </Button>

            {results && (
              <div className="mt-6 p-4 bg-white/20 rounded-lg">
                <h3 className="font-semibold mb-2 text-white">Calculation Results:</h3>
                <div className="space-y-1 text-sm text-white">
                  <div className="font-medium">{results.adjustedTDS} ppm</div>
                  <div>Concentration Factor: {results.concentrationFactor}</div>
                  <div>Concentrated TDS: {results.concentratedTDS} ppm</div>
                  <div>Dosing Rate: {results.dosingRate} L/hr</div>
                  <div>Daily Consumption: {results.dailyConsumption} L/day</div>
                  <div>Tank Duration: {results.tankDuration} days</div>
                </div>
              </div>
            )}

            <div className="text-center mt-6">
              <span className="text-2xl font-bold text-swissquest-red">TDS</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TDSCalculator;