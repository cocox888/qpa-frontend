export interface TypeUser {
  id?: number;
  first_name?: string;
  last_name?: string;
  full_name?: string;
  email?: string;
  password?: string;
  phone?: string;
  position?: string;
  role?: string;
  avatar?: string;
  dob?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  zip_code?: string;
  status?: string;
  assignedUserProject?: TypeProject[];
  assignedUserTask?: TypeTask[];
  userTimeTrack?: TypeTimeTrack[];
  image?: string;
}

export interface TypeClient {
  id?: number;
  full_name?: string;
  password?: string;
  business_name?: string;
  personal_address?: string;
  business_address?: string;
  position?: string;
  email?: string;
  phone?: string;
  preferred_contact_method?: string;
  timezone?: string;
  default_services?: string;
  other_services?: string;
  priorities?: string;
  support_hours?: string;
  use_tools?: string;
  access_specific?: boolean;
  file_share_method?: string;
  required_access?: string;
  often?: string;
  receive_updates?: string;
  key_people?: string;
  particular_task?: string;
  start_date?: string;
  billing_method?: string;
  billing_cycle?: string;
  invoice_email?: string;
  emergency_contact_name?: string;
  emergency_contact_phone?: string;
  emergency_relationship?: string;
  digital_sign?: string;
  sign_date?: string;
  clientProject?: TypeProject[];
  clientTask?: TypeTask[];
  clientTimeTrack?: TypeTimeTrack[];
}

export interface Logs {
  action_type?: string;
  activity_description?: string;
  id: number;
  project_id?: number;
  project_name?: string;
  project_type?: string;
  task_name?: string;
  user_name?: string;
  createdAt?: string;
  log_hour?: number;
  log_phase?: string;
}

export interface KanbanTask {
  id?: number;
  title?: string;
  description?: string;
  priority?: string;
  due_date?: string;
  label?: string;
  status?: string;
  user_id?: number;
  deleted?: boolean;
}

export interface TypeProject {
  id?: number;
  title?: string;
  clientId?: number;
  package_type?: string;
  monthly_hours?: number;
  rate?: number;
  start_date?: string;
  rollover?: boolean;
  platforms?: string;
  duration?: string;
  package_level?: string;
  state?: string;
  services?: string;
  project_type?: string;
  technology?: string;
  additional_setting?: string;
  portal_access?: string;
  totalTimeForDay?: number;
  totalTimeForWeek?: number;
  totalTimeForMonth?: number;
  project_phase?: string;
  assignedProjectUser?: TypeUser[];
  projectClient?: TypeClient;
  projectTask?: TypeTask[];
  projectTimeTrack: TypeTimeTrack[];
  projectHasLogs?: Logs[];
}

export interface TypeTask {
  id?: number;
  title?: string;
  project_id?: number;
  due_date?: string;
  priority?: string;
  description?: string;
  estimated_time: number;
  state?: string;
  taskProject?: TypeProject;
  taskClient?: TypeClient;
  assignedTaskUser?: TypeUser[];
  taskTimeTrack?: TypeTimeTrack[];
}

export interface TypeTimeTrack {
  id?: number;
  start_time: Date;
  end_time: Date;
  estimated_time?: number;
  title?: string;
  projectId?: number;
  userId?: number;
  clientId?: number;
  taskId?: number;
  timeTrackProject?: TypeProject;
  timeTrackClient?: TypeClient;
  timeTrackUser?: TypeUser;
  timeTrackTask?: TypeTask;
}

export interface TypeDocument {
  id?: number;
  user_id?: number;
  title?: string;
  upload_time?: string;
  badge?: string;
  file_format?: string;
  file_size?: number;
  file_path: string;
}

export interface TypeReport {
  id?: number;
  porject_id: number;
  project_name?: string;
  project_type?: string;
  client_name?: string;
  client_id?: number;
  file_name?: string;
  start_date?: string;
  end_date?: string;
}

export interface TypeInvoice {
  id?: string;
  invoice_pdf?: string;
  account_country?: string;
  account_name?: string;
  amount_due?: number;
  amount_paid?: number;
  amount_remaining?: number;
  amount_shipping: number;
  customer_email?: string;
  customer_name?: number;
  currency?: string;
  finalized_at?: string;
  paid_at?: number;
  status?: string;
  paid?: boolean;
  project_id?: number;
  project_title?: string;
  project_type?: string;
  webhooks_delivered_at?: number;
}

export interface TypeAllInvoice {
  project_id?: number;
  project_title?: string;
  project_type?: string;
  client_id?: number;
  client_name?: string;
  stripe_invoice?: TypeInvoice;
}

export interface TypeChartData {
  date?: string;
  count?: number;
}
