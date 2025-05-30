export interface TimeZone {
  id: string;
  name: string;
  timezone: string;
  flag: string;
  country: string;
  countryCode: string;
}

export const worldCities: TimeZone[] = [
  // North America
  { id: '1', name: 'New York', timezone: 'America/New_York', flag: '🇺🇸', country: 'United States', countryCode: 'US' },
  { id: '2', name: 'Los Angeles', timezone: 'America/Los_Angeles', flag: '🇺🇸', country: 'United States', countryCode: 'US' },
  { id: '3', name: 'Chicago', timezone: 'America/Chicago', flag: '🇺🇸', country: 'United States', countryCode: 'US' },
  { id: '4', name: 'Denver', timezone: 'America/Denver', flag: '🇺🇸', country: 'United States', countryCode: 'US' },
  { id: '5', name: 'Toronto', timezone: 'America/Toronto', flag: '🇨🇦', country: 'Canada', countryCode: 'CA' },
  { id: '6', name: 'Vancouver', timezone: 'America/Vancouver', flag: '🇨🇦', country: 'Canada', countryCode: 'CA' },
  { id: '7', name: 'Mexico City', timezone: 'America/Mexico_City', flag: '🇲🇽', country: 'Mexico', countryCode: 'MX' },
  
  // Europe
  { id: '8', name: 'London', timezone: 'Europe/London', flag: '🇬🇧', country: 'United Kingdom', countryCode: 'UK' },
  { id: '9', name: 'Paris', timezone: 'Europe/Paris', flag: '🇫🇷', country: 'France', countryCode: 'FR' },
  { id: '10', name: 'Berlin', timezone: 'Europe/Berlin', flag: '🇩🇪', country: 'Germany', countryCode: 'DE' },
  { id: '11', name: 'Rome', timezone: 'Europe/Rome', flag: '🇮🇹', country: 'Italy', countryCode: 'IT' },
  { id: '12', name: 'Madrid', timezone: 'Europe/Madrid', flag: '🇪🇸', country: 'Spain', countryCode: 'ES' },
  { id: '13', name: 'Amsterdam', timezone: 'Europe/Amsterdam', flag: '🇳🇱', country: 'Netherlands', countryCode: 'NL' },
  { id: '14', name: 'Stockholm', timezone: 'Europe/Stockholm', flag: '🇸🇪', country: 'Sweden', countryCode: 'SE' },
  { id: '15', name: 'Copenhagen', timezone: 'Europe/Copenhagen', flag: '🇩🇰', country: 'Denmark', countryCode: 'DK' },
  { id: '16', name: 'Oslo', timezone: 'Europe/Oslo', flag: '🇳🇴', country: 'Norway', countryCode: 'NO' },
  { id: '17', name: 'Helsinki', timezone: 'Europe/Helsinki', flag: '🇫🇮', country: 'Finland', countryCode: 'FI' },
  { id: '18', name: 'Moscow', timezone: 'Europe/Moscow', flag: '🇷🇺', country: 'Russia', countryCode: 'RU' },
  { id: '19', name: 'Warsaw', timezone: 'Europe/Warsaw', flag: '🇵🇱', country: 'Poland', countryCode: 'PL' },
  { id: '20', name: 'Prague', timezone: 'Europe/Prague', flag: '🇨🇿', country: 'Czech Republic', countryCode: 'CZ' },
  { id: '21', name: 'Vienna', timezone: 'Europe/Vienna', flag: '🇦🇹', country: 'Austria', countryCode: 'AT' },
  { id: '22', name: 'Zurich', timezone: 'Europe/Zurich', flag: '🇨🇭', country: 'Switzerland', countryCode: 'CH' },
  
  // Asia
  { id: '23', name: 'Tokyo', timezone: 'Asia/Tokyo', flag: '🇯🇵', country: 'Japan', countryCode: 'JP' },
  { id: '24', name: 'Seoul', timezone: 'Asia/Seoul', flag: '🇰🇷', country: 'South Korea', countryCode: 'KR' },
  { id: '25', name: 'Beijing', timezone: 'Asia/Shanghai', flag: '🇨🇳', country: 'China', countryCode: 'CN' },
  { id: '26', name: 'Shanghai', timezone: 'Asia/Shanghai', flag: '🇨🇳', country: 'China', countryCode: 'CN' },
  { id: '27', name: 'Hong Kong', timezone: 'Asia/Hong_Kong', flag: '🇭🇰', country: 'Hong Kong', countryCode: 'HK' },
  { id: '28', name: 'Singapore', timezone: 'Asia/Singapore', flag: '🇸🇬', country: 'Singapore', countryCode: 'SG' },
  { id: '29', name: 'Bangkok', timezone: 'Asia/Bangkok', flag: '🇹🇭', country: 'Thailand', countryCode: 'TH' },
  { id: '30', name: 'Mumbai', timezone: 'Asia/Kolkata', flag: '🇮🇳', country: 'India', countryCode: 'IN' },
  { id: '31', name: 'Delhi', timezone: 'Asia/Kolkata', flag: '🇮🇳', country: 'India', countryCode: 'IN' },
  { id: '32', name: 'Dubai', timezone: 'Asia/Dubai', flag: '🇦🇪', country: 'UAE', countryCode: 'AE' },
  { id: '33', name: 'Jakarta', timezone: 'Asia/Jakarta', flag: '🇮🇩', country: 'Indonesia', countryCode: 'ID' },
  { id: '34', name: 'Manila', timezone: 'Asia/Manila', flag: '🇵🇭', country: 'Philippines', countryCode: 'PH' },
  { id: '35', name: 'Kuala Lumpur', timezone: 'Asia/Kuala_Lumpur', flag: '🇲🇾', country: 'Malaysia', countryCode: 'MY' },
  { id: '36', name: 'Tel Aviv', timezone: 'Asia/Jerusalem', flag: '🇮🇱', country: 'Israel', countryCode: 'IL' },
  { id: '37', name: 'Istanbul', timezone: 'Europe/Istanbul', flag: '🇹🇷', country: 'Turkey', countryCode: 'TR' },
  
  // Australia & Oceania
  { id: '38', name: 'Sydney', timezone: 'Australia/Sydney', flag: '🇦🇺', country: 'Australia', countryCode: 'AU' },
  { id: '39', name: 'Melbourne', timezone: 'Australia/Melbourne', flag: '🇦🇺', country: 'Australia', countryCode: 'AU' },
  { id: '40', name: 'Perth', timezone: 'Australia/Perth', flag: '🇦🇺', country: 'Australia', countryCode: 'AU' },
  { id: '41', name: 'Auckland', timezone: 'Pacific/Auckland', flag: '🇳🇿', country: 'New Zealand', countryCode: 'NZ' },
  
  // Africa
  { id: '42', name: 'Cairo', timezone: 'Africa/Cairo', flag: '🇪🇬', country: 'Egypt', countryCode: 'EG' },
  { id: '43', name: 'Cape Town', timezone: 'Africa/Johannesburg', flag: '🇿🇦', country: 'South Africa', countryCode: 'ZA' },
  { id: '44', name: 'Lagos', timezone: 'Africa/Lagos', flag: '🇳🇬', country: 'Nigeria', countryCode: 'NG' },
  { id: '45', name: 'Nairobi', timezone: 'Africa/Nairobi', flag: '🇰🇪', country: 'Kenya', countryCode: 'KE' },
  
  // South America
  { id: '46', name: 'São Paulo', timezone: 'America/Sao_Paulo', flag: '🇧🇷', country: 'Brazil', countryCode: 'BR' },
  { id: '47', name: 'Buenos Aires', timezone: 'America/Argentina/Buenos_Aires', flag: '🇦🇷', country: 'Argentina', countryCode: 'AR' },
  { id: '48', name: 'Lima', timezone: 'America/Lima', flag: '🇵🇪', country: 'Peru', countryCode: 'PE' },
  { id: '49', name: 'Santiago', timezone: 'America/Santiago', flag: '🇨🇱', country: 'Chile', countryCode: 'CL' },
  { id: '50', name: 'Bogotá', timezone: 'America/Bogota', flag: '🇨🇴', country: 'Colombia', countryCode: 'CO' },
];

export const defaultTimezones: TimeZone[] = [
  worldCities.find(city => city.name === 'New York')!,
  worldCities.find(city => city.name === 'London')!,
  worldCities.find(city => city.name === 'Tokyo')!,
];
