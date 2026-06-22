// Mock data ported from crest-ui.jsx — used as fallback / demo content.
import { T } from '../theme/tokens';

export const TX = [
  { id: 't1', name: 'Stipendio luglio', meta: 'Oggi · 09:14', amount: 1900, icon: 'S', bg: T.posBg, fg: T.pos, cat: 'Entrate', note: 'Bonifico in entrata' },
  { id: 't2', name: 'Coop Borgo Maggiore', meta: 'Ieri · 18:35', amount: -43, icon: 'C', cat: 'Spesa', note: 'Pagamento carta' },
  { id: 't3', name: 'Marco R.', meta: 'Ieri · 15:02', amount: -80, icon: 'M', bg: T.brassBg, fg: T.brass, cat: 'Trasferimenti', note: 'Trasferimento istantaneo' },
  { id: 't4', name: 'Trenitalia', meta: '2 lug · 08:10', amount: -22.5, icon: 'T', cat: 'Trasporti', note: 'Pagamento carta' },
  { id: 't5', name: 'Affitto luglio', meta: '1 lug · 09:00', amount: -650, icon: 'A', cat: 'Casa', note: 'Pagamento programmato' },
  { id: 't6', name: 'Spotify', meta: '30 giu · 12:00', amount: -10.99, icon: 'S', cat: 'Abbonamenti', note: 'Addebito ricorrente' },
];

export const RECIPIENTS = [
  { id: 'r1', name: 'Giulia Bianchi', meta: 'Crest · @giulia', icon: 'G', bg: T.sage100, fg: T.forest },
  { id: 'r2', name: 'Marco Rossi', meta: 'Crest · @marcor', icon: 'M', bg: T.brassBg, fg: T.brass },
  { id: 'r3', name: 'Affitto · Locatore', meta: 'SM76 ···· 8841', icon: 'A', bg: T.sage100, fg: T.forest },
  { id: 'r4', name: 'Luca Verdi', meta: 'IT60 ···· 2210', icon: 'L', bg: T.sage100, fg: T.forest },
];

export const BUDGET = [
  { cat: 'Spesa', amount: 420, pct: 34, color: T.forest },
  { cat: 'Trasporti', amount: 180, pct: 14, color: T.brass },
  { cat: 'Casa', amount: 640, pct: 52, color: T.sage },
];
