import { useEffect, useState } from 'react';

export type LocationStatus = 'idle' | 'detecting' | 'success' | 'error';

export interface IpLocationData {
  city: string;
  region: string;
  country_name: string;
  latitude: number | null;
  longitude: number | null;
}

export interface UseIpLocationResult {
  status: LocationStatus;
  statusMessage: string;
  location: IpLocationData | null;
}

export function useIpLocation(): UseIpLocationResult {
  const [status, setStatus] = useState<LocationStatus>('detecting');
  const [statusMessage, setStatusMessage] = useState('📍 Detecting location...');
  const [location, setLocation] = useState<IpLocationData | null>(null);

  useEffect(() => {
    let cancelled = false;

    setStatus('detecting');
    setStatusMessage('📍 Detecting location...');

    fetch('https://ipapi.co/json/')
      .then((res) => {
        if (!res.ok) throw new Error('API response not ok');
        return res.json();
      })
      .then((data: Record<string, unknown>) => {
        if (cancelled) return;

        const lat = typeof data.latitude === 'number' ? data.latitude : null;
        const lon = typeof data.longitude === 'number' ? data.longitude : null;

        if (lat !== null && lon !== null) {
          const city = typeof data.city === 'string' ? data.city : '';
          const region = typeof data.region === 'string' ? data.region : '';
          const country_name = typeof data.country_name === 'string' ? data.country_name : '';

          setLocation({ city, region, country_name, latitude: lat, longitude: lon });
          setStatus('success');
          setStatusMessage('✅ Location detected!');
        } else {
          setStatus('error');
          setStatusMessage('❌ Could not detect location. Please enter manually.');
        }
      })
      .catch(() => {
        if (cancelled) return;
        setStatus('error');
        setStatusMessage('❌ Location service unavailable. Please enter manually.');
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { status, statusMessage, location };
}
