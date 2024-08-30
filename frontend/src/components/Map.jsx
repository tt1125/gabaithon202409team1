"use client"

import { loadGoogleMapsAPI } from "@/lib/loadGoogleMapsAPI"
import { useEffect, useState } from "react"

const Index = () => {
  const [map, setMap] = useState(null)

  useEffect(() => {
    loadGoogleMapsAPI(setMap)
  }, [])

  return (
    <main style={{height : '100%' , width : '100%'}}>
        <div id="map" style={{height : '100%' , width : '100%' , margin: 0 }}></div>
    </main>  )
}

export default Index