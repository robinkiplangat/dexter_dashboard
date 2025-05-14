/**
 * Mock data for Dexter platform
 * Used for development and testing before backend integration
 */

// Dashboard data
export const dashboardData = {
  stats: [
    {
      title: "Active Narratives",
      value: "28",
      color: "bg-blue-100 text-blue-600",
      icon: "narratives"
    },
    {
      title: "Flagged Actors",
      value: "47",
      color: "bg-red-100 text-red-600",
      icon: "actors"
    },
    {
      title: "New Alerts",
      value: "5",
      color: "bg-yellow-100 text-yellow-600",
      icon: "alerts"
    },
    {
      title: "Data Freshness",
      value: "12m",
      color: "bg-green-100 text-green-600",
      icon: "clock"
    }
  ],
  recentActivity: [
    {
      id: "1",
      title: "New narrative detected",
      description: "Vote rigging claims in Lagos state polling stations",
      time: "10 minutes ago",
      icon: "alert",
      iconBg: "bg-blue-500"
    },
    {
      id: "2",
      title: "High activity actor detected",
      description: "User @election_truth showing coordinated behavior with 12 other accounts",
      time: "25 minutes ago",
      icon: "user",
      iconBg: "bg-red-500"
    },
    {
      id: "3",
      title: "Narrative volume spike",
      description: "Ethnic profiling narrative increased by 230% in the last hour",
      time: "45 minutes ago",
      icon: "chart",
      iconBg: "bg-yellow-500"
    },
    {
      id: "4",
      title: "New fact-check published",
      description: "Africa Check verified claims about ballot paper shortages",
      time: "1 hour ago",
      icon: "check",
      iconBg: "bg-green-500"
    }
  ],
  alerts: [
    {
      id: "1",
      title: "Sudden spike in 'ballot stuffing' narrative",
      time: "15 minutes ago",
      severity: "CRITICAL"
    },
    {
      id: "2",
      title: "New coordinated network detected",
      time: "45 minutes ago",
      severity: "HIGH"
    },
    {
      id: "3",
      title: "New influential actor promoting misinformation",
      time: "2 hours ago",
      severity: "MEDIUM"
    }
  ]
};

// Narratives data
export const narrativesData = {
  narratives: [
    {
      id: "1",
      title: "Ballot stuffing in Lagos polling stations",
      description: "Claims that electoral officials are stuffing ballot boxes in Lagos state",
      category: "VOTE_RIGGING",
      confidence: 0.87,
      firstDetected: "2025-05-12T08:30:00Z",
      lastUpdated: "2025-05-12T10:15:00Z",
      contentCount: 342,
      languages: ["en", "pcm"],
      volume: 342,
      trend: "increasing",
      platforms: ["twitter", "facebook", "whatsapp"]
    },
    {
      id: "2",
      title: "Ethnic profiling at northern polling stations",
      description: "Claims that voters from certain ethnic groups are being prevented from voting",
      category: "ETHNIC_PROFILING",
      confidence: 0.92,
      firstDetected: "2025-05-12T07:45:00Z",
      lastUpdated: "2025-05-12T11:30:00Z",
      contentCount: 267,
      languages: ["en", "ha"],
      volume: 267,
      trend: "stable",
      platforms: ["twitter", "telegram", "whatsapp"]
    },
    {
      id: "3",
      title: "Fake presidential statement on election postponement",
      description: "Fabricated statement claiming the president has postponed the election",
      category: "CANDIDATE_IMPERSONATION",
      confidence: 0.95,
      firstDetected: "2025-05-12T09:15:00Z",
      lastUpdated: "2025-05-12T12:00:00Z",
      contentCount: 189,
      languages: ["en"],
      volume: 189,
      trend: "decreasing",
      platforms: ["twitter", "facebook", "youtube"]
    },
    {
      id: "4",
      title: "Armed groups threatening voters in eastern regions",
      description: "Reports of armed groups intimidating voters at polling stations",
      category: "VOTER_INTIMIDATION",
      confidence: 0.78,
      firstDetected: "2025-05-12T10:00:00Z",
      lastUpdated: "2025-05-12T13:45:00Z",
      contentCount: 156,
      languages: ["en", "ig"],
      volume: 156,
      trend: "increasing",
      platforms: ["twitter", "facebook", "whatsapp"]
    },
    {
      id: "5",
      title: "False claims about changed voting procedures",
      description: "Misinformation about last-minute changes to voting procedures",
      category: "PROCEDURAL_MISINFORMATION",
      confidence: 0.89,
      firstDetected: "2025-05-12T08:00:00Z",
      lastUpdated: "2025-05-12T14:30:00Z",
      contentCount: 231,
      languages: ["en", "pcm", "yo"],
      volume: 231,
      trend: "stable",
      platforms: ["twitter", "facebook", "tiktok"]
    }
  ]
};

