'use client';

import { TypeProject, TypeTask, type TypeUser } from '@/lib/types';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Toast from '../../toast';
import { client } from '@/lib/utils/customAxios';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@/app/member/reducers/store';
import { useTotalTime } from '@/hooks/useTotalTime';
import { getAllTasks } from '@/app/member/reducers/tasks';
import { calculateTotalTime } from '@/lib/utils/calculate';
import { getRecentTasksAndReturnTotalTime } from '@/lib/utils/taskUtils';

export interface TaskItem {
  task_id?: number;
  title?: string;
  project?: string;
  hours?: string;
  members?: number;
  state?: string;
  time?: string;
  company?: string;
  startTime?: string;
}

interface EditTaskModalProps {
  closeModal: () => void;
  flag: number;
  data: TaskItem;
}

interface ProjectProps {
  id?: number;
  title: string;
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({
  closeModal,
  flag,
  data
}) => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  // const projectsData = useSelector((state: RootState) => state.projects.projects);
  const { title } = data;
  const dispatch: AppDispatch = useDispatch();
  const [projectID, setProjectID] = useState(0);
  const [taskName, setTaskName] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('low');
  const [members, setMembers] = useState<number[]>([1, 2, 3, 4, 5, 6, 7, 8]);
  const [memberError, setMemberError] = useState(false);
  const [projects, setProjects] = useState<ProjectProps[]>([]);
  const [description, setDescription] = useState('');
  const [estimateHour, setEstimateHour] = useState<number>(0);
  const [estimateMinute, setEstimateMinute] = useState<number>(0);
  const [totalMembers, setTotalMembers] = useState<TypeUser[]>([]);
  const [errorEstimate, setErrorEstimate] = useState(false);

  const [editData, setEditData] = useState<TaskItem>();

