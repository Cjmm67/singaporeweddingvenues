import { useState, useEffect, useRef, useCallback } from "react";
import { Heart, MapPin, Users, ChevronRight, ChevronLeft, Star, Sparkles, Calculator, CalendarDays, GitCompareArrows, MessageCircle, X, Menu, ArrowUp, Send, TreePine, Building2, Sunset, Landmark, Waves, UtensilsCrossed, Check, Instagram, Facebook, Mail, Crown, Award, Lock, Shield, UserPlus, LogOut, Eye, EyeOff, Trash2, Settings } from "lucide-react";

/* Singapore Wedding Venues — singaporeweddingvenues.net
   Singapore's Premier AI-Powered Wedding Venue Discovery Platform
   28 venues: 10 × 1-Host Collection + 18 × Major Hotels & Heritage */

const SEO_SCHEMA = {
  website: {"@context":"https://schema.org","@type":"WebSite","name":"Singapore Wedding Venues","url":"https://www.singaporeweddingvenues.net","description":"Singapore's premier AI-powered wedding venue discovery platform. Explore 28+ iconic venues — luxury hotels, rooftop restaurants, heritage mansions, and garden estates.","potentialAction":{"@type":"SearchAction","target":"https://www.singaporeweddingvenues.net/search?q={search_term_string}","query-input":"required name=search_term_string"}},
  faq: {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"What are the best wedding venues in Singapore for 2026?","acceptedAnswer":{"@type":"Answer","text":"Top venues include Raffles Hotel, The Fullerton Hotel, Capella Singapore, Marina Bay Sands, 1-Arden at CapitaSpring Level 51, 1-Alfaro at Labrador Tower, and Monti at Fullerton Pavilion. "}},{"@type":"Question","name":"What is a solemnisation ceremony in Singapore?","acceptedAnswer":{"@type":"Answer","text":"A solemnisation is the legal wedding ceremony conducted under the Registry of Marriages (ROM). Popular venues include 1-Arden, Monti, The Alkaff Mansion, Raffles Hotel, Shangri-La, and Capella Singapore."}},{"@type":"Question","name":"How many guests can a Singapore hotel wedding accommodate?","acceptedAnswer":{"@type":"Answer","text":"Hotel ballrooms accommodate 200–2,500 guests. Marina Bay Sands fits 2,500, Shangri-La 800, Hilton Orchard 800, Grand Hyatt 600. Intimate restaurant venues like 1-Alfaro (120 seated) suit smaller celebrations."}}]}
};

const VENUES=[
{id:"1-alfaro",name:"1-Alfaro",tagline:"The Lighthouse",isNew:true,managed:"1-Host",tags:["Editor's Pick"],reviewSnippet:"Singapore's newest rooftop gem — stunning sea views and authentic Italian cuisine",location:"Labrador Tower Level 34, 1 Pasir Panjang Rd, S118479",area:"Pasir Panjang",description:"Singapore's latest rooftop wedding venue. Meaning 'The Lighthouse' in Italian, 1-Alfaro features floor-to-ceiling glass walls, panoramic city-and-sea views, and the world's highest agrivoltaics farm-to-table concept with authentic Emilia-Romagna flavours by the MONTI team.",capacity:{s:120,st:320},setting:"Indoor & Outdoor",cuisine:["Modern Italian","Farm-to-Table"],cat:"rooftop",catLabel:"Rooftop · Sky Dining",featured:true,solemn:true,rating:4.9,img:"https://www.1-host.sg/wp-content/uploads/2024/12/this-Host-featured-image-wordpress-794-x-1150-px-4-x-5-in-467-x-632-px-2-1.jpg",hero:"https://www.1-host.sg/wp-content/uploads/2024/12/1-Host-Wordpress-Main-Banner-2.jpg",gallery:["https://www.1-host.sg/wp-content/uploads/2024/12/2-5.jpg","https://www.1-host.sg/wp-content/uploads/2024/12/1-5.jpg","https://www.1-host.sg/wp-content/uploads/2024/12/3-5.jpg","https://www.1-host.sg/wp-content/uploads/2024/12/4-4.jpg"],bestFor:["Rooftop solemnisation with sea views","Italian farm-to-table dinner","Intimate 120-guest celebration"],web:"https://www.1-host.sg/venues/1-alfaro/"},
{id:"1-altitude-coast",name:"1-Altitude Coast",tagline:"Sentosa Seascapes",managed:"1-Host",tags:[],reviewSnippet:"Panoramic Sentosa seascapes for beachfront celebrations",location:"The Outpost Hotel, Sentosa",area:"Sentosa",description:"Panoramic seascapes from Sentosa's highest vantage point. Sun, sea, and sky for magical beachfront celebrations.",capacity:{s:80,st:200},setting:"Outdoor",cuisine:["International","Western"],cat:"beachfront",catLabel:"Beachfront",featured:false,solemn:true,rating:4.6,img:"https://www.1-host.sg/wp-content/uploads/2021/01/1-AC_Website-Featured-1-e1720493055549.png",hero:"https://www.1-host.sg/wp-content/uploads/2021/01/1-AC_Website-Featured-1-e1720493055549.png",gallery:[],bestFor:["Beachfront sunset solemnisation","Coastal cocktail reception","Island getaway wedding"],web:"https://www.1-host.sg/venues/wedding-1-altitude-coast/"},
{id:"1-arden",name:"1-Arden",tagline:"Sky Garden · Level 51",managed:"1-Host",tags:["Editor's Pick"],reviewSnippet:"The sky garden at sunset was the most incredible backdrop imaginable",location:"Level 51, CapitaSpring, 88 Market St, S048948",area:"Raffles Place",description:"Tie the knot overlooking sweeping sunset views from the world's highest food forest at Level 51 of CapitaSpring. Helmed by Executive Chef John-Paul Fiechtner with Coastal Australian cuisine — wild-caught, sustainably raised produce in farm-to-table dishes.",capacity:{s:230,st:350},setting:"Indoor & Outdoor",cuisine:["Coastal Australian","Farm-to-Table"],cat:"rooftop",catLabel:"Rooftop · Sky Garden",featured:true,solemn:true,rating:4.8,img:"https://www.1-host.sg/wp-content/uploads/2022/01/Arden_Website-Featured.png",hero:"https://www.1-host.sg/wp-content/uploads/2022/01/Arden-Hero-Image.png",gallery:["https://www.1-host.sg/wp-content/uploads/2022/01/1.jpg","https://www.1-host.sg/wp-content/uploads/2022/01/2.jpg","https://www.1-host.sg/wp-content/uploads/2022/01/1-Arden-Wedding-Outdoor.jpg","https://www.1-host.sg/wp-content/uploads/2022/01/1-Arden-Wedding-Night.jpg"],bestFor:["Sunset sky garden solemnisation","Grand reception up to 230 guests","Farm-to-table Australian cuisine"],web:"https://www.1-host.sg/venues/wedding-1-arden/"},
{id:"1-atico",name:"1-Atico",tagline:"Orchard Skyline",managed:"1-Host",tags:[],reviewSnippet:"Panoramic Orchard skyline — chic and unforgettable",location:"ION Orchard, S238801",area:"Orchard",description:"Perched atop ION Orchard. Panoramic skyline views with modern sophistication. City lights become your wedding décor. Couples praise the breathtaking view and seamless coordination.",capacity:{s:120,st:200},setting:"Indoor & Outdoor",cuisine:["International","Modern European"],cat:"rooftop",catLabel:"Rooftop · Sky Dining",featured:true,solemn:true,rating:4.8,img:"https://www.1-host.sg/wp-content/uploads/2021/01/Atico_Website-Featured-1.png",hero:"https://www.1-host.sg/wp-content/uploads/2021/01/Atico_Website-Featured-1.png",gallery:[],bestFor:["Glamorous Orchard celebration","Panoramic skyline solemnisation","Modern sophisticated reception"],web:"https://www.1-host.sg/venues/wedding-1-atico/"},
{id:"1-flowerhill",name:"1-Flowerhill",tagline:"Heritage on Sentosa",managed:"1-Host",tags:[],reviewSnippet:"Colonial arches and tropical foliage on Sentosa — pure heritage charm",location:"6 Imbiah Rd, Sentosa, S099696",area:"Sentosa",description:"Century-old heritage building at Sentosa Sensoryscape. Charming colonial arches, green-and-white balustrades, spiral staircases under lush tropical foliage. Heritage meets garden paradise.",capacity:{s:90,st:150},setting:"Indoor & Outdoor",cuisine:["Modern European"],cat:"heritage",catLabel:"Heritage · Garden",featured:true,solemn:true,rating:4.7,img:"https://www.1-host.sg/wp-content/uploads/2024/01/Untitled-design-1.jpg",hero:"https://www.1-host.sg/wp-content/uploads/2024/01/Untitled-design-1.jpg",gallery:[],bestFor:["Intimate heritage garden ceremony","Colonial-charm solemnisation","Sentosa island escape"],web:"https://www.1-host.sg/venues/1-flowerhill/"},
{id:"andaz",name:"Andaz Singapore",tagline:"Kampong Glam Creative",tags:[],reviewSnippet:"Creative energy and sustainable practices in the heart of Kampong Glam",location:"5 Fraser St, S189354",area:"Bugis",description:"Where 'personal style' meets celebration. Flexible packages, sustainable practices, and tailored menus inspired by the creative energy of Kampong Glam neighbourhood.",capacity:{s:300,st:400},setting:"Indoor & Outdoor",cuisine:["International","Asian","Western"],cat:"hotel",catLabel:"Lifestyle Hotel",featured:false,solemn:true,rating:4.7,img:"https://assets.hyatt.com/content/dam/hyatt/hyattdam/images/2018/08/21/1023/Andaz-Singapore-P085-Ballroom-Wedding.jpg/Andaz-Singapore-P085-Ballroom-Wedding.16x9.jpg",hero:"https://assets.hyatt.com/content/dam/hyatt/hyattdam/images/2018/08/21/1023/Andaz-Singapore-P085-Ballroom-Wedding.jpg/Andaz-Singapore-P085-Ballroom-Wedding.16x9.jpg",gallery:[],bestFor:["Creative contemporary wedding","Sustainable celebration","Kampong Glam charm"],web:"https://www.hyatt.com/andaz/en-US/sinaz-andaz-singapore"},
{id:"capella",name:"Capella Singapore",tagline:"Sentosa Resort by Foster + Partners",tags:["Editor's Pick"],reviewSnippet:"Ultra-private island estate — a destination wedding without leaving Singapore",location:"1 The Knolls, Sentosa, S098297",area:"Sentosa",description:"Designed by Sir Norman Foster amid 30 acres of rainforest. Colonial grandeur meets contemporary luxury. Private estate celebrations with verdant lawns and cascading water features.",capacity:{s:280,st:400},setting:"Indoor & Outdoor",cuisine:["International","Chinese","Modern European"],cat:"hotel",catLabel:"Luxury Resort",featured:false,solemn:true,rating:4.9,img:"https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200&q=80",hero:"https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200&q=80",gallery:[],bestFor:["Ultra-private island estate wedding","Tropical garden celebration","World-class resort experience"],web:"https://www.capellahotels.com/en/capella-singapore"},
{id:"chijmes",name:"CHIJMES Hall",tagline:"Gothic Chapel Grandeur",tags:["Most Booked"],reviewSnippet:"Gothic chapel architecture creates photos impossible to get anywhere else",location:"30 Victoria St, S187996",area:"City Hall",description:"Gothic chapel converted into Singapore's most photogenic event venue. Soaring vaulted ceilings, stained glass windows, and dramatic architecture impossible to replicate elsewhere.",capacity:{s:300,st:400},setting:"Indoor & Outdoor",cuisine:["International","Western"],cat:"heritage",catLabel:"Heritage · Chapel",featured:false,solemn:true,rating:4.6,img:"https://images.unsplash.com/photo-1464808322410-1a934aab61e5?w=1200&q=80",hero:"https://images.unsplash.com/photo-1464808322410-1a934aab61e5?w=1200&q=80",gallery:[],bestFor:["Gothic chapel ceremony","Stained glass photography","Heritage courtyard reception"],web:"https://www.chijmes.com.sg/"},
{id:"four-seasons",name:"Four Seasons Hotel Singapore",tagline:"Orchard Boulevard Elegance",tags:[],reviewSnippet:"Legendary Four Seasons service with stunning Orchard Boulevard setting",location:"190 Orchard Blvd, S248646",area:"Orchard",description:"Floor-to-ceiling windows, custom glass chandeliers, and some of the city's finest cuisine paired with legendary Four Seasons service in an Orchard Boulevard setting.",capacity:{s:350,st:450},setting:"Indoor & Outdoor",cuisine:["International","Chinese","Western"],cat:"hotel",catLabel:"Luxury Hotel",featured:false,solemn:true,rating:4.8,img:"https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1200&q=80",hero:"https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1200&q=80",gallery:[],bestFor:["Intimate luxury celebration","World-class culinary experience","Orchard garden solemnisation"],web:"https://www.fourseasons.com/singapore/weddings/"},
{id:"grand-hyatt",name:"Grand Hyatt Singapore",tagline:"Scotts Road Grand",tags:[],reviewSnippet:"Grand pillarless ballroom perfect for large-scale celebrations",location:"10 Scotts Rd, S228211",area:"Orchard",description:"Striking versatility on Scotts Road — grand pillarless ballroom for 600 guests, private bar for after-parties. Polished Orchard Road glamour for every wedding.",capacity:{s:600,st:800},setting:"Indoor & Outdoor",cuisine:["International","Chinese","Western"],cat:"hotel",catLabel:"Luxury Hotel",featured:false,solemn:true,rating:4.6,img:"https://assets.hyatt.com/content/dam/hyatt/hyattdam/images/2019/09/24/1341/Grand-Hyatt-Singapore-P320-Grand-Ballroom-Wedding.jpg/Grand-Hyatt-Singapore-P320-Grand-Ballroom-Wedding.16x9.jpg",hero:"https://assets.hyatt.com/content/dam/hyatt/hyattdam/images/2019/09/24/1341/Grand-Hyatt-Singapore-P320-Grand-Ballroom-Wedding.jpg/Grand-Hyatt-Singapore-P320-Grand-Ballroom-Wedding.16x9.jpg",gallery:[],bestFor:["Large-scale grand ballroom","Orchard Road luxury","After-party private bar"],web:"https://www.hyatt.com/grand-hyatt/en-US/sinrs-grand-hyatt-singapore/"},
{id:"hilton-orchard",name:"Hilton Singapore Orchard",tagline:"Orchard Road Modern Grand",tags:[],reviewSnippet:"The Manor botanical enclave is a hidden gem for intimate garden weddings",location:"333 Orchard Rd, S238867",area:"Orchard",description:"Singapore's largest Hilton — Grand Ballroom for 800 guests, Imperial Ballroom for amphitheatre-style celebrations, The Manor botanical enclave for intimate garden weddings.",capacity:{s:800,st:1000},setting:"Indoor & Outdoor",cuisine:["International","Chinese","Western"],cat:"hotel",catLabel:"Modern Hotel · Grand",featured:false,solemn:true,rating:4.6,img:"https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1200&q=80",hero:"https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1200&q=80",gallery:[],bestFor:["Large-scale wedding (800 guests)","The Manor botanical garden","Orchard Road convenience"],web:"https://www.hilton.com/en/hotels/sinorhi-hilton-singapore-orchard/"},
{id:"intercontinental",name:"InterContinental Singapore",tagline:"Peranakan Heritage Luxury",tags:[],reviewSnippet:"Peranakan-inspired luxury for a uniquely Singaporean celebration",location:"80 Middle Rd, S188966",area:"Bugis",description:"Peranakan-inspired luxury blending rich cultural heritage with modern elegance. Restored Bugis Junction shophouse setting for a uniquely Singaporean wedding backdrop.",capacity:{s:350,st:450},setting:"Indoor",cuisine:["International","Chinese","Peranakan"],cat:"hotel",catLabel:"Heritage Hotel",featured:false,solemn:true,rating:4.7,img:"https://images.unsplash.com/photo-1455587734955-081b22074882?w=1200&q=80",hero:"https://images.unsplash.com/photo-1455587734955-081b22074882?w=1200&q=80",gallery:[],bestFor:["Peranakan-themed wedding","Heritage shophouse celebration","Cultural-meets-luxury"],web:"https://singapore.intercontinental.com/weddings"},
{id:"jen-tanglin",name:"JEN Singapore Tanglin",tagline:"Botanic Gardens Neighbour",tags:[],reviewSnippet:"Design-forward and affordable — steps from the UNESCO Botanic Gardens",location:"1A Cuscaden Rd, S249716",area:"Tanglin",description:"Vibrant design-forward hotel steps from the UNESCO Botanic Gardens. Playful contemporary spaces with personality — steps from Singapore's UNESCO-listed Botanic Gardens.",capacity:{s:350,st:450},setting:"Indoor & Outdoor",cuisine:["International","Chinese","Western"],cat:"hotel",catLabel:"Lifestyle Hotel",featured:false,solemn:true,rating:4.5,img:"https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=80",hero:"https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=80",gallery:[],bestFor:["Vibrant contemporary wedding","Botanic Gardens proximity","Contemporary design-forward"],web:"https://www.shangri-la.com/singapore/jen-tanglin/weddings/"},
{id:"jw-marriott",name:"JW Marriott South Beach",tagline:"Forest of Lights",tags:[],reviewSnippet:"The 11,520-light Forest of Lights LED wall is genuinely breathtaking",location:"30 Beach Rd, S189763",area:"City Hall",description:"The Grand Ballroom's iconic 11,520-light Forest of Lights LED wall creates a breathtaking backdrop. Heritage building housing contemporary luxury with Instagram-famous illuminated experiences.",capacity:{s:400,st:500},setting:"Indoor & Outdoor",cuisine:["International","Chinese","Western"],cat:"hotel",catLabel:"Modern Hotel · Iconic",featured:false,solemn:true,rating:4.7,img:"https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200&q=80",hero:"https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200&q=80",gallery:[],bestFor:["Forest of Lights LED backdrop","Modern grand ballroom","Heritage meets contemporary"],web:"https://www.marriott.com/en-us/hotels/sinjw-jw-marriott-hotel-singapore-south-beach/"},
{id:"mandarin-oriental",name:"Mandarin Oriental, Singapore",tagline:"Marina Bay Waterfront Luxury",tags:[],reviewSnippet:"Cherry Garden Chinese banquet is one of the finest in Singapore",location:"5 Raffles Ave, S039797",area:"Marina Bay",description:"Marina Bay waterfront combining Asian warmth with international sophistication. The Oriental Ballroom for grand celebrations; Cherry Garden for exquisite Chinese banquets.",capacity:{s:400,st:500},setting:"Indoor",cuisine:["International","Chinese","Western"],cat:"hotel",catLabel:"Luxury Hotel · Waterfront",featured:false,solemn:true,rating:4.7,img:"https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&q=80",hero:"https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&q=80",gallery:[],bestFor:["Marina Bay waterfront banquet","Chinese Cherry Garden dinner","Asian-luxury wedding"],web:"https://www.mandarinoriental.com/en/singapore/marina-bay/meetings-and-events/weddings"},
{id:"mbs",name:"Marina Bay Sands",tagline:"Asia's Grandest Stage",tags:["Popular Choice"],reviewSnippet:"SkyPark ceremony 200m above Marina Bay — unmistakably spectacular",location:"10 Bayfront Ave, S018956",area:"Marina Bay",description:"The architectural marvel defining Singapore's skyline. Sands Grand Ballroom hosts up to 2,500 guests — Asia's largest. SkyPark ceremonies 200m above the bay. Unmistakably spectacular.",capacity:{s:2500,st:3000},setting:"Indoor",cuisine:["International","Chinese","Western","Halal"],cat:"hotel",catLabel:"Luxury Hotel · Iconic",featured:true,solemn:true,rating:4.7,img:"https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=1200&q=80",hero:"https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=1200&q=80",gallery:[],bestFor:["Grand-scale banquet (500+ guests)","SkyPark rooftop ceremony","Iconic landmark celebration"],web:"https://www.marinabaysands.com/weddings.html"},
{id:"monti",name:"Monti",tagline:"Marina Bay Waterfront",managed:"1-Host",tags:[],reviewSnippet:"10/10 — Marina Bay views and Italian cuisine are absolutely magical",location:"Fullerton Pavilion, 82 Collyer Quay, S049327",area:"Marina Bay",description:"Chic, luxe, and intimate with breathtaking Marina Bay views. Solemnisations on the iconic spherical dome are a dream for couples seeking a swanky city soirée. Award-winning Italian cuisine. Glamorous, stylish, and unforgettable.",capacity:{s:180,st:420},setting:"Indoor & Outdoor",cuisine:["Italian","Mediterranean"],cat:"waterfront",catLabel:"Waterfront · Iconic",featured:true,solemn:true,rating:4.9,img:"https://www.1-host.sg/wp-content/uploads/2021/01/this-Host-featured-image-wordpress-794-x-1150-px-4-x-5-in-467-x-632-px-1.jpg",hero:"https://www.1-host.sg/wp-content/uploads/2021/01/1-host-Wordpress-header-5.jpg",gallery:["https://www.1-host.sg/wp-content/uploads/2021/01/Wordpress-images-2560-x-1709-px-22.jpg","https://www.1-host.sg/wp-content/uploads/2021/01/Monti_7.jpg","https://www.1-host.sg/wp-content/uploads/2021/01/MONTI-2-2.jpg"],bestFor:["Iconic Marina Bay solemnisation","Italian waterfront dinner","Glamorous city soirée"],web:"https://www.1-host.sg/venues/wedding-monti/"},
{id:"national-gallery",name:"National Gallery Singapore",tagline:"Where Art Meets History",tags:[],reviewSnippet:"Saying vows where Singapore declared independence — truly powerful",location:"1 St Andrew's Rd, S178957",area:"City Hall",description:"Exchange vows in the historic City Hall Chamber — where Singapore's independence was proclaimed. Southeast Asia's largest public collection of modern art as your backdrop.",capacity:{s:500,st:700},setting:"Indoor",cuisine:["International","Modern European"],cat:"heritage",catLabel:"Heritage · Cultural",featured:false,solemn:true,rating:4.7,img:"https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=1200&q=80",hero:"https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=1200&q=80",gallery:[],bestFor:["Historic City Hall ceremony","Art gallery backdrop","Cultural landmark wedding"],web:"https://www.nationalgallery.sg/venue-hire"},
{id:"raffles-hotel",name:"Raffles Hotel Singapore",tagline:"Timeless Elegance Since 1887",tags:["Editor's Pick"],reviewSnippet:"Over 130 years of timeless elegance — the Raffles Ballroom is iconic",location:"1 Beach Rd, S189673",area:"City Hall",description:"Singapore's most storied luxury hotel. From intimate garden solemnisations beneath tropical palms to grand banquets in the ornate Raffles Ballroom with 7-metre ceilings. Over 130 years of heritage elegance.",capacity:{s:500,st:600},setting:"Indoor & Outdoor",cuisine:["International","Western","Chinese"],cat:"hotel",catLabel:"Luxury Hotel",featured:true,solemn:true,rating:4.9,img:"https://m.ahstatic.com/is/image/accorhotels/aja_p_5553-55?wid=1920",hero:"https://m.ahstatic.com/is/image/accorhotels/aja_p_5553-55?wid=1920",gallery:[],bestFor:["Grand heritage ballroom wedding","Tropical courtyard solemnisation","Iconic Singapore celebration"],web:"https://www.raffles.com/singapore/weddings/"},
{id:"shangri-la",name:"Shangri-La Singapore",tagline:"15 Acres of Gardens",tags:["Popular Choice"],reviewSnippet:"15 acres of tropical gardens — the Island Ballroom is legendary",location:"22 Orange Grove Rd, S258350",area:"Orchard",description:"15 acres of lush tropical gardens. The legendary Island Ballroom fits 800 guests. Garden terraces and waterfall settings offer serene alternatives for intimate celebrations.",capacity:{s:800,st:1000},setting:"Indoor & Outdoor",cuisine:["International","Chinese","Western"],cat:"hotel",catLabel:"Luxury Hotel · Garden",featured:false,solemn:true,rating:4.8,img:"https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1200&q=80",hero:"https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1200&q=80",gallery:[],bestFor:["Grand ballroom wedding (800 guests)","Tropical garden solemnisation","Waterfall terrace ceremony"],web:"https://www.shangri-la.com/singapore/shangrila/weddings/"},
{id:"marriott-tang",name:"Singapore Marriott Tang Plaza",tagline:"Orchard Road Icon",tags:[],reviewSnippet:"Wan Hao Chinese banquet is exceptional — award-winning for a reason",location:"320 Orchard Rd, S238865",area:"Orchard",description:"Orchard Road icon with Certified Wedding Planners and award-winning Wan Hao Chinese Restaurant. Grand Ballroom for up to 550 guests.",capacity:{s:550,st:700},setting:"Indoor",cuisine:["Chinese","International"],cat:"hotel",catLabel:"Luxury Hotel",featured:false,solemn:true,rating:4.6,img:"https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=1200&q=80",hero:"https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=1200&q=80",gallery:[],bestFor:["Chinese banquet specialist","Award-winning Wan Hao cuisine","Orchard Road prestige"],web:"https://www.marriott.com/en-us/hotels/sindt-singapore-marriott-tang-plaza-hotel/"},
{id:"alkaff-mansion",name:"The Alkaff Mansion",tagline:"Heritage Hilltop Estate",managed:"1-Host",tags:[],reviewSnippet:"Heritage romance — verandah and gardens feel worlds away from the city",location:"10 Telok Blangah Green, S109178",area:"Telok Blangah",description:"Lovingly restored hilltop mansion surrounded by lush tropical gardens. Heritage romance — covered verandahs, ivy-draped walls, worlds away from the city yet minutes from it.",capacity:{s:200,st:300},setting:"Indoor & Outdoor",cuisine:["Mediterranean","International"],cat:"heritage",catLabel:"Heritage · Garden",featured:false,solemn:true,rating:4.7,img:"https://www.1-host.sg/wp-content/uploads/2021/01/tam.jpg",hero:"https://www.1-host.sg/wp-content/uploads/2021/01/tam.jpg",gallery:[],bestFor:["Heritage garden wedding","Romantic verandah solemnisation","Rustic-elegant reception"],web:"https://www.1-host.sg/venues/wedding-the-alkaff-mansion/"},
{id:"fullerton-hotel",name:"The Fullerton Hotel Singapore",tagline:"Neoclassical Marina Bay",tags:["Most Booked"],reviewSnippet:"Neoclassical grandeur with the most beautiful rooftop pool ceremonies",location:"1 Fullerton Square, S049178",area:"Marina Bay",description:"Magnificent neoclassical landmark overlooking Marina Bay. The Straits Room offers pillarless grandeur; the rooftop pool deck provides sunset solemnisations with the city skyline as witness.",capacity:{s:400,st:500},setting:"Indoor & Outdoor",cuisine:["International","Western","Chinese"],cat:"hotel",catLabel:"Luxury Hotel · Heritage",featured:true,solemn:true,rating:4.8,img:"https://image-tc.galaxy.tf/wijpeg-9brotku75lkjyoarluej1n954/weddings_og-image.jpg",hero:"https://image-tc.galaxy.tf/wijpeg-9brotku75lkjyoarluej1n954/weddings_og-image.jpg",gallery:[],bestFor:["Heritage waterfront ballroom","Rooftop pool ceremony","Art Deco photography backdrop"],web:"https://www.fullertonhotels.com/fullerton-hotel-singapore/weddings"},
{id:"the-garage",name:"The Garage",tagline:"Botanic Gardens Heritage",managed:"1-Host",tags:[],reviewSnippet:"Forest wedding under the stars in the UNESCO Botanic Gardens",location:"50 Cluny Park Rd, S257488",area:"Botanic Gardens",description:"Within Singapore's UNESCO World Heritage Botanic Gardens. 1920s Art Deco conservation building — forest-wedding-under-the-stars atmosphere with modern indoor comforts.",capacity:{s:90,st:150},setting:"Indoor & Outdoor",cuisine:["Modern European"],cat:"garden",catLabel:"Garden · Heritage",featured:false,solemn:true,rating:4.6,img:"https://www.1-host.sg/wp-content/uploads/2021/01/this-Host-featured-image-wordpress-794-x-1150-px-4-x-5-in-467-x-632-px-2-1.jpg",hero:"https://www.1-host.sg/wp-content/uploads/2021/01/this-Host-featured-image-wordpress-794-x-1150-px-4-x-5-in-467-x-632-px-2-1.jpg",gallery:[],bestFor:["UNESCO heritage garden wedding","Art Deco setting","Forest-under-the-stars reception"],web:"https://www.1-host.sg/venues/wedding-at-the-garage/"},
{id:"ritz-carlton",name:"The Ritz-Carlton, Millenia",tagline:"Marina Bay Art & Views",tags:[],reviewSnippet:"Contemporary art collection and Marina Bay panoramas — impeccable",location:"7 Raffles Ave, S039799",area:"Marina Centre",description:"Contemporary art meets Marina Bay grandeur. Dedicated wedding floor with panoramic bay views. An acclaimed art collection provides stunning photo backdrops with impeccable service.",capacity:{s:480,st:600},setting:"Indoor",cuisine:["International","Western","Chinese"],cat:"hotel",catLabel:"Luxury Hotel",featured:false,solemn:true,rating:4.8,img:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80",hero:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80",gallery:[],bestFor:["Marina Bay views wedding","Art collection photo backdrop","Premium hotel experience"],web:"https://www.ritzcarlton.com/en/hotels/sinrz-the-ritz-carlton-millenia-singapore/weddings/"},
{id:"the-riverhouse",name:"The Riverhouse",tagline:"Clarke Quay Waterfront",managed:"1-Host",tags:[],reviewSnippet:"First and only venue we viewed — absolutely gorgeous riverside setting",location:"3A River Valley Rd, S179020",area:"Clarke Quay",description:"Modern-meets-traditional aesthetics along the Singapore River. Intimate yet never compromising on style, location, or cosiness.",capacity:{s:100,st:200},setting:"Indoor & Outdoor",cuisine:["Chinese","International"],cat:"waterfront",catLabel:"Waterfront · Heritage",featured:false,solemn:true,rating:4.7,img:"https://www.1-host.sg/wp-content/uploads/2021/01/Riverhouse_Website-Featured.png",hero:"https://www.1-host.sg/wp-content/uploads/2021/01/Riverhouse_Website-Featured.png",gallery:[],bestFor:["Intimate riverside ceremony","Chinese banquet reception","Modern-heritage celebration"],web:"https://www.1-host.sg/venues/wedding-the-riverhouse/"},
{id:"st-regis",name:"The St. Regis Singapore",tagline:"Old-World Opulence",tags:[],reviewSnippet:"Butler service and Murano chandeliers — pure old-world sophistication",location:"29 Tanglin Rd, S247911",area:"Tanglin",description:"White-glove sophistication through signature Butler service. The John Jacob Ballroom — first and only in Singapore with two skylights. Bespoke wedding curation treating every couple as royalty.",capacity:{s:350,st:450},setting:"Indoor",cuisine:["International","French","Chinese"],cat:"hotel",catLabel:"Luxury Hotel",featured:false,solemn:true,rating:4.8,img:"https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200&q=80",hero:"https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200&q=80",gallery:[],bestFor:["Ultra-luxury bespoke wedding","Butler-serviced celebration","Old-world elegance"],web:"https://www.marriott.com/hotels/event-planning/wedding-planning/sinxr-the-st-regis-singapore/"},
{id:"the-summerhouse",name:"The Summerhouse",tagline:"Garden Estate",managed:"1-Host",tags:["Best for Intimate Weddings"],reviewSnippet:"Fairy lights and farm-to-table — like a European countryside dream",location:"3 Park Lane, S798387",area:"Seletar",description:"European-style estate surrounded by greenery and edible gardens. Fairy lights, elegant terraces, and a magical gazebo for romantic ceremonies.",capacity:{s:100,st:180},setting:"Outdoor",cuisine:["Modern European","Farm-to-Table"],cat:"garden",catLabel:"Garden · Estate",featured:false,solemn:true,rating:4.6,img:"https://www.1-host.sg/wp-content/uploads/2021/01/Host-featured-image-wordpress-794-x-1150-px-5-e1720491106172.jpg",hero:"https://www.1-host.sg/wp-content/uploads/2021/01/Host-featured-image-wordpress-794-x-1150-px-5-e1720491106172.jpg",gallery:[],bestFor:["Garden gazebo ceremony","Farm-to-table dinner","Nature-wrapped celebration"],web:"https://www.1-host.sg/venues/wedding-the-summerhouse/"}
];

