import { useCallback, useEffect, useMemo, useState } from 'react'

const KEY = 'lets-conserve:progress:v1'

export const QUIZ_BONUS = 25

const empty = {
  completedQuests: [],
  quiz: { best: 0, passed: false, attempts: 0 },
  lastVisit: null,
}

function read() {
  if (typeof window === 'undefined') return empty
  try {
    const raw = window.localStorage.getItem(KEY)
    if (!raw) return empty
    const parsed = JSON.parse(raw)
    return {
      completedQuests: Array.isArray(parsed.completedQuests) ? parsed.completedQuests : [],
      quiz: {
        best: Number(parsed.quiz?.best) || 0,
        passed: Boolean(parsed.quiz?.passed),
        attempts: Number(parsed.quiz?.attempts) || 0,
      },
      lastVisit: parsed.lastVisit || null,
    }
  } catch {
    return empty
  }
}

export function useProgress(quests) {
  const [state, setState] = useState(read)

  useEffect(() => {
    try {
      window.localStorage.setItem(KEY, JSON.stringify(state))
    } catch {
      /* storage unavailable — session-only progress */
    }
  }, [state])

  /* Points are derived from the completed set, so a quest can never
     pay out twice, even if it is toggled off and on again. */
  const points = useMemo(() => {
    const earned = quests
      .filter((q) => state.completedQuests.includes(q.id))
      .reduce((sum, q) => sum + q.points, 0)
    return earned + (state.quiz.passed ? QUIZ_BONUS : 0)
  }, [quests, state.completedQuests, state.quiz.passed])

  const toggleQuest = useCallback((id) => {
    setState((prev) => {
      const done = prev.completedQuests.includes(id)
      return {
        ...prev,
        lastVisit: new Date().toISOString(),
        completedQuests: done
          ? prev.completedQuests.filter((q) => q !== id)
          : [...prev.completedQuests, id],
      }
    })
  }, [])

  const recordQuiz = useCallback((correct, total) => {
    setState((prev) => {
      const passed = total > 0 && correct / total >= 0.6
      return {
        ...prev,
        lastVisit: new Date().toISOString(),
        quiz: {
          best: Math.max(prev.quiz.best, correct),
          passed: prev.quiz.passed || passed,
          attempts: prev.quiz.attempts + 1,
        },
      }
    })
  }, [])

  const reset = useCallback(() => {
    setState({ ...empty, lastVisit: new Date().toISOString() })
  }, [])

  return {
    points,
    completedQuests: state.completedQuests,
    quiz: state.quiz,
    toggleQuest,
    recordQuiz,
    reset,
    isDone: (id) => state.completedQuests.includes(id),
  }
}

/* ---------------------------- week helper ---------------------------- */

export function currentWeek() {
  const now = new Date()
  const start = new Date(now)
  start.setHours(0, 0, 0, 0)
  start.setDate(now.getDate() - ((now.getDay() + 6) % 7)) // Monday
  const end = new Date(start)
  end.setDate(start.getDate() + 6)

  const fmt = (d) => d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
  const weekNumber = Math.ceil(
    ((start - new Date(start.getFullYear(), 0, 1)) / 86400000 + 1) / 7,
  )
  return {
    label: `${fmt(start)} – ${fmt(end)}`,
    index: Math.max(0, weekNumber - 1),
    key: `${start.getFullYear()}-W${weekNumber}`,
  }
}
