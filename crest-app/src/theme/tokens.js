// Crest design tokens — forest-green refined fintech system.
// Ported 1:1 from the high-fidelity prototype (crest-ui.jsx).

export const T = {
  ink: '#13241D',
  forest: '#1E3A2F',
  forest600: '#2C5544',
  forest700: '#234638',
  sage: '#6E9684',
  sage300: '#A6C2B4',
  sage100: '#DCE8E0',
  sage50: '#EEF3EF',
  cream: '#F4F1E8',
  paper: '#FFFFFF',
  card2: '#FBFAF4',
  line: '#E7E2D6',
  lineSoft: '#EFEBE0',
  brass: '#A8854E',
  brassLt: '#C7A877',
  brassBg: '#F0E7D6',
  pos: '#2E7D5B',
  neg: '#B25548',
  posBg: '#E6F0EA',
  negBg: '#F6E7E3',
  strong: '#15261E',
  text: '#33433B',
  muted: '#6E7C74',
  faint: '#9BA89F',
};

// Font families (loaded via @expo-google-fonts). In React Native the weight is
// encoded in the family name, so we map numeric weights -> family.
export const FONTS = {
  400: 'SchibstedGrotesk_400Regular',
  500: 'SchibstedGrotesk_500Medium',
  600: 'SchibstedGrotesk_600SemiBold',
  700: 'SchibstedGrotesk_700Bold',
  800: 'SchibstedGrotesk_800ExtraBold',
  serifItalic: 'Newsreader_400Regular_Italic',
};

// ff(weight) -> the right family name. Falls back to 700 / 400 sensibly.
export function ff(weight = 400) {
  if (weight === 'serifItalic') return FONTS.serifItalic;
  const w = Number(weight) || 400;
  if (w >= 800) return FONTS[800];
  if (w >= 700) return FONTS[700];
  if (w >= 600) return FONTS[600];
  if (w >= 500) return FONTS[500];
  return FONTS[400];
}

// Reusable shadow presets (RN translation of the CSS box-shadows).
export const SHADOW = {
  cardLight: {
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06, shadowRadius: 4, elevation: 1,
  },
  cardMedium: {
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.09, shadowRadius: 16, elevation: 3,
  },
  btnGreen: {
    shadowColor: '#1E3A2F', shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.26, shadowRadius: 20, elevation: 6,
  },
  btnBrass: {
    shadowColor: '#A8854E', shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.28, shadowRadius: 22, elevation: 7,
  },
  cardFloat: {
    shadowColor: '#15261E', shadowOffset: { width: 0, height: 18 },
    shadowOpacity: 0.32, shadowRadius: 40, elevation: 12,
  },
};

// Format a number as Italian euro, with optional explicit sign.
export function money(n, sign) {
  const s = Math.abs(n).toLocaleString('it-IT', {
    minimumFractionDigits: 2, maximumFractionDigits: 2,
  });
  const pre = sign === '+' ? '+' : sign === '-' ? '−' : '';
  return `${pre}€ ${s}`;
}
