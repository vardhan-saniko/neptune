import React from 'react';

import { VictoryLegend } from 'victory-legend';
// import Box from '@mui/material/Box';

export class Legend extends React.Component {
    constructor(props) {
      super(props);
      this.listRef = React.createRef();
      this.data = this.props.data;
    }


    render() {
        // debugger;
        var legendData = [];
        Object.keys(this.data).map((item, index) => {
            legendData.push({name: item, symbol: {fill: this.data[item], type: "square"}, labels: {fontSize: 28}});
        })

        return <VictoryLegend y={0}
            // borderComponent={{border: '1px'}}
            borderPadding={{ top: 0, bottom: 0 }}
            orientation="vertical"
            gutter={20}
            data={legendData}
            // itemsPerRow={4}
        />
    }
}