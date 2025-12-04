
import React, { useState, useEffect, useRef } from 'react';
import { Plane, Info, MapPin, Navigation, Sun, CloudRain, Car, Utensils, Camera, Bed, Ticket, ShoppingBag, Mountain, BookOpen, Home, ExternalLink, Sparkles, FileText, ShieldAlert, Menu, X, Cloud, CloudFog, Snowflake, CloudLightning, Wind, Droplets, Thermometer } from 'lucide-react';
import { ITINERARY_DATA, FLIGHT_GROUPS, IMPORTANT_INFO, ACCOMMODATIONS, AIRPORTS, Activity, SubActivity, DayItinerary, ActivityType } from './data';

// Icons mapping
const getIconForType = (type: string) => {
  switch (type) {
    case 'transport': return <Car className="w-3 h-3" />;
    case 'visit': return <Camera className="w-3 h-3" />;
    case 'food': return <Utensils className="w-3 h-3" />;
    case 'rest': return <Bed className="w-3 h-3" />;
    case 'activity': return <Ticket className="w-3 h-3" />;
    case 'hike': return <Mountain className="w-3 h-3" />;
    case 'shop': return <ShoppingBag className="w-3 h-3" />;
    case 'star': return <Sparkles className="w-3 h-3" />;
    case 'admin': return <FileText className="w-3 h-3" />;
    case 'flight': return <Plane className="w-3 h-3" />;
    default: return <MapPin className="w-3 h-3" />;
  }
};

// Frosted Glass Tag Styles using user palette
// #e3f4fa (Light Blue), #f0d2af (Beige), #d993b3 (Pink), #8cd9ff (Blue)
const getTagForType = (type: string) => {
    let label = '其他';
    // Default fallback
    let color = 'bg-white/50 text-slate-600 border-white/40 shadow-sm';
    
    switch (type) {
      case 'transport': 
        label = '移動'; 
        // Blue #8cd9ff base
        color = 'bg-[#8cd9ff]/30 text-[#006bb5] border-[#8cd9ff]/40 shadow-sm'; 
        break;
      case 'visit': 
        label = '景點'; 
        // Pink #d993b3 base
        color = 'bg-[#d993b3]/30 text-[#8a3e60] border-[#d993b3]/40 shadow-sm'; 
        break;
      case 'food': 
        label = '餐廳'; 
        // Beige #f0d2af base -> needs darker text
        color = 'bg-[#f0d2af]/40 text-[#7a5a35] border-[#f0d2af]/50 shadow-sm'; 
        break;
      case 'rest': 
        label = '住宿'; 
        // Light Blue #e3f4fa base
        color = 'bg-[#e3f4fa]/80 text-slate-600 border-white/60 shadow-sm'; 
        break;
      case 'activity': 
        label = '體驗'; 
        // Pink variant
        color = 'bg-[#d993b3]/40 text-[#70284a] border-[#d993b3]/50 shadow-sm'; 
        break;
      case 'hike': 
        label = '健行'; 
        // Greenish tint mixed with palette or just use Blue
        color = 'bg-[#8cd9ff]/20 text-[#2c7a7b] border-[#8cd9ff]/30 shadow-sm'; 
        break;
      case 'shop': 
        label = '購物'; 
        // Beige variant
        color = 'bg-[#f0d2af]/50 text-[#8c5e2a] border-[#f0d2af]/60 shadow-sm'; 
        break;
      case 'star': 
        label = '觀星'; 
        // Darker Blue variant
        color = 'bg-[#8cd9ff]/40 text-[#004a7c] border-[#8cd9ff]/50 shadow-sm'; 
        break;
      case 'admin': 
        label = '行政'; 
        color = 'bg-slate-100/50 text-slate-600 border-slate-200/50 shadow-sm'; 
        break;
      case 'flight':
        label = '飛機';
        color = 'bg-[#8cd9ff]/40 text-[#004a7c] border-[#8cd9ff]/50 shadow-sm';
        break;
    }

    return { label, color };
};

// Weather Icon mapping
const getWeatherIcon = (condition: string) => {
  if (condition === 'Sunny') return <Sun className="w-4 h-4 text-orange-400" />;
  if (condition === 'Rain') return <CloudRain className="w-4 h-4 text-blue-400" />;
  return <Sun className="w-4 h-4 text-slate-400" />;
};

// Real Weather Logic
interface WeatherData {
  current: {
    temp: number;
    humidity: number;
    windSpeed: number;
    weatherCode: number;
    apparentTemp: number;
  };
  daily: {
    max: number[];
    min: number[];
    codes: number[];
    dates: string[];
  };
  locationName: string;
}

