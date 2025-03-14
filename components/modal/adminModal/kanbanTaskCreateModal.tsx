import api from '@/app/api/customApi';

import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Toast from '../../toast';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@/app/admin/reducers/store';
import { fetchKanbanTasks } from '@/app/admin/reducers/kanbanTasks';
import { useEffect } from 'react';

interface KanbanTaskCreateModalProps {
  closeHandle: (param: boolean) => void;
}

const KanbanTaskCreateModal: React.FC<KanbanTaskCreateModalProps> = ({
  closeHandle
}) => {
  const userID = localStorage.getItem('userId');
  const dispatch: AppDispatch = useDispatch();
  const kanbanTasks = useSelector(
    (state: RootState) => state.kanbanTasks.tasks
  );

  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      priority: 'low',
      due_date: '',
      label: '',
      status: 'todo',
      user_id: userID,
      deleted: false
    }
  });

  const onSubmit = async () => {
    const data = getValues();
    const role = localStorage.getItem('role');
    api
      .post(`/${role}/createKanbanBoardTask`, data)
      .then(() => {
        Toast('success', 'Kanban Created Successfully');
        dispatch(fetchKanbanTasks());
        closeHandle(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Task Details</h2>
          <button
            onClick={() => closeHandle(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div>
              <div className="block text-sm font-medium text-gray-700 mb-1">
                Title<span className="text-red-600"> * </span>
              </div>
              <input
                type="text"
                // defaultValue={selectedTask.title}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500"
                {...register('title', { required: 'Task Title is required' })}
              />
              {errors.title && (
                <div className="mt-0.5 text-xs text-red-600">
                  {errors.title.message}
                </div>
              )}
            </div>

            <div>
              <div className="block text-sm font-medium text-gray-700 mb-1">
                Description<span className="text-red-600"> * </span>
              </div>
              <textarea
                // defaultValue={selectedTask.description}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500"
                {...register('description', {
                  required: 'Description is required'
                })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="block text-sm font-medium text-gray-700 mb-1">
                  Priority <span className="text-red-600">*</span>
                </div>
                <select
                  // defaultValue={selectedTask.priority}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500"
                  {...register('priority', {
                    required: 'Priority is required'
                  })}
                >
                  <option value="high">High</option>
                  <option value="normal">Normal</option>
                  <option value="low">Low</option>
                </select>
                {errors.priority && (
                  <div className="mt-0.5 text-xs text-red-600">
                    {errors.priority.message}
                  </div>
                )}
              </div>

              <div>
                <div className="block text-sm font-medium text-gray-700 mb-1">
                  Due Date <span className="text-red-600">*</span>
                </div>
                <input
                  type="date"
                  // defaultValue={selectedTask.dueDate}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500"
                  {...register('due_date', {
                    required: 'Due Date is required'
                  })}
                />
              </div>
            </div>

            <div>
              <div className="block text-sm font-medium text-gray-700 mb-1">
                Labels (comma-separated) <span className="text-red-600">*</span>
              </div>
              <input
                type="text"
                // defaultValue={selectedTask.labels?.join(', ')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500"
                {...register('label', { required: 'Label is required' })}
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={() => closeHandle(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-brand-500 rounded-lg hover:bg-brand-600"
              >
                Create KanbanTask
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default KanbanTaskCreateModal;
