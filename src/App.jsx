import { useState, useEffect, useRef } from "react";
import { Heart, MapPin, Users, ChevronRight, ChevronLeft, Star, Sparkles, Calculator, CalendarDays, GitCompareArrows, MessageCircle, X, Menu, ArrowUp, Send, TreePine, Building2, Sunset, Landmark, Waves, UtensilsCrossed, Check, Instagram, Facebook, Mail, Crown, Award, Lock, Shield, UserPlus, LogOut, Eye, EyeOff, Trash2, Settings } from "lucide-react";

/* Singapore Wedding Venues — singaporeweddingvenues.net
   Singapore's Premier AI-Powered Wedding Venue Discovery Platform
   28 venues: 10 × 1-Host Collection + 18 × Major Hotels & Heritage */

const SEO_SCHEMA = {
  website: {"@context":"https://schema.org","@type":"WebSite","name":"Singapore Wedding Venues","url":"https://www.singaporeweddingvenues.net","description":"Singapore's premier AI-powered wedding venue discovery platform. Explore 28+ iconic venues — luxury hotels, rooftop restaurants, heritage mansions, and garden estates.","potentialAction":{"@type":"SearchAction","target":"https://www.singaporeweddingvenues.net/search?q={search_term_string}","query-input":"required name=search_term_string"}},
  faq: {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"What are the best wedding venues in Singapore for 2026?","acceptedAnswer":{"@type":"Answer","text":"Top venues include Raffles Hotel, The Fullerton Hotel, Capella Singapore, Marina Bay Sands, 1-Arden at CapitaSpring Level 51, 1-Alfaro at Labrador Tower, and Monti at Fullerton Pavilion. Prices range from $1,288++ to $3,200++ per table of 10."}},{"@type":"Question","name":"How much does a wedding banquet cost in Singapore?","acceptedAnswer":{"@type":"Answer","text":"Wedding banquet costs range from $1,288–$3,200++ per table of 10. Budget options start at $1,200++ (JEN Tanglin), mid-range at $1,688–$2,688++ (Grand Hyatt, Mandarin Oriental), luxury at $2,200–$3,200++ (Raffles, St Regis). The '++' denotes 10% service charge and 9% GST."}},{"@type":"Question","name":"What is a solemnisation ceremony in Singapore?","acceptedAnswer":{"@type":"Answer","text":"A solemnisation is the legal wedding ceremony conducted under the Registry of Marriages (ROM). Popular venues include 1-Arden, Monti, The Alkaff Mansion, Raffles Hotel, Shangri-La, and Capella Singapore."}},{"@type":"Question","name":"How many guests can a Singapore hotel wedding accommodate?","acceptedAnswer":{"@type":"Answer","text":"Hotel ballrooms accommodate 200–2,500 guests. Marina Bay Sands fits 2,500, Shangri-La 800, Hilton Orchard 800, Grand Hyatt 600. Intimate restaurant venues like 1-Alfaro (120 seated) suit smaller celebrations."}}]}
};

