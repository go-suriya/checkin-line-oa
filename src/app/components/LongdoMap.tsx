"use client";

import { notification } from "antd";
import { useEffect } from "react";

export default function LongdoMap() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://api.longdo.com/map/?key=dce44b2872efb9fd6ef8afdc9371d7c7";
    script.async = true;
    script.onload = () => {
      const map = new window.longdo.Map({
        placeholder: document.getElementById("map"),
        zoom: 16,
        lastView: false,
        language: "th",
      });

      const handleGeolocationSuccess = (position: GeolocationPosition) => {
        const { longitude, latitude } = position.coords;

        const marker = new window.longdo.Marker({
          lon: longitude,
          lat: latitude,
        });

        map.location({ lon: longitude, lat: latitude }, true);
        map.Overlays.add(marker);
        map.Overlays.bounce(marker);
      };

      const handleGeolocationError = (err: GeolocationPositionError) => {
        notification.error({
          message: err?.message ?? "Geolocation Error",
          description: "Geolocation is not supported by this browser.",
          placement: "top",
        });
      };

      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          handleGeolocationSuccess,
          handleGeolocationError
        );
      }

      map.Ui.DPad.visible(false);
      map.Ui.Zoombar.visible(false);
      map.Ui.Geolocation.visible(false);
      map.Ui.Toolbar.visible(false);
      map.Ui.LayerSelector.visible(false);
      map.Ui.Fullscreen.visible(false);
      map.Ui.Crosshair.visible(true);
      map.Ui.Scale.visible(false);
      map.Ui.Mouse.enable(false);
      map.Ui.Keyboard.enable(false);
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div
      id="map"
      style={{ border: "thick double", height: "200px", marginBottom: "10px" }}
    />
  );
}
