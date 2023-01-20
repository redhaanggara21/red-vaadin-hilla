export type ViewInfo = Readonly<{
  title?: string;
  icon?: string;
}>;

export type ViewInfoMap = Readonly<Record<string, ViewInfo | undefined>>;
export type RequiredViewInfoMap = Readonly<Record<string, Required<ViewInfo>>>;

const views: ViewInfoMap = {
  '/hello': { icon: 'la la-globe', title: 'Hello React' },
  '/about': { icon: 'la la-file', title: 'About' },
  '/todo': { icon: 'la la-tasks', title: 'Todo' },
};


export default views;
