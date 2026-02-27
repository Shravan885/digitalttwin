import { useState, useEffect, useCallback } from 'react'
import Header from './components/Header'
import MapSection from './components/MapSection'
import ControlPanel from './components/ControlPanel'
import MetricsSection from './components/MetricsSection'

const API_BASE = ''

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [scenarioData, setScenarioData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [is3D, setIs3D] = useState(true)
  const [params, setParams] = useState({
    rain: 0,
    green: 0,
    temp: 0,
    population: 1,
  })

  const fetchScenario = useCallback(async (rain, green, temp, population) => {
    try {
      const q = new URLSearchParams({
        rain: String(rain),
        green: String(green / 100),
        temp: String(temp),
      })
      if (population !== 1) q.set('population', String(population))
      const res = await fetch(`${API_BASE}/scenario?${q}`)
      const json = await res.json()
      const data = json.data || json
      setScenarioData(data)
      return data
    } catch (e) {
      const fallback = {
        resilience_score: 82,
        flood_risk: 0.31,
        heat_risk: 0.04,
        urban_stress_index: 0.24,
        affected_population: 0,
        projection_5y: [82, 81, 80, 79, 78],
      }
      setScenarioData(fallback)
      return fallback
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchScenario(params.rain, params.green, params.temp, params.population)
  }, [])

  const onParamsChange = useCallback((newParams) => {
    setParams(newParams)
    fetchScenario(newParams.rain, newParams.green, newParams.temp, newParams.population)
  }, [fetchScenario])

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-slate-900' : 'bg-[#f8fafc]'}`}>
      <Header
        darkMode={darkMode}
        onDarkModeToggle={() => setDarkMode(!darkMode)}
        is3D={is3D}
        on3DToggle={() => setIs3D((v) => !v)}
      />
      <main className="flex flex-col">
        <section className="w-full min-h-[70vh] relative">
          <MapSection
            params={params}
            darkMode={darkMode}
            scenarioData={scenarioData}
            is3D={is3D}
          />
        </section>
        <section className="w-full">
          <div
            className={`mx-6 -mt-8 relative z-10 rounded-2xl shadow-xl ${
              darkMode
                ? 'bg-slate-800/95 backdrop-blur-xl border border-slate-700'
                : 'bg-white/90 backdrop-blur-xl border border-slate-200/80'
            }`}
            style={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.08)' }}
          >
            <div className="flex flex-col lg:flex-row gap-6 p-6">
              <ControlPanel
                params={params}
                onParamsChange={onParamsChange}
                darkMode={darkMode}
              />
              <MetricsSection
                data={scenarioData}
                loading={loading}
                darkMode={darkMode}
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
