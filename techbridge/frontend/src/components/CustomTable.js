import React from 'react';
import './CustomTable.css';

export class CustomTable extends React.PureComponent {
    constructor(props) {
      super(props);
      this.listRef = React.createRef();
      this.data = props.data;
      this.headers = props.columns;
    //   this.index = 0;
    }

    render() {
        // debugger;
        let index = -1;
        return <table width="700">
            <tr>
                {
                    this.headers.map((item) => <th style={{'height': 50, 'backgroundColor': "#000000", 'color': "#FFFFFF", 'textAlign': 'center'}}>{item.title }</th>)
                }
            </tr>
            {
                this.data.map((row) => 
                    {
                        index += 1;
                        
                        return (
                            index % 2 == 0 ? (
                            <tr style={{'height': 30}}>
                                {this.headers.map((item) => <td>{row[item.key]}</td>)}</tr>) : (
                            <tr style={{'height': 30, 'backgroundColor': "#BCC6C6"}}>
                                {this.headers.map((item) => <td>{row[item.key]}</td>)}</tr>)
                        )
                    }
                )
            }
        </table>
    }
}