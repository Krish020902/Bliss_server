import axios from "axios";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "react-native-vector-icons/AntDesign";
import DropDownPicker from "react-native-dropdown-picker";
import RNPickerSelect from "react-native-picker-select";
import Table from "./components/Table";
import { Intraday } from "./components/Intraday";
import Navbar from "./components/Navbar";

// const data = [
//   { label: "PHARMA", value: "1" },
//   { label: "FINANCE", value: "2" },
//   { label: "FMCG", value: "3" },
//   { label: "CEMENT", value: "4" },
//   { label: "OIL&GAS ", value: "5" },
//   { label: "AUTO", value: "6" },
//   { label: "SHIPPING", value: "7" },
//   { label: "PHARMA", value: "8" },
// ];

const DropdownIntraday = () => {
  const [value, setValue] = useState("1");
  const [value1, setValue1] = useState("1");
  const [isFocus, setIsFocus] = useState(false);
  const [isFocus1, setIsFocus1] = useState(false);
  const [equity, setEquity] = useState(null);
  const [type, setType] = useState([
    { name: "intraDay", value: "1" },
    { name: "Daily", value: "2" },
  ]);

  useEffect(() => {
    console.log("value1 is " + value1);
    console.log("drop down use Effect called");
    // console.log("value of type is : " + type[value1 - 1].name);
    axios
      .get("http://13.230.41.37:80/getCompanies", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then(
        (res) => {
          console.log(res.data.data);
          const finalEquity = [];
          const tempData = res.data.data.map((item, i) => {
            const oneItem = { Label: item.c_name, value: "" + (i + 1) };
            finalEquity.push(oneItem);
          });

          console.log(finalEquity);
          setEquity(finalEquity);
          setType([
            { name: "intraDay", value: "1" },
            { name: "Daily", value: "2" },
          ]);
        },
        (err) => {
          console.log(err);
          console.log("here in error ");
          if (err.response) {
            console.log("response");
            console.log(err.response);
          } else if (err.request) {
            console.log("request");
            console.log(err.request);
          } else {
            console.log("something else");
          }
        }
      );

    // using fetch

    // fetch("http://13.230.41.37:80/getCompanies")
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data);
    //   })
    //   .catch((error) => {
    //     console.log("here in error");
    //     console.error(error.message);
    //   });
  }, [isFocus, isFocus1, value1]);

  const renderLabel1 = () => {
    if (value1 || isFocus1) {
      return (
        <Text style={[styles.label, isFocus1 && { color: "rgb(132,194,37)" }]}>
          company
        </Text>
      );
    }
    return null;
  };
  return (
    <View>
      {/* <View style={{ marginTop: -100 }}>
        <Image
          // height="3"
          // width="4"
          // size="3"
          style={{ height: 90 }}
          source={require("./Image/BlissQuantsTM.jpg")}
        ></Image>
      </View>  */}
      {/* <View> */}
      <Navbar />
      {/* </View> */}
      <View>
        {!!equity && !!type && (
          <View style={styles.container}>
            <Dropdown
              iconColor="white"
              style={[styles.dropdown, { borderColor: "rgb(132,194,37)" }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={equity}
              // containerStyle={{ backgroundColor: "#706d6d" }}
              search
              maxHeight={300}
              labelField="Label"
              valueField="value"
              placeholder={!isFocus ? "Select item" : "..."}
              searchPlaceholder="Search..."
              value={value}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={(item) => {
                setValue(item.value);
                setIsFocus(false);
              }}
              renderLeftIcon={() => (
                <AntDesign
                  style={styles.icon}
                  color={isFocus ? "rgb(132,194,37)" : "white"}
                  name="Safety"
                  size={20}
                />
              )}
            />

            {renderLabel1()}
            <Dropdown
              iconColor="white"
              style={[styles.dropdown, { borderColor: "rgb(132,194,37)" }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={type}
              // containerStyle={{ backgroundColor: "#706d6d" }}
              search
              maxHeight={300}
              labelField="name"
              valueField="value"
              placeholder={!isFocus1 ? "Select item" : "..."}
              searchPlaceholder="Search..."
              value={value1}
              onFocus={() => setIsFocus1(true)}
              onBlur={() => setIsFocus1(false)}
              onChange={(item) => {
                setValue1(item.value);
                setIsFocus1(false);
              }}
              renderLeftIcon={() => (
                <AntDesign
                  style={styles.icon}
                  color={isFocus1 ? "rgb(132,194,37)" : "white"}
                  name="Safety"
                  size={20}
                />
              )}
            />
          </View>
        )}
        {!!value && !!value1 && !!equity && (
          <Intraday
            company={equity[value - 1].Label.toLowerCase()}
            which={
              type[value1 - 1].name === "intraDay"
                ? "get_intraday_iv"
                : "get_daily_iv"
            }
            isFocus1={isFocus1}
          />
        )}
      </View>
      <View style={{ marginTop: 50 }}>
        {!!value && !!value1 && !!equity && (
          <Table company={equity[value - 1].Label.toLowerCase()} />
        )}
      </View>
    </View>
  );
};

export default DropdownIntraday;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flexDirection: "row",
    backgroundColor: "#3a3332",
    padding: 16,
  },
  dropdown: {
    flex: 1,
    borderColor: "white",
    height: 50,
    // borderColor: "#474545",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",

    color: "white",
    left: 22,
    top: 5,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    color: "white",
    fontSize: 16,
  },
  selectedTextStyle: {
    color: "white",
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
