import { useState, useEffect } from 'react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

function AnimatedNumber({ value, suffix = '', decimals = 0, className }) {
  const [display, setDisplay] = useState(value ?? 0)

  useEffect(() => {
    const v = Number(value)
    if (isNaN(v)) return
    const start = display
    const diff = v - start
    const steps = 20
    let step = 0
    const id = setInterval(() => {
      step++
      const t = step / steps
      const eased = 1 - Math.pow(1 - t, 3)
      setDisplay(start + diff * eased)
      if (step >= steps) clearInterval(id)
    }, 20)
    return () => clearInterval(id)
  }, [value])

  return (
    <span className={className}>
      {typeof display === 'number' ? display.toFixed(decimals) : '—'}
      {suffix}
    </span>
  )
}

export default function MetricsSection({ data, loading, darkMode }) {
  const d = data || {}
  const score = d.resilience_score ?? 0
  const flood = d.flood_risk ?? 0
  const heat = d.heat_risk ?? 0
  const urbanStress = d.urban_stress_index ?? (0.2 * (1 - (d.ndvi ?? 0.2)))
  const affected = d.affected_population ?? 0
  const projection = d.projection_5y ?? [score, score - 1, score - 2, score - 3, score - 4]

  const chartData = projection.map((v, i) => ({
    year: `Y${i + 1}`,
    score: v,
  }))

  const textClass = darkMode ? 'text-slate-200' : 'text-slate-800'
  const mutedClass = darkMode ? 'text-slate-400' : 'text-slate-500'
  const barBg = darkMode ? 'bg-slate-700' : 'bg-slate-200'

  return (
    <div className="flex-1 min-w-0 lg:min-w-[320px] lg:max-w-[400px]">
      <div className="flex flex-col gap-5">
        <div className="flex items-baseline justify-between">
          <span className={`text-sm font-medium ${mutedClass}`}>
            SDG 11 Resilience Score
          </span>
        </div>
        <div className="flex items-baseline gap-1">
          <AnimatedNumber
            value={score}
            decimals={1}
            className={`text-4xl font-semibold tabular-nums ${textClass}`}
          />
          <span className={`text-lg ${mutedClass}`}>/ 100</span>
        </div>

        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className={mutedClass}>Flood Risk</span>
              <span className={`font-mono ${textClass}`}>
                <AnimatedNumber value={flood} decimals={3} />
              </span>
            </div>
            <div className={`h-2 rounded-full overflow-hidden ${barBg}`}>
              <div
                className="h-full rounded-full bg-blue-500 transition-all duration-500"
                style={{ width: `${Math.min(100, flood * 100)}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className={mutedClass}>Heat Risk</span>
              <span className={`font-mono ${textClass}`}>
                <AnimatedNumber value={heat} decimals={3} />
              </span>
            </div>
            <div className={`h-2 rounded-full overflow-hidden ${barBg}`}>
              <div
                className="h-full rounded-full bg-amber-500 transition-all duration-500"
                style={{ width: `${Math.min(100, heat * 100)}%` }}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div
            className={`rounded-xl p-3 ${
              darkMode ? 'bg-slate-800/80' : 'bg-slate-50/80'
            }`}
          >
            <p className={`text-xs ${mutedClass}`}>Urban Stress Index</p>
            <p className={`text-lg font-semibold tabular-nums ${textClass}`}>
              <AnimatedNumber value={urbanStress} decimals={2} />
            </p>
          </div>
          <div
            className={`rounded-xl p-3 ${
              darkMode ? 'bg-slate-800/80' : 'bg-slate-50/80'
            }`}
          >
            <p className={`text-xs ${mutedClass}`}>Affected Population</p>
            <p className={`text-lg font-semibold tabular-nums ${textClass}`}>
              <AnimatedNumber value={affected} decimals={0} suffix="" />
            </p>
          </div>
        </div>

        <div>
          <p className={`text-xs ${mutedClass} mb-2`}>5-Year Projection</p>
          <div className="h-[120px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
                <defs>
                  <linearGradient
                    id="fillScore"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor={darkMode ? '#64748b' : '#94a3b8'}
                      stopOpacity={0.4}
                    />
                    <stop
                      offset="100%"
                      stopColor={darkMode ? '#64748b' : '#94a3b8'}
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="year"
                  tick={{ fontSize: 10, fill: darkMode ? '#94a3b8' : '#64748b' }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  domain={[70, 100]}
                  tick={{ fontSize: 10, fill: darkMode ? '#94a3b8' : '#64748b' }}
                  axisLine={false}
                  tickLine={false}
                  width={28}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: darkMode ? '#1e293b' : '#fff',
                    border: 'none',
                    borderRadius: 12,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  }}
                  labelStyle={{ color: darkMode ? '#94a3b8' : '#64748b' }}
                  formatter={(v) => [v.toFixed(1), 'Score']}
                />
                <Area
                  type="monotone"
                  dataKey="score"
                  stroke={darkMode ? '#94a3b8' : '#64748b'}
                  strokeWidth={2}
                  fill="url(#fillScore)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}
