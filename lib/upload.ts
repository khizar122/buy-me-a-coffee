export async function uploadImage(file: File) {
  // Create FormData
  const formData = new FormData();
  formData.append('file', file);

  // Upload to your storage service (e.g., S3, Cloudinary, etc.)
  const response = await fetch('/api/upload', {
    method: 'POST',
    body: formData
  });

  if (!response.ok) {
    throw new Error('Failed to upload image');
  }

  const data = await response.json();
  return data; // Should return { url: string }
}
