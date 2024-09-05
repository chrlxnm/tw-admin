export function parseJwt(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}
export async function fetchFileAsBlob(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    const blob = await response.blob();
    const fileName = url.split('/').pop() || 'downloaded-file'; // Use last part of URL or default name
    const fileType = blob.type || 'application/octet-stream'; // Ensure a default type if none is provided

    // Create a File object from the Blob
    const file = new File([blob], fileName, {
      type: fileType,
      lastModified: Date.now(),
    });

    // Convert the Blob to a base64 string for thumbUrl
    const base64ThumbUrl = await blobToBase64(blob);

    // Return the file with the desired structure
    return {
      lastModified: file.lastModified,
      lastModifiedDate: new Date(file.lastModified),
      name: file.name,
      originFileObj: file,
      percent: 0, // Initialize as 0, this can be updated during file upload
      size: file.size,
      thumbUrl: base64ThumbUrl, // Set the base64 string as the thumbUrl
      type: file.type,
      uid: `rc-upload-${Date.now()}`, // Generate a unique UID
    };
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    throw error; // Re-throw the error to be handled by the caller if needed
  }
}

// Helper function to convert Blob to base64
function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob); // Convert blob to base64
  });
}
