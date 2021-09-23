import React, { Component } from "react";
import axios from "axios";
import { url_backend } from "../../config/url";
import { Bar } from "react-chartjs-2";

export default class Graph extends Component {
  componentDidMount() {
    this.getGraph(this.props.id_warehouse);
  }

  constructor(props) {
    super(props);
    this.state = {
      data: "",
      options: {
        indexAxis: "x",
        elements: {
          bar: {
            borderWidth: 2,
          },
        },
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "Transaksi Penjualan 2021",
          },
        },
      }
    };
    this.getGraph = this.getGraph.bind(this);
  }

  getGraph = (id_warehouse) => {
    axios
      .get(`${url_backend}/sales_report/graph?warehouse=${id_warehouse}`)
      .then((res) => {
        let transactionsData = res.data.graph;
        let transactionLabels = [];
        let transactionData = [];
        transactionsData.forEach((graph) => {
          transactionLabels.push(graph.month)
          transactionData.push(graph.count)
        })
        this.setState({
          data: {
            labels: transactionLabels,
            datasets: [
              {
                label: "# of Transaction",
                data: transactionData,
                backgroundColor: ["rgba(54, 162, 235, 0.4)"],
                borderColor: ["rgba(54, 162, 235, 1)"],
                borderWidth: 1,
              },
            ],
          }
        })
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        <div className="card">
          {/* /.card-header */}
          <div className="card-body" style={{ display: "block" }}>
            <Bar data={this.state.data} options={this.state.options} />
          </div>
        </div>
      </div>
    );
  }
}