  const { totalTime, setTotalTime } = useTotalTime();
  const handleProjectSelect = async (projectId: number) => {
    setProjectID(projectId);
    const token = localStorage.getItem('refresh_token');
    const role = localStorage.getItem('role');
    const response = await fetch(
      `http://localhost:5173/${role}/getprojectbyid`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ projectId: projectId })
      }
    );
    const data = await response.json();
    setTotalMembers(data.assignedProjectUser);
  };

  const cleanMembers = () => {
    setMembers([]);
  };

  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  useEffect(() => {
    const token = localStorage.getItem('refresh_token');
    const role = localStorage.getItem('role');
    const fetchProjects = async () => {
      const response = await fetch(
        `http://localhost:5173/${role}/getAllProjects`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`
          }
        }
      );
      const data = await response.json();

      const projectArray = data.map((project: any) => {
        const temp = {
          id: project.id,
          title: project.title
        };
        return temp;
      });
      setProjects(projectArray);
    };
    // console.log("member:" + members.includes(1));

    fetchProjects();
  }, []);

  useEffect(() => {
    const editData = tasks.find((task) => task.id === data.task_id);
    setTaskName(editData?.title || '');
    setProjectID(editData?.project_id || 0);
    setDueDate(editData?.due_date || '');
    setPriority(editData?.priority || 'low');

    setMembers(
      editData?.assignedTaskUser?.map((user) => Number(user.id)) || []
    );
    setDescription(editData?.description || '');
    setEstimateHour(Math.floor(Number(editData?.estimated_time) / 60) || 0);
    setEstimateMinute(Number(editData?.estimated_time) % 60 || 0);
  }, []);

  const onSubmit = async () => {
    members.length === 0 ? setMemberError(true) : setMemberError(false);
    estimateMinute == 0 && estimateHour == 0
      ? setErrorEstimate(true)
      : setErrorEstimate(false);

    if (members.length !== 0 && (estimateMinute !== 0 || estimateHour !== 0)) {
      try {
        const user_name = localStorage.getItem('username');
        const user_id = localStorage.getItem('userId');
        const payload = {
          data: {
            title: taskName,
            projectId: projectID,
            due_date: dueDate,
            priority: priority,
            description: description,
            estimated_time: estimateHour * 60 + estimateMinute,
            state: 'completed',
            user_name: user_name
          },
          members
        };
        const role = localStorage.getItem('role');
        const res = await client(`http://localhost:5173/${role}/createTask`, {
          body: JSON.stringify(payload)
        });
        dispatch(getAllTasks());

        getRecentTasksAndReturnTotalTime().then((totalTime) => {
          console.log(totalTime);
          setTotalTime(Number(totalTime));
        });

        Toast('success', 'Task Created Successfully');
        closeModal();
        setProjectID(0);
        setTaskName('');
        setDueDate('');
        setPriority('low');
        setMembers([]);
        setDescription('');
        setEstimateHour(0);
        setEstimateMinute(0);
        setTotalMembers([]);
      } catch (error) {
        Toast('error', 'Server Error');
      }
    }
  };
  const memberOptionTemplate = (option: any) => {
    return (
      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
        <img
          src="/images/person1.jpg"
          alt="Sarah Wilson"
          className="w-8 h-8 rounded-lg"
        />
        <div>
          <div className="text-sm font-medium text-gray-900">
            {option.full_name}
          </div>
          <div className="text-xs text-gray-500">{option.position}</div>
        </div>
      </div>
    );
  };

  const handleMemberSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    if (checked) {
      setMembers((prev) => [...prev, Number(value)]);
    } else {
      setMembers((prev) =>
        prev.filter((platform) => platform !== Number(value))
      );
    }
  };

  const updateTask = async () => {
    try {
      const user_name = localStorage.getItem('username');
      const payload = {
        data: {
          id: data.task_id,
          title: taskName,
          projectId: projectID,
          due_date: dueDate,
          priority: priority,
          description: description,
          estimated_time: estimateHour * 60 + estimateMinute,
          state: 'completed',
          user_name: user_name
        },
        members
      };
      const role = localStorage.getItem('role');
      const res = await client('http://localhost:5173/admin/updateTaskbyId', {
        body: JSON.stringify(payload)
      });
      Toast('success', 'Task Updated Successfully');

      dispatch(getAllTasks());

      getRecentTasksAndReturnTotalTime().then((totalTime) => {
        console.log(totalTime);
        setTotalTime(Number(totalTime));
      });
    } catch (error) {
      Toast('error', 'Server Error');
    }
  };

  return (
    <div>
      <div
        id="taskModal"
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl border border-gray-100 w-[650px] max-h-[90vh] overflow-y-auto z-[101] transition-all duration-300"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="relative">
          {/* <!-- Header --> */}
          <div className="sticky top-0 z-10 bg-white px-8 py-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {flag === 0 ? 'Create New Task' : 'Edit Task'}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  {flag === 0
                    ? 'Add a new task to your project'
                    : 'Edit Task of your current project'}
                </p>
              </div>
              <button
                type="button"
                data-close-modal
                onClick={closeModal}
                className="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-xl transition-all"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* <!-- Form Content --> */}
          <div className="p-8 space-y-8 bg-white">
            {/* <!-- Task Title --> */}
            <div className="space-y-2">
              <label
                htmlFor="taskTitle"
                className="block text-sm font-medium text-gray-700"
              >
                Task Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="taskTitle"
                name="taskTitle"
                required
                className="w-full h-11 px-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-colors"
                placeholder="Enter task title"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
              />
            </div>

            {/* <!-- Project Selection --> */}
            <div className="space-y-2">
              <label
                htmlFor="project"
                className="block text-sm font-medium text-gray-700"
              >
                Project <span className="text-red-500">*</span>
              </label>
              <select
                id="project"
                name="project"
                required
                className="w-full h-11 px-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-colors"
                onChange={(e) => {
                  handleProjectSelect(Number(e.target.value));
                  cleanMembers();
                }}
                value={projectID}
              >
                <option value="">Select Project</option>
                {projects.map((project: ProjectProps, index: number) => {
                  return (
                    <option key={index} value={project.id}>
                      {project.title}
                    </option>
                  );
                })}
              </select>
            </div>

            {/* <!-- Due Date & Priority --> */}
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label
                  htmlFor="dueDate"
                  className="block text-sm font-medium text-gray-700"
                >
                  Due Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  id="dueDate"
                  name="dueDate"
                  required
                  className="w-full h-11 px-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-colors"
                  onChange={(e) => setDueDate(e.target.value)}
                  value={dueDate}
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="priority"
                  className="block text-sm font-medium text-gray-700"
                >
                  Priority
                </label>
                <select
                  id="priority"
                  name="priority"
                  className="w-full h-11 px-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-colors"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option value="">Select Priority</option>
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                </select>
              </div>
            </div>

            {/* <!-- Assignees --> */}
            <div className="space-y-3">
              <div className="block text-sm font-medium text-gray-700">
                Assign Team Members<span className="text-red-500"> *</span>
              </div>
              {totalMembers?.length === 0 ? (
                <div className="bg-gray-50 w-full h-[100px] rounded-xl text-gray-500 justify-center items-center flex">
                  <p>Please select a Project.</p>
                </div>
              ) : (
                <></>
              )}
              {totalMembers?.map((user, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <img
                    src="/images/person1.jpg"
                    alt="Sarah Wilson"
                    className="w-8 h-8 rounded-lg"
                  />
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {user.full_name}
                    </div>
                    <div className="text-xs text-gray-500">{user.position}</div>
                  </div>
                  <label className="flex items-center gap-2 ml-auto">
                    <input
                      type="checkbox"
                      name="teamMembers[]"
                      value={user.id}
                      checked={members.includes(Number(user.id))}
                      onChange={(e) => handleMemberSelect(e)}
                      className="rounded border-gray-300 text-brand-500 focus:ring-brand-500"
                    />
                    <span className="text-sm text-gray-700">Assign</span>
                  </label>
                </div>
              ))}
              {memberError ? (
                <div className="active error-message text-sm text-red-500 mt-1">
                  Please select at least one user.
                </div>
              ) : (
                <div>&nbsp;</div>
              )}
              {/* <!-- Search Input --> */}
              {/* <div className="relative flex justify-center items-center border-[1px] rounded-xl pr-2"> */}
              {/* <input
                type="text"
                placeholder="Search team members..."
                className="w-full h-11 pl-10 pr-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-colors"
                id="teamSearch"
              /> */}
              {/* <Dropdown placeholder="Search team members..." options={totalMembers} itemTemplate={memberOptionTemplate}
                className="w-full border-gray-200 pl-10 py-2 rounded-xl" filter/>
              <svg
                className="w-5 h-5 absolute left-3 top-2.5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div> */}

              {/* <!-- Selected Members --> */}
              {/* <div className="bg-gray-50 rounded-xl p-4">
              <div className="text-xs font-medium text-gray-500 mb-3">
                Selected Members
              </div>
              <div className="flex flex-wrap gap-2" id="selectedMembers"> */}
              {/* <!-- Selected members will be added here --> */}
              {/* safss
              </div> */}
              {/* <!-- Empty state for no selections --> */}
              {/* <div
                id="noSelectionsMessage"
                className="text-sm text-gray-500 text-center py-2"
              >
                No team members selected
              </div>
            </div> */}

              {/* <!-- Dropdown Results --> */}
              {/* <div
              className="max-h-[200px] overflow-y-auto bg-white rounded-xl border border-gray-200 shadow-lg hidden"
              id="searchResults"
            >
              <div className="p-2 space-y-1"> */}
              {/* <!-- Results will be populated here --> */}
              {/* </div> */}
              {/* <!-- No Results State --> */}
              {/* <div id="noResultsState" className="hidden p-8 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-3">
                  <svg
                    className="w-6 h-6 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  No team members found
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Try searching with a different term
                </p>
              </div>
            </div>*/}
            </div>

            {/* <!-- Description --> */}
            <div className="space-y-2">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-colors resize-none"
                placeholder="Enter task descrsption"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </div>

            {/* <!-- Estimated Time --> */}
            <div className="space-y-2">
              <div className="block text-sm font-medium text-gray-700">
                Estimated Time<span className="text-red-500"> *</span>
              </div>
              <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl">
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    id="estimatedHours"
                    name="estimatedHours"
                    min="0"
                    className="w-20 h-11 px-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-colors text-center"
                    placeholder="0"
                    value={estimateHour}
                    onChange={(e) => {
                      setEstimateHour(Number(e.target.value));
                    }}
                  />
                  <span className="text-sm font-medium text-gray-600">hrs</span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    id="estimatedMinutes"
                    name="estimatedMinutes"
                    min="0"
                    max="59"
                    className="w-20 h-11 px-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-colors text-center"
                    placeholder="0"
                    value={estimateMinute}
                    onChange={(e) => {
                      setEstimateMinute(Number(e.target.value));
                    }}
                    required
                  />
                  <span className="text-sm font-medium text-gray-600">
                    mins
                  </span>
                </div>
              </div>
              <div className="mt-0.5 text-sm text-red-600">
                {errorEstimate ? 'Please enter estimated time' : ''}
              </div>
            </div>
          </div>

          {/* <!-- Footer --> */}
          <div className="sticky bottom-0 px-8 py-6 bg-white border-t border-gray-100">
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={closeModal}
                className="cursor-pointer px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 focus:ring-2 focus:ring-brand-500/20 transition-colors"
              >
                Cancel
              </button>

              {flag === 0 ? (
                <button
                  type="submit"
                  className="px-6 py-2.5 text-sm font-medium text-white bg-brand-500 border border-transparent rounded-xl hover:bg-brand-600 focus:ring-2 focus:ring-brand-500/20 transition-colors"
                >
                  Create Task
                </button>
              ) : (
                <button
                  type="button"
                  className="px-6 py-2.5 text-sm font-medium text-white bg-brand-500 border border-transparent rounded-xl hover:bg-brand-600 focus:ring-2 focus:ring-brand-500/20 transition-colors"
                  onClick={updateTask}
                >
                  Update Task
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTaskModal;
