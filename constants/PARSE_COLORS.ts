const PARSE_COLORS = {
  gray: '#666',
  green: '#1eff00',
  blue: '#0070ff',
  purple: '#a335ee',
  orange: '#ff8000',
  pink: '#e268a8',
  gold: '#e5cc80',
};

export function assignParseToParseColor(parse: number | string) {
  switch (true) {
    case parse === 100: return PARSE_COLORS.gold;
    case (parse >= 99): return PARSE_COLORS.pink;
    case parse > 95: return PARSE_COLORS.orange;
    case parse > 75: return PARSE_COLORS.purple;
    case parse > 50: return PARSE_COLORS.blue;
    case parse > 30: return PARSE_COLORS.green;
    default: return PARSE_COLORS.gray;
  }
}
