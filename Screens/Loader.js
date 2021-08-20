import React, { Component } from "react";
import { StyleSheet, View, Modal, ActivityIndicator, Text } from "react-native";

const Loader = (props) => {
  const { loading, textInfo,...attributes } = props;

  return (
    <Modal
      transparent={true}
      animationType={"none"}
      visible={loading}
      onRequestClose={() => {
        console.log("close modal");
      }}
    >
      <View style={styles.modalBackground}>
       
        <View style={styles.activityIndicatorWrapper}>
      
          <ActivityIndicator size="large" color="#1699e0" animating={loading} />
          <Text style={{padding:10}}>{textInfo}</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-around",
    backgroundColor: "#45b3e040",
  },
  activityIndicatorWrapper: {
    backgroundColor: "#FFFFFF",
    height: 100,
    minWidth: 100,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
});

export default Loader;
