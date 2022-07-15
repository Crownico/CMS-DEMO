export interface IContentTableConfig {
  title: string;
  propList: any[];
  showIndexColumn?: boolean;
  showCheckBoxColumn?: boolean;
  showFooter?: boolean;
  childrenProps?: {
    rowKey: string;
    treeProp: {
      children: any;
    };
  };
}
