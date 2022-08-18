import React from "react";
import { Group } from "@visx/group";
import { curveBasis, curveNatural, curveMonotoneX } from "@visx/curve";
import { Glyph as CustomGlyph } from "@visx/glyph";
import { LinePath } from "@visx/shape";
import { Threshold } from "@visx/threshold";
import { scaleTime, scaleLinear, scaleBand } from "@visx/scale";
import { AxisLeft, AxisBottom } from "@visx/axis";
import { GridRows, GridColumns } from "@visx/grid";
import { Point } from "@visx/point";

import cityTemperature, {
  CityTemperature,
} from "@visx/mock-data/lib/mocks/cityTemperature";

export const background = "#f3f3f3";

const width = 800;
const height = 400;
const margin = { top: 40, right: 30, bottom: 50, left: 40 };
const xMax = width - margin.left - margin.right;
const yMax = height - margin.top - margin.bottom;

const data = [
  { name: "1M", value: 1.1 },
  { name: "3M", value: 2.2 },
  { name: "6M", value: 3.2 },
  { name: "1Y", value: 4.5 },
  { name: "2Y", value: 4.7 },
  { name: "3Y", value: 4.3 },
  { name: "5Y", value: 3.5 },
  { name: "7Y", value: 3.3 },
  { name: "10Y", value: 3.2 },
  { name: "20Y", value: 3.1 },
  { name: "30Y", value: 3.0 },
];

// scales
const xScale = scaleBand<any>({
  round: true,
  domain: data.map((d) => d.name),
  range: [0, xMax],
  padding: 1,
});
const yScale = scaleLinear<number>({
  domain: [0, Math.max(...data.map((d: any) => d.value)) + 1],
  nice: true,
  range: [yMax, 0],
});

export default function NewChart({}: any) {
  console.log("domain", xScale.domain());
  console.log("bw", xScale.bandwidth());
  console.log("range", xScale.range());
  console.log("align", xScale.align());

  return (
    <div>
      <svg width={width} height={height}>
        <rect
          x={0}
          y={0}
          width={width}
          height={height}
          fill={background}
          rx={14}
        />
        <Group left={margin.left} top={margin.top}>
          <GridColumns
            scale={xScale}
            width={xMax}
            height={yMax}
            stroke="#e0e0e0"
          />
          <GridRows
            scale={yScale}
            width={xMax}
            height={yMax}
            stroke="#e0e0e0"
          />

          <LinePath
            data={data}
            curve={curveMonotoneX}
            x={(d: any) => xScale(d.name) ?? 0}
            y={(d: any) => yScale(d.value) ?? 0}
            stroke="#222"
            strokeWidth={5}
          />

          {data.map((d: any, i: any) => {
            const left = xScale(d.name);
            const top = yScale(d.value);
            return (
              <g key={`line-glyph-${i}`}>
                <CustomGlyph left={left} top={top}>
                  <rect
                    transform="translate(-15 -15)"
                    width="30"
                    height="30"
                    fill="black"
                  >
                    {/* <text font-size="20" fill="red">
                      {d.value} */}
                    {/* </text> */}
                  </rect>
                </CustomGlyph>
              </g>
            );
          })}
          {/* <line x1={xMax} x2={xMax} y1={0} y2={yMax} stroke="#e0e0e0" /> */}
          <AxisBottom
            top={yMax}
            scale={xScale}
            numTicks={width > 520 ? 10 : 5}
          />
          <AxisLeft scale={yScale} />
        </Group>
      </svg>
    </div>
  );
}
