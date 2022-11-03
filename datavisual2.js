var salesData;
    var truncLengh = 30;

    $(document).ready(function () {
        Plot();
    });

    function Plot() {
        TransformChartData(chartData, chartOptions);
        BuildPie("chart", chartData, chartOptions);
    }

    function BuildPie(id, chartData, options) {
        var xVarName;
        var divisionRatio = 2.5;
        var legendoffset = 0;

        chart = d3.select("#" + id + " .innerCont");

        var yVarName = options[0].yaxis;
        width = $(chart[0]).outerWidth(),
        height = $(chart[0]).outerHeight(),
        radius = Math.min(width, height) / divisionRatio;

        xVarName = options[0].xaxis;


        var rcolor = d3.scale.ordinal().range(runningColors);

        arc = d3.svg.arc()
                .outerRadius(radius)
                .innerRadius(radius - 200);

                var arcOver = d3.svg.arc().outerRadius(radius + 20).innerRadius(radius - 180);

        chart = chart
                .append("svg")  //append svg element inside #chart
                .attr("width", width)    //set width
                .attr("height", height)  //set height
                .append("g")
                .attr("transform", "translate(" + (width / divisionRatio) + "," + ((height / divisionRatio) + 30) + ")");

        var pie = d3.layout.pie()
                    .sort(null)
                    .value(function (d) {
                        return d.Total;
                    });

        var g = chart.selectAll(".arc")
                    .data(pie(runningData))
                    .enter().append("g")
                    .attr("class", "arc");

        var count = 0;

        var path = g.append("path")
                    .attr("d", arc)
                    .attr("id", function (d) { return "arc-" + (count++); })
                    .style("opacity", function (d) {
                        return d.data["op"];
                    });
                    

        path.append("svg:title")
        .text(function (d) {
            return d.data["title"] + " (" + d.data[yVarName] + ")";
        });

        path.style("fill", function (d) {
            return rcolor(d.data[xVarName]);
        })

        g.append("text")
         .attr("transform", function (d) { return "translate(" + arc.centroid(d) + ")"; })
         .attr("dy", ".35em")
         .style("text-anchor", "middle")
         .style("opacity", 1)
         .text(function (d) {
             return d.data[yVarName];
         });


        count = 0;
        var legend = chart.selectAll(".legend")
            .data(runningData).enter()
            .append("g").attr("class", "legend")
            .attr("legend-id", function (d) {
                return count++;
            })
            .attr("transform", function (d, i) {
                return "translate(15," + (parseInt("-" + (runningData.length * 10)) + i * 28 + legendoffset) + ")";
            })
            .style("cursor", "pointer")
            

        var leg = legend.append("rect");

        leg.attr("x", width / 2)
            .attr("width", 18).attr("height", 18)
            .style("fill", function (d) {
                return rcolor(d[yVarName]);
            })
        legend.append("text").attr("x", (width / 2) - 5)
            .attr("y", 9).attr("dy", ".35em")
            .style("text-anchor", "end").text(function (d) {
                return d.caption;
            });

        leg.append("svg:title")
        .text(function (d) {
            return d["title"] + " (" + d[yVarName] + ")";
        });

    }

    function TransformChartData(chartData, opts) {
        var result = [];
        var resultColors = [];
        var counter = 0;
        var hasMatch;
        var xVarName;
        var yVarName = opts[0].yaxis;

        xVarName = opts[0].xaxis;

        for (var i in chartData) {
            hasMatch = false;
            for (var index = 0; index < result.length; ++index) {
                var data = result[index];

                if (data[xVarName] == chartData[i][xVarName]) {
                    result[index][yVarName] = result[index][yVarName] + chartData[i][yVarName];
                    hasMatch = true;
                    break;
                }
            }
            if (hasMatch == false) {
                ditem = {};
                ditem[xVarName] = chartData[i][xVarName];
                ditem[yVarName] = chartData[i][yVarName];
                ditem["caption"] = opts[0].captions != undefined ? opts[0].captions[0][chartData[i][xVarName]] : "";
                ditem["title"] = opts[0].captions != undefined ? opts[0].captions[0][chartData[i][xVarName]] : "";
                result.push(ditem);

                resultColors[counter] = opts[0].color != undefined ? opts[0].color[0][chartData[i][xVarName]] : "";

                counter += 1;
            }
        }

        runningData = result;
        runningColors = resultColors;
        return;
    }
    

    var chartData = [
        {
            "Country": "CHINA",
            "Total": 1415046
        },
        {
            "Country": "INDIA",
            "Total": 1354052
        },
          
        {
            "Country": "USA",
            "Total": 326767
        },
        {
            "Country": "INDONESIA",
            "Total": 266795
        },
        {
            "Country": "BRAZIL",
            "Total": 210868
        },
        {
            "Country": "PAKISTAN",
            "Total": 200814
        },
        {
            "Country": "NIGERIA",
            "Total": 195875
        },
        {
            "Country": "BANGLADESH",
            "Total": 166368
        },
        {
            "Country": "RUSSIA",
            "Total": 143968
        },
        {
            "Country": "MEXICO",
            "Total": 130759
        }
    ];

    chartOptions = [{
        "captions": [{ "INDIA": "INDIA", "INDONESIA": "INDONESIA", "USA": "USA" ,"CHINA":"CHINA" , "BRAZIL":"BRAZIL" , "PAKISTAN": "PAKISTAN" , "NIGERIA":"NIGERIA" , "BANGLADESH":"BANGLADESH" , "RUSSIA":"RUSSIA" , "MEXICO": "MEXICO"}],
        "color": [{ "INDIA": "blue", "INDONESIA": "#0070C0", "USA": "brown","CHINA": "#ff0001" , "BRAZIL":"#f434e7" , "PAKISTAN":"yellow" , "NIGERIA": "orange" , "BANGLADESH": "#f434e7" , "RUSSIA": "brown" , "MEXICO": "#0070C0"}],
        "xaxis": "Country",
        "yaxis": "Total"
        
    }]

 