const VENUES=[
{id:"1-alfaro",name:"1-Alfaro",tagline:"The Lighthouse",isNew:true,managed:"1-Host",location:"Labrador Tower Level 34, 1 Pasir Panjang Rd, S118479",area:"Pasir Panjang",description:"Singapore's latest rooftop wedding venue. Meaning 'The Lighthouse' in Italian, 1-Alfaro features floor-to-ceiling glass walls, panoramic city-and-sea views, and the world's highest agrivoltaics farm-to-table concept with authentic Emilia-Romagna flavours by the MONTI team.",capacity:{s:120,st:320},setting:"Indoor & Outdoor",cuisine:["Modern Italian","Farm-to-Table"],price:{min:1400,max:1850,unit:"guest"},budget:{l:"$140–$165++",d:"$160–$185++"},cat:"rooftop",catLabel:"Rooftop · Sky Dining",featured:true,solemn:true,rating:4.9,img:"https://www.1-host.sg/wp-content/uploads/2024/12/this-Host-featured-image-wordpress-794-x-1150-px-4-x-5-in-467-x-632-px-2-1.jpg",hero:"https://www.1-host.sg/wp-content/uploads/2024/12/1-Host-Wordpress-Main-Banner-2.jpg",gallery:["https://www.1-host.sg/wp-content/uploads/2024/12/2-5.jpg","https://www.1-host.sg/wp-content/uploads/2024/12/1-5.jpg","https://www.1-host.sg/wp-content/uploads/2024/12/3-5.jpg","https://www.1-host.sg/wp-content/uploads/2024/12/4-4.jpg"],bestFor:["Rooftop solemnisation with sea views","Italian farm-to-table dinner","Intimate 120-guest celebration"],web:"https://www.1-host.sg/venues/1-alfaro/"},
{id:"1-altitude-coast",name:"1-Altitude Coast",tagline:"Sentosa Seascapes",managed:"1-Host",location:"The Outpost Hotel, Sentosa",area:"Sentosa",description:"Panoramic seascapes from Sentosa's highest vantage point. Sun, sea, and sky for magical beachfront celebrations.",capacity:{s:80,st:200},setting:"Outdoor",cuisine:["International","Western"],price:{min:1400,max:1850,unit:"guest"},budget:{l:"$140–$165++",d:"$160–$185++"},cat:"beachfront",catLabel:"Beachfront",featured:false,solemn:true,rating:4.6,img:"https://www.1-host.sg/wp-content/uploads/2021/01/1-AC_Website-Featured-1-e1720493055549.png",hero:"https://www.1-host.sg/wp-content/uploads/2021/01/1-AC_Website-Featured-1-e1720493055549.png",gallery:[],bestFor:["Beachfront sunset solemnisation","Coastal cocktail reception","Island getaway wedding"],web:"https://www.1-host.sg/venues/wedding-1-altitude-coast/"},
{id:"1-arden",name:"1-Arden",tagline:"Sky Garden · Level 51",managed:"1-Host",location:"Level 51, CapitaSpring, 88 Market St, S048948",area:"Raffles Place",description:"Tie the knot overlooking sweeping sunset views from the world's highest food forest at Level 51 of CapitaSpring. Helmed by Executive Chef John-Paul Fiechtner with Coastal Australian cuisine — wild-caught, sustainably raised produce in farm-to-table dishes.",capacity:{s:230,st:350},setting:"Indoor & Outdoor",cuisine:["Coastal Australian","Farm-to-Table"],price:{min:1400,max:1850,unit:"guest"},budget:{l:"$140–$165++",d:"$160–$185++"},cat:"rooftop",catLabel:"Rooftop · Sky Garden",featured:true,solemn:true,rating:4.8,img:"https://www.1-host.sg/wp-content/uploads/2022/01/Arden_Website-Featured.png",hero:"https://www.1-host.sg/wp-content/uploads/2022/01/Arden-Hero-Image.png",gallery:["https://www.1-host.sg/wp-content/uploads/2022/01/1.jpg","https://www.1-host.sg/wp-content/uploads/2022/01/2.jpg","https://www.1-host.sg/wp-content/uploads/2022/01/1-Arden-Wedding-Outdoor.jpg","https://www.1-host.sg/wp-content/uploads/2022/01/1-Arden-Wedding-Night.jpg"],bestFor:["Sunset sky garden solemnisation","Grand reception up to 230 guests","Farm-to-table Australian cuisine"],web:"https://www.1-host.sg/venues/wedding-1-arden/"},
{id:"1-atico",name:"1-Atico",tagline:"Orchard Skyline",managed:"1-Host",location:"ION Orchard, S238801",area:"Orchard",description:"Perched atop ION Orchard. Panoramic skyline views with modern sophistication. City lights become your wedding décor. Couples praise the breathtaking view and seamless coordination.",capacity:{s:120,st:200},setting:"Indoor & Outdoor",cuisine:["International","Modern European"],price:{min:1400,max:1850,unit:"guest"},budget:{l:"$140–$165++",d:"$160–$185++"},cat:"rooftop",catLabel:"Rooftop · Sky Dining",featured:true,solemn:true,rating:4.8,img:"https://www.1-host.sg/wp-content/uploads/2021/01/Atico_Website-Featured-1.png",hero:"https://www.1-host.sg/wp-content/uploads/2021/01/Atico_Website-Featured-1.png",gallery:[],bestFor:["Glamorous Orchard celebration","Panoramic skyline solemnisation","Modern sophisticated reception"],web:"https://www.1-host.sg/venues/wedding-1-atico/"},
{id:"1-flowerhill",name:"1-Flowerhill",tagline:"Heritage on Sentosa",managed:"1-Host",location:"6 Imbiah Rd, Sentosa, S099696",area:"Sentosa",description:"Century-old heritage building at Sentosa Sensoryscape. Charming colonial arches, green-and-white balustrades, spiral staircases under lush tropical foliage. Heritage meets garden paradise.",capacity:{s:90,st:150},setting:"Indoor & Outdoor",cuisine:["Modern European"],price:{min:1400,max:1850,unit:"guest"},budget:{l:"$140–$165++",d:"$160–$185++"},cat:"heritage",catLabel:"Heritage · Garden",featured:true,solemn:true,rating:4.7,img:"https://www.1-host.sg/wp-content/uploads/2024/01/Untitled-design-1.jpg",hero:"https://www.1-host.sg/wp-content/uploads/2024/01/Untitled-design-1.jpg",gallery:[],bestFor:["Intimate heritage garden ceremony","Colonial-charm solemnisation","Sentosa island escape"],web:"https://www.1-host.sg/venues/1-flowerhill/"},
{id:"andaz",name:"Andaz Singapore",tagline:"Kampong Glam Creative",location:"5 Fraser St, S189354",area:"Bugis",description:"Where 'personal style' meets celebration. Flexible packages, sustainable practices, and tailored menus inspired by the creative energy of Kampong Glam neighbourhood.",capacity:{s:300,st:400},setting:"Indoor & Outdoor",cuisine:["International","Asian","Western"],price:{min:1688,max:2188,unit:"table"},budget:{l:"$1,688++",d:"$1,888–$2,188++"},cat:"hotel",catLabel:"Lifestyle Hotel",featured:false,solemn:true,rating:4.7,img:"https://assets.hyatt.com/content/dam/hyatt/hyattdam/images/2018/08/21/1023/Andaz-Singapore-P085-Ballroom-Wedding.jpg/Andaz-Singapore-P085-Ballroom-Wedding.16x9.jpg",hero:"https://assets.hyatt.com/content/dam/hyatt/hyattdam/images/2018/08/21/1023/Andaz-Singapore-P085-Ballroom-Wedding.jpg/Andaz-Singapore-P085-Ballroom-Wedding.16x9.jpg",gallery:[],bestFor:["Creative contemporary wedding","Sustainable celebration","Kampong Glam charm"],web:"https://www.hyatt.com/andaz/en-US/sinaz-andaz-singapore"},
{id:"capella",name:"Capella Singapore",tagline:"Sentosa Resort by Foster + Partners",location:"1 The Knolls, Sentosa, S098297",area:"Sentosa",description:"Designed by Sir Norman Foster amid 30 acres of rainforest. Colonial grandeur meets contemporary luxury. Private estate celebrations with verdant lawns and cascading water features.",capacity:{s:280,st:400},setting:"Indoor & Outdoor",cuisine:["International","Chinese","Modern European"],price:{min:2500,max:3500,unit:"table"},budget:{l:"$2,500++",d:"$3,000–$3,500++"},cat:"hotel",catLabel:"Luxury Resort",featured:false,solemn:true,rating:4.9,img:"https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200&q=80",hero:"https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200&q=80",gallery:[],bestFor:["Ultra-private island estate wedding","Tropical garden celebration","World-class resort experience"],web:"https://www.capellahotels.com/en/capella-singapore"},
{id:"chijmes",name:"CHIJMES Hall",tagline:"Gothic Chapel Grandeur",location:"30 Victoria St, S187996",area:"City Hall",description:"Gothic chapel converted into Singapore's most photogenic event venue. Soaring vaulted ceilings, stained glass windows, and dramatic architecture impossible to replicate elsewhere.",capacity:{s:300,st:400},setting:"Indoor & Outdoor",cuisine:["International","Western"],price:{min:1588,max:2088,unit:"table"},budget:{l:"$1,588++",d:"$1,888–$2,088++"},cat:"heritage",catLabel:"Heritage · Chapel",featured:false,solemn:true,rating:4.6,img:"https://images.unsplash.com/photo-1464808322410-1a934aab61e5?w=1200&q=80",hero:"https://images.unsplash.com/photo-1464808322410-1a934aab61e5?w=1200&q=80",gallery:[],bestFor:["Gothic chapel ceremony","Stained glass photography","Heritage courtyard reception"],web:"https://www.chijmes.com.sg/"},
{id:"four-seasons",name:"Four Seasons Hotel Singapore",tagline:"Orchard Boulevard Elegance",location:"190 Orchard Blvd, S248646",area:"Orchard",description:"Floor-to-ceiling windows, custom glass chandeliers, and some of the city's finest cuisine paired with legendary Four Seasons service in an Orchard Boulevard setting.",capacity:{s:350,st:450},setting:"Indoor & Outdoor",cuisine:["International","Chinese","Western"],price:{min:2288,max:3088,unit:"table"},budget:{l:"$2,288++",d:"$2,688–$3,088++"},cat:"hotel",catLabel:"Luxury Hotel",featured:false,solemn:true,rating:4.8,img:"https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1200&q=80",hero:"https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1200&q=80",gallery:[],bestFor:["Intimate luxury celebration","World-class culinary experience","Orchard garden solemnisation"],web:"https://www.fourseasons.com/singapore/weddings/"},
{id:"grand-hyatt",name:"Grand Hyatt Singapore",tagline:"Scotts Road Grand",location:"10 Scotts Rd, S228211",area:"Orchard",description:"Striking versatility on Scotts Road — grand pillarless ballroom for 600 guests, private bar for after-parties. Polished Orchard Road glamour for every wedding.",capacity:{s:600,st:800},setting:"Indoor & Outdoor",cuisine:["International","Chinese","Western"],price:{min:1688,max:2288,unit:"table"},budget:{l:"$1,688++",d:"$1,988–$2,288++"},cat:"hotel",catLabel:"Luxury Hotel",featured:false,solemn:true,rating:4.6,img:"https://assets.hyatt.com/content/dam/hyatt/hyattdam/images/2019/09/24/1341/Grand-Hyatt-Singapore-P320-Grand-Ballroom-Wedding.jpg/Grand-Hyatt-Singapore-P320-Grand-Ballroom-Wedding.16x9.jpg",hero:"https://assets.hyatt.com/content/dam/hyatt/hyattdam/images/2019/09/24/1341/Grand-Hyatt-Singapore-P320-Grand-Ballroom-Wedding.jpg/Grand-Hyatt-Singapore-P320-Grand-Ballroom-Wedding.16x9.jpg",gallery:[],bestFor:["Large-scale grand ballroom","Orchard Road luxury","After-party private bar"],web:"https://www.hyatt.com/grand-hyatt/en-US/sinrs-grand-hyatt-singapore/"},
{id:"hilton-orchard",name:"Hilton Singapore Orchard",tagline:"Orchard Road Modern Grand",location:"333 Orchard Rd, S238867",area:"Orchard",description:"Singapore's largest Hilton — Grand Ballroom for 800 guests, Imperial Ballroom for amphitheatre-style celebrations, The Manor botanical enclave for intimate garden weddings.",capacity:{s:800,st:1000},setting:"Indoor & Outdoor",cuisine:["International","Chinese","Western"],price:{min:1588,max:2188,unit:"table"},budget:{l:"$1,588++",d:"$1,888–$2,188++"},cat:"hotel",catLabel:"Modern Hotel · Grand",featured:false,solemn:true,rating:4.6,img:"https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1200&q=80",hero:"https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1200&q=80",gallery:[],bestFor:["Large-scale wedding (800 guests)","The Manor botanical garden","Orchard Road convenience"],web:"https://www.hilton.com/en/hotels/sinorhi-hilton-singapore-orchard/"},
{id:"intercontinental",name:"InterContinental Singapore",tagline:"Peranakan Heritage Luxury",location:"80 Middle Rd, S188966",area:"Bugis",description:"Peranakan-inspired luxury blending rich cultural heritage with modern elegance. Restored Bugis Junction shophouse setting for a uniquely Singaporean wedding backdrop.",capacity:{s:350,st:450},setting:"Indoor",cuisine:["International","Chinese","Peranakan"],price:{min:1788,max:2388,unit:"table"},budget:{l:"$1,788++",d:"$2,088–$2,388++"},cat:"hotel",catLabel:"Heritage Hotel",featured:false,solemn:true,rating:4.7,img:"https://images.unsplash.com/photo-1455587734955-081b22074882?w=1200&q=80",hero:"https://images.unsplash.com/photo-1455587734955-081b22074882?w=1200&q=80",gallery:[],bestFor:["Peranakan-themed wedding","Heritage shophouse celebration","Cultural-meets-luxury"],web:"https://singapore.intercontinental.com/weddings"},
{id:"jen-tanglin",name:"JEN Singapore Tanglin",tagline:"Botanic Gardens Neighbour",location:"1A Cuscaden Rd, S249716",area:"Tanglin",description:"Vibrant design-forward hotel steps from the UNESCO Botanic Gardens. Playful contemporary spaces at accessible price points — personality without the five-star price tag.",capacity:{s:350,st:450},setting:"Indoor & Outdoor",cuisine:["International","Chinese","Western"],price:{min:1288,max:1688,unit:"table"},budget:{l:"$1,288++",d:"$1,488–$1,688++"},cat:"hotel",catLabel:"Lifestyle Hotel · Value",featured:false,solemn:true,rating:4.5,img:"https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=80",hero:"https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=80",gallery:[],bestFor:["Affordable luxury wedding","Botanic Gardens proximity","Contemporary design-forward"],web:"https://www.shangri-la.com/singapore/jen-tanglin/weddings/"},
{id:"jw-marriott",name:"JW Marriott South Beach",tagline:"Forest of Lights",location:"30 Beach Rd, S189763",area:"City Hall",description:"The Grand Ballroom's iconic 11,520-light Forest of Lights LED wall creates a breathtaking backdrop. Heritage building housing contemporary luxury with Instagram-famous illuminated experiences.",capacity:{s:400,st:500},setting:"Indoor & Outdoor",cuisine:["International","Chinese","Western"],price:{min:1888,max:2488,unit:"table"},budget:{l:"$1,888++",d:"$2,188–$2,488++"},cat:"hotel",catLabel:"Modern Hotel · Iconic",featured:false,solemn:true,rating:4.7,img:"https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200&q=80",hero:"https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200&q=80",gallery:[],bestFor:["Forest of Lights LED backdrop","Modern grand ballroom","Heritage meets contemporary"],web:"https://www.marriott.com/en-us/hotels/sinjw-jw-marriott-hotel-singapore-south-beach/"},
{id:"mandarin-oriental",name:"Mandarin Oriental, Singapore",tagline:"Marina Bay Waterfront Luxury",location:"5 Raffles Ave, S039797",area:"Marina Bay",description:"Marina Bay waterfront combining Asian warmth with international sophistication. The Oriental Ballroom for grand celebrations; Cherry Garden for exquisite Chinese banquets.",capacity:{s:400,st:500},setting:"Indoor",cuisine:["International","Chinese","Western"],price:{min:1988,max:2688,unit:"table"},budget:{l:"$1,988++",d:"$2,388–$2,688++"},cat:"hotel",catLabel:"Luxury Hotel · Waterfront",featured:false,solemn:true,rating:4.7,img:"https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&q=80",hero:"https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&q=80",gallery:[],bestFor:["Marina Bay waterfront banquet","Chinese Cherry Garden dinner","Asian-luxury wedding"],web:"https://www.mandarinoriental.com/en/singapore/marina-bay/meetings-and-events/weddings"},
{id:"mbs",name:"Marina Bay Sands",tagline:"Asia's Grandest Stage",location:"10 Bayfront Ave, S018956",area:"Marina Bay",description:"The architectural marvel defining Singapore's skyline. Sands Grand Ballroom hosts up to 2,500 guests — Asia's largest. SkyPark ceremonies 200m above the bay. Unmistakably spectacular.",capacity:{s:2500,st:3000},setting:"Indoor",cuisine:["International","Chinese","Western","Halal"],price:{min:1688,max:2688,unit:"table"},budget:{l:"$1,688++",d:"$2,088–$2,688++"},cat:"hotel",catLabel:"Luxury Hotel · Iconic",featured:true,solemn:true,rating:4.7,img:"https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=1200&q=80",hero:"https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=1200&q=80",gallery:[],bestFor:["Grand-scale banquet (500+ guests)","SkyPark rooftop ceremony","Iconic landmark celebration"],web:"https://www.marinabaysands.com/weddings.html"},
{id:"monti",name:"Monti",tagline:"Marina Bay Waterfront",managed:"1-Host",location:"Fullerton Pavilion, 82 Collyer Quay, S049327",area:"Marina Bay",description:"Chic, luxe, and intimate with breathtaking Marina Bay views. Solemnisations on the iconic spherical dome are a dream for couples seeking a swanky city soirée. Award-winning Italian cuisine. Glamorous, stylish, and unforgettable.",capacity:{s:180,st:420},setting:"Indoor & Outdoor",cuisine:["Italian","Mediterranean"],price:{min:1400,max:1850,unit:"guest"},budget:{l:"$140–$165++",d:"$160–$185++"},cat:"waterfront",catLabel:"Waterfront · Iconic",featured:true,solemn:true,rating:4.9,img:"https://www.1-host.sg/wp-content/uploads/2021/01/this-Host-featured-image-wordpress-794-x-1150-px-4-x-5-in-467-x-632-px-1.jpg",hero:"https://www.1-host.sg/wp-content/uploads/2021/01/1-host-Wordpress-header-5.jpg",gallery:["https://www.1-host.sg/wp-content/uploads/2021/01/Wordpress-images-2560-x-1709-px-22.jpg","https://www.1-host.sg/wp-content/uploads/2021/01/Monti_7.jpg","https://www.1-host.sg/wp-content/uploads/2021/01/MONTI-2-2.jpg"],bestFor:["Iconic Marina Bay solemnisation","Italian waterfront dinner","Glamorous city soirée"],web:"https://www.1-host.sg/venues/wedding-monti/"},
{id:"national-gallery",name:"National Gallery Singapore",tagline:"Where Art Meets History",location:"1 St Andrew's Rd, S178957",area:"City Hall",description:"Exchange vows in the historic City Hall Chamber — where Singapore's independence was proclaimed. Southeast Asia's largest public collection of modern art as your backdrop.",capacity:{s:500,st:700},setting:"Indoor",cuisine:["International","Modern European"],price:{min:1688,max:2488,unit:"table"},budget:{l:"$1,688++",d:"$2,088–$2,488++"},cat:"heritage",catLabel:"Heritage · Cultural",featured:false,solemn:true,rating:4.7,img:"https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=1200&q=80",hero:"https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=1200&q=80",gallery:[],bestFor:["Historic City Hall ceremony","Art gallery backdrop","Cultural landmark wedding"],web:"https://www.nationalgallery.sg/venue-hire"},
{id:"raffles-hotel",name:"Raffles Hotel Singapore",tagline:"Timeless Elegance Since 1887",location:"1 Beach Rd, S189673",area:"City Hall",description:"Singapore's most storied luxury hotel. From intimate garden solemnisations beneath tropical palms to grand banquets in the ornate Raffles Ballroom with 7-metre ceilings. Over 130 years of heritage elegance.",capacity:{s:500,st:600},setting:"Indoor & Outdoor",cuisine:["International","Western","Chinese"],price:{min:2200,max:3200,unit:"table"},budget:{l:"$2,200++",d:"$2,800–$3,200++"},cat:"hotel",catLabel:"Luxury Hotel",featured:true,solemn:true,rating:4.9,img:"https://m.ahstatic.com/is/image/accorhotels/aja_p_5553-55?wid=1920",hero:"https://m.ahstatic.com/is/image/accorhotels/aja_p_5553-55?wid=1920",gallery:[],bestFor:["Grand heritage ballroom wedding","Tropical courtyard solemnisation","Iconic Singapore celebration"],web:"https://www.raffles.com/singapore/weddings/"},
{id:"shangri-la",name:"Shangri-La Singapore",tagline:"15 Acres of Gardens",location:"22 Orange Grove Rd, S258350",area:"Orchard",description:"15 acres of lush tropical gardens. The legendary Island Ballroom fits 800 guests. Garden terraces and waterfall settings offer serene alternatives for intimate celebrations.",capacity:{s:800,st:1000},setting:"Indoor & Outdoor",cuisine:["International","Chinese","Western"],price:{min:1888,max:2588,unit:"table"},budget:{l:"$1,888++",d:"$2,188–$2,588++"},cat:"hotel",catLabel:"Luxury Hotel · Garden",featured:false,solemn:true,rating:4.8,img:"https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1200&q=80",hero:"https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1200&q=80",gallery:[],bestFor:["Grand ballroom wedding (800 guests)","Tropical garden solemnisation","Waterfall terrace ceremony"],web:"https://www.shangri-la.com/singapore/shangrila/weddings/"},
{id:"marriott-tang",name:"Singapore Marriott Tang Plaza",tagline:"Orchard Road Icon",location:"320 Orchard Rd, S238865",area:"Orchard",description:"Orchard Road icon with Certified Wedding Planners and award-winning Wan Hao Chinese Restaurant. Grand Ballroom for up to 550 guests. Packages from $1,738++ per table.",capacity:{s:550,st:700},setting:"Indoor",cuisine:["Chinese","International"],price:{min:1738,max:2388,unit:"table"},budget:{l:"$1,738++",d:"$2,038–$2,388++"},cat:"hotel",catLabel:"Luxury Hotel",featured:false,solemn:true,rating:4.6,img:"https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=1200&q=80",hero:"https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=1200&q=80",gallery:[],bestFor:["Chinese banquet specialist","Award-winning Wan Hao cuisine","Orchard Road prestige"],web:"https://www.marriott.com/en-us/hotels/sindt-singapore-marriott-tang-plaza-hotel/"},
{id:"alkaff-mansion",name:"The Alkaff Mansion",tagline:"Heritage Hilltop Estate",managed:"1-Host",location:"10 Telok Blangah Green, S109178",area:"Telok Blangah",description:"Lovingly restored hilltop mansion surrounded by lush tropical gardens. Heritage romance — covered verandahs, ivy-draped walls, worlds away from the city yet minutes from it.",capacity:{s:200,st:300},setting:"Indoor & Outdoor",cuisine:["Mediterranean","International"],price:{min:1400,max:1850,unit:"guest"},budget:{l:"$140–$165++",d:"$160–$185++"},cat:"heritage",catLabel:"Heritage · Garden",featured:false,solemn:true,rating:4.7,img:"https://www.1-host.sg/wp-content/uploads/2021/01/tam.jpg",hero:"https://www.1-host.sg/wp-content/uploads/2021/01/tam.jpg",gallery:[],bestFor:["Heritage garden wedding","Romantic verandah solemnisation","Rustic-elegant reception"],web:"https://www.1-host.sg/venues/wedding-the-alkaff-mansion/"},
{id:"fullerton-hotel",name:"The Fullerton Hotel Singapore",tagline:"Neoclassical Marina Bay",location:"1 Fullerton Square, S049178",area:"Marina Bay",description:"Magnificent neoclassical landmark overlooking Marina Bay. The Straits Room offers pillarless grandeur; the rooftop pool deck provides sunset solemnisations with the city skyline as witness.",capacity:{s:400,st:500},setting:"Indoor & Outdoor",cuisine:["International","Western","Chinese"],price:{min:1988,max:2888,unit:"table"},budget:{l:"$1,988++",d:"$2,388–$2,888++"},cat:"hotel",catLabel:"Luxury Hotel · Heritage",featured:true,solemn:true,rating:4.8,img:"https://image-tc.galaxy.tf/wijpeg-9brotku75lkjyoarluej1n954/weddings_og-image.jpg",hero:"https://image-tc.galaxy.tf/wijpeg-9brotku75lkjyoarluej1n954/weddings_og-image.jpg",gallery:[],bestFor:["Heritage waterfront ballroom","Rooftop pool ceremony","Art Deco photography backdrop"],web:"https://www.fullertonhotels.com/fullerton-hotel-singapore/weddings"},
{id:"the-garage",name:"The Garage",tagline:"Botanic Gardens Heritage",managed:"1-Host",location:"50 Cluny Park Rd, S257488",area:"Botanic Gardens",description:"Within Singapore's UNESCO World Heritage Botanic Gardens. 1920s Art Deco conservation building — forest-wedding-under-the-stars atmosphere with modern indoor comforts.",capacity:{s:90,st:150},setting:"Indoor & Outdoor",cuisine:["Modern European"],price:{min:1400,max:1850,unit:"guest"},budget:{l:"$140–$165++",d:"$160–$185++"},cat:"garden",catLabel:"Garden · Heritage",featured:false,solemn:true,rating:4.6,img:"https://www.1-host.sg/wp-content/uploads/2021/01/this-Host-featured-image-wordpress-794-x-1150-px-4-x-5-in-467-x-632-px-2-1.jpg",hero:"https://www.1-host.sg/wp-content/uploads/2021/01/this-Host-featured-image-wordpress-794-x-1150-px-4-x-5-in-467-x-632-px-2-1.jpg",gallery:[],bestFor:["UNESCO heritage garden wedding","Art Deco setting","Forest-under-the-stars reception"],web:"https://www.1-host.sg/venues/wedding-at-the-garage/"},
{id:"ritz-carlton",name:"The Ritz-Carlton, Millenia",tagline:"Marina Bay Art & Views",location:"7 Raffles Ave, S039799",area:"Marina Centre",description:"Contemporary art meets Marina Bay grandeur. Dedicated wedding floor with panoramic bay views. An acclaimed art collection provides stunning photo backdrops with impeccable service.",capacity:{s:480,st:600},setting:"Indoor",cuisine:["International","Western","Chinese"],price:{min:2088,max:2888,unit:"table"},budget:{l:"$2,088++",d:"$2,488–$2,888++"},cat:"hotel",catLabel:"Luxury Hotel",featured:false,solemn:true,rating:4.8,img:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80",hero:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80",gallery:[],bestFor:["Marina Bay views wedding","Art collection photo backdrop","Premium hotel experience"],web:"https://www.ritzcarlton.com/en/hotels/sinrz-the-ritz-carlton-millenia-singapore/weddings/"},
{id:"the-riverhouse",name:"The Riverhouse",tagline:"Clarke Quay Waterfront",managed:"1-Host",location:"3A River Valley Rd, S179020",area:"Clarke Quay",description:"Modern-meets-traditional aesthetics along the Singapore River. Intimate yet never compromising on style, location, or cosiness.",capacity:{s:100,st:200},setting:"Indoor & Outdoor",cuisine:["Chinese","International"],price:{min:1400,max:1850,unit:"guest"},budget:{l:"$140–$165++",d:"$160–$185++"},cat:"waterfront",catLabel:"Waterfront · Heritage",featured:false,solemn:true,rating:4.7,img:"https://www.1-host.sg/wp-content/uploads/2021/01/Riverhouse_Website-Featured.png",hero:"https://www.1-host.sg/wp-content/uploads/2021/01/Riverhouse_Website-Featured.png",gallery:[],bestFor:["Intimate riverside ceremony","Chinese banquet reception","Modern-heritage celebration"],web:"https://www.1-host.sg/venues/wedding-the-riverhouse/"},
{id:"st-regis",name:"The St. Regis Singapore",tagline:"Old-World Opulence",location:"29 Tanglin Rd, S247911",area:"Tanglin",description:"White-glove sophistication through signature Butler service. The John Jacob Ballroom — first and only in Singapore with two skylights. Bespoke wedding curation treating every couple as royalty.",capacity:{s:350,st:450},setting:"Indoor",cuisine:["International","French","Chinese"],price:{min:2388,max:3188,unit:"table"},budget:{l:"$2,388++",d:"$2,788–$3,188++"},cat:"hotel",catLabel:"Luxury Hotel",featured:false,solemn:true,rating:4.8,img:"https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200&q=80",hero:"https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200&q=80",gallery:[],bestFor:["Ultra-luxury bespoke wedding","Butler-serviced celebration","Old-world elegance"],web:"https://www.marriott.com/hotels/event-planning/wedding-planning/sinxr-the-st-regis-singapore/"},
{id:"the-summerhouse",name:"The Summerhouse",tagline:"Garden Estate",managed:"1-Host",location:"3 Park Lane, S798387",area:"Seletar",description:"European-style estate surrounded by greenery and edible gardens. Fairy lights, elegant terraces, and a magical gazebo for romantic ceremonies.",capacity:{s:100,st:180},setting:"Outdoor",cuisine:["Modern European","Farm-to-Table"],price:{min:1400,max:1850,unit:"guest"},budget:{l:"$140–$165++",d:"$160–$185++"},cat:"garden",catLabel:"Garden · Estate",featured:false,solemn:true,rating:4.6,img:"https://www.1-host.sg/wp-content/uploads/2021/01/Host-featured-image-wordpress-794-x-1150-px-5-e1720491106172.jpg",hero:"https://www.1-host.sg/wp-content/uploads/2021/01/Host-featured-image-wordpress-794-x-1150-px-5-e1720491106172.jpg",gallery:[],bestFor:["Garden gazebo ceremony","Farm-to-table dinner","Nature-wrapped celebration"],web:"https://www.1-host.sg/venues/wedding-the-summerhouse/"}
];

const CATS=[{id:"all",label:"All Venues",icon:Sparkles},{id:"hotel",label:"Hotels",icon:Building2},{id:"rooftop",label:"Rooftop",icon:Sunset},{id:"heritage",label:"Heritage",icon:Landmark},{id:"garden",label:"Garden",icon:TreePine},{id:"waterfront",label:"Waterfront",icon:Waves},{id:"beachfront",label:"Beachfront",icon:Waves}];

const REVIEWS=[
  {text:"10/10 best decision ever for both me & my wife to host our wedding at Monti! Kudos to the team for going the extra mile.",who:"Nicholas Low",where:"Monti",s:5},
  {text:"We held our wedding at 1-Atico, and it was nothing short of magical. The panoramic skyline view and seamless setup made it the perfect place to say 'I do.'",who:"Jeremiah Aw",where:"1-Atico",s:5},
  {text:"Had our wedding at Alkaff Mansion and it was amazing! Our coordinator Joan was responsive and very helpful.",who:"Wei Chen Beh",where:"The Alkaff Mansion",s:5},
  {text:"The Riverhouse was the first and only venue we viewed and we were locked in! Absolutely gorgeous.",who:"Leona Leong",where:"The Riverhouse",s:5},
  {text:"Raffles Hotel exceeded every expectation. The Palm Court ceremony under tropical palms was magical beyond words.",who:"Amanda Tan",where:"Raffles Hotel",s:5},
  {text:"The Fullerton's Straits Room took our breath away. Our guests still talk about the food months later.",who:"Jonathan Lim",where:"The Fullerton Hotel",s:5}
];