const CATS=[{id:"all",label:"All Venues",icon:Sparkles},{id:"hotel",label:"Hotels",icon:Building2},{id:"rooftop",label:"Rooftop",icon:Sunset},{id:"heritage",label:"Heritage",icon:Landmark},{id:"garden",label:"Garden",icon:TreePine},{id:"waterfront",label:"Waterfront",icon:Waves},{id:"beachfront",label:"Beachfront",icon:Waves}];

const REVIEWS=[
  {text:"10/10 best decision ever for both me & my wife to host our wedding at Monti! Kudos to the team for going the extra mile.",who:"Nicholas Low",where:"Monti",s:5},
  {text:"Walking into the Raffles Ballroom took our breath away. 130 years of history witnessed our love story — nothing else compares.",who:"Sarah Tan",where:"Raffles Hotel",s:5},
  {text:"Had our wedding at Alkaff Mansion and it was amazing! Our coordinator Joan was responsive and very helpful.",who:"Wei Chen Beh",where:"The Alkaff Mansion",s:5},
  {text:"The stained glass at CHIJMES created the most magical light during our ceremony. Our photos look like they belong in a magazine.",who:"Priya Menon",where:"CHIJMES Hall",s:5},
  {text:"1-Arden blew us away. The sky garden at sunset was the most incredible backdrop we could have asked for. Our guests are still raving about it.",who:"Amanda Ng",where:"1-Arden",s:5},
  {text:"Marina Bay Sands SkyPark ceremony was truly once-in-a-lifetime. 200 metres above the bay with the whole city watching — spectacular.",who:"Kevin Lim",where:"Marina Bay Sands",s:5},
  {text:"The Summerhouse felt like a fairy tale. The garden gazebo, the fairy lights, the farm-to-table food — everything was perfect.",who:"Jonathan Khoo",where:"The Summerhouse",s:5},
  // TODO: Replace with real testimonials as they are collected
  {text:"The AI matchmaker on this site helped us discover venues we never knew existed. We ended up at The Fullerton and it was perfect.",who:"Michelle & Daniel",where:"The Fullerton Hotel",s:5}
];