// Actors data
export const actorsData = {
  actors: [
    {
      id: "1",
      name: "@election_truth",
      type: "INDIVIDUAL",
      platform: "TWITTER_X",
      influence: 0.85,
      followers: 50000,
      verified: true,
      activity: "HIGH",
      coordinated: true,
      firstDetected: "2025-05-10T14:30:00Z",
      narratives: ["1", "3"],
      location: "Unknown"
    },
    {
      id: "2",
      name: "Nigeria Election Watch",
      type: "ORGANIZATION",
      platform: "FACEBOOK",
      influence: 0.92,
      followers: 75000,
      verified: true,
      activity: "HIGH",
      coordinated: false,
      firstDetected: "2025-05-01T09:15:00Z",
      narratives: ["2", "5"],
      location: "Lagos, Nigeria"
    },
    {
      id: "3",
      name: "@truth_seeker_ng",
      type: "INDIVIDUAL",
      platform: "TWITTER_X",
      influence: 0.67,
      followers: 12000,
      verified: false,
      activity: "MEDIUM",
      coordinated: true,
      firstDetected: "2025-05-11T16:45:00Z",
      narratives: ["1", "4"],
      location: "Abuja, Nigeria"
    },
    {
      id: "4",
      name: "Election Alert Network",
      type: "NETWORK",
      platform: "MULTIPLE",
      influence: 0.88,
      followers: 120000,
      verified: "MIXED",
      activity: "HIGH",
      coordinated: true,
      firstDetected: "2025-05-09T11:30:00Z",
      narratives: ["1", "2", "4"],
      location: "Multiple"
    },
    {
      id: "5",
      name: "@political_insider",
      type: "INDIVIDUAL",
      platform: "TWITTER_X",
      influence: 0.79,
      followers: 35000,
      verified: true,
      activity: "HIGH",
      coordinated: false,
      firstDetected: "2025-05-10T08:20:00Z",
      narratives: ["3", "5"],
      location: "Lagos, Nigeria"
    }
  ]
};

