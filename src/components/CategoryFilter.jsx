import React from 'react';
import { useMarket } from '../context/MarketContext';
import { Layers, BatteryCharging, Dna, Bot, Cpu, Zap } from 'lucide-react';

const CATEGORIES = [
  { id: 'ALL', label: 'All Sectors', icon: Layers },
  { id: 'Clean Tech / DLE', label: 'Clean Tech / DLE', icon: Zap },
  { id: 'Battery Tech', label: 'Battery Tech', icon: BatteryCharging },
  { id: 'Synthetic Biotech', label: 'Biotech', icon: Dna },
  { id: 'Robotics & AI', label: 'Robotics', icon: Bot },
  { id: 'Quantum Computing', label: 'Quantum', icon: Cpu }
];

export default function CategoryFilter() {
  const { activeCategory, setActiveCategory } = useMarket();

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', overflowX: 'auto', paddingBottom: '8px', marginBottom: '24px' }}>
      {CATEGORIES.map(cat => {
        const Icon = cat.icon;
        const isActive = activeCategory === cat.id;

        return (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`btn ${isActive ? 'btn-primary' : 'btn-secondary'}`}
            style={{
              fontSize: '0.85rem',
              padding: '8px 16px',
              borderRadius: 'var(--radius-full)',
              whiteSpace: 'nowrap',
              background: isActive ? 'var(--gradient-brand)' : 'rgba(255, 255, 255, 0.04)',
              color: isActive ? '#000' : 'var(--text-main)',
              border: isActive ? 'none' : '1px solid var(--border-color)'
            }}
          >
            <Icon size={15} color={isActive ? '#000' : 'var(--accent-cyan)'} />
            {cat.label}
          </button>
        );
      })}
    </div>
  );
}
