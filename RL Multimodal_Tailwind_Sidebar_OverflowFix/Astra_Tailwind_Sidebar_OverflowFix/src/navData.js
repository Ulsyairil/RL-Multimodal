export const BRAND = 'Nexus Studio'

export const navGroups = [
  {
    label: 'Main Menu',
    items: [
      { label: 'Dashboard', icon: '📊', active: true },
      { label: 'Analytics', icon: '📈' },
      { label: 'Products', icon: '📦' },
      { label: 'Customers', icon: '👥' },
      { label: 'Transactions', icon: '💳' },
      { label: 'Discounts', icon: '🏷️' },
    ],
  },
  {
    label: 'Management',
    items: [
      { label: 'Content', icon: '📝' },
      { label: 'Media Library', icon: '📁' },
      { label: 'Messages', icon: '📩', badge: 4 },
    ],
  },
  {
    label: 'System',
    items: [
      { label: 'Settings', icon: '⚙️' },
      { label: 'Help & Support', icon: '❓' },
    ],
  },
]