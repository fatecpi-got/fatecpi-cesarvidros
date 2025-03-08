import React from "react";

export const BannerComponent = ({ title }: { title: string }) => {
  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100px", // Adjust height as needed
      backgroundColor: "#0D47A1", // Dark blue background
      borderRadius: "8px", // Rounded corners for aesthetics
      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)", // Subtle shadow for depth
      margin: '10px'
    },
    title: {
      fontSize: "24px", // Adjust font size as needed
      fontWeight: "bold",
      color: "#BBDEFB", // Light blue text for contrast
      textAlign: "center" as "center",
      margin: 0,
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>{title}</h1>
    </div>
  );
};