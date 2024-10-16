import { useEffect, useState } from "react"
import { GoToLocation } from "../App"

interface Props {
  location: GoToLocation,
  setLocation: (GoToLocation) => void
}

const isNum = (value: string) => value.length > 0 && !Number.isNaN(Number(value))

const GoTo: React.FC<Props> = ({ location, setLocation }) => {
  const [lat, setLat] = useState(location.latitude ? `${location.latitude}` : '')
  const [lng, setLng] = useState(location.longitude ? `${location.longitude}` : '')
  const [zoom, setZoom] = useState(location.zoom ? `${location.zoom}` : '')
  const [submittable, setSubmittable] = useState(false)

  useEffect(() => {
    setSubmittable(isNum(lat) && isNum(lng) && isNum(zoom))
  }, [lat, lng, zoom])

  return (
    <div>
      <h2>Goto</h2>
      <div>Where would you like to go today?</div>
      <div className='goto-input'>
        <label><span>Latitude:</span><input value={lat} onChange={(e) => setLat(e.target.value)} /></label>
        <label><span>Longitude:</span><input value={lng} onChange={(e) => setLng(e.target.value)} /></label>
        <label><span>Zoom:</span><input value={zoom} onChange={(e) => setZoom(e.target.value)} /></label>
      </div>
      <div className='goto-input'>
        <button disabled={!submittable} onClick={() => setLocation({latitude: Number(lat), longitude: Number(lng), zoom: Number(zoom)})}>Go</button>
      </div>
    </div>
  )
}

export default GoTo