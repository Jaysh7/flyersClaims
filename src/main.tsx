import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import App from "./App.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ConfigProvider
        theme={{
          components: {
            Tabs: {
              itemSelectedColor: "rgb(114, 46, 209)",
              itemHoverColor: "rgb(114, 46, 209)",
              itemColor: "text-purple-700",
              inkBarColor: "rgb(114, 46, 209)",
              titleFontSize: 20,
            },
            Upload: {
              colorFillAlter: "#EEE",
            },
            Table: {
              headerBg: "#7700C7",
              headerColor: "#fff",
            },
            Input: {
              colorBgContainer: "#FFF",
            },
            Select: {
              colorBgContainer: "#FFF",
            },
            DatePicker: {
              colorBgContainer: "#FFF",
            },
          },
          token: {
            colorPrimary: "#921acb",
            colorInfo: "#921acb",
          },
        }}
      >
        <App />
      </ConfigProvider>
    </BrowserRouter>
  </React.StrictMode>
);
