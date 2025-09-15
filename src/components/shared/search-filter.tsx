"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

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

  const toggleFilter = (key: string, label: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const currentValues = getActiveValues(key);

    if (currentValues.includes(label)) {
      // Remove the label
      const updatedValues = currentValues.filter((v) => v !== label);
      if (updatedValues.length > 0) {
        params.set(key, updatedValues.join(","));
      } else {
        params.delete(key);
      }
    } else {
      // Add the label
      const updatedValues = [...currentValues, label];
      params.set(key, updatedValues.join(","));
    }

    router.push(`?${params.toString()}`);
    onAfterChange?.();
  };

  const handleRangeChange = (key: string, value: number) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value.toString());
    } else {
      params.delete(key);
    }

    router.push(`?${params.toString()}`);
    onAfterChange?.();
  };

  const handleSearch = () => {
    onAfterChange?.(); // Close the drawer on mobile
  };

  return (
    <div className="flex flex-col gap-6">
      {sections.map((section) => {
        if (section.type === "range") {
          const activeValue = getActiveRange(section.key);

          return (
            <div key={section.key}>
              <h4 className="font-medium mb-2">{section.title}</h4>
              <Slider
                min={section.min}
                max={section.max}
                step={section.step}
                value={activeValue ? [activeValue] : [section.min]}
                onValueChange={(values) =>
                  handleRangeChange(section.key, values[0])
                }
              />
              <div className="flex justify-between text-sm text-muted-foreground mt-2">
                <span>{section.min}</span>
                <span>{activeValue || section.min}</span>
                <span>{section.max}</span>
              </div>
            </div>
          );
        } else {
          // Default to checkbox type
          const activeValues = getActiveValues(section.key);

          return (
            <div key={section.key}>
              <h4 className="font-medium mb-2">{section.title}</h4>
              <div className="flex flex-col gap-2">
                {section.options.map((opt) => (
                  <label
                    key={opt.value}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <Checkbox
                      checked={activeValues.includes(opt.label)}
                      onCheckedChange={() =>
                        toggleFilter(section.key, opt.label)
                      }
                    />
                    <span>{opt.label}</span>
                    {opt.icon && <span>{opt.icon}</span>}
                  </label>
                ))}
              </div>
            </div>
          );
        }
      })}

      {/* Mobile Search Button */}
      <div className="block md:hidden mt-4">
        <Button className="w-full" size="lg" onClick={handleSearch}>
          Search
        </Button>
      </div>
    </div>
  );
}
