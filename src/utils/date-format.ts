import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

// 定义默认时间格式
const DATE_TIME_FORMAT = "YYYY-MM-DD HH:mm:ss";

// 格式化 UTC 时间
export function formatUtcString(
  utcString: string,
  format: string = DATE_TIME_FORMAT
) {
  // 解析 UTC 格式的时间，并且格式化时间显示
  // return dayjs.utc(utcString).format(format);
  // 默认解析 UTC 时间为 0 时区，北京东八区，需要偏移
  return dayjs.utc(utcString).utcOffset(8).format(format);
}

// 格式化时间戳
export function formatTimestamp(
  timestamp: number,
  format: string = DATE_TIME_FORMAT
) {
  return dayjs.unix(timestamp).format(format);
}
