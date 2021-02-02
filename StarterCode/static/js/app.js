function init() {
  // Grab a reference to the dropdown select element
  var select_tag = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("../static/data/samples.json").then((data) => {

    // your-code-here
    console.log(data)
    var subject_ids = data.names;

    console.log("Subject_ids")
    console.log(subject_ids)

    subject_ids.forEach((id) => {
      select_tag
        .append("option")
        .property("value", id)
        .text(id);
    });

    // Use the first sample from the list to build the initial plots
    optionChanged(subject_ids[0]);
  });
}

/*
   Hints: Create additional functions to build the charts,
          build the gauge chart, set up the metadata,
          and handle the event listeners

   Recommended function names:
    optionChanged() 
    buildChart()
    buildGauge()
    buildMetadata()
*/
function optionChanged(selected_id) {
  console.log("selected_id")
  console.log(selected_id)
  buildCharts(selected_id);
  buildGauge(selected_id);
  buildMetadata(selected_id);
}

function buildCharts(selected_id) {
  console.log("buildCharts=", selected_id);

  d3.json("../static/data/samples.json").then((data) => {
    //   Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
    // * Use`sample_values` as the values for the bar chart.
    // * Use`otu_ids` as the labels for the bar chart.
    // * Use`otu_labels` as the hovertext for the chart.

    var samples = data.samples;
    var results = samples.filter(sampleObj => sampleObj.id == selected_id);

    console.log("samples: ");
    console.log(samples);

    var result = results[0];

    console.log("results: ");
    console.log(results);

    console.log("result: ");
    console.log(result);

    var otu_ids = result.otu_ids;
    var otu_labels = result.otu_labels;
    var sample_values = result.sample_values;

    var y_label = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();

    console.log("y_labe: ");
    console.log(y_label);

    console.log("sample_valuese: ");
    console.log(sample_values.slice(0, 10).reverse());

    var bar_trace = {
      y: y_label,
      x: sample_values.slice(0, 10).reverse(),
      text: otu_labels.slice(0, 10).reverse(),
      type: "bar",
      orientation: "h",
    };

    var data = [bar_trace];

    var bar_layout = {
      title: "Top 10 OTUs",
      margin: { t: 30, l: 150 }
    };

    Plotly.newPlot("bar", data, bar_layout);

  });
};

function buildGauge(selected_id) {
  console.log("buildGauge=", selected_id);

  d3.json("../static/data/samples.json").then((data) => {
    // Create a bubble chart that displays each sample.
    // * Use`otu_ids` for the x values.
    // * Use`sample_values` for the y values.
    // * Use`sample_values` for the marker size.
    // * Use`otu_ids` for the marker colors.
    // * Use`otu_labels` for the text values.

    var samples = data.samples;
    var results = samples.filter(sampleObj => sampleObj.id == selected_id);

    var result = results[0];

    var otu_ids = result.otu_ids;
    var otu_labels = result.otu_labels;
    var sample_values = result.sample_values;

    var bubble_trace = {
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: "markers",
      marker: {
        size: sample_values,
        color: otu_ids,
        colorscale: "Earth"
      }
    };

    var data = [bubble_trace];

    var bubble_layout = {
      hovermode: "closest",
      xaxis: { title: "OTU ID" },
      margin: { t: 30 }
    };

    Plotly.newPlot("bubble", data, bubble_layout);
  });
};

function buildMetadata(selected_id) {
  console.log("buildMetadata=", selected_id);

  d3.json("../static/data/samples.json").then((data) => {
    var metadata = data.metadata;

    console.log("metadata");
    console.log(metadata);

    var results = metadata.filter(metadataObj => metadataObj.id == selected_id);
    var result = results[0];

    console.log("results")
    console.log(results[0])

    console.log("result")
    console.log(result)

    var fig = d3.select("#sample-metadata");

    fig.html("");

    Object.entries(results[0]).forEach(([key, value]) => {
      fig.append("h5").text(`${key}: ${value}`);
    });

    console.log("wfreq");
    console.log(result.wfreq);

    // Enter the washing frequency between 0 and 180
    var wfreq = result.wfreq;
    var level = parseFloat(wfreq) * 20;

    // Trig to calc meter point
    var degrees = 180 - level;
    var radius = 0.5;
    var radians = (degrees * Math.PI) / 180;
    var x = radius * Math.cos(radians);
    var y = radius * Math.sin(radians);

    // Path: may have to change to create a better triangle
    var mainPath = "M -.0 -0.05 L .0 0.05 L ";
    var pathX = String(x);
    var space = " ";
    var pathY = String(y);
    var pathEnd = " Z";
    var path = mainPath.concat(pathX, space, pathY, pathEnd);

    var data = [
      {
        type: "scatter",
        x: [0],
        y: [0],
        marker: { size: 12, color: "850000" },
        showlegend: false,
        name: "Freq",
        text: level,
        hoverinfo: "text+name"
      },
      {
        values: [50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50],
        rotation: 90,
        text: ["8-9", "7-8", "6-7", "5-6", "4-5", "3-4", "2-3", "1-2", "0-1", ""],
        textinfo: "text",
        textposition: "inside",
        marker: {
          colors: [
            "rgba(0, 105, 11, .5)",
            "rgba(10, 120, 22, .5)",
            "rgba(14, 127, 0, .5)",
            "rgba(110, 154, 22, .5)",
            "rgba(170, 202, 42, .5)",
            "rgba(202, 209, 95, .5)",
            "rgba(210, 206, 145, .5)",
            "rgba(232, 226, 202, .5)",
            "rgba(240, 230, 215, .5)",
            "rgba(255, 255, 255, 0)"
          ]
        },
        labels: ["8-9", "7-8", "6-7", "5-6", "4-5", "3-4", "2-3", "1-2", "0-1", ""],
        hoverinfo: "label",
        hole: 0.5,
        type: "pie",
        showlegend: false
      }
    ];

    var layout = {
      shapes: [
        {
          type: "path",
          path: path,
          fillcolor: "850000",
          line: {
            color: "850000"
          }
        }
      ],
      title: "<b>Belly Button Washing Frequency</b> <br> Scrubs per Week",
      height: 500,
      width: 500,
      xaxis: {
        zeroline: false,
        showticklabels: false,
        showgrid: false,
        range: [-1, 1]
      },
      yaxis: {
        zeroline: false,
        showticklabels: false,
        showgrid: false,
        range: [-1, 1]
      }
    };

    var GAUGE = document.getElementById("gauge");
    Plotly.newPlot(GAUGE, data, layout);
  });
}

// Initialize the dashboard

init();