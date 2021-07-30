<h1> Interactive-Web-Visualizations--Challenge </h1>
<hr>
<h3>Background</h3>
<p align = 'justify'>In this assignment, an interactive dashboard was built to explore the <a href = "http://robdunnlab.com/projects/belly-button-biodiversity/" target="_blank">Belly Button Biodiversity dataset</a>, which catalogs the microbes that colonize human navels in JSON format.</p>

<p align = 'justify'>The dataset reveals a small handful of microbial species (also called operational taxonomic units, or OTUs, in the study). Demographics information is dynamically populated based upon a user-selected test subject ID. </p>

<p align = 'justify'>A bar chart, bubble chart, and a bonus gauge chart further update once the ID is changed. This code has been written using Plotly, JavaScript, HTML, CSS, and D3.js.</p>

<p align = 'justify'>All CSS, JS, and images required are under the static folder. The main HTML file index.html is in the root folder of the Github repo. The dashboard can be viewed here: Belly Button Diversity Dashboard.</p>
<br>
<h3>Plotly</h3>
<hr>
<p align = 'justify'>The task was to retrieve test subject demographics and draw a bar chart and bubble chart displaying each individual's samples. This assignment was done as follows:</p>
<ul>
  <li>Read in samples.json using the D3 library.</li>
  <li>Retrieve metadata info for each test subject and display this in the form of an unordered list item as a key-value pair on the dashboard.</li>
  <li>Get required data for plotting, including sample_values, otu_ids, and otu_labels used to create a trace and plot the bar chart.</li>
  <li>Since the task was to only plot the top 10 values, the three arrays were sliced and reversed to display the chart as below.</li>
  <p align = 'center'><img src="https://raw.githubusercontent.com/Karla-Flores/Interactive-Web-Visualizations--Challenge/main/Screenshot/Top_10_OTU_ID.png"></p>
  <li>The entire sample arrays were used to plot a bubble chart referring to bacteria cultures per sample.</li>
</ul>