const WEDDINGS=[
  {couple:"Rachel & Edwin",venue:"Monti",guests:120,type:"Waterfront Italian dinner",quote:"The Marina Bay sunset during our solemnisation was the most magical moment of our lives.",photo:"@pixioo",vid:"monti",coupleImg:"https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80"},
  {couple:"Priya & Arjun",venue:"1-Arden",guests:80,type:"Sunset sky garden",quote:"Being surrounded by the food forest 51 floors above felt like a dream.",photo:"@fellowfolks",vid:"1-arden",coupleImg:"https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80"},
  {couple:"Wei Ling & Jun Hao",venue:"The Alkaff Mansion",guests:150,type:"Heritage garden lunch",quote:"The heritage mansion made our tea ceremony feel so connected to tradition.",photo:"@iluminen",vid:"alkaff-mansion",coupleImg:"https://images.unsplash.com/photo-1606216794079-73f85bbd57d5?w=800&q=80"},
  {couple:"Sarah & David",venue:"1-Alfaro",guests:100,type:"Rooftop lighthouse dinner",quote:"Our guests couldn't stop talking about the panoramic views and incredible Italian food.",photo:"@d.t._pictures",vid:"1-alfaro",coupleImg:"https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800&q=80"},
  {couple:"Michelle & James",venue:"Raffles Hotel",guests:300,type:"Grand ballroom banquet",quote:"Walking through those historic corridors on our wedding day was unforgettable.",photo:"@blinkcinematic",vid:"raffles-hotel",coupleImg:"https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=80"},
  {couple:"Mei Lin & Kai",venue:"Capella Singapore",guests:150,type:"Sentosa garden estate",quote:"Capella gave us a private resort wedding without leaving Singapore.",photo:"@studio1702",vid:"capella",coupleImg:"https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80"},
  {couple:"Nurul & Faris",venue:"1-Atico",guests:60,type:"Orchard skyline ROM",quote:"Intimate solemnisation above Orchard Road — chic and unforgettable.",photo:"@wemerryground",vid:"1-atico",coupleImg:"https://images.unsplash.com/photo-1529636798458-92182e662485?w=800&q=80"},
  {couple:"Joanne & Marcus",venue:"The Summerhouse",guests:70,type:"Garden estate brunch",quote:"Fairy lights and farm-to-table felt like a European countryside wedding.",photo:"@ikicompany",vid:"the-summerhouse",coupleImg:"https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&q=80"}
];

const HERO_SLIDES=[
  {vid:"1-alfaro",h:"Where Love Meets\nthe Skyline",sub:"Singapore's newest rooftop venue — 1-Alfaro at Labrador Tower"},
  {vid:"1-arden",h:"Say 'I Do' Among\nthe Clouds",sub:"Exchange vows 51 floors above the city at 1-Arden, CapitaSpring"},
  {vid:"monti",h:"Romance on\nthe Waterfront",sub:"Iconic Marina Bay celebrations at Monti, Fullerton Pavilion"},
  {vid:"raffles-hotel",h:"Timeless Elegance\nSince 1887",sub:"Grand heritage celebrations at Raffles Hotel Singapore"}
];

// ── HOOKS ────────────────────────────────────────────────────────────────
const useSR=(o={})=>{const r=useRef(null);const[v,sV]=useState(false);useEffect(()=>{const el=r.current;if(!el)return;const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting){sV(true);obs.unobserve(e.target)}},{threshold:o.t||.1,rootMargin:"0px 0px -30px 0px"});obs.observe(el);return()=>obs.disconnect()},[]);return[r,v]};
const useCtr=(target,dur=2e3)=>{const[c,sC]=useState(0);const[r,v]=useSR();useEffect(()=>{if(!v)return;let s=0;const step=target/(dur/16);const t=setInterval(()=>{s+=step;if(s>=target){sC(target);clearInterval(t)}else sC(Math.floor(s))},16);return()=>clearInterval(t)},[v,target]);return[r,c]};

// ── CLAUDE API ───────────────────────────────────────────────────────────
const callAI=async(sys,msg)=>{const r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,system:sys,messages:[{role:"user",content:msg}]})});if(!r.ok)throw new Error(`API ${r.status}`);const d=await r.json();return d.content?.[0]?.text||""};
const pJ=t=>{try{return JSON.parse(t.replace(/```json\n?/g,"").replace(/```\n?/g,"").trim())}catch{return{raw:t}}};
const VK=VENUES.map(v=>`${v.name}${v.managed?" [1-Host]":""}: ${v.catLabel}, ${v.area}, ${v.capacity.s} seated/${v.capacity.st} standing, ${v.price.unit==="guest"?v.budget.l+" lunch":v.budget.l+" per table"}, cuisine: ${v.cuisine.join(",")}, ${v.setting}. ${v.description}`).join("\n\n");

// ── IMG ──────────────────────────────────────────────────────────────────
const VI=({src,alt,className="",style={}})=>{const[e,sE]=useState(!src);const cols={rooftop:["#1A1A2E","#2D1B69"],hotel:["#1a2332","#2c3e50"],heritage:["#3E2723","#5D4037"],garden:["#1B3A2D","#2D5A45"],waterfront:["#0c2d3f","#1A535C"],beachfront:["#0a3d5c","#0E7490"]};const name=alt?.split("—")[0]?.trim()||"";const k=alt?.includes("Rooftop")?"rooftop":alt?.includes("Hotel")||alt?.includes("Resort")?"hotel":alt?.includes("Heritage")||alt?.includes("Chapel")||alt?.includes("Cultural")?"heritage":alt?.includes("Garden")?"garden":alt?.includes("Waterfront")?"waterfront":"hotel";const c=cols[k]||cols.hotel;if(e||!src)return<div className={className} style={{...style,background:`linear-gradient(145deg,${c[0]},${c[1]})`,display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:8,position:"relative",overflow:"hidden"}}><div style={{position:"absolute",inset:0,background:"radial-gradient(circle at 30% 40%, rgba(201,169,110,.08) 0%, transparent 60%)",pointerEvents:"none"}}/><div style={{position:"absolute",bottom:"-20%",right:"-15%",width:"50%",height:"50%",borderRadius:"50%",background:"rgba(255,255,255,.03)",pointerEvents:"none"}}/><span style={{color:"rgba(255,255,255,.65)",fontFamily:"var(--fh)",fontSize:"clamp(15px,1.8vw,22px)",fontWeight:400,textAlign:"center",padding:"0 20px",position:"relative",zIndex:1,letterSpacing:".02em"}}>{name}</span><span style={{color:"rgba(201,169,110,.5)",fontSize:10,fontWeight:600,letterSpacing:".1em",textTransform:"uppercase",position:"relative",zIndex:1}}>WEDDING VENUE</span></div>;return<img src={src} alt={alt} className={className} style={{...style,objectFit:"cover"}} onError={()=>sE(true)} loading="lazy"/>};

// ═════════════════════════════════════════════════════════════════════════
// AUTH SYSTEM — Master Admin → Admins → Visitors
// ═════════════════════════════════════════════════════════════════════════
const MASTER_ADMIN = { email: "chris.millar@1-group.sg", password: "1Group 2026!", role: "master" };
const DOMAIN = "@1-group.sg";

const getUsers = () => {
  try { return JSON.parse(localStorage.getItem("swv_users") || "[]"); } catch { return []; }
};
const saveUsers = (users) => localStorage.setItem("swv_users", JSON.stringify(users));
const getSession = () => {
  try { return JSON.parse(sessionStorage.getItem("swv_session") || "null"); } catch { return null; }
};
const saveSession = (s) => s ? sessionStorage.setItem("swv_session", JSON.stringify(s)) : sessionStorage.removeItem("swv_session");

// ── SIGN IN PAGE ─────────────────────────────────────────────────────────
function SignInPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);

    setTimeout(() => {
      const cleanEmail = email.trim().toLowerCase();
      if (!cleanEmail.endsWith(DOMAIN)) {
        setErr(`Only ${DOMAIN} email addresses are allowed`);
        setLoading(false);
        return;
      }
      // Check master admin
      if (cleanEmail === MASTER_ADMIN.email && pass === MASTER_ADMIN.password) {
        const session = { email: cleanEmail, role: "master", name: "Master Admin" };
        saveSession(session);
        onLogin(session);
        setLoading(false);
        return;
      }
      // Check registered users
      const users = getUsers();
      const user = users.find(u => u.email === cleanEmail);
      if (!user) { setErr("Account not found. Contact your administrator."); setLoading(false); return; }
      if (user.password !== pass) { setErr("Incorrect password."); setLoading(false); return; }
      if (!user.active) { setErr("Account has been deactivated. Contact your administrator."); setLoading(false); return; }
      const session = { email: cleanEmail, role: user.role, name: user.name };
      saveSession(session);
      onLogin(session);
      setLoading(false);
    }, 600);
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--cr)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, fontFamily: "var(--fb)" }}>
      {/* Decorative background */}
      <div style={{ position: "fixed", top: "-20%", right: "-15%", width: "60vw", height: "60vw", background: "radial-gradient(circle, rgba(201,169,110,.06) 0%, transparent 70%)", animation: "morphBlob 25s ease-in-out infinite", pointerEvents: "none" }} />
      <div style={{ position: "fixed", bottom: "-20%", left: "-15%", width: "50vw", height: "50vw", background: "radial-gradient(circle, rgba(212,165,165,.05) 0%, transparent 70%)", animation: "morphBlob 20s ease-in-out 5s infinite", pointerEvents: "none" }} />

      <div style={{ width: "100%", maxWidth: 420, position: "relative", zIndex: 1 }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 40, animation: "heroTextIn .8s ease forwards" }}>
          <Heart size={36} style={{ color: "var(--ro)", marginBottom: 16 }} fill="var(--ro)" />
          <h1 style={{ fontFamily: "var(--fh)", fontSize: 28, fontWeight: 400, color: "var(--c)", marginBottom: 6 }}>Singapore Wedding Venues</h1>
          <p style={{ fontSize: 13, color: "var(--g)", letterSpacing: ".02em" }}>Admin & Team Portal</p>
        </div>

        {/* Sign In Card */}
        <div style={{ background: "var(--w)", borderRadius: 20, padding: "36px 32px", boxShadow: "0 20px 60px rgba(0,0,0,.08), 0 0 0 1px rgba(201,169,110,.08)", animation: "cardEnter .6s ease .2s both" }}>
          <h2 style={{ fontFamily: "var(--fh)", fontSize: 24, fontWeight: 500, marginBottom: 6 }}>Welcome back</h2>
          <p style={{ fontSize: 13, color: "var(--g)", marginBottom: 28 }}>Sign in with your 1-Group email</p>

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: 18 }}>
              <label style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--g)", marginBottom: 6, display: "block" }}>Email Address</label>
              <div style={{ position: "relative" }}>
                <Mail size={16} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--gi)" }} />
                <input
                  className="inp"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="yourname@1-group.sg"
                  required
                  style={{ paddingLeft: 42 }}
                />
              </div>
            </div>

            <div style={{ marginBottom: 24 }}>
              <label style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--g)", marginBottom: 6, display: "block" }}>Password</label>
              <div style={{ position: "relative" }}>
                <Lock size={16} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--gi)" }} />
                <input
                  className="inp"
                  type={showPass ? "text" : "password"}
                  value={pass}
                  onChange={e => setPass(e.target.value)}
                  placeholder="Enter your password"
                  required
                  style={{ paddingLeft: 42, paddingRight: 42 }}
                />
                <button type="button" onClick={() => setShowPass(!showPass)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--gi)", padding: 4 }}>
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {err && (
              <div style={{ background: "var(--rp)", border: "1px solid var(--rl)", borderRadius: 10, padding: "10px 14px", marginBottom: 18, animation: "fU .3s ease" }}>
                <p style={{ fontSize: 13, color: "var(--rd)" }}>{err}</p>
              </div>
            )}

            <button
              type="submit"
              className="bg"
              disabled={loading}
              style={{ width: "100%", justifyContent: "center", padding: "14px 24px", fontSize: 15, borderRadius: 12, opacity: loading ? 0.7 : 1 }}
            >
              {loading ? (
                <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,.3)", borderTopColor: "var(--w)", borderRadius: "50%", animation: "spin .6s linear infinite", display: "inline-block" }} />
                  Signing in…
                </span>
              ) : (
                <><Lock size={15} /> Sign In</>
              )}
            </button>
          </form>

          <div style={{ marginTop: 24, padding: "16px 0 0", borderTop: "1px solid var(--gpa)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "center" }}>
              <Shield size={14} style={{ color: "var(--go)" }} />
              <span style={{ fontSize: 12, color: "var(--g)" }}>Secured portal · {DOMAIN} accounts only</span>
            </div>
          </div>
        </div>

        <p style={{ textAlign: "center", fontSize: 11, color: "var(--g)", marginTop: 24 }}>
          Need access? Contact your administrator or the master admin.
        </p>
      </div>
    </div>
  );
}

