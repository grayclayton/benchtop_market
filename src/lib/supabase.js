import { createClient } from '@supabase/supabase-js';

// Supabase Configuration
// To connect your own Supabase project:
// 1. Create a free project at https://supabase.com
// 2. Create a table called `startup_submissions` with the SQL below
// 3. Set your VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env

/*
SQL to create the startup_submissions table:

CREATE TABLE startup_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  
  -- Startup Identity
  name TEXT NOT NULL,
  ticker TEXT NOT NULL,
  category TEXT NOT NULL,
  tagline TEXT,
  logo_bg TEXT DEFAULT 'linear-gradient(135deg, #00F2FE 0%, #9900F0 100%)',
  
  -- Founder Info
  founder_name TEXT NOT NULL,
  founder_role TEXT,
  founder_email TEXT NOT NULL,
  founder_linkedin TEXT,
  team_size TEXT,
  
  -- Story
  story_headline TEXT,
  story_subtitle TEXT,
  story_problem TEXT,
  story_solution TEXT,
  
  -- Milestone
  milestone_title TEXT NOT NULL,
  milestone_description TEXT,
  target_metric TEXT,
  deadline TEXT,
  
  -- Lab & Funding
  lab_name TEXT,
  escrow_target NUMERIC DEFAULT 25000
);

-- Enable public inserts (anyone can submit)
ALTER TABLE startup_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a startup"
  ON startup_submissions FOR INSERT
  WITH CHECK (true);

-- Only approved submissions are publicly readable
CREATE POLICY "Public can read approved submissions"
  ON startup_submissions FOR SELECT
  USING (status = 'approved');
*/

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Only create client if credentials are configured
export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

export const isSupabaseConfigured = () => !!(supabaseUrl && supabaseAnonKey);

/**
 * Submit a new startup application to Supabase.
 * Returns { data, error }.
 */
export async function submitStartupApplication(formData) {
  if (!supabase) {
    console.warn('Supabase not configured — submission saved locally only.');
    return { data: null, error: 'Supabase not configured' };
  }

  const { data, error } = await supabase
    .from('startup_submissions')
    .insert([{
      name: formData.name,
      ticker: formData.ticker.toUpperCase(),
      category: formData.category,
      tagline: formData.tagline,
      founder_name: formData.founderName,
      founder_role: formData.founderRole,
      founder_email: formData.founderEmail,
      founder_linkedin: formData.founderLinkedin,
      team_size: formData.teamSize,
      story_headline: formData.storyHeadline || formData.name,
      story_subtitle: formData.tagline,
      story_problem: formData.storyProblem,
      story_solution: formData.storySolution,
      milestone_title: formData.milestoneTitle,
      milestone_description: formData.milestoneDescription,
      target_metric: formData.targetMetric,
      deadline: formData.deadline,
      lab_name: formData.labName,
      escrow_target: parseFloat(formData.escrowTarget) || 25000,
      status: 'pending'
    }])
    .select();

  return { data, error };
}

/**
 * Fetch all approved startup submissions from Supabase.
 * Returns array of startup objects formatted for the app.
 */
export async function fetchApprovedStartups() {
  if (!supabase) return [];

  const { data, error } = await supabase
    .from('startup_submissions')
    .select('*')
    .eq('status', 'approved')
    .order('created_at', { ascending: false });

  if (error || !data) return [];

  return data.map(row => ({
    id: `supabase-${row.id}`,
    name: row.name,
    ticker: row.ticker,
    category: row.category,
    tagline: row.tagline || '',
    logoBg: row.logo_bg || 'linear-gradient(135deg, #00F2FE 0%, #9900F0 100%)',
    story: row.story_problem ? {
      headline: row.story_headline || row.name,
      subtitle: row.story_subtitle || row.tagline,
      problem: row.story_problem,
      solution: row.story_solution || '',
      novelty: '',
      keyStats: []
    } : null,
    founderVerification: {
      status: 'PENDING_REVIEW',
      level: 'LEVEL_1_KYC',
      tierLabel: 'Pending Verification',
      isIdentityVerified: false,
      isCollateralBondStaked: false,
      stakedAmount: 0,
      isPatentVerified: false,
      verificationBadge: '⏳ Pending Review'
    },
    milestone: {
      title: row.milestone_title,
      description: row.milestone_description || '',
      targetMetric: row.target_metric || 'TBD',
      deadline: row.deadline || '2027-06-30',
      stage: 'Intake Protocol Pending'
    },
    testingLab: {
      name: row.lab_name || 'Lab Assignment Pending',
      accreditation: 'Accreditation Pending',
      location: 'TBD',
      escrowTarget: row.escrow_target || 25000,
      escrowCollected: 0,
      intakeReleased: false,
      finalReleased: false,
      matchingSponsors: []
    },
    market: {
      yesPrice: 0.50,
      noPrice: 0.50,
      totalVolume: 0,
      totalTrades: 0,
      status: 'ACTIVE',
      history: [{ time: 'Launch', probability: 50 }]
    },
    certificate: {
      hash: `0x${row.id.replace(/-/g, '')}`,
      ipfsUri: `ipfs://Qm${row.id.replace(/-/g, '').substring(0, 20)}`,
      verificationStatus: 'IN_TESTING',
      livenessDaysRemaining: 14,
      telemetry: []
    },
    investorIntel: {
      score: 50,
      riskRating: 'UNRATED',
      leadInvestor: 'Open for Lead',
      founderStakedCollateral: 0,
      sentimentIndex: 50,
      tags: [row.category, 'Community Submission'],
      team: {
        founder: row.founder_name,
        role: row.founder_role || 'Founder',
        bio: '',
        teamSize: row.team_size || 'Early Team',
        patentsFiled: [],
        openRound: 'Pre-Seed',
        founderEmail: row.founder_email,
        linkedin: row.founder_linkedin || ''
      }
    }
  }));
}
