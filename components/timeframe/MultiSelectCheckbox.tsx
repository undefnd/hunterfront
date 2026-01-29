
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from "react";
import { TonedOption } from "../../types/timeframe";
import SelectableRow from "./SelectableRow";

interface MultiSelectCheckboxProps {
  label: string;
  value: string[];
  options: TonedOption[];
  onChange: (v: string[]) => void;
}

const MultiSelectCheckbox: React.FC<MultiSelectCheckboxProps> = ({ label, value, options, onChange }) => {
  const toggle = (v: string) => {
    if (v === 'presence_none') return onChange(['presence_none']);
    const next = value.filter(x => x !== 'presence_none');
    onChange(next.includes(v) ? next.filter(x => x !== v) : [...next, v]);
  };
  return (
    <div className="space-y-2">
      <label className="font-space-grotesk text-[10px] text-muted-foreground uppercase tracking-widest pl-1">{label}</label>
      <div className="space-y-1">
        {options.map((opt) => (
          <SelectableRow key={opt.value} label={opt.label} tone={opt.tone} isSelected={value.includes(opt.value)} onClick={() => toggle(opt.value)} />
        ))}
      </div>
    </div>
  );
};

export default MultiSelectCheckbox;
