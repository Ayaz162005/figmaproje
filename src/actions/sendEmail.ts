export async function sendEmail(email: string) {
  try {
    const response = await fetch("http://localhost:5000/v1/sendemail", {
      method: "POST",
      body: JSON.stringify({ email }), // Ensure the email is in an object format
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      console.log("Email sent successfully");
      // Handle success - Maybe update UI or perform further actions
    } else {
      console.log("Failed to send email");
      // Handle failure - Maybe show an error message
    }
  } catch (error) {
    console.error("Error sending email:", error);
    // Handle errors - Log or show an error message
  }
}
