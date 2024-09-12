import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/index.jsx";
import App from "./App.jsx";
import AOS from "aos";
import "aos/dist/aos.css"; // Impor stylesheet AOS
import "./App.css";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Initialize AOS after app has mounted
AOS.init({
  duration: 1200, // Durasi animasi dalam milidetik
  once: true, // Animasi hanya dijalankan sekali setelah scroll
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
