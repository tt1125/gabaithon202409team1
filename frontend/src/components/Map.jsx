"use client"

import { loadGoogleMapsAPI } from "@/lib/loadGoogleMapsAPI"
import { useEffect, useState } from "react"

const Index = () => {
  const [map, setMap] = useState(null)

  useEffect(() => {
    loadGoogleMapsAPI(setMap)
  }, [])

  return (
    <>
      <div style={{ maxWidth: '100%' }}>
        <div id="map" style={{ height: '80vh', width: '100%' }}></div>
      </div>
    </>
  )
}

export default Index