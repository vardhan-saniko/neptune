import React, { Component } from 'react';

import { GraphComponent } from "./GraphComponent";
import { GraphBox } from './GraphBox';
import { Legend } from './Legend';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CustomTable } from './CustomTable';
import { GraphContent } from './GraphContent';
import { Filter } from './Filter';
import "./UiComponent.css";
import { HistogramChart } from './HistogramChart';
import { TABLE_HEADERS, METRIC_TABLE, PLOT_MAPPING } from '../constants';
// import Slider from 'react-slider';
// import { Slider } from 'rsuite';
// import Slider from '@mui/material/Slider';
// import Histogram from 'react-chart-histogram';
// import { BarChart } from 'react-d3';
// import Switch from "react-switch";
// import { array } from 'prop-types';

export default class UiComponent extends Component {
    constructor(props) {
        super(props);
        this.data = null,
        this.centralities = null,
        this.state = {
            nwtb: true,
            // data: this.data.nwtb,
            // centralities: this.data.nwtb_centralities,
            source: "nwtb",
            color_segregation: 'company_type',
            label_type: "",
            show_tb: "show_tb",
            node_size: "out_degree",
            slide_value: '4',
            count: 0,
            graph_count: 0,
            legend_count: 0,
            showTable: false,
            tableData: {},
            graphData: {},
            value: 0,
            switchState: true
        }
        this.meanScores = {},
        this.graphAnalysisData = {},
        this.percentageAnalysisData = {},
        this.metricData = [],
        this.colorMap = null,
        this.store_colors = {},
        // this.colors = ["#A82DD6", "#CED62D", "#60D62D", "#D6892D", "#F42E0B", "#ED0BF4", "#0BF4F4", "#0B47F4", "#7508E1", "#0D0D0C", "#EAAAA0"],
        this.colors1 = ["#033122", "#FDFD05", "#037B17", "#0743F2", "#BD2004", "#E607ED", "#06F5F5", "#B57F3F", "#7508E1", "#0D0D0C", "#EAAAA0"],
        this.colors = ["#957fa6", "#70a1ab", "#c9c9c9", "#b0bf91", "#e27575", "#7cc8d6", "#bfa588", "#ba43b2", "#0ddbca", "#0d6ddb"]
        this.options = {
            'source': {'nwtb': 'North West', 'sctb': "South California"},
            'color': {'company_type': 'Organization Type', 'type_of_node': 'Pendent Roster'},
            'node_size': {'out_degree': 'Degree', 'katz': 'Katz', 'betweenness': 'Betweenness', 'clustering': 'Clustering', 'eigenvector': 'Eigen Vector'},
            'label_type': {'': "None", 'node': "Node Name", 'node_company': "Node (Company Name)"},
            'show_tb': {'show_tb': 'Show TB Connections', 'no': 'Do not show'},
            'slide_value': {
                '1': '1',
                '2': '2',
                '3': '3',
                '4': '4',
                '5': '5',
                '6': '6',
                '7': '7',
                '8': '8',
                '9': '9',
                '10': '10',
            }
        }
    }

    get_n_different_colors = (n) => this.colors.slice(0, n);

    color_segregation_elements_to_color_map = (all_organizations, colors) => {
        let color_segregation_elements_color_map = {}
        let index = 0;
        all_organizations.forEach(item => {
            // console.log(item);
            color_segregation_elements_color_map[item] = colors[index]
            index += 1;
        })
        
        return color_segregation_elements_color_map
    }

    getConnectionsData = (nodeId, node) => {
        var graph_data = {};
        var table_data = [];
        var node_links = this.data['links'].filter((k) => k.source == nodeId);
        var link_node_ids = node_links.map((k) => k.target);
        var links_data = this.data['nodes'].filter((k) => {
            if(link_node_ids.indexOf(k.id) !== -1) {
                return true;
            }
        });
        let table_key = 1;
        table_data.push({
            'id': nodeId,
            'company': node.company,
            'company_type': node.company_type,
            'type': node.type_of_node,
            'key': table_key.toString()
        });
        graph_data = {'nodes': [{'id': nodeId, 'color': node.color, 'size': node.size, 'company': node.company, 'company_type': node.company_type, 'type': node.type_of_node}], 'links': []};
    
        links_data.forEach(function (item, index) {
            graph_data['nodes'].push({'id': item.id, 'color': item.color, 'size': item.size, 'company': item.company, 'company_type': item.company_type, 'type': item.type_of_node});
            graph_data['links'].push({'source': nodeId, 'target': item.id});
            table_data.push({'id': item.id, 'company': item.company, 'company_type': item.company_type, 'type': item.type_of_node, 'key': (table_key + 1).toString()});
            table_key += 1;
        });

        return {graphData: graph_data, tableData: table_data};
    }