// Alerts data
export const alertsData = {
  alerts: [
    {
      id: "1",
      title: "Sudden spike in 'ballot stuffing' narrative",
      description: "Volume increased by 450% in the last hour across Twitter and Facebook",
      severity: "CRITICAL",
      type: "VOLUME_SPIKE",
      timestamp: "2025-05-12T14:30:00Z",
      isAcknowledged: false,
      relatedNarratives: ["Ballot stuffing in Lagos polling stations", "Electoral commission corruption allegations"],
      relatedActors: ["@election_truth (50K followers)", "@nigeria_watchdog (35K followers)"],
      recommendedActions: [
        "Monitor related hashtags #NigeriaDecides2025 and #LagosVotes",
        "Track geographic spread of narrative",
        "Identify original sources and verify claims",
        "Alert fact-checking partners"
      ]
    },
    {
      id: "2",
      title: "New coordinated network detected",
      description: "15 accounts showing synchronized posting patterns around election fraud claims",
      severity: "HIGH",
      type: "COORDINATED_ACTIVITY",
      timestamp: "2025-05-12T13:45:00Z",
      isAcknowledged: false,
      relatedNarratives: ["Election officials compromised", "Foreign interference in voting process"],
      relatedActors: ["Network of 15 accounts created in the last 30 days", "Central node: @truth_seeker_ng"],
      recommendedActions: [
        "Analyze account creation patterns and relationships",
        "Document coordinated posting behavior",
        "Report to platform for potential violation of terms",
        "Monitor for network expansion"
      ]
    },
    {
      id: "3",
      title: "New influential actor promoting misinformation",
      description: "Verified account with 120K followers sharing manipulated polling station video",
      severity: "MEDIUM",
      type: "NEW_INFLUENCER",
      timestamp: "2025-05-12T12:15:00Z",
      isAcknowledged: false,
      relatedNarratives: ["Voter intimidation in northern regions", "Ethnic targeting at polling stations"],
      relatedActors: ["@political_insider (120K followers, verified)"],
      recommendedActions: [
        "Analyze account history and recent activity patterns",
        "Document reach and engagement of manipulated content",
        "Identify original source of manipulated video",
        "Contact platform about potential policy violation"
      ]
    },
    {
      id: "4",
      title: "Geographic shift in narrative spread",
      description: "Ethnic tension narrative spreading from online spaces to on-ground incidents",
      severity: "HIGH",
      type: "GEOGRAPHIC_SHIFT",
      timestamp: "2025-05-12T11:00:00Z",
      isAcknowledged: false,
      relatedNarratives: ["Ethnic profiling at polling stations", "Targeted voter suppression"],
      relatedActors: ["Multiple local community groups", "Regional political influencers"],
      recommendedActions: [
        "Alert local observers in affected regions",
        "Track geographic correlation between online narrative and incidents",
        "Identify key amplifiers in transition from online to offline",
        "Prepare counter-messaging resources for local partners"
      ]
    }
  ]
};

// Timeline data
export const timelineData = {
  events: [
    {
      id: "1",
      date: "2025-05-12T09:15:00Z",
      title: "New narrative emerged: 'Ballot box stuffing in Lagos'",
      description: "First detected on Twitter, quickly spread to Facebook and WhatsApp groups",
      platforms: ["Twitter", "Facebook", "WhatsApp"],
      narrativeId: "1",
      actorIds: ["1", "3"]
    },
    {
      id: "2",
      date: "2025-05-12T10:30:00Z",
      title: "Key influencer amplification",
      description: "Narrative picked up by @election_truth with 50K followers",
      platforms: ["Twitter"],
      narrativeId: "1",
      actorIds: ["1"]
    },
    {
      id: "3",
      date: "2025-05-12T12:45:00Z",
      title: "Content manipulation detected",
      description: "Original video edited to remove context, showing only partial events",
      platforms: ["TikTok", "YouTube"],
      narrativeId: "1",
      actorIds: ["3", "5"]
    },
    {
      id: "4",
      date: "2025-05-12T14:20:00Z",
      title: "Coordinated sharing pattern identified",
      description: "15 accounts sharing identical content within 5 minute window",
      platforms: ["Facebook", "Twitter"],
      narrativeId: "1",
      actorIds: ["4"]
    },
    {
      id: "5",
      date: "2025-05-12T16:00:00Z",
      title: "Counter-narrative emerges",
      description: "Election officials release full video showing proper procedures",
      platforms: ["Official Website", "Twitter"],
      narrativeId: "1",
      actorIds: []
    },
    {
      id: "6",
      date: "2025-05-12T18:30:00Z",
      title: "Fact-checking organization verification",
      description: "Africa Check labels original claim as 'Misleading'",
      platforms: ["Africa Check", "Twitter"],
      narrativeId: "1",
      actorIds: []
    }
  ],
  stats: {
    totalEvents: 24,
    platforms: 6,
    peakActivity: "14:20",
    spreadVelocity: "High"
  }
};

