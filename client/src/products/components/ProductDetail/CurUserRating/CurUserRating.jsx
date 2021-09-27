const CurUserRating = ({ rating }) => {
  const ratings = [];

  for (let i = 0; i < rating; i++) {
    ratings.push("fas fa-star");
  }
  while (ratings.length < 5) {
    ratings.push("far fa-star");
  }
  return (
    <div style={{ marginBottom: "1rem", display: "flex", color: "green" }}>
      <p style={{ marginRight: ".5rem" }}>your rating</p>
      <div>
        {ratings.map((star) => (
          <i className={`rating-star ${star}`}></i>
        ))}
      </div>
    </div>
  );
};

export default CurUserRating;
