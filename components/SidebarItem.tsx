import React from 'react';
import Link from 'next/link';

interface SidebarProps {
    url: string;
    title: string;
    icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    isActive: boolean;
    isSubmenu?: boolean;
    onClick?: () => void;  // Add this
}

const SidebarItem: React.FC<SidebarProps> = ({ 
    url, 
    title, 
    icon: Icon, 
    isActive,
    isSubmenu = false,
    onClick 
}) => {
    return (
        <Link
            href={url}
            onClick={() => {
                if (onClick) {
                    onClick();
                }
            }}
            className={`
                ${isSubmenu 
                    ? 'flex items-center px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg' 
                    : 'sidebar-item flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-600'
                }
                ${isActive ? 'active' : ''}
            `}
        >
            {Icon && <Icon className="w-5 h-5" />}
            <span>{title}</span>
        </Link>
    );
}

export default SidebarItem;