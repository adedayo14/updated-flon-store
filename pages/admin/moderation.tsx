import React, { useCallback, useEffect, useMemo, useState } from 'react';
import type { NextPage } from 'next';
import Image from 'next/image';

// Simple shapes based on our admin pending API response
interface AdminReviewItem {
  review: {
    id: string;
    product_id: string;
    user_id: string;
    rating: number;
    title: string;
    review_body: string;
    is_approved: boolean;
    is_verified_purchase: boolean;
    helpful_count: number;
    created_at: string;
    updated_at: string;
    status: 'pending' | 'approved' | 'rejected';
  };
  product: {
    id: string;
    name: string;
    image?: string;
  };
  user: {
    id: string;
    name: string;
    email: string;
  };
}

const AdminModerationPage: NextPage = () => {
  const [isAuthed, setIsAuthed] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'pending' | 'all'>('pending');
  const [reviews, setReviews] = useState<AdminReviewItem[]>([]);

  const loadReviews = useCallback(async (which: 'pending' | 'all' = 'pending') => {
    setLoading(true);
    setError(null);
    try {
      const url = which === 'pending' ? '/api/admin/reviews/pending' : '/api/admin/reviews';
      const res = await fetch(url, { credentials: 'include' });
      if (res.status === 401) {
        setIsAuthed(false);
        setReviews([]);
        return;
      }
      if (!res.ok) throw new Error(`Failed to load reviews (${res.status})`);
      const data = await res.json();
      // /api/admin/reviews returns array, /pending returns { reviews }
      const mapped: AdminReviewItem[] = Array.isArray(data)
        ? data.map((r: any) => ({
            review: r,
            product: { id: r.product_id, name: 'Unknown Product' },
            user: { id: r.user_id, name: r.user_name, email: '' },
          }))
        : data.reviews || [];
      setReviews(mapped);
      setIsAuthed(true);
    } catch (e: any) {
      setError(e?.message || 'Error loading reviews');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Probe auth by attempting to load pending reviews
    loadReviews('pending');
  }, [loadReviews]);

  const onLogin = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const username = String(form.get('username') || '');
    const password = String(form.get('password') || '');
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok || data?.success !== true) {
        throw new Error(data?.error || 'Login failed');
      }
      setIsAuthed(true);
      setFilter('pending');
      loadReviews('pending');
    } catch (e: any) {
      setError(e?.message || 'Login error');
    } finally {
      setLoading(false);
    }
  }, [loadReviews]);

  const onLogout = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await fetch('/api/admin/logout', { method: 'POST', credentials: 'include' });
      setIsAuthed(false);
      setReviews([]);
    } catch (e: any) {
      setError(e?.message || 'Logout error');
    } finally {
      setLoading(false);
    }
  }, []);

  const moderate = useCallback(async (id: string, status: 'approved' | 'rejected') => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/reviews/${id}/moderate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ status }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || `Failed to ${status} review`);
      }
      // Optimistic update: remove from list when approving/rejecting in pending view
      setReviews((prev) => prev.filter((r) => r.review.id !== id));
    } catch (e: any) {
      setError(e?.message || 'Moderation error');
    } finally {
      setLoading(false);
    }
  }, []);

  const content = useMemo(() => {
    if (isAuthed === false) {
      return (
        <div className="max-w-md w-full bg-white p-6 rounded shadow">
          <h1 className="text-2xl font-semibold mb-4">Admin Login</h1>
          {error ? (
            <div className="mb-3 text-sm text-red-600">{error}</div>
          ) : null}
          <form onSubmit={onLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="username">Username</label>
              <input id="username" name="username" type="text" className="w-full border rounded px-3 py-2" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="password">Password</label>
              <input id="password" name="password" type="password" className="w-full border rounded px-3 py-2" required />
            </div>
            <button type="submit" className="w-full bg-primary text-white rounded px-4 py-2 disabled:opacity-50" disabled={loading}>
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>
        </div>
      );
    }

    if (isAuthed === null) {
      return (
        <div className="text-center text-sm text-body">Checking admin session…</div>
      );
    }

    return (
      <div className="w-full">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-semibold">Review Moderation</h1>
          <div className="flex items-center gap-2">
            <label htmlFor="filter" className="sr-only">Filter reviews</label>
            <select
              id="filter"
              aria-label="Filter reviews"
              value={filter}
              onChange={(e) => {
                const val = e.target.value as 'pending' | 'all';
                setFilter(val);
                loadReviews(val);
              }}
              className="border rounded px-3 py-2"
            >
              <option value="pending">Pending</option>
              <option value="all">All</option>
            </select>
            <button onClick={onLogout} className="border rounded px-3 py-2">Logout</button>
          </div>
        </div>

        {error ? (
          <div className="mb-3 text-sm text-red-600">{error}</div>
        ) : null}

        <div className="overflow-auto border rounded">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-left">
              <tr>
                <th className="px-3 py-2">Product</th>
                <th className="px-3 py-2">User</th>
                <th className="px-3 py-2">Rating</th>
                <th className="px-3 py-2">Title</th>
                <th className="px-3 py-2">Review</th>
                <th className="px-3 py-2">Created</th>
                <th className="px-3 py-2">Status</th>
                <th className="px-3 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((item) => (
                <tr key={item.review.id} className="border-t">
                  <td className="px-3 py-2">
                    <div className="flex items-center gap-2">
                      {item.product?.image ? (
                        <Image src={item.product.image} alt={item.product.name} width={40} height={40} className="rounded object-cover" />
                      ) : null}
                      <div>
                        <div className="font-medium">{item.product?.name || 'Product'}</div>
                        <div className="text-xs text-body">{item.review.product_id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-2">
                    <div className="font-medium">{item.user?.name || 'User'}</div>
                    <div className="text-xs text-body">{item.user?.email}</div>
                  </td>
                  <td className="px-3 py-2">{item.review.rating}★</td>
                  <td className="px-3 py-2">{item.review.title}</td>
                  <td className="px-3 py-2 max-w-xs">
                    <div className="line-clamp-3">{item.review.review_body}</div>
                  </td>
                  <td className="px-3 py-2">{new Date(item.review.created_at).toLocaleString()}</td>
                  <td className="px-3 py-2 capitalize">{item.review.status}</td>
                  <td className="px-3 py-2">
                    <div className="flex items-center gap-2">
                      {item.review.status === 'pending' ? (
                        <>
                          <button onClick={() => moderate(item.review.id, 'approved')} className="bg-green-600 hover:bg-green-700 text-white font-semibold px-3 py-1 rounded shadow disabled:opacity-50 disabled:cursor-not-allowed" disabled={loading}>
                            Approve
                          </button>
                          <button onClick={() => moderate(item.review.id, 'rejected')} className="bg-red-600 hover:bg-red-700 text-white font-semibold px-3 py-1 rounded shadow disabled:opacity-50 disabled:cursor-not-allowed ml-2" disabled={loading}>
                            Reject
                          </button>
                        </>
                      ) : (
                        <span className="text-xs text-body">No actions</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {!loading && reviews.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-3 py-6 text-center text-body">No reviews</td>
                </tr>
              ) : null}
              {loading ? (
                <tr>
                  <td colSpan={8} className="px-3 py-6 text-center text-body">Loading…</td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
    );
  }, [isAuthed, error, filter, reviews, loading, onLogin, onLogout, loadReviews, moderate]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center p-6">
      {content}
    </div>
  );
};

export default AdminModerationPage;
