import React, { Component } from 'react';
// import { Dropdown } from 'react-dropdown';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import "./Filter.css";
import Slider from 'react-slider';

export class Filter extends Component {
    constructor(props) {
        super(props);
        this.data = this.props.data;
        this.state = {
            nwtb: true,
            // data: this.data,
            source: this.props.source,
            color_segregation: this.props.color_segregation,
            label_type: this.props.label_type,
            show_tb: this.props.show_tb,
            node_size: this.props.node_size,
            slide_value: this.props.slide_value,
            changed1: false,
            changed2: false,
            changed3: false,
            changed4: false,
            changed5: false,
            changed6: false,
            value: 0,
        }
        this.options = this.props.options
        console.log("loaded");
    }

    handleSourceChange = (event) => {
        let changed = false;
        let value = Object.keys(this.options.source).find(key => this.options.source[key] === event.value);
        if(value != this.props.source) changed = true;
        this.setState({source: value, changed1: changed});
    }

    handleColorSegregationTypeChange = (event) => {
        let changed = false;
        let value = Object.keys(this.options.color).find(key => this.options.color[key] === event.value);
        if(value != this.props.color_segregation) changed = true;
        this.setState({color_segregation: value, changed2: changed});
    }

    handleNodeSizeChange = (event) => {
        let changed = false;
        let value = Object.keys(this.options.node_size).find(key => this.options.node_size[key] === event.value);
        if(value != this.props.node_size) changed = true;
        this.setState({node_size: value, changed3: changed});
    }

    handleLabelTypeChange = (event) => {
        let changed = false;
        let value = Object.keys(this.options.label_type).find(key => this.options.label_type[key] === event.value);
        if(value != this.props.label_type) changed = true;
        this.setState({label_type: value, changed4: changed});
    }

    handleShowTBChange = (event) => {
        let changed = false;
        let value = Object.keys(this.options.show_tb).find(key => this.options.show_tb[key] === event.value);
        if(value != this.props.show_tb) changed = true;
        this.setState({show_tb: value, changed5: changed});
    }

    handleOnChange = (event) => {
        let changed = false;
        let value = Object.keys(this.options.slide_value).find(key => this.options.slide_value[key] === event.value);
        if(value != this.props.slide_value) changed = true;
        this.setState({slide_value: value, changed6: changed});
    }

    handleChange = (event) => {
        this.setState({value: event.target.value});
      };

    render() {
        return (<form onSubmit={this.props.onSubmit} >
            {/* <Slider value={this.state.value} onChange={this.handleChange} /> */}
            <div style={{margin: "40px"}}>
                <h2>Filters</h2>
                {/* <Slider
                    style={{width: 10}}
                    value={this.state.slide_value}
                    onChange={this.handleOnChange}
                    min={0}
                    max={10}
                /> */}
                {/* <Dropdown
                    className='myClassName'
                    controlClassName='myControlClassName'
                    menuClassName='myMenuClassName'
                    placeholderClassName='myPlaceholderClassName'
                    label="Tech Bridge"
                    options={Object.values(this.options.source)}
                    value={this.options.source[this.state.source]}
                    onChange={this.handleSourceChange}
                /> */}
                {/* <div style={{ position: 'absolute', width: 200, marginLeft: 0 }}>
                    <Slider aria-label="Volume" value={this.state.value} onChange={this.handleChange} />
                </div> */}
                <Dropdown
                    className='myClassName'
                    controlClassName='myControlClassName'
                    menuClassName='myMenuClassName'
                    placeholderClassName='myPlaceholderClassName'
                    label="Color by "
                    options={Object.values(this.options.color)}
                    value={this.options.color[this.state.color_segregation]}
                    onChange={this.handleColorSegregationTypeChange}
                />
                <Dropdown
                    className='myClassName'
                    controlClassName='myControlClassName'
                    menuClassName='myMenuClassName'
                    placeholderClassName='myPlaceholderClassName'
                    label="Node size by"
                    options={Object.values(this.options.node_size)}
                    value={this.options.node_size[this.state.node_size]}
                    onChange={this.handleNodeSizeChange}
                />
                <Dropdown
                    className='myClassName'
                    controlClassName='myControlClassName'
                    menuClassName='myMenuClassName'
                    placeholderClassName='myPlaceholderClassName'
                    label="Label Type "
                    options={Object.values(this.options.label_type)}
                    value={this.options.label_type[this.state.label_type]}
                    onChange={this.handleLabelTypeChange}
                />
                <Dropdown
                    className='myClassName'
                    controlClassName='myControlClassName'
                    menuClassName='myMenuClassName'
                    placeholderClassName='myPlaceholderClassName'
                    label="Show TB "
                    options={Object.values(this.options.show_tb)}
                    value={this.options.show_tb[this.state.show_tb]}
                    onChange={this.handleShowTBChange}
                />
                {/* <div style={{ position: 'absolute', width: 200, marginLeft: 0 }}>
                    <Slider aria-label="Volume" value={this.state.value} onChange={this.handleChange} />
                </div> */}
                {/* <Dropdown
                    className='myClassName'
                    controlClassName='myControlClassName'
                    menuClassName='myMenuClassName'
                    placeholderClassName='myPlaceholderClassName'
                    label="Show small businesses"
                    options={Object.values(this.options.slide_value)}
                    value={this.options.slide_value[this.state.slide_value]}
                    onChange={this.handleOnChange}
                /> */}
                
                {
                    (this.state.changed1 || this.state.changed2 || this.state.changed3 || this.state.changed4 || this.state.changed5 || this.state.changed6)  ? (<input type="submit" value="Submit"  style={{backgroundColor: "#67E841", borderColor: "#67E841", 'marginLeft': 70, 'marginTop': 10}}/>) : (<input type="submit" value="Submit"  disabled style={{backgroundColor: "#67E841", borderColor: "#67E841", 'marginLeft': 70, 'marginTop': 10}}/>)
                }
            </div>
        </form>)
    }
}