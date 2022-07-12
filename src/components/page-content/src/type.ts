export interface IContentTableConfig {
  title: string;
  propList: any[];
  showIndexColumn?: boolean;
  showCheckBoxColumn?: boolean;
  showSelectColumn?: boolean;
  showFooter?: boolean;
  childrenProps?: {
    rowKey: string;
    treeProp: {
      children: any;
    };
  };
}
