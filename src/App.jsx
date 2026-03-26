import { useState, useEffect, useRef } from "react";
import { Heart, MapPin, Users, ChevronRight, ChevronLeft, Star, Sparkles, Calculator, CalendarDays, GitCompareArrows, MessageCircle, X, Menu, ArrowUp, Send, TreePine, Building2, Sunset, Landmark, Waves, UtensilsCrossed, Check, Instagram, Facebook, Mail, Crown, Award } from "lucide-react";

/* Singapore Wedding Venues — singaporeweddingvenues.net
   Singapore's Premier AI-Powered Wedding Venue Discovery Platform
   28 venues: 10 × 1-Host Collection + 18 × Major Hotels & Heritage */

const VENUES=[
{id:"1-alfaro",name:"1-Alfaro",tagline:"The Lighthouse",isNew:true,managed:"1-Host",location:"Labrador Tower Level 34, 1 Pasir Panjang Rd, S118479",area:"Pasir Panjang",description:"Singapore's latest rooftop wedding venue. Meaning 'The Lighthouse' in Italian, 1-Alfaro features floor-to-ceiling glass walls, panoramic city-and-sea views, and the world's highest agrivoltaics farm-to-table concept with authentic Emilia-Romagna flavours by the MONTI team.",capacity:{s:120,st:320},setting:"Indoor & Outdoor",cuisine:["Modern Italian","Farm-to-Table"],price:{min:1400,max:1850,unit:"guest"},budget:{l:"$140–$165++",d:"$160–$185++"},cat:"rooftop",catLabel:"Rooftop · Sky Dining",featured:true,solemn:true,rating:4.9,img:"https://www.1-host.sg/wp-content/uploads/2024/12/this-Host-featured-image-wordpress-794-x-1150-px-4-x-5-in-467-x-632-px-2-1.jpg",hero:"https://www.1-host.sg/wp-content/uploads/2024/12/1-Host-Wordpress-Main-Banner-2.jpg",gallery:["https://www.1-host.sg/wp-content/uploads/2024/12/2-5.jpg","https://www.1-host.sg/wp-content/uploads/2024/12/1-5.jpg","https://www.1-host.sg/wp-content/uploads/2024/12/3-5.jpg","https://www.1-host.sg/wp-content/uploads/2024/12/4-4.jpg"],bestFor:["Rooftop solemnisation with sea views","Italian farm-to-table dinner","Intimate 120-guest celebration"],web:"https://www.1-host.sg/venues/1-alfaro/"},
{id:"1-arden",name:"1-Arden",tagline:"Sky Garden · Level 51",managed:"1-Host",location:"Level 51, CapitaSpring, 88 Market St, S048948",area:"Raffles Place",description:"Tie the knot overlooking sweeping sunset views from the world's highest food forest at Level 51 of CapitaSpring. Helmed by Executive Chef John-Paul Fiechtner with Coastal Australian cuisine — wild-caught, sustainably raised produce in farm-to-table dishes.",capacity:{s:230,st:350},setting:"Indoor & Outdoor",cuisine:["Coastal Australian","Farm-to-Table"],price:{min:1400,max:1850,unit:"guest"},budget:{l:"$140–$165++",d:"$160–$185++"},cat:"rooftop",catLabel:"Rooftop · Sky Garden",featured:true,solemn:true,rating:4.8,img:"https://www.1-host.sg/wp-content/uploads/2022/01/Arden_Website-Featured.png",hero:"https://www.1-host.sg/wp-content/uploads/2022/01/Arden-Hero-Image.png",gallery:["https://www.1-host.sg/wp-content/uploads/2022/01/1.jpg","https://www.1-host.sg/wp-content/uploads/2022/01/2.jpg","https://www.1-host.sg/wp-content/uploads/2022/01/1-Arden-Wedding-Outdoor.jpg","https://www.1-host.sg/wp-content/uploads/2022/01/1-Arden-Wedding-Night.jpg"],bestFor:["Sunset sky garden solemnisation","Grand reception up to 230 guests","Farm-to-table Australian cuisine"],web:"https://www.1-host.sg/venues/wedding-1-arden/"},
{id:"monti",name:"Monti",tagline:"Marina Bay Waterfront",managed:"1-Host",location:"Fullerton Pavilion, 82 Collyer Quay, S049327",area:"Marina Bay",description:"Chic, luxe, and intimate with breathtaking Marina Bay views. Solemnisations on the iconic spherical dome are a dream for couples seeking a swanky city soirée. Award-winning Italian cuisine. Glamorous, stylish, and unforgettable.",capacity:{s:180,st:420},setting:"Indoor & Outdoor",cuisine:["Italian","Mediterranean"],price:{min:1400,max:1850,unit:"guest"},budget:{l:"$140–$165++",d:"$160–$185++"},cat:"waterfront",catLabel:"Waterfront · Iconic",featured:true,solemn:true,rating:4.9,img:"https://www.1-host.sg/wp-content/uploads/2021/01/this-Host-featured-image-wordpress-794-x-1150-px-4-x-5-in-467-x-632-px-1.jpg",hero:"https://www.1-host.sg/wp-content/uploads/2021/01/1-host-Wordpress-header-5.jpg",gallery:["https://www.1-host.sg/wp-content/uploads/2021/01/Wordpress-images-2560-x-1709-px-22.jpg","https://www.1-host.sg/wp-content/uploads/2021/01/Monti_7.jpg","https://www.1-host.sg/wp-content/uploads/2021/01/MONTI-2-2.jpg"],bestFor:["Iconic Marina Bay solemnisation","Italian waterfront dinner","Glamorous city soirée"],web:"https://www.1-host.sg/venues/wedding-monti/"},
{id:"1-flowerhill",name:"1-Flowerhill",tagline:"Heritage on Sentosa",managed:"1-Host",location:"6 Imbiah Rd, Sentosa, S099696",area:"Sentosa",description:"Century-old heritage building at Sentosa Sensoryscape. Charming colonial arches, green-and-white balustrades, spiral staircases under lush tropical foliage. Heritage meets garden paradise.",capacity:{s:90,st:150},setting:"Indoor & Outdoor",cuisine:["Modern European"],price:{min:1400,max:1850,unit:"guest"},budget:{l:"$140–$165++",d:"$160–$185++"},cat:"heritage",catLabel:"Heritage · Garden",featured:true,solemn:true,rating:4.7,img:"https://www.1-host.sg/wp-content/uploads/2024/01/Untitled-design-1.jpg",hero:"https://www.1-host.sg/wp-content/uploads/2024/01/Untitled-design-1.jpg",gallery:[],bestFor:["Intimate heritage garden ceremony","Colonial-charm solemnisation","Sentosa island escape"],web:"https://www.1-host.sg/venues/1-flowerhill/"},
{id:"1-atico",name:"1-Atico",tagline:"Orchard Skyline",managed:"1-Host",location:"ION Orchard, S238801",area:"Orchard",description:"Perched atop ION Orchard. Panoramic skyline views with modern sophistication. City lights become your wedding décor. Couples praise the breathtaking view and seamless coordination.",capacity:{s:120,st:200},setting:"Indoor & Outdoor",cuisine:["International","Modern European"],price:{min:1400,max:1850,unit:"guest"},budget:{l:"$140–$165++",d:"$160–$185++"},cat:"rooftop",catLabel:"Rooftop · Sky Dining",featured:true,solemn:true,rating:4.8,img:"https://www.1-host.sg/wp-content/uploads/2021/01/Atico_Website-Featured-1.png",hero:"https://www.1-host.sg/wp-content/uploads/2021/01/Atico_Website-Featured-1.png",gallery:[],bestFor:["Glamorous Orchard celebration","Panoramic skyline solemnisation","Modern sophisticated reception"],web:"https://www.1-host.sg/venues/wedding-1-atico/"},
{id:"1-altitude-coast",name:"1-Altitude Coast",tagline:"Sentosa Seascapes",managed:"1-Host",location:"The Outpost Hotel, Sentosa",area:"Sentosa",description:"Panoramic seascapes from Sentosa's highest vantage point. Sun, sea, and sky for magical beachfront celebrations.",capacity:{s:80,st:200},setting:"Outdoor",cuisine:["International","Western"],price:{min:1400,max:1850,unit:"guest"},budget:{l:"$140–$165++",d:"$160–$185++"},cat:"beachfront",catLabel:"Beachfront",featured:false,solemn:true,rating:4.6,img:"https://www.1-host.sg/wp-content/uploads/2021/01/1-AC_Website-Featured-1-e1720493055549.png",hero:"https://www.1-host.sg/wp-content/uploads/2021/01/1-AC_Website-Featured-1-e1720493055549.png",gallery:[],bestFor:["Beachfront sunset solemnisation","Coastal cocktail reception","Island getaway wedding"],web:"https://www.1-host.sg/venues/wedding-1-altitude-coast/"},
{id:"alkaff-mansion",name:"The Alkaff Mansion",tagline:"Heritage Hilltop Estate",managed:"1-Host",location:"10 Telok Blangah Green, S109178",area:"Telok Blangah",description:"Lovingly restored hilltop mansion surrounded by lush tropical gardens. Heritage romance — covered verandahs, ivy-draped walls, worlds away from the city yet minutes from it.",capacity:{s:200,st:300},setting:"Indoor & Outdoor",cuisine:["Mediterranean","International"],price:{min:1400,max:1850,unit:"guest"},budget:{l:"$140–$165++",d:"$160–$185++"},cat:"heritage",catLabel:"Heritage · Garden",featured:false,solemn:true,rating:4.7,img:"https://www.1-host.sg/wp-content/uploads/2021/01/tam.jpg",hero:"https://www.1-host.sg/wp-content/uploads/2021/01/tam.jpg",gallery:[],bestFor:["Heritage garden wedding","Romantic verandah solemnisation","Rustic-elegant reception"],web:"https://www.1-host.sg/venues/wedding-the-alkaff-mansion/"},
{id:"the-riverhouse",name:"The Riverhouse",tagline:"Clarke Quay Waterfront",managed:"1-Host",location:"3A River Valley Rd, S179020",area:"Clarke Quay",description:"Modern-meets-traditional aesthetics along the Singapore River. Intimate yet never compromising on style, location, or cosiness.",capacity:{s:100,st:200},setting:"Indoor & Outdoor",cuisine:["Chinese","International"],price:{min:1400,max:1850,unit:"guest"},budget:{l:"$140–$165++",d:"$160–$185++"},cat:"waterfront",catLabel:"Waterfront · Heritage",featured:false,solemn:true,rating:4.7,img:"https://www.1-host.sg/wp-content/uploads/2021/01/Riverhouse_Website-Featured.png",hero:"https://www.1-host.sg/wp-content/uploads/2021/01/Riverhouse_Website-Featured.png",gallery:[],bestFor:["Intimate riverside ceremony","Chinese banquet reception","Modern-heritage celebration"],web:"https://www.1-host.sg/venues/wedding-the-riverhouse/"},
{id:"the-summerhouse",name:"The Summerhouse",tagline:"Garden Estate",managed:"1-Host",location:"3 Park Lane, S798387",area:"Seletar",description:"European-style estate surrounded by greenery and edible gardens. Fairy lights, elegant terraces, and a magical gazebo for romantic ceremonies.",capacity:{s:100,st:180},setting:"Outdoor",cuisine:["Modern European","Farm-to-Table"],price:{min:1400,max:1850,unit:"guest"},budget:{l:"$140–$165++",d:"$160–$185++"},cat:"garden",catLabel:"Garden · Estate",featured:false,solemn:true,rating:4.6,img:"https://www.1-host.sg/wp-content/uploads/2021/01/Host-featured-image-wordpress-794-x-1150-px-5-e1720491106172.jpg",hero:"https://www.1-host.sg/wp-content/uploads/2021/01/Host-featured-image-wordpress-794-x-1150-px-5-e1720491106172.jpg",gallery:[],bestFor:["Garden gazebo ceremony","Farm-to-table dinner","Nature-wrapped celebration"],web:"https://www.1-host.sg/venues/wedding-the-summerhouse/"},
{id:"the-garage",name:"The Garage",tagline:"Botanic Gardens Heritage",managed:"1-Host",location:"50 Cluny Park Rd, S257488",area:"Botanic Gardens",description:"Within Singapore's UNESCO World Heritage Botanic Gardens. 1920s Art Deco conservation building — forest-wedding-under-the-stars atmosphere with modern indoor comforts.",capacity:{s:90,st:150},setting:"Indoor & Outdoor",cuisine:["Modern European"],price:{min:1400,max:1850,unit:"guest"},budget:{l:"$140–$165++",d:"$160–$185++"},cat:"garden",catLabel:"Garden · Heritage",featured:false,solemn:true,rating:4.6,img:"https://www.1-host.sg/wp-content/uploads/2021/01/this-Host-featured-image-wordpress-794-x-1150-px-4-x-5-in-467-x-632-px-2-1.jpg",hero:"https://www.1-host.sg/wp-content/uploads/2021/01/this-Host-featured-image-wordpress-794-x-1150-px-4-x-5-in-467-x-632-px-2-1.jpg",gallery:[],bestFor:["UNESCO heritage garden wedding","Art Deco setting","Forest-under-the-stars reception"],web:"https://www.1-host.sg/venues/wedding-at-the-garage/"},
// ── LUXURY HOTELS ──
{id:"raffles-hotel",name:"Raffles Hotel Singapore",tagline:"Timeless Elegance Since 1887",location:"1 Beach Rd, S189673",area:"City Hall",description:"Singapore's most storied luxury hotel. From intimate garden solemnisations beneath tropical palms to grand banquets in the ornate Raffles Ballroom with 7-metre ceilings. Over 130 years of heritage elegance.",capacity:{s:500,st:600},setting:"Indoor & Outdoor",cuisine:["International","Western","Chinese"],price:{min:2200,max:3200,unit:"table"},budget:{l:"$2,200++",d:"$2,800–$3,200++"},cat:"hotel",catLabel:"Luxury Hotel",featured:true,solemn:true,rating:4.9,img:null,hero:null,gallery:[],bestFor:["Grand heritage ballroom wedding","Tropical courtyard solemnisation","Iconic Singapore celebration"],web:"https://www.raffles.com/singapore/weddings/"},
{id:"fullerton-hotel",name:"The Fullerton Hotel Singapore",tagline:"Neoclassical Marina Bay",location:"1 Fullerton Square, S049178",area:"Marina Bay",description:"Magnificent neoclassical landmark overlooking Marina Bay. The Straits Room offers pillarless grandeur; the rooftop pool deck provides sunset solemnisations with the city skyline as witness.",capacity:{s:400,st:500},setting:"Indoor & Outdoor",cuisine:["International","Western","Chinese"],price:{min:1988,max:2888,unit:"table"},budget:{l:"$1,988++",d:"$2,388–$2,888++"},cat:"hotel",catLabel:"Luxury Hotel · Heritage",featured:true,solemn:true,rating:4.8,img:null,hero:null,gallery:[],bestFor:["Heritage waterfront ballroom","Rooftop pool ceremony","Art Deco photography backdrop"],web:"https://www.fullertonhotels.com/fullerton-hotel-singapore/weddings"},
{id:"capella",name:"Capella Singapore",tagline:"Sentosa Resort by Foster + Partners",location:"1 The Knolls, Sentosa, S098297",area:"Sentosa",description:"Designed by Sir Norman Foster amid 30 acres of rainforest. Colonial grandeur meets contemporary luxury. Private estate celebrations with verdant lawns and cascading water features.",capacity:{s:280,st:400},setting:"Indoor & Outdoor",cuisine:["International","Chinese","Modern European"],price:{min:2500,max:3500,unit:"table"},budget:{l:"$2,500++",d:"$3,000–$3,500++"},cat:"hotel",catLabel:"Luxury Resort",featured:false,solemn:true,rating:4.9,img:null,hero:null,gallery:[],bestFor:["Ultra-private island estate wedding","Tropical garden celebration","World-class resort experience"],web:"https://www.capellahotels.com/en/capella-singapore"},
{id:"mbs",name:"Marina Bay Sands",tagline:"Asia's Grandest Stage",location:"10 Bayfront Ave, S018956",area:"Marina Bay",description:"The architectural marvel defining Singapore's skyline. Sands Grand Ballroom hosts up to 2,500 guests — Asia's largest. SkyPark ceremonies 200m above the bay. Unmistakably spectacular.",capacity:{s:2500,st:3000},setting:"Indoor",cuisine:["International","Chinese","Western","Halal"],price:{min:1688,max:2688,unit:"table"},budget:{l:"$1,688++",d:"$2,088–$2,688++"},cat:"hotel",catLabel:"Luxury Hotel · Iconic",featured:true,solemn:true,rating:4.7,img:null,hero:null,gallery:[],bestFor:["Grand-scale banquet (500+ guests)","SkyPark rooftop ceremony","Iconic landmark celebration"],web:"https://www.marinabaysands.com/weddings.html"},
{id:"shangri-la",name:"Shangri-La Singapore",tagline:"15 Acres of Gardens",location:"22 Orange Grove Rd, S258350",area:"Orchard",description:"15 acres of lush tropical gardens. The legendary Island Ballroom fits 800 guests. Garden terraces and waterfall settings offer serene alternatives for intimate celebrations.",capacity:{s:800,st:1000},setting:"Indoor & Outdoor",cuisine:["International","Chinese","Western"],price:{min:1888,max:2588,unit:"table"},budget:{l:"$1,888++",d:"$2,188–$2,588++"},cat:"hotel",catLabel:"Luxury Hotel · Garden",featured:false,solemn:true,rating:4.8,img:null,hero:null,gallery:[],bestFor:["Grand ballroom wedding (800 guests)","Tropical garden solemnisation","Waterfall terrace ceremony"],web:"https://www.shangri-la.com/singapore/shangrila/weddings/"},
{id:"ritz-carlton",name:"The Ritz-Carlton, Millenia",tagline:"Marina Bay Art & Views",location:"7 Raffles Ave, S039799",area:"Marina Centre",description:"Contemporary art meets Marina Bay grandeur. Dedicated wedding floor with panoramic bay views. An acclaimed art collection provides stunning photo backdrops with impeccable service.",capacity:{s:480,st:600},setting:"Indoor",cuisine:["International","Western","Chinese"],price:{min:2088,max:2888,unit:"table"},budget:{l:"$2,088++",d:"$2,488–$2,888++"},cat:"hotel",catLabel:"Luxury Hotel",featured:false,solemn:true,rating:4.8,img:null,hero:null,gallery:[],bestFor:["Marina Bay views wedding","Art collection photo backdrop","Premium hotel experience"],web:"https://www.ritzcarlton.com/en/hotels/sinrz-the-ritz-carlton-millenia-singapore/weddings/"},
{id:"st-regis",name:"The St. Regis Singapore",tagline:"Old-World Opulence",location:"29 Tanglin Rd, S247911",area:"Tanglin",description:"White-glove sophistication through signature Butler service. The John Jacob Ballroom — first and only in Singapore with two skylights. Bespoke wedding curation treating every couple as royalty.",capacity:{s:350,st:450},setting:"Indoor",cuisine:["International","French","Chinese"],price:{min:2388,max:3188,unit:"table"},budget:{l:"$2,388++",d:"$2,788–$3,188++"},cat:"hotel",catLabel:"Luxury Hotel",featured:false,solemn:true,rating:4.8,img:null,hero:null,gallery:[],bestFor:["Ultra-luxury bespoke wedding","Butler-serviced celebration","Old-world elegance"],web:"https://www.marriott.com/hotels/event-planning/wedding-planning/sinxr-the-st-regis-singapore/"},
{id:"mandarin-oriental",name:"Mandarin Oriental, Singapore",tagline:"Marina Bay Waterfront Luxury",location:"5 Raffles Ave, S039797",area:"Marina Bay",description:"Marina Bay waterfront combining Asian warmth with international sophistication. The Oriental Ballroom for grand celebrations; Cherry Garden for exquisite Chinese banquets.",capacity:{s:400,st:500},setting:"Indoor",cuisine:["International","Chinese","Western"],price:{min:1988,max:2688,unit:"table"},budget:{l:"$1,988++",d:"$2,388–$2,688++"},cat:"hotel",catLabel:"Luxury Hotel · Waterfront",featured:false,solemn:true,rating:4.7,img:null,hero:null,gallery:[],bestFor:["Marina Bay waterfront banquet","Chinese Cherry Garden dinner","Asian-luxury wedding"],web:"https://www.mandarinoriental.com/en/singapore/marina-bay/meetings-and-events/weddings"},
{id:"four-seasons",name:"Four Seasons Hotel Singapore",tagline:"Orchard Boulevard Elegance",location:"190 Orchard Blvd, S248646",area:"Orchard",description:"Floor-to-ceiling windows, custom glass chandeliers, and some of the city's finest cuisine paired with legendary Four Seasons service in an Orchard Boulevard setting.",capacity:{s:350,st:450},setting:"Indoor & Outdoor",cuisine:["International","Chinese","Western"],price:{min:2288,max:3088,unit:"table"},budget:{l:"$2,288++",d:"$2,688–$3,088++"},cat:"hotel",catLabel:"Luxury Hotel",featured:false,solemn:true,rating:4.8,img:null,hero:null,gallery:[],bestFor:["Intimate luxury celebration","World-class culinary experience","Orchard garden solemnisation"],web:"https://www.fourseasons.com/singapore/weddings/"},
{id:"jw-marriott",name:"JW Marriott South Beach",tagline:"Forest of Lights",location:"30 Beach Rd, S189763",area:"City Hall",description:"The Grand Ballroom's iconic 11,520-light Forest of Lights LED wall creates a breathtaking backdrop. Heritage building housing contemporary luxury with Instagram-famous illuminated experiences.",capacity:{s:400,st:500},setting:"Indoor & Outdoor",cuisine:["International","Chinese","Western"],price:{min:1888,max:2488,unit:"table"},budget:{l:"$1,888++",d:"$2,188–$2,488++"},cat:"hotel",catLabel:"Modern Hotel · Iconic",featured:false,solemn:true,rating:4.7,img:null,hero:null,gallery:[],bestFor:["Forest of Lights LED backdrop","Modern grand ballroom","Heritage meets contemporary"],web:"https://www.marriott.com/en-us/hotels/sinjw-jw-marriott-hotel-singapore-south-beach/"},
{id:"grand-hyatt",name:"Grand Hyatt Singapore",tagline:"Scotts Road Grand",location:"10 Scotts Rd, S228211",area:"Orchard",description:"Striking versatility on Scotts Road — grand pillarless ballroom for 600 guests, private bar for after-parties. Polished Orchard Road glamour for every wedding.",capacity:{s:600,st:800},setting:"Indoor & Outdoor",cuisine:["International","Chinese","Western"],price:{min:1688,max:2288,unit:"table"},budget:{l:"$1,688++",d:"$1,988–$2,288++"},cat:"hotel",catLabel:"Luxury Hotel",featured:false,solemn:true,rating:4.6,img:null,hero:null,gallery:[],bestFor:["Large-scale grand ballroom","Orchard Road luxury","After-party private bar"],web:"https://www.hyatt.com/grand-hyatt/en-US/sinrs-grand-hyatt-singapore/"},
{id:"intercontinental",name:"InterContinental Singapore",tagline:"Peranakan Heritage Luxury",location:"80 Middle Rd, S188966",area:"Bugis",description:"Peranakan-inspired luxury blending rich cultural heritage with modern elegance. Restored Bugis Junction shophouse setting for a uniquely Singaporean wedding backdrop.",capacity:{s:350,st:450},setting:"Indoor",cuisine:["International","Chinese","Peranakan"],price:{min:1788,max:2388,unit:"table"},budget:{l:"$1,788++",d:"$2,088–$2,388++"},cat:"hotel",catLabel:"Heritage Hotel",featured:false,solemn:true,rating:4.7,img:null,hero:null,gallery:[],bestFor:["Peranakan-themed wedding","Heritage shophouse celebration","Cultural-meets-luxury"],web:"https://singapore.intercontinental.com/weddings"},
{id:"andaz",name:"Andaz Singapore",tagline:"Kampong Glam Creative",location:"5 Fraser St, S189354",area:"Bugis",description:"Where 'personal style' meets celebration. Flexible packages, sustainable practices, and tailored menus inspired by the creative energy of Kampong Glam neighbourhood.",capacity:{s:300,st:400},setting:"Indoor & Outdoor",cuisine:["International","Asian","Western"],price:{min:1688,max:2188,unit:"table"},budget:{l:"$1,688++",d:"$1,888–$2,188++"},cat:"hotel",catLabel:"Lifestyle Hotel",featured:false,solemn:true,rating:4.7,img:null,hero:null,gallery:[],bestFor:["Creative contemporary wedding","Sustainable celebration","Kampong Glam charm"],web:"https://www.hyatt.com/andaz/en-US/sinaz-andaz-singapore"},
{id:"hilton-orchard",name:"Hilton Singapore Orchard",tagline:"Orchard Road Modern Grand",location:"333 Orchard Rd, S238867",area:"Orchard",description:"Singapore's largest Hilton — Grand Ballroom for 800 guests, Imperial Ballroom for amphitheatre-style celebrations, The Manor botanical enclave for intimate garden weddings.",capacity:{s:800,st:1000},setting:"Indoor & Outdoor",cuisine:["International","Chinese","Western"],price:{min:1588,max:2188,unit:"table"},budget:{l:"$1,588++",d:"$1,888–$2,188++"},cat:"hotel",catLabel:"Modern Hotel · Grand",featured:false,solemn:true,rating:4.6,img:null,hero:null,gallery:[],bestFor:["Large-scale wedding (800 guests)","The Manor botanical garden","Orchard Road convenience"],web:"https://www.hilton.com/en/hotels/sinorhi-hilton-singapore-orchard/"},
{id:"marriott-tang",name:"Singapore Marriott Tang Plaza",tagline:"Orchard Road Icon",location:"320 Orchard Rd, S238865",area:"Orchard",description:"Orchard Road icon with Certified Wedding Planners and award-winning Wan Hao Chinese Restaurant. Grand Ballroom for up to 550 guests. Packages from $1,738++ per table.",capacity:{s:550,st:700},setting:"Indoor",cuisine:["Chinese","International"],price:{min:1738,max:2388,unit:"table"},budget:{l:"$1,738++",d:"$2,038–$2,388++"},cat:"hotel",catLabel:"Luxury Hotel",featured:false,solemn:true,rating:4.6,img:null,hero:null,gallery:[],bestFor:["Chinese banquet specialist","Award-winning Wan Hao cuisine","Orchard Road prestige"],web:"https://www.marriott.com/en-us/hotels/sindt-singapore-marriott-tang-plaza-hotel/"},
{id:"national-gallery",name:"National Gallery Singapore",tagline:"Where Art Meets History",location:"1 St Andrew's Rd, S178957",area:"City Hall",description:"Exchange vows in the historic City Hall Chamber — where Singapore's independence was proclaimed. Southeast Asia's largest public collection of modern art as your backdrop.",capacity:{s:500,st:700},setting:"Indoor",cuisine:["International","Modern European"],price:{min:1688,max:2488,unit:"table"},budget:{l:"$1,688++",d:"$2,088–$2,488++"},cat:"heritage",catLabel:"Heritage · Cultural",featured:false,solemn:true,rating:4.7,img:null,hero:null,gallery:[],bestFor:["Historic City Hall ceremony","Art gallery backdrop","Cultural landmark wedding"],web:"https://www.nationalgallery.sg/venue-hire"},
{id:"chijmes",name:"CHIJMES Hall",tagline:"Gothic Chapel Grandeur",location:"30 Victoria St, S187996",area:"City Hall",description:"Gothic chapel converted into Singapore's most photogenic event venue. Soaring vaulted ceilings, stained glass windows, and dramatic architecture impossible to replicate elsewhere.",capacity:{s:300,st:400},setting:"Indoor & Outdoor",cuisine:["International","Western"],price:{min:1588,max:2088,unit:"table"},budget:{l:"$1,588++",d:"$1,888–$2,088++"},cat:"heritage",catLabel:"Heritage · Chapel",featured:false,solemn:true,rating:4.6,img:null,hero:null,gallery:[],bestFor:["Gothic chapel ceremony","Stained glass photography","Heritage courtyard reception"],web:"https://www.chijmes.com.sg/"},
{id:"jen-tanglin",name:"JEN Singapore Tanglin",tagline:"Botanic Gardens Neighbour",location:"1A Cuscaden Rd, S249716",area:"Tanglin",description:"Vibrant design-forward hotel steps from the UNESCO Botanic Gardens. Playful contemporary spaces at accessible price points — personality without the five-star price tag.",capacity:{s:350,st:450},setting:"Indoor & Outdoor",cuisine:["International","Chinese","Western"],price:{min:1288,max:1688,unit:"table"},budget:{l:"$1,288++",d:"$1,488–$1,688++"},cat:"hotel",catLabel:"Lifestyle Hotel · Value",featured:false,solemn:true,rating:4.5,img:null,hero:null,gallery:[],bestFor:["Affordable luxury wedding","Botanic Gardens proximity","Contemporary design-forward"],web:"https://www.shangri-la.com/singapore/jen-tanglin/weddings/"},
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
  {couple:"Rachel & Edwin",venue:"Monti",guests:120,type:"Waterfront Italian dinner",quote:"The Marina Bay sunset during our solemnisation was the most magical moment of our lives.",photo:"@pixioo",vid:"monti"},
  {couple:"Priya & Arjun",venue:"1-Arden",guests:80,type:"Sunset sky garden",quote:"Being surrounded by the food forest 51 floors above felt like a dream.",photo:"@fellowfolks",vid:"1-arden"},
  {couple:"Wei Ling & Jun Hao",venue:"The Alkaff Mansion",guests:150,type:"Heritage garden lunch",quote:"The heritage mansion made our tea ceremony feel so connected to tradition.",photo:"@iluminen",vid:"alkaff-mansion"},
  {couple:"Sarah & David",venue:"1-Alfaro",guests:100,type:"Rooftop lighthouse dinner",quote:"Our guests couldn't stop talking about the panoramic views and incredible Italian food.",photo:"@d.t._pictures",vid:"1-alfaro"},
  {couple:"Michelle & James",venue:"Raffles Hotel",guests:300,type:"Grand ballroom banquet",quote:"Walking through those historic corridors on our wedding day was unforgettable.",photo:"@blinkcinematic",vid:"raffles-hotel"},
  {couple:"Mei Lin & Kai",venue:"Capella Singapore",guests:150,type:"Sentosa garden estate",quote:"Capella gave us a private resort wedding without leaving Singapore.",photo:"@studio1702",vid:"capella"},
  {couple:"Nurul & Faris",venue:"1-Atico",guests:60,type:"Orchard skyline ROM",quote:"Intimate solemnisation above Orchard Road — chic and unforgettable.",photo:"@wemerryground",vid:"1-atico"},
  {couple:"Joanne & Marcus",venue:"The Summerhouse",guests:70,type:"Garden estate brunch",quote:"Fairy lights and farm-to-table felt like a European countryside wedding.",photo:"@ikicompany",vid:"the-summerhouse"}
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
const VI=({src,alt,className="",style={}})=>{const[e,sE]=useState(!src);const cols={rooftop:"#1A1A2E",hotel:"#2C3E50",heritage:"#5D4037",garden:"#2D5A45",waterfront:"#1A535C",beachfront:"#0E7490"};const k=alt?.includes("Rooftop")?"rooftop":alt?.includes("Hotel")?"hotel":"heritage";if(e||!src)return<div className={className} style={{...style,background:`linear-gradient(135deg,${cols[k]||"#2C3E50"},${cols[k]||"#2C3E50"}cc)`,display:"flex",alignItems:"center",justifyContent:"center",color:"rgba(255,255,255,.5)",fontFamily:"var(--fh)",fontSize:"clamp(13px,1.3vw,17px)",textAlign:"center",padding:18}}>{alt?.split("—")[0]||"Venue"}</div>;return<img src={src} alt={alt} className={className} style={{...style,objectFit:"cover"}} onError={()=>sE(true)} loading="lazy"/>};

// ═════════════════════════════════════════════════════════════════════════
// MAIN APP
// ═════════════════════════════════════════════════════════════════════════
export default function App(){
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
    @keyframes bI{from{opacity:0;filter:blur(8px);transform:translateY(8px)}to{opacity:1;filter:blur(0);transform:translateY(0)}}
    @keyframes kB{0%{transform:scale(1)}100%{transform:scale(1.08)}}
    @keyframes sh{0%{background-position:-200% 0}100%{background-position:200% 0}}
    @keyframes fl{0%,100%{transform:translateY(0);opacity:.3}50%{transform:translateY(-28px);opacity:.5}}
    @keyframes pu{0%,100%{box-shadow:0 0 0 0 rgba(201,169,110,.4)}50%{box-shadow:0 0 0 10px rgba(201,169,110,0)}}
    @media(prefers-reduced-motion:reduce){*{animation-duration:.01ms!important;transition-duration:.01ms!important}}
    .sk{background:linear-gradient(90deg,var(--gg) 25%,var(--gp) 50%,var(--gg) 75%);background-size:200% 100%;animation:sh 1.5s ease-in-out infinite;border-radius:8px}
    .vc{transition:transform .35s var(--e),box-shadow .35s var(--e);position:relative;overflow:hidden;border-radius:12px;background:var(--iv);cursor:pointer}
    .vc:hover{transform:translateY(-8px);box-shadow:var(--sx)}
    .vc .vi{transition:transform .6s var(--e)}.vc:hover .vi{transform:scale(1.05)}
    .vc::after{content:'';position:absolute;bottom:0;left:0;width:100%;height:2px;background:linear-gradient(90deg,transparent,var(--go),transparent);transform:translateX(-100%);transition:transform .6s var(--e)}.vc:hover::after{transform:translateX(100%)}
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
        </div>
        <button onClick={()=>sMm(true)} className="sm" style={{display:"none",background:"none",border:"none",cursor:"pointer"}} aria-label="Menu"><Menu size={24}/></button>
      </div>
    </nav>

    {mm&&<MobMenu items={NI} go={go} close={()=>sMm(false)}/>}

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

function MobMenu({items,go,close}){return(<div style={{position:"fixed",inset:0,zIndex:100,display:"flex",justifyContent:"flex-end"}}><div onClick={close} style={{position:"absolute",inset:0,background:"rgba(0,0,0,.4)",backdropFilter:"blur(4px)"}}/><div style={{position:"relative",width:280,background:"var(--w)",padding:"68px 24px 24px",animation:"fI .2s ease",display:"flex",flexDirection:"column",gap:4}}><button onClick={close} style={{position:"absolute",top:18,right:18,background:"none",border:"none",cursor:"pointer"}}><X size={20}/></button>{items.map(n=><button key={n.p} onClick={()=>go(n.p)} style={{background:"none",border:"none",fontFamily:"var(--fh)",fontSize:19,fontWeight:500,color:"var(--c)",padding:"11px 0",textAlign:"left",cursor:"pointer",borderBottom:"1px solid var(--gpa)"}}>{n.l}</button>)}<button className="bg" onClick={()=>go("ai-tools")} style={{marginTop:14,width:"100%",justifyContent:"center"}}><Sparkles size={14}/>Find My Venue</button></div></div>)}

// ═════════════════════════════════════════════════════════════════════════
// HOME
// ═════════════════════════════════════════════════════════════════════════
function Home({go}){
  const[sl,sSl]=useState(0);const[pr,sPr]=useState(0);
  useEffect(()=>{const iv=setInterval(()=>sSl(s=>(s+1)%HERO_SLIDES.length),6e3);return()=>clearInterval(iv)},[]);
  useEffect(()=>{sPr(0);const t=setTimeout(()=>sPr(100),50);return()=>clearTimeout(t)},[sl]);
  return(<>
    {/* HERO */}
    <section style={{position:"relative",height:"70vh",minHeight:440,overflow:"hidden"}} role="banner" aria-label="Featured Singapore wedding venues">
      {HERO_SLIDES.map((s,i)=>{const v=VENUES.find(x=>x.id===s.vid);return(<div key={i} style={{position:"absolute",inset:0,opacity:sl===i?1:0,transition:"opacity .8s ease"}}><div style={{position:"absolute",inset:0,animation:sl===i?"kB 12s ease-in-out forwards":"none"}}><VI src={v?.hero||v?.img} alt={`${v?.name||"Singapore"} — ${v?.catLabel||"Wedding Venue"} Singapore`} style={{width:"100%",height:"100%"}}/></div><div style={{position:"absolute",inset:0,background:"linear-gradient(180deg,rgba(45,45,45,.12) 0%,rgba(45,45,45,.65) 100%)"}}/></div>)})}
      <div style={{position:"absolute",inset:0,overflow:"hidden",pointerEvents:"none",zIndex:2}}>{Array.from({length:10},(_,i)=><div key={i} style={{position:"absolute",left:`${(i*10.3)%100}%`,top:`${(i*14.7)%100}%`,width:Math.random()*5+3,height:Math.random()*5+3,borderRadius:"50%",background:"rgba(201,169,110,.35)",animation:`fl ${6+i}s ease-in-out ${i*.5}s infinite`,opacity:.1+Math.random()*.08}}/>)}</div>
      <div style={{position:"absolute",inset:0,zIndex:3,display:"flex",flexDirection:"column",justifyContent:"center",padding:"0 clamp(24px,8vw,120px)"}}>
        <h1 style={{fontFamily:"var(--fh)",fontSize:"clamp(28px,5vw,52px)",fontWeight:300,color:"var(--w)",lineHeight:1.15,letterSpacing:"-.02em",maxWidth:560,animation:"bI .8s ease forwards",whiteSpace:"pre-line"}}>{HERO_SLIDES[sl].h}</h1>
        <p style={{fontFamily:"var(--fb)",fontSize:"clamp(13px,1.4vw,16px)",color:"rgba(255,255,255,.85)",marginTop:12,maxWidth:460,animation:"fU .6s ease .3s both"}}>{HERO_SLIDES[sl].sub}</p>
        <div style={{display:"flex",gap:10,marginTop:22,animation:"fU .6s ease .5s both",flexWrap:"wrap"}}>
          <button className="bg" onClick={()=>go("ai-tools")}><Sparkles size={14}/>Find My Venue</button>
          <button onClick={()=>go("venues")} style={{background:"rgba(255,255,255,.12)",border:"1px solid rgba(255,255,255,.3)",color:"var(--w)",padding:"12px 20px",borderRadius:8,fontFamily:"var(--fb)",fontWeight:500,fontSize:14,cursor:"pointer",backdropFilter:"blur(8px)"}}>Browse {VENUES.length} Venues</button>
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

    {/* 1-HOST COLLECTION */}
    <section style={{padding:"64px 24px",background:"var(--w)"}} aria-label="1-Host signature wedding venue collection Singapore">
      <div style={{maxWidth:1200,margin:"0 auto"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10,flexWrap:"wrap",gap:10}}>
          <div><span className="mb" style={{marginBottom:6,display:"inline-flex"}}><Crown size={9}/>1-Host Collection</span><h2 style={{fontFamily:"var(--fh)",fontSize:"clamp(24px,3vw,36px)",fontWeight:400,marginTop:8}}>Signature Venues by 1-Host</h2></div>
          <button className="nl" onClick={()=>go("venues")} style={{fontSize:13,color:"var(--gd)"}}>All Venues <ChevronRight size={13} style={{display:"inline",verticalAlign:"middle"}}/></button>
        </div>
        <p style={{color:"var(--g)",fontSize:14,marginBottom:28,maxWidth:580}}>Singapore's most iconic collection — from sky-high food forests to heritage mansions, each managed with 6,500+ weddings of experience.</p>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(250px,1fr))",gap:18}}>{VENUES.filter(v=>v.managed&&v.featured).map((v,i)=><VCd key={v.id} v={v} i={i} onClick={()=>go("venues",v)}/>)}</div>
      </div>
    </section>

    {/* HOTEL VENUES */}
    <section style={{padding:"64px 24px",background:"var(--cr)"}} aria-label="Luxury hotel wedding venues Singapore">
      <div style={{maxWidth:1200,margin:"0 auto"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:28,flexWrap:"wrap",gap:10}}>
          <div><h2 style={{fontFamily:"var(--fh)",fontSize:"clamp(24px,3vw,36px)",fontWeight:400}}>Luxury Hotel Venues</h2><p style={{color:"var(--g)",fontSize:14,marginTop:6}}>Singapore's finest five-star hotels for grand wedding banquets</p></div>
          <button className="nl" onClick={()=>go("venues")} style={{fontSize:13,color:"var(--gd)"}}>Browse All <ChevronRight size={13} style={{display:"inline",verticalAlign:"middle"}}/></button>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(250px,1fr))",gap:18}}>{VENUES.filter(v=>v.cat==="hotel"&&!v.managed).slice(0,6).map((v,i)=><VCd key={v.id} v={v} i={i} onClick={()=>go("venues",v)}/>)}</div>
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
    <section style={{padding:"52px 24px",background:"linear-gradient(135deg,var(--cw),var(--rp))"}}>
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
  <article ref={r} className="vc" onClick={onClick} style={{opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(22px)",transition:`all .5s var(--e) ${i*65}ms`,boxShadow:"var(--ss)"}} itemScope itemType="https://schema.org/EventVenue">
    <div style={{position:"relative",paddingTop:"66%",overflow:"hidden"}}>
      <VI src={v.img} alt={`${v.name} — ${v.catLabel} wedding venue in ${v.area}, Singapore`} className="vi" style={{position:"absolute",inset:0,width:"100%",height:"100%"}}/>
      <span style={{position:"absolute",top:9,left:9,background:"rgba(45,45,45,.8)",backdropFilter:"blur(4px)",color:"var(--w)",fontSize:10,fontWeight:600,letterSpacing:".05em",textTransform:"uppercase",padding:"3px 9px",borderRadius:999}}>{v.cat==="hotel"?"Hotel":v.catLabel.split("·")[0].trim()}</span>
      {v.managed&&<span style={{position:"absolute",top:9,right:9}} className="mb"><Crown size={8}/>1-Host</span>}
      {v.isNew&&<span style={{position:"absolute",top:v.managed?32:9,right:9,background:"var(--go)",color:"var(--w)",fontSize:9,fontWeight:700,padding:"2px 7px",borderRadius:999}}>NEW</span>}
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
  <article ref={r} style={{borderRadius:12,overflow:"hidden",background:"var(--w)",boxShadow:"var(--ss)",cursor:"pointer",opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(16px)",transition:"all .5s var(--e)"}} onClick={()=>v&&go("venues",v)}>
    <div style={{height:180,overflow:"hidden"}}><VI src={v?.img||v?.hero} alt={`${s.couple} real wedding at ${s.venue} Singapore`} style={{width:"100%",height:"100%"}}/></div>
    <div style={{padding:16}}>
      <h3 style={{fontFamily:"var(--fh)",fontSize:19,fontWeight:500,marginBottom:3}}>{s.couple}</h3>
      <p style={{fontSize:12,color:"var(--gd)",fontWeight:600,marginBottom:5}}>{s.venue} · {s.guests} guests{v?.managed&&<span className="mb" style={{marginLeft:5,fontSize:8}}><Crown size={7}/>1-Host</span>}</p>
      <p style={{fontSize:13,color:"var(--cl)",fontStyle:"italic",lineHeight:1.5}}>"{s.quote}"</p>
      <p style={{fontSize:11,color:"var(--g)",marginTop:6}}>Credits: {s.photo}</p>
    </div>
  </article>
);}

function StatStrip(){const d=[{t:VENUES.length,s:"+",l:"Venues Listed"},{t:6500,s:"+",l:"Weddings Hosted"},{t:354,s:"",l:"Google Reviews"},{t:12,s:"+",l:"Years of Excellence"}];return(
  <section style={{background:"var(--c)",padding:"44px 24px",color:"var(--w)"}}>
    <div style={{maxWidth:860,margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(130px,1fr))",gap:24,textAlign:"center"}}>
      {d.map((s,i)=>{const[r,c]=useCtr(s.t);return<div key={i} ref={r}><p style={{fontFamily:"var(--fh)",fontSize:36,fontWeight:300,color:"var(--go)"}}>{c.toLocaleString()}{s.s}</p><p style={{fontSize:12,color:"var(--gi)",marginTop:2}}>{s.l}</p></div>})}
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
function AIHub(){const[ac,sAc]=useState(null);const tools=[{id:"match",ic:Sparkles,n:"AI Venue Matchmaker",d:`Match from ${VENUES.length} venues`},{id:"budget",ic:Calculator,n:"Budget Calculator",d:"Singapore wedding budget AI"},{id:"timeline",ic:CalendarDays,n:"Timeline Generator",d:"Day-of timeline with SG customs"},{id:"compare",ic:GitCompareArrows,n:"Venue Comparison",d:"Side-by-side AI analysis"}];return(
  <section style={{padding:"44px 24px 72px",background:"var(--cr)"}}>
    <div style={{maxWidth:880,margin:"0 auto"}}>
      <div style={{textAlign:"center",marginBottom:36}}><h1 style={{fontFamily:"var(--fh)",fontSize:"clamp(28px,4vw,40px)",fontWeight:300,marginBottom:8}}>AI Wedding Planning Tools</h1><p style={{color:"var(--g)",fontSize:14,maxWidth:520,margin:"0 auto"}}>Powered by AI to simplify your venue search across {VENUES.length} iconic Singapore locations.</p></div>
      {!ac?<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>{tools.map((t,i)=>{const[r,v]=useSR();return<button ref={r} key={t.id} onClick={()=>sAc(t.id)} style={{background:"var(--w)",borderRadius:12,padding:22,border:"1px solid var(--gpa)",cursor:"pointer",textAlign:"left",transition:`all .4s var(--e) ${i*80}ms`,opacity:v?1:0,transform:v?"translateY(0)":"translateY(14px)",boxShadow:"var(--ss)"}}><t.ic size={24} style={{color:"var(--go)",marginBottom:8}}/><h3 style={{fontFamily:"var(--fh)",fontSize:19,fontWeight:500,marginBottom:5}}>{t.n}</h3><p style={{fontSize:13,color:"var(--g)",lineHeight:1.4}}>{t.d}</p></button>})}</div>:
      <div><button onClick={()=>sAc(null)} className="nl" style={{marginBottom:18,fontSize:13}}><ChevronLeft size={13} style={{display:"inline",verticalAlign:"middle"}}/> Tools</button>
        {ac==="match"&&<MatchT/>}{ac==="budget"&&<BudgetT/>}{ac==="timeline"&&<TimeT/>}{ac==="compare"&&<CompT/>}
      </div>}
    </div>
  </section>
);}

function MatchT(){const[g,sG]=useState(150);const[b,sB]=useState(2e3);const[st,sSt]=useState("Glamorous");const[ld,sLd]=useState(false);const[res,sRes]=useState(null);const[er,sEr]=useState(null);
  const run=async()=>{sLd(true);sEr(null);sRes(null);try{const text=await callAI(`Expert Singapore wedding venue consultant. ${VENUES.length} venues:\n${VK}\nRecommend TOP 3. ONLY valid JSON: {"recommendations":[{"name":"...","matchScore":85,"reasons":["..."],"consideration":"...","priceRange":"...","capacity":"..."}],"tip":"..."}`,`${g} guests, ~$${b}++ per table, style: ${st}.`);sRes(pJ(text))}catch{sEr("Try again.")}sLd(false)};
  return(<div style={{background:"var(--w)",borderRadius:14,padding:26,boxShadow:"var(--sm)"}}>
    <h2 style={{fontFamily:"var(--fh)",fontSize:24,fontWeight:400,marginBottom:18,display:"flex",alignItems:"center",gap:8}}><Sparkles size={18} style={{color:"var(--go)"}}/>AI Venue Matchmaker</h2>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:18}}>
      <div><label style={{fontSize:11,fontWeight:600,letterSpacing:".05em",textTransform:"uppercase",color:"var(--g)",marginBottom:5,display:"block"}}>Guests: {g}</label><input type="range" min={20} max={800} step={10} value={g} onChange={e=>sG(+e.target.value)} style={{width:"100%",accentColor:"var(--go)"}}/></div>
      <div><label style={{fontSize:11,fontWeight:600,letterSpacing:".05em",textTransform:"uppercase",color:"var(--g)",marginBottom:5,display:"block"}}>Budget: ~${b}++/table</label><input type="range" min={1200} max={3500} step={100} value={b} onChange={e=>sB(+e.target.value)} style={{width:"100%",accentColor:"var(--go)"}}/></div>
    </div>
    <div style={{marginBottom:18}}><label style={{fontSize:11,fontWeight:600,letterSpacing:".05em",textTransform:"uppercase",color:"var(--g)",marginBottom:5,display:"block"}}>Style</label><div style={{display:"flex",flexWrap:"wrap",gap:5}}>{["Glamorous","Intimate","Garden","Sky-High","Waterfront","Heritage","Grand Hotel","Rustic"].map(s=><button key={s} className={`cp ${st===s?"a":""}`} onClick={()=>sSt(s)} style={{fontSize:12,padding:"5px 12px"}}>{s}</button>)}</div></div>
    <button className="bg" onClick={run} disabled={ld}><Sparkles size={13}/>{ld?"Finding match…":"Match Me"}</button>
    {ld&&<div style={{marginTop:18}}>{[1,2,3].map(i=><div key={i} className="sk" style={{height:100,marginBottom:8}}/>)}</div>}
    {er&&<p style={{marginTop:12,color:"var(--rd)",fontSize:13}}>{er}</p>}
    {res&&!res.raw&&res.recommendations&&<div style={{marginTop:22}}>{res.recommendations.map((r,i)=><div key={i} style={{background:"var(--iv)",borderRadius:12,padding:16,marginBottom:10,animation:`fU .5s ease ${i*120}ms both`,border:"1px solid var(--gpa)"}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}><h3 style={{fontFamily:"var(--fh)",fontSize:18,fontWeight:500}}>{r.name}</h3><span style={{background:"var(--go)",color:"var(--w)",padding:"2px 9px",borderRadius:999,fontSize:12,fontWeight:700}}>{r.matchScore}%</span></div>{r.reasons?.map((x,j)=><p key={j} style={{fontSize:13,color:"var(--cl)"}}>✓ {x}</p>)}{r.consideration&&<p style={{fontSize:12,color:"var(--g)",marginTop:4,fontStyle:"italic"}}>⚠ {r.consideration}</p>}<p style={{fontSize:13,fontWeight:600,color:"var(--gd)",marginTop:5}}>{r.priceRange} · {r.capacity}</p></div>)}{res.tip&&<div style={{background:"var(--gp)",borderRadius:10,padding:12,marginTop:4}}><p style={{fontSize:13}}>💡 {res.tip}</p></div>}</div>}
    {res?.raw&&<div style={{marginTop:16,background:"var(--iv)",borderRadius:10,padding:16}}><p style={{fontSize:13,whiteSpace:"pre-wrap",lineHeight:1.7}}>{res.raw}</p></div>}
  </div>);
}

function BudgetT(){const[t,sT]=useState(6e4);const[g,sG]=useState(150);const[ld,sLd]=useState(false);const[res,sRes]=useState(null);const[er,sEr]=useState(null);
  const run=async()=>{sLd(true);sEr(null);try{const text=await callAI(`Singapore wedding budget expert. Venues $1,200-$3,500++/table. ONLY JSON: {"breakdown":[{"category":"...","amount":N,"percentage":N,"notes":"..."}],"venueGuidance":"...","angBaoEstimate":"...","savingTips":["..."]}`,`$${t.toLocaleString()}, ${g} guests, mid-range.`);sRes(pJ(text))}catch{sEr("Try again.")}sLd(false)};
  return(<div style={{background:"var(--w)",borderRadius:14,padding:26,boxShadow:"var(--sm)"}}>
    <h2 style={{fontFamily:"var(--fh)",fontSize:24,fontWeight:400,marginBottom:18,display:"flex",alignItems:"center",gap:8}}><Calculator size={18} style={{color:"var(--go)"}}/>Budget Calculator</h2>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:18}}>
      <div><label style={{fontSize:11,fontWeight:600,letterSpacing:".05em",textTransform:"uppercase",color:"var(--g)",display:"block",marginBottom:5}}>Budget: ${t.toLocaleString()}</label><input type="range" min={2e4} max={3e5} step={5e3} value={t} onChange={e=>sT(+e.target.value)} style={{width:"100%",accentColor:"var(--go)"}}/></div>
      <div><label style={{fontSize:11,fontWeight:600,letterSpacing:".05em",textTransform:"uppercase",color:"var(--g)",display:"block",marginBottom:5}}>Guests: {g}</label><input type="range" min={30} max={800} step={10} value={g} onChange={e=>sG(+e.target.value)} style={{width:"100%",accentColor:"var(--go)"}}/></div>
    </div>
    <button className="bg" onClick={run} disabled={ld}><Calculator size={13}/>{ld?"Crunching…":"Calculate"}</button>
    {ld&&<div style={{marginTop:16}}>{[1,2,3,4].map(i=><div key={i} className="sk" style={{height:34,marginBottom:6}}/>)}</div>}
    {res&&!res.raw&&res.breakdown&&<div style={{marginTop:20}}>{res.breakdown.map((b,i)=><div key={i} style={{marginBottom:8,animation:`fU .3s ease ${i*50}ms both`}}><div style={{display:"flex",justifyContent:"space-between",fontSize:13,marginBottom:2}}><span>{b.category}</span><span style={{fontWeight:600}}>${b.amount?.toLocaleString()}</span></div><div style={{height:5,background:"var(--gg)",borderRadius:2}}><div style={{height:"100%",background:"var(--go)",borderRadius:2,width:`${b.percentage}%`,transition:"width .5s"}}/></div></div>)}{res.venueGuidance&&<div style={{background:"var(--gp)",borderRadius:10,padding:12,marginTop:10}}><p style={{fontSize:13}}>📍 {res.venueGuidance}</p></div>}{res.angBaoEstimate&&<p style={{fontSize:13,color:"var(--cl)",marginTop:8}}>🧧 {res.angBaoEstimate}</p>}</div>}
    {res?.raw&&<div style={{marginTop:14,background:"var(--iv)",borderRadius:10,padding:14}}><p style={{fontSize:13,whiteSpace:"pre-wrap",lineHeight:1.7}}>{res.raw}</p></div>}
  </div>);
}

function TimeT(){const[c,sC]=useState("ROM Solemnisation");const[r,sR]=useState("Dinner Banquet");const[ld,sLd]=useState(false);const[res,sRes]=useState(null);
  const run=async()=>{sLd(true);try{const text=await callAI(`Singapore wedding coordinator. Timeline with gate crash, tea ceremony, solemnisation, photos, cocktails, march-in, dinner, yum seng, table visits. 24h format. ONLY JSON: {"timeline":[{"time":"06:00","event":"...","notes":"..."}],"tips":["..."]}`,`${c}, ${r}, Singapore.`);sRes(pJ(text))}catch{}sLd(false)};
  return(<div style={{background:"var(--w)",borderRadius:14,padding:26,boxShadow:"var(--sm)"}}>
    <h2 style={{fontFamily:"var(--fh)",fontSize:24,fontWeight:400,marginBottom:18,display:"flex",alignItems:"center",gap:8}}><CalendarDays size={18} style={{color:"var(--go)"}}/>Timeline Generator</h2>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:18}}>
      <div><label style={{fontSize:11,fontWeight:600,letterSpacing:".05em",textTransform:"uppercase",color:"var(--g)",display:"block",marginBottom:5}}>Ceremony</label><select className="inp" value={c} onChange={e=>sC(e.target.value)}><option>ROM Solemnisation</option><option>Church Wedding</option><option>Garden Ceremony</option></select></div>
      <div><label style={{fontSize:11,fontWeight:600,letterSpacing:".05em",textTransform:"uppercase",color:"var(--g)",display:"block",marginBottom:5}}>Reception</label><select className="inp" value={r} onChange={e=>sR(e.target.value)}><option>Dinner Banquet</option><option>Lunch Banquet</option><option>Cocktail</option></select></div>
    </div>
    <button className="bg" onClick={run} disabled={ld}><CalendarDays size={13}/>{ld?"Crafting…":"Generate"}</button>
    {ld&&<div style={{marginTop:14}}>{[1,2,3,4,5].map(i=><div key={i} className="sk" style={{height:40,marginBottom:5}}/>)}</div>}
    {res&&!res.raw&&res.timeline&&<div style={{marginTop:18,paddingLeft:18,borderLeft:"2px solid var(--gl)"}}>{res.timeline.map((e,i)=><div key={i} style={{marginBottom:12,paddingLeft:14,position:"relative",animation:`fU .3s ease ${i*40}ms both`}}><div style={{position:"absolute",left:-25,top:3,width:9,height:9,borderRadius:"50%",background:"var(--go)",border:"2px solid var(--w)"}}/><div style={{display:"flex",gap:8,alignItems:"baseline"}}><span style={{fontWeight:700,fontSize:13,color:"var(--gd)",minWidth:38}}>{e.time}</span><div><p style={{fontWeight:600,fontSize:13}}>{e.event}</p>{e.notes&&<p style={{fontSize:12,color:"var(--cl)"}}>{e.notes}</p>}</div></div></div>)}</div>}
    {res?.raw&&<div style={{marginTop:14,background:"var(--iv)",borderRadius:10,padding:14}}><p style={{fontSize:13,whiteSpace:"pre-wrap",lineHeight:1.7}}>{res.raw}</p></div>}
  </div>);
}

function CompT(){const[sel,sSel]=useState([]);const[ld,sLd]=useState(false);const[res,sRes]=useState(null);
  const tog=id=>sSel(s=>s.includes(id)?s.filter(x=>x!==id):s.length<3?[...s,id]:s);
  const run=async()=>{if(sel.length<2)return;sLd(true);try{const info=sel.map(id=>{const v=VENUES.find(x=>x.id===id);return`${v.name}: ${v.description} Cap: ${v.capacity.s} seated. ${v.price.unit==="guest"?v.budget.l+" per guest":v.budget.l+" per table"}. ${v.cuisine.join(",")}.`}).join("\n\n");const text=await callAI(`Compare venues. Scores /10. ONLY JSON: {"comparison":[{"venue":"...","scores":{"capacity":N,"value":N,"cuisine":N,"ambiance":N,"accessibility":N,"uniqueness":N},"bestFor":"...","standout":"..."}],"verdict":"..."}`,`Compare:\n${info}`);sRes(pJ(text))}catch{}sLd(false)};
  return(<div style={{background:"var(--w)",borderRadius:14,padding:26,boxShadow:"var(--sm)"}}>
    <h2 style={{fontFamily:"var(--fh)",fontSize:24,fontWeight:400,marginBottom:12,display:"flex",alignItems:"center",gap:8}}><GitCompareArrows size={18} style={{color:"var(--go)"}}/>Venue Comparison</h2>
    <p style={{fontSize:13,color:"var(--g)",marginBottom:14}}>Select 2–3 venues.</p>
    <div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:18,maxHeight:140,overflowY:"auto"}}>{VENUES.map(v=><button key={v.id} className={`cp ${sel.includes(v.id)?"a":""}`} onClick={()=>tog(v.id)} style={{fontSize:11,padding:"4px 10px"}}>{v.managed&&<Crown size={8}/>}{v.name}</button>)}</div>
    <button className="bg" onClick={run} disabled={ld||sel.length<2}><GitCompareArrows size={13}/>{ld?"Analysing…":`Compare ${sel.length}`}</button>
    {ld&&<div style={{marginTop:14}}><div className="sk" style={{height:160}}/></div>}
    {res&&!res.raw&&res.comparison&&<div style={{marginTop:18}}><div style={{display:"grid",gridTemplateColumns:`repeat(${res.comparison.length},1fr)`,gap:10}}>{res.comparison.map((c,i)=><div key={i} style={{background:"var(--iv)",borderRadius:12,padding:16,animation:`fU .4s ease ${i*100}ms both`}}><h3 style={{fontFamily:"var(--fh)",fontSize:17,fontWeight:500,marginBottom:8}}>{c.venue}</h3>{c.scores&&Object.entries(c.scores).map(([k,val])=><div key={k} style={{marginBottom:5}}><div style={{display:"flex",justifyContent:"space-between",fontSize:11,marginBottom:1}}><span style={{textTransform:"capitalize"}}>{k}</span><span style={{fontWeight:600}}>{val}/10</span></div><div style={{height:3,background:"var(--gg)",borderRadius:2}}><div style={{height:"100%",background:"var(--go)",borderRadius:2,width:`${val*10}%`,transition:"width .4s"}}/></div></div>)}{c.bestFor&&<p style={{fontSize:12,color:"var(--cl)",marginTop:8}}>🎯 {c.bestFor}</p>}</div>)}</div>{res.verdict&&<div style={{background:"var(--gp)",borderRadius:10,padding:12,marginTop:12}}><p style={{fontSize:13}}>🏆 {res.verdict}</p></div>}</div>}
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

function Shows(){const evs=[
  {v:"1-Arden",d:"Sunday, 29 March 2026",t:"12pm–9pm",desc:"Wedding sanctuary 51 floors above the city at CapitaSpring. Live tastings and styled setups.",m:true,f:true,img:VENUES[1].hero},
  {v:"1-Alfaro",d:"Saturday, 12 April 2026",t:"11am–8pm",desc:"Singapore's newest rooftop venue at Labrador Tower. City-and-sea views and Emilia-Romagna menu.",m:true,img:VENUES[0].img},
  {v:"Raffles Hotel",d:"Sunday, 10 May 2026",t:"11am–6pm",desc:"Tour the iconic Raffles Ballroom and Palm Court gardens. Meet the wedding planning team.",img:null},
  {v:"Monti",d:"Sunday, 26 April 2026",t:"12pm–7pm",desc:"Marina Bay at its most romantic. Italian cuisine tastings and waterfront solemnisation setups.",m:true,img:VENUES[2].img}
];return(<section style={{padding:"44px 24px 72px",background:"var(--cr)"}}><div style={{maxWidth:940,margin:"0 auto"}}><h1 style={{fontFamily:"var(--fh)",fontSize:"clamp(28px,4vw,40px)",fontWeight:300,marginBottom:8}}>Upcoming Wedding Showcases</h1><p style={{color:"var(--g)",fontSize:14,maxWidth:560,marginBottom:32}}>Visit venues in person and enjoy exclusive showcase-only packages.</p>{evs.map((e,i)=><article key={i} style={{background:"var(--w)",borderRadius:14,overflow:"hidden",marginBottom:18,display:"grid",gridTemplateColumns:e.f?"1fr 1fr":"170px 1fr",boxShadow:"var(--ss)"}}><div style={{minHeight:e.f?260:140}}><VI src={e.img} alt={`${e.v} wedding showcase ${e.d} Singapore`} style={{width:"100%",height:"100%"}}/></div><div style={{padding:e.f?28:18,display:"flex",flexDirection:"column",justifyContent:"center"}}><div style={{display:"flex",gap:5,marginBottom:8}}>{e.f&&<span style={{background:"var(--go)",color:"var(--w)",padding:"2px 8px",borderRadius:999,fontSize:10,fontWeight:700}}>FEATURED</span>}{e.m&&<span className="mb"><Crown size={8}/>1-Host</span>}</div><h2 style={{fontFamily:"var(--fh)",fontSize:e.f?26:19,fontWeight:400,marginBottom:5}}>{e.v} Wedding Showcase</h2><p style={{fontSize:13,fontWeight:600,color:"var(--gd)",marginBottom:8,display:"flex",alignItems:"center",gap:4}}><CalendarDays size={12}/>{e.d} · {e.t}</p><p style={{fontSize:13,color:"var(--cl)",lineHeight:1.5,marginBottom:12}}>{e.desc}</p><button className="bg" style={{alignSelf:"flex-start",fontSize:13,padding:"9px 18px"}}>Register <ChevronRight size={12}/></button></div></article>)}</div></section>);}

function Abt(){return(<section style={{padding:"44px 24px 72px",background:"var(--cr)"}}><div style={{maxWidth:860,margin:"0 auto"}}><h1 style={{fontFamily:"var(--fh)",fontSize:"clamp(28px,4vw,40px)",fontWeight:300,marginBottom:18,textAlign:"center"}}>About Singapore Wedding Venues</h1><p style={{fontSize:15,lineHeight:1.8,color:"var(--cl)",textAlign:"center",maxWidth:660,margin:"0 auto 36px"}}>Singapore Wedding Venues is the city-state's premier AI-powered venue discovery platform. We feature {VENUES.length} of Singapore's most iconic wedding venues — from legendary five-star hotels to intimate rooftop restaurants and heritage garden estates.</p><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:18,marginBottom:44}}>{[{ic:Sparkles,t:"AI-Powered",d:`Match from ${VENUES.length} venues in seconds.`},{ic:Building2,t:`${VENUES.length} Iconic Venues`,d:"Hotels, rooftops, heritage, gardens — every style covered."},{ic:Crown,t:"1-Host Collection",d:"10 signature venues with 6,500+ weddings of dedicated experience."},{ic:Award,t:"Trusted Platform",d:"Real reviews, transparent pricing, AI-powered comparison tools."}].map((v,i)=><div key={i} style={{background:"var(--w)",borderRadius:12,padding:22,textAlign:"center",boxShadow:"var(--ss)"}}><v.ic size={26} style={{color:"var(--go)",marginBottom:10}}/><h3 style={{fontFamily:"var(--fh)",fontSize:18,fontWeight:500,marginBottom:6}}>{v.t}</h3><p style={{fontSize:13,color:"var(--cl)",lineHeight:1.5}}>{v.d}</p></div>)}</div><div style={{background:"var(--w)",borderRadius:14,padding:28,boxShadow:"var(--ss)",maxWidth:500,margin:"0 auto"}}><h2 style={{fontFamily:"var(--fh)",fontSize:24,fontWeight:400,marginBottom:16,textAlign:"center"}}>Get in Touch</h2><div style={{display:"flex",flexDirection:"column",gap:10}}><input className="inp" placeholder="Your Name"/><input className="inp" placeholder="Email" type="email"/><textarea className="inp" placeholder="Tell us about your dream wedding…" rows={3} style={{resize:"vertical"}}/><button className="bg" style={{alignSelf:"center",padding:"11px 28px"}}><Send size={13}/>Send</button></div></div></div></section>);}

