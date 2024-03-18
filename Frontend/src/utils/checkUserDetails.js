export const checkUserDetails = (users) => {
  if (users.user_type === "admin") {
    return (window.location.href = "/admin");
  } else if (users.user_type === "doctor") {
    return (window.location.href = "/patients");
  } else {
    return (window.location.href = "/patient/doctors");
  }
};
