export async function getAllNfts({ pageParam }) {
  try {
    console.log(pageParam, "pageParam");
    const res = await fetch(
      `http://localhost:5000/v1/nfts?${
        pageParam ? `page=${pageParam}&limit=10` : ""
      }`
    );
    if (!res.ok) {
      // Check for HTTP error status
      throw new Error("Server returned an error");
    }
    console.log("ok");
    const data = await res.json(); // Await for JSON parsing
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error in checkverify:", error);
    throw new Error("Something went wrong during verification");
  }
}

export async function getAllNftsClassic() {
  try {
    const res = await fetch(`http://localhost:5000/v1/nfts`);
    if (!res.ok) {
      // Check for HTTP error status
      throw new Error("Server returned an error");
    }
    console.log("ok");
    const data = await res.json(); // Await for JSON parsing
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error in checkverify:", error);
    throw new Error("Something went wrong during verification");
  }
}

export async function createNft(data: FormData) {
  try {
    // Log the data being sent
    // console.log(data);
    const response = await fetch(`http://localhost:5000/v1/nfts`, {
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
