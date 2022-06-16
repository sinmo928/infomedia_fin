document.addEventListener("DOMContentLoaded", function () {
  $.ajax({
    url: "UCS-Satellite-Database-1-1-2022_test.csv",
    dataType: "text",
  }).done(successFunction);

  var com_table = [];
  var earth_table = [];
  var nav_table = [];
  var tech_table = [];
  var space_table = [];
  var total_table = [];

  var communicate = [
    "Communications",
    "Communications/Technology Development",
    "Communications/Maritime Tracking",
    "Communications/Navigation",
  ];
  var earth = [
    "Earth Observation",
    "Earth Observation/Technology Development",
    "Earth Observation/Communications",
    "Earth/Space Observation",
    "Earth Observation/Earth Science",
    "Earth Observation/Space Science",
    "Surveillance",
    "Educational",
    "Earth Science",
    "Earth Science/Earth Observation",
    "Earth Observation/Communications/Space Science",
    "Unknown",
  ];
  var nav = [
    "Navigation/Regional Positioning",
    "Navigation/Global Positioning",
    "Platform",
    "Satellite Positioning",
  ];

  var tech = [
    "Technology Development",
    "Technology Demonstration",
    "Technology Development/Educational",
    "Mission Extension Technology",
    "Signals Intelligence",
  ];

  var space = [
    "Space Science",
    "Space Science/Technology Demonstration",
    "Space Science/Technology Development",
    "Space Observation",
  ];

  function successFunction(data) {
    var allRows = data.split(/\r?\n|\r/);
    for (i = 1; i < allRows.length - 1; i += 1) {
      var rowCells = allRows[i].split(",");
      var dictline = {
        name: rowCells[0],
        country: rowCells[1],
        user: rowCells[2],
        purpose: rowCells[3],
        y: parseInt(rowCells[4]),
        x: new Date(rowCells[5]),
        date: rowCells[5],
      };

      total_table.push(dictline);
      if (communicate.includes(rowCells[3])) {
        com_table.push(dictline);
      } else if (earth.includes(rowCells[3])) {
        earth_table.push(dictline);
      } else if (nav.includes(rowCells[3])) {
        nav_table.push(dictline);
      } else if (tech.includes(rowCells[3])) {
        tech_table.push(dictline);
      } else if (space.includes(rowCells[3])) {
        space_table.push(dictline);
      }
    }

    console.log(com_table);
    console.log(earth_table);
    console.log(nav_table);
    console.log(tech_table);
    console.log(space_table);
    console.log(total_table);

    // 연도별 수량 테이블
    var temp = total_table.reduce(
      (acc, it) => ({
        ...acc,
        [it.x.getFullYear()]: (acc[it.x.getFullYear()] || 0) + 1,
      }),
      {}
    );
    var count_table = Object.entries(temp);
    for (let index = 0; index < count_table.length; index++) {
      count_table[index][0] = parseInt(count_table[index][0]);
    }

    console.log(count_table);

    //목적별 수량 테이블
    var purpose_table = [
      { name: "Communicate", value: com_table.length, colorValue: 1 },
      { name: "Earth observation", value: earth_table.length, colorValue: 2 },
      { name: "Navigation", value: nav_table.length, colorValue: 3 },
      { name: "Technology", value: tech_table.length, colorValue: 4 },
      { name: "Space Science", value: space_table.length, colorValue: 5 },
    ];

    console.log(purpose_table);
    //최상단 메인 차트
    Highcharts.chart("container", {
      chart: {
        polar: true,
        height: 785,
        backgroundColor: "transparent",
      },

      boost: {
        useGPUTranslations: true,
        usePreAllocated: true,
      },

      title: {
        text: "SATELLITE ORBITING EARTH",
        style: {
          color: "#82B1ED",
          fontFamily: "Noto Sans KR",
          fontSize: "30px",
          fontWeight: 700,
        },
      },

      subtitle: {
        text: "Updated Jan 1, 2022",
        style: {
          color: "lightgray",
          fontFamily: "Libre Franklin",
          fontWeight: 600,
        },
      },

      pane: {
        startAngle: -90,
        endAngle: 90,
        size: 1200,
        center: ["50%", "100%"],
        background: null,
      },

      xAxis: {
        min: new Date("1988-1-1").getTime(),
        tickInterval: 12 * 30 * 24 * 60 * 60 * 1000,
        gridLineWidth: 2,
        gridLineColor: "rgba(125,125,125,0.5)",
        gridLineDashStyle: "longdash",
        labels: {
          format: "{value:%Y}",
          style: {
            color: "#FFFFFF",
            fontFamily: "Libre Franklin",
          },
        },
      },

      yAxis: {
        startOnTick: false,
        max: 300000,
        type: "logarithmic",
        minorTickInterval: 1000,
        accessibility: {
          rangeDescription: "Range: 0.1 to 50000",
        },
        gridLineColor: "rgba(125,125,125,1)",
        gridLineWidth: 0.2,
        labels: {
          format: "{value}km",
          style: {
            color: "#FFFFFF",
            fontFamily: "Libre Franklin",
          },
        },
      },

      legend: {
        itemStyle: {
          color: "#FFFFFF",
          fontSize: "14px",
        },
        itemHoverStyle: {
          color: "#AAAAAA",
        },
      },

      series: [
        {
          type: "scatter",
          name: "Communicate",
          color: "#F23D4C",
          opacity: 0.9,
          data: com_table,
          turboThreshold: 0,

          marker: {
            radius: 4,
          },
          tooltip: {
            followPointer: false,
            pointFormat:
              "Name: {point.name}<br/>Country: {point.country}<br/>User: {point.user}<br/>Purpose: {point.purpose}<br/>Distance: {point.y}km<br/>Date: {point.date}",
          },
        },
        {
          type: "scatter",
          name: "Earth observation / science",
          color: "#553DF2",
          opacity: 0.9,
          data: earth_table,
          turboThreshold: 0,

          marker: {
            radius: 4,
          },
          tooltip: {
            followPointer: false,
            pointFormat:
              "Name: {point.name}<br/>Country: {point.country}<br/>User: {point.user}<br/>Purpose: {point.purpose}<br/>Distance: {point.y}km<br/>Date: {point.date}",
          },
        },
        {
          type: "scatter",
          name: "Navigation",
          color: "#16B4F2",
          opacity: 0.9,
          data: nav_table,
          turboThreshold: 0,

          marker: {
            radius: 4,
          },
          tooltip: {
            followPointer: false,
            pointFormat:
              "Name: {point.name}<br/>Country: {point.country}<br/>User: {point.user}<br/>Purpose: {point.purpose}<br/>Distance: {point.y}km<br/>Date: {point.date}",
          },
        },
        {
          type: "scatter",
          name: "Technology",
          color: "#24BF4B",
          opacity: 0.9,
          data: tech_table,
          turboThreshold: 0,

          marker: {
            radius: 4,
          },
          tooltip: {
            followPointer: false,
            pointFormat:
              "Name: {point.name}<br/>Country: {point.country}<br/>User: {point.user}<br/>Purpose: {point.purpose}<br/>Distance: {point.y}km<br/>Date: {point.date}",
          },
        },
        {
          type: "scatter",
          name: "Space Observation / Science",
          color: "#F2CB05",
          opacity: 0.9,
          data: space_table,
          turboThreshold: 0,

          marker: {
            radius: 4,
          },
          tooltip: {
            followPointer: false,
            pointFormat:
              "Name: {point.name}<br/>Country: {point.country}<br/>User: {point.user}<br/>Purpose: {point.purpose}<br/>Distance: {point.y}km<br/>Date: {point.date}",
          },
        },
      ],
    });

    // 수량차트
    Highcharts.chart("container2", {
      chart: {
        backgroundColor: "#101316",
        height: 400,
        width: 700,
      },

      title: {
        text: "Number of launches per year",
        margin: 50,
        style: {
          color: "#82B1ED",
          fontFamily: "Libre Franklin",
          fontSize: "22px",
        },
      },

      xAxis: {
        type: "date",
        labels: {
          style: {
            color: "#FFFFFF",
            fontFamily: "Libre Franklin",
          },
        },
      },

      yAxis: {
        type: "logarithmic",
        title: {
          text: "",
        },
        gridLineWidth: 2,
        gridLineColor: "rgba(125,125,125,0.1)",
        labels: {
          style: {
            color: "#FFFFFF",
            fontFamily: "Libre Franklin",
          },
        },
      },

      tooltip: {
        headerFormat: "<b>{series.name}</b><br />",
        pointFormat: "<br />{point.x}<br /> {point.y} satellites",
      },

      legend: {
        enabled: false,
      },

      plotOptions: {
        area: {
          fillColor: {
            linearGradient: {
              x1: 0,
              y1: 0,
              x2: 0,
              y2: 1,
            },
            stops: [
              [0, Highcharts.getOptions().colors[0]],
              [
                1,
                Highcharts.color(Highcharts.getOptions().colors[0])
                  .setOpacity(0)
                  .get("rgba"),
              ],
            ],
          },
          marker: {
            radius: 0,
          },
          lineWidth: 0,
          states: {
            hover: {
              lineWidth: 3,
            },
          },
          threshold: null,
        },
      },

      series: [
        {
          name: "Number of launches",
          color: "#82b1ed",
          opacity: 0.9,
          type: "area",
          data: count_table,
        },
      ],
    });

    //넓이차트
    Highcharts.chart("container3", {
      chart: {
        backgroundColor: "#101316",
        height: 400,
        width: 700,
      },

      colorAxis: {
        minColor: "#636B73",
        maxColor: "#82B1ED",
      },

      plotOptions: {
        series: {
          dataLabels: {
            enabled: true,
            color: "#ffffff",
          },
          states: {
            hover: {
              borderColor: "#FFFFFF",
            },
          },
        },
      },

      series: [
        {
          type: "treemap",
          borderWidth: 2,
          borderColor: "#101316",
          layoutAlgorithm: "squarified",
          data: purpose_table,
        },
      ],

      title: {
        text: "Distribution of satellites by purpose",
        margin: 50,
        style: {
          color: "#82B1ED",
          fontFamily: "Libre Franklin",
          fontSize: "22px",
        },
      },
    });
  }
});
