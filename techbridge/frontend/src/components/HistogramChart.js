import React from 'react';
import './UiComponent.css';
// import Histogram from 'react-chart-histogram';
import Plot from 'react-plotly.js';
// import { Histogram, DensitySeries, BarSeries, withParentSize, XAxis, YAxis } from '@data-ui/histogram';


export class HistogramChart extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      labels: this.props.labels,
      values: this.props.values,
    }
  }
  
  render() {
    // debugger;
    return (
      <Plot
        data={[
          {type: 'bar', x: this.state.labels, y: this.state.values},
        ]}
        layout={ {width: 350, height: 500, title: this.props.title,
            xaxis: {title: this.props.xaxis},
            yaxis: {title: this.props.yaxis}} }
      />
    )
  }
}
