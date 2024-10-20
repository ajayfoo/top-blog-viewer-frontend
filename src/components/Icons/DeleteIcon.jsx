import PropTypes from "prop-types";
function DeleteIcon({ className }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="4 3 16 18"
    >
      <path d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zm2-4h2V8H9zm4 0h2V8h-2z"></path>
    </svg>
  );
}

DeleteIcon.propTypes = {
  className: PropTypes.string,
};
export default DeleteIcon;
