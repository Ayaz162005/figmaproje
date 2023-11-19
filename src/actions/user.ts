import { User } from "../types/User";

export const signup = async (data: User) => {
  try {
    const res = await fetch("http://localhost:5000/v1/auth/signup", {
      method: "POST",
      body: JSON.stringify(data),
      // credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const err = await res.json();
      console.log(err);
      return err.error;
    }

    const dat = await res.json();
    localStorage.setItem("token", dat.token);
    localStorage.setItem("email", dat.data.user.email);
    localStorage.setItem("id", dat.data.user._id);

    return dat;
  } catch (error) {
    console.log(error);
  }
};
export const login = async (data: User) => {
  try {
    const res = await fetch("http://localhost:5000/v1/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
      // credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const err = await res.json();
      return err.error;
    }

    const dat = await res.json();
    localStorage.setItem("token", dat.token);
    localStorage.setItem("email", dat.data.user.email);
    localStorage.setItem("id", dat.data.user._id);

    return dat;
  } catch (error) {
    console.log(error);
  }
};

export const getUser = async (email: string) => {
  try {
    const res = await fetch("http://localhost:5000/v1/auth/me", {
      method: "POST",
      body: JSON.stringify({ email }), // Assuming the API expects an object with an email property
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("An error occurred while getting user");
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    // Handle the error or return a default value
    return null;
  }
};

export const updateUser = async (dat: { email: string }) => {
  try {
    const res = await fetch("http://localhost:5000/v1/user/update", {
      method: "POST",
      body: JSON.stringify(dat), // Assuming the API expects an object with an email property
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const error = await res.json();
      return error.error;
    }

    const data = await res.json();
    localStorage.setItem("token", data.token);
    localStorage.setItem("email", data.data.user.email);
    localStorage.setItem("id", data.data.user._id);
    return data;
  } catch (err) {
    console.log(err, "error");
    // Handle the error or return a default value
    return err;
  }
};

export const resetpassword = async (data: {
  data: { data: string };
  id: string;
}) => {
  console.log(data);
  try {
    const res = await fetch(
      `http://localhost:5000/v1/user/resetPassword/${data.id}`,
      {
        method: "POST",
        body: JSON.stringify(data.data),
        // credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      const err = await res.json();

      return err.error;
    }

    const dat = await res.json();
    localStorage.setItem("token", dat.token);
    localStorage.setItem("email", dat.data.user.email);
    localStorage.setItem("id", dat.data.user._id);

    return dat;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const forgotpassword = async (data: { email: string }) => {
  console.log(data);
  try {
    const res = await fetch(`http://localhost:5000/v1/user/forgotpassword`, {
      method: "POST",
      body: JSON.stringify(data),
      // credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(res);
    if (!res.ok) {
      console.log("uyiyituyi");
      const err = await res.json();

      return err.error;
    }

    const dat = await res.json();

    return dat;
  } catch (error) {
    console.log(error);
    return error;
  }
};
