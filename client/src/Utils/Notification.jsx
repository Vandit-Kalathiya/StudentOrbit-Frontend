import { notification } from "antd";

export const openNotification = (type, message, description) => {
  notification[type]({
    message,
    description,
    placement: 'bottomRight',
    duration: 5,
    showProgress: true,
  });
};