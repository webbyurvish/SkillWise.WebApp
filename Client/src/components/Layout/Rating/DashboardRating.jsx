import {
  calculatePercentage,
  countObjectsWithStars,
} from "../../../services/MentorServices";

//////////////////// ----- Rating overview component for dashboard ----- ////////////////////

export const DashboardRating = ({ mentor }) => {
  ////////// classes of rating //////////
  const classes = ["Excellent", "Good", "Average", "Poor", "Terrible"];

  const totalCount = mentor && mentor.ratings.length;

  return (
    <div>
      {classes.map((category, index) => {
        return (
          <tr>
            <td className="rating-label td">{category}</td>
            <td className="rating-bar td">
              <div className="bar-container">
                <div
                  style={{
                    width: `${calculatePercentage(
                      countObjectsWithStars(5 - index, mentor),
                      totalCount
                    )}%`,
                    height: "13px",
                    backgroundColor: "#fbc02d",
                    borderRadius: "20px",
                  }}
                ></div>
              </div>
            </td>
            <td className="text-right td">
              {calculatePercentage(
                countObjectsWithStars(5 - index, mentor),
                totalCount
              ).toFixed(1)}
              %
            </td>
          </tr>
        );
      })}
    </div>
  );
};
