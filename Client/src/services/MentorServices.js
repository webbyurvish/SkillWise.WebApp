import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

//////////////////// ----- count active stars based on average rating ---- ////////////////////

export const getActiveStars = (averageRating) => {
  const maxStars = 5;
  const activeStars = Math.round(averageRating);
  const stars = [];

  for (let i = 0; i < maxStars; i++) {
    if (i < activeStars) {
      stars.push(<span key={i} className="fa fa-star star-active mx-1"></span>);
    } else {
      stars.push(
        <span key={i} className="fa fa-star star-inactive mx-1"></span>
      );
    }
  }

  return stars;
};

//////////////////// ---- function to extract username from email ---- ////////////////////

export const extractUsername = (email) => {
  const atIndex = email.indexOf("@");
  if (atIndex !== -1) {
    const username = email.substring(0, atIndex);
    return username;
  }
  return null; // Return null if the email format is invalid
};

//////////////////// ---- function for formatting datetime to date (10 sep) ---- ////////////////////

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { day: "numeric", month: "short" };
  return date.toLocaleDateString("en-US", options);
};

//////////////////// ---- fetch mentor data by mentor id ---- ////////////////////

export const fetchMentorData = async (id, navigate) => {
  try {
    const mentorResponse = await axios.get(`${API_URL}/mentors/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return mentorResponse.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      navigate("/login"); // Redirect to the login page
    } else {
      console.error("Error fetching mentor data:", error);
    }
    throw error; // Re-throw the error to handle it in the component
  }
};

//////////////////// ---- Function to calculate the average rating ---- ////////////////////

export function calculateAverageRating(ratings) {
  const sum = ratings?.reduce((total, rating) => total + rating.stars, 0);
  const average = sum / ratings?.length;
  return average;
}

//////////////////// ---- sort mentors by likes and ratings ---- ////////////////////

export function getSortedMentors(mentors) {
  const sortedMentors = [...mentors].sort((a, b) => {
    const likesA = a.likes.length;
    const likesB = b.likes.length;

    const averageRatingA = calculateAverageRating(a.ratings);
    const averageRatingB = calculateAverageRating(b.ratings);

    // Sort by number of likes (descending order)
    if (likesA > likesB) {
      return -1;
    } else if (likesA < likesB) {
      return 1;
    }

    // If number of likes is the same, sort by average rating (descending order)
    if (averageRatingA > averageRatingB) {
      return -1;
    } else if (averageRatingA < averageRatingB) {
      return 1;
    }

    // If both criteria are equal, maintain the original order
    return 0;
  });
  return sortedMentors;
}

///// ----- Function to calculate percentage ----- /////

export const calculatePercentage = (count, totalCount) => {
  if (totalCount === 0) return 0;
  return (count / totalCount) * 100;
};

///// ----- Function to calculate Number of particular stars ----- /////

export const countObjectsWithStars = (stars, mentor) => {
  return (
    mentor && mentor.ratings.filter((rating) => rating.stars === stars).length
  );
};
