import { useState, useEffect, useRef } from 'react'
import { Header } from '../Header.jsx'
import {Map, setWorkerUrl} from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import workerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url';
import { MapSideCountryInfo } from '../MapSideCountryInfo.jsx'
import { getCountry } from '../../data/restcountries.js'
import { getHistoricalGdpByCountry } from '../../data/getHistoricalGdp.js'

setWorkerUrl(workerUrl);

export function ExploreMap({setDisplayMode}){
    const mapContainer = useRef(null);
    const mapInstance = useRef(null);
    const [isSelected, setIsSelected] = useState(false)
    const [mapCountrySelected, setMapCountrySelected] = useState(null)
    const [isMapLoading, setIsMapLoading] = useState(true)
    const [isCountryLoading, setIsCountryLoading] = useState(null)
    
    useEffect(() => {
        // Prevent a second MapLibre map instance in this component.
        if (mapInstance.current) return;
    
        const map = new Map({
            container: mapContainer.current,
            style: "https://demotiles.maplibre.org/style.json",
            center: [0, 0],
            zoom: 1,
            projection: "mercator", // ensure flat Mercator, not globe
            renderWorldCopies: false, // only one world, no endless wrap
        });

        mapInstance.current = map
        let hoveredCountryId = null;

        map.on("load", () => {
            map.addSource("my-countries", {
                type: "geojson",
                data: "/atlas/countries.geojson",
                generateId: true,   // auto-generate numeric IDs for the countries
            });

            map.addLayer({
                id: "my-countries-fill",
                type: "fill",
                source: "my-countries",
                paint: {
                    "fill-color": "#3b82f6", // pick whatever hover tint you like
                    "fill-opacity": [
                        "case",
                        ["boolean", ["feature-state", "hover"], false],
                        0.4,     // visible tint on hover
                        0.001    // effectively invisible by default, but still hit-testable
                    ]
                }
            });

            map.on("mousemove", "my-countries-fill", (e) => {
                map.getCanvas().style.cursor = "pointer";

                const id = e.features[0].id;

                if (id !== hoveredCountryId) {
                    // clear the previously hovered country
                    if (hoveredCountryId !== null) {
                        map.setFeatureState(
                            { source: "my-countries", id: hoveredCountryId },
                            { hover: false }
                        );
                    }
            
                    // set hover on the new one
                    map.setFeatureState(
                        { source: "my-countries", id: id },
                        { hover: true }
                    );
            
                    hoveredCountryId = id;
                }
            })

            map.on("mouseleave", "my-countries-fill", () => {
                map.getCanvas().style.cursor = "";

                if (hoveredCountryId !== null) {
                    map.setFeatureState(
                        {
                            source: "my-countries",
                            id: hoveredCountryId,
                        },
                        { hover: false }
                    );
                }
            
                hoveredCountryId = null;

            })

            map.on("click", "my-countries-fill", async (e) => {

                setIsSelected(true)
                setIsCountryLoading(true)

                try{
                    const country = e.features?.[0];
                    const data = await getCountry(country.properties.ADM0_A3)
                    const gdp = await getHistoricalGdpByCountry(country.properties.ADM0_A3);
                    console.log(gdp)
                    setMapCountrySelected({countryInfo: data, gdp: gdp});
                } catch(err){
                    console.log(err)
                } finally{
                    setIsCountryLoading(false)
                }
                
            })

            setIsMapLoading(false)
        });
    
        return () => {
          mapInstance.current?.remove();
          mapInstance.current = null;
        };
      }, []);

    return (
        <div className="relative h-screen flex flex-col">
            <Header setDisplayMode={setDisplayMode} />

            <div className="relative flex-1 min-h-0">
                <div
                    ref={mapContainer}
                    id="map"
                    className={`w-full h-full ${
                        mapCountrySelected
                            ? "pointer-events-none opacity-50"
                            : ""
                    }`}
                />

                {isMapLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
                        <div className="flex flex-col items-center gap-3">
                            <div className="w-8 h-8 border-4 border-gray-300 border-t-gray-900 rounded-full animate-spin" />
                            <p className="text-sm text-gray-500">Loading map…</p>
                        </div>
                    </div>
                )}

                {isSelected && (
                    <MapSideCountryInfo 
                        setIsSelected = {setIsSelected}
                        isCountryLoading = {isCountryLoading}
                        mapCountrySelected = {mapCountrySelected}
                        setMapCountrySelected = {setMapCountrySelected}
                    />
                )}
            </div>
        </div>
    )
}