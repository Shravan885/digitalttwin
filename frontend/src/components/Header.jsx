export default function Header({ darkMode, onDarkModeToggle, is3D, on3DToggle }) {

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 ${
        darkMode
          ? 'bg-slate-900/95 backdrop-blur-xl border-b border-slate-700'
          : 'bg-white/95 backdrop-blur-xl border-b border-slate-200/80'
      }`}
      style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}
    >
      <div>
        <h1
          className={`text-xl font-semibold tracking-tight ${
            darkMode ? 'text-white' : 'text-slate-900'
          }`}
        >
          Ahmedabad City Resilience Simulator
        </h1>
        <p
          className={`text-sm mt-0.5 ${
            darkMode ? 'text-slate-400' : 'text-slate-500'
          }`}
        >
          Real-Time Urban Digital Twin for SDG 11
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span
            className="relative flex h-2 w-2"
            aria-label="Live"
          >
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className={`text-xs font-medium ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            LIVE
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={on3DToggle}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              darkMode
                ? 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {is3D ? '3D' : '2D'}
          </button>

          <button
            onClick={onDarkModeToggle}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              darkMode
                ? 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {darkMode ? 'Light' : 'Dark'}
          </button>
        </div>
      </div>
    </header>
  )
}
