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
function optionChanged (id) {
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
            samples = samples.filter(participant=> participant.id == id)[0];
            // Creating variables for arrays 
            otu_ids = samples.otu_ids;
            otu_labels = samples.otu_labels;
            sample_values = samples.sample_values;
            // Verifying filter and variables 
            console.log(samples);
            console.log(metadata);
            console.log(otu_ids);
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
            let topotu_ids= otu_ids.slice(0,10).reverse();
            let topotu_labels= otu_labels.slice(0,10).reverse();
            let topsample_values= sample_values.slice(0,10).reverse();
            // Verifying top 10 arrays
            console.log(topotu_ids)
            console.log(topotu_labels)
            console.log(topsample_values)
            // Creating a trace
            let traceBar = {
                x: topotu_labels,
                y: topotu_ids,
                type: 'bar',
                orientation: 'h',
                marker: {
                    color: 'coral'
                }
            }
        });
};



