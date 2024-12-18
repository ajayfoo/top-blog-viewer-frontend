import PropTypes from "prop-types";
function EditIcon({ className }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="3 3 18 18"
    >
      <path d="M3 21v-4.25L16.2 3.575q.3-.275.663-.425t.762-.15t.775.15t.65.45L20.425 5q.3.275.438.65T21 6.4q0 .4-.137.763t-.438.662L7.25 21zM17.6 7.8L19 6.4L17.6 5l-1.4 1.4z"></path>
    </svg>
  );
}

EditIcon.propTypes = {
  className: PropTypes.string,
};
export default EditIcon;
