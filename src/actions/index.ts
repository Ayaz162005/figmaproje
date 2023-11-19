export async function checkverify() {
  try {
    const res = await fetch("http://localhost:5000/v1/auth/check", {
      credentials: "include",
    });

    if (!res.ok) {
      // Check for HTTP error status
      throw new Error("Server returned an error");
    }

    const data = await res.json(); // Await for JSON parsing

    return data;
  } catch (error) {
    console.error("Error in checkverify:", error);
    throw new Error("Something went wrong during verification");
  }
}

export async function updateLike(data) {
  try {
    const res = await fetch("http://localhost:5000/v1/updatelike", {
      method: "POST",
      body: JSON.stringify(data),
      // credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const err = await res.json();
      console.log(err.error);
      return err.error;
    }

    const dat = await res.json();

    return dat;
  } catch (error) {
    console.log(error);
    throw new Error("Error");
  }
}
