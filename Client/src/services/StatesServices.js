import Sentiment from "sentiment";

///// ---- Function to count mentors based on the range of likes ---- /////

export const countMentorsByLikes = (mentors) => {
  const count = [0, 0, 0, 0, 0]; // Array to store counts for each range

  mentors.forEach((mentor) => {
    const likesCount = mentor.likes.length;

    if (likesCount >= 0 && likesCount <= 20) {
      count[0]++;
    } else if (likesCount > 20 && likesCount <= 40) {
      count[1]++;
    } else if (likesCount > 40 && likesCount <= 60) {
      count[2]++;
    } else if (likesCount > 60 && likesCount <= 80) {
      count[3]++;
    } else if (likesCount > 80) {
      count[4]++;
    }
  });

  return count;
};

////////// ----- Function to count available / active mentors ----- //////////

export const countAvailableMentors = (mentors) => {
  let count = 0;

  mentors.forEach((mentor) => {
    if (mentor.available) {
      count++;
    }
  });

  return count;
};

//////////////////// ---- function to analyze rating messages using sentiment ---- ////////////////////

export const countSentiments = (mentors) => {
  let positiveCount = 0;
  let negativeCount = 0;
  let neutralCount = 0;

  const sentiment = new Sentiment();

  mentors.forEach((mentor) => {
    mentor.ratings.forEach((rating) => {
      const analysis = sentiment.analyze(rating.comment);

      if (analysis.score > 0) {
        positiveCount++;
        console.log(positiveCount);
      } else if (analysis.score < 0) {
        negativeCount++;
        console.log(negativeCount);
      } else {
        neutralCount++;
        console.log(neutralCount);
      }
    });
  });

  return { positiveCount, negativeCount, neutralCount }; // Add this line
};

////////// ---- function to count mentors by average count of stars given in rating ---- //////////

export const countMentorsbyAvgStars = (mentors) => {
  const starCounts = Array(5).fill(0);

  mentors.forEach((mentor) => {
    const totalStars = mentor.ratings.reduce(
      (sum, rating) => sum + rating.stars,
      0
    );
    const averageStars = totalStars / mentor.ratings.length;
    const starCountIndex = Math.floor(averageStars) - 1;

    starCounts[starCountIndex]++;
  });

  return starCounts;
};
