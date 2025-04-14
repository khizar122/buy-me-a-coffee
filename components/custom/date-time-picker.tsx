import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { format } from 'date-fns';
import React from 'react';

// Generate time slots for 24 hours with 30-minute intervals
const generateTimeSlots = () => {
  const slots = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute of ['00', '30']) {
      const hour24 = hour.toString().padStart(2, '0');
      const time = `${hour24}:${minute}`;
      const hour12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
      const period = hour >= 12 ? 'PM' : 'AM';
      const displayTime = `${hour12}:${minute} ${period}`;
      slots.push({ value: time, label: displayTime });
    }
  }
  return slots;
};

const timeSlots = generateTimeSlots();

interface DateTimeRangeProps {
  value: {
    date: string;
    startTime: string;
    endTime: string;
  };
  onChange: (value: {
    date: string;
    startTime: string;
    endTime: string;
  }) => void;
}

const DateTimeRange = ({ value, onChange }: DateTimeRangeProps) => {
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...value, date: e.target.value });
  };

  const handleStartTimeChange = (newTime: string) => {
    onChange({
      ...value,
      startTime: newTime,
      // Reset end time if it's before the new start time
      endTime: value.endTime && newTime >= value.endTime ? '' : value.endTime
    });
  };

  const handleEndTimeChange = (newTime: string) => {
    onChange({ ...value, endTime: newTime });
  };

  const getAvailableEndTimes = () => {
    if (!value.startTime) return [];
    const startIndex = timeSlots.findIndex(
      (slot) => slot.value === value.startTime
    );
    return timeSlots.slice(startIndex + 1);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-600">
          Appointment Date & Time <span className="text-red-500">*</span>
        </label>
        <div className="flex flex-col space-y-4">
          <Input
            type="date"
            value={value.date}
            onChange={handleDateChange}
            className="bg-white"
            min={format(new Date(), 'yyyy-MM-dd')}
          />
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Select
                value={value.startTime}
                onValueChange={handleStartTimeChange}
              >
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Start Time" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((slot) => (
                    <SelectItem key={slot.value} value={slot.value}>
                      {slot.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select
                value={value.endTime}
                onValueChange={handleEndTimeChange}
                disabled={!value.startTime}
              >
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="End Time" />
                </SelectTrigger>
                <SelectContent>
                  {getAvailableEndTimes().map((slot) => (
                    <SelectItem key={slot.value} value={slot.value}>
                      {slot.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateTimeRange;
