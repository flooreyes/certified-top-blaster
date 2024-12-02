import type { CSSProperties } from 'react';
import React, { useState, useCallback } from 'react';
import Badge from '../utils/Badge';

interface Tab {
  value: string;
  label: string;
}

interface TabsComponentProps {
  tabs: Tab[];
  activeTab: string;
  onValueChange: (value: string) => void;
}

const TabsComponent: React.FC<TabsComponentProps> = ({ tabs, activeTab, onValueChange }) => {
  const tabCount = tabs.length;

  const getIndicatorStyle = useCallback((): CSSProperties => {
    if (!activeTab) return { left: '0%', width: '0%' };
    const index = tabs.findIndex(tab => tab.value === activeTab);
    const width = 100 / tabCount;
    return {
      left: `${index * width}%`,
      width: `${width}%`,
      position: 'absolute',
      top: 0,
      bottom: 0,
      transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
    };
  }, [activeTab, tabs, tabCount]);

  if (tabs.length === 0) {
    return null;
  }

  return (
    <div className='h-9 rounded-lg w-full p-px'>
      <div className="grid grid-flow-col auto-cols-fr relative rounded-lg h-full">
        {tabs.map((tab) => (
          <div key={tab.value} className="relative z-10">
            <input
              type="radio"
              id={tab.value}
              name="tab"
              value={tab.value}
              checked={activeTab === tab.value}
              onChange={() => onValueChange(tab.value)}
              className="sr-only"
            />
            <label
              htmlFor={tab.value}
              className={`cursor-pointer text-center grid place-items-center rounded-md font-medium h-full text-sm font-medium
                          ${activeTab === tab.value ? 'text-primary' : 'text-muted-foreground'}
                          transition-all duration-250 ease-in-out relative z-10`}
            >
              {tab.label}
            </label>
          </div>
        ))}
        <Badge
          className="bg-card"
          style={getIndicatorStyle()}
        />
      </div>
    </div>
  );
};

export default TabsComponent;
