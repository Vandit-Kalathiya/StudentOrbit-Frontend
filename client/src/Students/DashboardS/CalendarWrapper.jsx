import { Calendar } from "antd";

const CalendarWrapper = ({ onPanelChange }) => (
  <div className="bg-white rounded-lg shadow-sm p-4 w-full max-w-md mx-auto">
    <Calendar fullscreen={false} onPanelChange={onPanelChange} />
  </div>
);

export default CalendarWrapper;
