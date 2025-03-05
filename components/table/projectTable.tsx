import type { TypeProject } from '@/lib/types';
import { formatDate } from '@/lib/utils/date';
import Image from 'next/image';
import { type FC, useEffect, useState } from 'react';

interface ProjectTableProps {
  projects: TypeProject[];
}

export const ProjectTable: FC<ProjectTableProps> = ({ projects }) => {
  const [checkedItems, setCheckedItems] = useState<{ [key: number]: boolean }>(
    {}
  );
  const [isSelectAllChecked, setIsSelectAllChecked] = useState(false);

  const handleCheckboxChange = (id: number) => {
    setCheckedItems((prev) => {
      const updatedChecked = { ...prev, [id]: !prev[id] };
      return updatedChecked;
    });
  };

  const handleSelectAllChange = () => {
    const allChecked = !isSelectAllChecked;
    setIsSelectAllChecked(allChecked);

    const updatedCheckedItems = projects.reduce(
      (acc, project) => ({
        // biome-ignore lint/performance/noAccumulatingSpread: <explanation>
        ...acc,
        [project.id || 0]: allChecked
      }),
      {} as { [key: number]: boolean }
    );

    setCheckedItems(updatedCheckedItems);
  };

  useEffect(() => {
    const allChecked =
      projects.length > 0 &&
      projects.every((project) => checkedItems[project.id]);

    setIsSelectAllChecked(allChecked);
  }, [checkedItems, projects]);

  return (
    <div id="projects-panel" role="tabpanel">
      <table className="w-full border-spacing-0">
        <thead>
          <tr>
            <th className="w-12 p-4 bg-gray-50/50">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-gray-300 text-brand-500 focus:ring-brand-500"
                checked={isSelectAllChecked}
                onChange={handleSelectAllChange}
              />
            </th>
            {[
              'Project Name',
              'Package Type',
              'Team',
              'Start Date',
              'Duration',
              'Status'
            ].map((heading) => (
              <th
                key={heading}
                className="px-4 py-3 bg-gray-50/50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                <div className="flex items-center gap-2 table-cell-hover rounded-lg p-1 -ml-1">
                  {heading}
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden={true}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {projects.map((project) => (
            <tr key={project.id} className="table-row-hover">
              <td className="p-4 whitespace-nowrap">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-300 text-brand-500 focus:ring-brand-500"
                  checked={checkedItems[project.id || 0] || false}
                  onChange={() => handleCheckboxChange(project.id || 0)}
                />
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-purple-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden={true}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                      />
                    </svg>
                  </div>
                  <span className="font-medium text-gray-900">
                    {project.title}
                  </span>
                </div>
              </td>
              <td className="px-4 py-3 text-gray-600">
                {project.package_type}
              </td>
              <td className="px-4 py-3">
                <div className="flex -space-x-2">
                  {project?.assignedProjectUser?.map((member, index) => (
                    <Image
                      key={index}
                      src={member.image || '/images/person1.png'}
                      alt={member.full_name || ''}
                      width={32}
                      height={32}
                      className="w-6 h-6 rounded-full border-2 border-white"
                    />
                  ))}
                </div>
              </td>
              <td className="px-4 py-3 text-gray-600">
                {formatDate(project.start_date || '')}{' '}
              </td>
              <td className="px-4 py-3">
                <div className="text-xs text-gray-500 mt-1">
                  {project.duration}
                </div>
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700">
                    {project.project_phase}
                  </span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
