interface IconProps {
  className?: string;
  size?: {
    width: number;
    height: number;
  };
}

const Logo = () => {
  return (
    <svg
      id="sw-js-blob-svg"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className="scale-50"
    >
      {" "}
      <defs>
        {" "}
        <linearGradient id="sw-gradient" x1="0" x2="1" y1="1" y2="0">
          {" "}
          <stop
            id="stop1"
            stop-color="rgba(37.761, 44.143, 130.986, 1)"
            offset="0%"
          ></stop>{" "}
          <stop
            id="stop2"
            stop-color="rgba(182.997, 57.921, 57.921, 1)"
            offset="100%"
          ></stop>{" "}
        </linearGradient>{" "}
      </defs>{" "}
      <path
        fill="none"
        d="M6,-10.9C6.6,-10.1,5.1,-6.1,5.5,-3.7C3.9,-1.4,4.3,-0.7,6.6,1.3C8.9,3.3,13.1,6.7,16.4,13.7C19.6,20.7,22,31.4,19.1,29.8C16.2,28.2,8.1,14.3,3.7,8C-0.8,1.6,-1.6,2.9,-3.9,4.1C-6.2,5.4,-10,6.7,-10.5,6C-11.1,5.3,-8.5,2.6,-6.9,0.9C-5.3,-0.8,-4.6,-1.5,-7.1,-7.4C-9.5,-13.3,-14.9,-24.3,-14.3,-25.1C-13.6,-25.9,-6.8,-16.4,-2,-12.8C2.7,-9.3,5.5,-11.7,6,-10.9Z"
        width="100%"
        height="100%"
        transform="translate(50 50)"
        stroke-width="1"
        className="transition-all duration-300 ease-in-out fill-current text-primary-500"
        stroke="url(#sw-gradient)"
      ></path>{" "}
    </svg>
  );
};

const UploadSvgIcon = ({ className, size }: IconProps) => {
  return (
    <svg
      className={className}
      width={size?.width}
      height={size?.height}
      version="1.1"
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 490.955 490.955"
    >
      <path
        id="XMLID_448_"
        d="M445.767,308.42l-53.374-76.49v-20.656v-11.366V97.241c0-6.669-2.604-12.94-7.318-17.645L312.787,7.301
	C308.073,2.588,301.796,0,295.149,0H77.597C54.161,0,35.103,19.066,35.103,42.494V425.68c0,23.427,19.059,42.494,42.494,42.494
	h159.307h39.714c1.902,2.54,3.915,5,6.232,7.205c10.033,9.593,23.547,15.576,38.501,15.576c26.935,0-1.247,0,34.363,0
	c14.936,0,28.483-5.982,38.517-15.576c11.693-11.159,17.348-25.825,17.348-40.29v-40.06c16.216-3.418,30.114-13.866,37.91-28.811
	C459.151,347.704,457.731,325.554,445.767,308.42z M170.095,414.872H87.422V53.302h175.681v46.752
	c0,16.655,13.547,30.209,30.209,30.209h46.76v66.377h-0.255v0.039c-17.685-0.415-35.529,7.285-46.934,23.46l-61.586,88.28
	c-11.965,17.134-13.387,39.284-3.722,57.799c7.795,14.945,21.692,25.393,37.91,28.811v19.842h-10.29H170.095z M410.316,345.771
	c-2.03,3.866-5.99,6.271-10.337,6.271h-0.016h-32.575v83.048c0,6.437-5.239,11.662-11.659,11.662h-0.017H321.35h-0.017
	c-6.423,0-11.662-5.225-11.662-11.662v-83.048h-32.574h-0.016c-4.346,0-8.308-2.405-10.336-6.271
	c-2.012-3.866-1.725-8.49,0.783-12.07l61.424-88.064c2.189-3.123,5.769-4.984,9.57-4.984h0.017c3.802,0,7.38,1.861,9.568,4.984
	l61.427,88.064C412.04,337.28,412.328,341.905,410.316,345.771z"
      />
    </svg>
  );
};

const EmailIcon = () => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      className="text-2xl text-default-400 pointer-events-none flex-shrink-0"
    >
      <path
        d="M17 3.5H7C4 3.5 2 5 2 8.5V15.5C2 19 4 20.5 7 20.5H17C20 20.5 22 19 22 15.5V8.5C22 5 20 3.5 17 3.5ZM17.47 9.59L14.34 12.09C13.68 12.62 12.84 12.88 12 12.88C11.16 12.88 10.31 12.62 9.66 12.09L6.53 9.59C6.21 9.33 6.16 8.85 6.41 8.53C6.67 8.21 7.14 8.15 7.46 8.41L10.59 10.91C11.35 11.52 12.64 11.52 13.4 10.91L16.53 8.41C16.85 8.15 17.33 8.2 17.58 8.53C17.84 8.85 17.79 9.33 17.47 9.59Z"
        fill="currentColor"
      ></path>
    </svg>
  );
};

const PasswordIcon = () => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      className="text-2xl text-default-400 pointer-events-none flex-shrink-0"
    >
      <path
        d="M12.0011 17.3498C12.9013 17.3498 13.6311 16.6201 13.6311 15.7198C13.6311 14.8196 12.9013 14.0898 12.0011 14.0898C11.1009 14.0898 10.3711 14.8196 10.3711 15.7198C10.3711 16.6201 11.1009 17.3498 12.0011 17.3498Z"
        fill="currentColor"
      ></path>
      <path
        d="M18.28 9.53V8.28C18.28 5.58 17.63 2 12 2C6.37 2 5.72 5.58 5.72 8.28V9.53C2.92 9.88 2 11.3 2 14.79V16.65C2 20.75 3.25 22 7.35 22H16.65C20.75 22 22 20.75 22 16.65V14.79C22 11.3 21.08 9.88 18.28 9.53ZM12 18.74C10.33 18.74 8.98 17.38 8.98 15.72C8.98 14.05 10.34 12.7 12 12.7C13.66 12.7 15.02 14.06 15.02 15.72C15.02 17.39 13.67 18.74 12 18.74ZM7.35 9.44C7.27 9.44 7.2 9.44 7.12 9.44V8.28C7.12 5.35 7.95 3.4 12 3.4C16.05 3.4 16.88 5.35 16.88 8.28V9.45C16.8 9.45 16.73 9.45 16.65 9.45H7.35V9.44Z"
        fill="currentColor"
      ></path>
    </svg>
  );
};

const File = ({ className }: IconProps) => {
  return (
    <svg
      viewBox="0 0 24 24"
      width="56"
      height="56"
      stroke="#ffffff"
      stroke-width="1"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
      className={className}
    >
      <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
      <polyline points="13 2 13 9 20 9"></polyline>
    </svg>
  );
};

const Cloud = ({ className }: IconProps) => {
  return (
    <svg
      viewBox="0 0 24 24"
      width="56"
      height="56"
      stroke="#ffffff"
      stroke-width="1"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
      className={className}
    >
      <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path>
    </svg>
  );
};

const Privacy = ({ className }: IconProps) => {
  return (
    <svg
      viewBox="0 0 24 24"
      width="56"
      height="56"
      stroke="#ffffff"
      stroke-width="1"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
      className={className}
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
    </svg>
  );
};

export const Icons = {
  Logo,
  UploadSvgIcon,
  EmailIcon,
  PasswordIcon,
  File,
  Cloud,
  Privacy,
};
