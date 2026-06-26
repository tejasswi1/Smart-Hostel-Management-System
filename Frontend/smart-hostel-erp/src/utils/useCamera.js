// export const requestCameraPermission = async () => {
//   if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
//     throw new Error("Camera not supported");
//   }

//   try {
//     const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//     stream.getTracks().forEach(track => track.stop());
//     return true;
//   } catch (err) {
//     console.error("Camera permission denied", err);
//     return false;
//   }
// };
