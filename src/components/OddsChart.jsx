import React from 'react';
import { Activity } from 'lucide-react';

export default function OddsChart({ history, yesPrice, noPrice }) {
  if (!history || history.length === 0) return null;

  // SVG Chart bounds
  const width = 540;
  const height = 180;
  const padding = 25;

  const minProb = Math.min(...history.map(h => h.probability), 20);
  const maxProb = Math.max(...history.map(h => h.probability), 90);

  const getX = (index) => padding + (index / (history.length - 1 || 1)) * (width - 2 * padding);
  const getY = (val) => height - padding - ((val - minProb) / (maxProb - minProb || 1)) * (height - 2 * padding);

  // Generate SVG path string
  const points = history.map((h, i) => `${getX(i)},${getY(h.probability)}`).join(' ');
  const areaPath = `M ${getX(0)},${height - padding} L ${points} L ${getX(history.length - 1)},${height - padding} Z`;

  const currentProb = Math.round(yesPrice * 100);

  return (
    <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 'var(--radius-md)', padding: '20px', position: 'relative', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
      
      {/* Header telemetry info */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Activity size={16} color="var(--accent-blue)" />
            <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Crowd Belief Score
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginTop: '4px' }}>
            <span style={{ fontSize: '1.8rem', fontWeight: '800', fontFamily: 'var(--font-mono)', color: 'var(--yes-color)' }}>
              {currentProb}%
            </span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
               Crowd Confidence (${yesPrice.toFixed(2)})
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', fontSize: '0.8rem' }}>
          <div style={{ padding: '6px 12px', background: 'var(--yes-bg)', border: '1px solid var(--yes-border)', borderRadius: '8px', color: 'var(--yes-color)', fontWeight: '700' }}>
            YES ${yesPrice.toFixed(2)}
          </div>
          <div style={{ padding: '6px 12px', background: 'var(--no-bg)', border: '1px solid var(--no-border)', borderRadius: '8px', color: 'var(--no-color)', fontWeight: '700' }}>
            NO ${noPrice.toFixed(2)}
          </div>
        </div>
      </div>

      {/* SVG Interactive Line Chart */}
      <div style={{ width: '100%', overflowX: 'auto' }}>
        <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', height: 'auto', display: 'block' }}>
          <defs>
            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#059669" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#059669" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          <line x1={padding} y1={padding} x2={width - padding} y2={padding} stroke="rgba(0,0,0,0.06)" strokeDasharray="3 3" />
          <line x1={padding} y1={height/2} x2={width - padding} y2={height/2} stroke="rgba(0,0,0,0.06)" strokeDasharray="3 3" />
          <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="rgba(0,0,0,0.06)" strokeDasharray="3 3" />

          {/* Area Fill */}
          <path d={areaPath} fill="url(#chartGradient)" />

          {/* Line Path */}
          <polyline
            fill="none"
            stroke="var(--accent-emerald)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={points}
          />

          {/* Data Nodes */}
          {history.map((h, i) => (
            <g key={i}>
              <circle
                cx={getX(i)}
                cy={getY(h.probability)}
                r="5"
                fill="#FFFFFF"
                stroke="var(--accent-emerald)"
                strokeWidth="2.5"
              />
              <text
                x={getX(i)}
                y={height - 6}
                fill="var(--text-muted)"
                fontSize="10"
                fontFamily="var(--font-mono)"
                textAnchor="middle"
              >
                {h.time}
              </text>
            </g>
          ))}
        </svg>
      </div>

    </div>
  );
}
