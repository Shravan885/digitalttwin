import { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'

const MAPBOX_TOKEN = 'pk.eyJ1IjoicGFydGgta2VsYXB1cmUxMSIsImEiOiJjbW0zN28ycmMwZHJ5MnNzZDlxdjNpNWtpIn0.0ZXPvfSQ1hk_VkQCCyoWwQ'
mapboxgl.accessToken = MAPBOX_TOKEN

const AHMEDABAD = [72.5714, 23.0225]

export default function MapSection({ params, darkMode, scenarioData, is3D = true }) {
  const mapContainer = useRef(null)
  const map = useRef(null)

  useEffect(() => {
    if (!mapContainer.current || map.current) return

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/satellite-streets-v12',
      center: AHMEDABAD,
      zoom: 11.5,
      pitch: is3D ? 60 : 0,
      bearing: -20,
      antialias: true,
    })

    map.current.on('load', () => {
      try {
        map.current.addSource('mapbox-dem', {
          type: 'raster-dem',
          url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
          tileSize: 512,
          maxzoom: 14,
        })
        map.current.setTerrain({ source: 'mapbox-dem', exaggeration: 1.5 })

        if (!map.current.getLayer('3d-buildings')) {
          map.current.addLayer({
            id: '3d-buildings',
            source: 'composite',
            'source-layer': 'building',
            filter: ['==', 'extrude', 'true'],
            type: 'fill-extrusion',
            minzoom: 15,
            paint: {
              'fill-extrusion-color': '#cbd5e1',
              'fill-extrusion-height': [
                'interpolate',
                ['linear'],
                ['zoom'],
                15, 0,
                15.05, ['get', 'height'],
              ],
              'fill-extrusion-base': [
                'interpolate',
                ['linear'],
                ['zoom'],
                15, 0,
                15.05, ['get', 'min_height'],
              ],
              'fill-extrusion-opacity': 0.85,
            },
          })
        }
      } catch (_) {}
    })

    return () => {
      map.current?.remove()
      map.current = null
    }
  }, [])

  useEffect(() => {
    if (!map.current?.loaded) return
    map.current.easeTo({
      pitch: is3D ? 60 : 0,
      duration: 800,
    })
  }, [is3D])

  useEffect(() => {
    if (!map.current?.loaded) return

    const { rain, green, temp } = params

    // Flood overlay opacity (blue tint when rainfall high)
    const floodOpacity = Math.min(0.4, (rain / 300) * 0.5)
    // Green overlay opacity
    const greenOpacity = (green / 30) * 0.25
    // Heat overlay opacity (orange/red when temp high)
    const heatOpacity = temp > 0 ? Math.min(0.35, (temp / 5) * 0.4) : 0

    try {
      if (map.current.getLayer('3d-buildings')) {
        const floodTint = 1 - floodOpacity * 0.3
        const heatTint = 1 + heatOpacity * 0.2
        const greenTint = 1 - greenOpacity * 0.15
        const r = Math.round(205 * floodTint * (1 / heatTint) * greenTint)
        const g = Math.round(230 * (1 - heatOpacity * 0.3) * (1 + greenOpacity * 0.2))
        const b = Math.round(255 * (1 + floodOpacity * 0.2) * greenTint)
        const color = `rgb(${Math.min(255, r)}, ${Math.min(255, g)}, ${Math.min(255, b)})`
        map.current.setPaintProperty('3d-buildings', 'fill-extrusion-color', color)
      }
    } catch (_) {}
  }, [params])

  return (
    <div
      className="relative w-full pt-[72px]"
      style={{ minHeight: '70vh' }}
    >
      <div
        ref={mapContainer}
        className="w-full"
        style={{ height: 'calc(70vh - 72px)', minHeight: 400 }}
      />
      {params.rain > 50 && (
        <div
          className="pointer-events-none absolute inset-0 mix-blend-multiply"
          style={{
            background: `radial-gradient(ellipse at 50% 50%, rgba(59, 130, 246, ${Math.min(0.25, (params.rain / 300) * 0.4)}), transparent 70%)`,
          }}
        />
      )}
      {params.green > 5 && (
        <div
          className="pointer-events-none absolute inset-0 mix-blend-screen"
          style={{
            background: `radial-gradient(ellipse at 50% 50%, rgba(34, 197, 94, ${Math.min(0.15, (params.green / 30) * 0.2)}), transparent 70%)`,
          }}
        />
      )}
      {params.temp > 1 && (
        <div
          className="pointer-events-none absolute inset-0 mix-blend-overlay"
          style={{
            background: `radial-gradient(ellipse at 50% 50%, rgba(249, 115, 22, ${Math.min(0.2, (params.temp / 5) * 0.25)}), transparent 70%)`,
          }}
        />
      )}
    </div>
  )
}
