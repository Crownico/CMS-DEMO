import { coordinateData } from "./coordinateData";

interface IMapData {
  name: string;
  value: number;
}

interface IData {
  name: string;
  value: number[];
}
// 转换拼接好城市名和经纬度及其业务数据
export const convertData = (mapData: IMapData[]): IData[] => {
  const data: IData[] = [];
  for (const mapDataItem of mapData) {
    if (coordinateData[mapDataItem.name]) {
      data.push({
        name: mapDataItem.name,
        value: coordinateData[mapDataItem.name].concat(mapDataItem.value)
      });
    }
  }
  return data;
};
