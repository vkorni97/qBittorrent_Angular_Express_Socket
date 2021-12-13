import { Filters, States } from '../interfaces/torrent';

export const sort: string[] = [
  'stalledUP',
  'uploading',
  'forcedUP',
  'checkingDL',
  'pausedDL',
  'downloading',
  'forcedDL',
  'metaDL',
];

export const stateFilters: Filters['Status'] = {
  downloading: [States.DOWNLOADING, States.FORCED_DOWNLOAD],
  complete: [
    States.UPLOADING,
    States.FORCED_UPLOAD,
    States.PAUSED_UPLOAD,
    States.QUEUED_UPLOAD,
    States.STALLED_UPLOAD,
    States.CHECKING_UPLOAD,
  ],
  stopped: [States.PAUSED_DOWNLOAD, States.PAUSED_UPLOAD],
  active: [
    States.DOWNLOADING,
    States.FORCED_DOWNLOAD,
    States.UPLOADING,
    States.FORCED_UPLOAD,
  ],
  inactive: [
    States.PAUSED_DOWNLOAD,
    States.PAUSED_UPLOAD,
    States.STALLED_DOWNLOAD,
    States.STALLED_UPLOAD,
    States.MISSING_FILES,
    States.ERROR,
  ],
};
