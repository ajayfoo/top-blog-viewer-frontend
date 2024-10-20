import PropTypes from "prop-types";

function CloseIcon({ className }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="5 5 14 14"
    >
      <path d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z"></path>
    </svg>
  );
}

CloseIcon.propTypes = {
  className: PropTypes.string,
};

export default CloseIcon;