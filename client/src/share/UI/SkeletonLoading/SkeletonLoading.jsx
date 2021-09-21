import "./SkeletonLoading.css";

const SkeletonLoading = ({ show }) => {
  const skeletonOutput = Array.from(new Array(10)).map((arr, i) => {
    return (
      <div key={i} className="skeleton">
        <div id="skeleton-animation">
          <div className="skeleton__img"></div>
          <div className="skeleton__content">
            <h2></h2>
            <p></p>
            <p></p>
            <div></div>
          </div>
        </div>
      </div>
    );
  });
  return show ? (
    <div className="skeleton-loading">
      <div className="skeletons">{skeletonOutput}</div>
    </div>
  ) : null;
};

export default SkeletonLoading;
