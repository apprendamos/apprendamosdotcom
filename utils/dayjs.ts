import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export function formatRelativeTime(date: Date | string | undefined) {
  return dayjs(date).fromNow();
}
