import { useState, useEffect, useRef } from 'react'

const DEBOUNCE_MS = 300

export default function ControlPanel({ params, onParamsChange, darkMode }) {
  const [local, setLocal] = useState({
    rain: params.rain,
    green: params.green,
    temp: params.temp,
    population: params.population,
  })
  const timerRef = useRef(null)

  useEffect(() => {
    setLocal({
      rain: params.rain,
      green: params.green,
      temp: params.temp,
      population: params.population,
    })
  }, [params.rain, params.green, params.temp, params.population])

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  const handleRain = (v) => {
    const val = Number(v)
    setLocal((p) => ({ ...p, rain: val }))
    timerRef.current && clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      onParamsChange({ ...local, rain: val })
      timerRef.current = null
    }, DEBOUNCE_MS)
  }

  const handleGreen = (v) => {
    const val = Number(v)
    setLocal((p) => ({ ...p, green: val }))
    timerRef.current && clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      onParamsChange({ ...local, green: val })
      timerRef.current = null
    }, DEBOUNCE_MS)
  }

  const handleTemp = (v) => {
    const val = Number(v)
    setLocal((p) => ({ ...p, temp: val }))
    timerRef.current && clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      onParamsChange({ ...local, temp: val })
      timerRef.current = null
    }, DEBOUNCE_MS)
  }

  const handlePopulation = (v) => {
    const val = Number(v)
    setLocal((p) => ({ ...p, population: val }))
    timerRef.current && clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      onParamsChange({ ...local, population: val })
      timerRef.current = null
    }, DEBOUNCE_MS)
  }

  const labelClass = darkMode ? 'text-slate-300' : 'text-slate-600'
  const trackClass = darkMode ? 'bg-slate-600' : 'bg-slate-200'
  const thumbClass = darkMode ? 'bg-slate-400' : 'bg-slate-500'

  return (
    <div className="flex-1 min-w-0">
      <div className="grid gap-6">
        <div>
          <label className={`block text-sm font-medium ${labelClass} mb-2`}>
            Rainfall
          </label>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min="0"
              max="300"
              value={local.rain}
              onChange={(e) => handleRain(e.target.value)}
              className="flex-1 h-2 rounded-lg appearance-none cursor-pointer accent-slate-600"
              style={{
                background: `linear-gradient(to right, ${darkMode ? '#475569' : '#cbd5e1'} 0%, ${darkMode ? '#64748b' : '#94a3b8'} ${(local.rain / 300) * 100}%, transparent ${(local.rain / 300) * 100}%)`,
              }}
            />
            <span
              className={`text-sm font-mono tabular-nums w-14 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}
            >
              {local.rain} mm
            </span>
          </div>
        </div>

        <div>
          <label className={`block text-sm font-medium ${labelClass} mb-2`}>
            Green Cover Increase
          </label>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min="0"
              max="30"
              value={local.green}
              onChange={(e) => handleGreen(e.target.value)}
              className="flex-1 h-2 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
            <span
              className={`text-sm font-mono tabular-nums w-14 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}
            >
              {local.green}%
            </span>
          </div>
        </div>

        <div>
          <label className={`block text-sm font-medium ${labelClass} mb-2`}>
            Temperature Variation
          </label>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min="-5"
              max="5"
              step="0.5"
              value={local.temp}
              onChange={(e) => handleTemp(e.target.value)}
              className="flex-1 h-2 rounded-lg appearance-none cursor-pointer accent-amber-600"
            />
            <span
              className={`text-sm font-mono tabular-nums w-14 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}
            >
              {local.temp > 0 ? '+' : ''}{local.temp} °C
            </span>
          </div>
        </div>

        <div>
          <label className={`block text-sm font-medium ${labelClass} mb-2`}>
            Population Density Modifier
          </label>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={local.population}
              onChange={(e) => handlePopulation(e.target.value)}
              className="flex-1 h-2 rounded-lg appearance-none cursor-pointer accent-slate-600"
            />
            <span
              className={`text-sm font-mono tabular-nums w-14 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}
            >
              {local.population.toFixed(1)}×
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