    handleChange = (event) => {
        this.setState({value: event.target.value});
    };

    onClicknode = (nodeId, node) => {
        let connectionsData = this.getConnectionsData(nodeId, node);
    
        this.setState({showTable: true, count: this.state.count + 1, graphData: connectionsData.graphData, tableData: connectionsData.tableData});
      };

    add_colors_sizes_to_final_data = (all_color_segregation_elements) => {
        // const { innerWidth: width, innerHeight: height } = window;
        let centralities = this.centralities[this.state.node_size];
        let nodes = Object.keys(centralities);
        let min = Math.min(...Object.values(centralities).filter((k) => k > 0));
        let max = Math.max(...Object.values(centralities));
        let range = (max - min)/5;
        let colors = this.get_n_different_colors(all_color_segregation_elements.length)
        let color_segregation_elements_color_map = this.color_segregation_elements_to_color_map(all_color_segregation_elements, colors)
        this.colorMap = color_segregation_elements_color_map;
        let empty = Object.keys(this.store_colors).length == 0 ? true : false;
        this.data['nodes'].forEach(node => {
            let n_color = color_segregation_elements_color_map[node[this.state.color_segregation]];
            node.color = n_color;
            if (empty) {
                this.store_colors[node.id] = n_color;
            }
            node.size = centralities[node['id']] == 0 ? 300 : ((centralities[node['id']] - min)/range + 1)* 300;
        })
    }

    graph_d3_json_format = () => {

        this.data = this.state.nwtb ? this.props.data.nwtb : this.props.data.sctb;
        this.centralities = this.state.nwtb ? this.props.data.nwtb_centralities : this.props.data.sctb_centralities;
//        this.notb_centralities = this.state.nwtb ? this.props.data.nwtb_centralities1 : this.props.data.sctb_centralities1;
        let all_color_segregation_elements = new Set();
        let centralities = this.centralities[this.state.node_size];
        let nodes = {};

        this.data.nodes.map((p) => nodes[p.id] = p);

        for(const node in nodes) {
            let node_data = nodes[node]
            all_color_segregation_elements.add(node_data[this.state.color_segregation])
        }

        this.add_colors_sizes_to_final_data(all_color_segregation_elements);
        this.handleTBConnections();
//        this.handleSlider();
    }

    calculate_mean_scores = () => {
        for (let key in this.centralities) {
            this.meanScores[key] = Object.values(this.centralities[key]).reduce((accumulator, value) => {
                return accumulator + value;
              }, 0);
        }
    }

    generate_overall_stats = () => {
        this.calculate_mean_scores();
        let nodesLength = this.data.nodes.length;
        this.metricData = [];
        this.metricData.push({'metric': 'Total number of nodes', 'value': nodesLength});
        this.metricData.push({'metric': 'Total number of Connections', 'value': this.data.links.length});
        this.metricData.push({'metric': 'Average number of connections per node', 'value': this.meanScores['degree'].toFixed(2)});
        this.metricData.push({'metric': 'Average betweenness Score', 'value': this.meanScores['betweenness'].toFixed(2)});
        this.metricData.push({'metric': 'Average out-degree Score', 'value': this.meanScores['out_degree'].toFixed(2)});
        this.metricData.push({'metric': 'Average Eigenvector Score', 'value': this.meanScores['eigenvector'].toFixed(2)});
        this.metricData.push({'metric': 'Average Katz centrality Score', 'value': this.meanScores['katz'].toFixed(2)});
    }

