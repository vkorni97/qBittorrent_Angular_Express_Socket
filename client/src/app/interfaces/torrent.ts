import {
  ApexChart,
  ApexAnnotations,
  ApexDataLabels,
  ApexAxisChartSeries,
  ApexNonAxisChartSeries,
  ApexStroke,
  ApexLegend,
  ApexFill,
  ApexTooltip,
  ApexPlotOptions,
  ApexResponsive,
  ApexXAxis,
  ApexYAxis,
  ApexGrid,
  ApexStates,
  ApexTitleSubtitle,
  ApexTheme,
} from 'ng-apexcharts';

export interface ServerState {
  alltime_dl?: number;
  alltime_ul?: number;
  average_time_queue?: number;
  connection_status?: string;
  dht_nodes?: number;
  dl_info_data?: number;
  dl_info_speed?: number;
  dl_rate_limit?: number;
  free_space_on_disk?: number;
  global_ratio?: string;
  queued_io_jobs?: number;
  queueing?: false;
  read_cache_hits?: string;
  read_cache_overload?: string;
  refresh_interval?: number;
  total_buffers_size?: number;
  total_peer_connections?: number;
  total_queued_size?: number;
  total_wasted_session?: number;
  up_info_data?: number;
  up_info_speed?: number;
  up_rate_limit?: number;
  use_alt_speed_limits?: false;
  write_cache_overload?: string;
}

export interface CustomInfo {
  selected?: boolean;
}

export interface TorrentInfo extends CustomInfo {
  added_on: number;
  amount_left: number;
  auto_tmm: false;
  availability: number;
  category: string;
  completed: number;
  completion_on: number;
  content_path: string;
  dl_limit: number;
  dlspeed: number;
  downloaded: number;
  downloaded_session: number;
  eta: number;
  f_l_piece_prio: false;
  force_start: true;
  last_activity: number;
  magnet_uri: string;
  max_ratio: number;
  max_seeding_time: number;
  name: string;
  num_complete: number;
  num_incomplete: number;
  num_leechs: number;
  num_seeds: number;
  priority: number;
  progress: number;
  ratio: number;
  ratio_limit: number;
  save_path: string;
  seeding_time: number;
  seeding_time_limit: number;
  seen_complete: number;
  seq_dl: false;
  size: number;
  state: string;
  super_seeding: false;
  tags: string;
  time_active: number;
  total_size: number;
  tracker: string;
  trackers_count: number;
  up_limit: number;
  uploaded: number;
  uploaded_session: number;
  upspeed: number;
}

export interface Status {
  downloading: string[];
  complete: string[];
  stopped: string[];
  active: string[];
  inactive: string[];
  [key: string]: string[];
}

export interface Tracker {
  [key: string]: string[];
}

export enum States {
  ALLOCATING = 'allocating',
  CHECKING_DOWNLOAD = 'checkingDL',
  CHECKING_RESUME_DATA = 'checkingResumeData',
  CHECKING_UPLOAD = 'checkingUP',
  DOWNLOADING = 'downloading',
  ERROR = 'error',
  FORCED_DOWNLOAD = 'forcedDL',
  FORCED_UPLOAD = 'forcedUP',
  METADATA_DOWNLOAD = 'metaDL',
  MISSING_FILES = 'missingFiles',
  MOVING = 'moving',
  PAUSED_DOWNLOAD = 'pausedDL',
  PAUSED_UPLOAD = 'pausedUP',
  QUEUED_DOWNLOAD = 'queuedDL',
  QUEUED_UPLOAD = 'queuedUP',
  STALLED_DOWNLOAD = 'stalledDL',
  STALLED_UPLOAD = 'stalledUP',
  UNKNOWN = 'unknown',
  UPLOADING = 'uploading',
}

export interface ChartOptions {
  chart: ApexChart;
  annotations: ApexAnnotations;
  colors: string[];
  dataLabels: ApexDataLabels;
  series: ApexAxisChartSeries | ApexNonAxisChartSeries;
  stroke: ApexStroke;
  labels: string[];
  legend: ApexLegend;
  fill: ApexFill;
  tooltip: ApexTooltip;
  plotOptions: ApexPlotOptions;
  responsive: ApexResponsive[];
  xaxis: ApexXAxis;
  yaxis: ApexYAxis | ApexYAxis[];
  grid: ApexGrid;
  states: ApexStates;
  title: ApexTitleSubtitle;
  subtitle: ApexTitleSubtitle;
  theme: ApexTheme;
}

export interface Transfer {
  currentSpeed: number;
  transferred: number;
}

export interface Filters {
  Status: Status; // & { all: string[] };
  Category: any;
  Tag: string[];
  Tracker: Tracker;
}

export interface SelectedFilters {
  Status: string;
  Category: string;
  Tag: string;
  Tracker: string;
}
