export async function getAllCreator(page = "") {
  try {
    const res = await fetch(
      `http://localhost:5000/v1/creators?${page ? `page=${page}&limit=10` : ""}`
    );

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

export async function getOneCreator(id: string) {
  try {
    const res = await fetch(`http://localhost:5000/v1/creators/${id}`);

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

export async function createCreator(data: FormData) {
  try {
    // Log the data being sent
    // console.log(data);
    const response = await fetch(`http://localhost:5000/v1/creators`, {
      method: "POST",
      body: data,
    });

    if (!response.ok) {
      const err = await response.json();

      return err.error;
    }

    const responseData = await response.json();

    return responseData; // Return the parsed response data
  } catch (error) {
    console.error("Error in createCreator:", error);
    throw new Error("Something went wrong during creator creation");
  }
}
export async function getCreatorWithUserid(userId: string) {
  try {
    console.log(userId);
    const response = await fetch(`http://localhost:5000/v1/creators/userId`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ userId }), // Pass the userId directly in the body
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error); // Throw an error if response is not OK
    }

    const responseData = await response.json();
    return responseData; // Return the parsed response data
  } catch (error) {
    console.error("Error in getCreatorWithUserid:", error);
    throw new Error("Something went wrong while fetching creator data");
  }
}
