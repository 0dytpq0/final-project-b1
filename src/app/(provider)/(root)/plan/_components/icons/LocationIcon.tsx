import React from "react";
type IconProps = {
  className?: string;
};

const LocationIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    width="21"
    height="21"
    viewBox="0 0 21 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <g clip-path="url(#clip0_1592_15132)">
      <path
        d="M10.762 5.08496C10.1028 5.08496 9.45831 5.28046 8.91015 5.64673C8.36198 6.013 7.93474 6.5336 7.68245 7.14268C7.43016 7.75177 7.36414 8.42199 7.49276 9.0686C7.62138 9.7152 7.93885 10.3091 8.40502 10.7753C8.8712 11.2415 9.46514 11.559 10.1117 11.6876C10.7583 11.8162 11.4286 11.7502 12.0377 11.4979C12.6467 11.2456 13.1673 10.8184 13.5336 10.2702C13.8999 9.72203 14.0954 9.07757 14.0954 8.41829C14.0954 7.53424 13.7442 6.68639 13.1191 6.06127C12.4939 5.43615 11.6461 5.08496 10.762 5.08496ZM10.762 10.085C10.4324 10.085 10.1102 9.98721 9.8361 9.80408C9.56201 9.62094 9.34839 9.36064 9.22225 9.0561C9.0961 8.75156 9.0631 8.41645 9.1274 8.09314C9.19171 7.76984 9.35045 7.47287 9.58353 7.23978C9.81662 7.0067 10.1136 6.84796 10.4369 6.78365C10.7602 6.71934 11.0953 6.75235 11.3999 6.8785C11.7044 7.00464 11.9647 7.21826 12.1478 7.49234C12.331 7.76643 12.4287 8.08866 12.4287 8.41829C12.4287 8.86032 12.2531 9.28425 11.9406 9.59681C11.628 9.90937 11.2041 10.085 10.762 10.085Z"
        fill="#B7B7B7"
      />
      <path
        d="M10.7615 20.0852C10.0598 20.0888 9.36742 19.9242 8.74238 19.6052C8.11734 19.2862 7.57782 18.8222 7.16899 18.2518C3.99316 13.871 2.38232 10.5777 2.38232 8.46266C2.38232 6.24037 3.26513 4.1091 4.83653 2.5377C6.40792 0.966299 8.5392 0.0834961 10.7615 0.0834961C12.9838 0.0834961 15.1151 0.966299 16.6865 2.5377C18.2579 4.1091 19.1407 6.24037 19.1407 8.46266C19.1407 10.5777 17.5298 13.871 14.354 18.2518C13.9452 18.8222 13.4056 19.2862 12.7806 19.6052C12.1556 19.9242 11.4632 20.0888 10.7615 20.0852ZM10.7615 1.90266C9.02184 1.90465 7.35401 2.5966 6.12388 3.82672C4.89376 5.05684 4.20181 6.72468 4.19982 8.46433C4.19982 10.1393 5.77732 13.2368 8.64066 17.186C8.88374 17.5208 9.20263 17.7933 9.57125 17.9812C9.93987 18.1691 10.3477 18.2671 10.7615 18.2671C11.1752 18.2671 11.5831 18.1691 11.9517 17.9812C12.3203 17.7933 12.6392 17.5208 12.8823 17.186C15.7457 13.2368 17.3232 10.1393 17.3232 8.46433C17.3212 6.72468 16.6292 5.05684 15.3991 3.82672C14.169 2.5966 12.5011 1.90465 10.7615 1.90266Z"
        fill="#B7B7B7"
      />
    </g>
    <defs>
      <clipPath id="clip0_1592_15132">
        <rect
          width="20"
          height="20"
          fill="white"
          transform="translate(0.761719 0.0849609)"
        />
      </clipPath>
    </defs>
  </svg>
);

export default LocationIcon;