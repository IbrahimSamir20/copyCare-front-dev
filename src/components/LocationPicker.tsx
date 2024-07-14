import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import L from 'leaflet';

interface Location {
  lat: number;
  lng: number;
  country?: string;
  city?: string;
}

interface LocationPickerProps {
  locations: Location[];
  onLocationSelect: (location: { lat: number; lng: number; country?: string; city?: string }) => void;
}

// Fix for default marker icon issue
const defaultIcon = L.icon({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = defaultIcon;

const LocationPicker: React.FC<LocationPickerProps> = ({ locations, onLocationSelect }) => {
  const [position, setPosition] = useState<Location | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [map, setMap] = useState<L.Map | null>(null);

  useEffect(() => {
    // Get the current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const locationDetails = await fetchLocationDetails(latitude, longitude);
          const location = { lat: latitude, lng: longitude, ...locationDetails };
          setPosition(location);
          //   onLocationSelect(location);
          if (map) {
            map.setView([latitude, longitude], map.getZoom());
          }
        },
        (error) => {
          console.error('Error getting current location:', error);
        }
      );
    }
  }, [map]);

  const fetchLocationDetails = async (lat: number, lng: number) => {
    try {
      const response = await axios.get(`https://nominatim.openstreetmap.org/reverse`, {
        params: {
          lat,
          lon: lng,
          format: 'json',
        },
      });
      const data = response.data;
      const country = data.address.country;
      const city = data.address.city || data.address.town || data.address.village;
      return { country, city };
    } catch (error) {
      console.error('Error fetching location details:', error);
      return { country: undefined, city: undefined };
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
        params: {
          q: searchQuery,
          format: 'json',
          addressdetails: 1,
        },
      });
      if (response.data && response.data.length > 0) {
        const result = response.data[0];
        const { lat, lon } = result;
        const locationDetails = await fetchLocationDetails(lat, lon);
        const location = { lat: parseFloat(lat), lng: parseFloat(lon), ...locationDetails };
        setPosition(location);
        onLocationSelect(location);
        if (map) {
          map.setView([parseFloat(lat), parseFloat(lon)], map.getZoom());
        }
        setMapView(parseFloat(lat), parseFloat(lon));
      }
    } catch (error) {
      console.error('Error searching location:', error);
    }
  };

  const LocationMarker = () => {
    useMapEvents({
      click: async (e) => {
        const { lat, lng } = e.latlng;
        const locationDetails = await fetchLocationDetails(lat, lng);
        const location = { lat, lng, ...locationDetails };
        setPosition(location);
        onLocationSelect(location);
      },
    });

    return position ? <Marker position={position}></Marker> : null;
  };

  const SetViewOnClick = ({ lat, lng }: { lat: number; lng: number }) => {
    const map = useMap();
    map.setView([lat, lng], map.getZoom());
    return null;
  };

  const setMapView = (lat: number, lng: number) => {
    return <SetViewOnClick lat={lat} lng={lng} />;
  };

  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search for a place"
      />
      <button onClick={handleSearch}>Search</button>
      <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '500px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {locations.map((location, index) => (
          <Marker key={index} position={[location.lat, location.lng]}>
            <Popup>
              {location.city}, {location.country}
            </Popup>
          </Marker>
        ))}
        {position && <SetViewOnClick lat={position.lat} lng={position.lng} />}
        <LocationMarker />
      </MapContainer>
    </div>
  );
};

export default LocationPicker;
