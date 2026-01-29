
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from "react";
import { TonedOption } from "../../types/timeframe";
import SelectableRow from "./SelectableRow";

interface HierarchicalSelectProps {
  label: string;
  parentValue: string;
  childValue: string;
  options: TonedOption[];
  onParentChange: (v: string) => void;
  onChildChange: (v: string) => void;
}

const HierarchicalSelect: React.FC<HierarchicalSelectProps> = ({ label, parentValue, childValue, options, onParentChange, onChildChange }) => {
  return (
    <div className="space-y-2">
      <label className="font-space-grotesk text-[10px] text-muted-foreground uppercase tracking-widest pl-1">{label}</label>
      <div className="space-y-1">
        {options.map((opt) => (
          <React.Fragment key={opt.value}>
            <SelectableRow label={opt.label} tone={opt.tone} isSelected={parentValue === opt.value} onClick={() => { onParentChange(parentValue === opt.value ? '' : opt.value); onChildChange(''); }} />
            {parentValue === opt.value && opt.children?.map(child => (
              <SelectableRow key={child.value} label={child.label} tone={child.tone} isSelected={childValue === child.value} onClick={() => onChildChange(childValue === child.value ? '' : child.value)} isIndented />
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default HierarchicalSelect;
