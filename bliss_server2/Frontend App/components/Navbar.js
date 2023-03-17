import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Touchable,
  TouchableOpacity,
} from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import MobileAndOTPFiled from "./MobileAndOTPFiled";
const Navbar = () => {
  //   const navigation = useNavigation();
  //   const OTPPAGE = () => {
  //     navigation.navigate(MobileAndOTPFiled);
  //   };
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../Image/BlissQuantsTM.jpg")}
          style={styles.logo}
        />
      </View>
      <View style={styles.adminContainer}>
        {/* <TouchableOpacity onPress={OTPPAGE}> */}
        <Image
          source={require("../Image/admin.png")}
          style={styles.adminLogo}
        />
        {/* </TouchableOpacity> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: -90,
    flexDirection: "row",
    // alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#3a3332",
    height: 50,
    paddingHorizontal: 10,
    // borderBottomWidth: 1,
    // borderBottomColor: "#474545",
  },
  logoContainer: {
    flex: 1,
    alignItems: "flex-start",
    // height: 20,
    // width: 20,
  },
  logo: {
    height: 50,
    width: 190,
  },
  adminContainer: {
    flex: 1,
    alignItems: "flex-end",
  },
  adminLogo: {
    marginRight: 20,
    marginTop: 12,
    height: 35,
    width: 35,
  },
});

export default Navbar;
