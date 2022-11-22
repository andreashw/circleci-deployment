export default ({ color = 'black', width = '', height = '' }) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="9.5" stroke={color} />
    <path
      d="M8.46447 15.6066L12 12.0711M12 12.0711L15.5355 8.53553M12 12.0711L15.5355 15.6066M12 12.0711L8.46447 8.53553"
      stroke={color}
    />
  </svg>
);
