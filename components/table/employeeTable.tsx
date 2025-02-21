import Image from 'next/image';
import React, { useState, useEffect } from 'react';

export default function EmployeeTable() {
  const [checkedItems, setCheckedItems] = useState<{ [key: number]: boolean }>(
    {}
  );
  const [isSelectAllChecked, setIsSelectAllChecked] = useState(false);

  interface CheckboxChangeEvent {
    target: {
      checked: boolean;
    };
  }

  const handleCheckboxChange = (event: CheckboxChangeEvent, id: number) => {
    setCheckedItems({
      ...checkedItems,
      [id]: event.target.checked
    });
  };

  const handleSelectAllChange = (event: CheckboxChangeEvent) => {
    const isChecked = event.target.checked;
    setIsSelectAllChecked(isChecked);

    const updatedCheckedItems = Object.keys(checkedItems).reduce(
      (acc, curr) => {
        acc[parseInt(curr)] = isChecked;
        return acc;
      },
      {} as { [key: number]: boolean }
    );

    setCheckedItems(updatedCheckedItems);
  };

  useEffect(() => {
    const allChecked = Object.values(checkedItems).every((checked) => checked);
    setIsSelectAllChecked(allChecked);
  }, [checkedItems]);

  useEffect(() => {
    if (Object.keys(checkedItems).length === 0) {
      setIsSelectAllChecked(false);
    }
  }, [checkedItems]);

  return (
    <div id="employees-panel" role="tabpanel">
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
            <th className="px-4 py-3 bg-gray-50/50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div className="flex items-center gap-2 table-cell-hover rounded-lg p-1 -ml-1">
                Name
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
            <th className="px-4 py-3 bg-gray-50/50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div className="flex items-center gap-2 table-cell-hover rounded-lg p-1 -ml-1">
                Job Title
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
            <th className="px-4 py-3 bg-gray-50/50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div className="flex items-center gap-2 table-cell-hover rounded-lg p-1 -ml-1">
                Department
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
            <th className="px-4 py-3 bg-gray-50/50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div className="flex items-center gap-2 table-cell-hover rounded-lg p-1 -ml-1">
                Site
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
            <th className="px-4 py-3 bg-gray-50/50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div className="flex items-center gap-2 table-cell-hover rounded-lg p-1 -ml-1">
                Salary
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
            <th className="px-4 py-3 bg-gray-50/50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div className="flex items-center gap-2 table-cell-hover rounded-lg p-1 -ml-1">
                Start Date
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
            <th className="px-4 py-3 bg-gray-50/50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div className="flex items-center gap-2 table-cell-hover rounded-lg p-1 -ml-1">
                Status
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
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          <tr className="table-row-hover">
            <td className="p-4 whitespace-nowrap">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-gray-300 text-brand-500 focus:ring-brand-500"
                checked={checkedItems[1] || false}
                onChange={(e) => handleCheckboxChange(e, 1)}
              />
            </td>
            <td className="px-4 py-3 whitespace-nowrap">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0">
                  <Image
                    src="/images/person1.jpg"
                    alt="user"
                    width={36}
                    height={36}
                    className="w-9 h-9 rounded-xl object-cover ring-2 ring-gray-100"
                  />
                </div>
                <div>
                  <div className="font-medium text-gray-900">Anatoly Belik</div>
                  <div className="text-xs text-gray-500">
                    anatoly@example.com
                  </div>
                </div>
              </div>
            </td>
            <td className="px-4 py-3 whitespace-nowrap">
              <div className="text-sm text-gray-900">Head of Design</div>
              <div className="text-xs text-gray-500">Product Design</div>
            </td>
            <td className="px-4 py-3 text-gray-600">Product</td>
            <td className="px-4 py-3 text-gray-600">🇸🇪 Stockholm</td>
            <td className="px-4 py-3 text-gray-900 font-medium">$1,350</td>
            <td className="px-4 py-3 text-gray-600">Mar 13, 2023</td>
            <td className="px-4 py-3">
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700">
                  Invited
                </span>
              </div>
            </td>
          </tr>

          {/* <!-- More rows following the same pattern --> */}
          <tr className="table-row-hover bg-yellow-50/50">
            <td className="p-4 whitespace-nowrap">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-gray-300 text-brand-500 focus:ring-brand-500"
                checked={checkedItems[2] || false}
                onChange={(e) => handleCheckboxChange(e, 2)}
              />
            </td>
            <td className="px-4 py-3 whitespace-nowrap">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0">
                  <Image
                    src="/images/person1.jpg"
                    alt="user"
                    width={36}
                    height={36}
                    className="w-9 h-9 rounded-xl object-cover ring-2 ring-gray-100"
                  />
                </div>
                <div>
                  <div className="font-medium text-gray-900">Ksenia Bator</div>
                  <div className="text-xs text-gray-500">
                    ksenia@example.com
                  </div>
                </div>
              </div>
            </td>
            <td className="px-4 py-3 whitespace-nowrap">
              <div className="text-sm text-gray-900">Fullstack Engineer</div>
              <div className="text-xs text-gray-500">Engineering</div>
            </td>
            <td className="px-4 py-3 text-gray-600">Engineering</td>
            <td className="px-4 py-3 text-gray-600">🇺🇸 Miami</td>
            <td className="px-4 py-3 text-gray-900 font-medium">$1,500</td>
            <td className="px-4 py-3 text-gray-600">Oct 13, 2023</td>
            <td className="px-4 py-3">
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-gray-500" />
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                  Absent
                </span>
              </div>
            </td>
          </tr>

          {/* <!-- More employee rows here --> */}
        </tbody>
      </table>
    </div>
  );
}
