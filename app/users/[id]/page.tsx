'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import LoadingSpinner from '@/components/loading-spinner'
import ErrorMessage from '@/components/error-message'
import styles from './page.module.css'
import type { GitHubUserDetails } from '@/types/github'

export default function UserDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const [user, setUser] = useState<GitHubUserDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const userId = params.id as string

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await fetch(`https://api.github.com/user/${userId}`)

        if (!response.ok) {
          if (response.status === 404) {
            setError('User not found')
          } else if (response.status === 403) {
            setError('Rate limit exceeded. Please try again later.')
          } else {
            setError('Failed to fetch user details')
          }
          return
        }

        const data: GitHubUserDetails = await response.json()
        setUser(data)
      } catch (err) {
        setError('An error occurred while fetching user details')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchUserDetails()
  }, [userId])

  if (loading) {
    return (
      <main className={styles.container}>
        <LoadingSpinner />
      </main>
    )
  }

  if (error || !user) {
    return (
      <main className={styles.container}>
        <div className={styles.backButton}>
          <Link href="/">← Back to Search</Link>
        </div>
        <ErrorMessage message={error || 'User not found'} />
      </main>
    )
  }

  return (
    <main className={styles.container}>
      <div className={styles.backButton}>
        <Link href="/">← Back to Search</Link>
      </div>

      <div className={styles.profile}>
        <div className={styles.header}>
          <img 
            src={user.avatar_url || "/placeholder.svg"} 
            alt={user.name || user.login}
            className={styles.avatar}
          />
          <div className={styles.headerInfo}>
            <h1 className={styles.name}>{user.name || user.login}</h1>
            <p className={styles.login}>@{user.login}</p>
            {user.bio && <p className={styles.bio}>{user.bio}</p>}
          </div>
        </div>

        {user.bio && (
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Bio</h2>
            <p>{user.bio}</p>
          </div>
        )}

        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Followers</span>
            <span className={styles.statValue}>{user.followers}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Following</span>
            <span className={styles.statValue}>{user.following}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Public Repos</span>
            <span className={styles.statValue}>{user.public_repos}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Gists</span>
            <span className={styles.statValue}>{user.public_gists}</span>
          </div>
        </div>

        <div className={styles.details}>
          {user.company && (
            <div className={styles.detailItem}>
              <span className={styles.label}>Company:</span>
              <span>{user.company}</span>
            </div>
          )}
          {user.location && (
            <div className={styles.detailItem}>
              <span className={styles.label}>Location:</span>
              <span>{user.location}</span>
            </div>
          )}
          {user.email && (
            <div className={styles.detailItem}>
              <span className={styles.label}>Email:</span>
              <a href={`mailto:${user.email}`}>{user.email}</a>
            </div>
          )}
          {user.blog && (
            <div className={styles.detailItem}>
              <span className={styles.label}>Blog:</span>
              <a href={user.blog} target="_blank" rel="noopener noreferrer">{user.blog}</a>
            </div>
          )}
          {user.twitter_username && (
            <div className={styles.detailItem}>
              <span className={styles.label}>Twitter:</span>
              <a href={`https://twitter.com/${user.twitter_username}`} target="_blank" rel="noopener noreferrer">@{user.twitter_username}</a>
            </div>
          )}
        </div>

        <div className={styles.actions}>
          <a 
            href={user.html_url} 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.link}
          >
            View on GitHub
          </a>
        </div>
      </div>
    </main>
  )
}
