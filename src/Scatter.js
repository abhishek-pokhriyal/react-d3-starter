import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { scaleLinear } from 'd3-scale';
import { extent } from 'd3-array';
import AxisLeft from './AxisLeft';
import AxisBottom from './AxisBottom';

function RandomData() {
  const data = [...Array(100)].map((e, i) => {
    return {
      x: Math.random() * 40,
      y: Math.random() * 40,
      temparature: Math.random() * 500
    };
  });
  return data;
}

function Scatter() {
  const [data, setData] = useState(RandomData());
  const [open, toggle] = useState(false);
  const props = useSpring({
    from: { r: 0, fill: "lightblue" },
    to: { r: open ? 10 : 5, fill: open ? "purple" : "lightblue" }
  });

  const w = 600,
    h = 600,
    margin = {
      top: 40,
      bottom: 40,
      left: 40,
      right: 40
    };

  const width = w - margin.right - margin.left,
    height = h - margin.top - margin.bottom;

  const xScale = scaleLinear()
    .domain(extent(data, d => d.x))
    .range([0, width]);

  const yScale = scaleLinear()
    .domain(extent(data, d => d.y))
    .range([height, 0]);

  function handleClick(e) {
    setData(RandomData());
    if (open) {
      toggle(false);
    } else {
      toggle(true);
    }
  }

  const circles = data.map((d, i) => (
    <animated.circle
      key={i}
      r={props.r}
      cx={xScale(d.x)}
      cy={yScale(d.y)}
      style={{ fill: props.fill }}
    />
  ));

  return (
    <div>
      <h1>React + D3 + React Spring</h1>
      <button onClick={handleClick}>Click Me</button>
      <svg width={w} height={h}>
        <g transform={`translate(${margin.left},${margin.top})`}>
          <AxisLeft yScale={yScale} width={width} />
          <AxisBottom xScale={xScale} height={height} />
          {circles}
        </g>
      </svg>
    </div>
  );
}

export default Scatter;
