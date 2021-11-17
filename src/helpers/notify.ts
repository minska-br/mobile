import Toast from "react-native-root-toast";

/**
 * @param message Text to show in the toast.
 * @param shortDuration By default 'false', switch duration from LONG to SHORT.
 */
const notify = (message: string, shortDuration: boolean = false) => {
  const { SHORT, LONG } = Toast.durations;
  const duration = shortDuration ? SHORT : LONG;
  Toast.show(message, { duration });
};

export default notify;
