window.PORTFOLIO_DATA = {
  folders: [
    { id: 'music', label: 'My Favorite Musics', short: 'Music', icon: 'music', accent: '#ff5b78' },
    { id: 'photos', label: 'My Photos', short: 'Photos', icon: 'photos', accent: '#67c7ff' },
    { id: 'projects', label: 'My Projects', short: 'Projects', icon: 'projects', accent: '#7a8cff' },
    { id: 'books', label: 'My Books', short: 'Books', icon: 'books', accent: '#ff9f55' },
    { id: 'games', label: 'My Favorite Games', short: 'Games', icon: 'games', accent: '#8edc8d' },
    { id: 'movies', label: 'My Favorite Movies', short: 'Movies', icon: 'movies', accent: '#ca8cff' }
  ],
  music: [
    {
      title: 'Enter Sandman', artist: 'Metallica', year: '1991', tone: 'midnight', duration: '5:31',
      cover: 'https://draw.acharts.net/cover/16421-54d003e9c5ea9-l.jpg',
      coverAlt: 'Metallica — The Black Album original album artwork'
    },
    {
      title: 'Roadhouse Blues', artist: 'The Doors', year: '1970', tone: 'ember', duration: '4:05',
      cover: 'https://uk.rarevinyl.com/cdn/shop/products/the-doors-morrison-hotel-1st-ex-uk-vinyl-lp-album-record-eks75007-575209_1200x1200_crop_center.jpg?v=1707919999',
      coverAlt: 'The Doors — Morrison Hotel original album artwork'
    },
    {
      title: 'Late Goodbye', artist: 'Poets of the Fall', year: '2004', tone: 'violet', duration: '4:10',
      cover: 'https://kane.fi/181530-large_default/poets-of-the-fall-cd-late-goodbye-cd-single-kansi-ex-levy-ex-kaeytetty-cd.jpg',
      coverAlt: 'Poets of the Fall — Late Goodbye original single artwork'
    }
  ],
  photos: [
    { title: 'Studio Light', src: 'photo-1', caption: 'A placeholder for personal studio photography.' },
    { title: 'Night Drive', src: 'photo-2', caption: 'A cinematic placeholder for a night-drive photograph.' },
    { title: 'Creative Desk', src: 'photo-3', caption: 'A placeholder for workspace and process photography.' },
    { title: 'City Glass', src: 'photo-4', caption: 'A placeholder for urban photography.' },
    { title: 'Frame Study', src: 'photo-5', caption: 'A placeholder for directing and visual studies.' },
    { title: 'Motion', src: 'photo-6', caption: 'A placeholder for movement and experimental photography.' }
  ],
  projects: [
    { name: 'NeuroVista Atlas', category: '3D · Neuroscience · WebGL', description: 'Interactive educational neuroscience experience with 3D brain and neuron explorations.', url: 'https://saaeiddev.github.io/Neuro-Vista/neurovista-atlas/#/', mark: 'NV' },
    { name: 'Interactive Museum of Games', category: '3D · Games · Museum', description: 'An interactive museum experience celebrating gaming hardware, history and nostalgia.', url: 'https://saaeiddev.github.io/Interactive-Museum-of-Games/#games', mark: 'MG' },
    { name: 'V8 Engine', category: '3D · Engineering · Animation', description: 'Interactive V8 engine visualization with animated mechanical systems and educational labels.', url: 'https://saaeiddev.github.io/V8-Engine/', mark: 'V8' },
    { name: 'Device Repair', category: '3D · Hardware · Education', description: 'A cozy interactive repair-room experience for exploring device hardware components.', url: 'https://saaeiddev.github.io/Device-Repair-/', mark: 'DR' },
    { name: 'How AI Works', category: 'AI · Interactive Learning', description: 'An animated educational experience explaining AI systems, language models and creative AI.', url: 'https://saaeiddev.github.io/How-AI-Works-/#/', mark: 'AI' },
    { name: 'Eye', category: '3D · Anatomy · Education', description: 'Interactive eye anatomy and visual-pathway learning environment.', url: 'https://saaeiddev.github.io/Eye/#top', mark: 'EY' },
    { name: 'GearWorks', category: 'Automotive · 3D · Web', description: 'A cinematic interactive automotive workshop experience.', url: 'https://saaeiddev.github.io/GearWorks-/', mark: 'GW' },
    { name: 'Galaxy Velocity', category: 'Game Concept · Web', description: 'A playable combat-racing concept set in a stylized science-fiction universe.', url: 'https://saaeiddev.github.io/Galaxy-Velocity-Combat-Racers/', mark: 'GV' }
  ],
  books: [
    { title: 'Multimedia', subtitle: 'Art, technology and interactive media', status: 'In development', mark: 'MM' },
    { title: 'Future Book', subtitle: 'Reserved shelf for the next publication', status: 'Coming later', mark: '+' }
  ],
  games: [
    {
      title: 'Bully', platform: 'PlayStation 2', year: '2006',
      description: 'Rockstar’s open-world school-life action adventure and one of my favorite classics.', code: 'BLY',
      cover: 'https://i.ebayimg.com/images/g/ZP4AAeSwu~Jn4pIf/s-l400.jpg',
      coverAlt: 'Bully original PlayStation 2 box art'
    },
    {
      title: 'Rayman Raving Rabbids', platform: 'PC / Wii / PS2 / Xbox 360', year: '2006',
      description: 'Rayman’s chaotic party-game adventure packed with wild Rabbids, quirky trials and playful humor.', code: 'RRR',
      cover: 'https://images.gog-statics.com/fba1a44a51f1cae0f4db2ac87c18d5e21181d90ac8fca1db00ac8cfce5bb5ee2_product_card_v2_mobile_slider_639.jpg',
      coverAlt: 'Rayman Raving Rabbids official cover art'
    },
    {
      title: 'Max Payne 2: The Fall of Max Payne', platform: 'PC / PS2 / Xbox', year: '2003',
      description: 'A film-noir action classic with a dark cinematic atmosphere and memorable storytelling.', code: 'MP2',
      cover: 'https://www.mobygames.com/images/covers/l/232083-max-payne-2-the-fall-of-max-payne-windows-front-cover.jpg',
      coverAlt: 'Max Payne 2 The Fall of Max Payne original PC box art'
    },
    {
      title: 'Resident Evil Requiem', platform: 'PC / PS5 / Xbox Series X|S', year: '2026',
      description: 'The ninth main Resident Evil installment — cinematic survival horror built with Capcom’s RE ENGINE.', code: 'RE9',
      cover: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/3764200/library_600x900_2x.jpg',
      coverAlt: 'Resident Evil Requiem official PlayStation 5 cover art'
    },
    {
      title: 'Evil West', platform: 'PC / PS4 / PS5 / Xbox One / Xbox Series X|S', year: '2022',
      description: 'A supernatural Weird West action adventure about hunting vampires with firearms, gadgets and an electrified gauntlet.', code: 'EVW',
      cover: 'https://media.gamestop.com/i/gamestop/11208363',
      coverAlt: 'Evil West official PlayStation 5 cover art'
    }
  ],
  movies: [
    {
      title: 'TMNT', genre: 'Action · Animation', year: '2007', info: 'Moody urban action and stylized animation built around the four turtles.', code: 'TMNT', rating: 'Favorite',
      cover: 'https://www.thetechnodrome.com/images/albums/TMNT_Movie/TMNT_RatedOneSheet.jpg',
      coverAlt: 'TMNT 2007 original theatrical poster'
    },
    {
      title: 'Barnyard', genre: 'Animation · Comedy', year: '2006', info: 'A playful animated comedy with a warm, chaotic farm-world personality.', code: 'BRN', rating: 'Favorite',
      cover: 'https://cdn.cinematerial.com/p/500x/zimeucyf/barnyard-movie-poster.jpg?v=1476396967',
      coverAlt: 'Barnyard 2006 original theatrical poster'
    },
    {
      title: 'Cars', genre: 'Animation · Comedy', year: '2006', info: 'A warm road movie with strong world-building and automotive personality.', code: 'CRS', rating: 'Favorite',
      cover: 'https://artofthemovies.co.uk/cdn/shop/files/cars_advance_cast_style_EB24514_B_c2d2fb39-ed0b-4740-aaee-f34db58f7bf3.jpg?v=1708164812',
      coverAlt: 'Cars 2006 original theatrical poster'
    },
    {
      title: 'The Incredibles', genre: 'Animation · Action', year: '2004', info: 'Stylish superhero filmmaking with exceptional visual storytelling and family dynamics.', code: 'INC', rating: 'Favorite',
      cover: 'https://www.originalfilmart.com/cdn/shop/products/incredibles_2004_advance_original_film_art_5000x.jpg?v=1580632748',
      coverAlt: 'The Incredibles 2004 original theatrical poster'
    },
    {
      title: 'Kung Fu Panda', genre: 'Animation · Comedy', year: '2008', info: 'Expressive animation, martial-arts staging and a warm hero journey.', code: 'KFP', rating: 'Favorite',
      cover: 'https://farm6.staticflickr.com/5582/14406753357_eb2b977aee_o.jpg',
      coverAlt: 'Kung Fu Panda 2008 original theatrical poster'
    }
  ]
};
