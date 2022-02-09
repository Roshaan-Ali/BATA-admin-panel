import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";

class Columnchart extends Component {
  constructor(props) {
    super(props);
    const chartData = props.chartData;

    this.state = {
      series: chartData || [],
      //   series: [
      //     {
      //       name: "Earnings",
      //       data: chartData[2]?.monthlySales || [],
      //       //   data: [11, 8, 15, 18, 19, 17, 22, 12, 18, 9, 15, 24],
      //     },
      //     {
      //       name: "New Users",
      //       // data: [8, 7, 11, 11, 4, 8, 10, 14, 12, 15, 11, 18],
      //       data: chartData[0]?.monthlyNewUsers || [],
      //     },
      //     {
      //       name: "Completed Bookings",
      //       data: chartData[1]?.monthlyBookingComplete || [],
      //       //   data: [8, 9, 8, 10, 12, 14, 29, 15, 8, 19, 11, 17],
      //     },
      //   ],
      options: {
        chart: {
          type: "bar",
          height: 400,
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          show: true,
          width: 16,
          bottom: 20,
          top: 0,
          colors: ["purple", "#2d96ff", "#2dd8ff"],
        },
        xaxis: {
          axisBorder: { show: false },
          categories: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "July",
            "Aug",
            "Sept",
            "Oct",
            "Nov",
            "Dec",
          ],
        },
        yaxis: {
          title: {
            // text: "$ (thousands)",
          },
        },
        fill: {
          opacity: 1,
        },
        tooltip: {
          y: {
            formatter: function (val) {
              //   return "$ " + val + " thousands";
              return val;
            },
          },
        },
      },
    };
  }
  render() {
    return (
      <ReactApexChart
        options={this?.state?.options}
        series={this?.state?.series}
        type="bar"
        height={400}
        width={1300}
      />
    );
  }
}

export default Columnchart;
