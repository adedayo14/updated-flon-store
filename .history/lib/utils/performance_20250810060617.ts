// Performance monitoring for debugging slow requests
export const performanceMonitor = {
  startTime: Date.now(),
  
  mark(label: string) {
    if (typeof window !== 'undefined' && window.performance) {
      const now = performance.now();
      console.log(`🔍 [PERF] ${label}: ${now.toFixed(2)}ms from start`);
      
      // Store in session storage for debugging
      const perfData = JSON.parse(sessionStorage.getItem('perf_data') || '[]');
      perfData.push({
        label,
        time: now,
        timestamp: new Date().toISOString(),
        page: window.location.pathname
      });
      
      // Keep only last 20 entries
      if (perfData.length > 20) perfData.shift();
      sessionStorage.setItem('perf_data', JSON.stringify(perfData));
    }
  },
  
  // Measure API call duration
  async timeApiCall<T>(label: string, apiCall: () => Promise<T>): Promise<T> {
    const start = performance.now();
    try {
      const result = await apiCall();
      const duration = performance.now() - start;
      console.log(`🌐 [API] ${label}: ${duration.toFixed(2)}ms`);
      
      // Log slow API calls
      if (duration > 1000) {
        console.warn(`🐌 SLOW API: ${label} took ${duration.toFixed(2)}ms`);
      }
      
      return result;
    } catch (error) {
      const duration = performance.now() - start;
      console.error(`❌ [API ERROR] ${label}: ${duration.toFixed(2)}ms`, error);
      throw error;
    }
  }
};

export default performanceMonitor;
