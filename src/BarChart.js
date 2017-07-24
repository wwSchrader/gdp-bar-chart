import React, { Component } from 'react';
import { scaleLinear } from 'd3-scale';
import { max } from 'd3-array';
import { select } from 'd3-selection';
import { axisBottom, axisLeft } from 'd3-axis';
import { timeFormat, timeParse } from 'd3-time-format';

class BarChart extends Component {
    constructor(props) {
        super(props);
        this.dateFormat = timeFormat("%Y-%m-%d");
        this.dateParse = timeParse("%Y-%m-%d");
        this.createBarChart = this.createBarChart.bind(this);
    }

    getGdpArray(dataArray) {
        var newDataArray = [];
        for(let i = 0; i < dataArray.length; i++) {
            newDataArray.push(dataArray[i][1]);
        }
        return newDataArray;
    }

    getDateArray(dateArray) {
        var newDateArray = [];
        for(let i = 0; i < dateArray.length; i++) {
            newDateArray.push(this.dateParse(dateArray[i][0]));
        }
        return newDateArray;
    }

    createBarChart() {
        const node = this.node



        const gdpArray = this.getGdpArray(this.props.data);
        const dateArray = this.getDateArray(this.props.data);


        const yMax = max(gdpArray);



        const xScale = scaleLinear()
            .domain([dateArray[0], dateArray[dateArray.length - 1]])
            .range([0, dateArray.length]);

        const yScale = scaleLinear()
         .domain([0, yMax])
         .range([0, this.props.size[1]]);

        const axisOnBottom = axisBottom(xScale)
            .tickFormat(timeFormat("%Y"))
            .ticks();



        select(node)
          .selectAll('rect')
          .data(this.props.data)
          .enter()
          .append('rect');

        select(node)
          .selectAll('rect')
          .data(this.props.data)
          .exit()
          .remove();

        select(node)
            .append('g')
            .attr("transform", "translate(0," + this.props.size[1] +")")
            .call(axisOnBottom);


        select(node)
          .selectAll('rect')
          .data(this.props.data)
          .style('fill', '#fe9922')
          .attr('x', (d,i) => i )
          .attr('y', d => this.props.size[1] - yScale(d[1]))
          .attr('height', d => yScale(d[1]))
          .attr('width', 100);
    }

    componentDidMount() {
        this.createBarChart();
    }

    componentDidUpdate() {
        this.createBarChart();
    }



    render() {
        return(
            <svg ref={node => this.node = node} width={this.props.size[0] + 30} height={this.props.size[1] + 30}></svg>
        );
    }
}

export default BarChart;