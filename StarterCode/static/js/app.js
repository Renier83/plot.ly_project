function init() {
  // Grab a reference to the dropdown select element

  // Use the list of sample names to populate the select options
  d3.json("/samples").then((data) => {
    
    // your-code-here

    // Use the first sample from the list to build the initial plots
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

// Initialize the dashboard
init();