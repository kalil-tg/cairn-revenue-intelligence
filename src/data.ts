export type DealStatus = 'At risk' | 'On track' | 'Needs review'

export type Deal = {
  id: string
  company: string
  amount: string
  status: DealStatus
  summary: string
  evidence: Array<{ type: 'person' | 'pricing' | 'calendar'; title: string; detail: string }>
  action: string
  updated: string
}

export const deals: Deal[] = [
  {
    id: 'arcadia',
    company: 'Arcadia Labs',
    amount: '€420K',
    status: 'At risk',
    summary: 'Confidence dropped after pricing was shared.',
    evidence: [
      { type: 'person', title: 'Decision maker', detail: 'No reply in 8 days' },
      { type: 'pricing', title: 'Pricing', detail: 'Competitor mentioned' },
      { type: 'calendar', title: 'Next step', detail: 'Reinforce ROI before Friday' },
    ],
    action: 'Open Arcadia deal brief',
    updated: 'Updated 4 min ago',
  },
  {
    id: 'northstar',
    company: 'Northstar Health',
    amount: '€315K',
    status: 'On track',
    summary: 'Executive sponsor re-engaged and confirmed the decision timeline.',
    evidence: [
      { type: 'person', title: 'Executive sponsor', detail: 'Joined the last call' },
      { type: 'pricing', title: 'Commercials', detail: 'Budget confirmed' },
      { type: 'calendar', title: 'Next step', detail: 'Security review on Thursday' },
    ],
    action: 'Open Northstar deal brief',
    updated: 'Updated 11 min ago',
  },
  {
    id: 'modo',
    company: 'Modo Systems',
    amount: '€280K',
    status: 'Needs review',
    summary: 'Usage is rising, but the buying committee has not aligned.',
    evidence: [
      { type: 'person', title: 'Buying committee', detail: 'Two roles still missing' },
      { type: 'pricing', title: 'Business case', detail: 'ROI draft is incomplete' },
      { type: 'calendar', title: 'Next step', detail: 'Map stakeholders this week' },
    ],
    action: 'Open Modo deal brief',
    updated: 'Updated 28 min ago',
  },
  {
    id: 'fieldwork',
    company: 'Fieldwork',
    amount: '€190K',
    status: 'On track',
    summary: 'Legal review is moving on schedule with no new blockers.',
    evidence: [
      { type: 'person', title: 'Legal owner', detail: 'Reviewing final terms' },
      { type: 'pricing', title: 'Commercials', detail: 'Order form accepted' },
      { type: 'calendar', title: 'Next step', detail: 'Signature expected Monday' },
    ],
    action: 'Open Fieldwork deal brief',
    updated: 'Updated 42 min ago',
  },
]

export const activity = [
  ['10:42', 'Call with Alex', 'Arcadia Labs', 'phone'],
  ['10:28', 'Follow-up email', 'Northstar Health', 'mail'],
  ['09:57', 'Website visit', 'Modo Systems', 'chart'],
  ['09:31', 'CRM update', 'Arcadia Labs', 'card'],
  ['Yesterday', 'Buying intent spike', 'Northstar Health', 'signal'],
] as const
