import { Layers, BatteryCharging, Dna, Bot, Cpu, Zap, Search } from 'lucide-react';

const CATEGORIES = [
  { id: 'ALL', label: 'All Sectors', icon: Layers },
  { id: 'Clean Tech / DLE', label: 'Clean Tech / DLE', icon: Zap },
  { id: 'Fintech / Protocol', label: 'Fintech / Protocol', icon: Cpu },
  { id: 'Battery Tech', label: 'Battery Tech', icon: BatteryCharging },
  { id: 'Synthetic Biotech', label: 'Biotech', icon: Dna },
  { id: 'Robotics & AI', label: 'Robotics', icon: Bot },
  { id: 'Quantum Computing', label: 'Quantum', icon: Cpu }
];

export default function CategoryFilter() {
  const { activeCategory, setActiveCategory, searchQuery, setSearchQuery } = useMarket();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px' }}>
      
      {/* Real-Time Search Bar */}
      <div style={{ position: 'relative', width: '100%' }}>
        <Search size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
        <input
          type="text"
          placeholder="Search startups, tickers (WSEI, BENCH), technologies, or milestone keywords..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: '100%',
            padding: '12px 16px 12px 44px',
            background: '#FFFFFF',
            border: '1px solid #CBD5E1',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.875rem',
            outline: 'none',
            boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
            color: '#0F172A'
          }}
        />
      </div>

      {/* Category Filter Pills */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', overflowX: 'auto', paddingBottom: '4px' }}>
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
                background: isActive ? 'var(--gradient-brand)' : '#FFFFFF',
                color: isActive ? '#FFF' : '#0F172A',
                border: isActive ? 'none' : '1px solid #CBD5E1'
              }}
            >
              <Icon size={15} color={isActive ? '#FFF' : 'var(--accent-blue)'} />
              {cat.label}
            </button>
          );
        })}
      </div>

    </div>
  );
}