// ── ADMIN PANEL ──────────────────────────────────────────────────────────
function AdminPanel({ session, onClose }) {
  const [users, setUsers] = useState(getUsers());
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPass, setNewPass] = useState("");
  const [newRole, setNewRole] = useState(session.role === "master" ? "admin" : "visitor");
  const [addErr, setAddErr] = useState("");
  const [addOk, setAddOk] = useState("");

  const canCreateAdmin = session.role === "master";
  const canCreateVisitor = session.role === "master" || session.role === "admin";
  const manageable = session.role === "master" ? users : users.filter(u => u.role === "visitor" && u.createdBy === session.email);

  const handleAdd = (e) => {
    e.preventDefault();
    setAddErr(""); setAddOk("");
    const cleanEmail = newEmail.trim().toLowerCase();
    if (!cleanEmail.endsWith(DOMAIN)) { setAddErr(`Email must end with ${DOMAIN}`); return; }
    if (cleanEmail === MASTER_ADMIN.email) { setAddErr("Cannot create account with master admin email"); return; }
    const existing = users.find(u => u.email === cleanEmail);
    if (existing) { setAddErr("An account with this email already exists"); return; }
    if (!newPass || newPass.length < 6) { setAddErr("Password must be at least 6 characters"); return; }
    if (session.role === "admin" && newRole === "admin") { setAddErr("Only the Master Admin can create admin accounts"); return; }

    const newUser = {
      email: cleanEmail,
      name: newName.trim() || cleanEmail.split("@")[0],
      password: newPass,
      role: newRole,
      active: true,
      createdBy: session.email,
      createdAt: new Date().toISOString()
    };
    const updated = [...users, newUser];
    setUsers(updated);
    saveUsers(updated);
    setNewName(""); setNewEmail(""); setNewPass("");
    setAddOk(`${newUser.name} (${newRole}) created successfully`);
    setShowAdd(false);
    setTimeout(() => setAddOk(""), 3000);
  };

  const toggleActive = (email) => {
    const updated = users.map(u => u.email === email ? { ...u, active: !u.active } : u);
    setUsers(updated);
    saveUsers(updated);
  };

  const removeUser = (email) => {
    if (!confirm(`Remove ${email}? This cannot be undone.`)) return;
    const updated = users.filter(u => u.email !== email);
    setUsers(updated);
    saveUsers(updated);
  };

  const roleColor = (r) => r === "admin" ? "var(--go)" : "var(--sa)";
  const roleBg = (r) => r === "admin" ? "var(--gp)" : "rgba(181,196,177,.2)";

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,.5)", backdropFilter: "blur(6px)" }} />
      <div style={{ position: "relative", background: "var(--w)", borderRadius: 20, width: "100%", maxWidth: 640, maxHeight: "85vh", overflow: "auto", boxShadow: "var(--sx)", animation: "cardEnter .4s ease" }}>
        <div style={{ padding: "24px 28px", borderBottom: "1px solid var(--gpa)", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, background: "var(--w)", zIndex: 1, borderRadius: "20px 20px 0 0" }}>
          <div>
            <h2 style={{ fontFamily: "var(--fh)", fontSize: 24, fontWeight: 500, display: "flex", alignItems: "center", gap: 8 }}>
              <Settings size={20} style={{ color: "var(--go)" }} />
              User Management
            </h2>
            <p style={{ fontSize: 12, color: "var(--g)", marginTop: 2 }}>
              Signed in as <strong>{session.name}</strong> · {session.role === "master" ? "Master Admin" : session.role === "admin" ? "Admin" : "Visitor"}
            </p>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}><X size={20} /></button>
        </div>

        <div style={{ padding: "20px 28px 28px" }}>
          {addOk && <div style={{ background: "rgba(127,183,126,.1)", border: "1px solid rgba(127,183,126,.3)", borderRadius: 10, padding: "10px 14px", marginBottom: 16, animation: "fU .3s ease" }}><p style={{ fontSize: 13, color: "#4a8c49" }}>✓ {addOk}</p></div>}

          {/* Add User */}
          {canCreateVisitor && (
            <div style={{ marginBottom: 24 }}>
              {!showAdd ? (
                <button onClick={() => setShowAdd(true)} className="bg" style={{ fontSize: 13, padding: "10px 20px" }}><UserPlus size={15} />Add {canCreateAdmin ? "Admin or Visitor" : "Visitor"}</button>
              ) : (
                <div style={{ background: "var(--gg)", borderRadius: 14, padding: 22, animation: "fU .3s ease" }}>
                  <h3 style={{ fontFamily: "var(--fh)", fontSize: 18, fontWeight: 500, marginBottom: 14, display: "flex", alignItems: "center", gap: 6 }}><UserPlus size={16} style={{ color: "var(--go)" }} />Create New Account</h3>
                  <form onSubmit={handleAdd}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
                      <div>
                        <label style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".05em", textTransform: "uppercase", color: "var(--g)", marginBottom: 4, display: "block" }}>Full Name</label>
                        <input className="inp" value={newName} onChange={e => setNewName(e.target.value)} placeholder="John Smith" required />
                      </div>
                      <div>
                        <label style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".05em", textTransform: "uppercase", color: "var(--g)", marginBottom: 4, display: "block" }}>Role</label>
                        <select className="inp" value={newRole} onChange={e => setNewRole(e.target.value)} style={{ cursor: "pointer" }}>
                          {canCreateAdmin && <option value="admin">Admin</option>}
                          <option value="visitor">Visitor</option>
                        </select>
                      </div>
                    </div>
                    <div style={{ marginBottom: 12 }}>
                      <label style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".05em", textTransform: "uppercase", color: "var(--g)", marginBottom: 4, display: "block" }}>Email Address</label>
                      <input className="inp" type="email" value={newEmail} onChange={e => setNewEmail(e.target.value)} placeholder={`name${DOMAIN}`} required />
                    </div>
                    <div style={{ marginBottom: 16 }}>
                      <label style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".05em", textTransform: "uppercase", color: "var(--g)", marginBottom: 4, display: "block" }}>Password (min 6 chars)</label>
                      <input className="inp" type="text" value={newPass} onChange={e => setNewPass(e.target.value)} placeholder="Set a password" required minLength={6} />
                    </div>
                    {addErr && <p style={{ fontSize: 13, color: "var(--rd)", marginBottom: 12, background: "var(--rp)", padding: "8px 12px", borderRadius: 8 }}>{addErr}</p>}
                    <div style={{ display: "flex", gap: 10 }}>
                      <button type="submit" className="bg" style={{ fontSize: 13, padding: "10px 20px" }}><UserPlus size={14} />Create Account</button>
                      <button type="button" onClick={() => { setShowAdd(false); setAddErr(""); }} style={{ padding: "10px 20px", borderRadius: 8, border: "1px solid var(--gpa)", background: "var(--w)", fontFamily: "var(--fb)", fontSize: 13, cursor: "pointer" }}>Cancel</button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          )}

          {/* User List */}
          <h3 style={{ fontFamily: "var(--fh)", fontSize: 18, fontWeight: 500, marginBottom: 14 }}>
            {session.role === "master" ? "All Accounts" : "Your Visitor Accounts"} ({manageable.length})
          </h3>
          {manageable.length === 0 ? (
            <p style={{ fontSize: 14, color: "var(--g)", padding: 20, textAlign: "center", background: "var(--gg)", borderRadius: 10 }}>No accounts created yet.</p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {manageable.map((u, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", background: "var(--gg)", borderRadius: 10, animation: `fU .3s ease ${i * 50}ms both` }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
                      <span style={{ fontWeight: 600, fontSize: 14 }}>{u.name}</span>
                      <span style={{ background: roleBg(u.role), color: roleColor(u.role), fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 999, textTransform: "uppercase", letterSpacing: ".04em" }}>{u.role}</span>
                      {!u.active && <span style={{ background: "var(--rp)", color: "var(--rd)", fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 999 }}>DISABLED</span>}
                    </div>
                    <p style={{ fontSize: 12, color: "var(--g)" }}>{u.email}</p>
                    <p style={{ fontSize: 11, color: "var(--gi)" }}>Created by {u.createdBy} · {new Date(u.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button onClick={() => toggleActive(u.email)} style={{ background: u.active ? "var(--rp)" : "rgba(127,183,126,.15)", border: "none", borderRadius: 8, padding: "6px 10px", cursor: "pointer", fontSize: 11, fontWeight: 600, color: u.active ? "var(--rd)" : "#4a8c49", fontFamily: "var(--fb)" }}>{u.active ? "Disable" : "Enable"}</button>
                    {session.role === "master" && <button onClick={() => removeUser(u.email)} style={{ background: "none", border: "1px solid var(--gpa)", borderRadius: 8, padding: "6px 8px", cursor: "pointer", color: "var(--g)" }}><Trash2 size={13} /></button>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════
// AUTH WRAPPER (default export)
// ═════════════════════════════════════════════════════════════════════════
export default function App() {
  const [session, setSession] = useState(() => getSession());
  const [showAdmin, setShowAdmin] = useState(false);

  if (!session) {
    return (
      <>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap');
        :root{--w:#FFF;--cr:#FFF8F0;--cw:#FDF5EC;--iv:#FFFCF7;--ro:#D4A5A5;--rl:#E8C5C5;--rp:#F5E0E0;--rd:#B88A8A;--go:#C9A96E;--gl:#E0CFA0;--gp:#F0E6CC;--gd:#A8874A;--sa:#B5C4B1;--sl:#D4DED1;--c:#2D2D2D;--cl:#4A4A4A;--g:#8A8A8A;--gi:#C5C5C5;--gpa:#E8E8E8;--gg:#F5F5F5;--fh:'Cormorant Garamond',serif;--fb:'DM Sans',sans-serif;--e:cubic-bezier(.4,0,.2,1)}
        *{box-sizing:border-box;margin:0;padding:0}
        @keyframes morphBlob{0%,100%{border-radius:60% 40% 30% 70%/60% 30% 70% 40%}50%{border-radius:50% 60% 30% 60%/30% 60% 70% 40%}}
        @keyframes heroTextIn{0%{opacity:0;transform:translateY(20px);filter:blur(6px)}100%{opacity:1;transform:translateY(0);filter:blur(0)}}
        @keyframes cardEnter{from{opacity:0;transform:translateY(40px) scale(.95)}to{opacity:1;transform:translateY(0) scale(1)}}
        @keyframes fU{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
        @keyframes spin{to{transform:rotate(360deg)}}
        .inp{border:1px solid #E8E8E8;padding:10px 16px;border-radius:8px;font-family:'DM Sans',sans-serif;font-size:14px;transition:border-color .2s,box-shadow .2s;width:100%;outline:none;background:#FFF}
        .inp:focus{border-color:#C9A96E;box-shadow:0 0 0 3px rgba(201,169,110,.15)}
        .bg{background:linear-gradient(135deg,#C9A96E,#A8874A);color:#FFF;border:none;padding:12px 28px;border-radius:8px;font-family:'DM Sans',sans-serif;font-weight:600;font-size:14px;letter-spacing:.04em;cursor:pointer;transition:all .2s;display:inline-flex;align-items:center;gap:8px}
        .bg:hover{filter:brightness(1.1);transform:translateY(-1px)}
        `}</style>
        <SignInPage onLogin={setSession} />
      </>
    );
  }

  const handleLogout = () => { saveSession(null); setSession(null); };

  return (
    <>
      <MainApp session={session} onLogout={handleLogout} onOpenAdmin={() => setShowAdmin(true)} />
      {showAdmin && <AdminPanel session={session} onClose={() => setShowAdmin(false)} />}
    </>
  );
}

// ═════════════════════════════════════════════════════════════════════════
// MAIN APP (website content)
// ═════════════════════════════════════════════════════════════════════════
function MainApp({ session, onLogout, onOpenAdmin }){
  const[pg,sPg]=useState("home");const[av,sAv]=useState(null);const[mm,sMm]=useState(false);const[mega,sMega]=useState(false);const[sy,sSy]=useState(0);const[ai,sAi]=useState(false);const[st,sSt]=useState(false);
  useEffect(()=>{const h=()=>{sSy(window.scrollY);sSt(window.scrollY>500)};window.addEventListener("scroll",h,{passive:true});return()=>window.removeEventListener("scroll",h)},[]);
  const go=(p,v=null)=>{sPg(p);sAv(v);sMm(false);sMega(false);window.scrollTo({top:0,behavior:"smooth"})};
  useEffect(()=>{document.querySelectorAll('script[data-swv]').forEach(s=>s.remove());[SEO_SCHEMA.website,SEO_SCHEMA.faq].forEach(s=>{const el=document.createElement("script");el.type="application/ld+json";el.setAttribute("data-swv","1");el.textContent=JSON.stringify(s);document.head.appendChild(el)})},[pg]);
  const NI=[{l:"Home",p:"home"},{l:"Venues",p:"venues"},{l:"AI Tools",p:"ai-tools"},{l:"Real Weddings",p:"weddings"},{l:"Showcases",p:"shows"},{l:"About",p:"about"}];

  return(<div style={{fontFamily:"var(--fb)",color:"var(--c)",background:"var(--cr)",minHeight:"100vh"}}>
    <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap');
    :root{--w:#FFF;--cr:#FFF8F0;--cw:#FDF5EC;--iv:#FFFCF7;--ro:#D4A5A5;--rl:#E8C5C5;--rp:#F5E0E0;--rd:#B88A8A;--go:#C9A96E;--gl:#E0CFA0;--gp:#F0E6CC;--gd:#A8874A;--sa:#B5C4B1;--c:#2D2D2D;--cl:#4A4A4A;--g:#8A8A8A;--gi:#C5C5C5;--gpa:#E8E8E8;--gg:#F5F5F5;--fh:'Cormorant Garamond',serif;--fb:'DM Sans',sans-serif;--ss:0 1px 3px rgba(0,0,0,.06);--sm:0 4px 12px rgba(0,0,0,.08);--sl:0 8px 30px rgba(0,0,0,.10);--sx:0 16px 50px rgba(0,0,0,.12);--sg:0 4px 20px rgba(201,169,110,.15);--e:cubic-bezier(.4,0,.2,1)}
    *{box-sizing:border-box;margin:0;padding:0}
    @keyframes fU{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
    @keyframes fI{from{opacity:0}to{opacity:1}}
    @keyframes bI{from{opacity:0;filter:blur(10px);transform:translateY(12px) scale(.97)}to{opacity:1;filter:blur(0);transform:translateY(0) scale(1)}}
    @keyframes kB{0%{transform:scale(1)}100%{transform:scale(1.12)}}
    @keyframes sh{0%{background-position:-200% 0}100%{background-position:200% 0}}
    @keyframes fl{0%,100%{transform:translateY(0) translateX(0);opacity:.2}25%{transform:translateY(-18px) translateX(8px);opacity:.45}50%{transform:translateY(-35px) translateX(-6px);opacity:.3}75%{transform:translateY(-15px) translateX(12px);opacity:.4}}
    @keyframes pu{0%,100%{box-shadow:0 0 0 0 rgba(201,169,110,.4)}50%{box-shadow:0 0 0 12px rgba(201,169,110,0)}}
    @keyframes slideInL{from{opacity:0;transform:translateX(-40px)}to{opacity:1;transform:translateX(0)}}
    @keyframes slideInR{from{opacity:0;transform:translateX(40px)}to{opacity:1;transform:translateX(0)}}
    @keyframes morphBlob{0%,100%{border-radius:60% 40% 30% 70%/60% 30% 70% 40%}25%{border-radius:30% 60% 70% 40%/50% 60% 30% 60%}50%{border-radius:50% 60% 30% 60%/30% 60% 70% 40%}75%{border-radius:60% 40% 60% 30%/70% 30% 50% 60%}}
    @keyframes gradShift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
    @keyframes textGlow{0%,100%{text-shadow:0 0 0 transparent}50%{text-shadow:0 0 30px rgba(201,169,110,.15)}}
    @keyframes revealLine{from{transform:scaleX(0)}to{transform:scaleX(1)}}
    @keyframes heroTextIn{0%{opacity:0;transform:translateY(20px);filter:blur(6px)}60%{opacity:1;filter:blur(0)}100%{opacity:1;transform:translateY(0);filter:blur(0)}}
    @keyframes cardEnter{from{opacity:0;transform:translateY(40px) scale(.95)}to{opacity:1;transform:translateY(0) scale(1)}}
    @keyframes countPop{0%{transform:scale(1)}50%{transform:scale(1.08)}100%{transform:scale(1)}}
    @keyframes spin{to{transform:rotate(360deg)}}
    @media(prefers-reduced-motion:reduce){*{animation-duration:.01ms!important;transition-duration:.01ms!important}}
    .sk{background:linear-gradient(90deg,var(--gg) 25%,var(--gp) 50%,var(--gg) 75%);background-size:200% 100%;animation:sh 1.5s ease-in-out infinite;border-radius:8px}
    .vc{transition:transform .4s var(--e),box-shadow .4s var(--e);position:relative;overflow:hidden;border-radius:14px;background:var(--iv);cursor:pointer}
    .vc:hover{transform:translateY(-10px) scale(1.01);box-shadow:0 20px 60px rgba(0,0,0,.12),0 0 0 1px rgba(201,169,110,.15)}
    .vc .vi{transition:transform .7s var(--e)}.vc:hover .vi{transform:scale(1.08)}
    .vc::after{content:'';position:absolute;bottom:0;left:0;width:100%;height:3px;background:linear-gradient(90deg,transparent,var(--go),transparent);transform:translateX(-100%);transition:transform .7s var(--e)}.vc:hover::after{transform:translateX(100%)}
    .vc::before{content:'';position:absolute;top:0;left:0;right:0;height:100%;background:linear-gradient(180deg,transparent 60%,rgba(201,169,110,.04) 100%);opacity:0;transition:opacity .4s;z-index:1;pointer-events:none}.vc:hover::before{opacity:1}
    .bg{background:linear-gradient(135deg,var(--go),var(--gd));color:var(--w);border:none;padding:12px 28px;border-radius:8px;font-family:var(--fb);font-weight:600;font-size:14px;letter-spacing:.04em;cursor:pointer;transition:all .2s var(--e);display:inline-flex;align-items:center;gap:8px;text-decoration:none}
    .bg:hover{filter:brightness(1.1);transform:translateY(-1px);box-shadow:var(--sg)}.bg:active{transform:translateY(0)}
    .nl{position:relative;color:var(--c);text-decoration:none;font-size:14px;font-weight:500;letter-spacing:.03em;padding:8px 0;cursor:pointer;background:none;border:none;font-family:var(--fb)}
    .nl::after{content:'';position:absolute;bottom:-2px;left:0;width:100%;height:2px;background:var(--go);transform:scaleX(0);transform-origin:center;transition:transform .3s var(--e)}
    .nl:hover::after,.nl.a::after{transform:scaleX(1)}
    .inp{border:1px solid var(--gpa);padding:10px 16px;border-radius:8px;font-family:var(--fb);font-size:14px;transition:border-color .2s,box-shadow .2s;width:100%;outline:none;background:var(--w)}
    .inp:focus{border-color:var(--go);box-shadow:0 0 0 3px rgba(201,169,110,.15)}
    .cp{padding:7px 16px;border-radius:999px;font-family:var(--fb);font-weight:500;font-size:13px;cursor:pointer;border:1px solid var(--gpa);background:var(--w);transition:all .2s var(--e);white-space:nowrap;display:inline-flex;align-items:center;gap:5px}
    .cp:hover,.cp.a{background:var(--c);color:var(--w);border-color:var(--c)}
    .mb{background:linear-gradient(135deg,var(--go),var(--gd));color:var(--w);font-size:9px;font-weight:700;letter-spacing:.06em;padding:3px 8px;border-radius:999px;text-transform:uppercase;display:inline-flex;align-items:center;gap:3px}
    @media(max-width:1023px){.hd{display:none!important}.sm{display:block!important}}
    `}</style>

    {/* NAV */}
    <nav style={{position:"sticky",top:0,zIndex:50,background:sy>20?"rgba(255,255,255,.97)":"var(--w)",backdropFilter:sy>20?"blur(12px)":"none",borderBottom:"1px solid var(--gp)",transition:"all .3s"}} role="navigation" aria-label="Main navigation">
      <div style={{maxWidth:1280,margin:"0 auto",padding:"0 24px",height:68,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <button onClick={()=>go("home")} style={{background:"none",border:"none",cursor:"pointer",display:"flex",alignItems:"center",gap:8}} aria-label="Home">
          <Heart size={20} style={{color:"var(--ro)"}} fill="var(--ro)"/>
          <span style={{fontFamily:"var(--fh)",fontSize:19,fontWeight:500,color:"var(--c)"}}>Singapore Wedding Venues</span>
        </button>
        <div className="hd" style={{display:"flex",alignItems:"center",gap:22}}>
          {NI.map(n=><div key={n.p} style={{position:"relative"}} onMouseEnter={()=>n.p==="venues"&&sMega(true)} onMouseLeave={()=>n.p==="venues"&&sMega(false)}>
            <button className={`nl ${pg===n.p&&!av?"a":""}`} onClick={()=>go(n.p)}>{n.l}</button>
            {n.p==="venues"&&mega&&<MegaDrop go={go} close={()=>sMega(false)}/>}
          </div>)}
          <button className="bg" onClick={()=>go("ai-tools")} style={{padding:"10px 20px",fontSize:13}}><Sparkles size={14}/>Find My Venue</button>
          {/* User menu */}
          <div style={{display:"flex",alignItems:"center",gap:8,marginLeft:4}}>
            {(session.role==="master"||session.role==="admin")&&<button onClick={onOpenAdmin} style={{background:"none",border:"1px solid var(--gpa)",borderRadius:8,padding:"7px 10px",cursor:"pointer",color:"var(--g)",display:"flex",alignItems:"center",gap:4,fontSize:12,fontFamily:"var(--fb)",transition:"all .2s"}} title="User Management"><Settings size={14}/></button>}
            <div style={{display:"flex",alignItems:"center",gap:6,padding:"6px 12px",background:"var(--gg)",borderRadius:8}}>
              <div style={{width:24,height:24,borderRadius:"50%",background:session.role==="master"?"var(--go)":session.role==="admin"?"var(--sa)":"var(--gi)",display:"flex",alignItems:"center",justifyContent:"center"}}><Shield size={11} style={{color:"var(--w)"}}/></div>
              <span style={{fontSize:11,fontWeight:600,color:"var(--c)",maxWidth:100,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{session.email.split("@")[0]}</span>
            </div>
            <button onClick={onLogout} style={{background:"none",border:"none",cursor:"pointer",color:"var(--g)",padding:4,transition:"color .2s"}} title="Sign Out"><LogOut size={16}/></button>
          </div>
        </div>
        <button onClick={()=>sMm(true)} className="sm" style={{display:"none",background:"none",border:"none",cursor:"pointer"}} aria-label="Menu"><Menu size={24}/></button>
      </div>
    </nav>

    {mm&&<MobMenu items={NI} go={go} close={()=>sMm(false)} session={session} onLogout={onLogout} onOpenAdmin={onOpenAdmin}/>}

    <main role="main">
      {av?<Detail v={av} go={go}/>:
       pg==="home"?<Home go={go}/>:
       pg==="venues"?<Dir go={go}/>:
       pg==="ai-tools"?<AIHub/>:
       pg==="weddings"?<RWPage go={go}/>:
       pg==="shows"?<Shows/>:
       pg==="about"?<Abt/>:<Home go={go}/>}
    </main>

    <Ftr go={go}/>
    <AskAI show={ai} toggle={()=>sAi(!ai)}/>
    {st&&<button onClick={()=>window.scrollTo({top:0,behavior:"smooth"})} style={{position:"fixed",bottom:ai?420:96,right:24,width:40,height:40,borderRadius:"50%",background:"var(--c)",color:"var(--w)",border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",zIndex:40,boxShadow:"var(--sm)"}} aria-label="Scroll to top"><ArrowUp size={16}/></button>}
  </div>);
}

// ── MEGA DROPDOWN ────────────────────────────────────────────────────────
function MegaDrop({go,close}){
  const host=VENUES.filter(v=>v.managed);
  const hotels=VENUES.filter(v=>v.cat==="hotel"&&!v.managed);
  const other=VENUES.filter(v=>!v.managed&&v.cat!=="hotel");
  return(<div style={{position:"absolute",top:"100%",left:-200,background:"var(--w)",borderRadius:16,boxShadow:"var(--sx)",padding:28,minWidth:680,display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:20,animation:"fI .2s ease",zIndex:60}} onMouseLeave={close}>
    <div><p style={{fontWeight:600,fontSize:11,letterSpacing:".06em",textTransform:"uppercase",color:"var(--gd)",marginBottom:10,display:"flex",alignItems:"center",gap:4}}><Crown size={10}/>1-Host Collection</p>
      {host.map(v=><button key={v.id} onClick={()=>{close();go("venues",v)}} style={{display:"block",background:"none",border:"none",cursor:"pointer",fontFamily:"var(--fb)",fontSize:13,color:"var(--c)",padding:"3px 0",textAlign:"left"}}>{v.name}{v.isNew&&<span style={{color:"var(--gd)",fontSize:10,fontWeight:700,marginLeft:4}}>NEW</span>}</button>)}</div>
    <div><p style={{fontWeight:600,fontSize:11,letterSpacing:".06em",textTransform:"uppercase",color:"var(--g)",marginBottom:10}}>Luxury Hotels</p>
      {hotels.slice(0,8).map(v=><button key={v.id} onClick={()=>{close();go("venues",v)}} style={{display:"block",background:"none",border:"none",cursor:"pointer",fontFamily:"var(--fb)",fontSize:13,color:"var(--c)",padding:"3px 0",textAlign:"left"}}>{v.name}</button>)}</div>
    <div><p style={{fontWeight:600,fontSize:11,letterSpacing:".06em",textTransform:"uppercase",color:"var(--g)",marginBottom:10}}>Heritage & Unique</p>
      {[...hotels.slice(8),...other].slice(0,6).map(v=><button key={v.id} onClick={()=>{close();go("venues",v)}} style={{display:"block",background:"none",border:"none",cursor:"pointer",fontFamily:"var(--fb)",fontSize:13,color:"var(--c)",padding:"3px 0",textAlign:"left"}}>{v.name}</button>)}
      <button onClick={()=>{close();go("venues")}} style={{display:"block",background:"none",border:"none",cursor:"pointer",fontFamily:"var(--fb)",fontSize:13,color:"var(--gd)",padding:"6px 0",textAlign:"left",fontWeight:600}}>Browse All {VENUES.length} Venues →</button></div>
  </div>);
}

function MobMenu({items,go,close,session,onLogout,onOpenAdmin}){return(<div style={{position:"fixed",inset:0,zIndex:100,display:"flex",justifyContent:"flex-end"}}><div onClick={close} style={{position:"absolute",inset:0,background:"rgba(0,0,0,.4)",backdropFilter:"blur(4px)"}}/><div style={{position:"relative",width:280,background:"var(--w)",padding:"68px 24px 24px",animation:"fI .2s ease",display:"flex",flexDirection:"column",gap:4}}><button onClick={close} style={{position:"absolute",top:18,right:18,background:"none",border:"none",cursor:"pointer"}}><X size={20}/></button>{items.map(n=><button key={n.p} onClick={()=>go(n.p)} style={{background:"none",border:"none",fontFamily:"var(--fh)",fontSize:19,fontWeight:500,color:"var(--c)",padding:"11px 0",textAlign:"left",cursor:"pointer",borderBottom:"1px solid var(--gpa)"}}>{n.l}</button>)}<button className="bg" onClick={()=>go("ai-tools")} style={{marginTop:14,width:"100%",justifyContent:"center"}}><Sparkles size={14}/>Find My Venue</button><div style={{marginTop:16,paddingTop:16,borderTop:"1px solid var(--gpa)"}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}><div style={{width:28,height:28,borderRadius:"50%",background:session?.role==="master"?"var(--go)":"var(--sa)",display:"flex",alignItems:"center",justifyContent:"center"}}><Shield size={12} style={{color:"var(--w)"}}/></div><div><p style={{fontSize:13,fontWeight:600}}>{session?.email?.split("@")[0]}</p><p style={{fontSize:11,color:"var(--g)"}}>{session?.role==="master"?"Master Admin":session?.role==="admin"?"Admin":"Visitor"}</p></div></div>{(session?.role==="master"||session?.role==="admin")&&<button onClick={()=>{close();onOpenAdmin()}} style={{background:"none",border:"1px solid var(--gpa)",borderRadius:8,padding:"10px 14px",width:"100%",cursor:"pointer",fontSize:13,fontFamily:"var(--fb)",display:"flex",alignItems:"center",gap:6,marginBottom:8}}><Settings size={14}/>User Management</button>}<button onClick={()=>{close();onLogout()}} style={{background:"none",border:"1px solid var(--gpa)",borderRadius:8,padding:"10px 14px",width:"100%",cursor:"pointer",fontSize:13,fontFamily:"var(--fb)",display:"flex",alignItems:"center",gap:6,color:"var(--rd)"}}><LogOut size={14}/>Sign Out</button></div></div></div>)}

// ═════════════════════════════════════════════════════════════════════════
// HOME
// ═════════════════════════════════════════════════════════════════════════
function Home({go}){
  const[sl,sSl]=useState(0);const[pr,sPr]=useState(0);
  useEffect(()=>{const iv=setInterval(()=>sSl(s=>(s+1)%HERO_SLIDES.length),6e3);return()=>clearInterval(iv)},[]);
  useEffect(()=>{sPr(0);const t=setTimeout(()=>sPr(100),50);return()=>clearTimeout(t)},[sl]);
  return(<>
    {/* HERO */}
    <section style={{position:"relative",height:"75vh",minHeight:500,overflow:"hidden"}} role="banner" aria-label="Featured Singapore wedding venues">
      {HERO_SLIDES.map((s,i)=>{const v=VENUES.find(x=>x.id===s.vid);return(<div key={i} style={{position:"absolute",inset:0,opacity:sl===i?1:0,transition:"opacity 1s ease"}}><div style={{position:"absolute",inset:0,animation:sl===i?"kB 14s ease-in-out forwards":"none"}}><VI src={v?.hero||v?.img} alt={`${v?.name||"Singapore"} — ${v?.catLabel||"Wedding Venue"} Singapore`} style={{width:"100%",height:"100%"}}/></div><div style={{position:"absolute",inset:0,background:"linear-gradient(180deg,rgba(45,45,45,.08) 0%,rgba(45,45,45,.55) 60%,rgba(45,45,45,.8) 100%)"}}/></div>)})}
      {/* Decorative morphing blob */}
      <div style={{position:"absolute",top:"-20%",right:"-10%",width:"50vw",height:"50vw",background:"radial-gradient(circle,rgba(201,169,110,.08) 0%,transparent 70%)",animation:"morphBlob 20s ease-in-out infinite",zIndex:1,pointerEvents:"none"}}/>
      {/* Floating particles */}
      <div style={{position:"absolute",inset:0,overflow:"hidden",pointerEvents:"none",zIndex:2}}>{Array.from({length:15},(_,i)=><div key={i} style={{position:"absolute",left:`${(i*7.1+3)%100}%`,top:`${(i*11.3+5)%100}%`,width:Math.random()*7+3,height:Math.random()*7+3,borderRadius:"50%",background:`rgba(201,169,110,${.2+Math.random()*.2})`,animation:`fl ${8+Math.random()*6}s ease-in-out ${i*.4}s infinite`,filter:"blur(1px)"}}/>)}</div>
      <div style={{position:"absolute",inset:0,zIndex:3,display:"flex",flexDirection:"column",justifyContent:"center",padding:"0 clamp(24px,8vw,120px)"}}>
        <h1 key={`h-${sl}`} style={{fontFamily:"var(--fh)",fontSize:"clamp(32px,5.5vw,58px)",fontWeight:300,color:"var(--w)",lineHeight:1.1,letterSpacing:"-.02em",maxWidth:580,animation:"heroTextIn .9s ease forwards",whiteSpace:"pre-line"}}>{HERO_SLIDES[sl].h}</h1>
        <p key={`p-${sl}`} style={{fontFamily:"var(--fb)",fontSize:"clamp(14px,1.5vw,17px)",color:"rgba(255,255,255,.88)",marginTop:16,maxWidth:480,animation:"fU .7s ease .35s both"}}>{HERO_SLIDES[sl].sub}</p>
        <div style={{display:"flex",gap:12,marginTop:28,animation:"fU .7s ease .55s both",flexWrap:"wrap"}}>
          <button className="bg" onClick={()=>go("ai-tools")} style={{padding:"14px 28px",fontSize:15}}><Sparkles size={15}/>Find My Venue</button>
          <button onClick={()=>go("venues")} style={{background:"rgba(255,255,255,.1)",border:"1px solid rgba(255,255,255,.3)",color:"var(--w)",padding:"14px 24px",borderRadius:8,fontFamily:"var(--fb)",fontWeight:500,fontSize:14,cursor:"pointer",backdropFilter:"blur(10px)",transition:"all .3s"}}>Browse {VENUES.length} Venues</button>
        </div>
      </div>
      <div style={{position:"absolute",bottom:0,left:0,right:0,zIndex:4}}>
        <div style={{height:3,background:"rgba(255,255,255,.15)"}}><div style={{height:"100%",background:"var(--go)",width:`${pr}%`,transition:pr===0?"none":"width 5.9s linear"}}/></div>
        <div style={{display:"flex",justifyContent:"center",gap:7,padding:12}}>{HERO_SLIDES.map((_,i)=><button key={i} onClick={()=>sSl(i)} style={{width:sl===i?20:7,height:7,borderRadius:4,background:sl===i?"var(--go)":"rgba(255,255,255,.4)",border:"none",cursor:"pointer",transition:"all .3s"}} aria-label={`Slide ${i+1}`}/>)}</div>
      </div>
    </section>

    {/* AI CTA */}
    <section style={{background:"var(--cw)",padding:"40px 24px"}}>
      <div style={{maxWidth:720,margin:"0 auto",textAlign:"center"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:6,marginBottom:8}}><Sparkles size={15} style={{color:"var(--go)"}}/><span style={{fontSize:12,fontWeight:600,letterSpacing:".06em",textTransform:"uppercase",color:"var(--gd)"}}>AI-Powered Venue Matching</span></div>
        <h2 style={{fontFamily:"var(--fh)",fontSize:"clamp(22px,3vw,32px)",fontWeight:400,marginBottom:8}}>Tell us about your dream wedding</h2>
        <p style={{color:"var(--g)",fontSize:14,marginBottom:20}}>Our AI matches you to the perfect venue from {VENUES.length} iconic Singapore locations — luxury hotels, rooftop restaurants, heritage mansions, and garden estates.</p>
        <button className="bg" onClick={()=>go("ai-tools")} style={{fontSize:15,padding:"13px 30px"}}><Sparkles size={15}/>Match Me to My Venue</button>
      </div>
    </section>

    {/* FEATURED VENUES — merged 1-Host + Hotels */}
    <section style={{padding:"64px 24px",background:"var(--w)"}} aria-label="Featured wedding venues Singapore">
      <div style={{maxWidth:1200,margin:"0 auto"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:28,flexWrap:"wrap",gap:10}}>
          <div><h2 style={{fontFamily:"var(--fh)",fontSize:"clamp(24px,3vw,36px)",fontWeight:400}}>Featured Venues</h2><p style={{color:"var(--g)",fontSize:14,marginTop:6}}>Rooftop restaurants, luxury hotels, heritage mansions, and garden estates — {VENUES.length} iconic Singapore wedding venues</p></div>
          <button className="nl" onClick={()=>go("venues")} style={{fontSize:13,color:"var(--gd)"}}>Browse All {VENUES.length} <ChevronRight size={13} style={{display:"inline",verticalAlign:"middle"}}/></button>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(270px,1fr))",gap:20}}>{VENUES.filter(v=>v.featured).sort((a,b_)=>(b_.managed?1:0)-(a.managed?1:0)).map((v,i)=><VCd key={v.id} v={v} i={i} onClick={()=>go("venues",v)}/>)}</div>
      </div>
    </section>

    {/* CATEGORIES */}
    <section style={{padding:"40px 24px",background:"var(--w)"}}>
      <div style={{maxWidth:1200,margin:"0 auto",textAlign:"center"}}>
        <h2 style={{fontFamily:"var(--fh)",fontSize:24,fontWeight:400,marginBottom:18}}>Browse by Category</h2>
        <div style={{display:"flex",gap:8,justifyContent:"center",flexWrap:"wrap"}}>{CATS.filter(c=>c.id!=="all").map(c=><button key={c.id} className="cp" onClick={()=>go("venues")}><c.icon size={13}/>{c.label} <span style={{fontSize:11,color:"var(--g)"}}>({VENUES.filter(v=>v.cat===c.id).length})</span></button>)}</div>
      </div>
    </section>

    {/* REAL WEDDINGS PREVIEW */}
    <section style={{padding:"64px 24px",background:"var(--cr)"}}>
      <div style={{maxWidth:1200,margin:"0 auto"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:28}}><h2 style={{fontFamily:"var(--fh)",fontSize:"clamp(24px,3vw,36px)",fontWeight:400}}>Real Weddings</h2><button className="nl" onClick={()=>go("weddings")} style={{fontSize:13,color:"var(--gd)"}}>All Stories <ChevronRight size={13} style={{display:"inline",verticalAlign:"middle"}}/></button></div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:18}}>{WEDDINGS.slice(0,4).map((s,i)=>{const v=VENUES.find(x=>x.id===s.vid);return(<RWCd key={i} s={s} v={v} go={go}/>)})}</div>
      </div>
    </section>

    <StatStrip/><TestCarousel/>

    {/* NEWSLETTER */}
    <section style={{padding:"56px 24px",background:"linear-gradient(135deg,var(--cw),var(--rp),var(--gp),var(--cw))",backgroundSize:"300% 300%",animation:"gradShift 8s ease infinite"}}>
      <div style={{maxWidth:500,margin:"0 auto",textAlign:"center"}}>
        <h2 style={{fontFamily:"var(--fh)",fontSize:28,fontWeight:400,marginBottom:8}}>Stay Inspired</h2>
        <p style={{color:"var(--g)",fontSize:14,marginBottom:18}}>Weekly venue spotlights, wedding trends, and exclusive promotions.</p>
        <div style={{display:"flex",gap:10,maxWidth:360,margin:"0 auto"}}><input className="inp" placeholder="Your email address" aria-label="Email for newsletter"/><button className="bg">Subscribe</button></div>
      </div>
    </section>
  </>);
}

// ── VENUE CARD ───────────────────────────────────────────────────────────
function VCd({v,i=0,onClick}){const[r,vis]=useSR();return(
  <article ref={r} className="vc" onClick={onClick} style={{opacity:vis?1:0,transform:vis?"translateY(0) scale(1)":"translateY(35px) scale(.96)",transition:`all .6s var(--e) ${i*80}ms`,boxShadow:"var(--ss)"}} itemScope itemType="https://schema.org/EventVenue">
    <div style={{position:"relative",paddingTop:"56.25%",overflow:"hidden"}}>
      <VI src={v.hero||v.img} alt={`${v.name} — ${v.catLabel} wedding venue in ${v.area}, Singapore`} className="vi" style={{position:"absolute",inset:0,width:"100%",height:"100%"}}/>
      {v.isNew&&<span style={{position:"absolute",top:9,right:9,background:"var(--go)",color:"var(--w)",fontSize:9,fontWeight:700,padding:"2px 7px",borderRadius:999,zIndex:2}}>NEW</span>}
    </div>
    <div style={{padding:"12px 14px 16px"}}>
      <h3 itemProp="name" style={{fontFamily:"var(--fh)",fontSize:19,fontWeight:500,marginBottom:3}}>{v.name}</h3>
      <p style={{fontSize:12,color:"var(--g)",marginBottom:7,display:"flex",alignItems:"center",gap:3}}><MapPin size={11}/>{v.area}</p>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <span style={{fontSize:11,color:"var(--g)"}}><Users size={11} style={{display:"inline",verticalAlign:"middle"}}/> Up to {v.capacity.st||v.capacity.s}</span>
        <span style={{fontWeight:600,fontSize:12,color:"var(--gd)"}} itemProp="priceRange">From {v.budget.l.split("–")[0]}++</span>
      </div>
    </div>
  </article>
);}

function RWCd({s,v,go}){const[r,vis]=useSR();return(
  <article ref={r} style={{borderRadius:14,overflow:"hidden",background:"var(--w)",boxShadow:"var(--ss)",cursor:"pointer",opacity:vis?1:0,transform:vis?"translateY(0) scale(1)":"translateY(25px) scale(.97)",transition:"all .6s var(--e)"}} onClick={()=>v&&go("venues",v)}>
    <div style={{paddingTop:"56.25%",position:"relative",overflow:"hidden"}}><VI src={s.coupleImg} alt={`${s.couple} wedding at ${s.venue} Singapore`} className="vi" style={{position:"absolute",inset:0,width:"100%",height:"100%"}}/></div>
    <div style={{padding:"16px 18px 20px"}}>
      <h3 style={{fontFamily:"var(--fh)",fontSize:20,fontWeight:500,marginBottom:4}}>{s.couple}</h3>
      <p style={{fontSize:12,color:"var(--gd)",fontWeight:600,marginBottom:4}}>{s.venue} · {s.guests} guests · {s.type}</p>
      <p style={{fontSize:13,color:"var(--cl)",fontStyle:"italic",lineHeight:1.6,marginBottom:8}}>"{s.quote}"</p>
      <p style={{fontSize:11,color:"var(--g)"}}>Photography: {s.photo}</p>
    </div>
  </article>
);}

function StatItem({target,suffix,label}){const[r,c]=useCtr(target);return<div ref={r}><p style={{fontFamily:"var(--fh)",fontSize:36,fontWeight:300,color:"var(--go)"}}>{c.toLocaleString()}{suffix}</p><p style={{fontSize:12,color:"var(--gi)",marginTop:2}}>{label}</p></div>}

function StatStrip(){const d=[{t:VENUES.length,s:"+",l:"Venues Listed"},{t:6500,s:"+",l:"Weddings Hosted"},{t:354,s:"",l:"Google Reviews"},{t:12,s:"+",l:"Years of Excellence"}];return(
  <section style={{background:"var(--c)",padding:"44px 24px",color:"var(--w)"}}>
    <div style={{maxWidth:860,margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(130px,1fr))",gap:24,textAlign:"center"}}>
      {d.map((s,i)=><StatItem key={i} target={s.t} suffix={s.s} label={s.l}/>)}
    </div>
  </section>
);}

function TestCarousel(){const[i,sI]=useState(0);useEffect(()=>{const iv=setInterval(()=>sI(x=>(x+1)%REVIEWS.length),5e3);return()=>clearInterval(iv)},[]);const t=REVIEWS[i];return(
  <section style={{padding:"56px 24px",background:"var(--w)"}}>
    <div style={{maxWidth:640,margin:"0 auto",textAlign:"center"}}>
      <h2 style={{fontFamily:"var(--fh)",fontSize:28,fontWeight:400,marginBottom:24}}>What Couples Say</h2>
      <div style={{display:"flex",justifyContent:"center",gap:3,marginBottom:14}}>{Array.from({length:t.s},(_,j)=><Star key={j} size={14} fill="var(--go)" color="var(--go)"/>)}</div>
      <blockquote key={i} style={{fontFamily:"var(--fh)",fontSize:"clamp(16px,2vw,21px)",fontWeight:400,fontStyle:"italic",lineHeight:1.6,color:"var(--cl)",minHeight:80,animation:"fI .4s ease"}}>"{t.text}"</blockquote>
      <p style={{fontWeight:600,fontSize:13,color:"var(--c)",marginTop:14}}>— {t.who}</p>
      <p style={{fontSize:12,color:"var(--g)",marginTop:2}}>Married at {t.where}</p>
      <div style={{display:"flex",justifyContent:"center",gap:6,marginTop:18}}>{REVIEWS.map((_,j)=><button key={j} onClick={()=>sI(j)} style={{width:i===j?16:6,height:6,borderRadius:3,background:i===j?"var(--go)":"var(--gi)",border:"none",cursor:"pointer",transition:"all .3s"}}/>)}</div>
    </div>
  </section>
);}

// ═════════════════════════════════════════════════════════════════════════
// DIRECTORY
// ═════════════════════════════════════════════════════════════════════════
function Dir({go}){const[cat,sCat]=useState("all");const[sort,sSort]=useState("featured");
  let f=cat==="all"?[...VENUES]:VENUES.filter(v=>v.cat===cat);
  if(sort==="featured")f.sort((a,b)=>(b.featured?1:0)-(a.featured?1:0)||(b.managed?1:0)-(a.managed?1:0));
  else if(sort==="price-low")f.sort((a,b)=>a.price.min-b.price.min);
  else if(sort==="price-high")f.sort((a,b)=>b.price.min-a.price.min);
  else if(sort==="capacity")f.sort((a,b)=>b.capacity.s-a.capacity.s);
  return(<section style={{padding:"40px 24px 72px",background:"var(--cr)"}}>
    <div style={{maxWidth:1200,margin:"0 auto"}}>
      <header style={{marginBottom:28}}><h1 style={{fontFamily:"var(--fh)",fontSize:"clamp(28px,4vw,40px)",fontWeight:300,marginBottom:8}}>Wedding Venues in Singapore</h1><p style={{color:"var(--g)",fontSize:14,maxWidth:600}}>Explore {VENUES.length} of Singapore's finest wedding venues — legendary five-star hotels, sky-high rooftops, heritage mansions, and garden estates.</p></header>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10,marginBottom:20}}>
        <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>{CATS.map(c=><button key={c.id} className={`cp ${cat===c.id?"a":""}`} onClick={()=>sCat(c.id)}><c.icon size={12}/>{c.label}</button>)}</div>
        <select className="inp" value={sort} onChange={e=>sSort(e.target.value)} style={{width:"auto",fontSize:12,padding:"7px 12px"}}><option value="featured">Featured</option><option value="price-low">Price: Low–High</option><option value="price-high">Price: High–Low</option><option value="capacity">Largest</option></select>
      </div>
      <p style={{fontSize:12,color:"var(--g)",marginBottom:14}}>Showing {f.length} of {VENUES.length} venues</p>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:18}}>{f.map((v,i)=><VCd key={v.id} v={v} i={i} onClick={()=>go("venues",v)}/>)}</div>
    </div>
  </section>);
}

// ═════════════════════════════════════════════════════════════════════════
// DETAIL
// ═════════════════════════════════════════════════════════════════════════
function Detail({v,go}){const sim=VENUES.filter(x=>x.cat===v.cat&&x.id!==v.id).slice(0,3);return(
  <article style={{background:"var(--cr)"}} itemScope itemType="https://schema.org/EventVenue">
    <div style={{maxWidth:1200,margin:"0 auto",padding:"18px 24px 72px"}}>
      <button onClick={()=>go("venues")} className="nl" style={{marginBottom:14,fontSize:13}}><ChevronLeft size={13} style={{display:"inline",verticalAlign:"middle"}}/> All Venues</button>
      <div style={{borderRadius:14,overflow:"hidden",height:"clamp(240px,40vh,440px)",position:"relative",marginBottom:24}}>
        <VI src={v.hero||v.img} alt={`${v.name} wedding venue — ${v.catLabel} in ${v.area}, Singapore`} style={{width:"100%",height:"100%"}}/>
        <div style={{position:"absolute",inset:0,background:"linear-gradient(180deg,transparent 40%,rgba(45,45,45,.65) 100%)"}}/>
        <div style={{position:"absolute",bottom:22,left:22,color:"var(--w)"}}>
          <div style={{display:"flex",gap:6,alignItems:"center",marginBottom:8}}>
            <span style={{background:"rgba(255,255,255,.15)",backdropFilter:"blur(8px)",padding:"3px 10px",borderRadius:999,fontSize:10,fontWeight:600,letterSpacing:".05em",textTransform:"uppercase"}}>{v.catLabel}</span>
            {v.managed&&<span className="mb"><Crown size={8}/>{v.managed}</span>}
          </div>
          <h1 itemProp="name" style={{fontFamily:"var(--fh)",fontSize:"clamp(26px,4vw,42px)",fontWeight:400}}>{v.name}</h1>
          <div style={{display:"flex",alignItems:"center",gap:8,marginTop:5,fontSize:13,opacity:.9}}><span><MapPin size={12} style={{display:"inline",verticalAlign:"middle"}}/> {v.area}</span><span>{Array.from({length:5},(_,i)=><Star key={i} size={11} fill={i<Math.floor(v.rating)?"var(--go)":"transparent"} color="var(--go)" style={{display:"inline"}}/>)} {v.rating}</span></div>
        </div>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 300px",gap:24,alignItems:"start"}}>
        <div>
          <div style={{background:"var(--w)",borderRadius:12,padding:20,marginBottom:22,boxShadow:"var(--ss)",display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(130px,1fr))",gap:12}}>
            {[{ic:Users,l:"Capacity",val:`${v.capacity.s} seated · ${v.capacity.st} standing`},{ic:UtensilsCrossed,l:"Cuisine",val:v.cuisine.join(", ")},{ic:MapPin,l:"Setting",val:v.setting},{ic:Check,l:"Solemnisation",val:v.solemn?"Licensed":"Not available"}].map((f,i)=><div key={i} style={{display:"flex",gap:7,alignItems:"flex-start"}}><f.ic size={15} style={{color:"var(--go)",flexShrink:0,marginTop:2}}/><div><p style={{fontSize:10,fontWeight:600,letterSpacing:".05em",textTransform:"uppercase",color:"var(--g)",marginBottom:1}}>{f.l}</p><p style={{fontSize:13}}>{f.val}</p></div></div>)}
          </div>
          <h2 style={{fontFamily:"var(--fh)",fontSize:24,fontWeight:400,marginBottom:12}}>About {v.name}</h2>
          <p itemProp="description" style={{fontSize:14,lineHeight:1.8,color:"var(--cl)",marginBottom:22}}>{v.description}</p>
          <h3 style={{fontFamily:"var(--fh)",fontSize:19,fontWeight:500,marginBottom:10}}>Best For</h3>
          <ul style={{listStyle:"none",marginBottom:22}}>{v.bestFor.map((b,i)=><li key={i} style={{fontSize:13,padding:"6px 0",borderBottom:"1px solid var(--gpa)",display:"flex",alignItems:"center",gap:7}}><Check size={13} style={{color:"var(--sa)"}}/>{b}</li>)}</ul>
          {v.gallery?.length>0&&<><h3 style={{fontFamily:"var(--fh)",fontSize:19,fontWeight:500,marginBottom:10}}>Gallery</h3><div style={{display:"flex",gap:10,overflowX:"auto",paddingBottom:8,marginBottom:22}}>{v.gallery.map((img,i)=><div key={i} style={{flex:"0 0 240px",borderRadius:10,overflow:"hidden",height:160}}><VI src={img} alt={`${v.name} gallery ${i+1} — wedding venue Singapore`} style={{width:"100%",height:"100%"}}/></div>)}</div></>}
          <h3 style={{fontFamily:"var(--fh)",fontSize:19,fontWeight:500,marginBottom:12}}>Frequently Asked Questions</h3>
          <div itemScope itemType="https://schema.org/FAQPage" style={{marginBottom:22}}>
            {[{q:`What is the capacity at ${v.name}?`,a:`${v.name} accommodates up to ${v.capacity.s} guests seated and ${v.capacity.st} standing at ${v.location}.`},{q:`How much does a wedding at ${v.name} cost?`,a:`${v.price.unit==="guest"?`Packages start from ${v.budget.l} per guest for lunch and ${v.budget.d} per guest for dinner.`:`Banquet packages start from ${v.budget.l} per table of 10.`} The '++' indicates 10% service charge and 9% GST.`},{q:`Is ${v.name} licensed for solemnisation?`,a:v.solemn?`Yes, ${v.name} is a licensed ROM solemnisation venue in Singapore.`:`${v.name} does not currently hold a solemnisation licence.`}].map((faq,i)=><div key={i} itemProp="mainEntity" itemScope itemType="https://schema.org/Question" style={{borderBottom:"1px solid var(--gpa)",padding:"12px 0"}}><h4 itemProp="name" style={{fontWeight:600,fontSize:13,marginBottom:5}}>{faq.q}</h4><div itemProp="acceptedAnswer" itemScope itemType="https://schema.org/Answer"><p itemProp="text" style={{fontSize:13,color:"var(--cl)",lineHeight:1.7}}>{faq.a}</p></div></div>)}
          </div>
        </div>

        <aside style={{position:"sticky",top:86}}>
          <div style={{background:"var(--w)",borderRadius:12,padding:20,boxShadow:"var(--sm)",marginBottom:14}}>
            <p style={{fontFamily:"var(--fh)",fontSize:22,fontWeight:500,color:"var(--gd)"}} itemProp="priceRange">From {v.budget.l.split("–")[0]}++</p>
            <p style={{fontSize:12,color:"var(--g)",marginBottom:16}}>{v.price.unit==="guest"?"per guest · Lunch":"per table of 10 · Lunch"}</p>
            {v.web&&<a href={v.web} target="_blank" rel="noopener noreferrer" className="bg" style={{width:"100%",justifyContent:"center",marginBottom:8,textDecoration:"none"}}><Mail size={13}/>Enquire Now</a>}
            <button onClick={()=>go("ai-tools")} style={{width:"100%",padding:"10px 16px",borderRadius:8,border:"1px solid var(--go)",background:"transparent",color:"var(--gd)",fontFamily:"var(--fb)",fontWeight:600,fontSize:13,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:5}}><Calculator size={13}/>AI Budget Estimate</button>
          </div>
          {v.managed&&<div style={{background:"linear-gradient(135deg,var(--gp),var(--cw))",borderRadius:12,padding:16,border:"1px solid var(--gl)"}}><div style={{display:"flex",alignItems:"center",gap:5,marginBottom:5}}><Crown size={13} style={{color:"var(--gd)"}}/><span style={{fontSize:11,fontWeight:600,color:"var(--gd)"}}>1-Host Managed</span></div><p style={{fontSize:12,color:"var(--cl)",lineHeight:1.5}}>Part of the 1-Host collection with dedicated coordinators and 6,500+ weddings of experience.</p></div>}
        </aside>
      </div>
      {sim.length>0&&<div style={{marginTop:44}}><h3 style={{fontFamily:"var(--fh)",fontSize:24,fontWeight:400,marginBottom:18}}>Similar Venues</h3><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(250px,1fr))",gap:18}}>{sim.map((x,i)=><VCd key={x.id} v={x} i={i} onClick={()=>go("venues",x)}/>)}</div></div>}
    </div>
  </article>
);}

// ═════════════════════════════════════════════════════════════════════════
// AI TOOLS (kept concise — all 4 tools + Ask AI)
// ═════════════════════════════════════════════════════════════════════════
function ToolCard({t,i,onClick}){const[r,v]=useSR();return<button ref={r} onClick={onClick} style={{background:"var(--w)",borderRadius:12,padding:22,border:"1px solid var(--gpa)",cursor:"pointer",textAlign:"left",transition:`all .4s var(--e) ${i*80}ms`,opacity:v?1:0,transform:v?"translateY(0)":"translateY(14px)",boxShadow:"var(--ss)"}}><t.ic size={24} style={{color:"var(--go)",marginBottom:8}}/><h3 style={{fontFamily:"var(--fh)",fontSize:19,fontWeight:500,marginBottom:5}}>{t.n}</h3><p style={{fontSize:13,color:"var(--g)",lineHeight:1.4}}>{t.d}</p></button>}

function AIHub(){const[ac,sAc]=useState(null);const tools=[{id:"match",ic:Sparkles,n:"AI Venue Matchmaker",d:`Match from ${VENUES.length} venues`},{id:"budget",ic:Calculator,n:"Budget Calculator",d:"Singapore wedding budget AI"},{id:"timeline",ic:CalendarDays,n:"Timeline Generator",d:"Day-of timeline with SG customs"},{id:"compare",ic:GitCompareArrows,n:"Venue Comparison",d:"Side-by-side AI analysis"}];return(
  <section style={{padding:"44px 24px 72px",background:"var(--cr)"}}>
    <div style={{maxWidth:880,margin:"0 auto"}}>
      <div style={{textAlign:"center",marginBottom:36}}><h1 style={{fontFamily:"var(--fh)",fontSize:"clamp(28px,4vw,40px)",fontWeight:300,marginBottom:8}}>AI Wedding Planning Tools</h1><p style={{color:"var(--g)",fontSize:14,maxWidth:520,margin:"0 auto"}}>Powered by AI to simplify your venue search across {VENUES.length} iconic Singapore locations.</p></div>
      {!ac?<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>{tools.map((t,i)=><ToolCard key={t.id} t={t} i={i} onClick={()=>sAc(t.id)}/>)}</div>:
      <div><button onClick={()=>sAc(null)} className="nl" style={{marginBottom:18,fontSize:13}}><ChevronLeft size={13} style={{display:"inline",verticalAlign:"middle"}}/> Tools</button>
        {ac==="match"&&<MatchT/>}{ac==="budget"&&<BudgetT/>}{ac==="timeline"&&<TimeT/>}{ac==="compare"&&<CompT/>}
      </div>}
    </div>
  </section>
);}

function MatchT(){const[g,sG]=useState(150);const[b,sB]=useState(2e3);const[st,sSt]=useState("Glamorous");const[ld,sLd]=useState(false);const[res,sRes]=useState(null);

  const styleMap={Glamorous:["hotel","rooftop","waterfront"],Intimate:["heritage","garden","waterfront"],Garden:["garden","heritage"],"Sky-High":["rooftop"],Waterfront:["waterfront","beachfront"],Heritage:["heritage"],"Grand Hotel":["hotel"],Rustic:["garden","heritage","beachfront"]};

  const run=()=>{sLd(true);sRes(null);
    setTimeout(()=>{
      const scored=VENUES.map(v=>{let score=50;
        // Capacity fit (max 25 pts)
        const fits=g>=v.capacity.s*0.3&&g<=v.capacity.st;const tight=g>=v.capacity.s*0.6&&g<=v.capacity.s*1.1;
        if(tight)score+=25;else if(fits)score+=15;else if(g>v.capacity.st)score-=20;else score+=5;
        // Budget fit (max 25 pts)
        const perGuest=v.price.unit==="guest"?v.price.min:v.price.min/10;
        const budgetPerGuest=b/10;const diff=Math.abs(budgetPerGuest-perGuest);
        if(diff<20)score+=25;else if(diff<40)score+=18;else if(diff<60)score+=10;else score+=2;
        // Style match (max 20 pts)
        const styleCats=styleMap[st]||[];
        if(styleCats.includes(v.cat))score+=20;else score+=5;
        // Managed bonus (5 pts)
        if(v.managed)score+=5;
        // Rating bonus (max 5 pts)
        score+=Math.round((v.rating-4)*10);
        // Clamp
        return{...v,score:Math.min(97,Math.max(45,score))};
      }).sort((a,b_)=>b_.score-a.score).slice(0,3);

      const reasons=(v)=>{const r=[];
        if(v.capacity.s<=g&&g<=v.capacity.st)r.push(`Comfortably fits ${g} guests (capacity ${v.capacity.s}–${v.capacity.st})`);
        else if(g<=v.capacity.st)r.push(`Can accommodate ${g} guests (max ${v.capacity.st})`);
        r.push(`${v.setting} setting with ${v.cuisine.join(" & ")} cuisine`);
        if(v.managed)r.push("Managed by 1-Host with 6,500+ weddings of experience");
        if(v.solemn)r.push("Licensed for ROM solemnisation on-site");
        r.push(v.bestFor[0]);
        return r.slice(0,3);};
      const caveat=(v)=>{
        if(g>v.capacity.s)return`May feel spacious for ${g} guests — consider a cosier setup`;
        if(v.price.unit==="table"&&v.price.min>b)return`Pricing starts above your indicated budget`;
        if(v.setting==="Indoor")return"Indoor only — no outdoor ceremony option";
        return"Book early — popular dates fill 12+ months in advance";};

      sRes({recommendations:scored.map(v=>({name:v.name,matchScore:v.score,
        reasons:reasons(v),consideration:caveat(v),
        priceRange:v.price.unit==="guest"?v.budget.l+" per guest":v.budget.l+" per table of 10",
        capacity:`${v.capacity.s}–${v.capacity.st} guests`})),
        tip:st==="Intimate"?"For intimate celebrations under 100 guests, restaurant venues like Monti and 1-Alfaro offer a more personal atmosphere than hotel ballrooms.":st==="Grand Hotel"?"Request a site visit during a non-event day to see the ballroom with natural lighting — it often looks very different from promotional photos.":"Start venue hunting 12–18 months before your preferred date, especially for auspicious weekends. Popular venues like Raffles and 1-Arden book out fast."
      });sLd(false);
    },800);
  };

  return(<div style={{background:"var(--w)",borderRadius:16,padding:28,boxShadow:"var(--sm)"}}>
    <h2 style={{fontFamily:"var(--fh)",fontSize:26,fontWeight:400,marginBottom:20,display:"flex",alignItems:"center",gap:8}}><Sparkles size={20} style={{color:"var(--go)"}}/>AI Venue Matchmaker</h2>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:20}}>
      <div><label style={{fontSize:11,fontWeight:600,letterSpacing:".05em",textTransform:"uppercase",color:"var(--g)",marginBottom:6,display:"block"}}>Guests: {g}</label><input type="range" min={20} max={800} step={10} value={g} onChange={e=>sG(+e.target.value)} style={{width:"100%",accentColor:"var(--go)"}}/></div>
      <div><label style={{fontSize:11,fontWeight:600,letterSpacing:".05em",textTransform:"uppercase",color:"var(--g)",marginBottom:6,display:"block"}}>Budget: ~${b}++/table</label><input type="range" min={1200} max={3500} step={100} value={b} onChange={e=>sB(+e.target.value)} style={{width:"100%",accentColor:"var(--go)"}}/></div>
    </div>
    <div style={{marginBottom:20}}><label style={{fontSize:11,fontWeight:600,letterSpacing:".05em",textTransform:"uppercase",color:"var(--g)",marginBottom:6,display:"block"}}>Wedding Style</label><div style={{display:"flex",flexWrap:"wrap",gap:6}}>{["Glamorous","Intimate","Garden","Sky-High","Waterfront","Heritage","Grand Hotel","Rustic"].map(s=><button key={s} className={`cp ${st===s?"a":""}`} onClick={()=>sSt(s)} style={{fontSize:12,padding:"6px 14px"}}>{s}</button>)}</div></div>
    <button className="bg" onClick={run} disabled={ld} style={{fontSize:15,padding:"13px 28px"}}><Sparkles size={14}/>{ld?"Finding your perfect match…":"Match Me to My Venue"}</button>
    {ld&&<div style={{marginTop:20}}>{[1,2,3].map(i=><div key={i} className="sk" style={{height:110,marginBottom:10,borderRadius:12}}/>)}</div>}
    {res&&res.recommendations&&<div style={{marginTop:24}}>{res.recommendations.map((r,i)=><div key={i} style={{background:"var(--iv)",borderRadius:14,padding:20,marginBottom:12,animation:`cardEnter .6s ease ${i*150}ms both`,border:"1px solid var(--gpa)",boxShadow:"var(--ss)"}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}><h3 style={{fontFamily:"var(--fh)",fontSize:20,fontWeight:500}}>{r.name}</h3><span style={{background:"linear-gradient(135deg,var(--go),var(--gd))",color:"var(--w)",padding:"4px 12px",borderRadius:999,fontSize:13,fontWeight:700,boxShadow:"var(--sg)"}}>{r.matchScore}%</span></div>{r.reasons?.map((x,j)=><p key={j} style={{fontSize:14,color:"var(--cl)",lineHeight:1.6,paddingLeft:16,borderLeft:"2px solid var(--go)",marginBottom:6}}>✓ {x}</p>)}{r.consideration&&<p style={{fontSize:13,color:"var(--g)",marginTop:8,fontStyle:"italic",paddingLeft:16}}>⚠ {r.consideration}</p>}<p style={{fontSize:14,fontWeight:600,color:"var(--gd)",marginTop:10}}>{r.priceRange} · {r.capacity}</p></div>)}{res.tip&&<div style={{background:"linear-gradient(135deg,var(--gp),var(--cw))",border:"1px solid var(--gl)",borderRadius:12,padding:16,marginTop:6}}><p style={{fontSize:14,lineHeight:1.5}}>💡 <strong>Pro Tip:</strong> {res.tip}</p></div>}</div>}
  </div>);
}

function BudgetT(){const[t,sT]=useState(6e4);const[g,sG]=useState(150);const[res,sRes]=useState(null);
  const run=()=>{
    const tables=Math.ceil(g/10);const venuePercent=55;const venueAmt=Math.round(t*venuePercent/100);const perTable=Math.round(venueAmt/tables);
    const breakdown=[
      {category:"Venue & Banquet",amount:venueAmt,percentage:venuePercent,notes:`~$${perTable.toLocaleString()}++ per table of 10 (${tables} tables)`},
      {category:"Photography & Videography",amount:Math.round(t*.12),percentage:12,notes:"Pre-wedding shoot + actual day coverage"},
      {category:"Bridal & Groom Attire",amount:Math.round(t*.08),percentage:8,notes:"Wedding gown, evening dress, suit, accessories"},
      {category:"Décor & Flowers",amount:Math.round(t*.07),percentage:7,notes:"Table centrepieces, solemnisation arch, bridal bouquet"},
      {category:"Wedding Planner / Coordinator",amount:Math.round(t*.05),percentage:5,notes:"Day-of coordination or full planning"},
      {category:"Invitations & Favours",amount:Math.round(t*.03),percentage:3,notes:"Printed invitations, door gifts, table cards"},
      {category:"Entertainment & Emcee",amount:Math.round(t*.04),percentage:4,notes:"Live band or DJ, emcee, AV setup"},
      {category:"Miscellaneous & Buffer",amount:Math.round(t*.06),percentage:6,notes:"Transport, tips, last-minute extras"},
    ];
    const venueRange=perTable<1500?"Budget-friendly venues like JEN Tanglin ($1,288++/table) or Andaz ($1,688++/table)":perTable<2200?"Mid-range venues like Grand Hyatt ($1,688++), JW Marriott ($1,888++), or Fullerton Hotel ($1,988++)":perTable<2800?"Premium venues like Ritz-Carlton ($2,088++), Mandarin Oriental ($1,988++), or Four Seasons ($2,288++)":"Ultra-luxury venues like Raffles Hotel ($2,200++), St Regis ($2,388++), or Capella ($2,500++)";
    const angBao=perTable<1600?`Expect ~$120–$150 per guest in ang bao. With ${g} guests, estimated collection: $${Math.round(g*135).toLocaleString()}–$${Math.round(g*150).toLocaleString()}.`:perTable<2200?`Expect ~$150–$188 per guest in ang bao for a mid-range hotel. With ${g} guests, estimated collection: $${Math.round(g*150).toLocaleString()}–$${Math.round(g*188).toLocaleString()}.`:`Expect ~$188–$250 per guest in ang bao for a premium hotel. With ${g} guests, estimated collection: $${Math.round(g*188).toLocaleString()}–$${Math.round(g*250).toLocaleString()}.`;
    sRes({breakdown,venueGuidance:`At ~$${perTable.toLocaleString()}++ per table, consider: ${venueRange}.`,angBaoEstimate:angBao});
  };
  return(<div style={{background:"var(--w)",borderRadius:16,padding:28,boxShadow:"var(--sm)"}}>
    <h2 style={{fontFamily:"var(--fh)",fontSize:26,fontWeight:400,marginBottom:20,display:"flex",alignItems:"center",gap:8}}><Calculator size={20} style={{color:"var(--go)"}}/>Budget Calculator</h2>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:20}}>
      <div><label style={{fontSize:11,fontWeight:600,letterSpacing:".05em",textTransform:"uppercase",color:"var(--g)",display:"block",marginBottom:6}}>Total Budget: ${t.toLocaleString()}</label><input type="range" min={2e4} max={3e5} step={5e3} value={t} onChange={e=>sT(+e.target.value)} style={{width:"100%",accentColor:"var(--go)"}}/></div>
      <div><label style={{fontSize:11,fontWeight:600,letterSpacing:".05em",textTransform:"uppercase",color:"var(--g)",display:"block",marginBottom:6}}>Guests: {g}</label><input type="range" min={30} max={800} step={10} value={g} onChange={e=>sG(+e.target.value)} style={{width:"100%",accentColor:"var(--go)"}}/></div>
    </div>
    <button className="bg" onClick={run} style={{fontSize:15,padding:"13px 28px"}}><Calculator size={14}/>Calculate Budget</button>
    {res&&<div style={{marginTop:22}}>{res.breakdown.map((b,i)=><div key={i} style={{marginBottom:10,animation:`fU .4s ease ${i*60}ms both`}}><div style={{display:"flex",justifyContent:"space-between",fontSize:14,marginBottom:3}}><span>{b.category}</span><span style={{fontWeight:600}}>${b.amount?.toLocaleString()}</span></div><div style={{height:6,background:"var(--gg)",borderRadius:3}}><div style={{height:"100%",background:"var(--go)",borderRadius:3,width:`${b.percentage}%`,transition:"width .6s ease"}}/></div><p style={{fontSize:11,color:"var(--g)",marginTop:2}}>{b.notes}</p></div>)}{res.venueGuidance&&<div style={{background:"var(--gp)",borderRadius:12,padding:16,marginTop:14}}><p style={{fontSize:14,lineHeight:1.5}}>📍 {res.venueGuidance}</p></div>}{res.angBaoEstimate&&<div style={{background:"var(--iv)",borderRadius:12,padding:16,marginTop:10,border:"1px solid var(--gpa)"}}><p style={{fontSize:14,lineHeight:1.5}}>🧧 {res.angBaoEstimate}</p></div>}</div>}
  </div>);
}

function TimeT(){const[c,sC]=useState("ROM Solemnisation");const[r,sR]=useState("Dinner Banquet");const[res,sRes]=useState(null);
  const timelines={
    "ROM Solemnisation+Dinner Banquet":[{time:"06:00",event:"Hair & Makeup",notes:"Bride + bridesmaids begin preparation"},{time:"08:30",event:"Gate Crash Games",notes:"Groomsmen challenges at bride's home"},{time:"09:30",event:"Tea Ceremony (Bride's Side)",notes:"Serve tea to bride's parents and elders"},{time:"10:30",event:"Travel to Groom's Home",notes:"Bridal car procession"},{time:"11:00",event:"Tea Ceremony (Groom's Side)",notes:"Serve tea to groom's parents and elders"},{time:"12:00",event:"Lunch Break",notes:"Rest and retouch before evening"},{time:"14:00",event:"Pre-Wedding Photos",notes:"Outdoor shoot at venue or scenic location"},{time:"16:30",event:"Arrive at Venue",notes:"Final preparations and venue walkthrough"},{time:"17:30",event:"ROM Solemnisation Ceremony",notes:"Exchange of vows and rings, signing of documents"},{time:"18:00",event:"Cocktail Reception",notes:"Drinks, canapés, and guest photo wall"},{time:"19:00",event:"Grand March-In",notes:"Couple's entrance with music and spotlight"},{time:"19:15",event:"Yum Seng Toast",notes:"Champagne toast with guests"},{time:"19:30",event:"Dinner Service Begins",notes:"8–10 course Chinese banquet or Western set menu"},{time:"20:30",event:"Table Visits & Photos",notes:"Visit each table for photos with guests"},{time:"21:00",event:"Second March-In & Speeches",notes:"Outfit change, parent speeches, best man/maid of honour"},{time:"21:30",event:"Cake Cutting & Bouquet Toss",notes:"Traditional bouquet and garter toss"},{time:"22:00",event:"After-Party / Send-Off",notes:"Sparkler send-off or continued celebrations"}],
    "ROM Solemnisation+Lunch Banquet":[{time:"05:30",event:"Hair & Makeup",notes:"Early start for bride preparation"},{time:"07:30",event:"Gate Crash Games",notes:"Fun challenges for the groom's party"},{time:"08:30",event:"Tea Ceremony (Bride's Side)",notes:"Serve tea to bride's family"},{time:"09:30",event:"Tea Ceremony (Groom's Side)",notes:"Serve tea to groom's family"},{time:"10:30",event:"ROM Solemnisation",notes:"Exchange of vows and ring ceremony"},{time:"11:00",event:"Cocktail Reception",notes:"Welcome drinks and guest mingling"},{time:"11:45",event:"Grand March-In",notes:"Couple's entrance to the ballroom"},{time:"12:00",event:"Lunch Service Begins",notes:"8-course banquet or set lunch"},{time:"13:00",event:"Speeches & Yum Seng",notes:"Toasts from parents and friends"},{time:"13:30",event:"Table Visits",notes:"Greet all guests table by table"},{time:"14:00",event:"Cake Cutting & Bouquet Toss",notes:"Traditional celebrations"},{time:"14:30",event:"Send-Off",notes:"Thank guests at the door"}],
    "ROM Solemnisation+Cocktail":[{time:"06:00",event:"Hair & Makeup",notes:"Bride preparation begins"},{time:"08:30",event:"Gate Crash & Tea Ceremony",notes:"Combined morning traditions"},{time:"11:00",event:"Pre-Wedding Photos",notes:"Outdoor or studio shoot"},{time:"15:00",event:"Arrive at Venue",notes:"Setup and preparation"},{time:"16:00",event:"ROM Solemnisation",notes:"Garden or rooftop ceremony"},{time:"16:30",event:"Cocktail Reception Begins",notes:"Passed canapés, drink stations, live music"},{time:"17:30",event:"Speeches & Toasts",notes:"Intimate addresses from loved ones"},{time:"18:00",event:"Sunset Golden Hour Photos",notes:"Couple photos during golden hour"},{time:"19:00",event:"Dinner Stations Open",notes:"Buffet or live cooking stations"},{time:"20:00",event:"Cake Cutting & Dancing",notes:"First dance and party"},{time:"21:00",event:"Send-Off",notes:"Sparkler exit or farewell"}],
    "Church Wedding+Dinner Banquet":[{time:"06:00",event:"Hair & Makeup",notes:"Bride and bridesmaids preparation"},{time:"09:00",event:"Gate Crash Games",notes:"Traditional groomsmen challenges"},{time:"10:00",event:"Tea Ceremony",notes:"Both families' tea ceremony"},{time:"12:00",event:"Church Ceremony",notes:"Wedding service with hymns and vows"},{time:"13:30",event:"Lunch & Rest",notes:"Light lunch and afternoon rest"},{time:"15:00",event:"Pre-Banquet Photos",notes:"Couple and family portraits"},{time:"17:30",event:"Arrive at Banquet Venue",notes:"Final walkthrough"},{time:"18:00",event:"Cocktail Reception",notes:"Welcome drinks"},{time:"19:00",event:"Grand March-In",notes:"Couple's entrance"},{time:"19:15",event:"Yum Seng Toast",notes:"Champagne toast"},{time:"19:30",event:"Dinner Service",notes:"Banquet begins"},{time:"21:00",event:"Second March-In & Speeches",notes:"Outfit change, speeches"},{time:"21:30",event:"Cake Cutting & Bouquet Toss",notes:"Traditional celebrations"},{time:"22:00",event:"Send-Off",notes:"End of evening"}],
    "Garden Ceremony+Dinner Banquet":[{time:"06:00",event:"Hair & Makeup",notes:"Bride preparation"},{time:"08:30",event:"Gate Crash & Tea Ceremony",notes:"Morning traditions"},{time:"11:00",event:"Pre-Wedding Photos",notes:"Scenic outdoor locations"},{time:"16:00",event:"Arrive at Venue",notes:"Garden setup check"},{time:"17:00",event:"Garden Solemnisation",notes:"Outdoor ceremony under gazebo or arch"},{time:"17:30",event:"Cocktail Hour in Garden",notes:"Lawn drinks and canapés"},{time:"18:30",event:"Move Indoors",notes:"Guests transition to reception"},{time:"19:00",event:"Grand March-In",notes:"Couple's entrance"},{time:"19:15",event:"Yum Seng & Dinner",notes:"Toast and banquet service"},{time:"20:30",event:"Speeches & Table Visits",notes:"Parent and friend speeches"},{time:"21:00",event:"Cake Cutting",notes:"Traditional celebrations"},{time:"21:30",event:"After-Party / Send-Off",notes:"Dancing or sparkler exit"}],
  };
  const key=c+"+"+r;const tl=timelines[key]||timelines["ROM Solemnisation+Dinner Banquet"];
  const run=()=>sRes({timeline:tl,tips:["Build in 30-minute buffers between key events — Singapore traffic and weather are unpredictable.","Brief your photographer on the timeline so they can plan lighting for each location.","Have a backup indoor option for any outdoor ceremony — tropical rain can appear without warning."]});
  return(<div style={{background:"var(--w)",borderRadius:16,padding:28,boxShadow:"var(--sm)"}}>
    <h2 style={{fontFamily:"var(--fh)",fontSize:26,fontWeight:400,marginBottom:20,display:"flex",alignItems:"center",gap:8}}><CalendarDays size={20} style={{color:"var(--go)"}}/>Timeline Generator</h2>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:20}}>
      <div><label style={{fontSize:11,fontWeight:600,letterSpacing:".05em",textTransform:"uppercase",color:"var(--g)",display:"block",marginBottom:6}}>Ceremony</label><select className="inp" value={c} onChange={e=>sC(e.target.value)}><option>ROM Solemnisation</option><option>Church Wedding</option><option>Garden Ceremony</option></select></div>
      <div><label style={{fontSize:11,fontWeight:600,letterSpacing:".05em",textTransform:"uppercase",color:"var(--g)",display:"block",marginBottom:6}}>Reception</label><select className="inp" value={r} onChange={e=>sR(e.target.value)}><option>Dinner Banquet</option><option>Lunch Banquet</option><option>Cocktail</option></select></div>
    </div>
    <button className="bg" onClick={run} style={{fontSize:15,padding:"13px 28px"}}><CalendarDays size={14}/>Generate Timeline</button>
    {res&&<div style={{marginTop:22}}>
      <div style={{paddingLeft:20,borderLeft:"2px solid var(--gl)"}}>{res.timeline.map((e,i)=><div key={i} style={{marginBottom:14,paddingLeft:16,position:"relative",animation:`fU .3s ease ${i*40}ms both`}}><div style={{position:"absolute",left:-27,top:3,width:10,height:10,borderRadius:"50%",background:"var(--go)",border:"2px solid var(--w)"}}/><div style={{display:"flex",gap:10,alignItems:"baseline"}}><span style={{fontWeight:700,fontSize:14,color:"var(--gd)",minWidth:44}}>{e.time}</span><div><p style={{fontWeight:600,fontSize:14}}>{e.event}</p><p style={{fontSize:12,color:"var(--cl)"}}>{e.notes}</p></div></div></div>)}</div>
      {res.tips&&<div style={{background:"linear-gradient(135deg,var(--gp),var(--cw))",borderRadius:12,padding:16,marginTop:16}}><p style={{fontSize:13,fontWeight:600,color:"var(--gd)",marginBottom:6}}>💡 Planning Tips</p>{res.tips.map((t,i)=><p key={i} style={{fontSize:13,color:"var(--cl)",lineHeight:1.5,marginBottom:4}}>• {t}</p>)}</div>}
    </div>}
  </div>);
}

function CompT(){const[sel,sSel]=useState([]);const[res,sRes]=useState(null);
  const tog=id=>sSel(s=>s.includes(id)?s.filter(x=>x!==id):s.length<3?[...s,id]:s);
  const run=()=>{if(sel.length<2)return;
    const scored=sel.map(id=>{const v=VENUES.find(x=>x.id===id);
      const capScore=Math.min(10,Math.round(v.capacity.s/100));
      const valScore=v.price.unit==="guest"?Math.round(10-(v.price.min-100)/20):Math.round(10-(v.price.min-1200)/250);
      const cuisineScore=Math.min(10,v.cuisine.length*3+4);
      const ambianceScore=Math.round(v.rating*2);
      const accessScore=["Orchard","City Hall","Marina Bay","Raffles Place","Bugis","Tanglin","Clarke Quay","Marina Centre"].includes(v.area)?9:v.area==="Sentosa"?6:7;
      const uniqueScore=v.managed?9:["heritage","garden","waterfront","beachfront"].includes(v.cat)?8:v.cat==="rooftop"?9:6;
      return{venue:v.name,scores:{capacity:Math.max(3,Math.min(10,capScore)),value:Math.max(3,Math.min(10,valScore)),cuisine:Math.max(4,Math.min(10,cuisineScore)),ambiance:Math.max(5,Math.min(10,ambianceScore)),accessibility:accessScore,uniqueness:uniqueScore},
        bestFor:v.bestFor[0],standout:v.managed?`Managed by 1-Host with dedicated wedding coordination`:v.capacity.s>=500?`Grand scale — accommodates up to ${v.capacity.s} seated guests`:v.solemn?`Licensed for on-site ROM solemnisation`:`${v.catLabel} setting`};
    });
    const winner=scored.reduce((a,b)=>{const aTotal=Object.values(a.scores).reduce((s,v)=>s+v,0);const bTotal=Object.values(b.scores).reduce((s,v)=>s+v,0);return aTotal>=bTotal?a:b});
    sRes({comparison:scored,verdict:`${winner.venue} edges ahead overall, but the best choice depends on your priorities. Visit all shortlisted venues in person before deciding — photos never tell the full story.`});
  };
  return(<div style={{background:"var(--w)",borderRadius:16,padding:28,boxShadow:"var(--sm)"}}>
    <h2 style={{fontFamily:"var(--fh)",fontSize:26,fontWeight:400,marginBottom:14,display:"flex",alignItems:"center",gap:8}}><GitCompareArrows size={20} style={{color:"var(--go)"}}/>Venue Comparison</h2>
    <p style={{fontSize:13,color:"var(--g)",marginBottom:16}}>Select 2–3 venues to compare side by side.</p>
    <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:20,maxHeight:150,overflowY:"auto"}}>{VENUES.map(v=><button key={v.id} className={`cp ${sel.includes(v.id)?"a":""}`} onClick={()=>tog(v.id)} style={{fontSize:12,padding:"5px 12px"}}>{v.name}</button>)}</div>
    <button className="bg" onClick={run} disabled={sel.length<2} style={{fontSize:15,padding:"13px 28px"}}><GitCompareArrows size={14}/>Compare {sel.length} Venues</button>
    {res&&<div style={{marginTop:22}}><div style={{display:"grid",gridTemplateColumns:`repeat(${res.comparison.length},1fr)`,gap:14}}>{res.comparison.map((c,i)=><div key={i} style={{background:"var(--iv)",borderRadius:14,padding:20,animation:`cardEnter .5s ease ${i*120}ms both`,border:"1px solid var(--gpa)"}}><h3 style={{fontFamily:"var(--fh)",fontSize:18,fontWeight:500,marginBottom:12}}>{c.venue}</h3>{Object.entries(c.scores).map(([k,val])=><div key={k} style={{marginBottom:8}}><div style={{display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:2}}><span style={{textTransform:"capitalize"}}>{k}</span><span style={{fontWeight:600,color:"var(--gd)"}}>{val}/10</span></div><div style={{height:5,background:"var(--gg)",borderRadius:3}}><div style={{height:"100%",background:"var(--go)",borderRadius:3,width:`${val*10}%`,transition:"width .6s ease"}}/></div></div>)}<p style={{fontSize:12,color:"var(--cl)",marginTop:10,paddingTop:10,borderTop:"1px solid var(--gpa)"}}>🎯 {c.bestFor}</p><p style={{fontSize:11,color:"var(--g)",marginTop:4}}>✦ {c.standout}</p></div>)}</div>{res.verdict&&<div style={{background:"linear-gradient(135deg,var(--gp),var(--cw))",borderRadius:12,padding:16,marginTop:14}}><p style={{fontSize:14,lineHeight:1.5}}>🏆 {res.verdict}</p></div>}</div>}
  </div>);
}

// ── ASK AI ────────────────────────────────────────────────────────────────
function AskAI({show,toggle}){const[msgs,sMs]=useState([]);const[inp,sInp]=useState("");const[ld,sLd]=useState(false);
  const send=async()=>{if(!inp.trim()||ld)return;const q=inp.trim();sInp("");sMs(m=>[...m,{r:"u",t:q}]);sLd(true);try{const text=await callAI(`AI wedding concierge for singaporeweddingvenues.net. ${VENUES.length} venues:\n${VK}\nWarm, concise (<150 words), specific. Singapore terms. Prices in SGD with ++.`,q);sMs(m=>[...m,{r:"a",t:text}])}catch{sMs(m=>[...m,{r:"a",t:"Sorry, try again!"}])}sLd(false)};
  if(!show)return<button onClick={toggle} style={{position:"fixed",bottom:24,right:24,width:52,height:52,borderRadius:"50%",background:"linear-gradient(135deg,var(--go),var(--gd))",border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",color:"var(--w)",boxShadow:"var(--sl)",zIndex:45,animation:"pu 3s infinite"}} aria-label="Ask AI"><MessageCircle size={21}/></button>;
  return(<div style={{position:"fixed",bottom:24,right:24,width:350,maxWidth:"calc(100vw - 48px)",height:420,background:"var(--w)",borderRadius:14,boxShadow:"var(--sx)",display:"flex",flexDirection:"column",zIndex:50,overflow:"hidden",animation:"fU .3s ease"}}>
    <div style={{background:"linear-gradient(135deg,var(--go),var(--gd))",padding:"12px 16px",display:"flex",justifyContent:"space-between",alignItems:"center",color:"var(--w)"}}><span style={{fontWeight:600,fontSize:14,display:"flex",alignItems:"center",gap:5}}><Sparkles size={15}/>Ask AI Concierge</span><button onClick={toggle} style={{background:"none",border:"none",color:"var(--w)",cursor:"pointer"}}><X size={15}/></button></div>
    <div style={{flex:1,overflow:"auto",padding:12,display:"flex",flexDirection:"column",gap:8}}>
      {msgs.length===0&&<p style={{fontSize:13,color:"var(--g)",textAlign:"center",marginTop:32}}>Ask about wedding venues! 💒</p>}
      {msgs.map((m,i)=><div key={i} style={{alignSelf:m.r==="u"?"flex-end":"flex-start",maxWidth:"80%",background:m.r==="u"?"var(--go)":"var(--gg)",color:m.r==="u"?"var(--w)":"var(--c)",padding:"8px 12px",borderRadius:10,fontSize:13,lineHeight:1.5}}>{m.t}</div>)}
      {ld&&<div style={{display:"flex",gap:3,padding:6}}>{[0,1,2].map(i=><div key={i} style={{width:6,height:6,borderRadius:"50%",background:"var(--ro)",animation:`fl 1s ease-in-out ${i*.15}s infinite`}}/>)}</div>}
    </div>
    <div style={{padding:"8px 12px",borderTop:"1px solid var(--gpa)",display:"flex",gap:6}}>
      <input className="inp" value={inp} onChange={e=>sInp(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder="Ask about venues..." style={{flex:1,fontSize:13,padding:"7px 10px"}}/>
      <button onClick={send} className="bg" style={{padding:"7px 11px"}}><Send size={13}/></button>
    </div>
  </div>);
}

// ═════════════════════════════════════════════════════════════════════════
// OTHER PAGES
// ═════════════════════════════════════════════════════════════════════════
function RWPage({go}){return(<section style={{padding:"44px 24px 72px",background:"var(--cr)"}}><div style={{maxWidth:1200,margin:"0 auto"}}><h1 style={{fontFamily:"var(--fh)",fontSize:"clamp(28px,4vw,40px)",fontWeight:300,marginBottom:8}}>Real Weddings</h1><p style={{color:"var(--g)",fontSize:14,maxWidth:560,marginBottom:32}}>Be inspired by celebrations across Singapore's finest venues — luxury hotels, rooftop ceremonies, and heritage garden affairs.</p><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:18}}>{WEDDINGS.map((s,i)=>{const v=VENUES.find(x=>x.id===s.vid);return<RWCd key={i} s={s} v={v} go={go}/>})}</div></div></section>);}

function Shows(){return(<section style={{padding:"48px 24px 80px",background:"var(--cr)"}}><div style={{maxWidth:860,margin:"0 auto",textAlign:"center"}}>
  <h1 style={{fontFamily:"var(--fh)",fontSize:"clamp(28px,4vw,40px)",fontWeight:300,marginBottom:12}}>Wedding Showcases</h1>
  <p style={{color:"var(--g)",fontSize:14,maxWidth:520,margin:"0 auto 40px"}}>Visit venues in person, meet events teams, and enjoy exclusive showcase-only wedding packages.</p>
  <div style={{background:"var(--w)",borderRadius:16,padding:"48px 32px",boxShadow:"var(--ss)",animation:"cardEnter .6s ease"}}>
    <CalendarDays size={40} style={{color:"var(--go)",marginBottom:16}}/>
    <h2 style={{fontFamily:"var(--fh)",fontSize:24,fontWeight:400,marginBottom:10}}>Coming Soon</h2>
    <p style={{color:"var(--cl)",fontSize:14,lineHeight:1.7,maxWidth:400,margin:"0 auto 20px"}}>We're finalising our upcoming wedding showcase calendar for 2026. Check back soon for exclusive showcase events at our partner venues across Singapore.</p>
    <p style={{fontSize:13,color:"var(--g)"}}>Interested in being notified? Drop us a line at <a href="mailto:hello@singaporeweddingvenues.net" style={{color:"var(--gd)",fontWeight:600}}>hello@singaporeweddingvenues.net</a></p>
  </div>
</div></section>);}

function Abt(){return(<section style={{padding:"44px 24px 72px",background:"var(--cr)"}}><div style={{maxWidth:860,margin:"0 auto"}}><h1 style={{fontFamily:"var(--fh)",fontSize:"clamp(28px,4vw,40px)",fontWeight:300,marginBottom:18,textAlign:"center"}}>About Singapore Wedding Venues</h1><p style={{fontSize:15,lineHeight:1.8,color:"var(--cl)",textAlign:"center",maxWidth:660,margin:"0 auto 36px"}}>Singapore Wedding Venues is the city-state's premier AI-powered venue discovery platform. We feature {VENUES.length} of Singapore's most iconic wedding venues — from legendary five-star hotels to intimate rooftop restaurants and heritage garden estates.</p><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:18,marginBottom:44}}>{[{ic:Sparkles,t:"AI-Powered",d:`Match from ${VENUES.length} venues in seconds.`},{ic:Building2,t:`${VENUES.length} Iconic Venues`,d:"Hotels, rooftops, heritage, gardens — every style covered."},{ic:Crown,t:"1-Host Collection",d:"10 signature venues with 6,500+ weddings of dedicated experience."},{ic:Award,t:"Trusted Platform",d:"Real reviews, transparent pricing, AI-powered comparison tools."}].map((v,i)=><div key={i} style={{background:"var(--w)",borderRadius:12,padding:22,textAlign:"center",boxShadow:"var(--ss)"}}><v.ic size={26} style={{color:"var(--go)",marginBottom:10}}/><h3 style={{fontFamily:"var(--fh)",fontSize:18,fontWeight:500,marginBottom:6}}>{v.t}</h3><p style={{fontSize:13,color:"var(--cl)",lineHeight:1.5}}>{v.d}</p></div>)}</div><div style={{background:"var(--w)",borderRadius:14,padding:28,boxShadow:"var(--ss)",maxWidth:500,margin:"0 auto"}}><h2 style={{fontFamily:"var(--fh)",fontSize:24,fontWeight:400,marginBottom:16,textAlign:"center"}}>Get in Touch</h2><div style={{display:"flex",flexDirection:"column",gap:10}}><input className="inp" placeholder="Your Name"/><input className="inp" placeholder="Email" type="email"/><textarea className="inp" placeholder="Tell us about your dream wedding…" rows={3} style={{resize:"vertical"}}/><button className="bg" style={{alignSelf:"center",padding:"11px 28px"}}><Send size={13}/>Send</button></div></div></div></section>);}

function Ftr({go}){return(<footer style={{background:"var(--c)",color:"var(--gi)",padding:"52px 24px 24px"}} role="contentinfo"><div style={{maxWidth:1200,margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(170px,1fr))",gap:32,marginBottom:36}}><div><h4 style={{fontFamily:"var(--fh)",color:"var(--w)",fontSize:17,marginBottom:12}}>Singapore Wedding Venues</h4><p style={{fontSize:12,lineHeight:1.6}}>{VENUES.length} iconic venues — luxury hotels, rooftop restaurants, heritage mansions, garden estates.</p><div style={{display:"flex",gap:10,marginTop:12}}><a href="https://www.facebook.com/1Host/" target="_blank" rel="noopener noreferrer" style={{color:"var(--gi)"}}><Facebook size={15}/></a><a href="https://www.instagram.com/1_host/" target="_blank" rel="noopener noreferrer" style={{color:"var(--gi)"}}><Instagram size={15}/></a><a href="mailto:hello@singaporeweddingvenues.net" style={{color:"var(--gi)"}}><Mail size={15}/></a></div></div><div><h4 style={{color:"var(--w)",fontSize:12,fontWeight:600,letterSpacing:".04em",textTransform:"uppercase",marginBottom:12}}>1-Host Collection</h4>{VENUES.filter(v=>v.managed).slice(0,6).map(v=><p key={v.id} style={{fontSize:11,marginBottom:5,cursor:"pointer"}} onClick={()=>go("venues",v)}>{v.name}</p>)}</div><div><h4 style={{color:"var(--w)",fontSize:12,fontWeight:600,letterSpacing:".04em",textTransform:"uppercase",marginBottom:12}}>Hotels</h4>{VENUES.filter(v=>v.cat==="hotel"&&!v.managed).slice(0,6).map(v=><p key={v.id} style={{fontSize:11,marginBottom:5,cursor:"pointer"}} onClick={()=>go("venues",v)}>{v.name}</p>)}</div><div><h4 style={{color:"var(--w)",fontSize:12,fontWeight:600,letterSpacing:".04em",textTransform:"uppercase",marginBottom:12}}>AI Tools</h4>{["Venue Matchmaker","Budget Calculator","Timeline Generator","Venue Comparison","Ask AI"].map(t=><p key={t} style={{fontSize:11,marginBottom:5,cursor:"pointer"}} onClick={()=>go("ai-tools")}>{t}</p>)}</div></div><div style={{borderTop:"1px solid rgba(255,255,255,.1)",paddingTop:18,textAlign:"center",fontSize:11,color:"var(--g)"}}><p>© 2026 Singapore Wedding Venues · {VENUES.length} iconic venues · Made with <Sparkles size={10} style={{display:"inline",verticalAlign:"middle",color:"var(--go)"}}/> AI</p></div></footer>);}