// Reports data
export const reportsData = {
  reports: [
    {
      id: "1",
      title: "Weekly Misinformation Trends Report",
      type: "Trend Analysis",
      createdAt: "May 12, 2025",
      createdBy: "John Doe",
      summary: "This report provides an analysis of key misinformation trends observed during the past week leading up to the Nigerian presidential election. It highlights emerging narratives, influential actors, and recommended intervention strategies.",
      keyFindings: [
        "Significant increase (35%) in vote rigging narratives across platforms",
        "Coordinated network of 24 accounts spreading ethnic tension narratives",
        "Regional concentration of voter intimidation claims in northern states",
        "Cross-platform amplification pattern from Twitter to Facebook to WhatsApp"
      ],
      visualizations: [
        {
          title: "Narrative Volume by Platform",
          description: "Comparison of narrative prevalence across different social media platforms"
        },
        {
          title: "Geographic Distribution of Narratives",
          description: "Heat map showing concentration of misinformation narratives by region"
        },
        {
          title: "Temporal Spread Pattern",
          description: "Timeline showing how narratives evolved and spread over time"
        },
        {
          title: "Key Actor Network",
          description: "Network graph showing relationships between influential spreaders"
        }
      ],
      recommendations: [
        "Focus fact-checking efforts on vote rigging claims, particularly in Lagos and Kano",
        "Monitor the identified coordinated network for new narrative introduction",
        "Deploy targeted counter-messaging in northern regions addressing voter intimidation concerns",
        "Engage with platform representatives about the cross-platform amplification pattern"
      ]
    },
    {
      id: "2",
      title: "Ballot Stuffing Narrative Analysis",
      type: "Narrative Analysis",
      createdAt: "May 10, 2025",
      createdBy: "Jane Smith",
      summary: "Detailed analysis of the 'ballot stuffing' narrative that emerged on May 9th and rapidly spread across multiple platforms. This report examines the origin, spread patterns, key amplifiers, and impact of this specific narrative.",
      keyFindings: [
        "Narrative originated from a manipulated video shared by @election_truth",
        "Spread to 15,000+ shares within 6 hours of initial posting",
        "Amplified by 3 verified accounts with combined following of 500K+",
        "Generated 28 derivative narratives focusing on specific polling stations"
      ],
      visualizations: [
        {
          title: "Narrative Spread Timeline",
          description: "Hour-by-hour spread of the ballot stuffing narrative"
        },
        {
          title: "Key Amplifier Network",
          description: "Network of accounts that significantly boosted the narrative reach"
        }
      ],
      recommendations: [
        "Prioritize fact-checking of the original manipulated video",
        "Engage with verified accounts that amplified the narrative",
        "Monitor for similar narrative patterns at other polling locations",
        "Prepare counter-narrative resources for election officials"
      ]
    },
    {
      id: "3",
      title: "Coordinated Inauthentic Behavior Report",
      type: "Actor Network Analysis",
      createdAt: "May 8, 2025",
      createdBy: "Alex Johnson",
      summary: "This report documents a network of accounts exhibiting coordinated inauthentic behavior around election integrity narratives. It analyzes account creation patterns, posting behaviors, content sharing patterns, and network relationships.",
      keyFindings: [
        "Network of 37 accounts created within the same 48-hour period",
        "Synchronized posting patterns with 92% content similarity",
        "Targeting of 5 specific electoral regions with tailored messaging",
        "Evidence of automation in posting schedule and response patterns"
      ],
      visualizations: [
        {
          title: "Account Creation Timeline",
          description: "Clustering of account creation dates showing coordinated setup"
        },
        {
          title: "Content Similarity Matrix",
          description: "Heat map showing content similarity between accounts in the network"
        }
      ],
      recommendations: [
        "Report network to platform trust and safety teams with supporting evidence",
        "Monitor for network reconstitution if accounts are removed",
        "Track narrative shifts from this network as a leading indicator",
        "Document tactics for future reference and training"
      ]
    }
  ]
};

// User data
export const userData = {
  users: [
    {
      id: "user-123",
      name: "Demo User",
      email: "demo@example.com",
      organization: "Election Watch",
      role: "RESEARCHER",
      regions: ["Lagos", "Abuja"],
      isActive: true,
      lastLogin: "2025-05-12T08:00:00Z"
    }
  ]
};

// Export all mock data
export default {
  dashboardData,
  narrativesData,
  actorsData,
  alertsData,
  timelineData,
  reportsData,
  userData
};
