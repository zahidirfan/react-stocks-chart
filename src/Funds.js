import React, { Component } from 'react';
import axios from 'axios';

import {Line} from 'react-chartjs-2';

const urlForFunds = process.env.REACT_APP_FUNDS_API_BASE_URL;
const apikey = process.env.REACT_APP_FUNDS_API_KEY;

class Funds extends Component {

  constructor(props) {
    super(props)
    this.state = {
      requestFailed: false
    }
  }

 componentDidMount() {
    var url_funds = urlForFunds + 'function=TIME_SERIES_DAILY_ADJUSTED' + '&symbol='+this.props.symbol+'&apikey='+apikey;

    fetch(url_funds)
      .then(response => {
        if (!response.ok) {
          throw Error("Network request failed")
        }

        return response
      })
      .then(d => d.json())
      .then(d => {
        this.setState({
          fundsData: d
        })
      }, () => {
        this.setState({
          requestFailed: true
        })
      })
  }

  render() {

    if (this.state.requestFailed) return <p>Failed!</p>
    if (!this.state.fundsData) return <p>Loading...</p>
      console.log(this.state.fundsData)
    var time_series = this.state.fundsData['Time Series (Daily)'];
    var labels = new Array();
    var values = new Array();

    for (var key in time_series) {
      labels.push(key);
      values.push(Number(time_series[key]['1. open']));
    }


  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Time Series : ' + this.props.symbol,
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: values
      }
    ]
  };

        return (
      <div>
        <Line data={data}  width= "600" height="250"/>
      </div>
    )
  }
}

export default Funds;




