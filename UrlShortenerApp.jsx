import React, { useState } from 'react'
import { motion } from 'framer-motion'

// Usage: set REACT_APP_API_BASE=https://nel0n9hinl.execute-api.us-east-1.amazonaws.com/prod
// Then import and render <UrlShortenerApp /> inside your React app (e.g. src/App.jsx)

export default function UrlShortenerApp() {
  const API_BASE = process.env.REACT_APP_API_BASE || 'https://nel0n9hinl.execute-api.us-east-1.amazonaws.com/prod'
  const [longUrl, setLongUrl] = useState('')
  const [shortCode, setShortCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const shorten = async () => {
    setError('')
    setShortCode('')
    if (!longUrl || !/^https?:\/\//i.test(longUrl)) {
      setError('Please enter a valid URL starting with http:// or https://')
      return
    }
    setLoading(true)
    try {
      const res = await fetch(`${API_BASE}/shorten`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ longUrl })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || JSON.stringify(data))
      setShortCode(data.shortCode)
    } catch (err) {
      setError(err.message || 'Failed to shorten')
    } finally {
      setLoading(false)
    }
  }

  const shortUrl = shortCode ? `${API_BASE}/${shortCode}` : ''

  const copy = async () => {
    if (!shortUrl) return
    await navigator.clipboard.writeText(shortUrl)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white/6 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-2xl">
        <h1 className="text-3xl md:text-4xl font-semibold text-white mb-2">TinyLink — URL Shortener</h1>
        <p className="text-sm text-slate-300 mb-6">Paste any long URL and get a short, shareable link. Built with AWS Lambda + DynamoDB + API Gateway.</p>

        <div className="grid gap-4 md:grid-cols-12 items-center">
          <input
            className="md:col-span-9 px-4 py-3 rounded-lg bg-white/8 border border-white/10 text-white placeholder:text-slate-300 focus:outline-none"
            placeholder="https://example.com/very/long/link"
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') shorten() }}
          />

          <motion.button
            whileTap={{ scale: 0.98 }}
            whileHover={{ scale: 1.02 }}
            className="md:col-span-3 px-4 py-3 rounded-lg bg-emerald-500 text-slate-900 font-semibold shadow-md"
            onClick={shorten}
            disabled={loading}
          >
            {loading ? 'Shortening...' : 'Shorten'}
          </motion.button>
        </div>

        {error && <div className="mt-4 text-sm text-red-400">{error}</div>}

        {shortUrl && (
          <div className="mt-6 bg-white/4 border border-white/8 p-4 rounded-lg flex items-center justify-between">
            <div className="flex-1 mr-4">
              <div className="text-sm text-slate-300">Short link</div>
              <a href={shortUrl} target="_blank" rel="noreferrer" className="text-white font-medium break-all">{shortUrl}</a>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={copy} className="px-3 py-2 rounded-md bg-white/8 text-white">Copy</button>
              <a href={shortUrl} target="_blank" rel="noreferrer" className="px-3 py-2 rounded-md bg-white/8 text-white">Open</a>
            </div>
          </div>
        )}

        <div className="mt-6 text-sm text-slate-400">Suggestions: use small sample URLs while testing. For production, use a custom domain and CloudFront.</div>
      </div>
    </div>
  )
}