// NOTE: Replace coupleImg with actual 1-Host couple photos when available
const WEDDINGS=[
  {couple:"Rachel & Edwin",venue:"Monti",guests:120,type:"Waterfront Italian dinner",quote:"The Marina Bay sunset during our solemnisation was the most magical moment of our lives.",photo:"@pixioo",vid:"monti",coupleImg:"https://images.unsplash.com/photo-1519741497674-611481863552?w=900&q=80&fit=crop&crop=faces,center&h=600",
    story:"Rachel and Edwin always knew they wanted a waterfront celebration. When they first visited Monti at Fullerton Pavilion, the panoramic Marina Bay view sealed the deal. Their solemnisation took place on the iconic dome at golden hour, with the city skyline glowing behind them. The 120 guests enjoyed a five-course Italian dinner curated by the Monti team, featuring handmade pasta and a stunning tiramisu wedding cake. The couple's first dance happened under the stars with Marina Bay Sands glittering in the background."},
  {couple:"Sarah & James",venue:"Raffles Hotel Singapore",guests:300,type:"Grand heritage ballroom",quote:"Walking into the Raffles Ballroom felt like stepping into a fairytale — 130 years of history witnessed our love.",photo:"@storiesbysg",vid:"raffles-hotel",coupleImg:"https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=900&q=80&fit=crop&crop=faces,center&h=600",
    story:"Sarah and James wanted a classic, grand celebration that honoured tradition. The Raffles Hotel was the only venue that felt right — from the tropical Palm Court solemnisation beneath century-old palms to the grand march-in at the Raffles Ballroom with its crystal chandeliers and 7-metre ceilings. 300 guests enjoyed a 10-course Chinese banquet with Western touches. The couple's tea ceremony was held in a private heritage suite, and their yum seng toast echoed through the grand ballroom."},
  {couple:"Priya & Arjun",venue:"1-Arden",guests:80,type:"Sunset sky garden",quote:"Being surrounded by the food forest 51 floors above felt like a dream.",photo:"@fellowfolks",vid:"1-arden",coupleImg:"https://images.unsplash.com/photo-1544078751-58fee2d8a03b?w=900&q=80&fit=crop&crop=faces,center&h=600",
    story:"Priya and Arjun wanted something unforgettable and intimate. At 1-Arden on Level 51 of CapitaSpring, they found it. Their ROM solemnisation was held in the sky garden surrounded by the world's highest urban food forest. As the sun set over the Singapore skyline, 80 guests shared a Coastal Australian dinner by Executive Chef John-Paul Fiechtner. The couple incorporated Indian traditions with a modern twist, including a flower garland exchange in the open-air terrace."},
  {couple:"Priya & Wei Ming",venue:"CHIJMES Hall",guests:200,type:"Multicultural chapel celebration",quote:"The stained glass windows lit up as we exchanged vows — our two cultures united under one beautiful roof.",photo:"@lensofblurstudio",vid:"chijmes",coupleImg:"https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=900&q=80&fit=crop&crop=faces,center&h=600",
    story:"Priya and Wei Ming's wedding was a beautiful blend of Indian and Chinese traditions under CHIJMES Hall's Gothic vaulted ceiling. The ceremony featured a garland exchange followed by a tea ceremony in the courtyard. 200 guests enjoyed a fusion menu that honoured both cultures — from tandoori-spiced dishes to Cantonese dim sum. The stained glass windows created a kaleidoscope of colour during the afternoon ceremony, and the couple's first dance beneath the exposed beams was pure magic."},
  {couple:"Wei Ling & Jun Hao",venue:"The Alkaff Mansion",guests:150,type:"Heritage garden lunch",quote:"The heritage mansion made our tea ceremony feel so connected to tradition.",photo:"@iluminen",vid:"alkaff-mansion",coupleImg:"https://images.unsplash.com/photo-1546032996-6dfacbacbf3f?w=900&q=80&fit=crop&crop=faces,center&h=600",
    story:"Wei Ling and Jun Hao chose The Alkaff Mansion for its deep sense of heritage. The century-old hilltop estate surrounded by tropical gardens was the perfect backdrop for their traditional Chinese tea ceremony. 150 guests gathered for a Mediterranean-inspired lunch on the mansion's covered verandah, with ivy-draped walls and heritage architecture creating photos that looked like a European countryside wedding in the heart of Singapore."},
  {couple:"Rachel & David",venue:"The Summerhouse",guests:60,type:"Intimate garden brunch",quote:"The garden gazebo, fairy lights, and farm-to-table food — it was our countryside dream come true.",photo:"@weddayscollective",vid:"the-summerhouse",coupleImg:"https://images.unsplash.com/photo-1529636798458-92182e662485?w=900&q=80&fit=crop&crop=faces,center&h=600",
    story:"Rachel and David wanted an intimate celebration surrounded by nature. The Summerhouse's European-style garden estate in Seletar was their dream venue. Just 60 of their closest friends and family gathered for a barefoot ceremony under the garden gazebo, followed by a farm-to-table brunch featuring produce from the venue's own edible garden. Fairy lights strung between the trees created the countryside wedding they had always imagined."},
  {couple:"Sarah & David",venue:"1-Alfaro",guests:100,type:"Rooftop lighthouse dinner",quote:"Our guests couldn't stop talking about the panoramic views and incredible Italian food.",photo:"@d.t._pictures",vid:"1-alfaro",coupleImg:"https://images.unsplash.com/photo-1549417229-7686ac5595fd?w=900&q=80&fit=crop&crop=faces,center&h=600",
    story:"Sarah and David were among the first couples to celebrate at 1-Alfaro, Singapore's newest rooftop venue at Labrador Tower. The floor-to-ceiling glass walls offered breathtaking views of the city and sea. Their 100 guests enjoyed authentic Emilia-Romagna cuisine from the MONTI team, featuring the venue's signature farm-to-table concept. The couple's vows were exchanged as the sun painted the sky in shades of gold and pink."},
  {couple:"Amanda & Kevin",venue:"Marina Bay Sands",guests:500,type:"Grand ballroom gala",quote:"We wanted the most spectacular venue in Singapore and MBS delivered beyond our wildest dreams.",photo:"@orangestudios",vid:"mbs",coupleImg:"https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=900&q=80&fit=crop&crop=faces,center&h=600",
    story:"Amanda and Kevin dreamed big — a grand-scale celebration for 500 guests at Asia's most iconic venue. Their SkyPark solemnisation 200 metres above Marina Bay was followed by a spectacular march-in to the Sands Grand Ballroom with confetti cannons and a live string quartet. The 10-course Chinese banquet featured a custom menu by the MBS culinary team. The evening ended with a surprise fireworks display visible from the ballroom's panoramic windows."},
  {couple:"Nurul & Faris",venue:"1-Atico",guests:60,type:"Orchard skyline ROM",quote:"Intimate solemnisation above Orchard Road — chic and unforgettable.",photo:"@wemerryground",vid:"1-atico",coupleImg:"https://images.unsplash.com/photo-1621112904887-419379ce6824?w=900&q=80&fit=crop&crop=faces,center&h=600",
    story:"Nurul and Faris kept it intimate and modern. Perched atop ION Orchard, 1-Atico provided a stunning skyline backdrop for their ROM solemnisation with just 60 of their closest family and friends. The couple chose a contemporary nikah ceremony followed by a modern European dinner. The panoramic city views at night, with Orchard Road's lights twinkling below, made for magical reception photos."},
  {couple:"Joanne & Marcus",venue:"The Summerhouse",guests:70,type:"Garden estate brunch",quote:"Fairy lights and farm-to-table felt like a European countryside wedding.",photo:"@ikicompany",vid:"the-summerhouse",coupleImg:"https://images.unsplash.com/photo-1595407660626-db35dcd16609?w=900&q=80&fit=crop&crop=faces,center&h=600",
    story:"Joanne and Marcus wanted a relaxed, nature-filled celebration. The Summerhouse's European-style garden estate in Seletar was their dream venue. Fairy lights strung between the trees, a magical gazebo ceremony, and a farm-to-table brunch menu featuring produce from the venue's own edible garden created the intimate countryside wedding they had always imagined — just 70 guests, great food, and pure joy."}
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
const VK=VENUES.map(v=>`${v.name}${v.managed?" [1-Host]":""}: ${v.catLabel}, ${v.area}, ${v.capacity.s} seated/${v.capacity.st} standing, cuisine: ${v.cuisine.join(",")}, ${v.setting}. ${v.description}`).join("\n\n");

// ── IMG ──────────────────────────────────────────────────────────────────
const VI=({src,alt,className="",style={}})=>{const[e,sE]=useState(!src);const cols={rooftop:["#1A1A2E","#2D1B69"],hotel:["#1a2332","#2c3e50"],heritage:["#3E2723","#5D4037"],garden:["#1B3A2D","#2D5A45"],waterfront:["#0c2d3f","#1A535C"],beachfront:["#0a3d5c","#0E7490"]};const name=alt?.split("—")[0]?.trim()||"";const k=alt?.includes("Rooftop")?"rooftop":alt?.includes("Hotel")||alt?.includes("Resort")?"hotel":alt?.includes("Heritage")||alt?.includes("Chapel")||alt?.includes("Cultural")?"heritage":alt?.includes("Garden")?"garden":alt?.includes("Waterfront")?"waterfront":"hotel";const c=cols[k]||cols.hotel;if(e||!src)return<div className={className} style={{...style,background:`linear-gradient(145deg,${c[0]},${c[1]})`,display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:8,position:"relative",overflow:"hidden"}}><div style={{position:"absolute",inset:0,background:"radial-gradient(circle at 30% 40%, rgba(232,131,124,.08) 0%, transparent 60%)",pointerEvents:"none"}}/><div style={{position:"absolute",bottom:"-20%",right:"-15%",width:"50%",height:"50%",borderRadius:"50%",background:"rgba(255,255,255,.03)",pointerEvents:"none"}}/><span style={{color:"rgba(255,255,255,.65)",fontFamily:"var(--fh)",fontSize:"clamp(15px,1.8vw,22px)",fontWeight:400,textAlign:"center",padding:"0 20px",position:"relative",zIndex:1,letterSpacing:".02em"}}>{name}</span><span style={{color:"rgba(232,131,124,.5)",fontSize:10,fontWeight:600,letterSpacing:".1em",textTransform:"uppercase",position:"relative",zIndex:1}}>WEDDING VENUE</span></div>;return<img src={src} alt={alt} className={className} style={{...style,objectFit:"cover"}} onError={()=>sE(true)} loading="lazy"/>};

// ═════════════════════════════════════════════════════════════════════════
// AUTH SYSTEM — Master Admin → Admins → Visitors
// ═════════════════════════════════════════════════════════════════════════
const MASTER_ADMIN = { email: "chris.millar@1-group.sg", password: "1Group2026!", role: "master" };
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
      // Check registered users in localStorage (same-browser accounts)
      const users = getUsers();
      const user = users.find(u => u.email === cleanEmail);
      if (user) {
        if (user.password !== pass) { setErr("Incorrect password."); setLoading(false); return; }
        if (!user.active) { setErr("Account has been deactivated. Contact your administrator."); setLoading(false); return; }
        const session = { email: cleanEmail, role: user.role, name: user.name };
        saveSession(session);
        onLogin(session);
        setLoading(false);
        return;
      }
      // Any @1-group.sg email with the team password gets visitor access
      if (pass === MASTER_ADMIN.password) {
        const name = cleanEmail.split("@")[0].split(".").map(w=>w.charAt(0).toUpperCase()+w.slice(1)).join(" ");
        const session = { email: cleanEmail, role: "visitor", name: name };
        saveSession(session);
        onLogin(session);
        setLoading(false);
        return;
      }
      setErr("Incorrect password. Use the team password provided by your administrator.");
      setLoading(false);
    }, 600);
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--cr)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, fontFamily: "var(--fb)" }}>
      {/* Decorative background */}
      <div style={{ position: "fixed", top: "-20%", right: "-15%", width: "60vw", height: "60vw", background: "radial-gradient(circle, rgba(232,131,124,.06) 0%, transparent 70%)", animation: "morphBlob 25s ease-in-out infinite", pointerEvents: "none" }} />
      <div style={{ position: "fixed", bottom: "-20%", left: "-15%", width: "50vw", height: "50vw", background: "radial-gradient(circle, rgba(212,165,165,.05) 0%, transparent 70%)", animation: "morphBlob 20s ease-in-out 5s infinite", pointerEvents: "none" }} />

      <div style={{ width: "100%", maxWidth: 420, position: "relative", zIndex: 1 }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 40, animation: "heroTextIn .8s ease forwards" }}>
          <Heart size={36} style={{ color: "var(--ro)", marginBottom: 16 }} fill="var(--ro)" />
          <h1 style={{ fontFamily: "var(--fh)", fontSize: 28, fontWeight: 400, color: "var(--c)", marginBottom: 6 }}>Singapore Wedding Venues</h1>
          <p style={{ fontSize: 13, color: "var(--g)", letterSpacing: ".02em" }}>Admin & Team Portal</p>
        </div>

        {/* Sign In Card */}
        <div style={{ background: "var(--w)", borderRadius: 20, padding: "36px 32px", boxShadow: "0 20px 60px rgba(0,0,0,.08), 0 0 0 1px rgba(232,131,124,.08)", animation: "cardEnter .6s ease .2s both" }}>
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
              <span style={{ fontSize: 10, color: "var(--gi)", display: "block", marginTop: 4 }}>v15</span>
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
        :root{--w:#FFF;--cr:#FFFFFF;--cw:#FFF8F5;--iv:#FFFBFA;--ro:#E8837C;--rl:#F2A9A4;--rp:#FFF0ED;--rd:#D4625A;--go:#E8837C;--gl:#F2A9A4;--gp:#FADBD8;--gd:#C0504A;--sa:#A8C5A0;--sl:#D4E4D0;--c:#333333;--cl:#555555;--g:#8A8A8A;--gi:#C5C5C5;--gpa:#EEEEEE;--gg:#F7F7F7;--fh:'Cormorant Garamond',serif;--fb:'DM Sans',sans-serif;--e:cubic-bezier(.4,0,.2,1)}
        *{box-sizing:border-box;margin:0;padding:0}
        @keyframes morphBlob{0%,100%{border-radius:60% 40% 30% 70%/60% 30% 70% 40%}50%{border-radius:50% 60% 30% 60%/30% 60% 70% 40%}}
        @keyframes heroTextIn{0%{opacity:0;transform:translateY(20px);filter:blur(6px)}100%{opacity:1;transform:translateY(0);filter:blur(0)}}
        @keyframes cardEnter{from{opacity:0;transform:translateY(40px) scale(.95)}to{opacity:1;transform:translateY(0) scale(1)}}
        @keyframes fU{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
        @keyframes spin{to{transform:rotate(360deg)}}
        .inp{border:1px solid #E8E8E8;padding:10px 16px;border-radius:8px;font-family:'DM Sans',sans-serif;font-size:14px;transition:border-color .2s,box-shadow .2s;width:100%;outline:none;background:#FFF}
        .inp:focus{border-color:#E8837C;box-shadow:0 0 0 3px rgba(232,131,124,.15)}
        .bg{background:linear-gradient(135deg,#E8837C,#C0504A);color:#FFF;border:none;padding:12px 28px;border-radius:8px;font-family:'DM Sans',sans-serif;font-weight:600;font-size:14px;letter-spacing:.04em;cursor:pointer;transition:all .2s;display:inline-flex;align-items:center;gap:8px}
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
  const[pg,sPg]=useState("home");const[av,sAv]=useState(null);const[aw,sAw]=useState(null);const[mm,sMm]=useState(false);const[mega,sMega]=useState(false);const[sy,sSy]=useState(0);const[ai,sAi]=useState(false);const[st,sSt]=useState(false);
  const[shortlist,setShortlist]=useState([]);
  const toggleShortlist=(id)=>setShortlist(prev=>prev.includes(id)?prev.filter(x=>x!==id):[...prev,id]);
  useEffect(()=>{const h=()=>{sSy(window.scrollY);sSt(window.scrollY>500)};window.addEventListener("scroll",h,{passive:true});return()=>window.removeEventListener("scroll",h)},[]);
  const go=(p,v=null)=>{if(p==="wedding-story"){sPg("wedding-story");sAw(v);sAv(null)}else{sPg(p);sAv(v);sAw(null)}sMm(false);sMega(false);window.scrollTo({top:0,behavior:"smooth"})};
  useEffect(()=>{document.querySelectorAll('script[data-swv]').forEach(s=>s.remove());[SEO_SCHEMA.website,SEO_SCHEMA.faq].forEach(s=>{const el=document.createElement("script");el.type="application/ld+json";el.setAttribute("data-swv","1");el.textContent=JSON.stringify(s);document.head.appendChild(el)})},[pg]);
  const NI=[{l:"Home",p:"home"},{l:"Venues",p:"venues"},{l:"AI Tools",p:"ai-tools"},{l:"Real Weddings",p:"weddings"},{l:"Blog",p:"blog"},{l:"Showcases",p:"shows"},{l:"About",p:"about"}];
  const navItems=shortlist.length>0?[...NI,{l:`♥ Shortlist (${shortlist.length})`,p:"shortlist"}]:NI;

  return(<div style={{fontFamily:"var(--fb)",color:"var(--c)",background:"var(--cr)",minHeight:"100vh"}}>
    <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap');
    :root{--w:#FFF;--cr:#FFFFFF;--cw:#FFF8F5;--iv:#FFFBFA;--ro:#E8837C;--rl:#F2A9A4;--rp:#FFF0ED;--rd:#D4625A;--go:#E8837C;--gl:#F2A9A4;--gp:#FADBD8;--gd:#C0504A;--sa:#A8C5A0;--c:#333333;--cl:#555555;--g:#8A8A8A;--gi:#C5C5C5;--gpa:#EEEEEE;--gg:#F7F7F7;--fh:'Cormorant Garamond',serif;--fb:'DM Sans',sans-serif;--ss:0 1px 3px rgba(0,0,0,.06);--sm:0 4px 12px rgba(0,0,0,.08);--sl:0 8px 30px rgba(0,0,0,.10);--sx:0 16px 50px rgba(0,0,0,.12);--sg:0 4px 20px rgba(232,131,124,.18);--e:cubic-bezier(.4,0,.2,1)}
    *{box-sizing:border-box;margin:0;padding:0}
    @keyframes fU{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
    @keyframes fI{from{opacity:0}to{opacity:1}}
    @keyframes bI{from{opacity:0;filter:blur(10px);transform:translateY(12px) scale(.97)}to{opacity:1;filter:blur(0);transform:translateY(0) scale(1)}}
    @keyframes kB{0%{transform:scale(1)}100%{transform:scale(1.12)}}
    @keyframes sh{0%{background-position:-200% 0}100%{background-position:200% 0}}
    @keyframes fl{0%,100%{transform:translateY(0) translateX(0);opacity:.15}25%{transform:translateY(-22px) translateX(10px);opacity:.4}50%{transform:translateY(-40px) translateX(-8px);opacity:.25}75%{transform:translateY(-18px) translateX(14px);opacity:.35}}
    @keyframes pu{0%,100%{box-shadow:0 0 0 0 rgba(232,131,124,.4)}50%{box-shadow:0 0 0 12px rgba(232,131,124,0)}}
    @keyframes slideInL{from{opacity:0;transform:translateX(-40px)}to{opacity:1;transform:translateX(0)}}
    @keyframes slideInR{from{opacity:0;transform:translateX(40px)}to{opacity:1;transform:translateX(0)}}
    @keyframes morphBlob{0%,100%{border-radius:60% 40% 30% 70%/60% 30% 70% 40%}25%{border-radius:30% 60% 70% 40%/50% 60% 30% 60%}50%{border-radius:50% 60% 30% 60%/30% 60% 70% 40%}75%{border-radius:60% 40% 60% 30%/70% 30% 50% 60%}}
    @keyframes gradShift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
    @keyframes textGlow{0%,100%{text-shadow:0 0 0 transparent}50%{text-shadow:0 0 30px rgba(232,131,124,.15)}}
    @keyframes revealLine{from{transform:scaleX(0)}to{transform:scaleX(1)}}
    @keyframes heroTextIn{0%{opacity:0;transform:translateY(24px);filter:blur(8px)}50%{opacity:1;filter:blur(0)}100%{opacity:1;transform:translateY(0);filter:blur(0)}}
    @keyframes cardEnter{from{opacity:0;transform:translateY(40px) scale(.95)}to{opacity:1;transform:translateY(0) scale(1)}}
    @keyframes countPop{0%{transform:scale(1)}50%{transform:scale(1.12)}100%{transform:scale(1)}}
    @keyframes spin{to{transform:rotate(360deg)}}
    @keyframes heartbeat{0%,100%{transform:scale(1)}14%{transform:scale(1.15)}28%{transform:scale(1)}}
    @keyframes btnShine{0%{left:-100%}100%{left:200%}}
    @keyframes bokeh{0%,100%{transform:translate(0,0) scale(1);opacity:.12}33%{transform:translate(30px,-40px) scale(1.3);opacity:.2}66%{transform:translate(-20px,20px) scale(.8);opacity:.08}}
    @keyframes dividerReveal{from{transform:scaleX(0);opacity:0}to{transform:scaleX(1);opacity:1}}
    @keyframes wordReveal{0%{opacity:0;transform:translateY(14px);filter:blur(4px)}100%{opacity:1;transform:translateY(0);filter:blur(0)}}
    @keyframes softBounce{0%{transform:translateY(0)}50%{transform:translateY(-6px)}100%{transform:translateY(0)}}
    @keyframes parallaxDrift{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-15px) rotate(1deg)}}
    @keyframes rippleOut{0%{transform:scale(0);opacity:.4}100%{transform:scale(4);opacity:0}}
    @media(prefers-reduced-motion:reduce){*{animation-duration:.01ms!important;transition-duration:.01ms!important}}
    .sk{background:linear-gradient(90deg,var(--gg) 25%,var(--gp) 50%,var(--gg) 75%);background-size:200% 100%;animation:sh 1.5s ease-in-out infinite;border-radius:8px}
    .vc{transition:transform .4s var(--e),box-shadow .4s var(--e);position:relative;overflow:hidden;border-radius:14px;background:var(--iv);cursor:pointer}
    .vc:hover{transform:translateY(-10px) scale(1.01);box-shadow:0 20px 60px rgba(0,0,0,.12),0 0 0 1px rgba(232,131,124,.15)}
    .vc .vi{transition:transform .7s var(--e)}.vc:hover .vi{transform:scale(1.08)}
    .vc::after{content:'';position:absolute;bottom:0;left:0;width:100%;height:3px;background:linear-gradient(90deg,transparent,var(--go),transparent);transform:translateX(-100%);transition:transform .7s var(--e)}.vc:hover::after{transform:translateX(100%)}
    .vc::before{content:'';position:absolute;top:0;left:0;right:0;height:100%;background:linear-gradient(180deg,transparent 60%,rgba(232,131,124,.04) 100%);opacity:0;transition:opacity .4s;z-index:1;pointer-events:none}.vc:hover::before{opacity:1}
    .bg{background:linear-gradient(135deg,var(--go),var(--gd));color:var(--w);border:none;padding:12px 28px;border-radius:8px;font-family:var(--fb);font-weight:600;font-size:14px;letter-spacing:.04em;cursor:pointer;transition:all .25s var(--e);display:inline-flex;align-items:center;gap:8px;text-decoration:none;position:relative;overflow:hidden}
    .bg:hover{filter:brightness(1.1);transform:translateY(-2px);box-shadow:var(--sg)}.bg:active{transform:translateY(0)}
    .bg::after{content:'';position:absolute;top:0;left:-100%;width:60%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.2),transparent);transition:none}.bg:hover::after{animation:btnShine .6s ease forwards}
    .nl{position:relative;color:var(--c);text-decoration:none;font-size:14px;font-weight:500;letter-spacing:.03em;padding:8px 0;cursor:pointer;background:none;border:none;font-family:var(--fb)}
    .nl::after{content:'';position:absolute;bottom:-2px;left:0;width:100%;height:2px;background:var(--go);transform:scaleX(0);transform-origin:center;transition:transform .3s var(--e)}
    .nl:hover::after,.nl.a::after{transform:scaleX(1)}
    .inp{border:1px solid var(--gpa);padding:10px 16px;border-radius:8px;font-family:var(--fb);font-size:14px;transition:border-color .2s,box-shadow .2s;width:100%;outline:none;background:var(--w)}
    .inp:focus{border-color:var(--go);box-shadow:0 0 0 3px rgba(232,131,124,.15)}
    .cp{padding:7px 16px;border-radius:999px;font-family:var(--fb);font-weight:500;font-size:13px;cursor:pointer;border:1px solid var(--gpa);background:var(--w);transition:all .25s var(--e);white-space:nowrap;display:inline-flex;align-items:center;gap:5px;position:relative;overflow:hidden}
    .cp:hover,.cp.a{background:var(--c);color:var(--w);border-color:var(--c);transform:translateY(-1px)}
    .mb{background:linear-gradient(135deg,var(--go),var(--gd));color:var(--w);font-size:9px;font-weight:700;letter-spacing:.06em;padding:3px 8px;border-radius:999px;text-transform:uppercase;display:inline-flex;align-items:center;gap:3px}
    .nav-heart{animation:heartbeat 3s ease-in-out infinite}
    .sdiv{height:1px;background:linear-gradient(90deg,transparent,var(--go),transparent);margin:0 auto;max-width:120px}
    .sdiv.vis{animation:dividerReveal .8s ease forwards}
    @media(max-width:1023px){.hd{display:none!important}.sm{display:block!important}}
    `}</style>

    {/* NAV */}
    <nav style={{position:"sticky",top:0,zIndex:50,background:sy>20?"rgba(255,255,255,.97)":"var(--w)",backdropFilter:sy>20?"blur(12px)":"none",borderBottom:"1px solid var(--gp)",transition:"all .3s"}} role="navigation" aria-label="Main navigation">
      <div style={{maxWidth:1280,margin:"0 auto",padding:"0 24px",height:68,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <button onClick={()=>go("home")} style={{background:"none",border:"none",cursor:"pointer",display:"flex",alignItems:"center",gap:8}} aria-label="Home">
          <Heart size={20} style={{color:"var(--ro)"}} fill="var(--ro)" className="nav-heart"/>
          <span style={{fontFamily:"var(--fh)",fontSize:19,fontWeight:500,color:"var(--c)"}}>Singapore Wedding Venues</span>
        </button>
        <div className="hd" style={{display:"flex",alignItems:"center",gap:22}}>
          {navItems.map(n=><div key={n.p} style={{position:"relative"}} onMouseEnter={()=>n.p==="venues"&&sMega(true)} onMouseLeave={()=>n.p==="venues"&&sMega(false)}>
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

    {mm&&<MobMenu items={navItems} go={go} close={()=>sMm(false)} session={session} onLogout={onLogout} onOpenAdmin={onOpenAdmin}/>}

    <main role="main">
      {av?<Detail v={av} go={go} shortlist={shortlist} onToggleShortlist={toggleShortlist}/>:
       aw?<WeddingStory s={aw} go={go}/>:
       pg==="home"?<Home go={go} shortlist={shortlist} onToggleShortlist={toggleShortlist}/>:
       pg==="venues"?<Dir go={go} shortlist={shortlist} onToggleShortlist={toggleShortlist}/>:
       pg==="ai-tools"?<AIHub/>:
       pg==="weddings"?<RWPage go={go}/>:
       pg==="blog"?<BlogPage/>:
       pg==="shows"?<Shows/>:
       pg==="about"?<Abt/>:
       pg==="shortlist"?<ShortlistPage go={go} shortlist={shortlist} onToggleShortlist={toggleShortlist} onClear={()=>setShortlist([])}/>:
       <Home go={go} shortlist={shortlist} onToggleShortlist={toggleShortlist}/>}
    </main>

    <ScrollProgress/>
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
function Home({go,shortlist,onToggleShortlist}){
  const[sl,sSl]=useState(0);const[pr,sPr]=useState(0);
  useEffect(()=>{const iv=setInterval(()=>sSl(s=>(s+1)%HERO_SLIDES.length),6e3);return()=>clearInterval(iv)},[]);
  useEffect(()=>{sPr(0);const t=setTimeout(()=>sPr(100),50);return()=>clearTimeout(t)},[sl]);
  return(<>
    {/* HERO */}
    <section style={{position:"relative",height:"75vh",minHeight:500,overflow:"hidden"}} role="banner" aria-label="Featured Singapore wedding venues">
      {HERO_SLIDES.map((s,i)=>{const v=VENUES.find(x=>x.id===s.vid);return(<div key={i} style={{position:"absolute",inset:0,opacity:sl===i?1:0,transition:"opacity 1s ease"}}><div style={{position:"absolute",inset:0,animation:sl===i?"kB 14s ease-in-out forwards":"none"}}><VI src={v?.hero||v?.img} alt={`${v?.name||"Singapore"} — ${v?.catLabel||"Wedding Venue"} Singapore`} style={{width:"100%",height:"100%"}}/></div><div style={{position:"absolute",inset:0,background:"linear-gradient(180deg,rgba(45,45,45,.08) 0%,rgba(45,45,45,.55) 60%,rgba(45,45,45,.8) 100%)"}}/></div>)})}
      {/* Decorative morphing blob */}
      <div style={{position:"absolute",top:"-20%",right:"-10%",width:"50vw",height:"50vw",background:"radial-gradient(circle,rgba(232,131,124,.08) 0%,transparent 70%)",animation:"morphBlob 20s ease-in-out infinite",zIndex:1,pointerEvents:"none"}}/>
      {/* Floating particles */}
      <div style={{position:"absolute",inset:0,overflow:"hidden",pointerEvents:"none",zIndex:2}}>{Array.from({length:15},(_,i)=><div key={i} style={{position:"absolute",left:`${(i*7.1+3)%100}%`,top:`${(i*11.3+5)%100}%`,width:Math.random()*7+3,height:Math.random()*7+3,borderRadius:"50%",background:`rgba(232,131,124,${.2+Math.random()*.2})`,animation:`fl ${8+Math.random()*6}s ease-in-out ${i*.4}s infinite`,filter:"blur(1px)"}}/>)}</div>
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

    <SectionDivider style={{marginTop:-1,marginBottom:-1}}/>

    {/* FEATURED VENUES — merged 1-Host + Hotels */}
    <section style={{padding:"64px 24px",background:"var(--w)",position:"relative",overflow:"hidden"}} aria-label="Featured wedding venues Singapore">
      <BokehField count={4} color="rgba(232,131,124," style={{opacity:.5}}/>
      <div style={{maxWidth:1200,margin:"0 auto"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:28,flexWrap:"wrap",gap:10}}>
          <div><h2 style={{fontFamily:"var(--fh)",fontSize:"clamp(24px,3vw,36px)",fontWeight:400}}>Featured Venues</h2><p style={{color:"var(--g)",fontSize:14,marginTop:6}}>Rooftop restaurants, luxury hotels, heritage mansions, and garden estates — {VENUES.length} iconic Singapore wedding venues</p></div>
          <button className="nl" onClick={()=>go("venues")} style={{fontSize:13,color:"var(--gd)"}}>Browse All {VENUES.length} <ChevronRight size={13} style={{display:"inline",verticalAlign:"middle"}}/></button>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(270px,1fr))",gap:20}}>{VENUES.filter(v=>v.featured).sort((a,b_)=>(b_.managed?1:0)-(a.managed?1:0)).map((v,i)=><VCd key={v.id} v={v} i={i} onClick={()=>go("venues",v)} shortlist={shortlist} onToggleShortlist={onToggleShortlist}/>)}</div>
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
    <SectionDivider style={{marginTop:-1,marginBottom:-1}}/>
    <section style={{padding:"64px 24px",background:"var(--cr)",position:"relative",overflow:"hidden"}}>
      <BokehField count={3} color="rgba(212,165,165,"/>
      <div style={{maxWidth:1200,margin:"0 auto"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:28}}><h2 style={{fontFamily:"var(--fh)",fontSize:"clamp(24px,3vw,36px)",fontWeight:400}}>Real Weddings</h2><button className="nl" onClick={()=>go("weddings")} style={{fontSize:13,color:"var(--gd)"}}>All Stories <ChevronRight size={13} style={{display:"inline",verticalAlign:"middle"}}/></button></div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:18}}>{WEDDINGS.slice(0,4).map((s,i)=>{const v=VENUES.find(x=>x.id===s.vid);return(<RWCd key={i} s={s} v={v} go={go}/>)})}</div>
      </div>
    </section>

    <StatStrip/><SectionDivider/><TestCarousel/>

    <SectionDivider style={{marginTop:-1,marginBottom:-1}}/>
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
function VCd({v,i=0,onClick,shortlist=[],onToggleShortlist}){const[r,vis]=useSR();const isLiked=shortlist.includes(v.id);const tagColors={"Editor's Pick":{bg:"var(--go)",c:"var(--w)"},"Popular Choice":{bg:"var(--ro)",c:"var(--w)"},"Most Booked":{bg:"var(--c)",c:"var(--w)"},"Best for Intimate Weddings":{bg:"var(--sa)",c:"var(--w)"}};const tag=v.tags?.[0];const tc=tagColors[tag]||{bg:"var(--go)",c:"var(--w)"};return(
  <article ref={r} className="vc" onClick={onClick} style={{opacity:vis?1:0,transform:vis?"translateY(0) scale(1)":"translateY(35px) scale(.96)",transition:`all .6s var(--e) ${i*80}ms`,boxShadow:"var(--ss)"}} itemScope itemType="https://schema.org/EventVenue">
    <div style={{position:"relative",paddingTop:"56.25%",overflow:"hidden"}}>
      <VI src={v.hero||v.img} alt={`${v.name} — ${v.catLabel} wedding venue in ${v.area}, Singapore`} className="vi" style={{position:"absolute",inset:0,width:"100%",height:"100%"}}/>
      {tag&&<span style={{position:"absolute",top:9,left:9,background:tc.bg,color:tc.c,fontSize:9,fontWeight:700,padding:"3px 8px",borderRadius:999,zIndex:2,letterSpacing:".04em",textTransform:"uppercase"}}>{tag}</span>}
      {v.isNew&&<span style={{position:"absolute",top:tag?28:9,left:9,background:"var(--go)",color:"var(--w)",fontSize:9,fontWeight:700,padding:"2px 7px",borderRadius:999,zIndex:2}}>NEW</span>}
      {onToggleShortlist&&<button onClick={e=>{e.stopPropagation();onToggleShortlist(v.id)}} style={{position:"absolute",top:9,right:9,width:32,height:32,borderRadius:"50%",background:"rgba(255,255,255,.85)",border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",zIndex:3,transition:"transform .2s",transform:isLiked?"scale(1.1)":"scale(1)"}} aria-label={isLiked?"Remove from shortlist":"Add to shortlist"}><Heart size={16} fill={isLiked?"var(--go)":"none"} color={isLiked?"var(--go)":"var(--g)"} style={{transition:"all .2s"}}/></button>}
    </div>
    <div style={{padding:"12px 14px 16px"}}>
      <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:3}}>
        <h3 itemProp="name" style={{fontFamily:"var(--fh)",fontSize:19,fontWeight:500,flex:1}}>{v.name}</h3>
        <span style={{fontSize:12,color:"var(--go)",fontWeight:600,whiteSpace:"nowrap"}}>★ {v.rating}</span>
      </div>
      <p style={{fontSize:12,color:"var(--g)",marginBottom:4,display:"flex",alignItems:"center",gap:3}}><MapPin size={11}/>{v.area}</p>
      {v.reviewSnippet&&<p style={{fontSize:11,color:"var(--cl)",fontStyle:"italic",lineHeight:1.4,marginBottom:6}}>"{v.reviewSnippet}"</p>}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <span style={{fontSize:11,color:"var(--g)"}}><Users size={11} style={{display:"inline",verticalAlign:"middle"}}/> Up to {v.capacity.st||v.capacity.s}</span>
        {v.managed&&<span style={{fontSize:9,color:"var(--gd)",fontWeight:700,letterSpacing:".04em"}}>✧ Featured Partner</span>}
      </div>
    </div>
  </article>
);}

function RWCd({s,v,go}){const[r,vis]=useSR();return(
  <article ref={r} className="vc" style={{borderRadius:14,overflow:"hidden",background:"var(--w)",boxShadow:"var(--ss)",cursor:"pointer",opacity:vis?1:0,transform:vis?"translateY(0) scale(1)":"translateY(25px) scale(.97)",transition:"all .6s var(--e)"}} onClick={()=>go("wedding-story",s)}>
    <div style={{paddingTop:"56.25%",position:"relative",overflow:"hidden"}}><img src={s.coupleImg} alt={s.couple+" wedding at "+s.venue} className="vi" style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",objectPosition:"center 25%"}} loading="lazy"/></div>
    <div style={{padding:"16px 18px 20px"}}>
      <h3 style={{fontFamily:"var(--fh)",fontSize:20,fontWeight:500,marginBottom:4}}>{s.couple}</h3>
      <p style={{fontSize:12,color:"var(--gd)",fontWeight:600,marginBottom:4}}>{s.venue} · {s.guests} guests · {s.type}</p>
      <p style={{fontSize:13,color:"var(--cl)",fontStyle:"italic",lineHeight:1.6,marginBottom:8}}>"{s.quote}"</p>
      <p style={{fontSize:13,fontWeight:600,color:"var(--gd)",display:"flex",alignItems:"center",gap:4}}>Read Their Story <ChevronRight size={13}/></p>
    </div>
  </article>
);}

// ── MOTION COMPONENTS ────────────────────────────────────────────────────
function ScrollProgress(){
  const[pct,setPct]=useState(0);
  useEffect(()=>{const h=()=>{const doc=document.documentElement;const scrolled=doc.scrollTop/(doc.scrollHeight-doc.clientHeight)*100;setPct(scrolled)};window.addEventListener("scroll",h,{passive:true});return()=>window.removeEventListener("scroll",h)},[]);
  return<div style={{position:"fixed",top:0,left:0,right:0,height:3,zIndex:60,background:"transparent",pointerEvents:"none"}}><div style={{height:"100%",background:"linear-gradient(90deg,var(--go),var(--gd),var(--go))",width:pct+"%",transition:"width .1s linear",boxShadow:pct>2?"0 0 8px rgba(232,131,124,.4)":"none"}}/></div>;
}

function SectionDivider({style={}}){const[r,v]=useSR();return<div ref={r} className={"sdiv"+(v?" vis":"")} style={{...style,transform:v?"scaleX(1)":"scaleX(0)"}}/>;}

function BokehField({count=6,color="rgba(232,131,124,",style={}}){return<div style={{position:"absolute",inset:0,overflow:"hidden",pointerEvents:"none",...style}}>{Array.from({length:count},(_,i)=><div key={i} style={{position:"absolute",left:(i*17.3+5)%90+"%",top:(i*23.7+8)%85+"%",width:Math.random()*60+30,height:Math.random()*60+30,borderRadius:"50%",background:color+(0.04+Math.random()*0.06)+")",animation:"bokeh "+(12+Math.random()*10)+"s ease-in-out "+(i*1.5)+"s infinite",filter:"blur("+(8+Math.random()*12)+"px)"}}/>) }</div>;}

function StatItem({target,suffix,label}){const[r,c]=useCtr(target);return<div ref={r}><p style={{fontFamily:"var(--fh)",fontSize:36,fontWeight:300,color:"var(--go)",animation:c>=target?"countPop .4s ease":""}}>{c.toLocaleString()}{suffix}</p><p style={{fontSize:12,color:"var(--gi)",marginTop:2}}>{label}</p></div>}

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
function Dir({go,shortlist,onToggleShortlist}){const[cat,sCat]=useState("all");const[sort,sSort]=useState("featured");
  let f=cat==="all"?[...VENUES]:VENUES.filter(v=>v.cat===cat);
  if(sort==="featured")f.sort((a,b)=>(b.featured?1:0)-(a.featured?1:0)||(b.managed?1:0)-(a.managed?1:0));
  
  else if(sort==="capacity")f.sort((a,b)=>b.capacity.s-a.capacity.s);
  return(<section style={{padding:"40px 24px 72px",background:"var(--cr)"}}>
    <div style={{maxWidth:1200,margin:"0 auto"}}>
      <header style={{marginBottom:28}}><h1 style={{fontFamily:"var(--fh)",fontSize:"clamp(28px,4vw,40px)",fontWeight:300,marginBottom:8}}>Wedding Venues in Singapore</h1><p style={{color:"var(--g)",fontSize:14,maxWidth:600}}>Explore {VENUES.length} of Singapore's finest wedding venues — legendary five-star hotels, sky-high rooftops, heritage mansions, and garden estates.</p></header>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10,marginBottom:20}}>
        <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>{CATS.map(c=><button key={c.id} className={`cp ${cat===c.id?"a":""}`} onClick={()=>sCat(c.id)}><c.icon size={12}/>{c.label}</button>)}</div>
        <select className="inp" value={sort} onChange={e=>sSort(e.target.value)} style={{width:"auto",fontSize:12,padding:"7px 12px"}}><option value="featured">Featured</option><option value="capacity">Largest</option></select>
      </div>
      <p style={{fontSize:12,color:"var(--g)",marginBottom:14}}>Showing {f.length} of {VENUES.length} venues</p>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:18}}>{f.map((v,i)=><VCd key={v.id} v={v} i={i} onClick={()=>go("venues",v)} shortlist={shortlist} onToggleShortlist={onToggleShortlist}/>)}</div>
    </div>
  </section>);
}

// ═════════════════════════════════════════════════════════════════════════
// SHORTLIST
// ═════════════════════════════════════════════════════════════════════════
function ShortlistPage({go,shortlist,onToggleShortlist,onClear}){
  const venues=VENUES.filter(v=>shortlist.includes(v.id));
  return(<section style={{padding:"44px 24px 72px",background:"var(--cr)",minHeight:"60vh"}}><div style={{maxWidth:1200,margin:"0 auto"}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
      <h1 style={{fontFamily:"var(--fh)",fontSize:"clamp(28px,4vw,40px)",fontWeight:300}}>♥ My Shortlist</h1>
      {venues.length>0&&<button onClick={onClear} className="nl" style={{fontSize:12,color:"var(--g)"}}>Clear All</button>}
    </div>
    <p style={{color:"var(--g)",fontSize:13,marginBottom:6}}>You have {venues.length} venue{venues.length!==1?"s":""} shortlisted</p>
    <p style={{fontSize:11,color:"var(--gi)",marginBottom:28,padding:"8px 14px",background:"var(--gg)",borderRadius:8,display:"inline-block"}}>Your shortlist is saved for this session. Shortlisted venues will reset when you close the browser.</p>
    {venues.length===0?<div style={{textAlign:"center",padding:"60px 0"}}><p style={{fontSize:16,color:"var(--g)",marginBottom:16}}>No venues shortlisted yet</p><button className="bg" onClick={()=>go("venues")}>Browse Venues</button></div>:
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:18}}>{venues.map((v,i)=><VCd key={v.id} v={v} i={i} onClick={()=>go("venues",v)} shortlist={shortlist} onToggleShortlist={onToggleShortlist}/>)}</div>}
  </div></section>);
}

// ═════════════════════════════════════════════════════════════════════════
// DETAIL
// ═════════════════════════════════════════════════════════════════════════
function Detail({v,go,shortlist,onToggleShortlist}){const managedSameCat=VENUES.filter(x=>x.managed&&x.cat===v.cat&&x.id!==v.id);const managedOther=VENUES.filter(x=>x.managed&&x.id!==v.id&&!managedSameCat.includes(x));const sim=managedSameCat.length>=3?managedSameCat.slice(0,3):[...managedSameCat,...managedOther].slice(0,3);return(
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
            {[{q:`What is the capacity at ${v.name}?`,a:`${v.name} accommodates up to ${v.capacity.s} guests seated and ${v.capacity.st} standing at ${v.location}.`},{q:`Is ${v.name} licensed for solemnisation?`,a:v.solemn?`Yes, ${v.name} is a licensed ROM solemnisation venue in Singapore.`:`${v.name} does not currently hold a solemnisation licence.`}].map((faq,i)=><div key={i} itemProp="mainEntity" itemScope itemType="https://schema.org/Question" style={{borderBottom:"1px solid var(--gpa)",padding:"12px 0"}}><h4 itemProp="name" style={{fontWeight:600,fontSize:13,marginBottom:5}}>{faq.q}</h4><div itemProp="acceptedAnswer" itemScope itemType="https://schema.org/Answer"><p itemProp="text" style={{fontSize:13,color:"var(--cl)",lineHeight:1.7}}>{faq.a}</p></div></div>)}
          </div>
          {/* Guest Reviews */}
          <div style={{marginBottom:22}}>
            <h3 style={{fontFamily:"var(--fh)",fontSize:19,fontWeight:500,marginBottom:10}}>Guest Reviews</h3>
            {v.reviewSnippet&&<div style={{background:"var(--gg)",borderRadius:10,padding:14,marginBottom:10}}><div style={{display:"flex",gap:2,marginBottom:4}}>{Array.from({length:Math.round(v.rating)},(_,j)=><Star key={j} size={12} fill="var(--go)" color="var(--go)"/>)}<span style={{fontSize:12,color:"var(--go)",fontWeight:600,marginLeft:4}}>{v.rating}/5</span></div><p style={{fontSize:13,fontStyle:"italic",color:"var(--cl)",lineHeight:1.5}}>"{v.reviewSnippet}"</p></div>}
            <p style={{fontSize:12,color:"var(--g)",lineHeight:1.6}}>We're collecting reviews from real couples. Have you celebrated here? Share your experience → <a href={"mailto:reviews@singaporeweddingvenues.net?subject=Review: "+v.name} style={{color:"var(--gd)",textDecoration:"none"}}>reviews@singaporeweddingvenues.net</a></p>
          </div>
          <p style={{fontSize:11,color:"var(--gi)"}}>Is this information outdated? <a href={"mailto:venues@singaporeweddingvenues.net?subject=Venue Update: "+v.name} style={{color:"var(--g)",textDecoration:"none"}}>Let us know</a></p>
        </div>

        <aside style={{position:"sticky",top:86}}>
          <div style={{background:"var(--w)",borderRadius:12,padding:20,boxShadow:"var(--sm)",marginBottom:14}}>
            
            {v.web&&<a href={v.web} target="_blank" rel="noopener noreferrer" className="bg" style={{width:"100%",justifyContent:"center",marginBottom:8,textDecoration:"none"}}><Mail size={13}/>Enquire Now</a>}
            
          </div>
          {v.managed&&<div style={{background:"linear-gradient(135deg,var(--gp),var(--cw))",borderRadius:12,padding:16,border:"1px solid var(--gl)"}}><div style={{display:"flex",alignItems:"center",gap:5,marginBottom:5}}><Crown size={13} style={{color:"var(--gd)"}}/><span style={{fontSize:11,fontWeight:600,color:"var(--gd)"}}>1-Host Managed</span></div><p style={{fontSize:12,color:"var(--cl)",lineHeight:1.5}}>Part of the 1-Host collection with dedicated coordinators and 6,500+ weddings of experience.</p></div>}
        </aside>
      </div>
      {sim.length>0&&<div style={{marginTop:44}}><h3 style={{fontFamily:"var(--fh)",fontSize:24,fontWeight:400,marginBottom:18}}>Similar Venues</h3><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(250px,1fr))",gap:18}}>{sim.map((x,i)=><VCd key={x.id} v={x} i={i} onClick={()=>go("venues",x)} shortlist={shortlist} onToggleShortlist={onToggleShortlist}/>)}</div></div>}
    </div>
  </article>
);}

// ═════════════════════════════════════════════════════════════════════════
// AI TOOLS (kept concise — all 4 tools + Ask AI)
// ═════════════════════════════════════════════════════════════════════════
function ToolCard({t,i,onClick}){const[r,v]=useSR();return<button ref={r} onClick={onClick} style={{background:"var(--w)",borderRadius:12,padding:22,border:"1px solid var(--gpa)",cursor:"pointer",textAlign:"left",transition:`all .4s var(--e) ${i*80}ms`,opacity:v?1:0,transform:v?"translateY(0)":"translateY(14px)",boxShadow:"var(--ss)"}}><t.ic size={24} style={{color:"var(--go)",marginBottom:8}}/><h3 style={{fontFamily:"var(--fh)",fontSize:19,fontWeight:500,marginBottom:5}}>{t.n}</h3><p style={{fontSize:13,color:"var(--g)",lineHeight:1.4}}>{t.d}</p></button>}

function AIHub(){const[ac,sAc]=useState(null);const tools=[{id:"match",ic:Sparkles,n:"AI Venue Matchmaker",d:`Match from ${VENUES.length} venues`},{id:"style",ic:Heart,n:"Wedding Style Finder",d:"Discover your Style DNA in 60s"},{id:"timeline",ic:CalendarDays,n:"Timeline Generator",d:"Day-of timeline with SG customs"},{id:"compare",ic:GitCompareArrows,n:"Venue Comparison",d:"Side-by-side AI analysis"}];return(
  <section style={{padding:"44px 24px 72px",background:"var(--cr)"}}>
    <div style={{maxWidth:880,margin:"0 auto"}}>
      <div style={{textAlign:"center",marginBottom:36}}><h1 style={{fontFamily:"var(--fh)",fontSize:"clamp(28px,4vw,40px)",fontWeight:300,marginBottom:8}}>AI Wedding Planning Tools</h1><p style={{color:"var(--g)",fontSize:14,maxWidth:520,margin:"0 auto"}}>Powered by AI to simplify your venue search across {VENUES.length} iconic Singapore locations.</p></div>
      {!ac?<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>{tools.map((t,i)=><ToolCard key={t.id} t={t} i={i} onClick={()=>sAc(t.id)}/>)}</div>:
      <div><button onClick={()=>sAc(null)} className="nl" style={{marginBottom:18,fontSize:13}}><ChevronLeft size={13} style={{display:"inline",verticalAlign:"middle"}}/> Tools</button>
        {ac==="match"&&<MatchT/>}{ac==="style"&&<StyleFinderT/>}{ac==="timeline"&&<TimeT/>}{ac==="compare"&&<CompT/>}
      </div>}
    </div>
  </section>
);}

function MatchT(){const[g,sG]=useState(150);const[bud,sBud]=useState(2000);const[st,sSt]=useState("Glamorous");const[ld,sLd]=useState(false);const[res,sRes]=useState(null);

  const styleMap={Glamorous:["hotel","rooftop","waterfront"],Intimate:["heritage","garden","waterfront"],Garden:["garden","heritage"],"Sky-High":["rooftop"],Waterfront:["waterfront","beachfront"],Heritage:["heritage"],"Grand Hotel":["hotel"],Rustic:["garden","heritage","beachfront"]};

  const run=()=>{sLd(true);sRes(null);
    setTimeout(()=>{
      const scored=VENUES.map(v=>{let score=50;
        // Capacity fit (max 25 pts)
        const fits=g>=v.capacity.s*0.3&&g<=v.capacity.st;const tight=g>=v.capacity.s*0.6&&g<=v.capacity.s*1.1;
        if(tight)score+=25;else if(fits)score+=15;else if(g>v.capacity.st)score-=20;else score+=5;
        // Budget fit (max 20 pts) — check price proximity
        const avgPrice=v.pricePerTable?((v.pricePerTable?.min||0)+(v.pricePerTable?.max||0))/2:0;
        const budgetDiff=avgPrice?Math.abs(avgPrice-bud):0;
        const withinBudget=avgPrice?(bud>=( v.pricePerTable?.min||0)&&bud<=(v.pricePerTable?.max||9999)):true;
        if(withinBudget)score+=20;else if(budgetDiff<500)score+=10;else score-=5;
        // Style match (max 20 pts)
        const styleCats=styleMap[st]||[];
        if(styleCats.includes(v.cat))score+=20;else score+=5;
        // Managed bonus (5 pts)
        if(v.managed)score+=5;
        // Rating bonus (max 5 pts)
        score+=Math.round((v.rating-4)*10);
        return{...v,score:Math.min(97,Math.max(40,score)),withinBudget};
      }).sort((a,b_)=>b_.score-a.score);

      const top3=scored.slice(0,3);
      const similar=scored.slice(3,6);

      const reasons=(v)=>{const r=[];
        if(v.capacity.s<=g&&g<=v.capacity.st)r.push(`Comfortably fits ${g} guests (capacity ${v.capacity.s}–${v.capacity.st})`);
        else if(g<=v.capacity.st)r.push(`Can accommodate ${g} guests (max ${v.capacity.st})`);
        r.push(`${v.setting} setting with ${v.cuisine.join(" & ")} cuisine`);
        if(v.managed)r.push("✧ Featured Partner — 6,500+ weddings of experience");
        else if(v.solemn)r.push("Licensed for ROM solemnisation on-site");
        r.push(v.bestFor[0]);
        return r.slice(0,3);};
      const caveat=(v)=>{
        if(!v.withinBudget)return`Price range may be slightly above your $${bud.toLocaleString()}++ budget`;
        if(g>v.capacity.s)return`May feel spacious for ${g} guests — consider a cosier setup`;
        if(v.setting==="Indoor")return"Indoor only — no outdoor ceremony option";
        return"Book early — popular dates fill 12+ months in advance";};

      sRes({recommendations:top3.map(v=>({name:v.name,matchScore:v.score,
        reasons:reasons(v),consideration:caveat(v),withinBudget:v.withinBudget,managed:v.managed,
        capacity:`${v.capacity.s}–${v.capacity.st} guests`})),
        similar:similar.map(v=>({name:v.name,score:v.score,area:v.area,capacity:v.capacity.s})),
        tip:st==="Intimate"?"For intimate celebrations under 100 guests, restaurant venues like Monti and 1-Alfaro offer a more personal atmosphere than hotel ballrooms.":st==="Grand Hotel"?"Request a site visit during a non-event day to see the ballroom with natural lighting — it often looks very different from promotional photos.":"Start venue hunting 12–18 months before your preferred date, especially for auspicious weekends. Popular venues like Raffles and 1-Arden book out fast."
      });sLd(false);
    },800);
  };

  return(<div style={{background:"var(--w)",borderRadius:16,padding:28,boxShadow:"var(--sm)"}}>
    <h2 style={{fontFamily:"var(--fh)",fontSize:26,fontWeight:400,marginBottom:20,display:"flex",alignItems:"center",gap:8}}><Sparkles size={20} style={{color:"var(--go)"}}/>AI Venue Matchmaker</h2>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:20}}>
      <div><label style={{fontSize:11,fontWeight:600,letterSpacing:".05em",textTransform:"uppercase",color:"var(--g)",marginBottom:6,display:"block"}}>Guests: {g}</label><input type="range" min={20} max={800} step={10} value={g} onChange={e=>sG(+e.target.value)} style={{width:"100%",accentColor:"var(--go)"}}/></div>
      <div><label style={{fontSize:11,fontWeight:600,letterSpacing:".05em",textTransform:"uppercase",color:"var(--g)",marginBottom:6,display:"block"}}>Budget: ${bud.toLocaleString()}++ / table</label><input type="range" min={800} max={3500} step={100} value={bud} onChange={e=>sBud(+e.target.value)} style={{width:"100%",accentColor:"var(--go)"}}/></div>
    </div>
    <div style={{marginBottom:20}}><label style={{fontSize:11,fontWeight:600,letterSpacing:".05em",textTransform:"uppercase",color:"var(--g)",marginBottom:6,display:"block"}}>Wedding Style</label><div style={{display:"flex",flexWrap:"wrap",gap:6}}>{["Glamorous","Intimate","Garden","Sky-High","Waterfront","Heritage","Grand Hotel","Rustic"].map(s=><button key={s} className={`cp ${st===s?"a":""}`} onClick={()=>sSt(s)} style={{fontSize:12,padding:"6px 14px"}}>{s}</button>)}</div></div>
    <button className="bg" onClick={run} disabled={ld} style={{fontSize:15,padding:"13px 28px"}}><Sparkles size={14}/>{ld?"Finding your perfect match…":"Match Me to My Venue"}</button>
    {ld&&<div style={{marginTop:20}}>{[1,2,3].map(i=><div key={i} className="sk" style={{height:110,marginBottom:10,borderRadius:12}}/>)}</div>}
    {res&&res.recommendations&&<div style={{marginTop:24}}>{res.recommendations.map((r,i)=><div key={i} style={{background:"var(--iv)",borderRadius:14,padding:20,marginBottom:12,animation:`cardEnter .6s ease ${i*150}ms both`,border:"1px solid var(--gpa)",boxShadow:"var(--ss)"}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}><div><h3 style={{fontFamily:"var(--fh)",fontSize:20,fontWeight:500}}>{r.name}</h3>{r.managed&&<span style={{fontSize:9,color:"var(--gd)",fontWeight:700,letterSpacing:".04em"}}>✧ Featured Partner</span>}</div><span style={{background:"linear-gradient(135deg,var(--go),var(--gd))",color:"var(--w)",padding:"4px 12px",borderRadius:999,fontSize:13,fontWeight:700,boxShadow:"var(--sg)"}}>{r.matchScore}%</span></div>{r.reasons?.map((x,j)=><p key={j} style={{fontSize:14,color:"var(--cl)",lineHeight:1.6,paddingLeft:16,borderLeft:"2px solid var(--go)",marginBottom:6}}>✓ {x}</p>)}{r.consideration&&<p style={{fontSize:13,color:"var(--g)",marginTop:8,fontStyle:"italic",paddingLeft:16}}>⚠ {r.consideration}</p>}<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:10}}><p style={{fontSize:14,fontWeight:600,color:"var(--gd)"}}>{r.capacity}</p><span style={{fontSize:11,fontWeight:600,color:r.withinBudget?"var(--sa)":"var(--g)"}}>{r.withinBudget?"✓ Within budget":"⚠ Above budget"}</span></div></div>)}
      {res.tip&&<div style={{background:"linear-gradient(135deg,var(--gp),var(--cw))",border:"1px solid var(--gl)",borderRadius:12,padding:16,marginTop:6}}><p style={{fontSize:14,lineHeight:1.5}}>💡 <strong>Pro Tip:</strong> {res.tip}</p></div>}
      {res.similar?.length>0&&<div style={{marginTop:24}}><h3 style={{fontFamily:"var(--fh)",fontSize:20,fontWeight:400,marginBottom:12}}>You May Also Like</h3><div style={{display:"flex",gap:10,overflowX:"auto",paddingBottom:8}}>{res.similar.map((s,i)=><div key={i} style={{flex:"0 0 180px",background:"var(--gg)",borderRadius:10,padding:14,animation:`fU .4s ease ${(i+3)*120}ms both`}}><p style={{fontFamily:"var(--fh)",fontSize:15,fontWeight:500,marginBottom:2}}>{s.name}</p><p style={{fontSize:11,color:"var(--g)"}}>{s.area} · Up to {s.capacity}</p><p style={{fontSize:12,fontWeight:600,color:"var(--gd)",marginTop:4}}>{s.score}% match</p></div>)}</div></div>}
    </div>}
  </div>);
}



function TimeT(){
  const[ceremony,setCeremony]=useState("ROM Solemnisation");
  const[reception,setReception]=useState("Dinner Banquet");
  const[result,setResult]=useState(null);

  const romDinner=[
    {time:"06:00",event:"Hair & Makeup",notes:"Bride and bridesmaids begin preparation"},
    {time:"08:30",event:"Gate Crash Games",notes:"Groomsmen challenges at bride's home"},
    {time:"09:30",event:"Tea Ceremony (Bride's Side)",notes:"Serve tea to bride's parents and elders"},
    {time:"10:30",event:"Travel to Groom's Home",notes:"Bridal car procession"},
    {time:"11:00",event:"Tea Ceremony (Groom's Side)",notes:"Serve tea to groom's parents and elders"},
    {time:"12:00",event:"Lunch Break",notes:"Rest and retouch before evening"},
    {time:"14:00",event:"Pre-Wedding Photos",notes:"Outdoor shoot at venue or scenic location"},
    {time:"16:30",event:"Arrive at Venue",notes:"Final preparations and venue walkthrough"},
    {time:"17:30",event:"ROM Solemnisation Ceremony",notes:"Exchange of vows and rings"},
    {time:"18:00",event:"Cocktail Reception",notes:"Drinks and guest photo wall"},
    {time:"19:00",event:"Grand March-In",notes:"Couple's entrance with music and spotlight"},
    {time:"19:15",event:"Yum Seng Toast",notes:"Champagne toast with guests"},
    {time:"19:30",event:"Dinner Service Begins",notes:"8-10 course banquet or Western set menu"},
    {time:"20:30",event:"Table Visits and Photos",notes:"Visit each table for photos with guests"},
    {time:"21:00",event:"Second March-In and Speeches",notes:"Outfit change, parent speeches, best man"},
    {time:"21:30",event:"Cake Cutting and Bouquet Toss",notes:"Traditional bouquet and garter toss"},
    {time:"22:00",event:"After-Party or Send-Off",notes:"Sparkler send-off or continued celebrations"}
  ];
  const romLunch=[
    {time:"05:30",event:"Hair & Makeup",notes:"Early start for bride preparation"},
    {time:"07:30",event:"Gate Crash Games",notes:"Fun challenges for the groom's party"},
    {time:"08:30",event:"Tea Ceremony (Bride's Side)",notes:"Serve tea to bride's family"},
    {time:"09:30",event:"Tea Ceremony (Groom's Side)",notes:"Serve tea to groom's family"},
    {time:"10:30",event:"ROM Solemnisation",notes:"Exchange of vows and ring ceremony"},
    {time:"11:00",event:"Cocktail Reception",notes:"Welcome drinks and guest mingling"},
    {time:"11:45",event:"Grand March-In",notes:"Couple's entrance to the ballroom"},
    {time:"12:00",event:"Lunch Service Begins",notes:"8-course banquet or set lunch"},
    {time:"13:00",event:"Speeches and Yum Seng",notes:"Toasts from parents and friends"},
    {time:"13:30",event:"Table Visits",notes:"Greet all guests table by table"},
    {time:"14:00",event:"Cake Cutting and Bouquet Toss",notes:"Traditional celebrations"},
    {time:"14:30",event:"Send-Off",notes:"Thank guests at the door"}
  ];
  const romCocktail=[
    {time:"06:00",event:"Hair & Makeup",notes:"Bride preparation begins"},
    {time:"08:30",event:"Gate Crash and Tea Ceremony",notes:"Combined morning traditions"},
    {time:"11:00",event:"Pre-Wedding Photos",notes:"Outdoor or studio shoot"},
    {time:"15:00",event:"Arrive at Venue",notes:"Setup and preparation"},
    {time:"16:00",event:"ROM Solemnisation",notes:"Garden or rooftop ceremony"},
    {time:"16:30",event:"Cocktail Reception Begins",notes:"Passed canapes, drink stations, live music"},
    {time:"17:30",event:"Speeches and Toasts",notes:"Intimate addresses from loved ones"},
    {time:"18:00",event:"Sunset Golden Hour Photos",notes:"Couple photos during golden hour"},
    {time:"19:00",event:"Dinner Stations Open",notes:"Buffet or live cooking stations"},
    {time:"20:00",event:"Cake Cutting and Dancing",notes:"First dance and party"},
    {time:"21:00",event:"Send-Off",notes:"Sparkler exit or farewell"}
  ];

  const getTimeline=()=>{
    if(ceremony==="Church Wedding") return romDinner.map(e=>e.event==="ROM Solemnisation Ceremony"?{...e,time:"12:00",event:"Church Ceremony",notes:"Wedding service with hymns and vows"}:e);
    if(ceremony==="Garden Ceremony") return romDinner.map(e=>e.event==="ROM Solemnisation Ceremony"?{...e,time:"17:00",event:"Garden Solemnisation",notes:"Outdoor ceremony under gazebo or arch"}:e);
    if(reception==="Lunch Banquet") return romLunch;
    if(reception==="Cocktail") return romCocktail;
    return romDinner;
  };

  const handleGenerate=()=>{
    try{
      const tl=getTimeline();
      setResult({timeline:tl,tips:["Build in 30-minute buffers between key events.","Brief your photographer on the timeline so they can plan lighting.","Have a backup indoor option for any outdoor ceremony."]});
    }catch(err){console.error("Timeline error:",err);setResult({timeline:romDinner,tips:["Error generating custom timeline. Showing default ROM + Dinner timeline."]})}
  };

  return(<div style={{background:"var(--w)",borderRadius:16,padding:28,boxShadow:"var(--sm)"}}>
    <h2 style={{fontFamily:"var(--fh)",fontSize:26,fontWeight:400,marginBottom:20,display:"flex",alignItems:"center",gap:8}}><CalendarDays size={20} style={{color:"var(--go)"}}/>Timeline Generator</h2>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:20}}>
      <div><label style={{fontSize:11,fontWeight:600,letterSpacing:".05em",textTransform:"uppercase",color:"var(--g)",display:"block",marginBottom:6}}>Ceremony</label><select className="inp" value={ceremony} onChange={e=>setCeremony(e.target.value)}><option>ROM Solemnisation</option><option>Church Wedding</option><option>Garden Ceremony</option></select></div>
      <div><label style={{fontSize:11,fontWeight:600,letterSpacing:".05em",textTransform:"uppercase",color:"var(--g)",display:"block",marginBottom:6}}>Reception</label><select className="inp" value={reception} onChange={e=>setReception(e.target.value)}><option>Dinner Banquet</option><option>Lunch Banquet</option><option>Cocktail</option></select></div>
    </div>
    <button className="bg" onClick={handleGenerate} style={{fontSize:15,padding:"13px 28px"}}><CalendarDays size={14}/>Generate Timeline</button>
    {result!==null&&<div style={{marginTop:22}}>
      <div style={{display:"flex",gap:8,marginBottom:14}}>
        <button className="cp a" onClick={()=>{const text=result.timeline.map(e=>`${e.time} — ${e.event}: ${e.notes}`).join("\n");navigator.clipboard?.writeText("Wedding Day Timeline\n\n"+text+"\n\nGenerated by singaporeweddingvenues.net")}} style={{fontSize:11}}>📋 Copy Timeline</button>
        <button className="cp" onClick={()=>{const w=window.open("","_blank");w.document.write(`<html><head><title>Wedding Timeline</title><style>body{font-family:'DM Sans',sans-serif;padding:40px;max-width:700px;margin:0 auto}h1{font-family:'Cormorant Garamond',serif;font-size:28px;margin-bottom:24px}.item{display:flex;gap:16px;padding:10px 0;border-bottom:1px solid #eee}.time{font-weight:700;min-width:50px;color:#C0504A}.event{font-weight:600}.notes{color:#555;font-size:13px}@media print{body{padding:20px}}</style></head><body><h1>Your Wedding Day Timeline</h1>${result.timeline.map(e=>`<div class="item"><span class="time">${e.time}</span><div><div class="event">${e.event}</div><div class="notes">${e.notes}</div></div></div>`).join("")}<p style="margin-top:24px;font-size:11px;color:#999">Generated by singaporeweddingvenues.net</p></body></html>`);w.document.close();w.print()}} style={{fontSize:11}}>📄 Print</button>
      </div>
      <div style={{paddingLeft:20,borderLeft:"2px solid var(--gl)"}}>{result.timeline.map((item,idx)=><div key={idx} style={{marginBottom:14,paddingLeft:16,position:"relative",animation:"fU .3s ease both",animationDelay:idx*40+"ms"}}><div style={{position:"absolute",left:-27,top:3,width:10,height:10,borderRadius:"50%",background:"var(--go)",border:"2px solid var(--w)"}}/><div style={{display:"flex",gap:10,alignItems:"baseline"}}><span style={{fontWeight:700,fontSize:14,color:"var(--gd)",minWidth:44}}>{item.time}</span><div><p style={{fontWeight:600,fontSize:14}}>{item.event}</p><p style={{fontSize:12,color:"var(--cl)"}}>{item.notes}</p></div></div></div>)}</div>
      <div style={{background:"linear-gradient(135deg,var(--gp),var(--cw))",borderRadius:12,padding:16,marginTop:16}}><p style={{fontSize:13,fontWeight:600,color:"var(--gd)",marginBottom:6}}>Planning Tips</p>{result.tips.map((tip,idx)=><p key={idx} style={{fontSize:13,color:"var(--cl)",lineHeight:1.5,marginBottom:4}}>&#8226; {tip}</p>)}</div>
    </div>}
  </div>);
}

function CompT(){
  const[selected,setSelected]=useState([]);
  const[result,setResult]=useState(null);
  const[priority,setPriority]=useState("ambiance");

  const toggleVenue=(vid)=>setSelected(prev=>prev.includes(vid)?prev.filter(x=>x!==vid):prev.length<3?[...prev,vid]:prev);

  const handleCompare=()=>{
    if(selected.length<2)return;
    try{
      const compared=selected.map(vid=>{
        const venue=VENUES.find(x=>x.id===vid);
        if(!venue)return null;
        const cap=Math.max(3,Math.min(10,Math.round(venue.capacity.s/80)));
        const val=7;
        const cui=Math.max(4,Math.min(10,(venue.cuisine||[]).length*2+4));
        const amb=Math.max(5,Math.min(10,Math.round((venue.rating||4.5)*2)));
        const central=["Orchard","City Hall","Marina Bay","Raffles Place","Bugis","Tanglin","Clarke Quay","Marina Centre"];
        const acc=central.includes(venue.area)?9:venue.area==="Sentosa"?6:7;
        const uniq=venue.managed?9:["heritage","garden","waterfront","beachfront","rooftop"].includes(venue.cat)?8:6;
        return{
          venue:venue.name,vid:venue.id,cat:venue.cat,managed:venue.managed,
          scores:{capacity:cap,value:val,cuisine:cui,ambiance:amb,accessibility:acc,uniqueness:uniq},
          bestFor:(venue.bestFor&&venue.bestFor[0])||"Unique celebration",
          standout:venue.managed?"✧ Featured Partner — dedicated wedding coordination":venue.capacity.s>=500?"Grand scale for large celebrations":"Beautiful "+venue.catLabel+" setting",
          maxCap:venue.capacity.st,minCap:venue.capacity.s
        };
      }).filter(Boolean);

      // Calculate category winners
      const winners={};
      // Best Value: highest value score
      const bestValue=[...compared].sort((a,b)=>b.scores.value-a.scores.value)[0];
      winners.bestValue=bestValue.venue;
      // Best Large: highest max capacity
      const bestLarge=[...compared].sort((a,b)=>b.maxCap-a.maxCap)[0];
      winners.bestLarge=bestLarge.venue;
      // Best Intimate: lowest min capacity + high ambiance
      const bestIntimate=[...compared].sort((a,b)=>(a.minCap+10-a.scores.ambiance)-(b.minCap+10-b.scores.ambiance))[0];
      winners.bestIntimate=bestIntimate.venue;
      // Best Aesthetics: ambiance + uniqueness
      const bestAes=[...compared].sort((a,b)=>(b.scores.ambiance+b.scores.uniqueness)-(a.scores.ambiance+a.scores.uniqueness))[0];
      winners.bestAesthetics=bestAes.venue;
      // Overall: weighted by priority
      const wt={value:"value",ambiance:"ambiance",capacity:"capacity",location:"accessibility"};
      const pk=wt[priority]||"ambiance";
      compared.forEach(item=>{item.weightedTotal=Object.entries(item.scores).reduce((sum,[k,v])=>sum+v*(k===pk?2:1),0)});
      const overall=[...compared].sort((a,b)=>b.weightedTotal-a.weightedTotal)[0];
      winners.overall=overall.venue;

      // Find similar venues to the winner
      const winVenue=VENUES.find(x=>x.id===overall.vid);
      const similar=winVenue?VENUES.filter(x=>!selected.includes(x.id)&&(x.cat===winVenue.cat||x.managed===winVenue.managed)).slice(0,3).map(x=>({name:x.name,area:x.area,cat:x.catLabel,managed:x.managed})):[];

      setResult({comparison:compared,winners,similar,
        verdict:`${overall.venue} is your best overall match${priority!=="ambiance"?` when prioritising ${priority}`:""}. Visit all shortlisted venues in person before deciding — photos never capture the full atmosphere.`});
    }catch(err){console.error("Compare error:",err);}
  };

  return(<div style={{background:"var(--w)",borderRadius:16,padding:28,boxShadow:"var(--sm)"}}>
    <h2 style={{fontFamily:"var(--fh)",fontSize:26,fontWeight:400,marginBottom:14,display:"flex",alignItems:"center",gap:8}}><GitCompareArrows size={20} style={{color:"var(--go)"}}/>Venue Comparison</h2>
    <p style={{fontSize:13,color:"var(--g)",marginBottom:12}}>Select 2-3 venues to compare side by side.</p>
    <div style={{marginBottom:14}}><label style={{fontSize:11,fontWeight:600,letterSpacing:".05em",textTransform:"uppercase",color:"var(--g)",display:"block",marginBottom:6}}>What matters most to you?</label><div style={{display:"flex",gap:6}}>{["ambiance","value","capacity","location"].map(p=><button key={p} className={`cp ${priority===p?"a":""}`} onClick={()=>setPriority(p)} style={{fontSize:11,padding:"5px 12px",textTransform:"capitalize"}}>{p}</button>)}</div></div>
    <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:20,maxHeight:150,overflowY:"auto"}}>{VENUES.map(venue=><button key={venue.id} className={"cp"+(selected.includes(venue.id)?" a":"")} onClick={()=>toggleVenue(venue.id)} style={{fontSize:12,padding:"5px 12px"}}>{venue.name}</button>)}</div>
    <button className="bg" onClick={handleCompare} disabled={selected.length<2} style={{fontSize:15,padding:"13px 28px",opacity:selected.length<2?.5:1}}><GitCompareArrows size={14}/>Compare {selected.length} Venues</button>
    {result!==null&&result.comparison&&<div style={{marginTop:22}}>
      <div style={{display:"grid",gridTemplateColumns:"repeat("+result.comparison.length+",1fr)",gap:14}}>{result.comparison.map((item,idx)=>{
        const badges=[];
        if(result.winners.overall===item.venue)badges.push({l:"🏆 Overall Winner",c:"var(--go)"});
        if(result.winners.bestAesthetics===item.venue&&result.winners.overall!==item.venue)badges.push({l:"✨ Best Aesthetics",c:"var(--ro)"});
        if(result.winners.bestLarge===item.venue&&result.winners.overall!==item.venue)badges.push({l:"👥 Best for Large",c:"var(--sa)"});
        if(result.winners.bestIntimate===item.venue&&result.winners.overall!==item.venue)badges.push({l:"💕 Best Intimate",c:"var(--ro)"});
        return <div key={idx} style={{background:result.winners.overall===item.venue?"var(--rp)":"var(--iv)",borderRadius:14,padding:20,animation:"cardEnter .5s ease both",animationDelay:idx*120+"ms",border:result.winners.overall===item.venue?"2px solid var(--go)":"1px solid var(--gpa)"}}>
          <h3 style={{fontFamily:"var(--fh)",fontSize:18,fontWeight:500,marginBottom:4}}>{item.venue}</h3>
          {badges.length>0&&<div style={{display:"flex",flexWrap:"wrap",gap:4,marginBottom:10}}>{badges.map((b,bi)=><span key={bi} style={{fontSize:9,fontWeight:700,color:b.c,background:"var(--w)",border:`1px solid ${b.c}`,padding:"2px 8px",borderRadius:999}}>{b.l}</span>)}</div>}
          {Object.entries(item.scores).map(function(entry){var key=entry[0];var val=entry[1];return <div key={key} style={{marginBottom:8}}><div style={{display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:2}}><span style={{textTransform:"capitalize",fontWeight:key===(priority==="location"?"accessibility":priority)?"700":"400"}}>{key}{key===(priority==="location"?"accessibility":priority)?" ★":""}</span><span style={{fontWeight:600,color:"var(--gd)"}}>{val}/10</span></div><div style={{height:5,background:"var(--gg)",borderRadius:3}}><div style={{height:"100%",background:"var(--go)",borderRadius:3,width:val*10+"%",transition:"width .6s ease"}}/></div></div>})}
          <p style={{fontSize:12,color:"var(--cl)",marginTop:10,paddingTop:10,borderTop:"1px solid var(--gpa)"}}>🎯 {item.bestFor}</p>
          <p style={{fontSize:11,color:"var(--g)",marginTop:4}}>{item.standout}</p>
        </div>})}</div>
      {result.verdict&&<div style={{background:"linear-gradient(135deg,var(--gp),var(--cw))",borderRadius:12,padding:16,marginTop:14}}><p style={{fontSize:14,lineHeight:1.5}}>🏆 {result.verdict}</p></div>}
      {result.similar?.length>0&&<div style={{marginTop:20}}><h3 style={{fontFamily:"var(--fh)",fontSize:18,fontWeight:400,marginBottom:10}}>You May Also Like</h3><div style={{display:"flex",gap:10,overflowX:"auto",paddingBottom:6}}>{result.similar.map((s,i)=><div key={i} style={{flex:"0 0 170px",background:"var(--gg)",borderRadius:10,padding:12}}><p style={{fontFamily:"var(--fh)",fontSize:14,fontWeight:500}}>{s.name}</p><p style={{fontSize:11,color:"var(--g)"}}>{s.area} · {s.cat}</p>{s.managed&&<span style={{fontSize:9,color:"var(--gd)",fontWeight:700}}>✧ Featured Partner</span>}</div>)}</div></div>}
    </div>}
  </div>);
}

// ── STYLE FINDER (Tool #6) ─────────────────────────────────────────────
const SF_Q=[
  {id:1,t:"Venue Vibe",q:"Where does your dream wedding take place?",ms:false,o:[
    {l:"Grand Ballroom",d:"Crystal chandeliers, soaring ceilings, timeless elegance",tag:"classic-grand",g:"linear-gradient(135deg,#1a1a3e,#C9A96E)",ic:"✨"},
    {l:"Tropical Garden",d:"Lush greenery, open skies, nature's embrace",tag:"garden-natural",g:"linear-gradient(135deg,#2D5A45,#B5C4B1)",ic:"🌿"},
    {l:"Sky-High Rooftop",d:"City panoramas, sunset ceremonies, dramatic views",tag:"modern-dramatic",g:"linear-gradient(135deg,#E8837C,#1a1a3e)",ic:"🌆"},
    {l:"Heritage Courtyard",d:"Colonial charm, storied walls, intimate warmth",tag:"heritage-intimate",g:"linear-gradient(135deg,#A8874A,#FFFCF7)",ic:"🏛️"}]},
  {id:2,t:"Colour Palette",q:"Which palette makes your heart sing?",ms:false,o:[
    {l:"Blush & Gold",d:"Soft romance meets warm opulence",tag:"romantic-luxe",g:"linear-gradient(135deg,#F5E0E0,#C9A96E)",ic:"🌸",sw:["#F5E0E0","#C9A96E","#FFFCF7","#D4A5A5","#E0CFA0"]},
    {l:"Sage & White",d:"Earthy calm, organic elegance",tag:"natural-organic",g:"linear-gradient(135deg,#B5C4B1,#FFF)",ic:"🍃",sw:["#B5C4B1","#FFF","#D4DED1","#8FA88A","#FFF8F0"]},
    {l:"Black & Champagne",d:"Bold sophistication, modern glamour",tag:"modern-glamour",g:"linear-gradient(135deg,#2D2D2D,#E0CFA0)",ic:"🖤",sw:["#2D2D2D","#E0CFA0","#F5F5F5","#C9A96E","#4A4A4A"]},
    {l:"Coral & Teal",d:"Tropical energy, vibrant joy",tag:"tropical-vibrant",g:"linear-gradient(135deg,#E8837C,#5B9A8B)",ic:"🌺",sw:["#E8837C","#5B9A8B","#FFF0ED","#3D7A6B","#F5B7B1"]}]},
  {id:3,t:"Table Setting",q:"Pick the table setting that feels like 'you'",ms:false,o:[
    {l:"Crystal & Candlelight",d:"Fine china, gold chargers, cascading florals",tag:"opulent-traditional",g:"linear-gradient(135deg,#1F1147,#C9A96E)",ic:"🕯️"},
    {l:"Farm-to-Table",d:"Wooden tables, herb centerpieces, linen runners",tag:"rustic-organic",g:"linear-gradient(135deg,#5D4037,#B5C4B1)",ic:"🌾"},
    {l:"Sleek & Minimal",d:"Glass tables, single stems, geometric accents",tag:"contemporary-minimal",g:"linear-gradient(135deg,#2D2D2D,#F5F5F5)",ic:"◇"},
    {l:"Tropical Lush",d:"Rattan, monstera leaves, colourful fruits as décor",tag:"tropical-festive",g:"linear-gradient(135deg,#2D5A45,#E8837C)",ic:"🌴"}]},
  {id:4,t:"Floral Style",q:"Which bouquet would you carry?",ms:false,o:[
    {l:"English Roses",d:"Cascading peonies, eucalyptus — lush and romantic",tag:"romantic-classic",g:"linear-gradient(135deg,#D4A5A5,#F5E0E0)",ic:"🌹"},
    {l:"Wildflower Meadow",d:"Hand-gathered, dried grasses, lavender",tag:"boho-free-spirit",g:"linear-gradient(135deg,#8FA88A,#E0CFA0)",ic:"🌼"},
    {l:"Orchid Statement",d:"Dramatic single-variety cascade, sculptural",tag:"modern-architectural",g:"linear-gradient(135deg,#4A1942,#E8C5C5)",ic:"🪻"},
    {l:"Tropical Paradise",d:"Heliconias, bird of paradise — bold colour",tag:"tropical-bold",g:"linear-gradient(135deg,#1A535C,#E8837C)",ic:"🦜"}]},
  {id:5,t:"First Dance",q:"What's the vibe of your first dance?",ms:false,o:[
    {l:"Timeless Romance",d:"Slow waltz, classic ballad, all eyes on you",tag:"classic-romantic",g:"linear-gradient(135deg,#1F1147,#D4A5A5)",ic:"💃"},
    {l:"Party Starter",d:"Upbeat choreography, confetti, crowd goes wild",tag:"fun-energetic",g:"linear-gradient(135deg,#E8837C,#C9A96E)",ic:"🎉"},
    {l:"Intimate Moment",d:"Soft acoustic, barely swaying, lost in each other",tag:"intimate-understated",g:"linear-gradient(135deg,#B5C4B1,#FFF8F0)",ic:"💕"}]},
  {id:6,t:"Fashion Sense",q:"Which outfit energy matches yours?",ms:false,o:[
    {l:"Red Carpet Glamour",d:"Ball gown, dramatic train, crystals",tag:"glamour-maximal",g:"linear-gradient(135deg,#1a1a3e,#C9A96E)",ic:"👑"},
    {l:"Effortless Elegance",d:"Slip dress, clean lines, statement earrings",tag:"modern-minimal",g:"linear-gradient(135deg,#F5F5F5,#E8E8E8)",ic:"✦"},
    {l:"Cultural Couture",d:"Kua, cheongsam, saree or kebaya",tag:"cultural-proud",g:"linear-gradient(135deg,#8B0000,#C9A96E)",ic:"🎎"},
    {l:"Bohemian Flow",d:"Lace, flutter sleeves, barefoot energy",tag:"boho-relaxed",g:"linear-gradient(135deg,#D4DED1,#E0CFA0)",ic:"🦋"}]},
  {id:7,t:"Guest Experience",q:"How do your guests remember the night?",ms:false,o:[
    {l:"The Grand Banquet",d:"10-course dinner, yum seng, march-in",tag:"traditional-feast",g:"linear-gradient(135deg,#8B0000,#1F1147)",ic:"🥢"},
    {l:"Cocktail & Canapés",d:"Standing reception, live stations, cocktails",tag:"modern-social",g:"linear-gradient(135deg,#2D2D2D,#C9A96E)",ic:"🍸"},
    {l:"Family-Style Feast",d:"Long communal tables, shared platters",tag:"intimate-gathering",g:"linear-gradient(135deg,#5D4037,#FFF8F0)",ic:"🍽️"},
    {l:"Festival Vibes",d:"Food trucks, games, live band, dance floor",tag:"party-celebration",g:"linear-gradient(135deg,#E8837C,#5B9A8B)",ic:"🎶"}]},
  {id:8,t:"Cultural Flavour",q:"Which traditions feel important to you?",ms:true,o:[
    {l:"Tea Ceremony",d:"Morning tea to parents & elders, red and gold",tag:"chinese-traditional",g:"linear-gradient(135deg,#8B0000,#C9A96E)",ic:"🍵"},
    {l:"Garden Solemnisation",d:"ROM under a floral arch, intimate vows",tag:"modern-western",g:"linear-gradient(135deg,#2D5A45,#F5E0E0)",ic:"💒"},
    {l:"Multi-Cultural Blend",d:"Two or more traditions in one celebration",tag:"multicultural-fusion",g:"linear-gradient(135deg,#4A1942,#E8837C)",ic:"🌍"},
    {l:"Non-Traditional",d:"Skip traditions, create your own moments",tag:"contemporary-personal",g:"linear-gradient(135deg,#1A535C,#F5F5F5)",ic:"⚡"}]}
];
const SF_W={"classic-grand":{timelessRomantic:2,glamourMaximalist:3},"garden-natural":{gardenNaturalist:3,freeSpiritCreative:1},"modern-dramatic":{modernMinimalist:3,glamourMaximalist:1},"heritage-intimate":{culturalStoryteller:3,timelessRomantic:1},"romantic-luxe":{timelessRomantic:3,glamourMaximalist:1},"natural-organic":{gardenNaturalist:3,freeSpiritCreative:1},"modern-glamour":{modernMinimalist:2,glamourMaximalist:2},"tropical-vibrant":{freeSpiritCreative:2,gardenNaturalist:2},"opulent-traditional":{glamourMaximalist:3,timelessRomantic:1},"rustic-organic":{gardenNaturalist:2,freeSpiritCreative:2},"contemporary-minimal":{modernMinimalist:3,glamourMaximalist:1},"tropical-festive":{freeSpiritCreative:3,gardenNaturalist:1},"romantic-classic":{timelessRomantic:3,glamourMaximalist:1},"boho-free-spirit":{freeSpiritCreative:3,gardenNaturalist:1},"modern-architectural":{modernMinimalist:3,glamourMaximalist:1},"tropical-bold":{freeSpiritCreative:2,gardenNaturalist:2},"classic-romantic":{timelessRomantic:3,culturalStoryteller:1},"fun-energetic":{freeSpiritCreative:3,glamourMaximalist:1},"intimate-understated":{gardenNaturalist:2,modernMinimalist:2},"glamour-maximal":{glamourMaximalist:3,timelessRomantic:1},"modern-minimal":{modernMinimalist:3},"cultural-proud":{culturalStoryteller:3,timelessRomantic:1},"boho-relaxed":{freeSpiritCreative:3,gardenNaturalist:1},"traditional-feast":{culturalStoryteller:2,timelessRomantic:2},"modern-social":{modernMinimalist:2,glamourMaximalist:2},"intimate-gathering":{gardenNaturalist:2,timelessRomantic:2},"party-celebration":{freeSpiritCreative:3,glamourMaximalist:1},"chinese-traditional":{culturalStoryteller:3,timelessRomantic:1},"modern-western":{modernMinimalist:2,gardenNaturalist:2},"multicultural-fusion":{culturalStoryteller:2,freeSpiritCreative:2},"contemporary-personal":{freeSpiritCreative:2,modernMinimalist:2}};
const SF_T={
  timelessRomantic:{sn:"The Candlelit Romantic",desc:"You dream in soft light and sweeping gestures. Your wedding is a love letter written in garden roses and candlelight — every detail whispers elegance, every moment is steeped in emotion.",cp:[{n:"Rose Petal",h:"#E8C5C5"},{n:"Champagne Gold",h:"#C9A96E"},{n:"Ivory Silk",h:"#FFFCF7"},{n:"Blush Whisper",h:"#F5E0E0"},{n:"Warm Linen",h:"#FDF5EC"}],dk:["candlelight","cascading roses","gold leaf","silk draping","crystal stemware","calligraphy"],sd:["A tea ceremony corner with heirloom porcelain and a custom red silk backdrop","Hand-calligraphed table cards on cotton paper, sealed with gold wax","A solemnisation under fairy lights at The Fullerton Hotel rooftop"],vm:[{n:"Raffles Hotel Singapore",r:"Timeless heritage elegance",s:"Palm Court + Raffles Ballroom"},{n:"The Fullerton Hotel",r:"Neoclassical grandeur with waterfront romance",s:"The Straits Room"},{n:"1-Arden",r:"Sky-high garden romance",s:"Sky Garden Terrace"}],cn:"Your ideal partner: a Cultural Storyteller who grounds your romantic flights in tradition.",em:"🌹"},
  modernMinimalist:{sn:"The Sky-High Modernist",desc:"Less is more, but make it extraordinary. Clean lines, negative space, and the dramatic power of a single perfect orchid. Your wedding commands attention through restraint and impeccable taste.",cp:[{n:"Onyx",h:"#2D2D2D"},{n:"Champagne Satin",h:"#E0CFA0"},{n:"Pure White",h:"#FFFFFF"},{n:"Smoke",h:"#8A8A8A"},{n:"Frost",h:"#F5F5F5"}],dk:["geometric forms","single stems","acrylic","monochrome","negative space","architectural lighting"],sd:["A rooftop solemnisation with a minimalist acrylic arch — just you and the skyline","Monochrome tables with a single sculptural orchid and concrete place cards","Molecular gastronomy canapés with cocktails named after your love story"],vm:[{n:"1-Altitude",r:"Singapore's highest venue for elevated drama",s:"Rooftop Bar at 282m"},{n:"Oumi",r:"Japanese minimalism meets fine dining",s:"Full restaurant buyout"},{n:"National Gallery",r:"Modern art meets historical gravitas",s:"City Hall Chamber"}],cn:"Your ideal partner: a Glamour Maximalist — their sparkle softens your sharp edges.",em:"◇"},
  gardenNaturalist:{sn:"The Botanical Dreamer",desc:"Your wedding grows from the earth up — barefoot vibes, farm-to-table feasting, and frangipani on a warm breeze. Nature is your co-host, your décor, and your mood board all at once.",cp:[{n:"Forest Sage",h:"#8FA88A"},{n:"Warm Cream",h:"#FFF8F0"},{n:"Eucalyptus",h:"#B5C4B1"},{n:"Sunlit Gold",h:"#E0CFA0"},{n:"Moss",h:"#6B8F71"}],dk:["potted herbs","linen runners","trailing greenery","wooden farm tables","beeswax candles","wildflower meadow"],sd:["A living herb wall as ceremony backdrop, doubling as take-home gifts in clay pots","Family-style seasonal platters on rustic boards with edible flowers","A barefoot solemnisation surrounded by rare orchids at the Botanic Gardens"],vm:[{n:"The Summerhouse",r:"European garden estate with edible gardens",s:"Garden gazebo ceremony"},{n:"The Garage",r:"Art Deco heritage in the UNESCO Botanic Gardens",s:"Forest-under-the-stars reception"},{n:"1-Arden",r:"Sky garden with 80,000 plants",s:"Sky Garden Terrace"}],cn:"Your ideal partner: a Free-Spirit Creative — together you'll be beautiful and unpredictable.",em:"🌿"},
  culturalStoryteller:{sn:"The Heritage Storyteller",desc:"Your wedding is a living tapestry — threads of tradition, family, and cultural pride woven into every moment. You honour where you come from while celebrating where you're going.",cp:[{n:"Auspicious Red",h:"#8B2500"},{n:"Imperial Gold",h:"#C9A96E"},{n:"Silk Ivory",h:"#FFFCF7"},{n:"Rosewood",h:"#65000B"},{n:"Warm Blush",h:"#F5E0E0"}],dk:["red silk","gold accents","tea ceremony set","ancestral motifs","lantern light","double happiness"],sd:["A morning tea ceremony with a custom-painted silk screen at CHIJMES","Hand-painted porcelain ang bao trays as table keepsakes from Joo Chiat","A grand march-in with a Chinese drum troupe transitioning to jazz"],vm:[{n:"CHIJMES Hall",r:"Gothic chapel for dramatic cultural celebration",s:"Hall + Courtyard"},{n:"Raffles Hotel",r:"Heritage icon honouring tradition",s:"Raffles Ballroom"},{n:"The Alkaff Mansion",r:"Heritage hilltop for traditional garden ceremony",s:"The Verandah"}],cn:"Your ideal partner: a Timeless Romantic who adds softness to your bold narrative.",em:"🏮"},
  glamourMaximalist:{sn:"The Golden Hour Maximalist",desc:"If it sparkles, you want it. Your wedding is a production — chandelier-lit entrances, showstopping fashion, and a guest experience that rivals a five-star gala. More is more.",cp:[{n:"Black Velvet",h:"#1a1a1a"},{n:"Liquid Gold",h:"#C9A96E"},{n:"Crystal White",h:"#FFFFFF"},{n:"Deep Amethyst",h:"#1F1147"},{n:"Champagne Fizz",h:"#F0E6CC"}],dk:["crystal chandeliers","gold candelabras","velvet draping","mirror tables","confetti cannons","spotlight march-in"],sd:["A choreographed march-in with strings transitioning to EDM as confetti falls","An 8-foot cascading floral installation above the dance floor in gold and crystal","Smoke-infused cocktails named after Crazy Rich Asians scenes at MBS SkyPark"],vm:[{n:"Marina Bay Sands",r:"Maximum wow factor at Asia's grandest stage",s:"Sands Grand Ballroom + SkyPark"},{n:"The St. Regis",r:"Butler service and Murano chandeliers",s:"John Jacob Ballroom"},{n:"1-Altitude",r:"Sky-high drama at 282 metres",s:"Gallery Level"}],cn:"Your ideal partner: a Modern Minimalist — they'll keep your sparkle focused.",em:"👑"},
  freeSpiritCreative:{sn:"The Festival Heart",desc:"Rules? What rules? Your wedding is joyful curated chaos — food trucks alongside champagne, a band playing jazz to K-pop, and a dress code of 'wear what makes you happiest.'",cp:[{n:"Sunset Coral",h:"#E8837C"},{n:"Ocean Teal",h:"#5B9A8B"},{n:"Warm Sand",h:"#FFF0ED"},{n:"Tropical Green",h:"#3D7A6B"},{n:"Golden Hour",h:"#E0CFA0"}],dk:["festival lights","mismatched seating","food trucks","neon signs","tropical leaves","polaroid stations"],sd:["A no-seating-plan reception with themed food stations — laksa, satay, artisan ice cream","A neon sign of your couple hashtag above the dance floor with tropical flowers","An outdoor ceremony at Fort Canning under a macramé arch with fairy lights"],vm:[{n:"The Alkaff Mansion",r:"Heritage garden for creative free-flowing celebration",s:"The Lawn"},{n:"The Summerhouse",r:"Garden estate with fairy lights and farm-to-table",s:"Outdoor reception"},{n:"1-Arden",r:"Sky-high food forest — unconventional nature-meets-city",s:"Sky Garden Terrace"}],cn:"Your ideal partner: a Garden Naturalist — wild, beautiful, and uniquely yours.",em:"🎪"}
};
const sfGetResult=(tags)=>{const sc={timelessRomantic:0,modernMinimalist:0,gardenNaturalist:0,culturalStoryteller:0,glamourMaximalist:0,freeSpiritCreative:0};tags.forEach(tag=>{const w=SF_W[tag];if(w)Object.entries(w).forEach(([k,v])=>{sc[k]+=v})});const sorted=Object.entries(sc).sort((a,b)=>b[1]-a[1]);const t=SF_T[sorted[0][0]];return{styleName:t.sn,description:t.desc,colourPalette:t.cp.map(c=>({name:c.n,hex:c.h})),decorKeywords:t.dk,signatureDetails:t.sd,venueMatches:t.vm.map(v=>({name:v.n,reason:v.r,space:v.s})),compatibilityNote:t.cn,moodEmoji:t.em,_source:"fallback"}};

function StyleFinderT(){
  const[phase,setPhase]=useState("welcome");const[step,setStep]=useState(0);const[answers,setAnswers]=useState({});const[multiSel,setMultiSel]=useState([]);const[result,setResult]=useState(null);const[lmsg,setLmsg]=useState(0);const[anim,setAnim]=useState("right");const[copied,setCopied]=useState(false);
  const loadMsgs=["Analysing your wedding vibe…","Matching your aesthetic to Singapore's most beautiful venues…","Crafting your personalised Style DNA…"];
  useEffect(()=>{if(phase!=="loading")return;const iv=setInterval(()=>setLmsg(p=>(p+1)%3),2200);return()=>clearInterval(iv)},[phase]);

  const handleSelect=useCallback((tag)=>{
    const q=SF_Q[step];
    if(q.ms){setMultiSel(prev=>prev.includes(tag)?prev.filter(t=>t!==tag):[...prev,tag]);return;}
    setAnswers(prev=>({...prev,[step]:tag}));
    setTimeout(()=>{if(step<SF_Q.length-1){setAnim("right");setStep(s=>s+1)}else{doSubmit({...answers,[step]:tag})}},450);
  },[step,answers]);

  const handleMultiSubmit=()=>{if(multiSel.length===0)return;const up={...answers,[step]:multiSel};setAnswers(up);doSubmit(up)};

  const doSubmit=async(all)=>{
    setPhase("loading");setLmsg(0);const tags=Object.values(all).flat();
    // Try Claude API (works in artifact preview, not on Vercel)
    try{const r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,system:"You are the Wedding Style AI for singaporeweddingvenues.net. Generate a Wedding Style DNA profile as JSON: {styleName,description,colourPalette:[{name,hex}],decorKeywords:[],signatureDetails:[],venueMatches:[{name,reason,space}],compatibilityNote,moodEmoji}. Include at least one 1-Group venue. Use Singapore wedding terms.",messages:[{role:"user",content:`Style tags: ${tags.join(", ")}. Generate my Wedding Style DNA.`}]})});
      if(!r.ok)throw new Error();const d=await r.json();const txt=d.content?.[0]?.text||"";const parsed=JSON.parse(txt.replace(/```json\n?/g,"").replace(/```\n?/g,"").trim());
      if(parsed?.styleName){setResult({...parsed,_source:"ai"})}else{setResult(sfGetResult(tags))}
    }catch{setResult(sfGetResult(tags))}
    setPhase("result");
  };

  const retake=()=>{setPhase("welcome");setStep(0);setAnswers({});setMultiSel([]);setResult(null)};
  const copyRes=()=>{if(!result)return;const t=`✧ My Wedding Style DNA ✧\n\n${result.moodEmoji||"✨"} ${result.styleName}\n\n${result.description}\n\nPalette: ${result.colourPalette?.map(c=>`${c.name} (${c.hex})`).join(", ")}\n\nDécor: ${result.decorKeywords?.join(", ")}\n\nDetails:\n${result.signatureDetails?.map(d=>`• ${d}`).join("\n")}\n\nVenues:\n${result.venueMatches?.map(v=>`• ${v.name} — ${v.reason}`).join("\n")}\n\n💕 ${result.compatibilityNote}\n\nDiscover yours at singaporeweddingvenues.net`;navigator.clipboard?.writeText(t).then(()=>{setCopied(true);setTimeout(()=>setCopied(false),2000)})};

  if(phase==="welcome")return(<div style={{background:"var(--w)",borderRadius:16,padding:36,boxShadow:"var(--sm)",textAlign:"center"}}>
    <div style={{fontSize:40,marginBottom:12}}>✧</div>
    <h2 style={{fontFamily:"var(--fh)",fontSize:"clamp(24px,3.5vw,36px)",fontWeight:300,marginBottom:10}}>Discover Your <em style={{fontWeight:600}}>Wedding Style DNA</em></h2>
    <p style={{fontSize:14,color:"var(--g)",lineHeight:1.7,maxWidth:440,margin:"0 auto 8px"}}>Answer 8 visual questions to reveal your unique wedding aesthetic — personalised colour palette, décor direction, and matched Singapore venues.</p>
    <p style={{fontSize:12,color:"var(--gi)",marginBottom:28}}>60 seconds · No wrong answers · AI-powered results</p>
    <button className="bg" onClick={()=>setPhase("quiz")} style={{fontSize:15,padding:"14px 36px"}}>✧ Begin the Quiz</button>
  </div>);

  if(phase==="quiz"){const q=SF_Q[step];return(<div style={{background:"var(--w)",borderRadius:16,padding:28,boxShadow:"var(--sm)"}} key={step}>
    {/* Progress */}
    <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:6,marginBottom:6}}>{SF_Q.map((_,i)=><div key={i} style={{width:i===step?10:6,height:i===step?10:6,borderRadius:"50%",background:i<step?"var(--go)":i===step?"var(--ro)":"var(--gpa)",transition:"all .3s",animation:i===step?"pu 1.2s infinite":"none"}}/>)}</div>
    <p style={{textAlign:"center",fontSize:11,color:"var(--g)",letterSpacing:".05em",textTransform:"uppercase",fontWeight:600,marginBottom:24}}>Step {step+1} of {SF_Q.length} — {q.t}</p>
    <h3 style={{fontFamily:"var(--fh)",fontSize:"clamp(20px,3vw,28px)",fontWeight:400,textAlign:"center",marginBottom:24,lineHeight:1.3}}>"{q.q}"</h3>
    <div style={{display:"grid",gridTemplateColumns:q.o.length===3?"repeat(3,1fr)":"repeat(2,1fr)",gap:12}}>
      {q.o.map((opt,i)=>{const sel=q.ms?multiSel.includes(opt.tag):answers[step]===opt.tag;return(
        <div key={opt.tag} onClick={()=>handleSelect(opt.tag)} style={{aspectRatio:"16/10",borderRadius:14,background:opt.g,padding:16,cursor:"pointer",position:"relative",overflow:"hidden",display:"flex",flexDirection:"column",justifyContent:"flex-end",transition:"transform .3s,box-shadow .3s,outline .15s",outline:sel?"3px solid var(--go)":"3px solid transparent",transform:sel?"scale(1.02)":"scale(1)",boxShadow:sel?"var(--sg)":"var(--ss)",animation:`fU .35s ease ${i*70}ms both`}}>
          {opt.sw&&<div style={{display:"flex",gap:3,marginBottom:6}}>{opt.sw.map((hex,j)=><div key={j} style={{width:18,height:18,borderRadius:5,background:hex,border:"2px solid rgba(255,255,255,.5)"}}/>)}</div>}
          <div style={{fontSize:20,marginBottom:2}}>{opt.ic}</div>
          <div style={{color:"#fff",fontFamily:"var(--fh)",fontSize:16,fontWeight:600,textShadow:"0 1px 4px rgba(0,0,0,.3)"}}>{opt.l}</div>
          <div style={{color:"rgba(255,255,255,.8)",fontSize:11,lineHeight:1.3,marginTop:2,textShadow:"0 1px 3px rgba(0,0,0,.2)"}}>{opt.d}</div>
          {sel&&<div style={{position:"absolute",top:8,right:8,width:22,height:22,borderRadius:"50%",background:"var(--go)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,color:"#fff"}}>✓</div>}
        </div>)})}
    </div>
    {q.ms&&<div style={{textAlign:"center",marginTop:18}}><button className="bg" disabled={multiSel.length===0} onClick={handleMultiSubmit} style={{opacity:multiSel.length===0?.5:1}}>See My Style →</button><p style={{fontSize:11,color:"var(--g)",marginTop:6}}>Select one or more, then continue</p></div>}
    {step>0&&<button onClick={()=>{setAnim("left");setStep(s=>s-1)}} style={{display:"block",margin:"18px auto 0",background:"none",border:"none",color:"var(--g)",fontFamily:"var(--fb)",fontSize:13,cursor:"pointer"}}>← Back</button>}
  </div>);}

  if(phase==="loading")return(<div style={{background:"var(--w)",borderRadius:16,padding:48,boxShadow:"var(--sm)",textAlign:"center"}}>
    <div style={{fontSize:36,marginBottom:18}}>✧</div>
    <h3 style={{fontFamily:"var(--fh)",fontSize:24,fontWeight:400,marginBottom:24}}>Discovering Your Style</h3>
    <div className="sk" style={{width:"100%",maxWidth:340,height:6,margin:"0 auto 24px",borderRadius:999}}/>
    <p style={{fontSize:14,color:"var(--g)",minHeight:40}} key={lmsg}>{loadMsgs[lmsg]}</p>
    <div style={{display:"flex",justifyContent:"center",gap:6,marginTop:18}}>{[0,1,2].map(i=><div key={i} style={{width:6,height:6,borderRadius:"50%",background:"var(--ro)",animation:`fl 1s ease-in-out ${i*.2}s infinite`}}/>)}</div>
  </div>);

  if(phase==="result"&&result)return(<div style={{background:"var(--w)",borderRadius:16,padding:32,boxShadow:"var(--sm)"}}>
    <div style={{textAlign:"center",marginBottom:32,animation:"fU .5s ease"}}>
      <p style={{fontSize:11,color:"var(--go)",letterSpacing:".08em",textTransform:"uppercase",fontWeight:600,marginBottom:6}}>Your Wedding Style DNA</p>
      <div style={{fontSize:36,marginBottom:8}}>{result.moodEmoji||"✧"}</div>
      <h2 style={{fontFamily:"var(--fh)",fontSize:"clamp(22px,4vw,34px)",fontWeight:600,fontStyle:"italic",marginBottom:12}}>{result.styleName}</h2>
      <p style={{fontSize:14,color:"var(--cl)",lineHeight:1.7,maxWidth:500,margin:"0 auto"}}>{result.description}</p>
      {result._source==="ai"&&<span style={{display:"inline-block",marginTop:8,fontSize:10,color:"var(--go)",background:"var(--gp)",padding:"2px 8px",borderRadius:999,fontWeight:600}}>✨ AI-Personalised</span>}
    </div>
    {/* Palette */}
    {result.colourPalette&&<div style={{marginBottom:28,animation:"fU .5s ease .2s both"}}><h4 style={{fontFamily:"var(--fh)",fontSize:18,fontWeight:500,textAlign:"center",marginBottom:12}}>Your Colour Palette</h4><div style={{display:"flex",justifyContent:"center",gap:10,flexWrap:"wrap"}}>{result.colourPalette.map((c,i)=><div key={i} style={{textAlign:"center",animation:`fU .3s ease ${.3+i*.08}s both`}}><div style={{width:42,height:42,borderRadius:8,background:c.hex,margin:"0 auto 4px",boxShadow:"var(--ss)"}}/><div style={{fontSize:10,color:"var(--g)",maxWidth:56}}>{c.name}</div></div>)}</div></div>}
    {/* Keywords */}
    {result.decorKeywords&&<div style={{marginBottom:28,textAlign:"center",animation:"fU .5s ease .5s both"}}><h4 style={{fontFamily:"var(--fh)",fontSize:18,fontWeight:500,marginBottom:10}}>Décor Keywords</h4><div style={{display:"flex",justifyContent:"center",gap:6,flexWrap:"wrap"}}>{result.decorKeywords.map((kw,i)=><span key={i} className="cp" style={{fontSize:11,padding:"4px 12px"}}>{kw}</span>)}</div></div>}
    {/* Details */}
    {result.signatureDetails&&<div style={{marginBottom:28,animation:"fU .5s ease .7s both"}}><h4 style={{fontFamily:"var(--fh)",fontSize:18,fontWeight:500,textAlign:"center",marginBottom:10}}>Signature Details</h4>{result.signatureDetails.map((d,i)=><div key={i} style={{background:"var(--gg)",borderRadius:10,padding:12,borderLeft:"3px solid var(--go)",marginBottom:8,fontSize:13,lineHeight:1.6,color:"var(--cl)"}}>✦ {d}</div>)}</div>}
    {/* Venues */}
    {result.venueMatches&&<div style={{marginBottom:28,animation:"fU .5s ease .9s both"}}><h4 style={{fontFamily:"var(--fh)",fontSize:18,fontWeight:500,textAlign:"center",marginBottom:10}}>Your Perfect Venues</h4>{result.venueMatches.map((v,i)=><div key={i} style={{background:"var(--iv)",borderRadius:10,padding:16,marginBottom:8,border:"1px solid var(--gpa)"}}><h5 style={{fontFamily:"var(--fh)",fontSize:17,fontWeight:600,marginBottom:2}}>{v.name}</h5><p style={{fontSize:13,color:"var(--cl)",marginBottom:4}}>{v.reason}</p><p style={{fontSize:11,color:"var(--gd)",fontWeight:600}}>📍 {v.space}</p></div>)}</div>}
    {/* Compatibility */}
    {result.compatibilityNote&&<div style={{textAlign:"center",marginBottom:24,animation:"fU .5s ease 1.1s both"}}><div style={{background:"var(--rp)",borderRadius:10,padding:14,display:"inline-block",maxWidth:440}}><p style={{fontSize:13,color:"var(--c)"}}>💕 {result.compatibilityNote}</p></div></div>}
    {/* Actions */}
    <div style={{display:"flex",justifyContent:"center",gap:10,flexWrap:"wrap",animation:"fU .5s ease 1.3s both"}}>
      <button className="cp" onClick={retake} style={{fontSize:12}}>🔄 Retake</button>
      <button className="bg" onClick={copyRes} style={{fontSize:12,padding:"8px 18px"}}>{copied?"✓ Copied!":"📋 Copy Results"}</button>
    </div>
  </div>);
  return null;
}

