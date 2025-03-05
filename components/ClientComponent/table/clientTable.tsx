import Image from 'next/image';
import React, { useState, useEffect } from 'react';

export default function ClientTable() {
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
        acc[Number.parseInt(curr)] = isChecked;
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
    <div id="clients-panel" role="tabpanel">
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
                Company
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
                Contact Person
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
                Projects
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
                Total Value
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
                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                  <span className="text-sm font-medium text-blue-600">TC</span>
                </div>
                <span className="font-medium text-gray-900">
                  TechCorp Industries
                </span>
              </div>
            </td>
            <td className="px-4 py-3">
              <div className="flex items-center gap-2">
                <Image
                  src="/images/person1.jpg"
                  alt="user"
                  width={32}
                  height={32}
                  className="w-6 h-6 rounded-full"
                />
                <span className="text-gray-600">Sarah Johnson</span>
              </div>
            </td>
            <td className="px-4 py-3">
              <span className="text-gray-900 font-medium">3</span>
              <span className="text-gray-500"> active projects</span>
            </td>
            <td className="px-4 py-3 text-gray-900 font-medium">$45,000</td>
            <td className="px-4 py-3">
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700">
                  Active
                </span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
