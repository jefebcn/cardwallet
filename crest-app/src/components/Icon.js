// Line-icon set ported from crest-ui.jsx, rendered with react-native-svg.
import React from 'react';
import Svg, { Path, G } from 'react-native-svg';

export const ICONS = {
  home: 'M3.2 11 12 3.5l8.8 7.5M5.4 9.3V20H10v-5.4h4V20h4.6V9.3',
  card: 'M3 7.5A1.5 1.5 0 0 1 4.5 6h15A1.5 1.5 0 0 1 21 7.5v9A1.5 1.5 0 0 1 19.5 18h-15A1.5 1.5 0 0 1 3 16.5zM3 10h18M7 14.5h3',
  chart: 'M5 20V11M12 20V5M19 20v-6M3.5 20h17',
  user: 'M12 12.2a3.8 3.8 0 1 0 0-7.6 3.8 3.8 0 0 0 0 7.6ZM4.8 20a7.2 7.2 0 0 1 14.4 0',
  up: 'M12 19.5V5M6 11l6-6 6 6',
  down: 'M12 5v14.5M18 13.5l-6 6-6-6',
  plus: 'M12 5.5v13M5.5 12h13',
  chevR: 'M9.5 6l6 6-6 6',
  chevL: 'M14.5 6l-6 6 6 6',
  close: 'M6.5 6.5l11 11M17.5 6.5l-11 11',
  check: 'M5 12.5l4.5 4.5L19 7',
  bell: 'M6.5 9.5a5.5 5.5 0 0 1 11 0c0 4.5 1.8 5.5 1.8 5.5H4.7s1.8-1 1.8-5.5ZM10 20a2 2 0 0 0 4 0',
  search: 'M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14ZM20 20l-4-4',
  shield: 'M12 3.2l7 2.8v5.2c0 4.8-3 7.6-7 9.6-4-2-7-4.8-7-9.6V6z',
  doc: 'M7 3.5h6.5L18 8v12.5H7zM13.5 3.5V8H18',
  eye: 'M2.5 12s3.6-6.5 9.5-6.5S21.5 12 21.5 12s-3.6 6.5-9.5 6.5S2.5 12 2.5 12Z',
  send: 'M21 3.5L10.5 14M21 3.5l-6.5 17.5-3.9-7.6-7.6-3.9z',
  clock: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM12 7.5V12l3 1.8',
  pin: 'M12 21s6.5-5.2 6.5-11A6.5 6.5 0 0 0 5.5 10c0 5.8 6.5 11 6.5 11ZM12 12.2a2.2 2.2 0 1 0 0-4.4 2.2 2.2 0 0 0 0 4.4Z',
  sliders: 'M5 8h7M16 8h3M5 16h3M12 16h7M12 6.2v3.6M8 14.2v3.6',
  gear: 'M12 15.2a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4ZM19.4 12c0-.5 0-1-.1-1.4l1.7-1.3-1.7-3-2 .8a6.6 6.6 0 0 0-2.4-1.4L14.5 3.5h-3.4l-.4 2.2a6.6 6.6 0 0 0-2.4 1.4l-2-.8-1.7 3L6.3 10.6c-.1.5-.1.9-.1 1.4s0 .9.1 1.4l-1.7 1.3 1.7 3 2-.8a6.6 6.6 0 0 0 2.4 1.4l.4 2.2h3.4l.4-2.2a6.6 6.6 0 0 0 2.4-1.4l2 .8 1.7-3-1.7-1.3c.1-.5.1-.9.1-1.4Z',
  scan: 'M4 8.5V6a2 2 0 0 1 2-2h2.5M15.5 4H18a2 2 0 0 1 2 2v2.5M20 15.5V18a2 2 0 0 1-2 2h-2.5M8.5 20H6a2 2 0 0 1-2-2v-2.5M7 12h10',
  arrowR: 'M5 12h14M13 6l6 6-6 6',
  copy: 'M9 9.5A1.5 1.5 0 0 1 10.5 8h7A1.5 1.5 0 0 1 19 9.5v9a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 9 18.5zM5 15.5A1.5 1.5 0 0 1 5 14V5.5A1.5 1.5 0 0 1 6.5 4H15',
  share: 'M16 6l-4-3-4 3M12 3v12M5 12v6.5A1.5 1.5 0 0 0 6.5 20h11a1.5 1.5 0 0 0 1.5-1.5V12',
  flag: 'M6 21V4M6 4.5h11l-2 3.5 2 3.5H6',
};

export function Icon({ name, size = 22, sw = 1.9, color = '#15261E' }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d={ICONS[name]} stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

// snowflake / freeze glyph
export function FreezeGlyph({ size = 20, color = '#fff', sw = 1.8 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <G stroke={color} strokeWidth={sw} strokeLinecap="round">
        <Path d="M12 3v18M4.2 7.5l15.6 9M19.8 7.5l-15.6 9" />
        <Path d="M12 6.2l2.2-2M12 6.2l-2.2-2M12 17.8l2.2 2M12 17.8l-2.2 2" />
        <Path d="M6.5 8.8l-3 .2M6.5 15.2l-3-.2M17.5 8.8l3 .2M17.5 15.2l3-.2" />
      </G>
    </Svg>
  );
}

// Contactless arcs used on the card
export function Contactless({ size = 22, color = '#EFEAD9', opacity = 0.8 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" opacity={opacity}>
      <Path d="M8 7a7 7 0 0 1 0 10M12 5a10 10 0 0 1 0 14M15.5 9a4 4 0 0 1 0 6"
        stroke={color} strokeWidth={1.7} strokeLinecap="round" />
    </Svg>
  );
}
