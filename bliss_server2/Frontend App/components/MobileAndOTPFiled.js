import React, { useState } from "react";
import { StyleSheet, View, TextInput, Button, Text } from "react-native";

const MobileAndOTPField = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOTP] = useState("");
  const [showOTPInput, setShowOTPInput] = useState(false);

  const handleSendOTP = () => {
    // TODO: Implement OTP sending logic
    setShowOTPInput(true);
  };

  const handleVerifyOTP = () => {
    // TODO: Implement OTP verification logic
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter Mobile Number:</Text>
      <TextInput
        style={styles.input}
        placeholder="Mobile Number"
        keyboardType="numeric"
        value={mobileNumber}
        onChangeText={setMobileNumber}
      />
      {showOTPInput && (
        <>
          <Text style={styles.label}>Enter OTP:</Text>
          <TextInput
            style={styles.input}
            placeholder="OTP"
            keyboardType="numeric"
            value={otp}
            onChangeText={setOTP}
          />
          <Button title="Verify OTP" onPress={handleVerifyOTP} />
        </>
      )}
      {!showOTPInput && <Button title="Send OTP" onPress={handleSendOTP} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
  },
});

export default MobileAndOTPField;
