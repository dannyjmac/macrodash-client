/* eslint-disable jsx-a11y/accessible-emoji */
import React from "react";
import { Group } from "@visx/group";
import { Glyph as CustomGlyph } from "@visx/glyph";
import { LinePath } from "@visx/shape";
import genDateValue, {
  DateValue,
} from "@visx/mock-data/lib/generators/genDateValue";
import { scaleTime, scaleLinear, scaleBand } from "@visx/scale";
import { curveMonotoneX, curveBasis } from "@visx/curve";
import { AxisLeft, AxisBottom } from "@visx/axis";
import { Grid, GridColumns, GridRows } from "@visx/grid";

const defaultMargin = { top: 40, right: 40, bottom: 40, left: 40 };

const data1 = [
  {
    x: "30Y",
    y: 3.1,
  },
  {
    x: "20Y",
    y: 3.31,
  },
  {
    x: "10Y",
    y: 2.79,
  },
  {
    x: "7Y",
    y: 2.86,
  },
  {
    x: "5Y",
    y: 2.91,
  },
  {
    x: "3Y",
    y: 3.14,
  },
  {
    x: "2Y",
    y: 3.2,
  },
  {
    x: "1Y",
    y: 3.23,
  },
  {
    x: "6M",
    y: 3.13,
  },
  {
    x: "3M",
    y: 2.63,
  },
  {
    x: "1M",
    y: 2.2,
  },
];

// colors
export const primaryColor = "#8921e0";
export const secondaryColor = "#00f2ff";
const contrastColor = "#ffffff";

const data = [
  { name: "A", value: 100 },
  { name: "B", value: 200 },
  { name: "C", value: 500 },
  { name: "D", value: 150 },
  { name: "E", value: 300 },
];

// const getX = (d: any) => xScale(d.name);
// const getY = (d: any) => yScale(d.value);

const width = 800;
const height = 400;
const yMax = Math.max(...data.map((d) => d.value));

const xScale: any = scaleBand({
  domain: data.map((d) => d.name),
  range: [0, width],
});

const yScale: any = scaleLinear({
  domain: [0, yMax + 100],
  range: [height, 0],
});

export const SimpleChart = () => {
  return (
    <svg width={width} height={height}>
      <rect
        x={0}
        y={0}
        width={width}
        height={height}
        fill={primaryColor}
        rx={14}
      />
      <Group left={0} top={0}>
        {/* <AxisLeft scale={y} /> */}
        <LinePath
          data={data as any}
          x={(d: any) => xScale(d.name) ?? 0}
          y={(d: any) => yScale(d.value) ?? 0}
          stroke="white"
          strokeWidth={2}
          curve={curveMonotoneX}
        />
        {data.map((d: any, i: any) => {
          const left = xScale(d.name);
          const top = yScale(d.value);
          return (
            <g key={`line-glyph-${i}`}>
              <CustomGlyph left={left} top={top}>
                <circle r={10}>
                  {/* <text font-size="20" fill="red">
                  {d.value} */}
                  {/* </text> */}
                </circle>
              </CustomGlyph>
            </g>
          );
        })}

        <GridRows scale={yScale} width={width} height={yMax} stroke="#e0e0e0" />

        <GridColumns
          scale={xScale}
          width={width}
          height={yMax}
          stroke="#e0e0e0"
        />

        <AxisBottom top={yMax} scale={xScale} numTicks={width > 520 ? 10 : 5} />
        {/* <AxisBottom
          top={600}
          scale={(d: any) => xScale(d.name)}
          stroke={"purple"}
          tickStroke={"purple"}
          tickLabelProps={() => ({
            fill: "red",
            fontSize: 11,
            textAnchor: "middle",
          })}
        /> */}
      </Group>
    </svg>
  );
};
