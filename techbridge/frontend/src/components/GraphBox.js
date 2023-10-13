import React from 'react';
import config from "./config.js";
import { Graph } from "react-d3-graph";

export class GraphBox extends React.Component {
    constructor(props) {
        super(props);
        // debugger;
        this.listRef = React.createRef();
        // this.state = {showTable: false, tableData: {}, graphData: {}};
      //   this.nwtb_data = nwtb_data;
      //   this.swtb_data = swtb_data;
        this.state = {"data": props.data};
        // this.data = props.data;
        this.config = config;
    }

    onClickGraph = function(event) {
        // this.setState({showTable: false});
        // window.alert('Clicked the graph background');
    };
    
    onClickNode = (nodeId, node) => {

        // window.alert('Clicked node ${nodeId} in position (${node.x}, ${node.y})');
    };
    
    onDoubleClickNode = function(nodeId, node) {
        // window.alert('Double clicked node ${nodeId} in position (${node.x}, ${node.y})');
    };
    
    onRightClickNode = function(event, nodeId, node) {
        // window.alert('Right clicked node ${nodeId} in position (${node.x}, ${node.y})');
    };
    
    onMouseOverNode = function(nodeId, node) {
        // window.alert(`Mouse over node ${nodeId} in position (${node.x}, ${node.y})`);
    };
    
    onMouseOutNode = function(nodeId, node) {
        // window.alert(`Mouse out node ${nodeId} in position (${node.x}, ${node.y})`);
    };
    
    onClickLink = function(source, target) {
        // window.alert(`Clicked link between ${source} and ${target}`);
    };
    
    onRightClickLink = function(event, source, target) {
        window.alert('Right clicked link between ${source} and ${target}');
    };
    
    onMouseOverLink = function(source, target) {
        // window.alert(`Mouse over in link between ${source} and ${target}`);
    };
    
    onMouseOutLink = function(source, target) {
        // window.alert(`Mouse out link between ${source} and ${target}`);
    };
    
    onNodePositionChange = function(nodeId, x, y) {
        // window.alert(`Node ${nodeId} moved to new position x= ${x} y= ${y}`);
    };

    onZoomChange = function(previousZoom, newZoom) {
        // window.alert(`Graph is now zoomed at ${newZoom} from ${previousZoom}`);
    };

    render() {
        const { innerWidth: width, innerHeight: height } = window;
        this.config.width = innerWidth * 0.39;
        this.config.initialZoom = 1.5;
        // this.config.width = 700;
        this.config.height = 700;
        // this.config.backgroundColor = "#A53E27";
        this.config.node.labelProperty = (node) => {
            // return (
            //     <div>
            //         <div>Name: {node.id}</div>
            //         <div>Org Type: {node.company_type}</div>
            //         <div>Org Name: {node.company}</div>
            //     </div>
            // );
            return `${node.id} (${node.company})`;
        }
        return (
            <Graph id="graph_id" 
                    config={this.config} 
                    data={this.state.data} 
                    onClickGraph={this.onClickGraph}
                    onClickNode={this.onClickNode}
                    onDoubleClickNode={this.onDoubleClickNode}
                    onRightClickNode={this.onRightClickNode}
                    onClickLink={this.onClickLink}
                    onRightClickLink={this.onRightClickLink}
                    onMouseOverNode={this.onMouseOverNode}
                    onMouseOutNode={this.onMouseOutNode}
                    onMouseOverLink={this.onMouseOverLink}
                    onMouseOutLink={this.onMouseOutLink}
                    onNodePositionChange={this.onNodePositionChange}
                    onZoomChange={this.onZoomChange} 
                />
        )
    }
}