'use client'

import Link from 'next/link'
import type { GitHubUser } from '@/types/github'
import styles from './user-card.module.css'

interface UserCardProps {
  user: GitHubUser
}

export default function UserCard({ user }: UserCardProps) {
  return (
    <Link href={`/users/${user.id}`}>
      <div className={styles.card}>
        <img 
          src={user.avatar_url || "/placeholder.svg"} 
          alt={user.login}
          className={styles.avatar}
        />
        <div className={styles.content}>
          <h3 className={styles.login}>{user.login}</h3>
          <a 
            href={user.html_url} 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.githubLink}
            onClick={(e) => e.stopPropagation()}
          >
            View on GitHub →
          </a>
        </div>
      </div>
    </Link>
  )
}
