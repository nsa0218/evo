import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import LandingScreen from './screens/landing'
import { LoginScreen } from './screens/auth'
import { SearchResultsScreen, PropertyDetailScreen } from './screens/search-detail'
import { BookingFlowScreen, GuestDashboardScreen, ChatScreen } from './screens/booking-guest-chat'
import { HostDashboardScreen } from './screens/host'
import { AdminScreen } from './screens/admin-profile'
import { MobileLanding } from './screens/mobile'

export default function App() {
  const [role, setRole] = useState('guest')

  const handleRoleChange = (newRole) => {
    setRole(newRole)
  }

  const sharedProps = { role, onRoleChange: handleRoleChange }

  return (
    <div style={{ width: '100%', minHeight: '100vh', background: 'var(--bg)' }}>
      <Routes>
        <Route path="/" element={<LandingScreen {...sharedProps} />} />
        <Route path="/login" element={<LoginScreen {...sharedProps} />} />
        <Route path="/register" element={<LoginScreen {...sharedProps} />} />
        <Route path="/search" element={<SearchResultsScreen {...sharedProps} />} />
        <Route path="/property/:id" element={<PropertyDetailScreen {...sharedProps} />} />
        <Route path="/checkout" element={<BookingFlowScreen {...sharedProps} />} />
        <Route path="/trips" element={<GuestDashboardScreen {...sharedProps} />} />
        <Route path="/chat" element={<ChatScreen {...sharedProps} />} />
        <Route path="/hosting" element={<HostDashboardScreen {...sharedProps} />} />
        <Route path="/admin" element={<AdminScreen {...sharedProps} />} />
        <Route path="/mobile" element={<MobileLanding {...sharedProps} />} />
      </Routes>
    </div>
  )
}
