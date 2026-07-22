"use client";

// =============================================================================
// ChartSection — SVG line chart with tab toggle and interactive tooltip
// Built from scratch with SVG — no external chart library needed
// =============================================================================

import { useState, useRef, useCallback } from "react";
import { mockChartData } from "@/data/mock-data";
import type { ChartTab } from "@/types";

/** Chart configuration constants */
const CHART_PADDING = { top: 20, right: 20, bottom: 40, left: 50 };
const Y_MAX = 30_000_000;
const Y_TICKS = [0, 10_000_000, 20_000_000, 30_000_000];

/** Formats large numbers for y-axis labels (e.g. 10000000 → "10M") */
function formatYLabel(value: number): string {
  if (value === 0) return "0";
  return `${value / 1_000_000}M`;
}

/** Formats numbers with commas for tooltip (e.g. 18256598 → "18,256,598") */
function formatNumber(value: number): string {
  return value.toLocaleString();
}

/**
 * Generates a smooth SVG path (cubic bezier) through a set of points.
 * This creates the smooth curves seen in the chart design.
 */
function generateSmoothPath(points: { x: number; y: number }[]): string {
  if (points.length < 2) return "";

  let path = `M ${points[0].x} ${points[0].y}`;

  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    // Control point offset is 1/3 of the horizontal distance
    const cpOffset = (curr.x - prev.x) / 3;
    path += ` C ${prev.x + cpOffset} ${prev.y}, ${curr.x - cpOffset} ${curr.y}, ${curr.x} ${curr.y}`;
  }

  return path;
}

