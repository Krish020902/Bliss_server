import React, { useEffect, useState } from "react";
import { Text, Dimensions, StyleSheet, View } from "react-native";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import axios from "axios";

// const colors = ["tomato", "thistle", "skyblue", "teal"];

const Table = ({ company }) => {
  // let tempData = [];
  const [tableData, setTableData] = useState([]);
  const [finalTableData, setFinalTableData] = useState([]);

  useEffect(() => {
    console.log("table useEffect called");
    const resultUrl = `http://13.230.41.37:80/result/acc`;
    const movementUrl = `http://13.230.41.37:80/movement/acc`;
    // console.log(resultUrl);
    // setTableData([]);
    console.log("movement url");
    console.log(movementUrl);

    // getResultData(resultUrl)
    //   .then(() => {
    //     console.log("proccess done");
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    // fetch(resultUrl)
    //   .then((response) => response.json())
    //   .then((res) => {
    //     const genResultData = res.result.map((element) => {
    //       return {
    //         col1: element.date,
    //         col2: element.time,
    //         col3: element.movement,
    //         col4: element.changes,
    //         col5: element.iv_range,
    //       };
    //     });

    //     const resultHeaders = [
    //       "Result Date",
    //       "Time",
    //       "Movement",
    //       "Changes",
    //       "IV Range",
    //     ];

    //     const createdData = { data: genResultData, headers: resultHeaders };

    //     // setTableData([createdData]);
    //     tempData = [createdData];
    //   })
    //   .catch((error) => console.error(error));

    axios
      .get(resultUrl, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then(
        (res) => {
          console.log("res from result api");
          console.log(res.data);
          const genResultData = res.data.result.map((element) => {
            return {
              col1: element.date,
              col2: element.time,
              col3: element.movement,
              col4: element.changes,
              col5: element.iv_range,
            };
          });

          console.log(genResultData);
          const newResultData = { data: genResultData };
          // console.log("new result data");
          // console.log(newResultData);
          // setTimeout(() => {}, 1000);
          const resultHeaders = [
            "Result Date",
            "Time",
            "Movement",
            "Changes",
            "IV Range",
          ];

          const createdData = { data: genResultData, headers: resultHeaders };

          setTableData([createdData]);

          // console.log(tableData);
        },
        (err) => {
          console.log("result error");
          console.log(err);
        }
      );

    axios
      .get(movementUrl, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log("here in axios movement url");
        console.log(res.data.movement);
        const genMovementData = res.data.movement.map((element) => {
          return {
            col1: element.col_name,
            col2: element.high,
            col3: element.low,
            col4: element.diff,
            col5: element.daily_avg,
          };
        });

        const movementHeaders = [
          "FO Movement",
          "High",
          "Low",
          "Diff",
          "Daily % avg",
        ];
        const createdData = {
          data: genMovementData,
          headers: movementHeaders,
        };

        const tempFinal = [tableData, createdData];
        setFinalTableData(tempFinal);

        // console.log("here for created data : ");
        // console.log(createdData);

        // setTableData([...tableData, createdData]);
        // setFinalTableData([tableData, createdData]);

        // console.log("after updating final table data");
        // console.log(finalTableData);

        // const finaTableData = tableData.slice(0.2).map((item) => {
        //     return item;
        // })
        // }

        // console.log("after setting state");
        // console.log(tableData);
      })
      .catch((error) => {
        console.log("here in movement error");
        console.error(error);
      });
  }, [company]);

  useEffect(() => {
    // console.log("first table data");
    // console.log(tableData);
    console.log("final table data");
    console.log(tableData);
  }, [tableData]);

  // useEffect(() => {
  //   console.log("final table data");
  //   console.log(finalTableData);
  // }, [finalTableData]);

  const data = [
    [
      {
        movement: "Yesterday",
        high: "590",
        low: "593",
        diff: "14.2",
        daily: "2.7",
      },
      { movement: "Weekly", high: "595", low: "585", diff: "27.5", daily: "2" },
      {
        movement: "Monthly",
        high: "510",
        low: "500",
        diff: "66",
        daily: "3.1",
      },
      {
        movement: "Quaterly",
        high: "510",
        low: "500",
        diff: "66",
        daily: "3.1",
      },
      {
        movement: "Quaterly",
        high: "510",
        low: "500",
        diff: "66",
        daily: "3.1",
      },
    ],
    [
      {
        movement: "Yesterday",
        high: "590",
        low: "593",
        diff: "14.2",
        daily: "2.7",
      },
      { movement: "Weekly", high: "595", low: "585", diff: "27.5", daily: "2" },
      {
        movement: "Monthly",
        high: "510",
        low: "500",
        diff: "66",
        daily: "3.1",
      },
      {
        movement: "Quaterly",
        high: "510",
        low: "500",
        diff: "66",
        daily: "3.1",
      },
      {
        movement: "Quaterly",
        high: "510",
        low: "500",
        diff: "66",
        daily: "3.1",
      },
    ],
    [
      {
        movement: "Yesterday",
        high: "590",
        low: "593",
        diff: "14.2",
        daily: "2.7",
      },
      { movement: "Weekly", high: "595", low: "585", diff: "27.5", daily: "2" },
      {
        movement: "Monthly",
        high: "510",
        low: "500",
        diff: "66",
        daily: "3.1",
      },
      {
        movement: "Quaterly",
        high: "510",
        low: "500",
        diff: "66",
        daily: "3.1",
      },
      {
        movement: "Quaterly",
        high: "510",
        low: "500",
        diff: "66",
        daily: "3.1",
      },
    ],
  ];

  return (
    <View>
      {tableData.length !== 0 && (
        <SwiperFlatList
          // autoplay
          // autoplayDelay={2}
          // autoplayLoop
          index={0}
          showPagination
          paginationStyle={{
            position: "relative",
          }}
          //   // vertical={true}
          data={finalTableData}
          renderItem={({ item }) => (
            // <View style={[styles.child, { backgroundColor: item }]}>

            <View style={styles.container}>
              <View style={styles.headerRow}>
                {item.headers.map((header) => {
                  console.log("insider header");
                  console.log(item);
                  return <Text style={styles.header}>{header}</Text>;
                })}
                {/* <Text style={styles.header}>Result date</Text>
                <Text style={styles.header}>high</Text>
                <Text style={styles.header}>Low</Text>
                <Text style={styles.header}>Diff</Text>
                <Text style={styles.header}>Daily%avg</Text> */}
              </View>

              {/* {item.map((i, index) => {
        //         return (
        //           <View
        //             key={index}
        //             style={[
        //               styles.row,
        //               index % 2 === 0 ? styles.evenRow : styles.oddRow,
        //             ]}
        //           >
        //             <Text style={styles.cell}>{i.movement}</Text>
        //             <Text style={styles.cell}>{i.high}</Text>
        //             <Text style={styles.cell}>{i.low}</Text>
        //             <Text style={styles.cell}>{i.diff}</Text>
        //             <Text style={styles.cell}>{i.daily}</Text>
        //           </View>
        //         );
        //       })} */}
              {item.data.map((i, index) => {
                return (
                  <View
                    key={index}
                    style={[
                      styles.row,
                      index % 2 === 0 ? styles.evenRow : styles.oddRow,
                    ]}
                  >
                    <Text style={styles.cell}>{i.col1}</Text>
                    <Text style={styles.cell}>{i.col2}</Text>
                    <Text style={styles.cell}>{i.col3}</Text>
                    <Text style={styles.cell}>{i.col4}</Text>
                    <Text style={styles.cell}>{i.col5}</Text>
                  </View>
                );
              })}
            </View>
          )}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 10,
    // position: "absolute",
    marginTop: 200,
    backgroundColor: "#474545",
    width: 382,
    // marginLeft: 2,
    height: 258,
    // alignItems: "center",
    // justifyContent: "center",
  },
  headerRow: {
    // padding: 10,
    flexDirection: "row",
    borderWidth: 0.4,
    borderColor: "black",
  },
  header: {
    padding: 10,
    borderWidth: 0.2,
    borderColor: "black",

    // margin: 0.5,
    backgroundColor: "rgb(132, 194, 37)",
    flex: 1,
    fontWeight: "bold",
    textAlign: "center",
  },
  row: {
    borderWidth: 0.2,
    borderColor: "#ccc",
    flexDirection: "row",
    borderBottomWidth: 1,
    // borderBottomColor: "#ccc",
    padding: 4,
  },
  evenRow: {
    backgroundColor: "#474545",
  },
  oddRow: {
    backgroundColor: "#8c8787",
  },
  cell: {
    // borderLeftWidth: 1,
    // padding: 1,

    // borderColor: "black",
    // marginLeft: 3,
    color: "white",
    flex: 1,
    textAlign: "center",
  },
});

// const { width } = Dimensions.get("window");
// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "white" },
//   child: { width, justifyContent: "center" },
//   text: { fontSize: width * 0.5, textAlign: "center" },
// });

export default Table;
