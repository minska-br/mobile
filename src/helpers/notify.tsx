import Toast from "react-native-root-toast";

const notify = (message: string) => {
  Toast.show(message, {
    duration: Toast.durations.SHORT,
  });
};

export default notify;