export function ChartSection() {
  const [activeTab, setActiveTab] = useState<ChartTab>("totalUsers");
  const [tooltip, setTooltip] = useState<{
    x: number;
    y: number;
    value: number;
    visible: boolean;
  }>({ x: 0, y: 0, value: 0, visible: false });

  const svgRef = useRef<SVGSVGElement>(null);

  // Responsive chart dimensions — SVG viewBox makes it scale
  const viewBoxWidth = 700;
  const viewBoxHeight = 350;

  const chartWidth = viewBoxWidth - CHART_PADDING.left - CHART_PADDING.right;
  const chartHeight = viewBoxHeight - CHART_PADDING.top - CHART_PADDING.bottom;

  // Compute data points for both series
  const dataPoints = mockChartData.map((point, i) => {
    const x = CHART_PADDING.left + (i / (mockChartData.length - 1)) * chartWidth;
    const yThisMonth =
      CHART_PADDING.top + chartHeight - (point.thisMonth / Y_MAX) * chartHeight;
    const yLastMonth =
      CHART_PADDING.top + chartHeight - (point.lastMonth / Y_MAX) * chartHeight;

    return { x, yThisMonth, yLastMonth, ...point };
  });

  const thisMonthPoints = dataPoints.map((d) => ({ x: d.x, y: d.yThisMonth }));
  const lastMonthPoints = dataPoints.map((d) => ({ x: d.x, y: d.yLastMonth }));

  const thisMonthPath = generateSmoothPath(thisMonthPoints);
  const lastMonthPath = generateSmoothPath(lastMonthPoints);

  // Create filled area path for "this month" line
  const thisMonthAreaPath = `${thisMonthPath} L ${thisMonthPoints[thisMonthPoints.length - 1].x} ${CHART_PADDING.top + chartHeight} L ${thisMonthPoints[0].x} ${CHART_PADDING.top + chartHeight} Z`;

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<SVGSVGElement>) => {
      if (!svgRef.current) return;

      const svgRect = svgRef.current.getBoundingClientRect();
      const mouseX =
        ((e.clientX - svgRect.left) / svgRect.width) * viewBoxWidth;

      // Find the closest data point
      let closestIdx = 0;
      let closestDist = Infinity;
      dataPoints.forEach((point, i) => {
        const dist = Math.abs(point.x - mouseX);
        if (dist < closestDist) {
          closestDist = dist;
          closestIdx = i;
        }
      });

      const point = dataPoints[closestIdx];
      if (closestDist < 60) {
        setTooltip({
          x: point.x,
          y: point.yLastMonth,
          value: point.lastMonth,
          visible: true,
        });
      } else {
        setTooltip((prev) => ({ ...prev, visible: false }));
      }
    },
    [dataPoints]
  );

  const handleMouseLeave = useCallback(() => {
    setTooltip((prev) => ({ ...prev, visible: false }));
  }, []);

  return (
    <div className="rounded-2xl bg-surface border border-border p-4 sm:p-6">
      {/* Tab toggle + Legend */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        {/* Tabs */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setActiveTab("totalUsers")}
            className={`px-3 py-1.5 text-sm font-semibold rounded-lg transition-colors ${
              activeTab === "totalUsers"
                ? "text-text-primary"
                : "text-text-muted hover:text-text-secondary"
            }`}
          >
            Total Users
          </button>
          <div className="h-5 w-px bg-border mx-1" />
          <button
            onClick={() => setActiveTab("appointments")}
            className={`px-3 py-1.5 text-sm font-semibold rounded-lg transition-colors ${
              activeTab === "appointments"
                ? "text-text-primary"
                : "text-text-muted hover:text-text-secondary"
            }`}
          >
            Appointments
          </button>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-chart-line-1" />
            <span className="text-xs text-text-secondary">This month</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-chart-line-2" />
            <span className="text-xs text-text-secondary">Last month</span>
          </div>
        </div>
      </div>

      {/* SVG Chart */}
      <div className="relative w-full">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
          className="w-full h-auto"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          aria-label="Line chart showing user trends"
        >
          {/* Grid lines */}
          {Y_TICKS.map((tick) => {
            const y =
              CHART_PADDING.top + chartHeight - (tick / Y_MAX) * chartHeight;
            return (
              <g key={tick}>
                <line
                  x1={CHART_PADDING.left}
                  y1={y}
                  x2={viewBoxWidth - CHART_PADDING.right}
                  y2={y}
                  stroke="#e2e8f0"
                  strokeWidth={1}
                />
                <text
                  x={CHART_PADDING.left - 10}
                  y={y + 4}
                  textAnchor="end"
                  className="fill-text-muted text-[11px]"
                >
                  {formatYLabel(tick)}
                </text>
              </g>
            );
          })}

          {/* X-axis month labels */}
          {dataPoints.map((point) => (
            <text
              key={point.month}
              x={point.x}
              y={viewBoxHeight - 8}
              textAnchor="middle"
              className="fill-text-muted text-[11px]"
            >
              {point.month}
            </text>
          ))}

          {/* Area fill under "this month" line */}
          <path
            d={thisMonthAreaPath}
            fill="url(#areaGradient)"
            opacity={0.08}
          />

          {/* Gradient definition for area fill */}
          <defs>
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1e293b" stopOpacity={1} />
              <stop offset="100%" stopColor="#1e293b" stopOpacity={0} />
            </linearGradient>
          </defs>

          {/* "This month" line (dark) */}
          <path
            d={thisMonthPath}
            fill="none"
            stroke="var(--color-chart-line-1)"
            strokeWidth={2.5}
            strokeLinecap="round"
          />

          {/* "Last month" line (blue) */}
          <path
            d={lastMonthPath}
            fill="none"
            stroke="var(--color-chart-line-2)"
            strokeWidth={2.5}
            strokeLinecap="round"
          />

          {/* Dashed extension for projected data (last 2 points of "this month") */}
          {thisMonthPoints.length >= 2 && (
            <line
              x1={thisMonthPoints[thisMonthPoints.length - 2].x}
              y1={thisMonthPoints[thisMonthPoints.length - 2].y}
              x2={thisMonthPoints[thisMonthPoints.length - 1].x}
              y2={thisMonthPoints[thisMonthPoints.length - 1].y}
              stroke="var(--color-chart-line-1)"
              strokeWidth={2.5}
              strokeDasharray="6 4"
              strokeLinecap="round"
            />
          )}

          {/* Data point dots for "last month" */}
          {lastMonthPoints.map((point, i) => (
            <circle
              key={`last-${i}`}
              cx={point.x}
              cy={point.y}
              r={3}
              fill="var(--color-chart-line-2)"
              className="transition-all duration-150"
            />
          ))}

          {/* Tooltip */}
          {tooltip.visible && (
            <g>
              {/* Vertical guide line */}
              <line
                x1={tooltip.x}
                y1={CHART_PADDING.top}
                x2={tooltip.x}
                y2={CHART_PADDING.top + chartHeight}
                stroke="#94a3b8"
                strokeWidth={1}
                strokeDasharray="4 4"
                opacity={0.5}
              />
              {/* Tooltip bubble */}
              <rect
                x={tooltip.x - 45}
                y={tooltip.y - 30}
                width={90}
                height={24}
                rx={6}
                fill="#1e293b"
              />
              <text
                x={tooltip.x}
                y={tooltip.y - 14}
                textAnchor="middle"
                className="fill-white text-[11px] font-semibold"
              >
                {formatNumber(tooltip.value)}
              </text>
              {/* Highlighted dot */}
              <circle
                cx={tooltip.x}
                cy={tooltip.y}
                r={5}
                fill="var(--color-chart-line-2)"
                stroke="white"
                strokeWidth={2}
              />
            </g>
          )}
        </svg>
      </div>
    </div>
  );
}
