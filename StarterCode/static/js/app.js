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
    build_chart('id');
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

// Build a chart for a single sample such as 940
function build_chart(id) {
    console.log('build_chartfor' + id);
    d3.json('samples.json')
        .then(function (data) {
            let names = data.names;
            let metadata = data.metadata;
            let samples = data.samples;

            // Filter name and other arrays for id
            let idMetadata = metadata.filter(participant => participant.id)[0];
            console.log(idMetadata);
            // Object.entries(idMetadata).forEach(([key,value])=>{
            //     var list = samples.append('ul');
            //     list.attr('class', 'list-group list-group-flush')
            //     var item = list.append('li');
            //     item.attr('class', 'list-group-item p-1 demo-text bg-transpaent');
            //     item.text(`${key}: ${value}`);
            let results = idMetadata[0];
            var metaPanel = d3.select(samples);
            metaPanel.html('');
            Object.entries(results).forEach(([key, value]) => {
                metaPanel.append('h6').text(`${key.toUpperCase()}: ${value}`)
            })
        })}
