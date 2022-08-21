import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import styled from "styled-components";
import { Group } from "@visx/group";
import { curveMonotoneX } from "@visx/curve";
import { Glyph as CustomGlyph } from "@visx/glyph";
import { LinePath } from "@visx/shape";
import { scaleLinear, scaleBand } from "@visx/scale";
import { AxisLeft, AxisBottom } from "@visx/axis";
import { GridRows, GridColumns } from "@visx/grid";
import { Text } from "@visx/text";
import { useStore } from "../store";
import moment from "moment";

const Svg = styled.svg`
  text {
    font-weight: bold;
  }
`;

export const background = "#f3f3f3";

const width = 800;
const height = 400;
const margin = { top: 70, right: 30, bottom: 50, left: 40 };
const xMax = width - margin.left - margin.right;
const yMax = height - margin.top - margin.bottom;

export const YieldCurve = observer(() => {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const store = useStore();

  useEffect(() => {
    if (!store.yields) {
      store.fetchYields();
      return;
    }
    setCurrentIndex(store.yields.length - 1);
  }, [store.yields]);

  if (!store.yields) return <></>;
  if (!currentIndex) return <></>;

  // scales
  const xScale = scaleBand<any>({
    round: true,
    domain: store.yields[currentIndex].treasuries.map((d: any) => d.name),
    range: [0, xMax],
    padding: 1,
  });
  const yScale = scaleLinear<number>({
    domain: [
      Math.min(
        ...store.yields[currentIndex].treasuries.map((d: any) => d.value)
      ) - 0.1,
      Math.max(
        ...store.yields[currentIndex].treasuries.map((d: any) => d.value)
      ) + 0.1,
    ],
    nice: true,
    range: [yMax, 0],
  });

  return (
    <>
      <Svg width={width} height={height}>
        <rect
          x={0}
          y={0}
          width={width}
          height={height}
          fill={background}
          rx={10}
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
            data={store.yields[currentIndex].treasuries}
            curve={curveMonotoneX}
            x={(d: any) => xScale(d.name) ?? 0}
            y={(d: any) => yScale(d.value) ?? 0}
            stroke="#222"
            strokeWidth={5}
          />

          {store.yields[currentIndex].treasuries.map((d: any, i: any) => {
            const left = xScale(d.name);
            const top = yScale(d.value);
            return (
              <CustomGlyph key={i} left={left} top={top}>
                <svg transform="translate(-15 -15)" height="30" width="30">
                  <rect
                    rx="5"
                    fill="black"
                    x="0"
                    y="0"
                    width="30"
                    height="30"
                  />
                  <text
                    x="15"
                    y="18"
                    fill="white"
                    textAnchor="middle"
                    fontSize="11"
                    alignmentBaseline="central"
                  >
                    {d.name}
                  </text>
                </svg>
              </CustomGlyph>
            );
          })}
          <line x1={xMax} x2={xMax} y1={0} y2={yMax} stroke="#e0e0e0" />

          <AxisLeft strokeWidth="2" scale={yScale} />
        </Group>
        <Text
          x={400}
          y={25}
          width={800}
          style={{ fontWeight: "bold", fontSize: 22 }}
          verticalAnchor="start"
          textAnchor="middle"
        >
          US Treasuries Yield Curve
        </Text>

        <Text
          x={400}
          y={370}
          width={800}
          style={{ fontWeight: "bold", fontSize: 22 }}
          verticalAnchor="start"
          textAnchor="middle"
        >
          {moment(store.yields[currentIndex].date).format("DD-MMM-YYYY")}
        </Text>
      </Svg>
      <div onClick={() => setCurrentIndex(currentIndex - 1)}>prev</div>
      <div
        onClick={() =>
          currentIndex < store.yields.length - 1 &&
          setCurrentIndex(currentIndex + 1)
        }
      >
        next
      </div>
    </>
  );
});
