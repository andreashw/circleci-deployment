export default ({ color = 'black', width = '', height = '' }) => (
  <svg width={width} height={height} viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 12.5V6.5M7 6.5V0.5M7 6.5L13 6.5M7 6.5H1" stroke={color} strokeLinecap="round" />
  </svg>
);
