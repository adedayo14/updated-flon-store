// Simple admin authentication utility
// In a real application, you would use proper authentication like JWT, session management, etc.

import fs from 'fs';
import path from 'path';

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Adedayo01';

export interface AdminUser {
  username: string;
  isAuthenticated: boolean;
}

// Simple session storage with file persistence for development
const SESSIONS_FILE = path.join(process.cwd(), 'data', 'admin-sessions.json');

// Ensure the data directory exists
const dataDir = path.dirname(SESSIONS_FILE);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Load existing sessions from file
function loadSessions(): Set<string> {
  try {
    if (fs.existsSync(SESSIONS_FILE)) {
      const data = fs.readFileSync(SESSIONS_FILE, 'utf8');
      const sessions = JSON.parse(data);
      return new Set(sessions);
    }
  } catch (error) {
    console.error('Error loading sessions:', error);
  }
  return new Set<string>();
}

// Save sessions to file
function saveSessions(sessions: Set<string>): void {
  try {
    const data = JSON.stringify(Array.from(sessions));
    fs.writeFileSync(SESSIONS_FILE, data, 'utf8');
  } catch (error) {
    console.error('Error saving sessions:', error);
  }
}

const adminSessions = loadSessions();

export function authenticateAdmin(username: string, password: string): boolean {
  console.log('Authenticating admin:', { username, password, expectedUsername: ADMIN_USERNAME, expectedPassword: ADMIN_PASSWORD });
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
}

export function createAdminSession(): string {
  const sessionId = Math.random().toString(36).substring(2) + Date.now().toString(36);
  adminSessions.add(sessionId);
  saveSessions(adminSessions);
  console.log('Created admin session:', sessionId, 'Total sessions:', adminSessions.size);
  return sessionId;
}

export function validateAdminSession(sessionId: string): boolean {
  // Reload sessions from file to ensure we have the latest data
  const currentSessions = loadSessions();
  const isValid = currentSessions.has(sessionId);
  console.log('Validating admin session:', sessionId, 'Valid:', isValid, 'Total sessions:', currentSessions.size);
  return isValid;
}

export function removeAdminSession(sessionId: string): void {
  adminSessions.delete(sessionId);
  saveSessions(adminSessions);
  console.log('Removed admin session:', sessionId, 'Total sessions:', adminSessions.size);
}

// Clean up old sessions periodically (in production, use proper session management)
setInterval(() => {
  // This is a simple cleanup - in production, you'd want more sophisticated session management
  console.log('Active admin sessions:', adminSessions.size);
}, 300000); // Every 5 minutes