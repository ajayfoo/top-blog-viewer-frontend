import PropTypes from "prop-types";

function TickIcon({ className }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="3.5 5.25 17.5 13.41"
    >
      <path d="M21 7L9 19l-5.5-5.5l1.41-1.41L9 16.17L19.59 5.59z"></path>
    </svg>
  );
}

TickIcon.propTypes = {
  className: PropTypes.string,
};

export default TickIcon;
