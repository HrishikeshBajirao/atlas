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
    const [mapCountrySelected, setMapCountrySelected] = useState(null)
    
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
            map.addSource("countries", {
                type: "geojson",
                data: "/countries.geojson",
                generateId: true,   // auto-generate numeric IDs for the countries
            });

            map.addLayer({
                id: "countries-fill",
                type: "fill",
                source: "countries",
                paint: {
                "fill-color": [
                    "case",
                    ["boolean", ["feature-state", "hover"], false],
                    "#60a5fa",
                    "#2563eb",
                ],
                "fill-opacity": [
                    "case",
                    ["boolean", ["feature-state", "hover"], false],
                    0.75,
                    0.25,
                ],
                },
            });

            map.addLayer({
                id: "countries-border",
                type: "line",
                source: "countries",
                paint: {
                "line-color": [
                    "case",
                    ["boolean", ["feature-state", "hover"], false],
                    "#ffffff",
                    "#1d4ed8",
                ],
                "line-width": [
                    "case",
                    ["boolean", ["feature-state", "hover"], false],
                    3,
                    1,
                ],
                },
            });

            map.on("click", "countries-fill", async (e) => {
                const country = e.features?.[0];
                const data = await getCountry(country.properties.ADM0_A3)
                const gdp = await getHistoricalGdpByCountry(country.properties.ADM0_A3);
                console.log(gdp)
                setMapCountrySelected({...data, gdp: gdp});
            })

            map.on("mousemove", "countries-fill", (e) => {
                const country = e.features?.[0];

                if (!country) return;

                // console.log("hovered country:", country.properties.NAME, "id:", country.id);

                if (hoveredCountryId !== null) {
                map.setFeatureState(
                    { source: "countries", id: hoveredCountryId },
                    { hover: false }
                );
                }

                hoveredCountryId = country.id;

                map.setFeatureState(
                { source: "countries", id: hoveredCountryId },
                { hover: true }
                );

                map.getCanvas().style.cursor = "pointer";
            });

            map.on("mouseleave", "countries-fill", () => {
                if (hoveredCountryId !== null) {
                map.setFeatureState(
                    { source: "countries", id: hoveredCountryId },
                    { hover: false }
                );
                }

                hoveredCountryId = null;
                map.getCanvas().style.cursor = "";
            });
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

                {mapCountrySelected && (
                    <MapSideCountryInfo 
                        mapCountrySelected = {mapCountrySelected}
                        setMapCountrySelected = {setMapCountrySelected}
                    />
                )}
            </div>
        </div>
    )
}