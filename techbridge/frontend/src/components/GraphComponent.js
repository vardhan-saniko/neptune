import React from 'react';
import config from "./config.js";
// import data from "./data.js";
import { Graph } from "react-d3-graph";
// import Switch from "react-switch";
// import nwtb_data from "./nwtb_data";
// import swtb_data from "./sctb_data";
// import { ContainerRow } from './ContainerRow';

export class GraphComponent extends React.PureComponent {
    constructor(props) {
      super(props);
      this.listRef = React.createRef();
      this.data = this.props.data;
      this.config = config;
      this.config.initialZoom = 0.7;
      this.config.height = 1000;
    }
    
    onClickGraph = function(event) {
        // this.setState({showTable: false});
        // window.alert('Clicked the graph background');
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


    // handleChange = function() {
    //     if(this.state.nwtb) {
    //         // this.setState({data: swtb_data, nwtb: false});
    //         this.setState({nwtb: false});
    //     } else {
    //         // this.setState({data: nwtb_data, nwtb: true});
    //         this.setState({nwtb: true});
    //     }
    // };

    render() {
      this.config.node.labelProperty = (node) => {
        if(this.props.labelType == "node") {
            return `${node.id}`;
        } else if(this.props.labelType == "node_company") {
            return `${node.id} (${node.company})`;
        } else {
            return '';
        }
      }

      const { innerWidth: width, innerHeight: height } = window;
      this.config.width = innerWidth * 0.83;
      return (
        <Graph id="graph" 
            config={this.config} 
            data={this.data}
            viewBox={"0 0 500 500"}
            onClickGraph={this.onClickGraph}
            onClickNode={this.props.onClicknode}
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
      );
    }
  }