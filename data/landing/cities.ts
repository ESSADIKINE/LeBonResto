// Villes marocaines couvertes par LeBonResto, utilisées par <CitiesMap /> et <CitiesGrid />.

export interface MoroccoCity {
  id: string;
  name: string;
  lat: number;
  lng: number;
  imageSrc: string;
  restaurantCount?: number;
}

export const moroccoCities: MoroccoCity[] = [
  {
    id: 'casablanca',
    name: 'Casablanca',
    lat: 33.5731,
    lng: -7.5898,
    imageSrc: '/assets/landing/cities/casablanca.jpg',
    restaurantCount: 5,
  },
  {
    id: 'rabat',
    name: 'Rabat',
    lat: 34.0209,
    lng: -6.8416,
    imageSrc: '/assets/landing/cities/rabat.jpg',
    restaurantCount: 2,
  },
  {
    id: 'marrakech',
    name: 'Marrakech',
    lat: 31.6295,
    lng: -7.9811,
    imageSrc: '/assets/landing/cities/marrakech.jpg',
    restaurantCount: 3,
  },
  {
    id: 'tanger',
    name: 'Tanger',
    lat: 35.7595,
    lng: -5.834,
    imageSrc: '/assets/landing/cities/tanger.jpg',
    restaurantCount: 1,
  },
  {
    id: 'fes',
    name: 'Fès',
    lat: 34.0181,
    lng: -5.0078,
    imageSrc: '/assets/landing/cities/fes.jpg',
    restaurantCount: 1,
  },
  {
    id: 'agadir',
    name: 'Agadir',
    lat: 30.4278,
    lng: -9.5981,
    imageSrc: '/assets/landing/cities/agadir.jpg',
    restaurantCount: 0,
  },
  {
    id: 'al-hoceima',
    name: 'Al Hoceima',
    lat: 35.2517,
    lng: -3.9372,
    imageSrc: '/assets/landing/cities/al-hoceima.jpg',
    restaurantCount: 0,
  },
];
