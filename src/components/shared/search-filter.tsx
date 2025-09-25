"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

export type FilterOption = {
  label: string;
  value: string;
  icon?: React.ReactNode;
};

export type FilterSection =
  | {
      title: string;
      key: string;
      type: "range";
      min: number;
      max: number;
      step: number;
      unit?: string;
    }
  | {
      title: string;
      key: string;
      type?: "checkbox";
      options: FilterOption[];
    };

type FilterProps = {
  sections: FilterSection[];
  onAfterChange?: () => void;
};

export function SearchFilter({ sections, onAfterChange }: FilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const getActiveValues = (key: string) => {
    const value = searchParams.get(key);
    return value ? value.split(",") : [];
  };

  const getActiveRange = (key: string) => {
    const value = searchParams.get(key);
    return value ? parseInt(value) : null;
  };

  const updateParams = (params: URLSearchParams) => {
    router.replace(`?${params.toString()}`);
    onAfterChange?.();
  };

  const toggleFilter = (key: string, label: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const currentValues = getActiveValues(key);

    if (currentValues.includes(label)) {
      const updatedValues = currentValues.filter((v) => v !== label);
      if (updatedValues.length > 0) params.set(key, updatedValues.join(","));
      else params.delete(key);
    } else {
      params.set(key, [...currentValues, label].join(","));
    }

    updateParams(params);
  };

  const handleRangeChange = (key: string, value: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value !== null) params.set(key, value.toString());
    else params.delete(key);
    updateParams(params);
  };

  return (
    <div className="flex flex-col gap-6">
      {sections.map((section) => {
        if (section.type === "range") {
          return (
            <RangeSlider
              key={section.key}
              section={section}
              initialValue={getActiveRange(section.key) ?? section.min}
              onCommit={handleRangeChange}
            />
          );
        }

        return (
          <CheckboxSection
            key={section.key}
            section={section}
            activeValues={getActiveValues(section.key)}
            toggleFilter={toggleFilter}
          />
        );
      })}
    </div>
  );
}

// ✅ Separate component for slider to allow hooks
function RangeSlider({
  section,
  initialValue,
  onCommit,
}: {
  section: Extract<FilterSection, { type: "range" }>;
  initialValue: number;
  onCommit: (key: string, value: number) => void;
}) {
  const [value, setValue] = useState(initialValue);

  return (
    <div>
      <h4 className="font-medium text-[14px] mb-2">{section.title}</h4>
      <Slider
        min={section.min}
        max={section.max}
        step={section.step}
        value={[value]}
        onValueChange={(val) => setValue(val[0])}
        onValueCommit={(val) => onCommit(section.key, val[0])}
      />
      <div className="flex justify-between text-sm text-muted-foreground mt-2">
        <span>
          {section.unit}
          {section.min}
        </span>
        <span>
          {section.unit}
          {value}
        </span>
        <span>
          {section.unit}
          {section.max}
        </span>
      </div>
    </div>
  );
}

// ✅ CheckboxSection with See More / See Less
function CheckboxSection({
  section,
  activeValues,
  toggleFilter,
}: {
  section: Extract<FilterSection, { type?: "checkbox" }>;
  activeValues: string[];
  toggleFilter: (key: string, label: string) => void;
}) {
  const [showAll, setShowAll] = useState(false);

  const visibleOptions = showAll
    ? section.options
    : section.options.slice(0, 5);

  return (
    <div>
      <h4 className="font-medium mb-2">{section.title}</h4>
      <div className="flex flex-col gap-2">
        {visibleOptions.map((opt) => (
          <label
            key={opt.value}
            className="flex items-center gap-2 cursor-pointer"
          >
            <Checkbox
              checked={activeValues.includes(opt.label)}
              onCheckedChange={() => toggleFilter(section.key, opt.label)}
            />
            <span className="text-[14px]">{opt.label}</span>
            {opt.icon && <span>{opt.icon}</span>}
          </label>
        ))}
      </div>
      {section.options.length > 5 && (
        <button
          onClick={() => setShowAll((prev) => !prev)}
          className="mt-2 text-sm text-blue-600 hover:underline"
        >
          {showAll ? "See less" : "See more"}
        </button>
      )}
    </div>
  );
}
