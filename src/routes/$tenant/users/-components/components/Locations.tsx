import LocationPicker from '@/components/LocationPicker';
import { Button, Input, Table } from 'antd';
import axios from 'axios';
import { FC, useEffect, useState } from 'react';

interface Props {
  field: any;
}

const columns = [
  {
    title: 'Country',
    dataIndex: 'country',
    key: 'country',
  },
  {
    title: 'City',
    dataIndex: 'city',
    key: 'city',
  },
  {
    title: 'Lat',
    dataIndex: 'lat',
    key: 'lat',
  },
  {
    title: 'Lon',
    dataIndex: 'lng',
    key: 'lng',
  },
];

const searchCountry = async ({ country }) => {
  const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
    params: {
      country,
      // city,
      format: 'json',
    },
  });
  return response.data;
};

const Locations: FC<Props> = ({ field }) => {
  const [locations, setLocations] = useState<{ lat: number; lng: number; country?: string; city?: string }[]>([
    { lat: 51.505, lng: -0.09, country: 'United Kingdom', city: 'London' },
    { lat: 48.8566, lng: 2.3522, country: 'France', city: 'Paris' },
    { lat: 40.7128, lng: -74.006, country: 'United States', city: 'New York' },
  ]);
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const handleLocationSelect = (location: { lat: number; lng: number; country?: string; city?: string }) => {
    console.log('Selected location:', location);
    setLocations([...locations, location]);
  };
  useEffect(() => {
    searchCountry({ country }).then((res) => {
      console.log(res);
    });
  }, [country]);
  return (
    <div>
      <div className="mb-5 flex gap-3">
        <Input name="country" placeholder="country" onChange={(e) => setCountry(e.target.value)} value={country} />
        <Input name="city" placeholder="city" onChange={(e) => setCity(e.target.value)} value={city} />
        <Input name="address" placeholder="address" onChange={(e) => setAddress(e.target.value)} value={address} />
        <Button htmlType="button" type="primary" onClick={() => field.onChange({ country, city, address })}>
          Search
        </Button>
      </div>
      <LocationPicker locations={locations} onLocationSelect={handleLocationSelect} />
      <Table columns={columns} dataSource={locations} />
    </div>
  );
};

export default Locations;
