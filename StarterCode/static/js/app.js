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
}

// Dropdown using names for creating attributes option and value
function load_dropdown_list(names) {
    let dropdown = document.getElementById('selDataset');
    names.forEach(function (name) {
        let opt = document.createElement("option");
        let att = document.createAttribute("value");
        att.value = name;
        opt.setAttributeNode(att);
        opt.text = name;
        dropdown.appendChild(opt);
    })
}
// Build a chart for a single sample such as 940
function build_chart(id) {
    console.log("build_chartfor" + id);
    d3.json('samples.json')
        .then(function (data) {
            let names = data.names;
            let metadata = data.metadata;
            let samples = data.samples;
            // Filter name and other arrays for id
            

            // build the chart

        });
}

