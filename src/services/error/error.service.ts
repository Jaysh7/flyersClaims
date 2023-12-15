export const errorService = (error: any) => {
  const message = JSON.stringify(error);
  switch (true) {
    case message?.includes("invalid-credential"):
      return "Invalid user name/password";
    case message?.includes("already-in-use)"):
      return "Email account already exist";

    default:
      return "Something went wrong! please try again later";
  }
};
