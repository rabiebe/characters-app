import { Chip } from "primereact/chip";

const StatusCharacterTemplate = ({ rowData }) => {
  const statusClass = (status) => {
    switch (status) {
      case "Alive":
        return "bg-green-500";
      case "Dead":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const statusColor = (status) => {
    switch (status) {
      case "Alive":
        return "green";
      case "Dead":
        return "red";
      default:
        return "gray";
    }
  };

  const statusIcon = (status) => {
    switch (status) {
      case "Alive":
        return "pi pi-heart-fill";
      case "Dead":
        return "pi pi-times";
      default:
        return "pi pi-question-circle";
    }
  };
  return (
    <Chip
      label={rowData.status}
      className={`text-white ${statusClass(rowData.status)}`}
      style={{ backgroundColor: statusColor(rowData.status) }}
      icon={statusIcon(rowData.status)}
    />
  );
};

export default StatusCharacterTemplate;
