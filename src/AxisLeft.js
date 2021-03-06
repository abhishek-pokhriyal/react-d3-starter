import React from 'react';

function AxisLeft({ yScale, width }) {
  const axis = yScale.ticks(5).map((d, i) => (
    <g key={i} className="y-tick">
      <line
        style={{ stroke: "#e4e5eb" }}
        y1={yScale(d)}
        y2={yScale(d)}
        x2={width}
      />
      <text style={{ fontSize: 12 }} x={-20} dy=".32em" y={yScale(d)}>
        {d}
      </text>
    </g>
  ));
  return <>{axis}</>;
}

export default AxisLeft;
