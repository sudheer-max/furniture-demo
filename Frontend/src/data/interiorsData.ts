import { Residence } from '../types';

export const RESIDENCES: Residence[] = [
  {
    id: 'residence-milano',
    number: '01',
    name: 'The Milano Residence — Palazzo Brera',
    location: 'Milan, Italy',
    coordinates: '45.4719° N, 9.1879° E',
    area: '340 m²',
    year: '2024',
    category: 'haussmann',
    description: 'A protected 16th-century palazzo restored with austere restraint, anchoring historical fresco vaults with custom-proportioned walnut and Roman travertine monoliths.',
    curatorialQuote: '“We allowed natural light from the 4-meter arched windows to cast longitudinal shadows across the fluted travertine base. The goal was unhurried monumentality—a room where one simply breathes.”',
    quoteAuthor: 'Matteo Brizzi Studio • Architectural Notation',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop',
    hotspots: [
      {
        id: 1,
        title: '01 Svelto Chaise',
        description: 'Belgian Bouclé Écru & French Canal Walnut',
        top: '68%',
        left: '28%',
        productLink: 'svelto-chaise'
      },
      {
        id: 2,
        title: '02 Vassal Travertine',
        description: 'Hollowed Roman Travertine Monolith',
        top: '72%',
        left: '49%',
        productLink: 'vassal-travertine'
      },
      {
        id: 3,
        title: '03 Aura Luminaire',
        description: 'Patinated Sand-Cast Bronze with Alabaster Sphere',
        top: '65%',
        left: '62%',
        productLink: 'aura-luminaire'
      }
    ]
  },
  {
    id: 'residence-stmoritz',
    number: '02',
    name: 'Alpine Sanctuary — St. Moritz',
    location: 'Engadin Valley, Switzerland',
    coordinates: '46.4908° N, 9.8355° E',
    area: '480 m²',
    year: '2024',
    category: 'alpine',
    description: 'Anchored against the jagged granite elevations of the Bernina Range, this monolithic timber and poured-board-formed concrete refuge reinterprets the Swiss mountain refuge through quiet modernism.',
    curatorialQuote: '“In the high alpine silence, every joint must withstand -25°C humidity contracts. Timber harvested from winter fellings yields a dense cellular fortitude that synthetic furniture cannot equal.”',
    quoteAuthor: 'Marcelle Guérin • Lead Ébéniste Curatorial Dispatch',
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 'residence-rivegauche',
    number: '03',
    name: 'Rive Gauche Private Salon',
    location: 'Boulevard Saint-Germain, Paris VII',
    coordinates: '48.8546° N, 2.3274° E',
    area: '260 m²',
    year: '2023',
    category: 'haussmann',
    description: 'In a grand apartment built under Baron Haussmann\'s second municipal campaign, the atelier introduced contemporary monolithic restraint to balance original gilded trumeau mirrors and chevron oak marquetry.',
    curatorialQuote: '“The dialogue between the 166-year-old French parquet and our razor-straight walnut edges provides an unexpected spatial tension.”',
    quoteAuthor: 'Camille Laurent • Parisian Studio Lead',
    imageUrl: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200&auto=format&fit=crop'
  }
];
