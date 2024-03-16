interface Props {
  creatorId: string;
}
const GroupMenu = (props: Props) => {
  const { creatorId } = props;
  return <>{creatorId}</>;
};

export default GroupMenu;
