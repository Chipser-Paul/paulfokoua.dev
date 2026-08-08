import timelineData from '@/content/timeline.json'

export function loadTimeline() {
  const events = timelineData.events || []
  return events
    .filter((event) => event && event.date && event.title)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
}