    generate_graph_analysis = () => {
        this.graphAnalysisData = {};
        for (let key in this.centralities) {
            let data = Object.values(this.centralities[key]);
            let maximum = Math.max(...data);
            let range = maximum/6;
            let labels = ['0', range.toString(), (2*range).toString(), (3*range).toString(), (4*range).toString(), (5*range).toString()];
            let values = [0, 0, 0, 0, 0, 0];
            for (let i=0; i<data.length; i++) {
                // console.log(Math.floor(data[i]/range));
                let index = Math.floor(data[i]/range);
                if (index > 5) index -= 1;
                values[index] += 1;
            }
            if (key != "clustering") {
                this.graphAnalysisData[key] = {'labels': labels, 'values': values};
            }
        }
    }

    generate_percentage_graphs_data = () => {
        this.percentageAnalysisData = {};
        for (let key in this.notb_centralities) {
            let no_tb = this.notb_centralities[key];
            let tb = this.centralities[key];
            this.percentageAnalysisData[key] = {}

            for (let node in no_tb) {
                if (tb[node] != undefined) {
                    let percentDiff = (tb[node] == 0) ? 0 : (tb[node] - no_tb[node]) * 100/tb[node];
                    let floorVal = Math.floor(percentDiff - (percentDiff % 10));
                    if(this.percentageAnalysisData[key][floorVal] != undefined) {
                        this.percentageAnalysisData[key][floorVal] = 1;
                    } else {
                        this.percentageAnalysisData[key][floorVal] += 1;
                    }
                }
            }
        }
    }

    handle_average_graphs = () => {
        this.generate_overall_stats();
        this.generate_graph_analysis();
//        this.generate_percentage_graphs_data();
        let average_data = {'betweenness': null, 'katz': null, 'eigen': null, 'clustering': null, 'degree': null};
    }
    
    onSubmit = (event/*, source, color_seg, node_size, label_type*/) => {
        event.preventDefault();
        let source = "";
        let color = event.target.childNodes[0].childNodes[1].textContent;
        let node_size = event.target.childNodes[0].childNodes[2].textContent;
        let label_type = event.target.childNodes[0].childNodes[3].textContent;
        let show_tb = event.target.childNodes[0].childNodes[4].textContent;
        let slide_value = 0;
        
        source = Object.keys(this.options.source).find(key => this.options.source[key] === source);
        color = Object.keys(this.options.color).find(key => this.options.color[key] === color);
        node_size = Object.keys(this.options.node_size).find(key => this.options.node_size[key] === node_size);
        label_type = Object.keys(this.options.label_type).find(key => this.options.label_type[key] === label_type);
        show_tb = Object.keys(this.options.show_tb).find(key => this.options.show_tb[key] === show_tb);
        slide_value = Object.keys(this.options.slide_value).find(key => this.options.slide_value[key] === slide_value);

        let count = this.state.legend_count;
        
        if(this.state.color_segregation != color) count += 1;
        
        this.setState({graph_count: this.state.graph_count + 1, source: source, color_segregation: color, node_size: node_size, label_type: label_type, show_tb: show_tb, slide_value: slide_value, legend_count: count, showTable: false});
    }

    handleSlider = () => {
        let node_length = this.data['nodes'].length;
        this.data['nodes'].forEach(node => {
            if (parseInt(this.state.slide_value) < this.centralities['degree'][node['id']]*node_length) {
                console.log("aaaaaaa");
                node.highlightStrokeColor = 'blue';
                node.highlightColor = 'SAME';
                node.color = "#000000";
            } else {
                node.color = this.store_colors[node.id];
            }
        });
    }

    handleTBConnections = () => {
        let defaultColor = "#d3d3d3";
        this.data['links'].forEach(link => {
            if (this.state.show_tb == "show_tb" && link.relationship) {
                // link.color = "#010400";
                link.color = "#F3071C"
                // link.color = "#074BF3"
                // link.highlightColor = "#010400";
            } else {
                link.color = defaultColor;
            }
        })
        // this.setState({switchState: !this.state.switchState});
    }

    clearMessage = () => {
        this.setState({showTable: false});
    }
    
