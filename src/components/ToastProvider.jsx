import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <Toaster
    position="top-Start"
    reverseOrder={false}
    gutter={8}
    toastOptions={{
      duration: 5000,
      style: {
        background: "#363636",
        color: "#fff",
      },
      success: {
        duration: 3000,
        iconTheme: {
          primary: "green",
          secondary: "black",
        },
      },
    }}
  />

  );
}
