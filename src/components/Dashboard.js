import React, { useState, useEffect } from 'react';
import { fetchData } from '../api/api';
import * as d3 from 'd3';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    fetchData(filters).then(setData);
  }, [filters]);

  useEffect(() => {
    if (data.length > 0) {
      // D3 code to visualize data
      d3.select('#chart').selectAll('*').remove();
      const svg = d3.select('#chart').append('svg')
        .attr('width', 800)
        .attr('height', 400);

      svg.selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('cx', d => d.intensity * 10)
        .attr('cy', d => d.likelihood * 10)
        .attr('r', 5)
        .attr('fill', 'blue');
    }
  }, [data]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h1>Data Visualization Dashboard</h1>
      <div>
        <input name="end_year" onChange={handleFilterChange} placeholder="End Year" />
        <input name="topic" onChange={handleFilterChange} placeholder="Topic" />
        <input name="sector" onChange={handleFilterChange} placeholder="Sector" />
        <input name="region" onChange={handleFilterChange} placeholder="Region" />
        <input name="pestle" onChange={handleFilterChange} placeholder="PESTLE" />
        <input name="source" onChange={handleFilterChange} placeholder="Source" />
        <input name="swot" onChange={handleFilterChange} placeholder="SWOT" />
        <input name="country" onChange={handleFilterChange} placeholder="Country" />
        <input name="city" onChange={handleFilterChange} placeholder="City" />
      </div>
      <div id="chart"></div>
    </div>
  );
};

export default Dashboard;
