import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Location {
  country: string;
  countryCode: string;
  isUK: boolean;
  detected: boolean;
}

interface LocationState {
  location: Location;
  setLocation: (location: Partial<Location>) => void;
  detectLocation: () => Promise<void>;
  getDeliveryThreshold: () => number;
}

const defaultLocation: Location = {
  country: 'United Kingdom',
  countryCode: 'GB',
  isUK: true,
  detected: false,
};

const useLocationStore = create<LocationState>()(
  persist(
    (set, get) => ({
      location: defaultLocation,
      
      setLocation: (newLocation: Partial<Location>) => {
        set((state) => ({
          location: { ...state.location, ...newLocation },
        }));
      },
      
      detectLocation: async () => {
        try {
          // Try multiple location detection methods
          
          // Method 1: Try IP-based geolocation API
          try {
            const response = await fetch('https://ipapi.co/json/');
            if (response.ok) {
              const data = await response.json();
              const isUK = data.country_code === 'GB';
              
              set({
                location: {
                  country: data.country_name || 'Unknown',
                  countryCode: data.country_code || 'XX',
                  isUK,
                  detected: true,
                },
              });
              return;
            }
          } catch (error) {
            console.warn('IP geolocation failed:', error);
          }
          
          // Method 2: Try browser geolocation with country lookup
          if (navigator.geolocation) {
            return new Promise<void>((resolve) => {
              navigator.geolocation.getCurrentPosition(
                async (position) => {
                  try {
                    // Use reverse geocoding to get country
                    const { latitude, longitude } = position.coords;
                    const response = await fetch(
                      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
                    );
                    
                    if (response.ok) {
                      const data = await response.json();
                      const isUK = data.countryCode === 'GB';
                      
                      set({
                        location: {
                          country: data.countryName || 'Unknown',
                          countryCode: data.countryCode || 'XX',
                          isUK,
                          detected: true,
                        },
                      });
                    }
                  } catch (error) {
                    console.warn('Reverse geocoding failed:', error);
                    // Keep default location
                  }
                  resolve();
                },
                () => {
                  // Geolocation denied or failed, use default
                  resolve();
                }
              );
            });
          }
          
          // Method 3: Try timezone-based detection as fallback
          const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
          if (timezone.includes('London') || timezone.includes('Europe/London')) {
            set({
              location: {
                country: 'United Kingdom',
                countryCode: 'GB',
                isUK: true,
                detected: true,
              },
            });
          }
          
        } catch (error) {
          console.warn('Location detection failed:', error);
          // Keep default location (UK)
        }
      },
      
      getDeliveryThreshold: () => {
        const { location } = get();
        return location.isUK ? 30 : 100; // £30 for UK, £100 for international
      },
    }),
    {
      name: 'location-storage',
      partialize: (state) => ({ location: state.location }),
    }
  )
);

export default useLocationStore;
