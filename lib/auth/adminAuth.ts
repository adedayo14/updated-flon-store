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

// Simple session storage with file persistence for development and memory for production
const SESSIONS_FILE = path.join(process.cwd(), 'data', 'admin-sessions.json');

// In-memory session storage for production (serverless environments)
const inMemorySessions = new Set<string>();

// Ensure the data directory exists (only in development)
const isProduction = process.env.NODE_ENV === 'production';
if (!isProduction) {
  const dataDir = path.dirname(SESSIONS_FILE);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

// Load existing sessions from file (only in development)
function loadSessions(): Set<string> {
  if (isProduction) {
    return inMemorySessions;
  }
  
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

// Save sessions to file (only in development)
function saveSessions(sessions: Set<string>): void {
  if (isProduction) {
    // In production, sessions are kept in memory only
    return;
  }
  
  try {
    const data = JSON.stringify(Array.from(sessions));
    fs.writeFileSync(SESSIONS_FILE, data, 'utf8');
  } catch (error) {
    console.error('Error saving sessions:', error);
  }
}

export function authenticateAdmin(username: string, password: string): boolean {
  console.log('Authenticating admin:', { username, password, expectedUsername: ADMIN_USERNAME, expectedPassword: ADMIN_PASSWORD });
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
}

export function createAdminSession(): string {
  const sessionId = Math.random().toString(36).substring(2) + Date.now().toString(36);
  
  if (isProduction) {
    inMemorySessions.add(sessionId);
    console.log('Created admin session (memory):', sessionId, 'Total sessions:', inMemorySessions.size);
  } else {
    // Reload sessions, add new one, and save
    const currentSessions = loadSessions();
    currentSessions.add(sessionId);
    saveSessions(currentSessions);
    console.log('Created admin session (file):', sessionId, 'Total sessions:', currentSessions.size);
  }
  
  return sessionId;
}

export function validateAdminSession(sessionId: string): boolean {
  if (isProduction) {
    const isValid = inMemorySessions.has(sessionId);
    console.log('Validating admin session (memory):', sessionId, 'Valid:', isValid, 'Total sessions:', inMemorySessions.size);
    return isValid;
  } else {
    // Reload sessions from file to ensure we have the latest data
    const currentSessions = loadSessions();
    const isValid = currentSessions.has(sessionId);
    console.log('Validating admin session (file):', sessionId, 'Valid:', isValid, 'Total sessions:', currentSessions.size);
    return isValid;
  }
}

export function removeAdminSession(sessionId: string): void {
  if (isProduction) {
    inMemorySessions.delete(sessionId);
    console.log('Removed admin session (memory):', sessionId, 'Total sessions:', inMemorySessions.size);
  } else {
    const currentSessions = loadSessions();
    currentSessions.delete(sessionId);
    saveSessions(currentSessions);
    console.log('Removed admin session (file):', sessionId, 'Total sessions:', currentSessions.size);
  }
}

// Clean up old sessions periodically (in production, use proper session management)
if (!isProduction) {
  setInterval(() => {
    const currentSessions = loadSessions();
    console.log('Active admin sessions:', currentSessions.size);
  }, 300000); // Every 5 minutes
}