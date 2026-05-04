const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

class ApiClient {
  private baseUrl: string;
  constructor(baseUrl: string) { this.baseUrl = baseUrl; }

  private async request<T>(endpoint: string, options: any = {}): Promise<T> {
    const { token, ...fetchOptions } = options;
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;
    const response = await fetch(`${this.baseUrl}${endpoint}`, { ...fetchOptions, headers });
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || `API Error: ${response.status}`);
    }
    return response.json();
  }

  register(data: any) { return this.request('/auth/register', { method: 'POST', body: JSON.stringify(data) }); }
  login(data: any) { return this.request('/auth/login', { method: 'POST', body: JSON.stringify(data) }); }
  searchListings(params: Record<string, any>) { return this.request(`/listings?${new URLSearchParams(params)}`); }
  getListing(id: string) { return this.request(`/listings/${id}`); }
  createReservation(data: any, token: string) { return this.request('/reservations', { method: 'POST', body: JSON.stringify(data), token }); }
  getMyReservations(token: string) { return this.request('/reservations/my', { token }); }
  getProfile(token: string) { return this.request('/users/me', { token }); }
  getListingReviews(listingId: string) { return this.request(`/reviews/listing/${listingId}`); }
  getConversations(token: string) { return this.request('/conversations', { token }); }
}

export const api = new ApiClient(API_URL);
