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
  requestedClientProject?: TypeProject[];
  clientTask?: TypeTask[];
  clientTimeTrack?: TypeTimeTrack[];
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
  assignedProjectUser?: TypeUser[];
  requestedProjectClient?: TypeClient[];
  projectTask?: TypeTask[];
  projectTimeTrack: TypeTimeTrack[];
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