function Ftr({go}){return(<footer style={{background:"var(--c)",color:"var(--gi)",padding:"52px 24px 24px"}} role="contentinfo"><div style={{maxWidth:1200,margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(170px,1fr))",gap:32,marginBottom:36}}><div><h4 style={{fontFamily:"var(--fh)",color:"var(--w)",fontSize:17,marginBottom:12}}>Singapore Wedding Venues</h4><p style={{fontSize:12,lineHeight:1.6}}>{VENUES.length} iconic venues — luxury hotels, rooftop restaurants, heritage mansions, garden estates.</p><div style={{display:"flex",gap:10,marginTop:12}}><a href="https://www.facebook.com/1Host/" target="_blank" rel="noopener noreferrer" style={{color:"var(--gi)"}}><Facebook size={15}/></a><a href="https://www.instagram.com/1_host/" target="_blank" rel="noopener noreferrer" style={{color:"var(--gi)"}}><Instagram size={15}/></a><a href="mailto:hello@singaporeweddingvenues.net" style={{color:"var(--gi)"}}><Mail size={15}/></a></div></div><div><h4 style={{color:"var(--w)",fontSize:12,fontWeight:600,letterSpacing:".04em",textTransform:"uppercase",marginBottom:12}}>1-Host Collection</h4>{VENUES.filter(v=>v.managed).slice(0,6).map(v=><p key={v.id} style={{fontSize:11,marginBottom:5,cursor:"pointer"}} onClick={()=>go("venues",v)}>{v.name}</p>)}</div><div><h4 style={{color:"var(--w)",fontSize:12,fontWeight:600,letterSpacing:".04em",textTransform:"uppercase",marginBottom:12}}>Hotels</h4>{VENUES.filter(v=>v.cat==="hotel"&&!v.managed).slice(0,6).map(v=><p key={v.id} style={{fontSize:11,marginBottom:5,cursor:"pointer"}} onClick={()=>go("venues",v)}>{v.name}</p>)}</div><div><h4 style={{color:"var(--w)",fontSize:12,fontWeight:600,letterSpacing:".04em",textTransform:"uppercase",marginBottom:12}}>AI Tools</h4>{["Venue Matchmaker","Budget Calculator","Timeline Generator","Venue Comparison","Ask AI"].map(t=><p key={t} style={{fontSize:11,marginBottom:5,cursor:"pointer"}} onClick={()=>go("ai-tools")}>{t}</p>)}</div></div><div style={{borderTop:"1px solid rgba(255,255,255,.1)",paddingTop:18,textAlign:"center",fontSize:11,color:"var(--g)"}}><p>© 2026 Singapore Wedding Venues · {VENUES.length} iconic venues · Made with <Sparkles size={10} style={{display:"inline",verticalAlign:"middle",color:"var(--go)"}}/> AI</p></div></footer>);}
