
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from "react";
import { TonedOption } from "../../types/timeframe";
import SelectableRow from "./SelectableRow";

interface SingleSelectProps {
  label: string;
  value: string;
  options: TonedOption[];
  onChange: (v: string) => void;
}

const SingleSelect: React.FC<SingleSelectProps> = ({ label, value, options, onChange }) => {
  return (
    <div className="space-y-2">
      <label className="font-space-grotesk text-[10px] text-muted-foreground uppercase tracking-widest pl-1">{label}</label>
      <div className="space-y-1">
        {options.map((opt) => (
          <SelectableRow key={opt.value} label={opt.label} tone={opt.tone} isSelected={value === opt.value} onClick={() => onChange(value === opt.value ? '' : opt.value)} />
        ))}
      </div>
    </div>
  );
};

export default SingleSelect;
