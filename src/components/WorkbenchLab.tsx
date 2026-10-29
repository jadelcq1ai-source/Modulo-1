import React, { useState, useEffect } from 'react';
import { 
  Zap, AlertTriangle, Flame, ShieldAlert, Cpu, Sparkles, 
  RotateCw, Play, Volume2, CheckCircle2, ArrowRight, Activity, Thermometer
} from 'lucide-react';
import { COMPONENTS_DATA, DIODE_SUBTYPES_DATA } from '../data/componentsData';
import { ComponentType, DiodeSubType } from '../types/hardware';
import { soundManager } from '../utils/audio';

export const WorkbenchLab: React.FC = () => {
  const [selectedComp, setSelectedComp] = useState<ComponentType>('condensador');
  const comp = COMPONENTS_DATA[selectedComp];

  // Simulator states for Capacitor
  const [capCharge, setCapCharge] = useState<number>(75);
  const [capDustHumidity, setCapDustHumidity] = useState<number>(10);
  const [capDischarging, setCapDischarging] = useState<boolean>(false);

  // Simulator states for Resistor
  const [resCode, setResCode] = useState<'104' | '4R7' | '0R0'>('104');
  const [resOhms, setResOhms] = useState<number>(100000);
  const [resInputV, setResInputV] = useState<number>(4.2);
  const [resR1, setResR1] = useState<number>(10);
  const [resR2, setResR2] = useState<number>(10);
  const [resDamaged, setResDamaged] = useState<boolean>(false);

  // Simulator states for Filter
  const [filterJumpered, setFilterJumpered] = useState<boolean>(false);
  const [filterDetached, setFilterDetached] = useState<boolean>(false);

  // Simulator states for Diode
  const [diodeType, setDiodeType] = useState<DiodeSubType>('zener');
  const [diodePolarityReverse, setDiodePolarityReverse] = useState<boolean>(false);
  const [tvsTriggered, setTvsTriggered] = useState<boolean>(false);

  // Simulator states for Thermistor
  const [thermistorType, setThermistorType] = useState<'NTC' | 'PTC'>('NTC');
  const [boardTemp, setBoardTemp] = useState<number>(25);
  const [thermistorZone, setThermistorZone] = useState<'carga' | 'cpu' | 'rf'>('carga');
  const [thermistorMissing, setThermistorMissing] = useState<boolean>(false);

  // Simulator states for Coil
  const [coilSurgeActive, setCoilSurgeActive] = useState<boolean>(false);

  // Trigger capacitor quick discharge (camera flash / motor pulse)
  const handleCapDischarge = () => {
    if (capDischarging) return;
    setCapDischarging(true);
    soundManager.playSolderingSizzle();
    setTimeout(() => {
      setCapCharge(10);
      setTimeout(() => {
        setCapCharge(85);
        setCapDischarging(false);
      }, 700);
    }, 150);
  };

  // Trigger Jumper repair for EMI filter
  const handleApplyJumper = () => {
    soundManager.playSolderingSizzle();
    setFilterJumpered(true);
    setFilterDetached(false);
    setTimeout(() => {
      soundManager.playSuccessChime();
    }, 300);
  };

  // Trigger TVS spark zap
  const handleTriggerTvsZap = () => {
    soundManager.playErrorBuzz();
    setTvsTriggered(true);
    setTimeout(() => {
      soundManager.playContinuityBeep(400);
    }, 400);
  };

  // Play test multimeter continuity tone
  const handleTestMultimeter = () => {
    soundManager.playProbeClick();
    if (selectedComp === 'condensador') {
      if (capDustHumidity > 60) {
        soundManager.playContinuityBeep(600);
      } else {
        soundManager.playProbeClick();
      }
    } else if (selectedComp === 'filtro') {
      if (!filterDetached || filterJumpered) {
        soundManager.playContinuityBeep(400);
      }
    } else if (selectedComp === 'bobina') {
      soundManager.playContinuityBeep(500);
    } else if (selectedComp === 'diodo') {
      if (tvsTriggered && diodeType === 'tvs') {
        soundManager.playContinuityBeep(500);
      } else {
        soundManager.playProbeClick();
      }
    } else {
      soundManager.playProbeClick();
    }
  };

  // Sync resistor code to ohms
  useEffect(() => {
    if (resCode === '104') setResOhms(100000);
    if (resCode === '4R7') setResOhms(4.7);
    if (resCode === '0R0') setResOhms(0);
  }, [resCode]);

  // Thermistor resistance math
  const getThermistorResistance = () => {
    if (thermistorMissing) return 'O.L (Infinita / Ausente)';
    const base = 47000; // 47kΩ at 25C
    if (thermistorType === 'NTC') {
      // Resistance drops as temp rises
      const calculated = Math.round(base * Math.exp(-0.045 * (boardTemp - 25)));
      return calculated > 1000 ? `${(calculated / 1000).toFixed(1)} kΩ` : `${calculated} Ω`;
    } else {
      // PTC: rises
      const calculated = Math.round(base * (1 + 0.05 * (boardTemp - 25)));
      return `${(calculated / 1000).toFixed(1)} kΩ`;
    }
  };

  // Voltage divider calculation
  const voutDivider = ((resR2 / (resR1 + resR2)) * resInputV).toFixed(2);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-8">
      {/* Introduction Hero Strip */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 relative overflow-hidden shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
              <span>MÓDULO 1 & GUÍA MAESTRA SMD</span>
              <span>·</span>
              <span>SIMULADOR TÉCNICO INTERACTIVO</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Laboratorio de Hardware y Componentes SMD
            </h1>
            <p className="text-slate-400 text-sm leading-relaxed">
              Explora visualmente la anatomía, principios físicos, fallas comunes y reglas de oro de los 6 componentes esenciales en mainboards de telefonía móvil.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 bg-slate-950 p-2 rounded-xl border border-slate-800">
            {(['condensador', 'resistencia', 'filtro', 'diodo', 'termistor', 'bobina'] as ComponentType[]).map((type) => {
              const info = COMPONENTS_DATA[type];
              const isSelected = selectedComp === type;
              return (
                <button
                  key={type}
                  onClick={() => {
                    setSelectedComp(type);
                    soundManager.playProbeClick();
                  }}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-bold'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
                  }`}
                >
                  <span>{info.name.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main 2-Zone Sandbox: Stage & Control/Concept Deck */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Zone (7 cols): Interactive Visual Stage */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-amber-400">
                  {comp.analogy}
                </span>
                <h2 className="text-xl font-bold text-white flex items-center gap-2 mt-0.5">
                  {comp.name}
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                    Símbolo: {comp.symbol}
                  </span>
                </h2>
              </div>

              <button
                onClick={handleTestMultimeter}
                className="flex items-center gap-2 px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-mono rounded-lg border border-slate-700 transition-colors"
                title="Probar con multímetro virtual"
              >
                <Activity className="w-3.5 h-3.5 text-amber-400" />
                <span>Probar Multímetro</span>
              </button>
            </div>

            {/* Component-Specific Interactive Viewports */}
            {selectedComp === 'condensador' && (
              <div className="space-y-6">
                {/* 3D Ceramic MLCC Graphic & State */}
                <div className="relative p-6 rounded-xl bg-slate-950 border border-slate-800/80 overflow-hidden flex flex-col items-center justify-center min-h-[260px]">
                  {/* Visual Condensador Body */}
                  <div className="relative flex items-center justify-center">
                    {/* Left solder termination */}
                    <div className="w-8 h-20 bg-gradient-to-r from-slate-400 to-slate-200 rounded-l-md border border-slate-400 shadow-md"></div>
                    {/* Ceramic center body (changes color from light brown to dark black if damaged!) */}
                    <div 
                      className={`h-20 w-36 transition-colors duration-500 relative flex items-center justify-center border-y border-slate-700 ${
                        capDustHumidity > 60 
                          ? 'bg-stone-900 shadow-inner' 
                          : 'bg-amber-700/80'
                      }`}
                    >
                      {/* Internal dielectric layer representation */}
                      <div className="w-full flex items-center justify-between px-2 opacity-60">
                        <div className="space-y-1">
                          {[...Array(4)].map((_, i) => (
                            <div key={i} className="w-3 h-1 bg-amber-200/50 rounded-full"></div>
                          ))}
                        </div>
                        <div className="text-center font-mono text-[10px] text-amber-100/90 font-bold px-1.5 py-0.5 rounded bg-black/40">
                          {capDustHumidity > 60 ? '⚡ CORTO' : 'DIELÉCTRICO'}
                        </div>
                        <div className="space-y-1">
                          {[...Array(4)].map((_, i) => (
                            <div key={i} className="w-3 h-1 bg-amber-200/50 rounded-full"></div>
                          ))}
                        </div>
                      </div>

                      {/* Burn crack visual if high stress */}
                      {capDustHumidity > 60 && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <Flame className="w-10 h-10 text-red-500 animate-pulse" />
                        </div>
                      )}
                    </div>
                    {/* Right solder termination */}
                    <div className="w-8 h-20 bg-gradient-to-r from-slate-200 to-slate-400 rounded-r-md border border-slate-400 shadow-md"></div>
                  </div>

                  {/* Bidirectional Notice Tag */}
                  <div className="mt-4 flex items-center gap-3 text-xs text-slate-400 font-mono">
                    <span className="text-emerald-400 font-semibold">● BIDIRECCIONAL</span>
                    <span>·</span>
                    <span>No tiene polaridad (funciona igual en cualquier sentido)</span>
                  </div>

                  {/* Hotspot warning if burnt */}
                  {capDustHumidity > 60 && (
                    <div className="mt-3 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-950/70 border border-red-500/40 text-red-300 text-xs">
                      <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                      <span>¡Alerta térmica!: Corto circuito total. Temperatura: 85°C (¡Quema la piel al tacto!). Color: Negro carbón.</span>
                    </div>
                  )}
                </div>

                {/* Interactive Controls for Capacitor */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Quick Charge / Discharge */}
                  <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
                      <span>Carga Rápida Almacenada</span>
                      <span className="font-mono text-amber-400">{capCharge}%</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                      <div 
                        className="bg-amber-500 h-full transition-all duration-300 rounded-full"
                        style={{ width: `${capCharge}%` }}
                      ></div>
                    </div>
                    <button
                      onClick={handleCapDischarge}
                      disabled={capDischarging}
                      className="w-full py-2 px-3 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-medium flex items-center justify-center gap-2 transition-colors"
                    >
                      <Zap className="w-3.5 h-3.5" />
                      <span>{capDischarging ? 'Descargando...' : 'Liberar Energía Súbita (Flash / Motor)'}</span>
                    </button>
                  </div>

                  {/* Degradation slider (Polvo / Humedad) */}
                  <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
                      <span>Falta de Mantenimiento & Humedad</span>
                      <span className={`font-mono ${capDustHumidity > 60 ? 'text-red-400 font-bold' : 'text-slate-400'}`}>
                        {capDustHumidity}% {capDustHumidity > 60 ? '(Corto)' : '(Sano)'}
                      </span>
                    </div>
                    <input 
                      type="range"
                      min="0"
                      max="100"
                      value={capDustHumidity}
                      onChange={(e) => setCapDustHumidity(Number(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                    <p className="text-[11px] text-slate-400 leading-tight">
                      El polvo eleva el calor y funde las capas. El agua produce electrólisis puenteando positivo y negativo.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {selectedComp === 'resistencia' && (
              <div className="space-y-6">
                {/* 3D Resistor Body View */}
                <div className="relative p-6 rounded-xl bg-slate-950 border border-slate-800/80 flex flex-col items-center justify-center min-h-[240px]">
                  <div className="relative flex items-center justify-center">
                    {/* Left solder termination */}
                    <div className="w-8 h-18 bg-gradient-to-r from-slate-400 to-slate-200 rounded-l-md border border-slate-400 shadow-md"></div>
                    {/* Black ceramic body with printed code */}
                    <div className={`h-18 w-36 bg-slate-950 border-y border-slate-800 flex items-center justify-center relative shadow-lg ${resDamaged ? 'opacity-50 border-red-500' : ''}`}>
                      <span className="font-mono text-xl font-bold tracking-widest text-slate-100 select-none">
                        {resDamaged ? 'O.L' : resCode}
                      </span>
                      {resDamaged && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-1 h-full bg-red-500/80 rotate-45"></div>
                        </div>
                      )}
                    </div>
                    {/* Right solder termination */}
                    <div className="w-8 h-18 bg-gradient-to-r from-slate-200 to-slate-400 rounded-r-md border border-slate-400 shadow-md"></div>
                  </div>

                  <div className="mt-4 flex items-center gap-3 text-xs text-slate-400 font-mono">
                    <span className="text-amber-400 font-semibold">Valor: {resDamaged ? 'Circuito Abierto (OL)' : `${resOhms} Ω`}</span>
                    <span>·</span>
                    <span>Obstáculo al flujo de electrones (genera calor)</span>
                  </div>

                  {resDamaged && (
                    <div className="mt-2 text-xs text-red-400 font-medium">
                      ⚠️ Resistencia abierta por sobrevoltaje: Corriente interrumpida totalmente.
                    </div>
                  )}
                </div>

                {/* Resistor Controls: Code selection & Voltage Divider Calculator */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3">
                    <span className="text-xs font-semibold text-slate-300 block">Código Serigrafiado SMD</span>
                    <div className="grid grid-cols-3 gap-2">
                      {(['104', '4R7', '0R0'] as const).map((code) => (
                        <button
                          key={code}
                          onClick={() => {
                            setResCode(code);
                            setResDamaged(false);
                            soundManager.playProbeClick();
                          }}
                          className={`py-2 px-2 text-xs font-mono font-bold rounded-lg border transition-all ${
                            resCode === code && !resDamaged
                              ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                              : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                          }`}
                        >
                          {code}
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={() => {
                        setResDamaged(!resDamaged);
                        soundManager.playErrorBuzz();
                      }}
                      className="w-full py-1.5 px-3 text-xs text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 rounded-lg transition-colors font-medium"
                    >
                      {resDamaged ? 'Restaurar Resistencia' : 'Simular Ruptura por Sobrevoltaje'}
                    </button>
                  </div>

                  {/* Voltage Divider Simulation */}
                  <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
                      <span>Divisor de Tensión (Alimenta 2 Circuitos)</span>
                      <span className="font-mono text-emerald-400 font-bold">{voutDivider} V</span>
                    </div>
                    <div className="text-xs text-slate-400 flex items-center justify-between">
                      <span>Vin: {resInputV}V (Batería)</span>
                      <span>R1: {resR1}kΩ / R2: {resR2}kΩ</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <input 
                        type="range"
                        min="2"
                        max="5"
                        step="0.1"
                        value={resInputV}
                        onChange={(e) => setResInputV(Number(e.target.value))}
                        className="accent-amber-500 cursor-pointer"
                        title="Voltaje de entrada (Vin)"
                      />
                      <input 
                        type="range"
                        min="1"
                        max="20"
                        value={resR2}
                        onChange={(e) => setResR2(Number(e.target.value))}
                        className="accent-emerald-500 cursor-pointer"
                        title="Resistencia R2"
                      />
                    </div>
                    <p className="text-[11px] text-slate-400 leading-tight">
                      Reduce la pérdida de corriente y prolonga la vida útil de la batería.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {selectedComp === 'filtro' && (
              <div className="space-y-6">
                {/* Oscilloscope View: Noisy signal vs Clean Signal */}
                <div className="relative p-6 rounded-xl bg-slate-950 border border-slate-800/80 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-slate-400">OSCILOSCOPIO DIGITAL: LÍNEA MIPI DSI (PANTALLA)</span>
                    <span className={`text-xs font-mono px-2 py-0.5 rounded ${
                      filterDetached && !filterJumpered 
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' 
                        : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    }`}>
                      {filterDetached && !filterJumpered ? '⚠️ SEÑAL CORTADA / RUIDO' : '● SEÑAL PURIFICADA'}
                    </span>
                  </div>

                  {/* Simulated Signal Waveform */}
                  <div className="h-28 w-full bg-slate-900 rounded-lg p-2 flex items-center justify-center relative overflow-hidden border border-slate-800">
                    <svg className="w-full h-full" viewBox="0 0 400 100" preserveAspectRatio="none">
                      <path
                        d={
                          filterDetached && !filterJumpered
                            ? "M 0 50 Q 20 10, 40 85 T 80 20 T 120 90 T 160 10 T 200 95 T 240 5 T 280 90 T 320 20 T 360 80 T 400 50"
                            : "M 0 50 Q 25 20, 50 50 T 100 50 T 150 50 T 200 50 T 250 50 T 300 50 T 350 50 T 400 50"
                        }
                        fill="none"
                        stroke={filterDetached && !filterJumpered ? "#f43f5e" : "#10b981"}
                        strokeWidth="2.5"
                      />
                    </svg>
                  </div>

                  {/* Phone screen preview */}
                  <div className="flex items-center justify-between p-3 rounded-lg bg-slate-900/80 border border-slate-800 text-xs">
                    <span className="text-slate-300">Efecto en la pantalla del celular:</span>
                    <span className={`font-semibold ${filterDetached && !filterJumpered ? 'text-rose-400 animate-pulse' : 'text-emerald-400'}`}>
                      {filterDetached && !filterJumpered ? 'Pantalla palpita, líneas y pérdida de imagen' : 'Imagen estable y nítida'}
                    </span>
                  </div>
                </div>

                {/* Filter Controls: Detach & Jumper Repair */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3">
                    <span className="text-xs font-semibold text-slate-300 block">Falla Común: Golpe o Manipulación</span>
                    <button
                      onClick={() => {
                        setFilterDetached(true);
                        setFilterJumpered(false);
                        soundManager.playErrorBuzz();
                      }}
                      className="w-full py-2 px-3 text-xs font-medium rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 transition-colors"
                    >
                      Simular Desprendimiento por Caída
                    </button>
                    <p className="text-[11px] text-slate-400 leading-tight">
                      Rara vez fallan internamente por su baja potencia. El 99% es desprendimiento físico.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3">
                    <span className="text-xs font-semibold text-slate-300 block">Técnica Maestra: JUMPER</span>
                    <button
                      onClick={handleApplyJumper}
                      disabled={!filterDetached && filterJumpered}
                      className="w-full py-2 px-3 text-xs font-medium rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{filterJumpered ? 'Jumper Aplicado ✓' : 'Soldar Jumper de Cobre Esmaltado'}</span>
                    </button>
                    <p className="text-[11px] text-slate-400 leading-tight">
                      Puentea los pads con un hilo fino de cobre para restaurar la comunicación al instante.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {selectedComp === 'diodo' && (
              <div className="space-y-6">
                {/* Diode Physical & Polarity Visualizer */}
                <div className="relative p-6 rounded-xl bg-slate-950 border border-slate-800/80 flex flex-col items-center justify-center min-h-[220px]">
                  <div className="relative flex items-center justify-center">
                    {/* Anode Terminal (+) */}
                    <div className="w-8 h-16 bg-gradient-to-r from-slate-400 to-slate-200 rounded-l-md border border-slate-400 shadow-md flex items-center justify-center">
                      <span className="text-[10px] font-mono font-bold text-slate-800">+ Ánodo</span>
                    </div>

                    {/* Diode Body with printed cathode stripe */}
                    <div className="h-16 w-36 bg-slate-900 border-y border-slate-800 flex items-center justify-between px-3 relative shadow-inner">
                      <span className="text-xs font-mono font-bold text-amber-400 uppercase">
                        {diodeType}
                      </span>

                      {/* Printed white stripe for Cathode */}
                      <div className="w-3 h-12 bg-slate-100 rounded-sm shadow-sm flex items-center justify-center" title="Línea impresa = Cátodo (-)">
                        <div className="w-0.5 h-8 bg-slate-400"></div>
                      </div>

                      {/* TVS burn crater */}
                      {tvsTriggered && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-3 h-3 rounded-full bg-stone-900 border border-amber-500 shadow-lg animate-ping"></div>
                        </div>
                      )}
                    </div>

                    {/* Cathode Terminal (-) */}
                    <div className="w-8 h-16 bg-gradient-to-r from-slate-200 to-slate-400 rounded-r-md border border-slate-400 shadow-md flex items-center justify-center">
                      <span className="text-[10px] font-mono font-bold text-slate-800">- Cátodo</span>
                    </div>
                  </div>

                  {/* Polarity Alert */}
                  <div className="mt-4 flex items-center gap-2 text-xs font-mono text-amber-300">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                    <span>¡POLARIDAD CRÍTICA!: Las rayas impresas SIEMPRE marcan el Cátodo (-).</span>
                  </div>

                  {tvsTriggered && (
                    <div className="mt-2 text-xs text-rose-400 font-medium">
                      🛡️ El Diodo TVS absorbió la sobretensión y se inmoló (orificio central visible). La CPU está a salvo.
                    </div>
                  )}
                </div>

                {/* 5 Diode Types Selector */}
                <div className="space-y-3">
                  <span className="text-xs font-semibold text-slate-300 block">Matriz de Clasificación de Diodos en Celulares</span>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {DIODE_SUBTYPES_DATA.map((d) => (
                      <button
                        key={d.id}
                        onClick={() => {
                          setDiodeType(d.id as DiodeSubType);
                          setTvsTriggered(false);
                          soundManager.playProbeClick();
                        }}
                        className={`p-2.5 rounded-lg border text-left transition-all ${
                          diodeType === d.id
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                            : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                        }`}
                      >
                        <div className="font-bold text-xs truncate">{d.name.split(' ')[1] || d.name}</div>
                        <div className="text-[10px] text-slate-400 mt-1 line-clamp-1">{d.mobileApplication}</div>
                      </button>
                    ))}
                  </div>

                  {/* Diode Type Detailed Card */}
                  <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs space-y-2">
                    <div className="flex items-center justify-between text-amber-400 font-semibold">
                      <span>{DIODE_SUBTYPES_DATA.find(d => d.id === diodeType)?.name}</span>
                      <span className="font-mono">{DIODE_SUBTYPES_DATA.find(d => d.id === diodeType)?.iconSymbol}</span>
                    </div>
                    <p className="text-slate-300">
                      {DIODE_SUBTYPES_DATA.find(d => d.id === diodeType)?.functionDescription}
                    </p>
                    <p className="text-slate-400">
                      <strong className="text-slate-200">En el celular:</strong> {DIODE_SUBTYPES_DATA.find(d => d.id === diodeType)?.mobileApplication}
                    </p>
                    <div className="p-2 rounded bg-slate-900 border border-slate-800 text-amber-200/90 text-[11px]">
                      💡 <strong>Dato clave de examen:</strong> {DIODE_SUBTYPES_DATA.find(d => d.id === diodeType)?.keyFact}
                    </div>

                    {diodeType === 'tvs' && (
                      <button
                        onClick={handleTriggerTvsZap}
                        className="mt-2 w-full py-2 px-3 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                      >
                        <Zap className="w-4 h-4 text-rose-400" />
                        <span>Simular Descarga Electrostática (ESD) 2000V</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {selectedComp === 'termistor' && (
              <div className="space-y-6">
                {/* Heat Map & OS False Positive Simulation */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Phone Screen Warning */}
                  <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col items-center justify-center text-center space-y-3">
                    <span className="text-[11px] font-mono text-slate-400">PANTALLA DEL CELULAR (OS)</span>
                    <div className={`p-4 rounded-xl border max-w-xs transition-colors ${
                      boardTemp > 60 || thermistorMissing
                        ? 'bg-rose-950/80 border-rose-500 text-rose-200'
                        : 'bg-slate-900 border-slate-700 text-slate-300'
                    }`}>
                      <AlertTriangle className={`w-8 h-8 mx-auto mb-2 ${boardTemp > 60 || thermistorMissing ? 'text-rose-400 animate-bounce' : 'text-slate-500'}`} />
                      <div className="font-bold text-xs">
                        {boardTemp > 60 || thermistorMissing
                          ? 'ALERTA DE TEMPERATURA'
                          : 'Sistema Normal'}
                      </div>
                      <div className="text-[11px] mt-1 text-slate-300">
                        {boardTemp > 60 || thermistorMissing
                          ? 'Temperatura del dispositivo demasiado alta. Carga pausada para proteger el circuito.'
                          : 'Carga rápida activa (25°C)'}
                      </div>
                    </div>
                    <span className="text-[11px] text-amber-400 font-mono">
                      {thermistorMissing ? 'FALSO POSITIVO: Termistor ausente o abierto' : `Resistencia: ${getThermistorResistance()}`}
                    </span>
                  </div>

                  {/* Motherboard Heat Map Zones */}
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 text-xs">
                    <span className="font-semibold text-slate-300 block">Las 3 Ubicaciones Clave en Placa</span>
                    <div className="space-y-2">
                      {[
                        { id: 'carga', label: '1. Puerto de Carga', desc: 'Censa la temperatura durante la recarga de batería.' },
                        { id: 'cpu', label: '2. Procesador (CPU)', desc: 'Evita que el chip principal supere su límite seguro.' },
                        { id: 'rf', label: '3. Radiofrecuencia (GSM)', desc: 'Monitorea la etapa de potencia de antena y señal.' }
                      ].map((zone) => (
                        <button
                          key={zone.id}
                          onClick={() => {
                            setThermistorZone(zone.id as 'carga' | 'cpu' | 'rf');
                            soundManager.playProbeClick();
                          }}
                          className={`w-full text-left p-2.5 rounded-lg border transition-all ${
                            thermistorZone === zone.id
                              ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                              : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-white'
                          }`}
                        >
                          <div className="font-semibold text-xs">{zone.label}</div>
                          <div className="text-[11px] text-slate-400">{zone.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Heat Gun Slider & NTC / PTC toggle */}
                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Thermometer className="w-4 h-4 text-amber-400" />
                      <span className="text-xs font-semibold text-slate-200">Pistola de Calor / Temperatura de Placa</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-amber-400 font-bold">{boardTemp}°C</span>
                      <div className="flex items-center bg-slate-900 rounded-md p-0.5 border border-slate-800 text-[10px]">
                        <button
                          onClick={() => setThermistorType('NTC')}
                          className={`px-2 py-0.5 rounded ${thermistorType === 'NTC' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400'}`}
                        >
                          NTC (Estándar Celular)
                        </button>
                        <button
                          onClick={() => setThermistorType('PTC')}
                          className={`px-2 py-0.5 rounded ${thermistorType === 'PTC' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400'}`}
                        >
                          PTC
                        </button>
                      </div>
                    </div>
                  </div>

                  <input 
                    type="range"
                    min="20"
                    max="90"
                    value={boardTemp}
                    onChange={(e) => setBoardTemp(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">
                      NTC: A mayor temperatura, <strong className="text-amber-300">menor</strong> resistencia.
                    </span>
                    <button
                      onClick={() => setThermistorMissing(!thermistorMissing)}
                      className={`px-3 py-1 rounded text-xs font-medium border transition-colors ${
                        thermistorMissing
                          ? 'bg-amber-500 text-slate-950 border-amber-400'
                          : 'bg-slate-900 text-slate-400 border-slate-700 hover:text-white'
                      }`}
                    >
                      {thermistorMissing ? 'Restaurar Termistor' : 'Desoldar Termistor (Simular Ausencia)'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {selectedComp === 'bobina' && (
              <div className="space-y-6">
                {/* Magnetic Spring Visualizer */}
                <div className="relative p-6 rounded-xl bg-slate-950 border border-slate-800/80 flex flex-col items-center justify-center min-h-[220px]">
                  <div className="relative flex items-center justify-center">
                    {/* Toroidal / Wound ferrite inductor graphic */}
                    <div className="w-24 h-24 rounded-full border-4 border-stone-800 bg-stone-900 flex items-center justify-center relative shadow-lg">
                      {/* Copper windings */}
                      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                        <div
                          key={deg}
                          className="absolute w-3 h-7 bg-amber-600 rounded-sm border border-amber-700"
                          style={{
                            transform: `rotate(${deg}deg) translate(0, -32px)`
                          }}
                        ></div>
                      ))}
                      <span className="font-mono text-xs font-bold text-slate-200 z-10 bg-black/60 px-2 py-0.5 rounded">
                        4R7
                      </span>
                    </div>
                  </div>

                  {/* Magnetic Field Waves */}
                  <div className="mt-4 flex items-center gap-3 text-xs text-slate-400 font-mono">
                    <span className="text-sky-400 font-semibold">● RESORTE MAGNÉTICO</span>
                    <span>·</span>
                    <span>Almacena energía en un campo magnético y se opone a cambios bruscos</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
                    <span>Amortiguador de Corriente (Junto a Fuentes Conmutadas PMIC)</span>
                    <button
                      onClick={() => {
                        setCoilSurgeActive(true);
                        soundManager.playSolderingSizzle();
                        setTimeout(() => setCoilSurgeActive(false), 800);
                      }}
                      className="px-3 py-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 rounded text-xs transition-colors"
                    >
                      {coilSurgeActive ? 'Amortiguando Pico...' : 'Inyectar Pico de Corriente'}
                    </button>
                  </div>
                  <p className="text-xs text-slate-400">
                    {coilSurgeActive
                      ? '⚡ El campo magnético de la bobina absorbe la energía y suaviza la entrega hacia la CPU.'
                      : 'La bobina mantiene el flujo de corriente constante y filtra ruidos en las etapas de alimentación.'}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Zone (5 cols): Deep Concept & Diagnostic Rules Deck */}
        <div className="lg:col-span-5 space-y-6">
          {/* Golden Rule Card */}
          <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 space-y-3 shadow-lg">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
              <ShieldAlert className="w-4 h-4" />
              <span>Regla Técnica de Oro (Examen)</span>
            </div>
            <p className="text-sm font-medium leading-relaxed">
              {comp.goldenRule.message}
            </p>
          </div>

          {/* Functions & Applications */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Funciones Clave en el Celular</span>
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-300">
              {comp.primaryFunctions.map((fn, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold shrink-0">▸</span>
                  <span className="leading-relaxed">{fn}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Multimeter Test Guide */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Activity className="w-4 h-4 text-sky-400" />
                <span>Prueba de Taller con Multímetro</span>
              </h3>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-sky-300 border border-slate-700">
                Modo: {comp.multimeterTest.mode}
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-300">
                <strong>Lectura Sana:</strong> {comp.multimeterTest.healthyReading}
              </div>
              <div className="p-2.5 rounded-lg bg-rose-950/40 border border-rose-500/30 text-rose-300">
                <strong>Lectura en Falla:</strong> {comp.multimeterTest.faultyReading}
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed pt-1">
                {comp.multimeterTest.instructions}
              </p>
            </div>
          </div>

          {/* Common Failure Causes */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>Causas Principales de Falla</span>
            </h3>
            <div className="space-y-2">
              {comp.failureCauses.map((cause, i) => (
                <div key={i} className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80 text-xs">
                  <div className="font-semibold text-slate-200">{cause.title}</div>
                  <div className="text-slate-400 text-[11px] mt-0.5 leading-relaxed">{cause.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
