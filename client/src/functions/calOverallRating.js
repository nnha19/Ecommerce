const calOverallRating = (reviews) => {
  const arr = [5, 4, 3, 2, 1];
  const ratings = {};
  arr.forEach((num) => {
    const count = reviews.filter((review) => review.rating === num).length;
    ratings[num] = count;
  });
  let total = 0;
  for (let key in ratings) {
    total += key * ratings[key];
  }
  total =
    reviews.length > 0 ? Math.round((total / reviews.length) * 10) / 10 : 0;

  return total;
};

export default calOverallRating;