    render() {
        this.graph_d3_json_format();
        this.handle_average_graphs();
        const click_message = "Please Click on Node to see its immediate connections to the right";

        return (
            <div className="big-container">
                <div className="heading-row">
                    {/* <h1>{this.options.source[this.state.source]} Tech Bridge</h1> */}
                    <h1>{this.props.data.name} Analysis</h1>
                </div>
                {/* <Slider value={this.state.value} onChange={this.handleChange} /> */}
                <div className="row1">
                    <div className="box1">
                        <GraphComponent key={this.state.graph_count} data={this.data} onClicknode={this.onClicknode} labelType={this.state.label_type} />
                    </div>
                    <div className="box2">
                        <div className='verticle-box1'>
                            <Legend data={this.colorMap} key={this.state.legend_count} />
                        </div>
                        <div className='verticle-box2'>
                            {/* <Switch onChange={this.handleSwitch} checked={this.state.switchState} /> */}
                            <Filter key={this.state.graph_count} onSubmit={this.onSubmit} source={this.state.source} color_segregation={this.state.color_segregation} node_size={this.state.node_size} slide_value={this.state.slide_value} label_type={this.state.label_type} options={this.options} show_tb={this.state.show_tb}/>
                        </div>
                    </div>
                </div>
                {/* <Slider
                    // style={{width: 10}}
                    value={8}
                    onChange={this.handleOnChange}
                    min={0}
                    max={10}
                /> */}
                <div style={{ width: 200, marginLeft: 20 }}>
                    {/* <Slider barClassName="sliderClass"
                        handleClassName="sliderHandle" 
                        handleStyle={{
                            borderRadius: 10,
                            color: '#fff',
                            fontSize: 12,
                            width: 32,
                            height: 22
                        }}
                        style={{ width: 2000 }}
                        min={0}
                        max={100}
                        progress={true}
                        width={{'width': 10}}
                        graduated
                    /> */}
                    {/* <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto" /> */}
                    {/* <Slider aria-label="Volume" value={this.state.value} onChange={this.handleChange} /> */}
                </div>

                <div className="big-heading">
                    <h2>{ this.state.showTable ? <Button variant="primary" size="lg" onClick={this.clearMessage}>Clear connections data</Button> : click_message }</h2>
                </div>

                {!this.state.showTable &&
                    <div className="row4">
                        {/* <div className="box2"> */}
                            <CustomTable key={this.state.graph_count} columns={METRIC_TABLE} data={this.metricData} />
                        {/* </div> */}
                    </div>}
                {this.state.showTable && (
                    <div className="row2">
                        <div className="box1">
                            {/* {this.state.showTable && (
                                <GraphBox key={String(this.state.count)} data={this.state.graphData}/>
                            )} */}
                            <CustomTable key={this.state.graph_count} columns={METRIC_TABLE} data={this.metricData} />
                        </div>
                        
                        <div className="box2">
                            {this.state.showTable && (
                                <CustomTable key={String(this.state.count)} columns={TABLE_HEADERS} data={this.state.tableData} />)}
                        </div>
                    </div>
                )}
                
                {/* <div className="row2">
                    <div className="box1">
                        {this.state.showTable && (
                            <GraphBox key={String(this.state.count)} data={this.state.graphData}/>
                        )}
                    </div>
                    
                    <div className="box2">
                        {this.state.showTable && (
                            <CustomTable key={String(this.state.count)} columns={table_headers} data={this.state.tableData} />)}
                    </div>

                </div> */}

                <div className="big-heading">
                    {/* <h2 style={{textAlign: "center"}}>{this.options.source[this.state.source]} Graph Analysis</h2> */}
                    <h2 style={{textAlign: "center"}}>Graph Analysis</h2>
                </div>
                <GraphContent source={this.state.source}/>
                <div className='row4'>
                    {Object.keys(this.graphAnalysisData).map((item) => <div className='block'><HistogramChart key={String(this.state.graph_count)+item} labels={this.graphAnalysisData[item].labels} values={this.graphAnalysisData[item].values} title={PLOT_MAPPING[item]} xaxis={"Centralities"} yaxis={"Number of Nodes"} /></div>)}
                </div>
                {/* <div className="big-heading">
                    <h2 style={{textAlign: "center"}}>Average Percentage Graphs</h2>
                </div> */}
            </div>
        )
    }
}