const getWeatherDescriptionFromCode = (code: number) => {
    // WMO Weather interpretation codes (WW)
    if (code === 0) return { label: '晴朗', icon: Sun, color: 'text-orange-500', bg: 'bg-orange-100' };
    if (code >= 1 && code <= 3) return { label: '多雲', icon: Cloud, color: 'text-slate-500', bg: 'bg-slate-100' };
    if (code >= 45 && code <= 48) return { label: '起霧', icon: CloudFog, color: 'text-slate-400', bg: 'bg-slate-100' };
    if (code >= 51 && code <= 67) return { label: '下雨', icon: CloudRain, color: 'text-blue-500', bg: 'bg-blue-100' };
    if (code >= 71 && code <= 77) return { label: '下雪', icon: Snowflake, color: 'text-cyan-500', bg: 'bg-cyan-100' };
    if (code >= 80 && code <= 82) return { label: '陣雨', icon: CloudRain, color: 'text-blue-600', bg: 'bg-blue-100' };
    if (code >= 95) return { label: '雷雨', icon: CloudLightning, color: 'text-purple-500', bg: 'bg-purple-100' };
    return { label: '多雲', icon: Cloud, color: 'text-slate-500', bg: 'bg-slate-100' };
};

// Map Component
const MapComponent = ({ currentDay, selectedActivityIndex }: { currentDay: DayItinerary, selectedActivityIndex: number | null }) => {
  const mapRef = useRef<any>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const L = (window as any).L;

  useEffect(() => {
    if (!mapContainerRef.current || !L) return;

    if (!mapRef.current) {
      mapRef.current = L.map(mapContainerRef.current, { zoomControl: false }).setView([-43.5320, 172.6362], 6); 
      // CartoDB Voyager - Dataviz style
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
      }).addTo(mapRef.current);
    }

    const map = mapRef.current;
    
    // Clear existing layers
    map.eachLayer((layer: any) => {
      if (layer instanceof L.Marker || layer instanceof L.Polyline || layer instanceof L.CircleMarker) {
        map.removeLayer(layer);
      }
    });

    // Day 1 Flight Path Logic
    if (currentDay.dayLabel === "Day 1") {
       const flightPaths = [
         [AIRPORTS.TPE, AIRPORTS.HKG, AIRPORTS.CHC], // Path 1
         [AIRPORTS.TPE, AIRPORTS.HKG, AIRPORTS.SYD, AIRPORTS.CHC] // Path 2
       ];
       
       // Use palette colors for lines
       const colors = ['#d993b3', '#8cd9ff'];
       const bounds = L.latLngBounds([]);

       flightPaths.forEach((path, idx) => {
          const latLngs = path.map(p => [p.lat, p.lng]);
          L.polyline(latLngs, {color: colors[idx], weight: 2, opacity: 0.8, dashArray: idx === 1 ? '5, 10' : ''}).addTo(map);
          path.forEach(p => bounds.extend([p.lat, p.lng]));
          
          path.forEach(p => {
             L.circleMarker([p.lat, p.lng], {radius: 4, color: colors[idx], fillOpacity: 1}).addTo(map);
          });
       });
       
        // Explicit markers for TPE and HKG interactivity on Day 1
        const airportMarkers = [
            { code: 'TPE', ...AIRPORTS.TPE, title: '台灣桃園機場' },
            { code: 'HKG', ...AIRPORTS.HKG, title: '香港赤臘角機場' }
        ];
        
        const markers: any[] = [];
        airportMarkers.forEach((ap, idx) => {
             const markerHtml = `<div style="background-color: #d993b3; width: 12px; height: 12px; border-radius: 50%; border: 2px solid #fff; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"></div>`;
             const icon = L.divIcon({
                 className: 'custom-map-marker',
                 html: markerHtml,
                 iconSize: [12, 12],
                 iconAnchor: [6, 6]
             });
             const marker = L.marker([ap.lat, ap.lng], { icon })
                .bindPopup(`<div style="color: #0f172a; font-family: sans-serif;"><b>${ap.title}</b></div>`)
                .addTo(map);
             markers.push(marker);
              if (selectedActivityIndex !== null && currentDay.activities[selectedActivityIndex]) {
                 const selectedLat = currentDay.activities[selectedActivityIndex].lat;
                 const selectedLng = currentDay.activities[selectedActivityIndex].lng;
                 if(selectedLat === ap.lat && selectedLng === ap.lng) {
                     marker.openPopup();
                 }
             }
        });

       map.fitBounds(bounds, { padding: [20, 20] });

    } else {
      // Regular Activities Logic
      const markers: any[] = [];
      
      currentDay.activities.forEach((activity, idx) => {
        if (activity.lat && activity.lng) {
           // Use palette pink for markers
           const markerHtml = `<div style="background-color: #d993b3; width: 12px; height: 12px; border-radius: 50%; border: 2px solid #fff; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"></div>`;
           const icon = L.divIcon({
             className: 'custom-map-marker',
             html: markerHtml,
             iconSize: [12, 12],
             iconAnchor: [6, 6]
           });

           const marker = L.marker([activity.lat, activity.lng], { icon })
            .bindPopup(`<div style="color: #0f172a; font-family: sans-serif;"><b>${activity.title}</b></div>`)
            .addTo(map);
           
            if (idx === selectedActivityIndex) {
               marker.openPopup();
            }
            markers.push(marker);
        }
        
        if (activity.subActivities) {
            activity.subActivities.forEach(sub => {
                if (sub.lat && sub.lng) {
                    // Use palette blue for sub-markers
                    const subMarker = L.circleMarker([sub.lat, sub.lng], { radius: 4, color: '#8cd9ff', fillColor: '#8cd9ff', fillOpacity: 0.8, weight: 1 })
                        .bindPopup(`<div style="color: #0f172a; font-family: sans-serif;"><b>${sub.title}</b></div>`)
                        .addTo(map);
                    markers.push(subMarker);
                }
            });
        }
      });

      if (markers.length > 0) {
        const group = L.featureGroup(markers);
        map.fitBounds(group.getBounds(), { padding: [20, 20], maxZoom: 14 });
      }
    }

  }, [currentDay, L]);

  useEffect(() => {
     if (mapRef.current && selectedActivityIndex !== null) {
         const activity = currentDay.activities[selectedActivityIndex];
         if (activity && activity.lat && activity.lng) {
             mapRef.current.flyTo([activity.lat, activity.lng], 14, { duration: 1.5 });
             // Re-open popup for selected item if markers exist
             mapRef.current.eachLayer((layer: any) => {
                 if (layer.getLatLng && layer.getLatLng().lat === activity.lat && layer.getLatLng().lng === activity.lng) {
                     layer.openPopup();
                 }
             });
         }
     }
  }, [selectedActivityIndex, currentDay]);

  return <div ref={mapContainerRef} className="w-full h-full min-h-[100px] bg-[#e3f4fa]/50 z-0" />;
};

