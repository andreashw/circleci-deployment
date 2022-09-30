function JobReport({ color = 'black', width = '', height = '' }) {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.7368 2.7619H8.08376C6.02476 2.7619 4.24976 4.4309 4.24976 6.4909V17.2039C4.24976 19.3799 5.90876 21.1149 8.08376 21.1149H16.0728C18.1328 21.1149 19.8018 19.2649 19.8018 17.2039V8.0379L14.7368 2.7619Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.474 2.75021V5.65921C14.474 7.07921 15.623 8.23121 17.042 8.23421C18.359 8.23721 19.706 8.23821 19.797 8.23221"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.2841 15.5578H8.88708"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M12.2426 10.6056H8.8866" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default JobReport;
