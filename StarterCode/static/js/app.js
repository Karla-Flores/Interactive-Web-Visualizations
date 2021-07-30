// JS promise
d3.json('samples.json')
    .then(function (data) {
        init(data);
    });

// Json organization
function init(data) {
    console.log(data.names);
    console.log(data.metadata);
    console.log(data.samples);
    load_dropdown_list(data.names);
    build_chart('940');
};


// Dropdown menu with Ids
function load_dropdown_list(names) {
    let dropdown = document.getElementById('selDataset');
    names.forEach(function (name) {
        let opt = document.createElement('option');
        let att = document.createAttribute('value');
        att.value = name;
        opt.setAttributeNode(att);
        opt.text = name;
        dropdown.appendChild(opt);
    })
};

// Linking id selected on dropdown with function
function optionChanged(id) {
    build_chart(id);
}

// Build a chart for a single sample such as 940
function build_chart(id) {
    console.log('build_chartfor' + id);
    d3.json('samples.json')
        .then(function (data) {
            let names = data.names;
            let metadata = data.metadata;
            let samples = data.samples;
            // Filter name and other arrays for id
            metadata = metadata.filter(participant => participant.id == id)[0];
            samples = samples.filter(participant => participant.id == id)[0];
            // Creating variables for arrays 
            otu_ids = samples.otu_ids;
            otu_labels = samples.otu_labels;
            sample_values = samples.sample_values;
            // Wash frequency
            let wfreq = metadata.wfreq;
            // Verifying filter and variables 
            console.log(samples);
            console.log(metadata);
            console.log(otu_ids);
            console.log(wfreq);
            console.log(otu_labels);
            console.log(sample_values);
            // Build metaPanel for id sample-metadata
            let metaPanel = d3.select('#sample-metadata');
            metaPanel.html('');
            // Loop for each id and information in the #sample-metadata box
            Object.entries(metadata).forEach(([key, value]) => {
                metaPanel.append('h6').text(`${key.toUpperCase()}: ${value}`);
            });
            // Creating top 10 arrays
            let topotu_ids = otu_ids.slice(0, 10).reverse();
            let topotu_labels = otu_labels.slice(0, 10).reverse();
            let topsample_values = sample_values.slice(0, 10).reverse();
            // Map function to store the Ids adding OTU for labeling
            let topotu_id_labels = topotu_ids.map(otu_ids => 'OTU ' + otu_ids)
            console.log(topotu_id_labels)
            // Verifying top 10 arrays
            console.log(topotu_ids)
            console.log(topotu_labels)
            console.log(topsample_values)
            // Creating a trace for bar chart
            var traceBar = {
                x: topsample_values,
                y: topotu_id_labels,
                type: 'bar',
                orientation: 'h',
                marker: {
                    color: 'tomato'
                }
            }
            // Setting layout for title and bar size
            let layout = {
                title: {
                    text: `<b>Top 10 OTU for ID ${(id)}</b>`,
                    font: {
                        size: 16,
                    },
                    height: 500,
                    width: 600
                }
            };
            // Defining traceBar
            var traceBar = [traceBar];
            // Placing the bar chart into the 'bar' div
            Plotly.newPlot('bar', traceBar, layout);
            // Creating a trace for buble chart
            var traceBubble = {
                x: otu_ids,
                // x: topotu_ids,
                y: sample_values,
                // y: topsample_values,
                text: otu_labels,
                // text: topotu_id_labels,
                mode: 'markers',
                marker: {
                    size: sample_values,
                    color: otu_ids,
                    colorscale: 'Portland'
                }
            }
            // Defining traceBar
            var traceBubble = [traceBubble];
            // Setting layout for title and bar size
            let layout_bubble = {
                title: `<b>Bacteria Cultures per Sample ${(id)}<b>`,
                font: {
                    size: 14,
                },
                xaxis: {
                    title: `<b>OTU ${(id)}</b>`,
                    color: 'black'
                },
                yaxis: {
                    title: "<b>Sample Values</b>",
                    color: 'black'
                },
            }
            // Placing the bar chart into the 'bubble' div
            Plotly.newPlot('bubble', traceBubble, layout_bubble);
            // Creating a trace for gauge chart
            // Conditional for wfreq = 0
            if (wfreq == null) {
                wfreq = 0;
                        }
            var traceGauge = {
                domain: { x: [0, 1], y: [0, 1] },
                value: wfreq,
                type: "indicator",
                // mode: "gauge",
                mode: "gauge+number",
                gauge: {
                    axis: {
                        range: [0, 9],
                        tickmode: 'linear',
                        tickfont: {
                            size: 15
                        }
                    },
                    // Making gauge bar transparent since a pointer is being used instead
                    // bar: { color: 'rgba(8,29,88,0)' }, 
                    // Selecting colour
                    // bar: { color: 'gainsboro' }, 
                    bar: { color: 'ghostwhite' }, 
                    steps: [
                        { range: [0, 1], color: '#009a60' },
                        { range: [1, 2], color: '#4aa84e' },
                        { range: [2, 3], color: '#92b73a' },
                        { range: [3, 4], color: '#c6bf22' },
                        { range: [4, 5], color: '#edbd02' },
                        { range: [5, 6], color: '#ffad00' },
                        { range: [6, 7], color: '#ff8c00' },
                        { range: [7, 8], color: '#fc6114' },
                        { range: [8, 9], color: '#f43021' },
                    ]
                }   
            }
            let layoutGauge ={
                title: {
                    text: `<b>Test Subject ${id}</b><br><b>Belly Button Washing Frequency</b><br><br>Scrubs per Week`,
                    font: {
                        size: 16,
                }
            }
        };
            // Defining traceBar
            var traceGauge = [traceGauge];
            // Placing the bar chart into the 'bubble' div
            Plotly.newPlot('gauge', traceGauge, layoutGauge);
            
        });
};