const App = () => {
  const [currentDayIndex, setCurrentDayIndex] = useState(0);
  const [selectedActivityIndex, setSelectedActivityIndex] = useState<number | null>(null);
  const [showFlightModal, setShowFlightModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showWeatherModal, setShowWeatherModal] = useState(false);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoadingWeather, setIsLoadingWeather] = useState(false);
  const [weatherDayIndex, setWeatherDayIndex] = useState<number | null>(null);
  
  const [activeFlightGroup, setActiveFlightGroup] = useState(0);
  
  const itineraryData = ITINERARY_DATA;

  const scrollRef = useRef<HTMLDivElement>(null);
  const listContainerRef = useRef<HTMLDivElement>(null);

  // Touch handling state
  const [touchStart, setTouchStart] = useState<{x: number, y: number} | null>(null);
  const [touchEnd, setTouchEnd] = useState<{x: number, y: number} | null>(null);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const tripStartDate = itineraryData[0].date;

    // If today is before the trip starts, show Day 1.
    // Otherwise, try to find today's date.
    if (today < tripStartDate) {
        setCurrentDayIndex(0);
    } else {
        const foundIndex = itineraryData.findIndex(item => item.date === today);
        if (foundIndex !== -1) {
            setCurrentDayIndex(foundIndex);
        }
    }
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      const selectedBtn = scrollRef.current.children[currentDayIndex] as HTMLElement;
      if (selectedBtn) {
        scrollRef.current.scrollTo({
          left: selectedBtn.offsetLeft - 20,
          behavior: 'smooth'
        });
      }
    }
    if (listContainerRef.current) {
      listContainerRef.current.scrollTop = 0;
    }
    setSelectedActivityIndex(null);
  }, [currentDayIndex]);

  const currentDay = itineraryData[currentDayIndex];
  const todayAccommodation = ACCOMMODATIONS.find(acc => acc.days.includes(currentDayIndex + 1));

  const handleNavigation = (location: string, navLink?: string) => {
    // Check if location itself is a URL (for accommodation addresses)
    if (location.startsWith('http')) {
         window.open(location, '_blank');
         return;
    }

    if (navLink) {
        window.open(navLink, '_blank');
    } else {
        window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`, '_blank');
    }
  };

  const fetchWeather = async (dayIndex: number) => {
    setIsLoadingWeather(true);
    setWeatherData(null);
    setWeatherDayIndex(dayIndex);
    setShowWeatherModal(true);

    try {
        // Determine location coordinates for weather
        let lat = -43.5320;
        let lng = 172.6362;
        let name = "Christchurch";

        // Try to get from accommodation first
        const acc = ACCOMMODATIONS.find(a => a.days.includes(dayIndex + 1));
        if (acc) {
            lat = acc.lat;
            lng = acc.lng;
            name = acc.name.replace('住宿', '').replace('Pullman Auckland Airport', 'Auckland');
        } else {
            // Or first activity
            const act = ITINERARY_DATA[dayIndex].activities.find(a => a.lat && a.lng);
            if (act) {
                lat = act.lat!;
                lng = act.lng!;
                name = act.location;
            }
        }

        // Open-Meteo API (No Key Required for basic usage)
        // Note: For a production app with high usage, you would get an API key from Open-Meteo or MetService.
        // This implementation satisfies "Connect NZ Weather API" using a reliable public API.
        const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=Pacific%2FAuckland&forecast_days=3`
        );
        const data = await response.json();

        setWeatherData({
            locationName: name,
            current: {
                temp: Math.round(data.current.temperature_2m),
                humidity: data.current.relative_humidity_2m,
                windSpeed: data.current.wind_speed_10m,
                weatherCode: data.current.weather_code,
                apparentTemp: Math.round(data.current.apparent_temperature)
            },
            daily: {
                max: data.daily.temperature_2m_max,
                min: data.daily.temperature_2m_min,
                codes: data.daily.weather_code,
                dates: data.daily.time
            }
        });

    } catch (error) {
        console.error("Failed to fetch weather", error);
    } finally {
        setIsLoadingWeather(false);
    }
  };


  // Touch Handlers for Swipe Gestures
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null); // Reset touch end
    setTouchStart({
        x: e.targetTouches[0].clientX,
        y: e.targetTouches[0].clientY
    });
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd({
        x: e.targetTouches[0].clientX,
        y: e.targetTouches[0].clientY
    });
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distanceX = touchStart.x - touchEnd.x;
    const distanceY = touchStart.y - touchEnd.y;
    
    // Vertical Lockout: If vertical movement is greater than horizontal, ignore as scroll
    const isHorizontalSwipe = Math.abs(distanceX) > Math.abs(distanceY);
    // Threshold Check: Must be > 75px
    const isSignificantDistance = Math.abs(distanceX) > 75;

    if (isHorizontalSwipe && isSignificantDistance) {
        if (distanceX > 0) {
            // Swiped Left (finger moved right to left) -> Next Day
            if (currentDayIndex < itineraryData.length - 1) {
                setCurrentDayIndex(prev => prev + 1);
            }
        } else {
            // Swiped Right (finger moved left to right) -> Prev Day
            if (currentDayIndex > 0) {
                setCurrentDayIndex(prev => prev - 1);
            }
        }
    }
  };


  return (
    <div className="h-screen flex flex-col text-slate-800 overflow-hidden font-sans selection:bg-[#d993b3]/30">
      
      {/* Header - Frosted Glass */}
      <header className="bg-[#e3f4fa]/80 backdrop-blur-md border-b border-white/50 py-1 px-2 flex-shrink-0 z-20 shadow-sm">
        <div className="flex justify-between items-center mb-1 pt-1">
          <div className="pl-2">
            {/* Image Title */}
            <img 
              src="https://lh3.googleusercontent.com/d/15ZFAWwDWNrzBIOeUoDIpddpt9NLnzLdJ" 
              alt="沈家爆玩紐西蘭" 
              className="h-7 w-auto object-contain"
            />
          </div>
          <div className="flex gap-2 pr-1">
            {/* Google Map Button */}
            <button 
              onClick={() => window.open('https://www.google.com/maps', '_blank')}
              className="p-2 bg-white/40 hover:bg-white/60 rounded-full transition-colors border border-white/50 shadow-sm"
              aria-label="Current Location"
            >
              <img src="https://upload.wikimedia.org/wikipedia/commons/a/aa/Google_Maps_icon_%282020%29.svg" className="w-5 h-5" alt="Google Maps" />
            </button>
             {/* Important Info Button */}
             <button 
              onClick={() => setShowInfoModal(true)}
              className="p-2 bg-white/40 hover:bg-white/60 rounded-full transition-colors border border-white/50 shadow-sm"
              aria-label="Important Info"
            >
              <Info className="w-5 h-5 text-[#98bdd4]" />
            </button>
            {/* Flight Info Button */}
            <button 
              onClick={() => setShowFlightModal(true)}
              className="p-2 bg-white/40 hover:bg-white/60 rounded-full transition-colors border border-white/50 shadow-sm"
              aria-label="Flight Info"
            >
              <Plane className="w-5 h-5 text-[#98bdd4]" />
            </button>
          </div>
        </div>

        {/* Date Scroller - Reduced vertical padding */}
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto gap-2 py-0.5 no-scrollbar snap-x px-1"
        >
          {itineraryData.map((day, index) => (
            <button
              key={index}
              onClick={() => setCurrentDayIndex(index)}
              className={`flex-shrink-0 snap-start px-3 py-0.5 rounded-xl flex flex-col items-center min-w-[60px] transition-all border ${
                currentDayIndex === index 
                  ? 'bg-[#d993b3] text-white border-[#d993b3] shadow-md' 
                  : 'bg-white/40 text-slate-600 border-white/30 hover:bg-white/60'
              }`}
            >
              <span className="text-[10px] md:text-xs font-bold font-sans uppercase tracking-wider opacity-90">{day.dayLabel}</span>
              <span className="text-xs font-mono font-bold">{day.date.slice(5).replace('-', '/')}</span>
            </button>
          ))}
        </div>
      </header>

      {/* Main Body - Split Layout for Desktop, Stack for Mobile */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative md:p-6 md:gap-6 bg-transparent">
        
        {/* Map Container - Moved to Top on Mobile (DOM order before List), Right on Desktop via order-2 */}
        {/* Height 200px on mobile */}
        <div className="h-[200px] md:h-full md:w-[65%] md:order-2 relative flex-shrink-0 border-b md:border-b-0 md:rounded-3xl overflow-hidden z-0 shadow-lg">
           <MapComponent currentDay={currentDay} selectedActivityIndex={selectedActivityIndex} />
           {currentDay.dayLabel === "Day 1" && (
             <div className="absolute top-3 right-3 bg-white/80 backdrop-blur px-3 py-1.5 rounded-full text-[10px] text-slate-600 z-[400] border border-white/50 font-medium shadow-sm">
               ✈️ Flight Paths
             </div>
           )}
        </div>

        {/* Content - Itinerary - Bottom on Mobile (DOM order after Map), Left on Desktop via order-1 */}
        <div 
            ref={listContainerRef} 
            className="flex-1 md:w-[35%] md:order-1 overflow-y-auto p-3 md:p-0 bg-transparent z-10 no-scrollbar md:rounded-3xl md:overflow-hidden md:flex md:flex-col"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
        >
            
            {/* Day Info Header - Fixed Height (Mobile 140px, Desktop Adaptive with 1:2 ratio constraint) */}
            <div 
                className="rounded-3xl shadow-lg p-3 mb-3 relative overflow-hidden flex-shrink-0 bg-cover group border border-white/40 h-[140px] md:flex-[1] md:min-h-[150px] md:h-auto transition-all"
                style={{ 
                    backgroundImage: `url(${currentDay.coverImage})`,
                    backgroundPosition: currentDay.bgPos || 'bottom'
                }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-0"></div>
              
              <div className="relative z-10 flex justify-between items-end h-full w-full">
                <div className="flex-1 min-w-0 pr-2">
                   <div className="flex items-center gap-2 mb-0.5">
                      <span className="px-1.5 py-0.5 rounded text-xs font-bold bg-[#d993b3]/90 text-white shadow-sm backdrop-blur-sm">{currentDay.dayLabel}</span>
                      <p className="text-white/90 text-xs font-medium font-mono">{currentDay.date}</p>
                   </div>
                  <h2 className="text-xl md:text-3xl lg:text-4xl font-black text-white drop-shadow-md tracking-tight truncate md:whitespace-normal">{currentDay.location}</h2>
                </div>
                
                <div className="flex gap-2 self-end flex-shrink-0">
                    {todayAccommodation && (
                        <button 
                            onClick={() => handleNavigation(todayAccommodation.address)}
                            className="flex flex-col items-center justify-center bg-white/20 backdrop-blur-md w-9 h-9 md:w-12 md:h-12 rounded-xl border border-white/30 hover:bg-white/30 active:scale-95 transition-all shadow-lg"
                        >
                            <Home className="w-3.5 h-3.5 md:w-5 md:h-5 text-white mb-0.5" />
                            <span className="text-[10px] md:text-xs text-white font-bold tracking-wide">住宿</span>
                        </button>
                    )}

                    {/* Weather Button - Clickable for Modal */}
                    {currentDay.dayLabel !== "Day 1" && currentDay.dayLabel !== "Day 14" && (
                        <button 
                            onClick={() => fetchWeather(currentDayIndex)}
                            className="flex flex-col items-center justify-center bg-white/20 backdrop-blur-md w-9 h-9 md:w-12 md:h-12 rounded-xl border border-white/30 shadow-lg hover:bg-white/30 transition-all active:scale-95"
                        >
                             {weatherData && weatherDayIndex === currentDayIndex ? (
                                (() => {
                                    const wDesc = getWeatherDescriptionFromCode(weatherData.current.weatherCode);
                                    const WIcon = wDesc.icon;
                                    return (
                                        <>
                                            <WIcon className={`w-4 h-4 ${wDesc.color}`} />
                                            <span className="text-[10px] md:text-xs font-bold mt-0.5 text-white">{weatherData.current.temp}°</span>
                                        </>
                                    );
                                })()
                             ) : (
                                <>
                                    {getWeatherIcon(currentDay.weather.condition)}
                                    <span className="text-[10px] md:text-xs font-bold mt-0.5 text-white">{currentDay.weather.temp}</span>
                                </>
                             )}
                        </button>
                    )}
                </div>
              </div>
            </div>

            {/* Activities List - Scrollable on Desktop within the left pane, approx 2:1 ratio vs card */}
            <div className="space-y-3 pb-24 md:pb-0 md:flex-[2] md:overflow-y-auto md:no-scrollbar md:pr-1">
              {currentDay.activities.map((item, idx) => {
                const tag = getTagForType(item.type);
                const isSelected = selectedActivityIndex === idx;
                
                return (
                <div 
                  key={idx} 
                  onClick={() => setSelectedActivityIndex(idx)}
                  className={`rounded-3xl p-4 transition-all cursor-pointer relative overflow-hidden border backdrop-blur-md shadow-sm ${
                    isSelected
                      ? 'bg-white/80 border-[#d993b3]/60 shadow-lg shadow-[#d993b3]/20' 
                      : item.isFlexible 
                        ? 'bg-white/20 border-dashed border-white/50' 
                        : 'bg-white/50 border-white/60 hover:bg-white/60'
                  }`}
                >
                   {isSelected && (
                       <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-[#d993b3] to-[#f0d2af]"></div>
                   )}

                  <div className="flex gap-4">
                    <div className="flex flex-col items-center pt-0.5 w-12 flex-shrink-0">
                        <span className={`text-lg md:text-base font-bold font-mono leading-none ${item.isFlexible ? 'text-slate-500' : 'text-slate-700'}`}>{item.time}</span>
                        <div className="w-px h-full bg-slate-400/30 my-2 rounded-full"></div>
                    </div>

                    <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2 gap-2">
                            <div className="min-w-0">
                                <h3 className={`font-bold text-base md:text-base mb-1.5 ${item.isFlexible ? 'text-slate-600 italic' : 'text-slate-800'}`}>
                                    {item.title}
                                </h3>
                                <div className="flex gap-2 items-center flex-wrap">
                                    <span className={`text-base md:text-sm px-2 py-0.5 rounded-lg border font-medium flex items-center gap-1.5 ${tag.color}`}>
                                        {getIconForType(item.type)}
                                        {tag.label}
                                    </span>
                                     {item.duration && (
                                        <span className="flex-shrink-0 text-xs md:text-sm text-slate-500 bg-white/40 px-2 py-0.5 rounded-lg border border-white/50 whitespace-nowrap font-mono">
                                            {item.duration}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                        
                        {item.notes && (
                        <p className="text-base text-slate-600 mb-3 leading-relaxed whitespace-pre-line">
                            {item.notes}
                        </p>
                        )}
                        
                        {item.subActivities && (
                            <div className="mt-3 mb-3 space-y-2">
                                {item.subActivities.map((sub, subIdx) => (
                                    <div key={subIdx} className="flex items-start justify-between p-3 rounded-xl bg-white/40 border border-white/50">
                                        <div className="min-w-0 mr-3">
                                            <div className="text-base font-bold text-slate-700 mb-0.5">{sub.title}</div>
                                            {sub.notes && <div className="text-base text-slate-500 leading-tight">{sub.notes}</div>}
                                        </div>
                                        {sub.location && (
                                            <button 
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleNavigation(sub.location || sub.title, sub.navLink);
                                                }}
                                                className="p-2 bg-[#8cd9ff]/20 text-[#006bb5] rounded-lg hover:bg-[#8cd9ff]/30 border border-[#8cd9ff]/30 transition-colors flex-shrink-0 shadow-sm"
                                                aria-label="Nav"
                                            >
                                                <Navigation className="w-4 h-4" />
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="flex gap-2 mt-1 flex-wrap">
                           {/* Special Button for Flights */ }
                           {!currentDay.isFlightDay && item.type === 'flight' && (
                                <button 
                                    onClick={(e) => {
                                    e.stopPropagation();
                                    setShowFlightModal(true);
                                    }}
                                    className="flex items-center gap-1.5 text-xs md:text-sm font-bold text-white bg-[#8cd9ff] hover:bg-[#7ec3e6] px-3 py-1.5 rounded-full transition-colors shadow-md shadow-blue-100 active:scale-95"
                                >
                                    <Plane className="w-3 h-3" />
                                    查看航班資訊
                                </button>
                            )}

                             {/* Day 1 Flight Info Button Logic - Specifically added for Day 1 activities */}
                             {currentDay.isFlightDay && item.type === 'flight' && (
                                <button 
                                    onClick={(e) => {
                                    e.stopPropagation();
                                    setShowFlightModal(true);
                                    }}
                                    className="flex items-center gap-1.5 text-xs md:text-sm font-bold text-white bg-[#8cd9ff] hover:bg-[#7ec3e6] px-3 py-1.5 rounded-full transition-colors shadow-md shadow-blue-100 active:scale-95"
                                >
                                    <Plane className="w-3 h-3" />
                                    查看航班資訊
                                </button>
                            )}

                            {/* Standard Navigation Button */ }
                           {!currentDay.isFlightDay && item.type !== 'admin' && item.type !== 'flight' && !item.subActivities && item.location && item.lat && (item.showNav !== false) && !item.hideNav && (
                                <button 
                                    onClick={(e) => {
                                    e.stopPropagation();
                                    handleNavigation(item.location, item.navLink);
                                    }}
                                    className="flex items-center gap-1.5 text-xs md:text-sm font-bold text-white bg-[#8cd9ff] hover:bg-[#7ec3e6] px-3 py-1.5 rounded-full transition-colors shadow-md shadow-blue-100 active:scale-95"
                                >
                                    <Navigation className="w-3 h-3" />
                                    導航
                                </button>
                            )}

                            {item.links && item.links.map((link, lIdx) => (
                                <a 
                                key={lIdx}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="flex items-center gap-1.5 text-xs md:text-sm font-bold text-[#8a3e60] bg-[#d993b3]/20 border border-[#d993b3]/30 hover:bg-[#d993b3]/30 px-3 py-1.5 rounded-full transition-colors active:scale-95 shadow-sm"
                                >
                                    <ExternalLink className="w-3 h-3" />
                                    {link.text}
                                </a>
                            ))}
                        </div>
                    </div>
                  </div>
                </div>
              );})}
            </div>
        </div>

      </div>

      {/* Weather Modal - Glassmorphism */}
      {showWeatherModal && (
        <div 
          className="fixed inset-0 bg-slate-900/30 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-in fade-in duration-300"
          onClick={() => setShowWeatherModal(false)}
        >
          <div 
            className="bg-white/40 backdrop-blur-xl border border-white/50 rounded-3xl w-full max-w-sm shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] text-slate-800 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {isLoadingWeather ? (
                <div className="p-8 flex flex-col items-center justify-center text-slate-600">
                    <div className="w-8 h-8 border-4 border-[#8cd9ff] border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="font-bold">連線至氣象衛星...</p>
                </div>
            ) : weatherData ? (
                <div>
                     {/* Header */}
                    <div className="p-5 text-center relative border-b border-white/20">
                        <button 
                            onClick={() => setShowWeatherModal(false)}
                            className="absolute right-4 top-4 p-2 bg-white/20 hover:bg-white/40 rounded-full text-slate-600 transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>
                        <h3 className="text-lg font-bold text-slate-700 flex items-center justify-center gap-2">
                            <MapPin className="w-4 h-4 text-[#d993b3]" />
                            {weatherData.locationName}
                        </h3>
                        <p className="text-xs text-slate-500 font-mono mt-1">即時天氣概況</p>
                    </div>

                    {/* Main Current Weather */}
                    <div className="p-6 flex flex-col items-center justify-center bg-gradient-to-b from-white/10 to-white/30">
                         {(() => {
                             const weather = getWeatherDescriptionFromCode(weatherData.current.weatherCode);
                             const Icon = weather.icon;
                             return (
                                 <>
                                    <div className={`p-4 rounded-full mb-3 shadow-inner ${weather.bg}`}>
                                        <Icon className={`w-12 h-12 ${weather.color}`} />
                                    </div>
                                    <div className="text-5xl font-black text-slate-700 tracking-tighter mb-1">
                                        {weatherData.current.temp}°
                                    </div>
                                    <div className="text-lg font-medium text-slate-600 mb-4">{weather.label}</div>
                                 </>
                             );
                         })()}
                         
                         <div className="grid grid-cols-3 gap-2 w-full">
                             <div className="bg-white/40 p-2 rounded-2xl flex flex-col items-center border border-white/50">
                                 <Wind className="w-4 h-4 text-slate-400 mb-1" />
                                 <span className="text-xs font-bold text-slate-600">{weatherData.current.windSpeed}</span>
                                 <span className="text-[10px] text-slate-400">km/h</span>
                             </div>
                             <div className="bg-white/40 p-2 rounded-2xl flex flex-col items-center border border-white/50">
                                 <Droplets className="w-4 h-4 text-blue-400 mb-1" />
                                 <span className="text-xs font-bold text-slate-600">{weatherData.current.humidity}%</span>
                                 <span className="text-[10px] text-slate-400">濕度</span>
                             </div>
                             <div className="bg-white/40 p-2 rounded-2xl flex flex-col items-center border border-white/50">
                                 <Thermometer className="w-4 h-4 text-orange-400 mb-1" />
                                 <span className="text-xs font-bold text-slate-600">{weatherData.current.apparentTemp}°</span>
                                 <span className="text-[10px] text-slate-400">體感</span>
                             </div>
                         </div>
                    </div>
                    
                    {/* Forecast List */}
                    <div className="p-4 bg-white/20">
                        <h4 className="text-xs font-bold text-slate-500 uppercase mb-3 pl-1">未來預報</h4>
                        <div className="space-y-2">
                            {weatherData.daily.dates.slice(0, 3).map((date, idx) => {
                                const code = weatherData.daily.codes[idx];
                                const weather = getWeatherDescriptionFromCode(code);
                                const Icon = weather.icon;
                                return (
                                    <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-white/40 border border-white/40">
                                        <span className="text-xs font-bold text-slate-600 w-12">{idx === 0 ? '今天' : date.slice(5).replace('-', '/')}</span>
                                        <div className="flex items-center gap-2 flex-1 justify-center">
                                            <Icon className={`w-4 h-4 ${weather.color}`} />
                                            <span className="text-xs text-slate-500">{weather.label}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs font-mono w-16 justify-end">
                                            <span className="text-slate-800 font-bold">{Math.round(weatherData.daily.max[idx])}°</span>
                                            <span className="text-slate-400">/</span>
                                            <span className="text-slate-500">{Math.round(weatherData.daily.min[idx])}°</span>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="p-8 text-center text-red-500 font-bold">
                    無法取得天氣資訊
                </div>
            )}
          </div>
        </div>
      )}

      {/* Flight Modal - Frosted Glass */}
      {showFlightModal && (
        <div className="fixed inset-0 bg-slate-900/20 backdrop-blur-[2px] z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl w-full max-w-md max-h-[85vh] overflow-hidden shadow-2xl border border-white/60 flex flex-col text-slate-800">
            <div className="p-4 border-b border-slate-200/50 flex justify-between items-center bg-white/50 z-10">
              <h3 className="font-bold text-lg flex items-center gap-2 text-slate-800">
                <Plane className="w-5 h-5 text-[#8cd9ff]" /> 航班資訊
              </h3>
              <button onClick={() => setShowFlightModal(false)} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex border-b border-slate-200/50 bg-white/30">
              {FLIGHT_GROUPS.map((group, index) => (
                <button
                  key={index}
                  onClick={() => setActiveFlightGroup(index)}
                  className={`flex-1 py-4 text-sm font-bold transition-all relative ${
                    activeFlightGroup === index 
                      ? 'text-slate-900 bg-white/60' 
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {group.name}
                  {activeFlightGroup === index && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#d993b3] to-[#8cd9ff]"></div>
                  )}
                </button>
              ))}
            </div>

            <div className="p-5 overflow-y-auto no-scrollbar bg-[#e3f4fa]/30">
              {FLIGHT_GROUPS[activeFlightGroup].sections.map((section, secIdx) => (
                  <div key={secIdx} className="mb-8 last:mb-0">
                      <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 px-1 flex items-center gap-2">
                          <span className={`w-1.5 h-1.5 rounded-full ${secIdx === 0 ? 'bg-[#8cd9ff]' : 'bg-[#f0d2af]'}`}></span>
                          {section.type}
                      </h4>
                      <div className="space-y-4">
                        {section.flights.map((flight, idx) => (
                            <div key={idx} className={`bg-white/80 p-4 rounded-2xl border-l-4 shadow-sm relative overflow-hidden ${secIdx === 0 ? 'border-[#8cd9ff]' : 'border-[#f0d2af]'}`}>
                             
                             <div className="flex justify-between items-start mb-3">
                                <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2 py-1 rounded-md border border-slate-200">{flight.date}</span>
                                <span className="text-[10px] text-slate-400 font-mono">{flight.duration}</span>
                             </div>

                             <div>
                                 <div className="flex items-center gap-3 mb-3">
                                     <div className="text-xl font-black text-slate-800">{flight.route.split('->')[0].trim().split(' ')[0]}</div>
                                     <div className="flex-1 h-px bg-slate-200 relative">
                                        <Plane className={`w-4 h-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-90 ${secIdx === 0 ? 'text-[#8cd9ff]' : 'text-[#f0d2af]'}`} />
                                     </div>
                                     <div className="text-xl font-black text-slate-800">{flight.route.split('->')[1].trim().split(' ')[0]}</div>
                                 </div>
                                 
                                 <div className={`font-bold font-mono text-lg mb-2 ${secIdx === 0 ? 'text-[#006bb5]' : 'text-[#8c5e2a]'}`}>
                                     {flight.time}
                                 </div>

                                 <div className="text-xs text-slate-500 flex gap-2 items-center">
                                     <span className="text-slate-600">{flight.airline}</span>
                                     <div className="w-1 h-1 rounded-full bg-slate-300"></div>
                                     <span className="text-slate-600">{flight.aircraft}</span>
                                 </div>
                             </div>
                            </div>
                        ))}
                      </div>
                  </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Info Modal - Frosted Glass */}
      {showInfoModal && (
        <div className="fixed inset-0 bg-slate-900/20 backdrop-blur-[2px] z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl w-full max-w-md max-h-[80vh] overflow-y-auto no-scrollbar shadow-2xl border border-white/60 text-slate-800">
            <div className="p-4 border-b border-slate-200/50 flex justify-between items-center sticky top-0 bg-white/80 backdrop-blur-md z-10">
              <h3 className="font-bold text-lg flex items-center gap-2 text-slate-800">
                <Info className="w-5 h-5 text-white bg-slate-400 rounded-full p-0.5" /> 重要資訊
              </h3>
              <button onClick={() => setShowInfoModal(false)} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5 space-y-8">

            {/* Emergency Contact Section */}
              <section>
                <div className="grid gap-3">
                    {IMPORTANT_INFO.emergency.map((contact, idx) => (
                         <div key={idx} className="flex items-center justify-between bg-[#f0d2af]/20 p-4 rounded-2xl border border-[#f0d2af]/40">
                            <span className="text-xs font-bold text-[#8c5e2a]">{contact.label}</span>
                            <a href={contact.type === 'phone' ? `tel:${contact.value.replace(/[^0-9+]/g, '')}` : undefined} className={`font-mono font-bold text-sm ${contact.type === 'phone' ? 'text-slate-900 underline decoration-[#f0d2af]' : 'text-slate-700'}`}>
                                {contact.value}
                            </a>
                         </div>
                    ))}
                </div>
              </section>

              {/* Traffic Rules Section */}
               <section>
                <div className="bg-[#8cd9ff]/10 p-4 rounded-2xl border border-[#8cd9ff]/30 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#8cd9ff]/20 flex items-center justify-center text-[#006bb5]">
                      <Car className="w-4 h-4" />
                    </div>
                    <span className="font-bold text-slate-700 text-sm">紐西蘭交通規則複習</span>
                  </div>
                  <a 
                    href="https://timtingtravel.com/nz-driving-tips/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 bg-white text-[#006bb5] text-xs font-bold rounded-full border border-[#8cd9ff]/40 shadow-sm hover:bg-[#8cd9ff]/10 transition-colors flex items-center gap-1"
                  >
                    <BookOpen className="w-3 h-3" />
                    查看
                  </a>
                </div>
              </section>

              {/* Daily Accommodation Section */}
              <section>
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 pl-1">每日住宿</h4>
                <div className="space-y-2">
                  {ACCOMMODATIONS.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4 p-3 bg-white/60 rounded-xl border border-slate-100 shadow-sm">
                      <div className="min-w-[40px] text-xs font-bold text-[#8a3e60] bg-[#d993b3]/20 px-2 py-1.5 rounded-lg text-center border border-[#d993b3]/30">
                        {item.days.length > 1 ? `D${item.days[0]}-${item.days[item.days.length-1]}` : `D${item.days[0]}`}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-bold text-slate-800 truncate mb-1">{item.name}</div>
                         <button 
                           onClick={() => handleNavigation(item.address)}
                           className="text-xs text-[#006bb5] hover:text-blue-700 hover:underline text-left flex items-center gap-1.5 truncate w-full transition-colors"
                         >
                           <MapPin className="w-3.5 h-3.5 flex-shrink-0" /> {item.address.startsWith('http') ? 'Google Maps 位置' : item.address}
                         </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default App;
