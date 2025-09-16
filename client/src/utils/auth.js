// Save auth data (token + user) in localStorage
export const loginUser = (data) => {
  localStorage.setItem("auth", JSON.stringify(data));
};

// Get auth data
export const getAuth = () => {
  return JSON.parse(localStorage.getItem("auth"));
};

// Logout
export const logoutUser = () => {
  localStorage.removeItem("auth");
};