// ── ASK AI (client-side knowledge base — no API calls) ──────────────────
const KB=[
  {q:"how much wedding cost singapore",k:["cost","price","budget","how much","expensive","cheap","affordable"],a:"A typical Singapore wedding costs $30,000–$80,000 for 150–300 guests. The biggest cost is the venue + catering (50–65% of budget). Per-table pricing ranges from $1,200++ for mid-range hotels to $3,500++ for luxury venues. Don't forget the ++ means service charge & GST add ~20%."},
  {q:"what is tea ceremony",k:["tea ceremony","tea","chinese tradition","cha dao"],a:"The tea ceremony (敬茶) is a Chinese wedding tradition where the couple serves tea to parents and elders, symbolising respect and gratitude. It's typically held in the morning before the banquet. The couple receives gold jewellery and ang bao in return. Many venues like The Alkaff Mansion and Raffles Hotel have dedicated tea ceremony spaces."},
  {q:"what is solemnisation rom",k:["solemnisation","rom","registry","legal","ceremony","vows"],a:"Solemnisation is the legal wedding ceremony conducted under Singapore's Registry of Marriages (ROM). You can solemnise at ROM itself, or at any licensed venue. Most of our 28 listed venues are licensed for solemnisation — rooftops like 1-Arden and 1-Altitude are popular choices for sunset ceremonies."},
  {q:"what is yum seng",k:["yum seng","toast","cheers"],a:"Yum Seng is the signature Singaporean wedding toast where guests raise their glasses and shout 'Yum Seng!' (meaning 'drink to success' in Cantonese) in unison, drawing out the words as long as possible. It's one of the most energetic and memorable moments of any Singapore banquet."},
  {q:"what is ang bao",k:["ang bao","red packet","gift","how much give","cash gift"],a:"Ang bao (红包) is the monetary gift in a red envelope that guests give the couple. The amount typically covers your share of the banquet cost. General guide: $100–$150 for colleagues, $150–$200 for friends, $200+ for close family. For premium hotel venues, $200+ per person is expected."},
  {q:"best rooftop venue",k:["rooftop","sky","high","views","panoramic","skyline"],a:"Singapore's best rooftop wedding venues: 1-Altitude (282m, Singapore's highest — sunset ceremonies above the clouds), 1-Arden (Level 51, CapitaSpring — sky garden with 80,000 plants), 1-Atico (ION Orchard — Orchard Road skyline views), and 1-Alfaro (Labrador Tower — city and sea views). All are managed by 1-Host."},
  {q:"best garden venue",k:["garden","outdoor","nature","green","botanic"],a:"Top garden/outdoor wedding venues: The Summerhouse (European estate with edible gardens in Seletar), The Garage (1920s Art Deco in UNESCO Botanic Gardens), The Alkaff Mansion (heritage hilltop with tropical gardens), and Fort Canning Park (700 years of history). For hotel gardens, Shangri-La has 15 acres of tropical grounds."},
  {q:"best hotel venue",k:["hotel","luxury","ballroom","grand"],a:"Singapore's top hotel wedding venues: Raffles Hotel (heritage icon since 1887), Capella Singapore (Sentosa resort by Foster + Partners), The St. Regis (Butler service, old-world elegance), Marina Bay Sands (Asia's largest ballroom), The Fullerton Hotel (neoclassical Marina Bay landmark), and Shangri-La (legendary Island Ballroom for 800 guests)."},
  {q:"best intimate small wedding",k:["intimate","small","private","few guests","under 100","50 guests"],a:"Best venues for intimate weddings (under 100 guests): Oumi at CapitaSpring (modern Japanese omakase, 80 guests max), Burkill Hall at Botanic Gardens (colonial bungalow, 80 guests), The Summerhouse (garden gazebo, 100 guests), The Halia in the Ginger Garden (120 guests), and The Riverhouse at Clarke Quay (100 guests)."},
  {q:"best heritage venue",k:["heritage","colonial","historic","old","traditional","cultural"],a:"Heritage wedding venues in Singapore: CHIJMES Hall (Gothic chapel with stained glass), National Gallery (former Supreme Court + City Hall), The Alkaff Mansion (1918 hilltop estate), The Clifford Pier (Art Deco arches, historic landing point), The Fullerton Hotel (neoclassical landmark), and InterContinental (Peranakan-inspired luxury)."},
  {q:"when book venue",k:["when","book","how early","advance","timeline","planning"],a:"Book your Singapore wedding venue 12–18 months in advance, especially for auspicious dates and popular venues. Premium venues like Raffles, 1-Arden, and MBS can be booked out 18+ months ahead for weekends. Weekday weddings are easier to secure with 6–9 months notice. Start venue visits as soon as you're engaged!"},
  {q:"what is march-in",k:["march-in","march in","entrance","grand entrance"],a:"The march-in is the couple's grand entrance into the banquet hall — one of the most dramatic moments of a Singapore wedding. Typically accompanied by spotlight, music, and dry ice effects. Many couples do a second march-in after a wardrobe change. Hotels like MBS and Shangri-La have stunning ballroom entrances designed for this moment."},
  {q:"halal venue",k:["halal","muslim","malay","nikah"],a:"Several Singapore venues offer Halal-certified catering: Marina Bay Sands (Halal options available), Shangri-La Singapore, Grand Hyatt, and JEN Tanglin. For Malay weddings (nikah ceremony), outdoor venues like Fort Canning Park and The Summerhouse are popular. Many hotel venues can accommodate Halal requirements with advance notice."},
  {q:"chinese banquet",k:["chinese","banquet","table of 10","8 course","10 course"],a:"Chinese wedding banquets are Singapore's most popular reception format. Key features: 8–10 course dinner, tables of 10 guests, yum seng toast, march-in ceremony. Top Chinese banquet venues: Shangri-La Island Ballroom (800 guests), Marriott Tang Plaza (Wan Hao), Mandarin Oriental (Cherry Garden), The Riverhouse (modern Chinese). Budget $1,500–$3,000++ per table."},
  {q:"waterfront venue",k:["waterfront","water","bay","sea","marina","river"],a:"Waterfront venues: Monti at Fullerton Pavilion (iconic Marina Bay dome), The Clifford Pier (Art Deco arches, bay views), The Riverhouse (Singapore River), 1-Altitude Coast (Sentosa seascapes), The Fullerton Hotel (Marina Bay panorama). Monti's solemnisation on the dome overlooking MBS is one of Singapore's most photographed wedding moments."},
];
function AskAI({show,toggle}){const[msgs,sMs]=useState([]);const[inp,sInp]=useState("");const[ld,sLd]=useState(false);
  const send=()=>{if(!inp.trim()||ld)return;const q=inp.trim().toLowerCase();sInp("");sMs(m=>[...m,{r:"u",t:inp.trim()}]);sLd(true);
    setTimeout(()=>{
      // Check for specific venue name mention
      const venueMatch=VENUES.find(v=>q.includes(v.name.toLowerCase())||q.includes(v.id.replace(/-/g," ")));
      if(venueMatch){sMs(m=>[...m,{r:"a",t:`${venueMatch.name} — ${venueMatch.tagline}\n\n📍 ${venueMatch.area} · ${venueMatch.setting}\n👥 ${venueMatch.capacity.s}–${venueMatch.capacity.st} guests\n🍽️ ${venueMatch.cuisine.join(", ")}\n⭐ ${venueMatch.rating}/5\n${venueMatch.solemn?"💒 Licensed for solemnisation":""}\n\n${venueMatch.description}\n\nBest for: ${venueMatch.bestFor.join(", ")}`}]);sLd(false);return;}
      // Keyword match against knowledge base
      let bestMatch=null,bestScore=0;
      KB.forEach(item=>{let score=0;item.k.forEach(kw=>{if(q.includes(kw))score+=2;});if(score>bestScore){bestScore=score;bestMatch=item;}});
      if(bestMatch&&bestScore>=2){sMs(m=>[...m,{r:"a",t:bestMatch.a}]);}
      else{sMs(m=>[...m,{r:"a",t:"Great question! I can help with:\n\n• Venue recommendations (rooftop, garden, hotel, heritage)\n• Pricing and budgets\n• Singapore wedding customs (tea ceremony, ROM, yum seng)\n• Planning timelines\n• Specific venue details\n\nTry asking about a specific venue or topic!"}]);}
      sLd(false);
    },600);};
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
function WeddingStory({s,go}){
  const venue=VENUES.find(x=>x.id===s.vid);
  const otherWeddings=WEDDINGS.filter(w=>w.couple!==s.couple).slice(0,3);
  return(
    <article style={{background:"var(--cr)"}}>
      <div style={{maxWidth:900,margin:"0 auto",padding:"20px 24px 80px"}}>
        <button onClick={()=>go("weddings")} className="nl" style={{marginBottom:20,fontSize:13}}><ChevronLeft size={14} style={{display:"inline",verticalAlign:"middle"}}/> All Real Weddings</button>

        {/* Hero image */}
        <div style={{borderRadius:16,overflow:"hidden",height:"clamp(300px,50vh,500px)",position:"relative",marginBottom:32}}>
          <img src={s.coupleImg} alt={s.couple+" wedding at "+s.venue} style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center 25%"}}/>
          <div style={{position:"absolute",inset:0,background:"linear-gradient(180deg,transparent 40%,rgba(45,45,45,.7) 100%)"}}/>
          <div style={{position:"absolute",bottom:28,left:28,right:28,color:"var(--w)"}}>
            <h1 style={{fontFamily:"var(--fh)",fontSize:"clamp(30px,5vw,48px)",fontWeight:400,marginBottom:6,animation:"heroTextIn .8s ease forwards"}}>{s.couple}</h1>
            <p style={{fontSize:15,opacity:.9,animation:"fU .6s ease .2s both"}}>{s.venue} · {s.guests} Guests · {s.type}</p>
          </div>
        </div>

        {/* Story content */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 280px",gap:32,alignItems:"start"}}>
          <div>
            <blockquote style={{fontFamily:"var(--fh)",fontSize:"clamp(20px,2.5vw,28px)",fontWeight:400,fontStyle:"italic",lineHeight:1.5,color:"var(--cl)",marginBottom:32,paddingLeft:20,borderLeft:"3px solid var(--go)",animation:"fU .5s ease .3s both"}}>"{s.quote}"</blockquote>

            <h2 style={{fontFamily:"var(--fh)",fontSize:24,fontWeight:500,marginBottom:16}}>Their Story</h2>
            <p style={{fontSize:15,lineHeight:1.9,color:"var(--cl)",marginBottom:28}}>{s.story}</p>

            <div style={{background:"var(--w)",borderRadius:14,padding:24,boxShadow:"var(--ss)",marginBottom:28}}>
              <h3 style={{fontFamily:"var(--fh)",fontSize:20,fontWeight:500,marginBottom:14}}>Wedding Details</h3>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
                {[
                  {label:"Venue",val:s.venue},
                  {label:"Guests",val:s.guests+" guests"},
                  {label:"Celebration Style",val:s.type},
                  {label:"Photography",val:s.photo}
                ].map((d,i)=><div key={i}><p style={{fontSize:10,fontWeight:600,letterSpacing:".06em",textTransform:"uppercase",color:"var(--g)",marginBottom:2}}>{d.label}</p><p style={{fontSize:14,fontWeight:500}}>{d.val}</p></div>)}
              </div>
            </div>

            {venue&&<div style={{background:"var(--w)",borderRadius:14,overflow:"hidden",boxShadow:"var(--ss)",cursor:"pointer"}} onClick={()=>go("venues",venue)}>
              <div style={{height:180,overflow:"hidden"}}><VI src={venue.hero||venue.img} alt={venue.name} style={{width:"100%",height:"100%"}}/></div>
              <div style={{padding:"16px 20px"}}>
                <p style={{fontSize:11,fontWeight:600,letterSpacing:".05em",textTransform:"uppercase",color:"var(--gd)",marginBottom:4}}>The Venue</p>
                <h3 style={{fontFamily:"var(--fh)",fontSize:22,fontWeight:500,marginBottom:4}}>{venue.name}</h3>
                <p style={{fontSize:13,color:"var(--cl)",lineHeight:1.5,marginBottom:10}}>{venue.tagline} · {venue.area}</p>
                <span style={{fontSize:13,fontWeight:600,color:"var(--gd)",display:"flex",alignItems:"center",gap:4}}>View Venue Details <ChevronRight size={13}/></span>
              </div>
            </div>}
          </div>

          <aside style={{position:"sticky",top:88}}>
            <div style={{background:"var(--w)",borderRadius:14,padding:20,boxShadow:"var(--ss)",marginBottom:16}}>
              <h3 style={{fontFamily:"var(--fh)",fontSize:18,fontWeight:500,marginBottom:14}}>More Real Weddings</h3>
              {otherWeddings.map((w,i)=><div key={i} style={{display:"flex",gap:10,marginBottom:12,cursor:"pointer",padding:8,borderRadius:8,transition:"background .2s"}} onClick={()=>go("wedding-story",w)} onMouseOver={e=>e.currentTarget.style.background="var(--gg)"} onMouseOut={e=>e.currentTarget.style.background="transparent"}>
                <img src={w.coupleImg} alt={w.couple} style={{width:52,height:52,borderRadius:8,objectFit:"cover",objectPosition:"center 25%",flexShrink:0}}/>
                <div><p style={{fontWeight:600,fontSize:13}}>{w.couple}</p><p style={{fontSize:11,color:"var(--g)"}}>{w.venue} · {w.guests} guests</p></div>
              </div>)}
              <button onClick={()=>go("weddings")} className="nl" style={{fontSize:13,color:"var(--gd)",marginTop:4}}>View All Stories <ChevronRight size={13} style={{display:"inline",verticalAlign:"middle"}}/></button>
            </div>
            <button onClick={()=>go("ai-tools")} className="bg" style={{width:"100%",justifyContent:"center",fontSize:13}}><Sparkles size={14}/>Find Your Venue</button>
          </aside>
        </div>
      </div>
    </article>
  );
}

function RWPage({go}){return(<section style={{padding:"44px 24px 72px",background:"var(--cr)"}}><div style={{maxWidth:1200,margin:"0 auto"}}><h1 style={{fontFamily:"var(--fh)",fontSize:"clamp(28px,4vw,40px)",fontWeight:300,marginBottom:8}}>Real Weddings</h1><p style={{color:"var(--g)",fontSize:14,maxWidth:560,marginBottom:32}}>Be inspired by celebrations across Singapore's finest venues — luxury hotels, rooftop ceremonies, and heritage garden affairs.</p><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:18}}>{WEDDINGS.map((s,i)=>{const v=VENUES.find(x=>x.id===s.vid);return<RWCd key={i} s={s} v={v} go={go}/>})}</div></div></section>);}

function BlogPage(){
  const posts=[
    {title:"Celestial Unions: Chinese Zodiac Compatibility 2026",excerpt:"Wedding planning in Singapore is becoming less about rules and more about resonance. A modern guide to Chinese zodiac compatibility, lucky colours, and wedding styling in the Year of the Fire Horse.",img:"https://www.1-host.sg/wp-content/uploads/2026/02/Chinese-restaurant-wedding-singapore.jpg",url:"https://www.1-host.sg/chinese_zodiac_compatibility_2026/",date:"March 2026",tag:"Planning"},
    {title:"From First Visit to Final Vows: How a Singapore Wedding Planner Brings It All Together",excerpt:"After securing a venue, a Singapore wedding planner guides couples through planning, vendor curation, banquet coordination, and flawless execution. A complete journey with 1-Host.",img:"https://www.1-host.sg/wp-content/uploads/2026/03/Untitled-design.jpg",url:"https://www.1-host.sg/first-vist-to-final-vows-singapore-wedding-planner/",date:"March 2026",tag:"Planning"},
    {title:"Beyond Ballrooms: Wedding Venues in Singapore That Redefine Celebrations",excerpt:"In 2026, couples are moving away from predictable formats and towards experiences that feel personal, immersive, and deeply meaningful. A new chapter in Singapore wedding planning.",img:"https://www.1-host.sg/wp-content/uploads/2026/02/garden-solemnisation-singapore.jpg",url:"https://www.1-host.sg/beyond_ballrooms_wedding_venues_in-_singapore/",date:"February 2026",tag:"Venues"},
    {title:"Paws and Promises: Pet Friendly Wedding Venues in Singapore",excerpt:"You know the look. You pick up your keys, and suddenly your dog is sitting up, tail wagging, eyes wide with hope. Why pet friendly weddings are shaping Singapore wedding planning in 2026.",img:"https://www.1-host.sg/wp-content/uploads/2026/02/Untitled-design-4.jpg",url:"https://www.1-host.sg/paws-and-promises-pet-friendly-wedding-venues-in-singapore/",date:"February 2026",tag:"Venues"},
    {title:"Newly Engaged in 2026? How Singapore Couples Are Kickstarting Their Wedding Planning",excerpt:"Newly engaged couples in 2026 are not rushing to book everything. They are rushing to book the right things. A transformational planning playbook for the modern Singapore couple.",img:"https://www.1-host.sg/wp-content/uploads/2026/03/blog-banner1.jpg",url:"https://www.1-host.sg/how-singapore-couples-are-planning-weddings/",date:"March 2026",tag:"Planning"},
    {title:"What Does a Wedding Planner Actually Do? A Singapore Couple's Guide",excerpt:"Do we really need a wedding planner? And what exactly does a wedding planner do that we cannot do ourselves? A complete guide by 1-Host, Singapore wedding planners.",img:"https://www.1-host.sg/wp-content/uploads/2026/03/blog-banner2.jpg",url:"https://www.1-host.sg/a-complete-guide-by-1-host-singapore-wedding-planners/",date:"March 2026",tag:"Planning"},
    {title:"Next Gen Bridal Glam Redefined!",excerpt:"For 2025 and beyond, bridal makeup trends are all about enhancing natural beauty while adding a modern touch. Natural radiance, glowing hydrated skin, and fresh dewy finishes.",img:"https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=800&q=80",url:"https://www.1-host.sg/next-gen-bridal-glam-redefined/",date:"January 2025",tag:"Style"},
    {title:"Why 1-Host Venues Are Built to Weather-Proof Your Big Day",excerpt:"Rain or shine, we have got you covered. Singapore's weather has a flair for the dramatic. One moment, clear skies. The next? A surprise downpour just before your solemnisation.",img:"https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80",url:"https://www.1-host.sg/why-1-host-venues-are-built-to-weather-proof-your-big-day/",date:"December 2024",tag:"Venues"},
    {title:"Food & Drink Trends for 2025 Weddings",excerpt:"Wedding food and drink trends are evolving to reflect more personalised, sustainable, and interactive experiences. From brunch weddings to live cooking stations and signature cocktails.",img:"https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",url:"https://www.1-host.sg/food-drink-trends-for-2025-weddings/",date:"November 2024",tag:"Food"},
    {title:"Why Rooftop Weddings Remain The Most Loved Choice For Couples",excerpt:"Bringing you closer to the sky, offering unmatched views and a one-of-a-kind backdrop for your big day. The versatility and romance of rooftop wedding celebrations.",img:"https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80",url:"https://www.1-host.sg/why-rooftop-weddings-remain-the-most-loved-choice-for-couples/",date:"October 2024",tag:"Venues"},
  ];
  const[filter,setFilter]=useState("All");
  const tags=["All","Planning","Venues","Style","Food"];
  const filtered=filter==="All"?posts:posts.filter(p=>p.tag===filter);

  return(<section style={{padding:"48px 24px 80px",background:"var(--cr)"}}>
    <div style={{maxWidth:1200,margin:"0 auto"}}>
      <header style={{marginBottom:36}}>
        <h1 style={{fontFamily:"var(--fh)",fontSize:"clamp(28px,4vw,42px)",fontWeight:300,marginBottom:10}}>Wedding Blog</h1>
        <p style={{color:"var(--g)",fontSize:14,maxWidth:580}}>Expert advice, venue guides, and inspiration for planning your Singapore wedding. From zodiac compatibility to bridal trends, food innovations, and venue spotlights.</p>
      </header>
      <div style={{display:"flex",gap:8,marginBottom:28,flexWrap:"wrap"}}>{tags.map(t=><button key={t} className={"cp"+(filter===t?" a":"")} onClick={()=>setFilter(t)}>{t}</button>)}</div>

      {/* Featured post - first one large */}
      {filtered.length>0&&<article style={{display:"grid",gridTemplateColumns:"1.2fr 1fr",gap:0,borderRadius:16,overflow:"hidden",background:"var(--w)",boxShadow:"var(--sm)",marginBottom:28,cursor:"pointer",animation:"cardEnter .6s ease"}} onClick={()=>window.open(filtered[0].url,"_blank")}>
        <div style={{minHeight:320}}><VI src={filtered[0].img} alt={filtered[0].title} style={{width:"100%",height:"100%"}}/></div>
        <div style={{padding:"36px 32px",display:"flex",flexDirection:"column",justifyContent:"center"}}>
          <div style={{display:"flex",gap:8,marginBottom:12}}><span style={{background:"var(--gp)",color:"var(--gd)",fontSize:11,fontWeight:600,padding:"3px 10px",borderRadius:999,letterSpacing:".04em"}}>{filtered[0].tag}</span><span style={{fontSize:12,color:"var(--g)"}}>{filtered[0].date}</span></div>
          <h2 style={{fontFamily:"var(--fh)",fontSize:"clamp(22px,2.5vw,30px)",fontWeight:500,lineHeight:1.25,marginBottom:14}}>{filtered[0].title}</h2>
          <p style={{fontSize:14,color:"var(--cl)",lineHeight:1.7,marginBottom:18}}>{filtered[0].excerpt}</p>
          <span style={{fontSize:13,fontWeight:600,color:"var(--gd)",display:"flex",alignItems:"center",gap:4}}>Read Article <ChevronRight size={14}/></span>
        </div>
      </article>}

      {/* Grid of remaining posts */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(320px,1fr))",gap:20}}>
        {filtered.slice(1).map((post,idx)=><BlogCard key={idx} post={post} idx={idx}/>)}
      </div>
    </div>
  </section>);
}

function BlogCard({post,idx}){const[ref,vis]=useSR();return(
  <article ref={ref} key={idx} style={{borderRadius:14,overflow:"hidden",background:"var(--w)",boxShadow:"var(--ss)",cursor:"pointer",opacity:vis?1:0,transform:vis?"translateY(0) scale(1)":"translateY(30px) scale(.97)",transition:"all .6s var(--e) "+(idx*80)+"ms"}} onClick={()=>window.open(post.url,"_blank")} className="vc">
    <div style={{paddingTop:"56.25%",position:"relative",overflow:"hidden"}}><VI src={post.img} alt={post.title} className="vi" style={{position:"absolute",inset:0,width:"100%",height:"100%"}}/><span style={{position:"absolute",top:10,left:10,background:"rgba(45,45,45,.85)",backdropFilter:"blur(4px)",color:"var(--w)",fontSize:10,fontWeight:600,letterSpacing:".05em",textTransform:"uppercase",padding:"3px 10px",borderRadius:999}}>{post.tag}</span></div>
    <div style={{padding:"16px 18px 20px"}}>
      <p style={{fontSize:11,color:"var(--g)",marginBottom:6}}>{post.date}</p>
      <h3 style={{fontFamily:"var(--fh)",fontSize:19,fontWeight:500,lineHeight:1.3,marginBottom:8}}>{post.title}</h3>
      <p style={{fontSize:13,color:"var(--cl)",lineHeight:1.6,display:"-webkit-box",WebkitLineClamp:3,WebkitBoxOrient:"vertical",overflow:"hidden"}}>{post.excerpt}</p>
      <p style={{fontSize:13,fontWeight:600,color:"var(--gd)",marginTop:10,display:"flex",alignItems:"center",gap:4}}>Read More <ChevronRight size={13}/></p>
    </div>
  </article>
);}

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

function Ftr({go}){return(<footer style={{background:"var(--c)",color:"var(--gi)",padding:"52px 24px 24px"}} role="contentinfo"><div style={{maxWidth:1200,margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(170px,1fr))",gap:32,marginBottom:36}}><div><h4 style={{fontFamily:"var(--fh)",color:"var(--w)",fontSize:17,marginBottom:12}}>Singapore Wedding Venues</h4><p style={{fontSize:12,lineHeight:1.6}}>{VENUES.length} iconic venues — luxury hotels, rooftop restaurants, heritage mansions, garden estates.</p><div style={{display:"flex",gap:10,marginTop:12}}><a href="https://www.facebook.com/1Host/" target="_blank" rel="noopener noreferrer" style={{color:"var(--gi)"}}><Facebook size={15}/></a><a href="https://www.instagram.com/1_host/" target="_blank" rel="noopener noreferrer" style={{color:"var(--gi)"}}><Instagram size={15}/></a><a href="mailto:hello@singaporeweddingvenues.net" style={{color:"var(--gi)"}}><Mail size={15}/></a></div></div><div><h4 style={{color:"var(--w)",fontSize:12,fontWeight:600,letterSpacing:".04em",textTransform:"uppercase",marginBottom:12}}>1-Host Collection</h4>{VENUES.filter(v=>v.managed).slice(0,6).map(v=><p key={v.id} style={{fontSize:11,marginBottom:5,cursor:"pointer"}} onClick={()=>go("venues",v)}>{v.name}</p>)}</div><div><h4 style={{color:"var(--w)",fontSize:12,fontWeight:600,letterSpacing:".04em",textTransform:"uppercase",marginBottom:12}}>Hotels</h4>{VENUES.filter(v=>v.cat==="hotel"&&!v.managed).slice(0,6).map(v=><p key={v.id} style={{fontSize:11,marginBottom:5,cursor:"pointer"}} onClick={()=>go("venues",v)}>{v.name}</p>)}</div><div><h4 style={{color:"var(--w)",fontSize:12,fontWeight:600,letterSpacing:".04em",textTransform:"uppercase",marginBottom:12}}>AI Tools</h4>{["Venue Matchmaker","Timeline Generator","Venue Comparison","Ask AI"].map(t=><p key={t} style={{fontSize:11,marginBottom:5,cursor:"pointer"}} onClick={()=>go("ai-tools")}>{t}</p>)}</div></div><div style={{borderTop:"1px solid rgba(255,255,255,.1)",paddingTop:18,textAlign:"center",fontSize:11,color:"var(--g)"}}><p>© 2026 Singapore Wedding Venues · {VENUES.length} iconic venues · Made with <Sparkles size={10} style={{display:"inline",verticalAlign:"middle",color:"var(--go)"}}/> AI</p><p style={{marginTop:8,fontSize:10}}>Venue partners: update your listing → <a href="mailto:venues@singaporeweddingvenues.net" style={{color:"var(--go)",textDecoration:"none"}}>venues@singaporeweddingvenues.net</a></p></div></footer>);}
